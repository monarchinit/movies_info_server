export declare enum movieFormat {
    'VHS' = 0,
    'DVD' = 1,
    'Blu-Ray' = 2
}
export interface MovieRequest {
    name: string;
    year: number;
    format: movieFormat;
    cast: string[];
}
declare class FilmController {
    createMovie(req: any, res: any, next: any): Promise<any>;
    getMovies(req: any, res: any): Promise<any>;
    validateCreateFilm(req: any, _: any, next: any): void;
}
export declare const movieController: FilmController;
export {};
