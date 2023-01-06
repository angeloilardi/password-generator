// Array of special characters to be included in password
var specialCharacters = [
  '@',
  '%',
  '+',
  '\\',
  '/',
  "'",
  '!',
  '#',
  '$',
  '^',
  '?',
  ':',
  ',',
  ')',
  '(',
  '}',
  '{',
  ']',
  '[',
  '~',
  '-',
  '_',
  '.'
];

// Array of numeric characters to be included in password
var numericCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

// Array of lowercase characters to be included in password
var lowerCasedCharacters = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z'
];

// Array of uppercase characters to be included in password
var upperCasedCharacters = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z'
];

// Initializing variables in the global scope
var chosenCharacters = [];
var generatedPassword = [];
var length = 0;
var currentLength = 0;

// Function to prompt user for password options
function getPasswordOptions() {
  // Prompt for the desired password length
  lengthInput = prompt("How many characthers should your password have? Enter a number between 10 and 64");
  if (lengthInput < 10 || lengthInput > 65) {
    // alert in case the user did not input a number between 10 and 64
    alert(`${lengthInput} is not a number between 10 and 64, try again`);
  } else {
    length = lengthInput;
    var lowerCaseChoice = confirm("Please chosse at least one of the following options: do you want your password to include lowercase characters?");
    if (lowerCaseChoice) {
      // for each character type chosen, its characters are added to chosenCharacters using the concat method
      chosenCharacters = chosenCharacters.concat(...lowerCasedCharacters);
      // in order to have at least one character per type, the first character of the password will be a random character of such type
      generatedPassword.push(getRandom(lowerCasedCharacters));
      // currentLenght is increased by 1 so that we know how many more characters will be needed for the rest of the password
      currentLength++;
    }
    var upperCaseChoice = confirm("Do you want your password to include uppercase characters?");
    if (upperCaseChoice) {
      chosenCharacters = chosenCharacters.concat(upperCasedCharacters);
      generatedPassword.push(getRandom(upperCasedCharacters));
      currentLength++;
    }
    var numbersChoice = confirm("Do you want your password to include numbers?");
    if (numbersChoice) {
      chosenCharacters = chosenCharacters.concat(numericCharacters);
      generatedPassword.push(getRandom(numericCharacters));
      currentLength++;
    }
    var specialCharChoice = confirm("Do you want your password to include special characters?");
    if (specialCharChoice) {
      chosenCharacters = chosenCharacters.concat(specialCharacters);
      generatedPassword.push(getRandom(specialCharacters));
      currentLength++;
    }
    if (chosenCharacters.length === 0) alert("You need to select at least one character type. Let's try again.")
  }
}

// Function for getting a random element from an array
function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Function to generate password with user input
function generatePassword() {
  //reset password and currentLenght so that we can generate a password at every click of the button without having to refrsh the page;
  generatedPassword = [];
  currentLength = 0;
  // calling the function that prompt the user to choose the password options
  getPasswordOptions();
  // starting to add a random character from the current length (the first characters will be those guaranteeing that there's one for each type)
  var i = currentLength;
  while (i < length) {
    generatedPassword.push(getRandom(chosenCharacters));
    i++;
  };
  // the random characters are joined into one single string
  generatedPassword = generatedPassword.join("");
  // choseCharacters it's reset so a new password can be geenerated if necessary
  chosenCharacters = [];
  // the function returns the value of generatedPassword
  return generatedPassword;
}

// Get references to the #generate element
var generateBtn = document.querySelector('#generate');

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector('#password');

  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener('click', writePassword);
