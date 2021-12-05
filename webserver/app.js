var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const db = require('./database');
const jwt = require('jsonwebtoken');
const cors = require('cors');

var app = express();
app.options('*', cors());
app.use(cors());

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const loginRouter = require('./routes/login');
const resultsRouter = require('./routes/results');

global.SECRET = "fightingMongooses";

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Set server port
const HTTP_PORT = 5000;
// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});

app.use('/app/', indexRouter);
app.use('/app/users', usersRouter);
app.use('/app/login', loginRouter);
app.use('/app/results', resultsRouter);

module.exports = app;
