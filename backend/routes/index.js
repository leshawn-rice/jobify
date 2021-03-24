// External Dependencies
const express = require('express');
const router = new express.Router();

// Internal Dependencies
const render = require('../helpers/render');
const User = require('../models/user');

// Middleware
const { ensureLoggedIn } = require('../middleware/auth');
const { BadRequestError, UnauthorizedError } = require('../expressErrors');

router.get('/', (req, res, next) => {
  try {
    if (req.query.unauth) {
      return render(req, res, 'index.html', { message: 'You must be logged in to do that!' });
    }
    return render(req, res, 'index.html');
  }
  catch (err) {
    return next(err);
  }
});

router.get('/login', (req, res, next) => {
  try {
    if (req.session.user.username) {
      return render(req, res, 'index.html');
    }
    return render(req, res, 'login.html');
  }
  catch (err) {
    return next(err);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.authenticate(username, password);
    req.session.user = user;
    return res.redirect('/');
  }
  catch (err) {
    if (err instanceof UnauthorizedError) {
      return render(req, res, 'login.html', { invalidLogin: true })
    }
    return next(err);
  }
});

router.get('/signup', (req, res, next) => {
  try {
    if (req.session.user.username) {
      return render(req, res, 'index.html');
    }
    return render(req, res, 'signup.html');
  }
  catch (err) {
    return next(err);
  }
});

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.register(req.body);
    req.session.user = user;
    return res.redirect('/');
  }
  catch (err) {
    if (err instanceof BadRequestError) {
      if (err.message === 'Passwords do not match!') {
        return render(req, res, 'signup.html', { passwordMismatch: true, usernameFill: req.body.username })
      }
      if (err.message === `Duplicate username: ${req.body.username}`) {
        return render(req, res, 'signup.html', { usernameExists: true })
      }
    }
    return next(err);
  }
});

router.get('/sign-out', (req, res, next) => {
  try {
    req.session.user = {}
    return res.redirect('/');
  }
  catch (err) {
    return next(err);
  }
});


module.exports = router;