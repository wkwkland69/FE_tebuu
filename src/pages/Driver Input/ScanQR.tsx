import React, { useState } from 'react';
import axios from 'axios';

const ScanTebu = () => {
    const [kodeTebu, setKodeTebu] = useState('');

    const handleScan = async () => {
        const response = await axios.post('/api/tebu/scan', { kode_tebu: kodeTebu });
        alert(response.data.message);
    };

    return (
        <div>
            <input onChange={(e) => setKodeTebu(e.target.value)} placeholder="Scan QR Code" />
            <button onClick={handleScan}>Scan</button>
        </div>
    );
};

export default ScanTebu;
