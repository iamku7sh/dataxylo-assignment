const readline = require('readline');
var os = require('os');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var totalCase = 0,
counter = 1,
finalOutput = '';

rl.on('line', function(line){
	input = line.trim();

	if(!totalCase){
		totalCase = input;
	}
	else{

		var validateResult = validate(input).eliminateLastDigit()
			.toArray().doubleOddDigits().sumtoDigit()
				.sumAndValidate();

		
		if(validateResult){
			finalOutput += getCardType(input) + os.EOL;
		}
		else{
			finalOutput += 'Invalid Card' + os.EOL;
		}

		if(counter == totalCase){
			console.log(finalOutput);
			rl.close();
		}
		counter++;
	}

});


var getCardType = function(cardNumber){
	var firstDigit = String(cardNumber).charAt(0),
	cardType = '';

	switch(firstDigit){
		case '4': 
			cardType = 'Visa';
			break;
		case '5': 
			cardType = 'Master Card';
			break;
		case '6': 
			cardType = 'Discover';
			break;
		case '3': 
			cardType = 'American Express';
			break;
		default: 
			cardType = 'Not Known';
	}

	return cardType;
};

var validate = (function(){


	var validate = function(cardNumber){
		return new validate.init(cardNumber);
	}

	var numberArray = [], number = 0;
	validate.prototype = {
		sumAndValidate: function(){
			var sum = 0;
			for (var i = 0; i < numberArray.length; i++) {
				sum += numberArray[i];
			}

			sum = sum * 9;

			lastDigit = sum % 10;
			if(lastDigit == (this.cardNumber % 10)){
				return true;
			}

			return false;
		},

		eliminateLastDigit: function(){
			number = this.cardNumber;
			number = Math.floor(number / 10);

			return this;
		},

		toArray: function(){
			numberArray = [];

			while(number){
				numberArray.push(number % 10);
				number = Math.floor(number / 10);
			}
			
			var length = numberArray.length;
			for (var i = 0; i < length; i++) {

				if(i > (length - 1 -i)){
					break;
				}

				var temp = numberArray[i];
				numberArray[i] = numberArray[length -i -1];
				numberArray[length - i -1] = temp;
			}
			return this;
		},

		doubleOddDigits: function(){
			for(var i = 0; i < numberArray.length; i++){
				if(!(i % 2)){
					numberArray[i] = numberArray[i]*2;
				}
			}

			return this;
		},

		sumtoDigit: function(){
			for (var i = 0; i < numberArray.length; i++) {
				if(numberArray[i] > 9){
					var num = numberArray[i],
					sum = 0;

					while(num){
						sum += num % 10;
						num = Math.floor(num / 10);
					}

					numberArray[i] = sum;
				}
			}

			return this;
		},

		subtractByNine: function(){
			for(var i = 0; i < numberArray.length; i++){
				if(numberArray[i] > 9){
					numberArray[i] = numberArray[i] - 9;
				}
			}
			return this;
		}
	};

	validate.init = function(cardNumber){
		var self = this;

		self.cardNumber = cardNumber;
	}


	validate.init.prototype = validate.prototype;

	return validate;
})();