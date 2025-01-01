import React from 'react';

const DropdownUser = ({ onLogout }: { onLogout: () => void }) => {
  return (
    <div className="dropdown">
      <button className="dropdown-toggle">User</button>
      <div className="dropdown-menu">
        <button className="dropdown-item" onClick={onLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default DropdownUser;