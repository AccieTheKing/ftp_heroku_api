const navigate = require('express').Router(); // custom router
let Client = require('ssh2-sftp-client');
let sftp = new Client(); // new sftp
let path = ''; // The path that the user was navigating to

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

/**
 * This method will handle 
 */
navigate.post('/to', (req, res) => {
    const connSettings = {
        host: req.body.host,
        port: '22',
        username: req.body.username,
        password: req.body.password,
        foldername: req.body.foldername
    };

    path = connSettings.foldername; // the path that the user was navigating to
    sftp.list(`${path}`)
        .then((list) => {
            res.json({ "folders": list });
        }).catch(err => {
            console.log('hier zit een error', err);
        });
});

/**
 * This method will handle any file uploads
 */
navigate.post('/upload', async (req, res) => {
    const result = await sftp.put(req.files.file.data, `${path}/${req.files.file.name}`);
    if (result) {
        sftp.list(path).then(list => {
            res.json({ "folders": list });
        })
    }
});

/**
 * This method is going to be implemented to handle errors
 * 
 * @param {*} err 
 */
const navigationError = (err) => {
    return res.json({ "application_error": err });
}

module.exports = navigate;