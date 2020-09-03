import { MovieResponse, MoviePreview } from '../movie/movie.controller';

export const getMoviePreview = (movies: MovieResponse & Array<MovieResponse>): MoviePreview | Array<MoviePreview> => {
    if (movies.length) {
        return movies.map((movie) => ({
            _id: movie._id,
            title: movie.title,
            format: movie.format,
            year: movie.year,
            stars: movie.stars,
            createdAt: movie.createdAt,
        }));
    } else {
        const moviePreview: MoviePreview = {
            _id: movies._id,
            title: movies.title,
            format: movies.format,
            year: movies.year,
            stars: movies.stars,
            createdAt: movies.createdAt,
        };
        return moviePreview;
    }
};
