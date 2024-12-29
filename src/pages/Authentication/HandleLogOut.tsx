// authUtils.js
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import PageTitle from '../../components/PageTitle';
import SignIn from './SignIn';
import SignUp from './SignUp';
import { useState } from 'react';
import { handleLogin } from './HandeLogIn';
export const handleLogout = () => { 
    
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false); // State untuk autentikasi
    setIsAuthenticated(false); // Set status autentikasi ke false saat logout
    localStorage.removeItem('isAuthenticated'); // Hapus status autentikasi dari localStorage

    {!isAuthenticated ? (
        <>
          <Route
            path="/auth/signin"
            element={
              <>
                <PageTitle title="Signin | Tebuu - Tailwind CSS Admin Dashboard Template" />
                <SignIn onLogin={handleLogin} />{' '}
                {/* Pass handleLogin to SignIn */}
              </>
            }
          />
          <Route
            path="/auth/signup"
            element={
              <>
                <PageTitle title="Signup | Tebuu - Tailwind CSS Admin Dashboard Template" />
                <SignUp />
              </>
            }
          />
          <Route path="*" element={<Navigate to="/auth/signin" />} />{' '}
          {/* Redirect ke Sign In */}
        </>
      ) : (
  )