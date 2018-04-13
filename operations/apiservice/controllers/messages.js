// Require functions for formating consistant JSON responses
const resFormat = require("../utils/formatting.js");
const l = require("../utils/logging.js");


module.exports = {

	getAllMessages: (req, res) => {

  		global.connection.query('SELECT messages.*, users.first_name, users.last_name from messages inner join users where messages.user_id = users.id', function (error, results, fields) {
			if(error){
				l.error(error);
  				res.json(resFormat.statusError(500, "Database Error :("));  

			} else {
				l.console("Attempting to access all \'messages\' records...");
				
  				res.json(resFormat.statusOk(results));  

			}
		});

	},

	getMessageById: (req, res) => {

		let _id = req.params.id;
 
  		global.connection.query(`SELECT * from messages where id=${_id} LIMIT 1`, function (error, results, fields) {

  			if(results == [] || results[0] == null || results[0] == undefined){
  				error = `There are no records with the requested id ! ${_id}`;
				l.error(error);
  				res.json(resFormat.statusError(500, "Database Error :("));  
  				return true;
  			}

			if(error){
				l.error(error);
  				res.json(resFormat.statusError(500, "Database Error :("));  
			} else {
				l.console(`Attempting to access \'messages\' record by id ${_id} ...`);
				
  				res.json(resFormat.statusOk(results[0]));  
			}

		});
	}

}