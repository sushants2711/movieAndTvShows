import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { logoutApi } from "../API/authApi/logout";
import { handleSuccessMessage } from "../toastMessage/success.message";
import { handleErrorMessage } from "../toastMessage/error.message";

export const Navbar = () => {

    const { removeDataFromLocalStorage } = useAuthContext();

    const navigate = useNavigate();

    const name = localStorage.getItem("name");

    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleToggleButton = () => {
        setMobileMenuOpen(!isMobileMenuOpen);
    };

    const activeClass = "text-blue-600 font-serif text-xl";
    const normalClass = "text-white hover:text-red-800 font-serif text-xl";

    const handleLogout = async () => {
        try {
            const result = await logoutApi();
            const { success, message, error } = result;

            if (success) {
                handleSuccessMessage(message);
                removeDataFromLocalStorage()
                navigate("/logout");
            } else if (!success) {
                handleErrorMessage(message);
            } else {
                handleErrorMessage(error);
            };
        } catch (error) {
            handleErrorMessage(error.message);
        };
    };

    return (
        <>
            <nav className="bg-gray-800 shadow-md">
                <div className="max-w-full mx-auto px-4 md:px-8 py-2 md:py-3">
                    <div className="flex justify-between items-center">

                        <div className="shrink-0">
                            <h2 className="text-3xl font-bold text-white">MovieSpot</h2>
                        </div>


                        <div className="hidden md:flex space-x-14">
                            <NavLink to="/" className={({ isActive }) => isActive ? activeClass : normalClass}>
                                All
                            </NavLink>

                            <NavLink to="/add-movie" className={({ isActive }) => isActive ? activeClass : normalClass}>
                                Movie
                            </NavLink>

                            {!name &&
                                <>
                                    <NavLink to="/signup" className={({ isActive }) => isActive ? activeClass : normalClass}>
                                        Signup
                                    </NavLink>

                                    <NavLink to="/login" className={({ isActive }) => isActive ? activeClass : normalClass}>
                                        Login
                                    </NavLink>
                                </>
                            }

                            {name &&
                                <button className="text-xl text-white" onClick={handleLogout}>
                                    Logout
                                </button>
                            }
                        </div>


                        <div className="md:hidden flex items-center">
                            <button
                                onClick={handleToggleButton}
                                className="text-white hover:text-blue-600 focus:outline-none"
                            >
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>


                <div className={`md:hidden ${isMobileMenuOpen ? "block" : "hidden"} py-2 text-center`}>
                    <NavLink
                        to="/"
                        className={({ isActive }) => isActive ? "block px-4 py-2 text-blue-600" : "block px-4 py-2 text-white hover:text-red-800"}
                    >
                        Home
                    </NavLink>

                    <NavLink
                        to="/add-movie"
                        className={({ isActive }) => isActive ? "block px-4 py-2 text-blue-600" : "block px-4 py-2 text-white hover:text-red-800"}
                    >
                        Movie
                    </NavLink>


                    {!name &&
                        <>
                            <NavLink
                                to="/signup"
                                className={({ isActive }) => isActive ? "block px-4 py-2 text-blue-600" : "block px-4 py-2 text-white hover:text-red-800"}
                            >
                                Signup
                            </NavLink>

                            <NavLink
                                to="/login"
                                className={({ isActive }) => isActive ? "block px-4 py-2 text-blue-600" : "block px-4 py-2 text-white hover:text-red-800"}
                            >
                                Login
                            </NavLink>
                        </>
                    }

                    {name &&
                        <button className="px-4 py-2 text-white" onClick={handleLogout}>
                            Logout
                        </button>
                    }
                </div>
            </nav>
        </>
    );
};
