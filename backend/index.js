import express from "express";
import dotenv from "dotenv"
import bodyParser from "body-parser";
import cors from "cors"
import cookieParser from "cookie-parser";
import { connectDb } from "./config/db.connect.js";
import authRoute from "./routers/auth.router.js";
import movieRoute from "./routers/movie.router.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 4700;

connectDb();

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

const allowedOrigins = [
    "https://movie-tv-show-frontend-sushant-g8202wzlt.vercel.app",
    "https://movie-tv-show-frontend-sushant.vercel.app"
];

app.use(cors({
    // origin: "http://localhost:5173",
    origin: allowedOrigins,
    credentials: true,
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/movie", movieRoute);

app.listen(PORT, () => {
    console.log(`server started on http://localhost:${PORT}`)
})