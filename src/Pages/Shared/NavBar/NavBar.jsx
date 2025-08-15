import React from 'react';
import { Link, NavLink, useLocation } from 'react-router';
import BBLogo from '../BBLogo/BBLogo';
import useAuth from '../../../hooks/useAuth';
import { FaSignOutAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';

const NavBar = () => {
  const { user, logOut } = useAuth();
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');

  const handleLogOut = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out from your account.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#16a34a',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, log me out',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await logOut();
          Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'success',
            title: 'Logged out successfully!',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          });
          window.location.reload();
        } catch (error) {
          console.error(error);
          Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'error',
            title: 'Logout failed. Please try again.',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          });
        }
      }
    });
  };

  const navItems = (
    <>
      {!isDashboard && (
        <>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? 'text-green-700 dark:text-green-400 font-semibold'
                  : 'text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400'
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/allProducts"
              className={({ isActive }) =>
                isActive
                  ? 'text-green-700 dark:text-green-400 font-semibold'
                  : 'text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400'
              }
            >
              All Products
            </NavLink>
          </li>
            <li>
            <NavLink
              to="/aboutUs"
              className={({ isActive }) =>
                isActive
                  ? 'text-green-700 dark:text-green-400 font-semibold'
                  : 'text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400'
              }
            >
              About Us
            </NavLink>
          </li>
             <li>
            <NavLink
              to="/contactUs"
              className={({ isActive }) =>
                isActive
                  ? 'text-green-700 dark:text-green-400 font-semibold'
                  : 'text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400'
              }
            >
              Contact Us
            </NavLink>
          </li>
            <li>
            <NavLink
              to="/privacy"
              className={({ isActive }) =>
                isActive
                  ? 'text-green-700 dark:text-green-400 font-semibold'
                  : 'text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400'
              }
            >
              Privacy Policy
            </NavLink>
          </li>
        </>
      )}
      {user && (
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive
                ? 'text-green-700 dark:text-green-400 font-semibold'
                : 'text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400'
            }
          >
            Dashboard
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <div className="sticky top-0 z-50 bg-green-50 dark:bg-gray-900 shadow-md">
      <div className="navbar container mx-auto px-4">
        {/* Start */}
        <div className="navbar-start">
          <div className="dropdown">
            {!isDashboard && (
              <>
                <label tabIndex={0} className="btn btn-ghost lg:hidden">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-700 dark:text-gray-300"
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
                  className="menu menu-compact dropdown-content mt-3 p-2 shadow rounded-box w-52 bg-green-50 dark:bg-gray-800"
                >
                  {navItems}
                </ul>
              </>
            )}
          </div>
          <BBLogo />
        </div>

        {/* Center */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 space-x-6">{navItems}</ul>
        </div>

        {/* End */}
        <div className="navbar-end flex items-center gap-3">
          {!user ? (
            <>
              <Link
                to="/login"
                className="px-3 py-1 text-sm rounded-md bg-green-600 hover:bg-green-700 text-white font-medium transition"
              >
                Login
              </Link>
              <Link
                to="/signUp"
                className="px-3 py-1 text-sm rounded-md bg-green-600 hover:bg-green-700 text-white font-medium transition"
              >
                SignUp
              </Link>
            </>
          ) : (
            <>
              <div className="tooltip tooltip-bottom" data-tip={user.displayName || 'User'}>
                <img
                  src={user.photoURL || 'https://i.ibb.co/4Y6tKwF/default-profile.png'}
                  alt="profile"
                  className="w-9 h-9 rounded-full object-cover border-2 border-green-600 dark:border-green-400"
                />
              </div>
              <button
                onClick={handleLogOut}
                className="flex items-center gap-2 text-sm px-3 py-1 rounded-md bg-green-600 hover:bg-green-700 text-white font-medium transition"
              >
                <FaSignOutAlt /> Logout
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
