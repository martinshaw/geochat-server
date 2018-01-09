// Setup path resolution for Module requirements
const path = require("path");
// Create path resolution helper function
var p = (file) => { return path.resolve(process.cwd(), file); };

// Require functions for formating consistant JSON responses
const resFormat = require( p("operations/apiservice/formatting.js") );

//
module.exports = {
	get: (req, res) => {
  		res.json(resFormat.statusOk("Missing Element!", { message: '123' }));  
	}
}