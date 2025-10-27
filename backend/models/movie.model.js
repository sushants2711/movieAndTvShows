import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ["Movie", "TV Show"],
        required: true
    },
    director: {
        type: String,
        required: true
    },
    budget: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    year: {
        type: Date,
        required: true
    }
}, { timestamps: true });


export default mongoose.model("movie", movieSchema);