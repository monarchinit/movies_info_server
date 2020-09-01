"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.movieController = exports.movieFormat = void 0;
const Joi = require('joi');
const error_constructor_1 = require("../helpers/error.constructor");
var movieFormat;
(function (movieFormat) {
    movieFormat[movieFormat["VHS"] = 0] = "VHS";
    movieFormat[movieFormat["DVD"] = 1] = "DVD";
    movieFormat[movieFormat["Blu-Ray"] = 2] = "Blu-Ray";
})(movieFormat = exports.movieFormat || (exports.movieFormat = {}));
const movie_model_1 = require("./movie.model");
class FilmController {
    createMovie(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // 1. validate body
            // 2. create film
            const body = req.body;
            const { name, year, format, cast } = body;
            try {
                const movie = yield movie_model_1.movieModel.createMovie(name, year, format, cast);
                const moviePreview = {
                    _id: movie._id,
                    name: movie.name,
                    format: movie.format,
                    year: movie.year,
                    cast: movie.cast,
                    createdAt: movie.createdAt,
                };
                return res.status(201).json({ result: true, movie: moviePreview });
            }
            catch (e) {
                next(e);
            }
        });
    }
    getMovies(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const movies = yield movie_model_1.movieModel.find();
            return res.status(200).json({
                result: true,
                movies: movies.map(({ _id, name, year, format, cast, createdAt }) => ({
                    _id,
                    name,
                    year,
                    format,
                    cast,
                    createdAt,
                })),
            });
        });
    }
    validateCreateFilm(req, _, next) {
        const createFilmRules = Joi.object({
            name: Joi.string().required(),
            year: Joi.number().required(),
            format: Joi.string().required(),
            cast: Joi.array().items(Joi.string()),
        });
        const body = req.body;
        const result = createFilmRules.validate(Object.assign({}, body));
        if (result.error) {
            return next(new error_constructor_1.ValidationError(result.error));
        }
        next();
    }
}
exports.movieController = new FilmController();
