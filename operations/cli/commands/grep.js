const grep = require('vorpal-grep');

// Grep command

module.exports = (_cli) => {

	_cli.use(grep);

};
