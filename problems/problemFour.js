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


var add = function(){
	if(arguments.length == 1){
		return sum.bind(this, arguments[0]);
	}
	else{
		return sum(arguments[0],arguments[1] );
	}
},

sum = function(a, b){
	return a + b;
};