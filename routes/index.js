const express = require('express');
const router = new express.Router();
const render = require('../helpers/render');

const { authenticateJWT, ensureLoggedIn } = require('../middleware/auth');
const { SECRET_KEY } = require('../config');

router.get('/', (req, res, next) => {
  try {
    return render(req, res, 'index.html');
  }
  catch (err) {
    return next(err);
  }
});

router.get('/login', (req, res, next) => {
  try {
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
    return render(req, res, 'index.html');
  }
  catch (err) {
    return next(err);
  }
});

router.get('/signup', (req, res, next) => {
  try {
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
    return render(req, res, 'index.html');
  }
  catch (err) {
    return next(err);
  }
});


module.exports = router;