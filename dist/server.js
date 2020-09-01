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
exports.MoviesServer = void 0;
const express = require("express");
const mongoose = require("mongoose");
const movie_router_1 = require("./movie/movie.router");
class MoviesServer {
    constructor() {
        this.server = null;
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            this.initServer();
            this.initMiddleware();
            this.initRoutes();
            yield this.initDatabase();
            this.startListening();
        });
    }
    initServer() {
        this.server = express();
    }
    initMiddleware() {
        this.server.use(express.json());
    }
    initRoutes() {
        this.server.use('/movies', movie_router_1.movieRouter);
        this.server.use((err, req, res, next) => {
            console.log(err);
            delete err.stack;
            next(err);
        });
    }
    initDatabase() {
        return __awaiter(this, void 0, void 0, function* () {
            yield mongoose.connect(process.env.MONGODB_URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                autoIndex: false,
            });
        });
    }
    startListening() {
        const port = process.env.PORT;
        this.server.listen(port, () => {
            console.log('Server started listening on port', port);
        });
    }
}
exports.MoviesServer = MoviesServer;
