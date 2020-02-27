// dependencies
const app = require('express')();
const port = process.env.PORT || 3000;

// npm package
const cors = require('cors');
const fileUpload = require('express-fileupload');
const routes = require('./routes/index');

app.use(require('express').json()); // make use of json responses
app.use(fileUpload()); // able to handle uploaded files
app.use(cors());

// Connect all request to created routes
app.use('/', routes);

// turn the server on
app.listen(port, () => console.log(`app listening on port ${port}!`))