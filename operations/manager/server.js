const express = require('express');
const fs = require('fs');
const env = require("process-env");

// Specify configuration file
env.load('config.env');

// Create Express web Server
const app = express();

// Declare dynamic routes
app.get('/getLogContents/console.log', (req, res) =>  { res.send(fs.readFileSync('./console.log').toString()); });
app.get('/getLogContents/errors.log', (req, res) =>  { res.send(fs.readFileSync('./errors.log').toString()); });

// Add Static file serving functionality
app.use(express.static('operations/manager/html'));

// Listen to port
app.listen(env.get("MANAGERSERVICE_PORT"), () => {
	console.log('GC Management Service is available on port ' + env.get("MANAGERSERVICE_PORT"));
});