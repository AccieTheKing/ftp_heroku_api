// dependencies
const app = require('express')();
const port = process.env.PORT || 3000;
let cors = require('cors')
const routes = require('./routes/index');
app.use(require('express').json());

app.use(cors());

// Connect all routes to the application
app.use('/', routes);

// turn the server on
app.listen(port, () => console.log(`app listening on port ${port}!`))