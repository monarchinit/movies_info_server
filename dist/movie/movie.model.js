"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.movieModel = void 0;
const mongoose = require("mongoose");
const movie_controller_1 = require("./movie.controller");
const { Schema } = mongoose;
const movieSchema = new Schema({
    name: { type: String, required: true },
    year: { type: Number, required: true },
    format: {
        type: String,
        required: true,
        enum: [movie_controller_1.movieFormat[0], movie_controller_1.movieFormat[1], movie_controller_1.movieFormat[2]],
    },
    cast: [{ type: String, required: true }],
}, {
    timestamps: true,
});
movieSchema.statics.createMovie = createMovie;
function createMovie(name, year, format, cast) {
    return this.create({ name, year, format, cast });
}
// movies
exports.movieModel = mongoose.model('Movie', movieSchema);
