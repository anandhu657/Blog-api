const express = require('express');
const http = require('http');
const morgan = require('morgan');
const compression = require('compression');
const db = require('./src/Config/db.config');
require('dotenv').config();
const userRoute = require('./src/Routes/user.routes');
const postRoute = require('./src/Routes/post.route');

const app = express();
const server = http.createServer(app);

// MIDDLEWARES
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));
app.use(compression());

// ROUTES
app.use('/user', userRoute);
app.use('/blog', postRoute);

// DB CONNECTION
db.connect();

server.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`);
});