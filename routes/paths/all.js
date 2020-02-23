const data = require('../../routes.json');

module.exports = (req, res) => {
    const paths = data;

    res.status(200).json({ paths });
}