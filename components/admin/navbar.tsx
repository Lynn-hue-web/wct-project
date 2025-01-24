import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      {/* Logo on the left */}
      <div className="navbar-logo">
        <img src="/image/logo3.png" alt="Logo" className="logo-image" />
      </div>

      {/* Profile button on the right */}
      <div className="navbar-profile">
        <button className="profile-btn">Admin</button>
      </div>
    </nav>
  );
};

export default Navbar;
