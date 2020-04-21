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
navigate.post('/', async (req, res) => {
    try {
        sftp = new Client();
        userDetails = { // store details
            host: req.body.host,
            port: '22',
            username: req.body.username,
            password: req.body.password
        }
        await sftp.connect(userDetails);
        await sftp.list('/').then((list) => { res.json({ "folders": list }) });
    } catch (err) {
        res.json({ server_error: err.message });
        console.log('Something went wrong ', err);
    }
});

/**
 * This endpoint will handle navigation between different directories
 */
navigate.post('/to', async (req, res) => {
    try {
        navigatedPath = req.body.foldername; // the path that the user was navigating to
        const list = await sftp.list(`${navigatedPath}`);
        res.json({ "folders": list })
    } catch (err) {
        res.json({ "server_error": `something went wrong: ${err.message}` });
        console.warn(`something went wrong with navigating through folders: ${err.message}`)
    }
});

/**
 * This endpoint will handle any file uploads
 */
navigate.post('/upload', async (req, res) => {
    try {
        await sftp.put(req.files.file.data, `${navigatedPath}/${req.files.file.name}`);
        const list = await sftp.list(navigatedPath);
        res.json({ "folders": list });
    } catch (err) {
        res.json({ "server_error": `something went wrong: ${err}` });
        console.warn(`something went wrong with uploading: ${err}`);
    }
});

/**
 * This endpoint will remove folders from the server
 */
navigate.post('/delete', async (req, res) => {
    try {
        await sftp.delete(`${navigatedPath}/${req.body.file}`);
        const list = await sftp.list(navigatedPath);
        res.json({ "folders": list });
    } catch (err) {
        res.json({ "server_error": `something went wrong: ${err}` });
        console.warn(`something went wrong with uploading: ${err}`);
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
    try {
        const list = await sftp.list(path);
        return list;
    } catch (err) {

    }
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