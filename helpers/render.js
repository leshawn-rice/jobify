/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {string} path 
 * 
 * Takes the request & response objects, and a string path as params,
 * returns the result of res.render with the given path, adding the 
 * current user to the template
 */

function render(req, res, path) {
  return res.render(path, { user: req.session.user });
}

module.exports = render;