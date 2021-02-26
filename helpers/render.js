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

function render(req, res, path, templateVars) {
  const variables = { ...templateVars, user: req.session.user }
  return res.render(path, variables);
}

module.exports = render;