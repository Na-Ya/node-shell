const commandsObj = require('./commands.js');
const pwdCommand = commandsObj.pwd;
const lsCommand = commandsObj.ls;
const echoCommand = commandsObj.echo;
const catCommand = commandsObj.cat;
const headCommand = commandsObj.head;
const tailCommand = commandsObj.tail;
const sortCommand = commandsObj.sort;
const wcCommand = commandsObj.wc;
const uniqCommand = commandsObj.uniq;
const curlCommand = commandsObj.curl;
//test
//test
//test
//cat
//cat
process.stdout.write('prompt > ');
// The stdin 'data' event fires after a user types in a line
process.stdin.on('data', function(data) {
	let dataArray = data
		.toString()
		.trim()
		.split(' ');
	let currentCommand = dataArray[0]; // remove the newline
	process.stdout.write('You typed: ' + currentCommand + '\n');
	if (currentCommand === 'date') {
		process.stdout.write('\n' + new Date().toString());
		process.stdout.write('\nprompt > ');
	}
});
pwdCommand();
lsCommand();
echoCommand();
catCommand();
headCommand();
tailCommand();
sortCommand();
wcCommand();
uniqCommand();
curlCommand();
