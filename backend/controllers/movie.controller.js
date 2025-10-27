import mongoose from "mongoose";
import movieModel from "../models/movie.model.js";

// create movie
export const createMovieController = async (req, res) => {
    try {
        const { title, type, director, budget, location, duration, year } = req.body;

        const newMovie = new movieModel({
            title,
            type,
            director,
            budget,
            location,
            duration,
            year
        });

        const savedMovie = await newMovie.save();

        return res
            .status(201)
            .json({
                success: true,
                message: "Movie Created Successfully",
                data: savedMovie
            });

    }
    catch (error) {
        return res
            .status(500)
            .json({
                success: false,
                message: "Internal Server Error",
                error: error.message
            });
    };
};

// get movie
export const getMovieController = async (req, res) => {
    try {
        let page = Number(req.query.page) || 1;
        let limit = Number(req.query.limit) || 10;
        let skip = (page - 1) * limit;

        const { title, type, year } = req.query;

        const filterData = {};
        const sortOptions = {};

        if (title) {
            filterData.$or = [
                { title: { $regex: title, $options: "i" } },
                { director: { $regex: title, $options: "i" } }
            ];
        }

        if (type) {
            filterData.type = { $regex: type, $options: "i" };
        }

        if (year === "asc") sortOptions.year = 1;
        else if (year === "dsc") sortOptions.year = -1;

        const allMovie = await movieModel
            .find(filterData)
            .sort(sortOptions)
            .skip(skip)
            .limit(limit);

        const totalMovies = await movieModel.countDocuments(filterData);

        if (!allMovie || allMovie.length === 0) {
            return res.status(200).json({
                success: true,
                message: "No Movie data Available",
                data: [],
                pagination: {
                    currentPage: page,
                    totalPages: 0,
                    totalMovies: 0,
                },
            });
        }

        return res.status(200).json({
            success: true,
            message: "Movie Data fetched Successfully",
            data: allMovie,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(totalMovies / limit),
                totalMovies,
            },
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
};

// update movie
export const updateMovieController = async (req, res) => {
    try {
        const { id } = req.params;

        const { title, type, director, budget, location, duration, year } = req.body;

        if (!id) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Id is missing"
                });
        };

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Invalid mongoDb Id format"
                });
        };

        if (!title && !type && !director && !budget && !location && !duration && !year) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "At least one field is required"
                });
        };

        const movieExist = await movieModel.findById(id);

        if (!movieExist) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Movie not Exist"
                });
        };

        const updateDate = {
            title: title || movieExist.title,
            type: type || movieExist.type,
            director: director || movieExist.director,
            budget: budget || movieExist.budget,
            location: location || movieExist.location,
            duration: duration || movieExist.duration,
            year: year || movieExist.year
        };

        const updateMovie = await movieModel.findByIdAndUpdate(id, updateDate, { new: true });

        if (!updateMovie) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Error Occured while updating the movie Data"
                });
        };

        return res
            .status(200)
            .json({
                success: true,
                message: "Movie Data Updated Successfully",
                data: updateMovie
            });

    }
    catch (error) {
        return res
            .status(500)
            .json({
                success: false,
                message: "Internal Server Error",
                error: error.message
            });
    };
};

// delete movie
export const deleteMovieController = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Id is missing"
                });
        };

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Invalid mongoDb Id format"
                });
        };

        const movieExist = await movieModel.findById(id);

        if (!movieExist) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Movie not Exist"
                });
        };

        const deleteMovie = await movieModel.findByIdAndDelete(movieExist._id);

        if (!deleteMovie) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Error Occured while deleting the data"
                });
        };

        return res
            .status(200)
            .json({
                success: true,
                message: "Movie Data Deleted Successfully"
            });

    }
    catch (error) {
        return res
            .status(500)
            .json({
                success: false,
                message: "Internal Server Error",
                error: error.message
            });
    };
};

// get movie by id
export const getMovieByIdController = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Id is missing"
                });
        };

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Invalid mongoDb Id format"
                });
        };

        const movieExist = await movieModel.findById(id);

        if (!movieExist) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Movie not Exist in Db"
                });
        };

        return res
            .status(200)
            .json({
                success: true,
                message: "Data fetch Successfully",
                data: movieExist
            });

    }
    catch (error) {
        return res
            .status(500)
            .json({
                success: false,
                message: "Internal Server Error",
                error: error.message
            });
    };
};