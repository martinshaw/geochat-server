// Setup path resolution for Module requirements
const path = require("path");
// Create path resolution helper function
var p = (file) => { return path.resolve(process.cwd(), file); };

//
const express = require('express');
const bodyParser = require('body-parser');

/*
  The module which provides the URL and HTTP request method based routes
  which are used by the REST API express server
 */
const GCApiServiceRouter = require( p("operations/apiservice/routes.js") );

// Create object returned when module is required by another script
var GCApiService = {};



GCApiService.init = (_port) => {

	GCApiService.app = express();

	GCApiService.app.use(bodyParser.urlencoded({ extended: true }));
	GCApiService.app.use(bodyParser.json());

	GCApiService.app.use('/api', GCApiServiceRouter);

	GCApiService.app.listen(_port);
	
	console.log('GC API Service is available on port ' + _port);


}





module.exports = GCApiService;
