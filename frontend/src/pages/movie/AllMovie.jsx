import React, { useEffect, useState, useRef } from "react";
import { allMovieApi } from "../../API/movieApi/allMovieApi";
import { handleSuccessMessage } from "../../toastMessage/success.message";
import { handleErrorMessage } from "../../toastMessage/error.message";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { deleteMovieApi } from "../../API/movieApi/deleteMovieApi";
import { Helmet } from "react-helmet";

export const AllMovie = () => {
    const navigate = useNavigate();

    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [searchData, setSearchData] = useState({
        title: "",
        year: "",
        type: "",
    });

    const tableContainerRef = useRef(null);

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setSearchData({
            ...searchData,
            [name]: value
        });
        setCurrentPage(1);
        setMovies([]);
    };

    const fetchMovies = async (page = 1) => {
        if (loading) return;
        setLoading(true);
        try {
            const result = await allMovieApi({ ...searchData, page });
            const { success, data, pagination, message, error } = result;

            if (success) {
                if (page === 1) {
                    setMovies(data);
                } else {
                    setMovies((prev) => [...prev, ...data]);
                }
                setTotalPages(pagination.totalPages);
            } else if (!success) {
                handleErrorMessage(message)
                setMovies([]);
                setCurrentPage(1);
                setTotalPages(1)
            } else {
                handleErrorMessage(error);
                setMovies([]);
                setCurrentPage(1);
                setTotalPages(1)
            }
        } catch (error) {
            handleErrorMessage(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateTheMovie = (id) => {
        const decode = btoa(id);
        if (decode) navigate(`/update-movie/${decode}`);
    };

    const handleDeleteMovie = async (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this movie?");
        if (!confirmed) return;

        try {
            const result = await deleteMovieApi(id);
            const { success, message, error } = result;

            if (success) {
                handleSuccessMessage(message);
                setMovies([]);
                setCurrentPage(1);
                fetchMovies(1);
            } else {
                handleErrorMessage(message || error);
            }
        } catch (error) {
            handleErrorMessage(error.message);
        }
    };

    useEffect(() => {
        fetchMovies(1);
    }, [searchData]);

    const handleScroll = () => {
        if (!tableContainerRef.current) return;
        const { scrollTop, scrollHeight, clientHeight } = tableContainerRef.current;

        if (scrollTop + clientHeight >= scrollHeight - 10) {
            if (currentPage < totalPages) {
                const nextPage = currentPage + 1;
                setCurrentPage(nextPage);
                fetchMovies(nextPage);
            }
        }
    };

    return (
        <>
            <Helmet>
                <title>All Movies | MovieSpot</title>
                <meta
                    name="description"
                    content="Explore all movies available on MovieSpot. Browse by genre, year, director, and more for endless entertainment."
                />
                <meta
                    name="keywords"
                    content="movies, MovieSpot, film list, latest movies, popular movies, browse movies, entertainment"
                />
            </Helmet>

            <div className="p-4 sm:p-6 bg-gray-50 min-h-screen flex flex-col items-center">

                <div className="w-full max-w-[1250px] bg-white border border-gray-200 rounded-xl shadow-xl p-4 sm:p-6 mb-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div className="flex items-center gap-4">
                            <label className="text-gray-700 text-sm sm:text-base font-medium">Filter by Year</label>
                            <div className="flex items-center gap-3">
                                <label className="flex items-center gap-1 text-gray-700 text-sm">
                                    <input type="radio" name="year" value="asc" onChange={handleChange} className="cursor-pointer text-blue-600 focus:ring-blue-500" />
                                    Asc
                                </label>
                                <label className="flex items-center gap-1 text-gray-700 text-sm">
                                    <input type="radio" name="year" value="dsc" onChange={handleChange} className="cursor-pointer text-blue-600 focus:ring-blue-500" />
                                    Dsc
                                </label>
                            </div>
                        </div>

                        <div className="w-full md:flex-1">
                            <input
                                type="search"
                                name="title"
                                placeholder="Search movies by title or director..."
                                onChange={handleChange}
                                value={searchData.title}
                                className="w-full px-4 py-2 border-2 border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                            />
                        </div>

                        <div>
                            <select
                                onChange={handleChange}
                                name="type"
                                className="px-4 py-2 border-2 border-gray-300 rounded-md bg-white text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                            >
                                <option value="">Sort By Type</option>
                                <option value="Movie">Movie</option>
                                <option value="TV Show">TV Show</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div
                    className="w-full max-w-[1250px] bg-white border border-gray-200 rounded-xl shadow-xl overflow-x-auto"
                    ref={tableContainerRef}
                    onScroll={handleScroll}
                    style={{ maxHeight: "500px" }}
                >
                    <table className="w-full min-w-[900px] border-collapse">
                        <thead className="bg-blue-600 text-white text-xs sm:text-sm md:text-base sticky top-0 z-10">
                            <tr>
                                <th className="p-3 text-left">Title</th>
                                <th className="p-3 text-left">Type</th>
                                <th className="p-3 text-left">Director</th>
                                <th className="p-3 text-left">Budget</th>
                                <th className="p-3 text-left">Location</th>
                                <th className="p-3 text-left">Duration</th>
                                <th className="p-3 text-left">Year</th>
                                <th className="p-3 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700 text-xs sm:text-sm md:text-base">
                            {movies.length > 0 ? (
                                movies.map((movie, index) => (
                                    <tr key={index} className={`border-b transition duration-200 ease-in-out hover:bg-blue-50 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}>
                                        <td className="p-3 font-semibold">{movie.title}</td>
                                        <td className="p-3">{movie.type}</td>
                                        <td className="p-3">{movie.director}</td>
                                        <td className="p-3">${movie.budget.toLocaleString()}</td>
                                        <td className="p-3">{movie.location}</td>
                                        <td className="p-3">{movie.duration} min</td>
                                        <td className="p-3">{movie.year.split("T")[0]}</td>
                                        <td className="p-3 text-center flex justify-center gap-2">
                                            <button onClick={() => handleUpdateTheMovie(movie._id)} className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 shadow-sm text-xs sm:text-sm">Edit</button>
                                            <button onClick={() => handleDeleteMovie(movie._id)} className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 shadow-sm text-xs sm:text-sm">Delete</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8" className="text-center p-6 text-gray-500 italic">
                                        No movie data available
                                    </td>
                                </tr>
                            )}
                            {loading && (
                                <tr>
                                    <td colSpan="8" className="text-center p-4 text-gray-500 italic">
                                        Loading more movies...
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <ToastContainer />
            </div>
        </>
    );
};
