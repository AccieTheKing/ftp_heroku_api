const navigate = require('express').Router(); // custom router
let Client = require('ssh2-sftp-client');
let sftp = new Client();

/**
 * For making connection the first time
 */
navigate.post('/', (req, res) => {
    const userDetails = {
        host: req.body.host,
        port: '22',
        username: req.body.username,
        password: req.body.password
    };
    sftp.connect(userDetails).then(() => {
        sftp.list('/').then((list) => { res.json({ "folders": list }) });
    }).catch(err => {
        console.log(err);
    });
});

navigate.post('/to', (req, res) => {
    const connSettings = {
        host: req.body.host,
        port: '22',
        username: req.body.username,
        password: req.body.password,
        foldername: req.body.foldername
    };

    // res.json({ "folders": req.body })
    sftp.list(`${connSettings.foldername}`)
        .then((list) => { res.json({ "folders": list }) })
        .catch(err => console.log('hier zit een error', err));
});

navigate.get('/all', (req, res) => {
    res.json({ "folders": conn.list('/') });
});


function navigationError(err) {
    return res.json({ "application_error": err });
}

module.exports = navigate;