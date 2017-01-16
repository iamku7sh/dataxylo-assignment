const readline = require('readline');
var os = require('os');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var totalCase =0,
counter = 1,
evalString = '';

rl.on('line', function(line){
	input = line.trim();

	if(!totalCase){
		totalCase = input;
	}
	else{

		evalString += eval(input) + os.EOL;

		if(counter == totalCase){
			console.log(evalString);
			rl.close();
		}
		counter++;
	}
});

String.prototype.dataXylo = function(n){
	var string = '';

	for (var i = 0; i < this.length; i++) {
		string += this[i];
	}

	if(n % 2){ //  if number is odd
		string = string.toLowerCase();
	}
	else{
		string = string.toUpperCase();
	}

	return string;
}