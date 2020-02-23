const routes = require('express').Router(); // express router
const paths = require('./paths/index');
const navigate = require('./navigate/index');

routes.get('/', (req, res) => {
    res.status(200).json({ message: 'Connected!' });
});

routes.use('/paths', paths);
routes.use('/navigate', navigate);

module.exports = routes; // make router available for application