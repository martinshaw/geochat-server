const express = require('express');
const env = require("process-env");

// Specify configuration file
env.load('config.env');

// Create Express web Server
const app = express();

// Add Static file serving functionality
app.use(express.static('operations/manager/html'));

// Declare dynamic routes
app.get('/', (req, res) =>  {
	res.send('Hello World!');
});

// Listen to port
app.listen(env.get("MANAGERSERVICE_PORT"), () => {
	console.log('GC Management Service is available on port ' + env.get("MANAGERSERVICE_PORT"));
});