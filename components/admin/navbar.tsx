import React from 'react';
import Image from 'next/image';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      {/* Logo on the left */}
      <div className="navbar-logo">
        <div className="relative w-full h-full">
          <Image 
            src="/image/logo3.png" 
            alt="Logo" 
            fill
            className="logo-image object-contain"
          />
        </div>
      </div>

      {/* Profile button on the right */}
      <div className="navbar-profile">
        <button className="profile-btn">Admin</button>
      </div>
    </nav>
  );
};

export default Navbar;