const inputRange = document.getElementById("rangeSelector");
const inputNumber = document.getElementById("numberSelctor");

const resultSpan = document.getElementById("resultSpan");
const copyBtn = document.getElementById("copyBtn");

const lowercaseBtn = document.getElementById("includeLowercase");
const uppercaseBtn = document.getElementById("includeUppercase");
const numberBtn = document.getElementById("includeNumbers");
const symbolBtn = document.getElementById("includeSymbols");

const generateBtn = document.getElementById("generate");

// selector amounts
inputRange.addEventListener("input", charAmountSync);
inputNumber.addEventListener("input", charAmountSync);

function charAmountSync(i) {
	const value = i.target.value;
	inputRange.value = value;
	inputNumber.value = value;
}

// copyBTn
copyBtn.addEventListener("click", () => {
	const textarea = document.createElement("textarea");
	const password = resultSpan.innerText;
	//  if no result in box
	if (!password) {
		return;
	}
	// something in box
	textarea.value = password;
	document.body.appendChild(textarea);
	textarea.select();
	document.execCommand("Copy");
	textarea.remove();
	alert("You Have Copy the Password");
});

//

const random = {
	lower: getRandomLower,
	upper: getRandomUpper,
	number: getRandomNumber,
	symbol: getRandomSymbol
};

// adding eventListeners for the vaules

generateBtn.addEventListener("click", () => {
	const range = inputNumber.value;
	const hasLower = lowercaseBtn.checked;
	const hasUpper = uppercaseBtn.checked;
	const hasNumber = numberBtn.checked;
	const hasSymbol = symbolBtn.checked;
	// pass thur values with a fucntion
	resultSpan.innerHTML = generatePassword(
		hasLower,
		hasUpper,
		hasNumber,
		hasSymbol,
		range
	);
});

// generating the function for password
function generatePassword(lower, upper, number, symbol, range) {
	let generatePassword = "";
	const countType = lower + upper + number + symbol;
	const countArray = [{ lower }, { upper }, { number }, { symbol }].filter(
		(item) => Object.values(item)[0]
	);
	// does not have a select type
	if (countType === 0) {
		return "";
	}
	// looping everything together
	for (e = 0; e < range; e += countType) {
		countArray.forEach((type) => {
			const randomName = Object.keys(type)[0];
			generatePassword += random[randomName]();
		});
	}
	const finalGenPass = generatePassword.slice(0, range);

	return finalGenPass;
}

// functions to generate
function getRandomLower() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
	return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
	const symbols = "!@#$%^&*()_+/-?";
	return symbols[Math.floor(Math.random() * symbols.length)];
}

//console.log(getRandomLower());
//console.log(getRandomUpper());
//console.log(getRandomNumber());
//console.log(getRandomSymbol());
