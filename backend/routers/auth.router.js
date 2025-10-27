import express from "express";
import { loginMiddleware, signupMiddleware } from "../middlewares/auth.middleware.js";
import { verifyCookies } from "../middlewares/verify.cookies.js";
import { deleteController, loginController, logoutController, signupController } from "../controllers/auth.controller.js";

const authRoute = express.Router();

authRoute.route("/signup").post(signupMiddleware, signupController);
authRoute.route("/login").post(loginMiddleware, loginController);
authRoute.route("/logout").post(verifyCookies, logoutController);
authRoute.route("/delete").delete(verifyCookies, deleteController)

export default authRoute;