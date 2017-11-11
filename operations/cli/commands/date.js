const date = require("date-and-time");

// Date command

module.exports = (_cli) => {
	_cli.command('date', "Displays date")
		.action(function (args, callback) {
			let now = new Date();
			this.log(date.format(now, 'YYYY/MM/DD HH:mm:ss'));
			callback();
		});
};
