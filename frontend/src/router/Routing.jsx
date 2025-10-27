import React from 'react'
import { Routes, Route } from "react-router-dom";
import { Navbar } from '../components/Navbar';
import { PublicRoute } from './PublicRoute';
import { CreateMovie } from '../pages/movie/CreateMovie';
import { UpdateMovie } from '../pages/movie/UpdateMovie';
import { AllMovie } from '../pages/movie/AllMovie';
import { PrivateRoute } from './PrivateRoute';
import { Signup } from '../pages/auth/Signup';
import { Login } from '../pages/auth/Login';
import { Logout } from '../pages/auth/Logout';

export const Routing = () => {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/signup" element=
                    {
                        <PublicRoute>
                            <Signup />
                        </PublicRoute>
                    }
                />
                <Route path='/login' element=
                    {
                        <PublicRoute>
                            <Login />
                        </PublicRoute>
                    }
                />
                <Route path="/logout" element={<Logout />} />

                <Route path='/' element={
                    <PrivateRoute>
                        <AllMovie />
                    </PrivateRoute>
                }
                />

                <Route path='/add-movie' element={
                    <PrivateRoute>
                        <CreateMovie />
                    </PrivateRoute>
                }
                />
                <Route path='/update-movie/:id' element={
                    <PrivateRoute>
                        <UpdateMovie />
                    </PrivateRoute>
                } />
            </Routes>
        </>
    )
}
