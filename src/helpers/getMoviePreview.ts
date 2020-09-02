import { MovieResponse, MoviePreview } from '../movie/movie.controller';

export const getMoviePreview = (movies: MovieResponse & Array<MovieResponse>): MoviePreview | Array<MoviePreview> => {
    if (movies.length) {
        return movies.map((movie) => ({
            _id: movie._id,
            Title: movie.Title,
            Format: movie.Format,
            ['Release Year']: movie['Release Year'],
            Stars: movie.Stars,
            createdAt: movie.createdAt,
        }));
    } else {
        const moviePreview: MoviePreview = {
            _id: movies._id,
            Title: movies.Title,
            Format: movies.Format,
            ['Release Year']: movies['Release Year'],
            Stars: movies.Stars,
            createdAt: movies.createdAt,
        };
        return moviePreview;
    }
};
