const bcrypt = require('bcrypt');
const env = require('process-env');

// Require set of Controller functions
const sessionController = require("../controllers/sessions.js");

// Require functions for formating consistant JSON responses
const resFormat = require("../utils/formatting.js");
const l = require("../utils/logging.js");

var bcrypt_salt = bcrypt.genSaltSync(parseInt(env.get("BCRYPT_SALT")));


//
module.exports = {
	register: (req, res) => {

		// Validate the existance and validity of required input parameters
		if (req.body == {} || req.body == null){
			l.error('Attempted to create user record. Request was empty! ');
			res.send(resFormat.statusError(500, "You're missing neccesary information :("));  
		}

		else if (!req.body.first_name || req.body.first_name.length <= 2 || !req.body.first_name.match(/^[A-Za-z0-9]+$/)){
			l.error('Attempted to create user record. first_name field is invalid! ');
			res.send(resFormat.statusError(500, "Your first name must be longer than 2 letters and cannot contain symbols :("));  			
		}

		else if (!req.body.last_name || req.body.last_name.length <= 2 || !req.body.last_name.match(/^[A-Za-z0-9]+$/)){
			l.error('Attempted to create user record. last_name field is invalid! ');
			res.send(resFormat.statusError(500, "Your last name must be longer than 2 letters and cannot contain symbols :("));  			
		}

		else if (!req.body.email_address || req.body.email_address.length <= 5 || req.body.email_address.indexOf("@") < 1){
			l.error('Attempted to create user record. email_address field is invalid! ');
			res.send(resFormat.statusError(500, "Your email must be longer than 5 letters and must contain the @ symbol :("));  			
		}

		else if (!req.body.password || req.body.password.length <= 5){
			l.error('Attempted to create user record. password field is invalid! ');
			res.send(resFormat.statusError(500, "Your password must be longer than 5 letters :("));  			
		}

		else {

			var post  = {
				first_name: (req.body.first_name),
				last_name: (req.body.last_name),
				email_address: (req.body.email_address),
				password: bcrypt.hashSync(req.body.password, bcrypt_salt)
			};

			global.connection.query('INSERT INTO users SET ?', post, function (error, results, fields) {
				if (error) {
					l.error(error);
	  				res.send(resFormat.statusError(500, "Database error :("));  
				};

				l.console("Attempting to create a new \'users\' record for "+post.first_name+" "+post.last_name+"...");
				res.send(resFormat.statusOk(results));  
				
			});

		}

	},

	signin: (req, res) => {

		// Validate the existance and validity of required input parameters
		if (req.query == {} || req.query == null){
			l.error('Attempted to authenticate user record. Request was empty! ');
			res.send(resFormat.statusError(500, "You're missing neccesary information :("));  
		}

		else if (!req.query.email_address || req.query.email_address.length <= 5 || req.query.email_address.indexOf("@") < 1){
			l.error('Attempted to authenticate user record. email_address field is invalid! ');
			res.send(resFormat.statusError(500, "Your email must be longer than 5 letters and must contain the @ symbol :("));  			
		}

		else if (!req.query.password || req.query.password.length <= 5){
			l.error('Attempted to authenticate user record. password field is invalid! ');
			res.send(resFormat.statusError(500, "Your password must be longer than 5 letters :("));  			
		}

		else {

			// Create and execute MySQL query for retrieving 'users' record with specified email_address field
			global.connection.query(`SELECT * from users WHERE email_address = '${req.query.email_address}' LIMIT 1`, function (error, results, fields) {

				if(error){
					l.error(error);
	  				res.send(resFormat.statusError(500, "Database error :("));  

				} else {

					// Check the stored encrypted password hash is relatable to the unencrypted user input
					bcrypt.compare(req.query.password, results[0].password, function(err, bcrypt_res) {

					    if(bcrypt_res != false){

							l.console(`Successfully authenticated the 'users' record of ${req.query.email_address}`);
							
							// Create a session with the specified user account
							sessionController.createSessionWithoutRequest(results[0], (session_id, error) => {

								if(error != false){
									l.error(error);
					  				res.send(resFormat.statusError(500, "Database error :("));  
					  				
								} else {

									// Retrieve just-created session data to sending with response
									sessionController.getSessionByIdWithoutRequest(session_id, (session_data, error) => {

										if(error != false){
											l.error(error);
							  				res.send(resFormat.statusError(500, "Database error :("));  

										} else {

							  				res.send(
							  					resFormat.statusOk([{
								  					user: results[0],
								  					session: session_data[0]
								  				}])
							  				);

							  			}


						  			});

								}
								
							});

					    } else {
							l.error(error);
			  				res.send(resFormat.statusError(500, "Incorrect password for requested account :("));  
					    }

					});



				}
			});
		}

	},

	signout: (req, res) => {

		var _skey = (req.method == "GET") ? req.query['_skey'] : req.body['_skey'];

		// * Valid Session key is already verified by the "RequiresSessionKey" route filter! *
		
		// Assuming valid session key & existence of active session, change "active" status of session. (soft-delete)
		
		global.connection.query(`update sessions set active = false where session_key = '${_skey}'`, function (error, results, fields) {

			if(error){
				l.error(error);
  				res.send(resFormat.statusError(500, "Database error :("));  

			} else {

				l.console(`${_skey} has successfully signed out!`);
				res.send(resFormat.statusOk("ok"));

			}

		});


	}

}