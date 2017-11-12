const boxen = require('boxen');

// User Create command

module.exports = (_cli) => {
	_cli.command('user:create', "Creates User")
		.action(function (args, callback) {
			this.log(boxen("qwerty", {padding: 1}));
			callback();
		});
};
