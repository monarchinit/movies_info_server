const { MoviesServer } = require('./server');
require('dotenv').config();
new MoviesServer().start();
