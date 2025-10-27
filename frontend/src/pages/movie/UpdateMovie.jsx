import React, { useEffect, useState } from "react";
import { handleErrorMessage } from "../../toastMessage/error.message";
import { createMovieApi } from "../../API/movieApi/createMovieApi";
import { handleSuccessMessage } from "../../toastMessage/success.message";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { getMovieByIdApi } from "../../API/movieApi/getMovieByIdApi";
import { Helmet } from "react-helmet";


export const UpdateMovie = () => {

    const navigate = useNavigate();

    const { id } = useParams();

    let decode = null;

    if (id) decode = atob(id)

    const [formData, setFormData] = useState({
        title: "",
        type: "",
        director: "",
        budget: "",
        location: "",
        duration: "",
        year: "",
    });

    const fetchMovieDetails = async () => {
        try {
            const result = await getMovieByIdApi(decode);
            const { success, message, error, data } = result;

            if (success) {
                // handleSuccessMessage(message);
                setFormData({
                    title: data.title,
                    type: data.type,
                    director: data.director,
                    budget: data.budget,
                    location: data.location,
                    duration: data.duration,
                    year: data.year
                });
            } else if (!success) {
                // handleErrorMessage(message);
            } else {
                // handleErrorMessage(error);
            };
        } catch (error) {
            handleErrorMessage(error.message);
        };
    };

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { title, type, director, budget, location, duration, year } = formData;

        if (!title && !type && !director && !budget && !location && !duration && !year) {
            handleErrorMessage("At least one field is required");
            return;
        };

        if (budget && budget <= 0) {
            handleErrorMessage("Budget ust be Positive");
            return
        };

        if (duration && duration <= 0) {
            handleErrorMessage("Movie Duration | Episode Must be Positive");
            return;
        };

        try {
            const result = await createMovieApi(formData);
            const { success, message, error } = result;

            if (success) {
                handleSuccessMessage(message);
                setFormData({
                    title: "",
                    type: "",
                    director: "",
                    budget: "",
                    location: "",
                    duration: "",
                    year: "",
                });
                setTimeout(() => navigate("/"), 2000);
            } else if (!success) {
                handleErrorMessage(message);
            } else {
                handleErrorMessage(error);
            };

        } catch (error) {
            handleErrorMessage(error.message);
        };
    };


    useEffect(() => {
        fetchMovieDetails();
    }, [decode]);

    return (
        <>
            <Helmet>
                <title>Update Movie | MovieSpot</title>
                <meta
                    name="description"
                    content="Update existing movie details on MovieSpot. Edit information like title, director, type, budget, and release year."
                />
                <meta
                    name="keywords"
                    content="update movie, edit movie, MovieSpot, modify movie details"
                />
            </Helmet>


            <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
                <div className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-8 border border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
                        🎬 Update a Existing Movie
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Movie Title
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Enter movie title"
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Type
                            </label>
                            <select
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                            >
                                <option value="">Select type</option>
                                <option value="Movie">Movie</option>
                                <option value="TV Show">TV Show</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Director
                            </label>
                            <input
                                type="text"
                                name="director"
                                value={formData.director}
                                onChange={handleChange}
                                placeholder="Enter director name"
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Budget ($)
                            </label>
                            <input
                                type="number"
                                name="budget"
                                value={formData.budget}
                                onChange={handleChange}
                                placeholder="Enter movie budget"
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Location
                            </label>
                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                placeholder="Enter Movie location"
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Duration (in minutes)
                            </label>
                            <input
                                type="number"
                                name="duration"
                                value={formData.duration}
                                onChange={handleChange}
                                placeholder="Enter duration"
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Release Year
                            </label>
                            <input
                                type="date"
                                name="year"
                                value={formData.year}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
                        >
                            Update Movie
                        </button>
                    </form>
                </div>
                <ToastContainer />
            </div>
        </>
    );
};
