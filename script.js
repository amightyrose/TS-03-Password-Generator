
// ============================================================
// Declare some variables
// ============================================================



var strPasswordList = "";							// String containing all the generated passwords
var arrCharTypes = [];								// Array to hold the character types chosen
var arrCharacters = [];								// Array to hold the characters that will be used to generate the password
var generateBtn = document.querySelector("#btnGenerate");	// The "generate" button


// Minimum number of character types allowed in the password (1 - 4). Change this variable to increase or decrease the
// password complexity.
var intNoOfCharTypes = 1;


// Objects specifying the start and end code points for each range of characters.
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


	strPasswordList = "";


	// Call the getCharTypes function. Check to see if the minimum number of types (intNoOfCharTypes)
	// has been met. If not, alert the user. Otherwise continue.

	var arrCharTypes = getCharTypes();

	if (arrCharTypes.length < intNoOfCharTypes) {

		alert("Please choose " + intNoOfCharTypes + " or more character types!");

	}

	else {

		// Now that we have all the password parameters (length and which character types to use), start building
		// an array of characters to choose from. Call the getCharacters function for each type in arrCharTypes.

		arrCharTypes.forEach(getCharacters);


		// Now that we have an array of characters to choose from, call the generatePasswords function to generate
		// the required number of passwords.

		generatePasswords();

		// Write the generated password/s to the textarea on the form
		let pwdTextArea = document.querySelector("#passwordOutput");
		pwdTextArea.value = strPasswordList;

		// Enable the copy button
		document.getElementById("btnCopyText").disabled = false

	}


}


// Checks which character type checkboxes have been ticked. Each type that has been chosen is added
// to an array then the arry is returned.

function getCharTypes() {


	var arrTypes = []


	// Check the state of the checkboxes and build the array.
	if (document.getElementById("inputUpperCase").checked) {

		arrTypes.push(objUCaseCharCP);

	}

	if (document.getElementById("inputNumbers").checked) {

		arrTypes.push(objNumCharCP);

	}

	if (document.getElementById("inputLowerCase").checked) {

		arrTypes.push(objLCaseCharCP);

	}

	if (document.getElementById("inputSpecial").checked) {

		arrTypes.push(objSpecialCharCP);

	}

	return arrTypes


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


// This function generates the required number of passwords and returns them as a single string with
// newline characters after each password.

function generatePasswords() {


	var intNoOfPasswords = +document.getElementById("inputNoOfPasswords").value;
	var intPwdLength = +document.getElementById("inputPwdLength").value;


	// Run a for loop until the required number of passwords (defined by intNoOfPasswords)
	// has been reached.

	for (let i = 1; i <= intNoOfPasswords; i++) {

		// Get a random number and use it to access the arrCharacters array. Add each character to the password being generated (strPassword).
		// Loop through this until we reach the number of characters required for the password (intPwdLength).

		var strPassword = ""

		for (let i = 1; i <= intPwdLength; i++) {

			intRndNum = Math.floor(Math.random() * arrCharacters.length);

			strPassword = strPassword + arrCharacters[intRndNum];

		}

		// Add the newly generated password to the string of passwords. Also add a newline character if there is
		// more than one password.

		if (i > 1) {

			strPasswordList = strPasswordList + "\n"

		}

		strPasswordList =  strPasswordList + strPassword

	}


}


// This function copies the generated passwords to the clipboard when the 'Copy' button is clicked.

function copyText() {


	// Get the textarea where the passwords are
	let pwdTextArea = document.getElementById("passwordOutput")

	// Select it
	pwdTextArea.select();
	pwdTextArea.setSelectionRange(0, 99999); 	//For mobile devices

	// Copy it
	document.execCommand("copy")

	// Alert the user
	alert("Passwords have been copied to the clipboard")


}
