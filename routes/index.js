const express = require('express');
const router = new express.Router()

const { authenticateJWT, ensureLoggedIn } = require('../middleware/auth');

router.get('/', (req, res, next) => {
  try {
    return res.render('index.html')
  }
  catch (err) {
    return next(err);
  }
});

router.get('/login', (req, res, next) => {
  try {
    return res.render('login.html', { user: res.locals.user })
  }
  catch (err) {
    return next(err);
  }
});

router.post('/login', (req, res, next) => {
  try {
    const { username, password } = req.body;
    res.locals.user = { username, password }
    return res.render('login.html', { user: res.locals.user });
  }
  catch (err) {
    return next(err);
  }
});

router.get('/signup', (req, res, next) => {
  try {
    return res.render('signup.html');
  }
  catch (err) {
    return next(err);
  }
});

router.post('/signup', (req, res, next) => {
  try {
    // const { username, password } = req.body;
    // res.locals.user = { username: password }
    // return res.render('login.html', { user: res.locals.user })
  }
  catch (err) {
    return next(err);
  }
});


module.exports = router;