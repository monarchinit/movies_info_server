import * as mongoose from 'mongoose';
import { MovieRequest } from './movie.controller';
const { Schema } = mongoose;

const movieSchema = new Schema(
    {
        Title: { type: String, required: true },
        ['Release Year']: { type: Number, required: true },
        Format: {
            type: String,
            required: true,
            enum: ['VHS', 'DVD', 'Blu-Ray'],
        },
        Stars: [{ type: String, required: true }],
    },
    {
        timestamps: true,
    },
);

movieSchema.statics.createMovie = createMovie;
movieSchema.statics.createMovieMany = createMovieMany;

function createMovie({ Title, ['Release Year']: year, Format, Stars }: MovieRequest) {
    return this.create({ Title, ['Release Year']: year, Format, Stars });
}

function createMovieMany(arg: Array<MovieRequest>) {
    return this.insertMany(arg);
}

// movies
export const movieModel = mongoose.model('Movie', movieSchema);
