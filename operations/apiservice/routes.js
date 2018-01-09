// Setup path resolution for Module requirements
const path = require("path");
// Create path resolution helper function
var p = (file) => { return path.resolve(process.cwd(), file); };

//
const express = require('express');

// Require set of Controller functions
const welcomeController = require( p("operations/apiservice/controllers/welcome.js") );

//
var GCApiServiceRouter = express.Router();

//
GCApiServiceRouter.get('/', welcomeController.get);


module.exports = GCApiServiceRouter;