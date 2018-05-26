// Require functions for formating consistant JSON responses
const resFormat = require("../utils/formatting.js");
const l = require("../utils/logging.js");


module.exports = {

	getAllMessages: (req, res) => {

  		global.connection.query('SELECT messages.*, users.first_name, users.last_name from messages inner join users where messages.user_id = users.id AND messages.active = 1', function (error, results, fields) {
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
	},

	getMessagesByUserSessionKey: (req, res) => {

		let _key = req.params.key;
 
  		global.connection.query(`select messages.* from messages join users join sessions where sessions.session_key="${_key}" and messages.user_id = sessions.user_id and users.id = sessions.user_id and messages.active = 1;`, function (error, results, fields) {

  			if(results == [] || results[0] == null || results[0] == undefined){
  				error = `There are no records with the requested key ! ${_key}`;
				l.error(error);
  				res.json(resFormat.statusError(500, "Database Error :("));  
  				return true;
  			}

			if(error){
				l.error(error);
  				res.json(resFormat.statusError(500, "Database Error :("));  
			} else {
				l.console(`Attempting to access \'messages\' created by user with key ${_key} ...`);
				
  				res.json(resFormat.statusOk(results));  
			}

		});
	},

	createMessage: (req, res) => {

		// Validate the existance and validity of required input parameters
		if (req.body == {} || req.body == null){
			l.error('Attempted to create message record. Request was empty! ');
			res.send(resFormat.statusError(500, "You're missing neccesary information :("));  
		}

		else if (!req.body.origin_lat){
			l.error('Attempted to create message record. origin_lat field is invalid! ');
			res.send(resFormat.statusError(500, "An origin latitude hasn\'t been specified for the message :("));  			
		}

		else if (!req.body.origin_long){
			l.error('Attempted to create message record. origin_long field is invalid! ');
			res.send(resFormat.statusError(500, "An origin longitude hasn\'t been specified for the message :("));  			
		}

		else if (!req.body.recipient_lat){
			l.error('Attempted to create message record. recipient_lat field is invalid! ');
			res.send(resFormat.statusError(500, "An recipient latitude hasn\'t been specified for the message :("));  			
		}

		else if (!req.body.recipient_long){
			l.error('Attempted to create message record. recipient_long field is invalid! ');
			res.send(resFormat.statusError(500, "An recipient longitude hasn\'t been specified for the message :("));  			
		}

		else if (!req.body.user_id){
			l.error('Attempted to create message record. user_id field is invalid! ');
			res.send(resFormat.statusError(500, "A user ID hasn\'t been specified for the message :("));  			
		}

		else if (!req.body.session_id){
			l.error('Attempted to create message record. session_id field is invalid! ');
			res.send(resFormat.statusError(500, "A session ID hasn\'t been specified for the message :("));  			
		}

		else if (!req.body.message_type){
			l.error('Attempted to create message record. message_type field is invalid! ');
			res.send(resFormat.statusError(500, "A message type hasn\'t been specified for the message :("));  			
		}

		else if (!req.body.contents){
			l.error('Attempted to create message record. contents field is invalid! ');
			res.send(resFormat.statusError(500, "Message contents have not been specified for the message :("));  			
		}

		else {

			// Catches data type of is_anonymaus variable
			let _anony = 0;
			if (!req.body.is_anonymaus) {_anony = 0;}
			else if (req.body.is_anonymaus == "false" || req.body.is_anonymaus == false) {_anony = 0}
			else if (req.body.is_anonymaus == "true" || req.body.is_anonymaus == true) {_anony = 1}

			var message  = {
				origin_lat: (req.body.origin_lat),
				origin_long: (req.body.origin_long),
				recipient_lat: (req.body.recipient_lat),
				recipient_long: (req.body.recipient_long),
				user_id: (req.body.user_id),
				session_id: (req.body.session_id),
				is_anonymaus: _anony,
				message_type: (req.body.message_type),
				contents: (req.body.contents),
				contents_extra: (!req.body.contents_extra)? "": req.body.contents_extra
			};

			global.connection.query('INSERT INTO messages SET ?', message, function (error, results, fields) {

				if (error) {

					l.error(error);
	  				res.send(resFormat.statusError(500, "Database error :("));  

				} else {

					l.console("Attempting to create a new \'message\' record for User: "+message.user_id+" with Contents: "+message.contents+" ...");
					// res.send(resFormat.statusOk(results));  
					
					let _id = results.insertId;

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
							l.console(`Attempting to access just created \'messages\' record by id ${_id} ...`);
							
			  				res.json(resFormat.statusOk(results[0]));  
						}

					});

				}
				
			});

		}

	},

	deleteMessage: (req, res) => {

		let _id = req.params.id;
 
  		global.connection.query(`update messages set active = false where id = ${_id}`, function (error, results, fields) {

			if(error){
				l.error(error);
  				res.json(resFormat.statusError(500, "Database Error :("));  
			}

			else {
				l.console(`Attempting to delete \'messages\' record by id ${_id} ...`);
				
  				res.json(resFormat.statusOk("Message Deleted !"));  
			}

		});
	}

}