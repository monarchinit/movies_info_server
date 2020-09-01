import * as mongoose from 'mongoose';
import { movieFormat } from './movie.controller';
const { Schema } = mongoose;

const movieSchema = new Schema(
    {
        name: { type: String, required: true },
        year: { type: Number, required: true },
        format: {
            type: String,
            required: true,
            enum: [movieFormat[0], movieFormat[1], movieFormat[2]],
        },
        cast: [{ type: String, required: true }],
    },
    {
        timestamps: true,
    },
);

movieSchema.statics.createMovie = createMovie;

function createMovie(name, year, format, cast) {
    return this.create({ name, year, format, cast });
}

// movies
export const movieModel = mongoose.model('Movie', movieSchema);
