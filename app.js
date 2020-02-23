// dependencies
const app = require('express')();
const port = process.env.PORT || 3000;
const routes = require('./routes/index');
app.use(require('express').json());

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

// Connect all routes to the application
app.use('/', routes);

// turn the server on
app.listen(port, () => console.log(`app listening on port ${port}!`))