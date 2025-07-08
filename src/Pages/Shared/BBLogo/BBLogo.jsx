import React from 'react';
import Logo from '../../../assets/Logo.png';
import { Link } from 'react-router'; 

const BBLogo = () => {
  return (
    <Link to="/" className="block">
      <div className="flex items-center gap-0">
        {/* Logo Image */}
        <img
          src={Logo}
          alt="BazaarBondhu Logo"
          className="w-10 sm:w-12 md:w-14 lg:w-16 transition-all duration-300"
        />
        {/* Text tightly aligned with logo */}
        <span className="ml-1 text-sm sm:text-base md:text-lg font-bold text-green-600">
          BazaarBondhu
        </span>
      </div>
    </Link>
  );
};

export default BBLogo;
