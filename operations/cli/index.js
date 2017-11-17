const Vorpal = require('vorpal');
const chalk = Vorpal().chalk;

global.gccli = gccli = {
    banner: "   ____             ____ _           _       ____ _     ___ \n  / ___| ___  ___  / ___| |__   __ _| |_    / ___| |   |_ _|\n | |  _ / _ \\/ _ \\| |   | '_ \\ / _` | __|  | |   | |    | | \n | |_| |  __/ (_) | |___| | | | (_| | |_   | |___| |___ | | \n  \\____|\\___|\\___/ \\____|_| |_|\\__,_|\\__|   \\____|_____|___|\n                                                            \n",
    prompt: " " + chalk.bgGreen("geochat-cli")+" "+chalk.green(__dirname)+chalk.white(" ?")
};


console.log(gccli.banner);

gccli.cli = Vorpal()
	.delimiter(gccli.prompt)
	.show();


require("./commands/date.js")(gccli.cli);
require("./commands/repl.js")(gccli.cli);
require("./commands/grep.js")(gccli.cli);
require("./commands/less.js")(gccli.cli);

require("./commands/user_create.js")(gccli.cli);
require("./commands/user_list.js")(gccli.cli);
require("./commands/user_action.js")(gccli.cli);
