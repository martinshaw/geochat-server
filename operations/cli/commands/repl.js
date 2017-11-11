const repl = require('vorpal-repl');

// REPL command

module.exports = (_cli) => {

	_cli.use(repl);

};
