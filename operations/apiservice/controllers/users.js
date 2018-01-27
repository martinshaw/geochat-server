// Require functions for formating consistant JSON responses
const resFormat = require("../utils/formatting.js");
const l = require("../utils/logging.js");

//
module.exports = {
	getAll: (req, res) => {

  		global.connection.query('SELECT * from users', function (error, results, fields) {
			if(error){
				l.error(error);
  				res.json(resFormat.statusError(500, "Database Error :("));  

			} else {
				l.console("Attempting to access all \'users\' records...");
				l.console(results);
  				res.json(resFormat.statusOk(results));  

			}
		});


	}
}