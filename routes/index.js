const express = require('express');
const router = express.Router()// express router
const paths = require('./paths/index'); // path endpoints
const navigate = require('./navigate/index'); // navigate endpoints

router.get('/', (req, res) => {
    res.status(200).json({ message: 'Welkom, this site is being used to serve some API data!' });
});

router.use('/paths', paths);
router.use('/navigate', navigate);

module.exports = router; // make router available for application