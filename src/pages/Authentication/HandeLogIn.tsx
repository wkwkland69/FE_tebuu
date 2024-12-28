import { useState } from "react";

export const handleLogin = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false); // State untuk autentikasi
    setIsAuthenticated(true); // Set status autentikasi ke true saat login
    localStorage.setItem('isAuthenticated', 'true'); // Simpan status di localStorage
  };