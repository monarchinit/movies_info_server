const Joi = require('joi');
import { ValidationError } from '../helpers/error.constructor';
import { movieModel } from './movie.model';
import { getMoviePreview } from '../helpers/getMoviePreview';

export enum movieFormat {
    'VHS',
    'DVD',
    'Blu-Ray',
}
export interface MovieResponse {
    _id: string;
    Title: string;
    ['Release Year']: number;
    Format: movieFormat;
    Stars: string[];
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}

export interface MovieRequest {
    Title: string;
    ['Release Year']: number;
    Format: movieFormat;
    Stars: string[];
}

export type MovieRequestMix = MovieRequest & Array<MovieRequest>;

export type MoviePreview = Omit<MovieResponse, '__v' | 'updatedAt'>;

class FilmController {
    public async createMovie(req, res, next) {
        try {
            const body: MovieRequestMix = req.body;
            if (body.length) {
                const movie: MovieResponse & MovieResponse[] = await movieModel.createMovieMany(body);
                return res.status(201).json({ result: true, movie: getMoviePreview(movie) });
            } else {
                const { Title, Format, Stars } = body;
                const movie: MovieResponse & MovieResponse[] = await movieModel.createMovie({
                    Title,
                    ['Release Year']: body['Release Year'],
                    Format,
                    Stars,
                });
                return res.status(201).json({ result: true, movie: getMoviePreview(movie) });
            }
        } catch (e) {
            next(e);
        }
    }

    public async getMovies(req, res, next) {
        try {
            const movies = await movieModel.find();
            return res.status(200).json({
                result: true,
                movies: movies.map(
                    ({ _id, Title, ['Release Year']: year, Format, Stars, createdAt }): MoviePreview => ({
                        _id,
                        Title,
                        ['Release Year']: year,
                        Format,
                        Stars,
                        createdAt,
                    }),
                ),
            });
        } catch (e) {
            next(e);
        }
    }

    public async getMovie(req, res, next) {
        try {
            const { movieId } = req.params;

            const movie = await movieModel.findById(movieId);
            if (!movie) {
                return res.status(404).json({ result: false, message: `Movie with id ${movieId} was not found` });
            }

            return res.status(200).json(movie);
        } catch (err) {
            next(err);
        }
    }

    public async deleteMovie(req, res, next) {
        const { movieId } = req.params;
        try {
            const result = await movieModel.findByIdAndDelete(movieId);
            if (!result) {
                return res.status(404).json({ result: false, message: `Movie with id ${movieId} was not found` });
            }
            return res.status(200).json({ result: true });
        } catch (e) {
            next(e);
        }
    }

    public validateCreateFilm(req, _, next): void {
        const createFilmRules = Joi.object({
            Title: Joi.string().required(),
            ['Release Year']: Joi.number().required(),
            Format: Joi.string().required(),
            Stars: Joi.array().items(Joi.string()),
        });
        const createManyFilmRules = Joi.array().items(
            Joi.object({
                Title: Joi.string().required(),
                ['Release Year']: Joi.number().required(),
                Format: Joi.string().required(),
                Stars: Joi.array().items(Joi.string()),
            }),
        );
        const body: MovieRequestMix = req.body;
        if (body.length) {
            const resultMany = createManyFilmRules.validate([...body]);
            if (resultMany.error) {
                return next(new ValidationError(resultMany.error));
            }
        } else {
            const result = createFilmRules.validate({ ...body });

            if (result.error) {
                return next(new ValidationError(result.error));
            }
        }

        next();
    }
}

export const movieController = new FilmController();
