// External Dependencies
const express = require('express');
const router = new express.Router();

// Internal Dependencies
const render = require('../helpers/render');
const states = require('../helpers/states');
const findJobs = require('../helpers/jobSearch');

// Middleware
const { ensureLoggedIn } = require('../middleware/auth');

// Errors
const { UnauthorizedError } = require('../expressErrors');

router.get('/', (req, res, next) => {
  try {
    return res.send('Hello World');
  }
  catch (err) {
    return next(err);
  }
})

router.get('/find', ensureLoggedIn, (req, res, next) => {
  try {
    return render(req, res, 'find-jobs.html', { states });
  }
  catch (err) {
    return next(err);
  }
});

router.post('/find', ensureLoggedIn, async (req, res, next) => {
  try {
    const { searchTerm, city, state, expLevel, maxResults } = req.body;


    const jobs = await findJobs(searchTerm, city, state, expLevel, maxResults);

    return render(req, res, 'show-jobs.html', { jobs });
  }
  catch (err) {
    return next(err);
  }
});

module.exports = router;