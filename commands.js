const request = require('request');
const fs = require('fs');
module.exports = {
	pwd: function() {
		process.stdin.on('data', function(data) {
			let dataArray = data
				.toString()
				.trim()
				.split(' ');
			let currentCommand = dataArray[0];
			if (currentCommand === 'pwd') {
				process.stdout.write(process.argv[1]);
				process.stdout.write('\nprompt > ');
			}
		});
	},
	ls: function() {
		process.stdin.on('data', function(data) {
			let dataArray = data
				.toString()
				.trim()
				.split(' ');
			let currentCommand = dataArray[0];
			if (currentCommand === 'ls') {
				fs.readdir('.', function(err, files) {
					if (err) {
						throw err;
					}
					for (let i = 0; i < files.length; i++) {
						let currentFile = files[i];
						process.stdout.write(currentFile.toString() + '\t\t');
					}
					process.stdout.write('\nprompt > ');
				});
			}
		});
	},
	echo: function() {
		process.stdin.on('data', function(data) {
			let dataArray = data
				.toString()
				.trim()
				.split(' ');
			let currentCommand = dataArray[0];
			if (currentCommand === 'echo') {
				let finalString = '';
				for (let i = 1; i < dataArray.length; i++) {
					finalString += dataArray[i] + ' ';
				}
				process.stdout.write(finalString);
				process.stdout.write('\nprompt > ');
			}
		});
	},
	cat: function() {
		process.stdin.on('data', function(data) {
			let dataArray = data
				.toString()
				.trim()
				.split(' ');
			let currentCommand = dataArray[0];
			if (currentCommand === 'cat') {
				for (let i = 1; i < dataArray.length; i++) {
					let currentFile = dataArray[i];
					let currentFileText = fs.readFileSync(`${currentFile}`);
					process.stdout.write(currentFileText);
				}
				process.stdout.write('\nprompt > ');
			}
		});
	},
	head: function() {
		process.stdin.on('data', function(data) {
			let dataArray = data
				.toString()
				.trim()
				.split(' ');
			let currentCommand = dataArray[0];
			if (currentCommand === 'head') {
				for (let i = 1; i < dataArray.length; i++) {
					let currentFile = dataArray[i];
					let currentFileText = fs
						.readFileSync(`${currentFile}`)
						.toString()
						.split('\n')
						.slice(0, 5)
						.join('\n');
					process.stdout.write(currentFileText);
				}
				process.stdout.write('\nprompt > ');
			}
		});
	},
	tail: function() {
		process.stdin.on('data', function(data) {
			let dataArray = data
				.toString()
				.trim()
				.split(' ');
			let currentCommand = dataArray[0];
			if (currentCommand === 'tail') {
				for (let i = 1; i < dataArray.length; i++) {
					let currentFile = dataArray[i];
					let currentFileText = fs
						.readFileSync(`${currentFile}`)
						.toString()
						.split('\n')
						.slice(-5)
						.join('\n');
					process.stdout.write(currentFileText);
				}
				process.stdout.write('\nprompt > ');
			}
		});
	},

	sort: function() {
		process.stdin.on('data', function(data) {
			let dataArray = data
				.toString()
				.trim()
				.split(' ');
			let currentCommand = dataArray[0];
			if (currentCommand === 'sort') {
				let finalString = '';
				for (let i = 1; i < dataArray.length; i++) {
					let currentFile = dataArray[i];
					let currentFileText = fs.readFileSync(`${currentFile}`);
					finalString += currentFileText + '\n';
				}
				finalString = finalString
					.split('\n')
					.map(function(currLine) {
						if (!currLine) {
							return;
						}
						return currLine[0].toLowerCase() + currLine.slice(1);
					})
					.sort()
					.join('\n');
				process.stdout.write(finalString);
				process.stdout.write('\nprompt > ');
			}
		});
	},
	wc: function() {
		process.stdin.on('data', function(data) {
			let dataArray = data
				.toString()
				.trim()
				.split(' ');
			let currentCommand = dataArray[0];
			if (currentCommand === 'wc') {
				let currentWordCount = 0;
				let currentLineCount = 0;
				let totalWordCount = 0;
				let totalLineCount = 0;
				for (let i = 1; i < dataArray.length; i++) {
					currentWordCount = 0;
					currentLineCount = 0;
					let currentFile = dataArray[i];
					let currentFileText = fs.readFileSync(`${currentFile}`);
					currentWordCount = currentFileText.toString().split(' ').length;
					currentLineCount = currentFileText.toString().split('\n').length;
					totalWordCount += currentWordCount;
					totalLineCount += currentLineCount;
					process.stdout.write(
						`\t${currentLineCount}\t${currentWordCount}\t${currentFile}\n`
					);
				}
				if (dataArray.length > 2) {
					process.stdout.write(
						`\t${totalLineCount}\t${totalWordCount}\ttotal\n`
					);
				}
				process.stdout.write('prompt > ');
			}
		});
	},
	uniq: function() {
		process.stdin.on('data', function(data) {
			let dataArray = data
				.toString()
				.trim()
				.split(' ');
			let currentCommand = dataArray[0];
			if (currentCommand === 'uniq') {
				let newArr = [];
				let currentFileArr = fs
					.readFileSync(`${dataArray[1]}`)
					.toString()
					.split('\n');
				for (let i = 0; i < currentFileArr.length; i++) {
					if (currentFileArr[i] !== newArr[newArr.length - 1]) {
						newArr.push(currentFileArr[i]);
					}
				}
				newArr = newArr.join('\n');
				process.stdout.write(newArr + '\n');
				process.stdout.write('prompt > ');
			}
		});
	},
	curl: function() {
		process.stdin.on('data', function(data) {
			let dataArray = data
				.toString()
				.trim()
				.split(' ');
			let currentCommand = dataArray[0];
			let website = dataArray[1];
			if (currentCommand === 'curl') {
				request(`${website}`, function(error, response, body) {
					if (error) {
						process.stdout.write(error);
					}
					process.stdout.write(body);
					process.stdout.write('prompt > ');
				});
			}
		});
	}
};
