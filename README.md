# TS-03-Password-Generator

<div align="center">
	<img src="https://user-images.githubusercontent.com/69242373/91720207-12db9600-ebda-11ea-95df-5b98da88e749.png">
</div>

<p align="center">
A simple web-based password generator.
</p>

## Introduction

Password Generator is a simple web application for generating random passwords. It easy to use and requires minimal input from the user.

Try it now: <https://timsilby.github.io/TS-03-Password-Generator/>

## Features

The application has the following features:

* Can generate passwords from 8 to 128 characters long.
* Can generate a list of up to 20 passwords at a time.
* Passwords can be generated using four different character types.
* Passwords can be easily copied to the clipboard.

## Usage

1. Open a web browser and go to <https://timsilby.github.io/TS-03-Password-Generator/>.
2. Choose the password parameters:
   * The number of passwords to generate (from 1 to 20).
   * The number of characters in each password (from 8 to 128).
   * Which character types to use when generating the passwords:
     * Upper case letters
     * Lower case letters
     * Numbers
     * Special characters
3. Click the _**Generate**_ button.
4. Click the _**Copy**_ button to copy the passwords to the clipboard.

### Customisation

By default the application requires a minimum of one character type to be chosen. To force the generation of more complex passwords, the minimum can be increased by modifying this statement in [_script.js_](script.js):
```javascript
var intNoOfCharTypes = 1;
```
The maximum value is 4.

## Development

This application was written in JavaScript and styled mainly with Bootstrap.

---

#### Author

Tim Silby (tim.silby@gmail.com)


