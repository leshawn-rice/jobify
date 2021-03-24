const { UnauthorizedError } = require("../expressErrors");

/** Middleware: Check Session.
 *
 * If the session does not contain a user object, create an object named user
 * on the session.
 *
 */

function checkSession(req, res, next) {
  try {
    if (!req.session.user) {
      req.session.user = {}
    }
    return next();
  } catch (err) {
    return next();
  }
}

/** Middleware to use when they must be logged in.
 *
 * If not, raises Unauthorized.
 */

function ensureLoggedIn(req, res, next) {
  try {
    if (!req.session.user.username) throw new UnauthorizedError();
    return next();
  } catch (err) {
    return res.redirect('/?unauth=true');
  }
}

module.exports = {
  checkSession,
  ensureLoggedIn
};