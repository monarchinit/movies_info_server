import * as express from 'express';
export declare class MoviesServer {
    server: typeof express;
    start(): Promise<void>;
    initServer(): void;
    initMiddleware(): void;
    initRoutes(): void;
    initDatabase(): Promise<void>;
    startListening(): void;
}
