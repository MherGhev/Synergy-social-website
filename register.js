import {User} from 'user.js';

let users = Object.keys(localStorage);


function register() {
    event.preventDefault();

    let lName = document.getElementById("registerLName").value;
    let fName = document.getElementById("registerFName").value;
    let username = document.getElementById("registrationUsername").value;
    let birthday = document.getElementById("registrationBirthday").value;
    let password = document.getElementById("registrationPassword").value;
    let confirmPassword = document.getElementById("registrationConfirmPassword").value;
    let termsCheckbox = document.getElementById("registrationTermsCheckbox");

    if (!termsAndConditions(termsCheckbox)) {
        alert("Please confirm they you are agree with terms and conditions")
    }

    if (!isValidUsername(username)) {
        alert("This username is already takes, please choose another one");
    }


    if (!passwordConfirmPassword(password, confirmPassword)) {
        alert("passwords are not the same")
    }

    if (!isValidPassword(password)) {
        alert("input password")
    }

    if (!isValidDate(birthday)) {
        alert("insert valid date")
    }

    if (!isValidFName(fName)) {
        alert("please insert your first name")
    }

    if (!isValidLName(lName)) {
        alert("please insert your last name")
    }


    if (isValidUsername(username) && passwordConfirmPassword(password, confirmPassword)
        && isValidDate(birthday) && termsAndConditions(termsCheckbox)
        && isValidPassword(password) && isValidLName(lName) && isValidFName(isValidFName()) ) {
        console.log("everything is okay");
        let user = new User(fName, lName, username, birthday, password, confirmPassword, termsCheckbox);
        localStorage.setItem(username, JSON.stringify(user));
    }
}

function termsAndConditions(checkbox) {
    return checkbox.checked;
}

function isValidUsername(username) {
    if (username == "") return false;
    for (let i = 0; i < users.length; i++) {
        let user = JSON.parse(localStorage.getItem(users[i]));
        if (user.username === username) {
            return false;
        }
    }
    return true;
}

function isValidPassword(password) {
    return password !== "";
}

function passwordConfirmPassword(password, currentPassword) {
    return password === currentPassword;
}

function isValidDate(date) {
    return new Date(date) < new Date();
}

function isValidFName(fName) {
    return fName !== "";
}

function isValidLName(lName) {
    return lName !== "";
}




// function User(fName, lName, username, birthdate, password, confirmPassword, termsCheckbox) {
//     this.fName = fName;
//     this.lName = lName;
//     this.username = username;
//     this.birthdate= birthdate;
//     this.password = password;
//     this.confirmPassword = confirmPassword;
//     this.termsCheckbox = termsCheckbox;
// }

function logIn() {
    event.preventDefault();
    let username = document.getElementById("loginUsername").value;
    let password = document.getElementById("loginPassword").value;
    let isLoggedIn = false;
    for (let i = 0; i < users.length; i++) {
        let user = JSON.parse(localStorage.getItem(users[i]));
        if (username == user.username && password == user.password) {
            alert("you are logged in");
            isLoggedIn = true;
        }
    }
    if (!isLoggedIn) {
        alert("your log in or password is incorrect");
    }

}



