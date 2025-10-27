import React, { createContext, useContext, useState } from 'react'

export const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextrProvider = ({ children }) => {

    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");

    const setUserDetailsInLocalStorage = (name, email) => {
        localStorage.setItem("name", name);
        localStorage.setItem("email", email);
    };

    const fetchDetailsFromLocalStorage = () => {
        const name = localStorage.getItem("name");
        const email = localStorage.getItem("email");

        setUserName(name);
        setUserEmail(email);
    };

    const removeDataFromLocalStorage = () => {
        localStorage.removeItem("name");
        localStorage.removeItem("email");

        setUserName("");
        setUserEmail("");
    };

    return (
        <AuthContext.Provider value={{ userName, userEmail, setUserDetailsInLocalStorage, fetchDetailsFromLocalStorage, removeDataFromLocalStorage }}>
            {children}
        </AuthContext.Provider>
    )
}