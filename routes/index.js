const routes = require('express').Router(); // express router
const paths = require('./paths/index'); // path endpoints
const navigate = require('./navigate/index'); // navigate endpoints

routes.get('/', (req, res) => {
    res.status(200).json({ message: 'Welkom, this site is being used to serve some API data!' });
});
routes.use('/paths', paths);
routes.use('/navigate', navigate);

module.exports = routes; // make router available for application