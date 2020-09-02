import * as express from 'express';
import * as mongoose from 'mongoose';
import * as cors from 'cors';
import { movieRouter } from './movie/movie.router';

export class MoviesServer {
    server: typeof express = null;

    async start() {
        this.initServer();
        this.initMiddleware();
        this.initRoutes();
        await this.initDatabase();
        this.startListening();
    }

    initServer() {
        this.server = express();
    }

    initMiddleware() {
        this.server.use(express.json());
    }

    initRoutes() {
        var allowedOrigins = ['http://localhost:3000', 'http://yourapp.com'];
        this.server.use(
            cors({
                origin: function (origin, callback) {
                    // allow requests with no origin
                    // (like mobile apps or curl requests)
                    if (!origin) return callback(null, true);
                    if (allowedOrigins.indexOf(origin) === -1) {
                        var msg = 'The CORS policy for this site does not ' + 'allow access from the specified Origin.';
                        return callback(new Error(msg), false);
                    }
                    return callback(null, true);
                },
            }),
        );
        this.server.use('/movies', movieRouter);
        this.server.use((err, req, res, next) => {
            console.log(err);
            delete err.stack;
            next(err);
        });
    }

    async initDatabase() {
        await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            autoIndex: false,
        });
    }

    startListening() {
        const port = process.env.PORT;

        this.server.listen(port, () => {
            console.log('Server started listening on port', port);
        });
    }
}
