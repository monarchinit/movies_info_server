import { Router } from 'express';
import { movieController } from './movie.controller';

const router = Router();

router.post('/', movieController.validateCreateFilm, movieController.createMovie);
router.get('/', movieController.getMovies);

export const movieRouter = router;
