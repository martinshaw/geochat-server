// Require Node.js modules
const env = require("process-env");
const express = require('express');
const bodyParser = require('body-parser');

// Specify configuration file
env.load('config.env');
var _port = env.get("APISERVICE_PORT")


/*
  The module which provides the URL and HTTP request method based routes
  which are used by the REST API express server
 */
const router = require("./routes.js");


// Create Express Server
var app = express();


// JSON formatting in response
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Routers
app.use('/api/v0.1', router);


// Start Express server listening on port, and display router routes.
var server = app.listen(_port, () => {

	require('./utils/displayRoutesTable.js')('/api/v0.1', router.stack);
	
});

console.log('GC API Service is available on port ' + _port);
