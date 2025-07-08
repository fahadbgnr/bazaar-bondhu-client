import React from 'react';
import { Link, NavLink } from 'react-router';
import BBLogo from '../BBLogo/BBLogo';

const NavBar = () => {
  const navItems = <>
    <li><NavLink to="/">Home</NavLink></li>
    <li><NavLink to="/allProducts">All Products</NavLink></li>
  </>;

  return (
    <div className="navbar bg-base-100 shadow-sm">
      {/* Start: Logo & Mobile Dropdown */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow">
            {navItems}
          </ul>
        </div>
        <span className="text-xl">
          <BBLogo />
        </span>
      </div>

      {/* Center: Nav items for large screen */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {navItems}
        </ul>
      </div>

      {/* End: Auth Buttons */}
      <div className="navbar-end space-x-2">
        <Link
          to='/login'
          className='px-4 py-2 rounded-md bg-green-600 hover:bg-green-700 text-white font-medium transition'
        >
          Login
        </Link>
        <Link
          to='/register'
          className='px-4 py-2 rounded-md bg-green-600 hover:bg-green-700 text-white font-medium transition'
        >
          SignUp
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
