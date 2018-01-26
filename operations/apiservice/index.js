// Require Node.js modules
const env = require("process-env");
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require("mysql");

// Specify configuration file
env.load('config.env');
var _port = env.get("APISERVICE_PORT")


/*
  The module which provides the URL and HTTP request method based routes
  which are used by the REST API express server
 */
const welcomeRouter = require("./routers/welcome.js");
const authRouter = require("./routers/auth.js");


// Create Express Server
var app = express();


//Database connection
app.use(function(req, res, next){
	global.connection = mysql.createConnection({
		host     : env.get("DB_HOST"),
		user     : env.get("DB_USERNAME"),
		password : env.get("DB_PASSWORD"),
		database : env.get("DB_DATABASE")
	});
	connection.connect();
	next();
});


// JSON formatting in response
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Routers
app.use('/api/v0.1', welcomeRouter);
app.use('/api/v0.1/auth', authRouter);


// Start Express server listening on port, and display router routes.
var server = app.listen(_port, () => {

	require('./utils/displayRoutesTable.js')('/api/v0.1', welcomeRouter.stack);
	require('./utils/displayRoutesTable.js')('/api/v0.1/auth', authRouter.stack);
	
});

console.log('GC API Service is available on port ' + _port);
