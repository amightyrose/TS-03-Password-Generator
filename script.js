
// ============================================================
// Declare some variables
// ============================================================



var intPwdLength = 0;		// Length of the password
var strPassword = "";		// The generated password
var intNoOfCharTypes = 1;	// Minimum number of character types allowed in the password (1 - 4)
var arrCharTypes = [];		// Array to hold the character types chosen
var arrCharacters = [];		// Array to hold the characters that will be used to generate the password
var generateBtn = document.querySelector("#generate");		// The "generate" button


// Objects specifying the start and end code points for each range of characters
var objNumCharCP = {

	start: 0x0030,
	end: 0x0039

};

var objLCaseCharCP = {

	start: 0x0061,
	end: 0x007A

};

var objUCaseCharCP = {

	start: 0x0041,
	end: 0x005A

};

// The special character code points aren't in one contiguous block but in four separate ranges.
// Create an object containing four objects that specify the start/end code points for each range.
var objSpecialCharCP = {

	range1: {
		start: 0x0020,
		end: 0x002F
	},
	range2: {
		start: 0x003A,
		end: 0x0040
	},
	range3: {
		start: 0x005B,
		end: 0x0060
	},
	range4: {
		start: 0x007B,
		end: 0x007E
	}

};


// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);




// ============================================================
// Functions
// ============================================================



// Write password to the #password input
function writePassword() {

	var password = generatePassword();
	var passwordText = document.querySelector("#password");
	passwordText.value = password;

}


// The main function that generates the password. It returns the generated password as a string.

function generatePassword() {


	// Prompt the user for the desired password length. Length must be from 8 to 128 characters. Loop until
	// the user chooses a valid length.

	while (intPwdLength < 8 || intPwdLength > 128) {

		intPwdLength = prompt("Please choose a password length (8 - 128 characters)");

	}


	// Build the arrCharTypes array so we know which character types to use.
	// Prompt for each chaaracter type and if the user answers yes, add the corresponding object to
	// the array. Repeat until the user chooses a minimum defined by intNoOfCharTypes.

	while (arrCharTypes.length < intNoOfCharTypes) {


		arrCharTypes.length = 0		// Reset the array length to 0 so we don't get a false positive when looping


		if (confirm("Do you want to use numbers?")) {

			arrCharTypes.push(objNumCharCP);

		}

		if (confirm("Do you want to use lowercase letters?")) {

			arrCharTypes.push(objLCaseCharCP);

		}

		if (confirm("Do you want to use uppercase letters?")) {

			arrCharTypes.push(objUCaseCharCP);

		}

		if (confirm("Do you want to use special characters?")) {

			arrCharTypes.push(objSpecialCharCP);

		}


		// Check the length of the arrCharTypes array. If it is less than required (as defined by
		// intNoOfCharTypes) the user needs to be prompted again and we go back to the top of the loop.

		if (arrCharTypes.length < intNoOfCharTypes) {

			alert("Please choose " + intNoOfCharTypes + " or more character types!");

		}


	}


	// Now that we have the password parameters (length and which character types to use), start building
	// an array of characters to choose from. Loop through each of the character types in the arrCharTypes
	// array. Call the getCharacters function for each type.

	arrCharTypes.forEach(getCharacters);


	// Now that we have an array full of characters to choose from (arrCharacters), get a random number and
	// use it to access the array. Add each character to the password string (strPassword).
	// Loop through this until we reach the number of characters required for the password (intPwdLength).

	for (let i = 1; i <= intPwdLength; i++) {

		intRndNum = Math.floor(Math.random() * arrCharacters.length);

		strPassword = strPassword + arrCharacters[intRndNum];

	}


	// Return the value of strPassword to the calling function.

	return strPassword


}


// Each character type object is passed to this function. The function then takes the start and end
// properties from the object and uses them to cycle through the code point ranges. Each value is converted
// to a string character using the fromCharCode method which is then added to the arrCharacters array.

function getCharacters(charType) {


	// First check if we are operating on the special characters object. If so, loop through the ranges.
	if (charType === objSpecialCharCP) {

		for (const range in charType) {

			for (let i = charType[range].start; i <= charType[range].end; i++) {

				arrCharacters.push(String.fromCharCode(i));

			}

		}

	}

	else {

		for (let i = charType.start; i <= charType.end; i++) {

			arrCharacters.push(String.fromCharCode(i));

		}

	}


}


