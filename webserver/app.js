var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const db = require('./database');
const jwt = require('jsonwebtoken');
const cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const loginRouter = require('./routes/login');
const resultsRouter = require('./routes/results');

var app = express();

global.SECRET = "fightingMongooses";

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.options('*', cors());
app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Set server port
const HTTP_PORT = 5000;
// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});

const verifyToken = (req) => {
    const token = req.cookies.token;
    if (!token) return {code: 500, message: "Missing token"}
    try {
      const user = jwt.verify(token, SECRET);
      if (user) {
        req.currentUser = user;
        return { code: 200, message: "OK" }
      }
    } catch (err){
      return {code: 401, message: err.message}
    }
}
const verifyUser = (req, res, next) => {
    if (req.path === '/app/login' || req.path === '/app/users/add') return next();
    const result = verifyToken(req, res);
    if (result.code === 200) next();
    else {
      res.status(result.code);
      res.send(result.message);
    }
  }
  app.all('*', verifyUser);

app.use('/app/', indexRouter);
app.use('/app/users', usersRouter);
app.use('/app/login', loginRouter);
app.use('/app/results', resultsRouter);

module.exports = app;
