// Require Node.js modules
const env = require("process-env");
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require("mysql");
const l = require("./utils/logging.js");
const serverStatus = require('express-server-status');



// Specify configuration file
env.load('config.env');
var _port = env.get("APISERVICE_PORT")



/*
  The module which provides the URL and HTTP request method based routes
  which are used by the REST API express server
 */
const welcomeRouter = global.welcomeRouter = require("./routers/welcome.js");
const authRouter = global.authRouter = require("./routers/auth.js");
const usersRouter = global.usersRouter = require("./routers/users.js");
const sessionsRouter = global.sessionsRouter = require("./routers/sessions.js");

// Require set of Before/After middleware filters
const filters = require("./controllers/filters.js");



// Create Express Server
var app = global.app = express();



//Database connection

//	DEPRECIATED: DO NOT CONNECT ON EACH REQUEST
// app.use(function(req, res, next){
// 	global.connection = mysql.createConnection({
// 		host     : env.get("DB_HOST"),
// 		user     : env.get("DB_USERNAME"),
// 		password : env.get("DB_PASSWORD"),
// 		database : env.get("DB_DATABASE")
// 	});
// 	connection.connect();
// 	next();
// });

// 	NOW: CONNECT ON EACH SERVER START

global.connection = mysql.createConnection({
	host     : env.get("DB_HOST"),
	user     : env.get("DB_USERNAME"),
	password : env.get("DB_PASSWORD"),
	database : env.get("DB_DATABASE")
});
connection.connect();



// JSON formatting in Request Body
app.use(bodyParser.urlencoded({ extended: false }));



// Express Server Status
app.use('/status', filters.requiresSessionKey, serverStatus(app));



// Routers
app.use('/api/v0.1', welcomeRouter);
app.use('/api/v0.1/auth', authRouter);
app.use('/api/v0.1/users', usersRouter);
app.use('/api/v0.1/sessions', sessionsRouter);



// Start Express server listening on port, and display router routes.
var server = app.listen(_port, () => {

	require('./utils/displayRoutesTable.js')('/api/v0.1', welcomeRouter.stack);
	require('./utils/displayRoutesTable.js')('/api/v0.1/auth', authRouter.stack);
	require('./utils/displayRoutesTable.js')('/api/v0.1/users', usersRouter.stack);
	require('./utils/displayRoutesTable.js')('/api/v0.1/sessions', sessionsRouter.stack);
	
});


console.log('GC API Service is available on port ' + _port);