import { Router } from 'express';
import { movieController } from './movie.controller';

const router = Router();

router.post('/', movieController.validateCreateFilm, movieController.createMovie);
router.get('/', movieController.getMovies);
router.delete('/', movieController.validateDeleteMovie, movieController.deleteMovie);

export const movieRouter = router;
