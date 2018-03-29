// Require functions for formating consistant JSON responses
const resFormat = require("../utils/formatting.js");
const l = require("../utils/logging.js");

// Require set of Controller functions
const sessionController = require("./sessions.js");

//
module.exports = {

	requiresSessionKey: (req, res, next) => {
		let _skey = req.query['_skey'] || req.body['_skey'];

		// Check if a session key is at all supplied by the user
		if(_skey == null || _skey == undefined){
			error = `This API route requires a valid session key! ACCESS DENIED!`;
			l.error(error);
			res.json(resFormat.statusError(500, `${error} :(`));  
		}

		// Retrieve session record with the supplied session key
		sessionController.getSessionByKeyWithoutRequest(_skey, (session_data, error) => {

			if(error != false){
				l.error(error);
				res.send(resFormat.statusError(500, "Database error :("));  

			} else {

				next();

  			}

		});


	}

}