// Require functions for formating consistant JSON responses
const resFormat = require("../utils/formatting.js");

//
module.exports = {
	get: (req, res) => {
  		res.json(resFormat.statusOk({ message: '123' }));  
	}
}