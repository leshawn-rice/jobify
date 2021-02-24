const app = require('./app');
const { PORT } = require("./config");
const nunjucks = require('nunjucks');

nunjucks.configure('public/html', {
  autoescape: true,
  express: app
});


app.listen(PORT, function () {
  console.log(`Started on http://localhost:${PORT}`);
});