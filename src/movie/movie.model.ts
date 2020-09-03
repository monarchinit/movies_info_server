import * as mongoose from 'mongoose';
import { MovieRequest } from './movie.controller';
const { Schema } = mongoose;

const movieSchema = new Schema(
    {
        title: { type: String, required: true },
        year: { type: Number, required: true },
        format: {
            type: String,
            required: true,
            enum: ['VHS', 'DVD', 'Blu-Ray'],
        },
        stars: [{ type: String, required: true }],
    },
    {
        timestamps: true,
    },
);

movieSchema.statics.createMovie = createMovie;
movieSchema.statics.createMovieMany = createMovieMany;

function createMovie({ title, year, format, stars }: MovieRequest) {
    return this.create({ title, year, format, stars });
}

function createMovieMany(arg: Array<MovieRequest>) {
    return this.insertMany(arg);
}

// movies
export const movieModel = mongoose.model('Movie', movieSchema);
