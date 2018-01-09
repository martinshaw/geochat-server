// Setup path resolution for Module requirements
const path = require("path");
// Create path resolution helper function
var p = (file) => { return path.resolve(process.cwd(), file); };

const env = require("process-env");


// Object used in place of global variables.
// For storing commonly used data for all of the modules.
var GC = {}

// ======================================================


// Get configuration info from this instance's ENV file
env.load(p('config.env'));


// ======================================================


/*
  The module which provides a REST API express server
  for use by a client application.
 */
const GCApiService = require( p("operations/apiservice/index.js") );

// Start the API server
GCApiService.init(env.get("APISERVICE_PORT"));


// ==========================================


/*
  The module which provides a openstreetmap tile server
  for use by a client application.
 */
const GCMapService = require( p("operations/mapservice/index.js") );

// Start the API server
GCMapService.init(env.get("MAPSERVICE_PORT"));


// ==========================================
