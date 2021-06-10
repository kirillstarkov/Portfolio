let operator = prompt('Enter math operator');
let resault = null;

if (operator == null) {
	resault = 'You canseled operator';
	alert (resault);
} else if (!operator) {
	resault = 'Enter operator';
	alert (resault);
}


let firstNumber = +prompt('Enter first number');

if (firstNumber == null) {
	resault = 'You canseled first number';
	alert (resault);
} else if (!firstNumber) {
	resault = 'Enter first number';
	alert (resault);
}

let secondNumber = +prompt('Enter second number');

if (secondNumber == null) {
	resault = 'You canseled second number';
	alert (resault);
} else if (!secondNumber) {
	resault = 'Enter second number';
	alert (resault);
}

switch (operator) {
	case '+' : {
		resault = firstNumber + secondNumber;
	}
	break;
	case '-' : {
		resault = firstNumber - secondNumber;
	}
	break;
	case '*' : {
		resault = firstNumber * secondNumber;
	}
	break;
	case '/' : {
		resault = firstNumber / secondNumber;
	}
	break;

	default : {
		resault = 'Enter correct operator'
	}
}

alert(resault);