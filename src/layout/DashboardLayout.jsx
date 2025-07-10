import React from 'react';
import { NavLink, Outlet } from 'react-router';
import { FaBoxOpen, FaBullhorn, FaChartLine, FaClipboardList, FaHome, FaListAlt, FaPlusCircle, FaUsers, FaUserShield } from 'react-icons/fa';
import useUserRole from '../hooks/useUserRole';


const DashboardLayout = () => {

    const { role, roleLoading } = useUserRole();
    console.log(role)

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

            {/* Main content */}
            <div className="drawer-content flex flex-col min-h-screen">
                {/* Mobile Dashboard Navbar */}
                <div className="navbar bg-green-100 w-full lg:hidden shadow-md">
                    <div className="flex-none">
                        <label
                            htmlFor="my-drawer-2"
                            aria-label="open sidebar"
                            className="btn btn-square btn-ghost text-green-700 hover:bg-green-200"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="inline-block h-6 w-6 stroke-current"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                ></path>
                            </svg>
                        </label>
                    </div>
                    <div className="mx-2 flex-1 px-2 text-green-700 font-semibold text-lg lg:hidden">
                        Dashboard
                    </div>
                </div>

                {/* Page Content */}
                <Outlet />
            </div>

            {/* Sidebar */}
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <ul className="menu bg-green-50 text-green-900 min-h-full w-80 p-6 space-y-4 shadow-lg">
                    {/* Sidebar content */}

                    {/* Home */}
                    <li>
                        <NavLink
                            to="/dashboard"
                            end
                            className={({ isActive }) =>
                                isActive
                                    ? 'bg-green-600 text-white rounded-md px-3 py-2 flex items-center gap-2 font-semibold'
                                    : 'hover:bg-green-200 rounded-md px-3 py-2 flex items-center gap-2 transition-colors'
                            }
                        >
                            <FaHome className="text-lg" /> 
                            Dashboard Home
                        </NavLink>
                    </li>


                    {/* vendor  */}
                    {!roleLoading && role === 'vendor' &&
                        <>
                            <li>
                                <NavLink
                                    to="/dashboard/add-product"
                                    className={({ isActive }) =>
                                        isActive
                                            ? 'bg-green-600 text-white rounded-md px-3 py-2 flex items-center gap-2 font-semibold'
                                            : 'hover:bg-green-200 rounded-md px-3 py-2 flex items-center gap-2 transition-colors'
                                    }
                                >
                                    <FaPlusCircle />
                                    Add Product
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/dashboard/my-products"
                                    className={({ isActive }) =>
                                        isActive
                                            ? 'bg-green-600 text-white rounded-md px-3 py-2 flex items-center gap-2 font-semibold'
                                            : 'hover:bg-green-200 rounded-md px-3 py-2 flex items-center gap-2 transition-colors'
                                    }
                                >
                                    📦 View My Products
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/dashboard/advertisements/add"
                                    className={({ isActive }) =>
                                        isActive
                                            ? 'bg-green-600 text-white rounded-md px-3 py-2 flex items-center gap-2 font-semibold'
                                            : 'hover:bg-green-200 rounded-md px-3 py-2 flex items-center gap-2 transition-colors'
                                    }
                                >
                                    <FaPlusCircle />
                                    Add Advertisement
                                </NavLink>
                            </li>
                        </>
                    }

                    {/* user */}
                    {!roleLoading && role === 'user' &&
                        <>
                            <li>
                                <NavLink
                                    to="/dashboard/price-trends"
                                    className={({ isActive }) =>
                                        isActive
                                            ? 'bg-green-600 text-white rounded-md px-3 py-2 flex items-center gap-2 font-semibold'
                                            : 'hover:bg-green-200 rounded-md px-3 py-2 flex items-center gap-2 transition-colors'
                                    }
                                >
                                    <FaChartLine className="text-xl" />
                                    Price Trends
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/dashboard/manage-watchlist"
                                    className={({ isActive }) =>
                                        isActive
                                            ? 'bg-green-600 text-white rounded-md px-3 py-2 flex items-center gap-2 font-semibold'
                                            : 'hover:bg-green-200 rounded-md px-3 py-2 flex items-center gap-2 transition-colors'
                                    }
                                >
                                    <FaListAlt />
                                    Manage Watchlist
                                </NavLink>
                            </li>
                        </>
                    }


                    {/* admin */}
                    {!roleLoading && role === 'admin' &&
                        <>
                            <li>
                                <NavLink
                                    to="/dashboard/makeAdmin"
                                    className={({ isActive }) =>
                                        isActive
                                            ? 'bg-green-600 text-white rounded-md px-3 py-2 flex items-center gap-2 font-semibold'
                                            : 'hover:bg-green-200 rounded-md px-3 py-2 flex items-center gap-2 transition-colors'
                                    }
                                >
                                    <FaUserShield />
                                    Admin Panel
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/dashboard/all-users"
                                    className={({ isActive }) =>
                                        isActive
                                            ? 'bg-green-600 text-white rounded-md px-3 py-2 flex items-center gap-2 font-semibold'
                                            : 'hover:bg-green-200 rounded-md px-3 py-2 flex items-center gap-2 transition-colors'
                                    }
                                >
                                    <FaUsers /> {/* Users icon */}
                                    All Users
                                </NavLink>
                            </li>
                            {/* all product admin */}
                            <li>
                                <NavLink
                                    to="/dashboard/all-products"
                                    className={({ isActive }) =>
                                        isActive
                                            ? 'bg-green-600 text-white rounded-md px-3 py-2 flex items-center gap-2 font-semibold'
                                            : 'hover:bg-green-200 rounded-md px-3 py-2 flex items-center gap-2 transition-colors'
                                    }
                                >
                                    <FaBoxOpen /> {/* Product icon */}
                                    All Products
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/dashboard/all-advertisements"
                                    className={({ isActive }) =>
                                        isActive
                                            ? 'bg-green-600 text-white rounded-md px-3 py-2 flex items-center gap-2 font-semibold'
                                            : 'hover:bg-green-200 rounded-md px-3 py-2 flex items-center gap-2 transition-colors'
                                    }
                                >
                                    <FaBullhorn /> {/* Advertisement icon */}
                                    All Advertisements
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/dashboard/all-orders"
                                    className={({ isActive }) =>
                                        isActive
                                            ? 'bg-green-600 text-white rounded-md px-3 py-2 flex items-center gap-2 font-semibold'
                                            : 'hover:bg-green-200 rounded-md px-3 py-2 flex items-center gap-2 transition-colors'
                                    }
                                >
                                    <FaClipboardList /> {/* Orders icon */}
                                    All Orders
                                </NavLink>
                            </li>

                        </>
                    }
                </ul>
            </div>
        </div>
    );
};

export default DashboardLayout;
