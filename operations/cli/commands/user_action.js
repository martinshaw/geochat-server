const boxen = require('boxen');

// User Action command

module.exports = (_cli) => {
	_cli.command('user:action <action>', "Applies an action to a selected user")
		.option('-i, --identifier <identifier>', "Select user by ID Number")
		.option('-u, --username <username>', "Select user by Username")
		.option('-e, --email <email>', "Select user by E-mail Address")
		.action(function (args, callback) {
			_output = "";
			_output += "Action: " + args.action + "\n";
			_output += "ID: " + args.options.identifier + "\n";
			_output += "Username: " + args.options.username + "\n";
			_output += "Email Address: " + args.options.email;

			this.log(boxen(_output, {padding: 1}));
			callback();
		});
};
