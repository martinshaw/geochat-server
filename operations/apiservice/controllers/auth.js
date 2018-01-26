// Require functions for formating consistant JSON responses
const resFormat = require("../utils/formatting.js");
const l = require("../utils/logging.js");

//
module.exports = {
	signin: (req, res) => {
  		// res.json(resFormat.statusOk({ user: '123' }));  

  		global.connection.query('SELECT * from users', function (error, results, fields) {
			if(error){
				l.error(error);
				res.send(JSON.stringify({"status": 500, "error": error, "response": null})); 
				//If there is error, we send the error in the error section with 500 status
			} else {
				l.console(results);
				res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
				//If there is no error, all is good and response is 200OK.
			}
		});


	}
}