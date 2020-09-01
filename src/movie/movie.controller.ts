const Joi = require('joi');
import { ValidationError } from '../helpers/error.constructor';

export enum movieFormat {
    'VHS',
    'DVD',
    'Blu-Ray',
}
interface MovieResponse {
    _id: string;
    name: string;
    year: number;
    format: movieFormat;
    cast: string[];
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}

export interface MovieRequest {
    name: string;
    year: number;
    format: movieFormat;
    cast: string[];
}

type MoviePreview = Omit<MovieResponse, '__v' | 'updatedAt'>;

import { movieModel } from './movie.model';

class FilmController {
    public async createMovie(req, res, next) {
        // 1. validate body
        // 2. create film
        const body: MovieRequest = req.body;

        const { name, year, format, cast } = body;
        try {
            const movie: MovieResponse = await movieModel.createMovie(name, year, format, cast);
            const moviePreview: MoviePreview = {
                _id: movie._id,
                name: movie.name,
                format: movie.format,
                year: movie.year,
                cast: movie.cast,
                createdAt: movie.createdAt,
            };

            return res.status(201).json({ result: true, movie: moviePreview });
        } catch (e) {
            next(e);
        }
    }

    public async getMovies(req, res) {
        const movies = await movieModel.find();
        return res.status(200).json({
            result: true,
            movies: movies.map(
                ({ _id, name, year, format, cast, createdAt }): MoviePreview => ({
                    _id,
                    name,
                    year,
                    format,
                    cast,
                    createdAt,
                }),
            ),
        });
    }

    public validateCreateFilm(req, _, next): void {
        const createFilmRules = Joi.object({
            name: Joi.string().required(),
            year: Joi.number().required(),
            format: Joi.string().required(),
            cast: Joi.array().items(Joi.string()),
        });
        const body: MovieRequest = req.body;
        const result = createFilmRules.validate({ ...body });
        if (result.error) {
            return next(new ValidationError(result.error));
        }

        next();
    }
}

export const movieController = new FilmController();
