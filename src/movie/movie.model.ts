import * as mongoose from 'mongoose';
const { Schema } = mongoose;

const movieSchema = new Schema(
    {
        name: { type: String, required: true },
        year: { type: Number, required: true },
        format: {
            type: String,
            required: true,
            enum: ['VHS', 'DVD', 'Blu-Ray'],
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
