import bcrypt from "bcryptjs";
import authModel from "../models/auth.model.js";
import { sendCookies } from "../middlewares/send.cookies.js";
import mongoose from "mongoose";


// signup controller
export const signupController = async (req, res) => {
    try {
        const { name, email, password, confirmPassword } = req.body;

        if (password !== confirmPassword) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Password not match",
                });
        };

        const userExist = await authModel.findOne({ email });

        if (userExist) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "User already exist",
                });
        };

        const salt_round = 10;
        const hash_password = await bcrypt.hash(password, salt_round);

        const newUser = new authModel({
            name,
            email,
            password: hash_password
        });

        const savedUser = await newUser.save();

        await sendCookies(savedUser._id, res);

        return res
            .status(201)
            .json({
                success: true,
                message: "Signup Successfully",
                name: savedUser.name,
                email: savedUser.email
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

// login controller
export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        const userExist = await authModel.findOne({ email });

        if (!userExist) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "User not Exist"
                });
        };

        const comparePassword = await bcrypt.compare(password, userExist.password);

        if (!comparePassword) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Invalid Password Credentials"
                });
        };

        await sendCookies(userExist._id, res);

        return res
            .status(200)
            .json({
                success: true,
                message: "Logged In Successfully",
                name: userExist.name,
                email: userExist.email
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

// logout controller
export const logoutController = async (req, res) => {
    try {
        const loggedInUser = req.user._id;

        if (!loggedInUser) {
            return res
                .status(403)
                .json({
                    success: false,
                    message: "User id is missing.",
                });
        };

        if (!mongoose.Types.ObjectId.isValid(loggedInUser)) {
            return res
                .status(403)
                .json({
                    success: false,
                    message: "Invalid mongoDb Id format.",
                });
        };

        res.cookie("jwt", "", { maxAge: 0 });

        return res
            .status(200)
            .json({
                success: true,
                message: "Logout successfully",
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

// delete controller
export const deleteController = async (req, res) => {
    try {
        const loggedInUser = req.user._id;

        if (!loggedInUser) {
            return res
                .status(403)
                .json({
                    success: false,
                    message: "User id is missing.",
                });
        };

        if (!mongoose.Types.ObjectId.isValid(loggedInUser)) {
            return res
                .status(403)
                .json({
                    success: false,
                    message: "Invalid mongoDb Id format.",
                });
        };

        const userExist = await authModel.findById(loggedInUser);

        if (!userExist) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "User not Exist"
                });
        };

        const deleteUser = await authModel.findByIdAndDelete(userExist._id);

        if (!deleteUser) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Error Occured While deleting the data"
                });
        };

        res.clearCookie("jwt");

        return res
            .status(200)
            .json({
                success: true,
                message: "User Deleted Successfully"
            });

    } catch (error) {
        return res
            .status(500)
            .json({
                success: false,
                message: "Internal Server Error",
                error: error.message
            });
    };
};