/** Express app for jobly. */

// External Dependencies
const express = require("express");
const cors = require("cors");
const favicon = require('serve-favicon');
const session = require('express-session');

// Internal Dependencies
const { SECRET_KEY } = require('./config');

// Middleware & Errors
const { NotFoundError } = require("./expressErrors");
const { checkSession } = require("./middleware/auth");

// Routes
const indexRoutes = require('./routes/index');

const app = express();

app.use(cors());
app.use(session({
  secret: SECRET_KEY,
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false }
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(favicon(__dirname + '/public/img/favicon.ico'));
app.use(checkSession);

app.use('/', indexRoutes);

app.use(express.static('public'));


/** Handle 404 errors -- this matches everything */
app.use(function (req, res, next) {
  return next(new NotFoundError());
});

/** Generic error handler; anything unhandled goes here. */
app.use(function (err, req, res, next) {
  if (process.env.NODE_ENV !== "test") console.error(err.stack);
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({
    error: { message, status },
  });
});

module.exports = app;
