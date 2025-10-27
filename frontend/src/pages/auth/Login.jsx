import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { handleErrorMessage } from "../../toastMessage/error.message";
import { handleSuccessMessage } from "../../toastMessage/success.message";
import { useAuthContext } from "../../context/AuthContext";
import { ToastContainer } from "react-toastify";
import { loginApi } from "../../API/authApi/loginApi";
import { Helmet } from "react-helmet";


export const Login = () => {

    const { setUserDetailsInLocalStorage } = useAuthContext();
    const navigate = useNavigate();

    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setLoginData({
            ...loginData,
            [name]: value
        });
    };

    const handleFormSubmission = async (e) => {
        e.preventDefault();

        const { email, password } = loginData;

        if (!email || !password) {
            handleErrorMessage("All fields are required");
            return;
        };

        if (!email.includes("@")) {
            handleErrorMessage("Invalid Email Id");
            return;
        };

        if (password.length < 8) {
            handleErrorMessage("Password Length at least 8 characters long");
            return;
        };

        try {
            const result = await loginApi(loginData);
            const { success, message, error, name, email } = result

            if (success) {
                handleSuccessMessage(message);
                setUserDetailsInLocalStorage(name, email);
                setLoginData({
                    email: "",
                    password: "",
                });
                setTimeout(() => {
                    navigate("/");
                }, 2000);
            }
            else if (!success) {
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
            <Helmet>
                <title>Login | MovieSpot</title>
                <meta
                    name="description"
                    content="Login to your account on MovieSpot and enjoy seamless entertainment to Watch Latest Movie and Tv Shows"
                />
                <meta
                    name="keywords"
                    content="Login, MovieSpot"
                />
            </Helmet>
            <div className="min-h-screen flex items-center justify-center bg-linear-to-r from-blue-100 via-white to-blue-100 p-6">
                <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl px-8 py-10">

                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
                        Login to Your Account
                    </h2>

                    <form onSubmit={handleFormSubmission} className="space-y-5">

                        <div>
                            <label className="block text-gray-700 font-medium mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={handleChange}
                                value={loginData.email}
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Enter your password"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={handleChange}
                                value={loginData.password}
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 ease-in-out shadow-md hover:shadow-lg"
                        >
                            Login
                        </button>
                    </form>

                    <p className="text-center text-sm text-gray-500 mt-6">
                        Don't have an account?{" "}
                        <Link to="/signup"
                            className="text-blue-600 hover:underline font-medium"
                        >
                            Signup
                        </Link>
                    </p>
                </div>
            </div>
            <ToastContainer />
        </>
    );
};


