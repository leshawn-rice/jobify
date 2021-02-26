function render(req, res, path) {
  return res.render(path, { user: req.session.user });
}

module.exports = render;