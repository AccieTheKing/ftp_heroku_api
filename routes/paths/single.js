const data = require('../../routes.json');

module.exports = (req, res) => {
    const pathname = req.query.name;
    const method = req.query.method;
    const singlePathObject = data.find(p => p.url === `/${pathname}` && p.method === method.toUpperCase());

    res.status(200).json({ "pathdetails": singlePathObject });
}