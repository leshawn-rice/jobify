// External Dependencies
const express = require('express');
const router = new express.Router();

// Internal Dependencies
const render = require('../helpers/render');

// Middleware
const { ensureLoggedIn } = require('../middleware/auth');

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

router.post('/login', (req, res, next) => {
  try {
    const { username, password } = req.body;
    req.session.user.username = username;
    return res.redirect('/');
  }
  catch (err) {
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

router.post('/signup', (req, res, next) => {
  try {
    const { username, password } = req.body;
    req.session.user.username = username;
    return res.redirect('/');
  }
  catch (err) {
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