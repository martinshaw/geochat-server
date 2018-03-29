// Require functions for formating consistant JSON responses
const resFormat = require("../utils/formatting.js");
const l = require("../utils/logging.js");

// 
var generateNewSessionKey = () => {
    let mask = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let length = 5; // per section
    let result = '';

    // j < section length
	for (var j = 0; j < 6; j++){
    	for (var i = length; i > 0; --i) result += mask[Math.floor(Math.random() * mask.length)];
    	if (j != 5) result += "-";
	}
    
    return result;
}

var generateNewNextNounce = () => {
    let mask = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let length = 10;
    let result = '';

    for (var i = length; i > 0; --i) result += mask[Math.floor(Math.random() * mask.length)];
    return result;
}

var calculateTimeoutEpoch = () => {
	let time = (Math.floor((new Date).getTime()/1000));
	let day = 86400;
	let numOfDaysUntilTimeout = 2;

	return time + (day * numOfDaysUntilTimeout);
}


//
module.exports = {
	
	createSessionWithoutRequest: (user_data, next) => {

		var session = {
			user_id: (user_data.id),
			session_key: generateNewSessionKey(),
			next: generateNewNextNounce(),
			timeout: calculateTimeoutEpoch()
		};

		global.connection.query('INSERT INTO sessions SET ?', session, function (error, results, fields) {

			if (error) next(null, error); 

			l.console(`Attempting to create a new \'session\' record for ${user_data.id} ...`);

			next(results.insertId, false);
			
		});


	},
	
	getSessionByIdWithoutRequest: (id, next) => {

		global.connection.query(`SELECT * from sessions where id=${id} LIMIT 1`, function (error, results, fields) {

			if (error) next({}, error); 

			l.console(`Attempting to retrieve a new \'session\' record ...`);

			next(results, false);
			
		});

	},
	
	getSessionByKeyWithoutRequest: (key, next) => {

		global.connection.query(`SELECT * from sessions where session_key="${key}" LIMIT 1`, function (error, results, fields) {

			if (error) next({}, error); 

			l.console(`Attempting to retrieve a new \'session\' record ...`);

			next(results, false);
			
		});

	},

	getAllSessions: (req, res) => {

  		global.connection.query('SELECT * from sessions', function (error, results, fields) {
			if(error){
				l.error(error);
  				res.json(resFormat.statusError(500, "Database Error :("));  

			} else {
				l.console("Attempting to access all \'sessions\' records...");
				
  				res.json(resFormat.statusOk(results));  

			}
		});

	},

	getSessionById: (req, res) => {

		let _id = req.params.id;

  		global.connection.query(`SELECT * from sessions where id=${_id} LIMIT 1`, function (error, results, fields) {

  			if(results == [] || results[0] == null || results[0] == undefined){
  				error = `There are no records with the requested id ! ${_id}`;
				l.error(error);
  				res.json(resFormat.statusError(500, "Database Error :("));  
  			}

			if(error){
				l.error(error);
  				res.json(resFormat.statusError(500, "Database Error :("));  

			} else {

				l.console(`Attempting to access \'sessions\' record by id ${_id} ...`);
				
  				res.json(resFormat.statusOk(results[0]));  

			}

		});

	},

	getSessionByKey: (req, res) => {

		let _key = req.params.key;

  		global.connection.query(`SELECT * from sessions where session_key="${_key}" LIMIT 1`, function (error, results, fields) {

  			if(results == [] || results[0] == null || results[0] == undefined){
  				error = `There are no records with the requested session key ! ${_key}`;
				l.error(error);
  				res.json(resFormat.statusError(500, "Database Error :("));  
  				return true;
  			}

			if(error){
				l.error(error);
  				res.json(resFormat.statusError(500, "Database Error :("));  

			} else {

				l.console(`Attempting to access \'sessions\' record by key ${_key} ...`);
				
  				res.json(resFormat.statusOk(results[0]));  

			}

		});

	}

}