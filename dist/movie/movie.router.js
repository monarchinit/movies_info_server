"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.movieRouter = void 0;
const express_1 = require("express");
const movie_controller_1 = require("./movie.controller");
const router = express_1.Router();
router.post('/', movie_controller_1.movieController.validateCreateFilm, movie_controller_1.movieController.createMovie);
router.get('/', movie_controller_1.movieController.getMovies);
exports.movieRouter = router;
