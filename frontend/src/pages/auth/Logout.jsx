import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

export const Logout = () => {
    return (
        <>
            <Helmet>
                <title>Logout | MovieSpot</title>
                <meta
                    name="description"
                    content="Logout securely from your MovieSpot account and ensure your session is safely closed."
                />
                <meta
                    name="keywords"
                    content="logout, sign out, MovieSpot, account security"
                />
            </Helmet>

            <div className="flex flex-col justify-center items-center h-screen bg-gray-100 text-center">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">Logout Successful</h1>
                <p className="text-lg text-gray-600 mb-6">You have been logged out successfully.</p>
                <Link
                    to="/login"
                    className="text-blue-600 font-semibold hover:underline"
                >
                    Back to Login
                </Link>
            </div>
        </>
    );
};
