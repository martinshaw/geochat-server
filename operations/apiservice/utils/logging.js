const fs = require('fs');

//
module.exports = {
	error: (data) => {
		let ts = Math.round((new Date()).getTime() / 1000);
		fs.appendFileSync("./errors.log", `${ts}: ${data}\n`);
	},
	console: (data) => {
		let ts = Math.round((new Date()).getTime() / 1000);
		fs.appendFileSync("./console.log", `${ts}: ${data}\n`);
	}

}