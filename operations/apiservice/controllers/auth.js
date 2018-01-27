const bcrypt = require('bcrypt');
const env = require('process-env');
const SqlString = require('sqlstring');

// Require functions for formating consistant JSON responses
const resFormat = require("../utils/formatting.js");
const l = require("../utils/logging.js");

var bcrypt_salt = bcrypt.genSaltSync(parseInt(env.get("BCRYPT_SALT")));

//
module.exports = {
	register: (req, res) => {

		if (req.body == {} || req.body == null){
			l.error('Attempted to create user record. Request was empty! ');
			res.json(resFormat.statusError(500, "You're missing neccesary information :("));  
		}

		if (!req.body.first_name && req.body.first_name.length <= 2 && !req.body.first_name.match(/^[A-Za-z0-9]+$/)){
			l.error('Attempted to create user record. first_name field is invalid! ');
			res.json(resFormat.statusError(500, "Your first name must be longer than 2 letters and cannot contain symbols :("));  			
		}

		if (!req.body.last_name && req.body.last_name.length <= 2 && !req.body.last_name.match(/^[A-Za-z0-9]+$/)){
			l.error('Attempted to create user record. last_name field is invalid! ');
			res.json(resFormat.statusError(500, "Your last name must be longer than 2 letters and cannot contain symbols :("));  			
		}

		if (!req.body.email_address && req.body.email_address.length <= 5 && req.body.email_address.indexOf("@") < 1){
			l.error('Attempted to create user record. email_address field is invalid! ');
			res.json(resFormat.statusError(500, "Your email must be longer than 5 letters and must contain the @ symbol :("));  			
		}

		if (!req.body.password && req.body.password.length <= 5){
			l.error('Attempted to create user record. password field is invalid! ');
			res.json(resFormat.statusError(500, "Your password must be longer than 5 letters :("));  			
		}

		var post  = {
			first_name: (req.body.first_name),
			last_name: (req.body.last_name),
			email_address: (req.body.email_address),
			password: bcrypt.hashSync(req.body.password, bcrypt_salt)
		};

		var query = connection.query('INSERT INTO users SET ?', post, function (error, results, fields) {
			if (error) {
				l.error(error);
  				res.json(resFormat.statusError(500, "Database error :("));  
			};

			l.console("Attempting to create a new \'users\' record for "+post.first_name+" "+post.last_name+"...");
			l.console(results);
			res.json(resFormat.statusOk(results));  
			
		});

	},

	signin: (req, res) => {

		if (req.query == {} || req.query == null){
			l.error('Attempted to authenticate user record. Request was empty! ');
			res.send(resFormat.statusError(500, "You're missing neccesary information :("));  
		}

		if (!req.query.email_address && req.query.email_address.length <= 5 && req.query.email_address.indexOf("@") < 1){
			l.error('Attempted to authenticate user record. email_address field is invalid! ');
			res.send(resFormat.statusError(500, "Your email must be longer than 5 letters and must contain the @ symbol :("));  			
		}

		if (!req.query.password && req.query.password.length <= 5){
			l.error('Attempted to authenticate user record. password field is invalid! ');
			res.send(resFormat.statusError(500, "Your password must be longer than 5 letters :("));  			
		}


		global.connection.query(`SELECT * from users WHERE email_address = '${req.query.email_address}'`, function (error, results, fields) {
			if(error){
				l.error(error);
  				res.send(resFormat.statusError(500, "Database error :("));  

			} else {

				bcrypt.compare(req.query.password, bcrypt_salt, function(err, res) {

				    if(res == true){
						l.console(`Successfully authenticated the 'users' record of ${post.query.email_address}`);
						l.console(results);
		  				res.send(resFormat.statusOk(results));  
				    }
				    else{
						l.error(error);
		  				res.send(resFormat.statusError(500, "Incorrect password for requested account :("));  
				    }

				});



			}
		});

	}

}