import React, { useState } from 'react';
import axios from 'axios';

const InputTebu = () => {
    const [data, setData] = useState({ nama_supir: '', plat_nomor: '', jumlah_tebu: '' });
    const [qrCode, setQrCode] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        // Validasi input
        if (!data.nama_supir || !data.plat_nomor || !data.jumlah_tebu) {
            setError('Semua kolom harus diisi');
            return;
        }

        setLoading(true);
        setError('');
        setQrCode(null); // Reset QR code sebelum membuat yang baru

        try {
            const response = await axios.post('http://localhost:5000/api/tebu/input', data, { responseType: 'blob' });
            const url = URL.createObjectURL(response.data);
            setQrCode(url);
        } catch (err) {
            setError('Gagal mengirim data. Coba lagi nanti.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Input Data Tebu</h2>
            <input 
                name="nama_supir" 
                onChange={handleChange} 
                value={data.nama_supir} 
                placeholder="Nama Supir" 
                required 
            />
            <input 
                name="plat_nomor" 
                onChange={handleChange} 
                value={data.plat_nomor} 
                placeholder="Plat Nomor" 
                required 
            />
            <input 
                name="jumlah_tebu" 
                onChange={handleChange} 
                value={data.jumlah_tebu} 
                placeholder="Jumlah Tebu" 
                type="number" 
                required 
            />
            <button onClick={handleSubmit} disabled={loading}>
                {loading ? 'Mengirim...' : 'Submit'}
            </button>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {qrCode && (
                <div>
                    <h3>QR Code:</h3>
                    <img src={qrCode} alt="QR Code" />
                </div>
            )}
        </div>
    );
};

export default InputTebu;
