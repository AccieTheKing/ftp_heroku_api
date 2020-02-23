const paths = require('express').Router(); // create express router
const all = require('./all');
const single = require('./single');

paths.get('/', all);
paths.get('/details', single);

module.exports = paths;