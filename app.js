const express = require('express');
const http = require('http');
const morgan = require('morgan');
const compression = require('compression');
const db = require('./src/Config/db.config');
require('dotenv').config();

const app = express();
const server = http.createServer(app);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));
app.use(compression());

db.connect();

server.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`);
});