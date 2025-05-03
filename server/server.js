import express from 'express';
import mysql from 'mysql2';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import cors from 'cors';

const app = express();
const port = 5001;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(bodyParser.json());

// Database connection configuration
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Ganti dengan username Anda
  password: '', // Ganti dengan password Anda
  database: 'tebuu', // Nama database yang Anda gunakan
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database.');
});

// Endpoint for user registration (Sign Up)
app.post('/api/auth/signup', async (req, res) => {
  const { name, email, password } = req.body;

  // Input validation
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Check if user already exists
  const checkUserQuery = 'SELECT * FROM users WHERE email = ?';
  db.query(checkUserQuery, [email], async (err, results) => {
    if (err) {
      console.error('Error checking user:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    if (results.length > 0) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user data to the database
    const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    db.query(query, [name, email, hashedPassword], (err, results) => {
      if (err) {
        console.error('Error inserting user:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.status(201).json({ message: 'User registered successfully' });
    });
  });
});

// Endpoint for user login (Sign In)
app.post('/api/auth/signin', async (req, res) => {
  const { email, password } = req.body;

  // Input validation
  if (!email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Check if user exists
  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], async (err, results) => {
    if (err) {
      console.error('Error checking user:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    if (results.length === 0) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const user = results[0];

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    res.status(200).json({
      message: 'Sign in successful',
      user: { name: user.name, email: user.email },
    });
  });
});

// Endpoint to get batch and quality class counts
app.get('/api/batch-quality-summary', (req, res) => {
  const query = `
    SELECT batch,
      SUM(quality = 'A') AS A,
      SUM(quality = 'B') AS B,
      SUM(quality = 'C') AS C,
      SUM(quality = 'D') AS D,
      SUM(quality = 'E') AS E
    FROM sugarcane_scanned
    GROUP BY batch
    ORDER BY batch ASC
  `;
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching batch quality summary:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
});

// Endpoint: Pie summary quality sugarcane_scanned (for ChartThree)
app.get('/api/quality-summary', (req, res) => {
  const query = `
    SELECT quality, COUNT(*) AS count
    FROM sugarcane_scanned
    WHERE quality IN ('A', 'B', 'C', 'D', 'E')
    GROUP BY quality
  `;
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching quality summary:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
});

// Endpoint: Leaderboard Top Driver
app.get('/api/leaderboard', (req, res) => {
  const query = `
    SELECT nama_supir, plat_nomor, SUM(jumlah_tebu) AS total_tebu
    FROM sugarcane_entry
    GROUP BY nama_supir, plat_nomor
    ORDER BY total_tebu DESC
  `;
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching leaderboard:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
});

// Endpoint: Get all scanned sugarcane data
app.get('/api/scanned', (req, res) => {
  const query = `SELECT id, batch, quality, waktu_scan FROM sugarcane_scanned ORDER BY waktu_scan DESC`;
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching scanned data:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
});

// Endpoint: Total scanned sugarcane (jumlah batch)
app.get('/api/total-scanned', (req, res) => {
  const query = 'SELECT COUNT(batch) AS total_scanned FROM sugarcane_scanned';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching total scanned:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results[0]);
  });
});

// Run the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
