const fs = require('fs');

module.exports = {
    pwd: function(){
        process.stdin.on('data', function (data) {
            let currentCommand = data.toString().trim(); // remove the newline
              if (currentCommand === 'pwd'){
                  process.stdout.write(process.argv[1]);
                  process.stdout.write('\nprompt > ');
              }
            });
    },
    ls: function(){
        process.stdin.on('data', function(data){
            let currentCommand = data.toString().trim();
            if (currentCommand === 'ls'){
                fs.readdir('.', function(err, files){
                    if (err){
                        throw err;
                    }
                    for (let i = 0; i <files.length; i++){
                        let currentFile = files[i];
                        process.stdout.write(currentFile.toString() + '\t\t');
                    }
                    process.stdout.write('\nprompt >  ') 
                })
            }
        })
    },
    echo: function(){


    }
}


// process.stdin.on('data', function (data) {
//     let dataArray = data.toString().trim().split(' ');

//   var currentCommand = dataArray[0]; // remove the newline
//   process.stdout.write('You typed: ' + currentCommand);
//   if (currentCommand === 'date'){
//     process.stdout.write('\n' + new Date().toString());
// }
//   process.stdout.write('\nprompt > ');  
// });