import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ClickOutside from '../ClickOutside'; // Pastikan ClickOutside bekerja dengan benar
import UserOne from '../../images/user/user-01.png'; // Pastikan path gambar ini benar
import { LogoutIcon } from '../Icons/LogOutIcon';
import { UserIcon } from '../Icons/UserIcon';

interface DropdownUserProps {
  onLogout: () => void; // Tipe dari onLogout adalah fungsi tanpa argumen
}

const DropdownUser: React.FC<DropdownUserProps> = ({ onLogout }) => {
  console.log('onLogout:', onLogout); // Menambahkan log untuk debugging
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  // Fungsi untuk menangani logout
  const handleLogout = () => {
    console.log('Logout button clicked.');
    if (typeof onLogout === 'function') {
      // Memastikan onLogout adalah sebuah fungsi
      onLogout(); // Panggil fungsi onLogout yang diterima dari prop
      setDropdownOpen(false); // Menutup dropdown setelah logout
      navigate('/auth/signin'); // Arahkan ke halaman login
    } else {
      console.error('onLogout is not a function');
    }
  };

  // Toggle dropdown
  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  return (
    <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
      <Link onClick={toggleDropdown} className="flex items-center gap-4" to="#">
        <span className="hidden text-right lg:block">
          <span className="block text-sm font-medium text-black dark:text-white">
            Juanda Engineer
          </span>
          <span className="block text-xs">Fullstack Engineer</span>
        </span>

        <span className="h-12 w-12 rounded-full">
          <img src={UserOne} alt="User" />
        </span>

        <svg
          className="hidden fill-current sm:block"
          width="12"
          height="8"
          viewBox="0 0 12 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.410765 0.910734C0.736202 0.585297 1.26384 0.585297 1.58928 0.910734L6.00002 5.32148L10.4108 0.910734C10.7362 0.585297 11.2638 0.585297 11.5893 0.910734C11.9147 1.23617 11.9147 1.76381 11.5893 2.08924L6.58928 7.08924C6.26384 7.41468 5.7362 7.41468 5.41077 7.08924L0.410765 2.08924C0.0853277 1.76381 0.0853277 1.23617 0.410765 0.910734Z"
            fill=""
          />
        </svg>
      </Link>

      {/* Dropdown menu */}
      {dropdownOpen && (
        <div
          className={`absolute right-0 mt-4 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark`}
        >
          <ul className="flex flex-col gap-5 border-b border-stroke px-6 py-7.5 dark:border-strokedark">
            <li>
              <Link
                to="/profile"
                className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
              >
                <UserIcon />
                My Profile
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
              >
                <LogoutIcon />
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </ClickOutside>
  );
};

export default DropdownUser;
