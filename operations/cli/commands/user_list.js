const boxen = require('boxen');
const table = require('easy-table')

// User List command

module.exports = (_cli) => {
	_cli.command('user:list', "Lists all users")
		.action(function (args, callback) {
			let data = [
				{ id: 123123, desc: 'Something awesome', price: 1000.00 },
				{ id: 245452, desc: 'Very interesting book', price: 11.45},
				{ id: 232323, desc: 'Yet another product', price: 555.55 }
			];
			let t = new table;
			data.forEach(function(product) {
				t.cell('Product Id', product.id);
				t.cell('Description', product.desc);
				t.cell('Price, USD', product.price, table.number(2));
				t.newRow();
			});

			//this.log(boxen(t.toString(), {padding: 1}));
			this.log(t.toString());
			callback();
		});
};
