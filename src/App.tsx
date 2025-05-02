import { useEffect, useState } from 'react';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import axios from 'axios';
import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Calendar from './pages/Calendar';
import Camera from './pages/Camera';
import Chart from './pages/Chart';
import ECommerce from './pages/Dashboard/ECommerce';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import DefaultLayout from './layout/DefaultLayout';
import InputTebu from './pages/Driver Input/DriverInput';
import DropdownUser from './components/Header/DropdownUser'; // Import komponen DropdownUser
import { AuthProvider, useAuth } from './context/AuthContext';

function App() {
  const [loading, setLoading] = useState<boolean>(false);
  const { isAuthenticated, login, logout } = useAuth();
  const { pathname } = useLocation();

  const handleLogin = () => {
    login();
  };

  const handleLogout = () => {
    logout();
  };

  return loading ? (
    <Loader />
  ) : (
    <DefaultLayout>
      {/* <DropdownUser onLogout={handleLogout} />{' '} */}
      {/* Pass handleLogout ke DropdownUser */}
      <Routes>
        {/* Jika belum login, arahkan ke halaman Sign In */}
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
          <>
            <Route
              index
              element={
                <>
                  <PageTitle title="eCommerce Dashboard | Tebuu - Tailwind CSS Admin Dashboard Template" />
                  <ECommerce />
                </>
              }
            />
            <Route
              path="/calendar"
              element={
                <>
                  <PageTitle title="Calendar | Tebuu - Tailwind CSS Admin Dashboard Template" />
                  <Calendar />
                </>
              }
            />
            <Route
              path="/camera"
              element={
                <>
                  <PageTitle title="Camera | Tebuu - Tailwind CSS Admin Dashboard Template" />
                  <Camera />
                </>
              }
            />
            <Route
              path="/profile"
              element={
                <>
                  <PageTitle title="Profile | Tebuu - Tailwind CSS Admin Dashboard Template" />
                  <Profile />
                </>
              }
            />
            <Route
              path="/forms/form-elements"
              element={
                <>
                  <PageTitle title="Form Elements | Tebuu - Tailwind CSS Admin Dashboard Template" />
                  <FormElements />
                </>
              }
            />
            <Route
              path="/forms/form-layout"
              element={
                <>
                  <PageTitle title="Form Layout | Tebuu - Tailwind CSS Admin Dashboard Template" />
                  <FormLayout />
                </>
              }
            />
            <Route
              path="/tables"
              element={
                <>
                  <PageTitle title="Tables | Tebuu - Tailwind CSS Admin Dashboard Template" />
                  <Tables />
                </>
              }
            />
            <Route
              path="/settings"
              element={
                <>
                  <PageTitle title="Settings | Tebuu - Tailwind CSS Admin Dashboard Template" />
                  <Settings />
                </>
              }
            />
            <Route
              path="/chart"
              element={
                <>
                  <PageTitle title="Basic Chart | Tebuu - Tailwind CSS Admin Dashboard Template" />
                  <Chart />
                </>
              }
            />
            <Route
              path="/ui/alerts"
              element={
                <>
                  <PageTitle title="Alerts | Tebuu - Tailwind CSS Admin Dashboard Template" />
                  <Alerts />
                </>
              }
            />
            <Route
              path="/ui/buttons"
              element={
                <>
                  <PageTitle title="Buttons | Tebuu - Tailwind CSS Admin Dashboard Template" />
                  <Buttons />
                </>
              }
            />
            <Route
              path="/driver/inputdata"
              element={
                <>
                  <PageTitle title="Input Data | Tebuu - Tailwind CSS Admin Dashboard Template" />
                  <InputTebu />
                </>
              }
            />
            <Route
              path="/auth/signin"
              element={<Navigate to="/" />} // Redirect jika sudah login
            />
          </>
        )}
      </Routes>
    </DefaultLayout>
  );
}

export default App;
