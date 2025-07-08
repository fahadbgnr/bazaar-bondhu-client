import React from 'react';
import { Link, NavLink } from 'react-router';
import BBLogo from '../BBLogo/BBLogo';

const NavBar = () => {
    const navItems = (
        <>
            <li>
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive ? 'text-green-700 font-semibold' : 'hover:text-green-600'
                    }
                >
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/allProducts"
                    className={({ isActive }) =>
                        isActive ? 'text-green-700 font-semibold' : 'hover:text-green-600'
                    }
                >
                    All Products
                </NavLink>
            </li>
        </>
    );

    return (
        <div className="sticky top-0 z-50 bg-green-50 shadow-md">
            <div className="navbar container mx-auto px-4">
                {/* Start: Logo & Mobile Dropdown */}
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </label>
                        <ul
                            tabIndex={0}
                            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-green-50 rounded-box w-52"
                        >
                            {navItems}
                        </ul>
                    </div>
                    <BBLogo />
                </div>

                {/* Center: Nav items for large screen */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 space-x-6">{navItems}</ul>
                </div>

                {/* End: Auth Buttons */}
                <div className="navbar-end flex flex-row items-center gap-2">
                    <Link
                        to="/login"
                        className="px-3 py-1 text-sm rounded-md bg-green-600 hover:bg-green-700 text-white font-medium transition"
                    >
                        Login
                    </Link>
                    <Link
                        to="/register"
                        className="px-3 py-1 text-sm rounded-md bg-green-600 hover:bg-green-700 text-white font-medium transition"
                    >
                        SignUp
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default NavBar;
