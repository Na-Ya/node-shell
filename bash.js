const commandsObj = require('./commands.js');
const pwdCommand = commandsObj.pwd
const lsCommand = commandsObj.ls
// console.log(pwdCommand)
process.stdout.write('prompt > ');

// The stdin 'data' event fires after a user types in a line
process.stdin.on('data', function (data) {
    let dataArray = data.toString().trim().split(' ');

  var currentCommand = dataArray[0]; // remove the newline
  process.stdout.write('You typed: ' + currentCommand);
  if (currentCommand === 'date'){
    process.stdout.write('\n' + new Date().toString());
}
  process.stdout.write('\nprompt > ');  
});

pwdCommand();
lsCommand();
