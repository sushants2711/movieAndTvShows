import express from "express";
import { verifyCookies } from "../middlewares/verify.cookies.js";
import { createMovieMiddleware, updateMovieMiddleware } from "../middlewares/movie.middleware.js";
import { createMovieController, deleteMovieController, getMovieByIdController, getMovieController, updateMovieController } from "../controllers/movie.controller.js";

const movieRoute = express.Router();

movieRoute.route("/add").post(verifyCookies, createMovieMiddleware, createMovieController);
movieRoute.route("/all").get(verifyCookies, getMovieController)
movieRoute.route("/update/:id").put(verifyCookies, updateMovieMiddleware, updateMovieController);
movieRoute.route("/delete/:id").delete(verifyCookies, deleteMovieController);
movieRoute.route("/details/:id").get(verifyCookies, getMovieByIdController);

export default movieRoute;