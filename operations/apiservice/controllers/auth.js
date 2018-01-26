// Require functions for formating consistant JSON responses
const resFormat = require("../utils/formatting.js");

//
module.exports = {
	signin: (req, res) => {
  		res.json(resFormat.statusOk({ user: '123' }));  
	}
}