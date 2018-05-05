// Require functions for formating consistant JSON responses
const resFormat = require("../utils/formatting.js");
const l = require("../utils/logging.js");

// Require set of Controller functions
const sessionController = require("./sessions.js");

//
module.exports = {

	requiresSessionKey: (req, res, next) => {

		var _skey = (req.method == "GET") ? req.query['_skey'] : req.body['_skey'];

		// Check if a session key is at all supplied by the user...
		if(_skey == null || _skey == undefined || _skey == ""){

			error = `This API route requires a valid session key! ACCESS DENIED!`;
			l.error(error);
			res.send(resFormat.statusError(500, `${error} :(`));

		} else {

			// Check if the session is contained in the database...
			global.connection.query(`SELECT * from sessions where session_key="${_skey}" and active=true LIMIT 1`, function (error, results, fields) {

				if (error) {

					// ... Internal database error, give casual message to user and record technical error details in server log!
					l.error(error);   
					res.send(resFormat.statusError(500, "Database error :("));  

				} else if (results == "") {

					// ... Session is not contained in database
					error = `The supplied session key is no longer valid or session does not exist! ACCESS DENIED!`;
					l.error(error);
					res.send(resFormat.statusError(500, `${error} :(`));  

				} else {

					// ... Session is contained in database
					l.console(`Attempting to retrieve the \'session\' record ...`);


					// Check if the session key has expired its timeout quota ...
					session_epoch = results[0].timeout;
					current_epoch = (Math.floor((new Date).getTime()/1000));

					if (session_epoch < current_epoch) {

						global.connection.query(`update sessions set active = false where session_key = '${_skey}'`, function (error, results, fields) {

							if(error){
								l.error(error);
				  				res.send(resFormat.statusError(500, "Database error :("));  

							} else {

								l.console(`Session key is expired. ${_skey} has been successfully signed out!`);
								res.send(resFormat.statusError(500, `Session key is expired. You have been signed out!`));

							}

						});

					} else {

						next();

					}

				}
				
			});

		}

	},

	requiresSessionKeyInHeader: (req, res, next) => {
		
		var _skey = req.header("Geochat-Session-Key");

		console.log(JSON.stringify(req.headers));

		// Check if a session key is at all supplied by the user...
		if(_skey == null || _skey == undefined || _skey == ""){

			error = `This API route requires a valid session key! ACCESS DENIED!`;
			l.error(error);
			res.send(resFormat.statusError(500, `${error} :(`));

		} else {

			// Check if the session is contained in the database...
			global.connection.query(`SELECT * from sessions where session_key="${_skey}" and active=true LIMIT 1`, function (error, results, fields) {

				if (error) {

					// ... Internal database error, give casual message to user and record technical error details in server log!
					l.error(error);   
					res.send(resFormat.statusError(500, "Database error :("));  

				} else if (results == "") {

					// ... Session is not contained in database
					error = `The supplied session key is no longer valid or session does not exist! ACCESS DENIED!`;
					l.error(error);
					res.send(resFormat.statusError(500, `${error} :(`));  

				} else {

					// ... Session is contained in database
					l.console(`Attempting to retrieve the \'session\' record ...`);


					// Check if the session key has expired its timeout quota ...
					session_epoch = results[0].timeout;
					current_epoch = (Math.floor((new Date).getTime()/1000));

					if (session_epoch < current_epoch) {

						global.connection.query(`update sessions set active = false where session_key = '${_skey}'`, function (error, results, fields) {

							if(error){
								l.error(error);
				  				res.send(resFormat.statusError(500, "Database error :("));  

							} else {

								l.console(`Session key is expired. ${_skey} has been successfully signed out!`);
								res.send(resFormat.statusError(500, `Session key is expired. You have been signed out!`));

							}

						});

					} else {

						next();

					}

				}
				
			});

		}


	}

}