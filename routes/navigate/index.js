const navigate = require('express').Router(); // custom router
const Client = require('ssh2-sftp-client');
let sftp;
let userDetails = { // local reference to details
    host: null, port: null, username: null, password: null, foldername: null
};
let navigatedPath = ''; // The path that the user was navigating to

/**
 * For making connection the first time
 */
navigate.post('/', (req, res) => {
    sftp = new Client();
    userDetails = { // store details
        host: req.body.host,
        port: '22',
        username: req.body.username,
        password: req.body.password
    }

    sftp.connect(userDetails).then(() => {
        sftp.list('/').then((list) => { res.json({ "folders": list }) });
    }).then(() => sftp.end()).catch(err => {
        console.log('Something went wrong ', err);
    });
});

/**
 * This endpoint will handle navigation between different directories
 */
navigate.post('/to', (req, res) => {
    navigatedPath = userDetails.foldername; // the path that the user was navigating to
    sftp.list(`${navigatedPath}`)
        .then((list) => {
            res.json({ "folders": list });
        }).catch(err => {
            console.log('hier zit een error', err);
        });
});

/**
 * This endpoint will handle any file uploads
 */
navigate.post('/upload', async (req, res) => {
    const result = await sftp.put(req.files.file.data, `${navigatedPath}/${req.files.file.name}`);
    if (result) {
        sftp.list(path).then(list => {
            res.json({ "folders": list });
        })
    }
});

/**
 * This endpoint will remove folders from the server
 */
navigate.post('/delete', async (req, res) => {
    try {
        await sftp.delete(`${navigatedPath}/${req.fileName}`);
        sftp.list(path).then(list => {
            res.json({ "folders": list });
        });
    } catch (err) {
        res.json({ "server_error": `something went wrong: ${err.message}` })
    }
});


/**
 * This method will return a connection promise
 */
const connectToServer = async () => {
    const conn = await sftp.connect(userDetails);
    return conn;
}

/**
 * This method will return a promise of listed files in a specific folder on the server
 * 
 * @param {*} path - the path to specific server
 */
const listToFolder = async (path) => {
    const list = await sftp.list(path);
    return list;
}

/**
 * This method is going to be implemented to handle errors
 * 
 * @param {*} err 
 */
const navigationError = (err) => {
    return res.json({ "application_error": err });
}

module.exports = navigate;