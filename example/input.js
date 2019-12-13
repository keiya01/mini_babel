/*
	FizzBuzz Question
	- Output "Fizz" if multiple of 2
	- Output "Buzz" if multiple of 5
	- Output "FizzBuzz" if multiple of 2 and 5
	- Output number of strings if another number
*/

var isMultipleOfTwo = function(n) {
	return n % 2 === 0;
};

var isMultipleOfFive = function(n) {
	return n % 5 === 0;
};

var getFizz = function(n) {
	return isMultipleOfTwo(n) ? "Fizz" : "";
};

var getBuzz = function(n) {
	return isMultipleOfFive(n) ? "Buzz" : "";
};

var getString = function(n) {
	return getFizz(n) + getBuzz(n) || n.toString();
};

var output = function(count) {
	for (let i = 1; i <= count; i++) {
		console.log(getString(i));
	}
};

// argv is declared for showing the transformation
let argv = process.argv;
output(argv[2]);
