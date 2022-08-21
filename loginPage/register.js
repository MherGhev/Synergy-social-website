let users = JSON.parse(localStorage.getItem("users"));

function register() {
    event.preventDefault();

    let lName = document.getElementById("registerLName").value;
    let fName = document.getElementById("registerFName").value;
    let username = document.getElementById("registrationUsername").value;
    let birthday = document.getElementById("registrationBirthday").value;
    let password = document.getElementById("registrationPassword").value;
    let confirmPassword = document.getElementById("registrationConfirmPassword").value;
    let termsCheckbox = document.getElementById("registrationTermsCheckbox");


    if (!isValidFName(fName)) {
        alert("please insert your first name")
    } else if (!isValidLName(lName)) {
        alert("please insert your last name")
    } else if (!isValidUsername(username)) {
        alert("This username is already taken, please choose another one");
    } else if (!isValidDate(birthday)) {
        alert("insert valid date")
    } else if (!isValidPassword(password)) {
        alert("input password")
    } else if (!passwordConfirmPassword(password, confirmPassword)) {
        alert("passwords are not the same")
    } else if (!termsAndConditions(termsCheckbox)) {
        alert("Please confirm that you are agree with terms and conditions")
    } else {
        let user = new User(fName, lName, username, birthday, password);
        console.log(User.userArray);
        localStorage.setItem("users", JSON.stringify(User.userArray));
        users = JSON.parse(localStorage.getItem("users"));
    }
}


function termsAndConditions(checkbox) {
    return checkbox.checked;
}

function isValidUsername(username) {
    if (username == "") return false;
    if (users) {
        for (let i = 0; i < users.length; i++) {
            let user = JSON.parse(localStorage.getItem("users"))[i];
            if (user.username === username) {
                return false;
            }
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

function logIn() {
    event.preventDefault();
    let username = document.getElementById("loginUsername").value;
    let password = document.getElementById("loginPassword").value;
    let isLoggedIn = false;
    for (let i = 0; i < users.length; i++) {
        let user = users[i];
        if (username === user.username && password === user.password) {
            isLoggedIn = true;
            localStorage.setItem("loggedInUser", JSON.stringify(user));
            window.location.assign("../timeline/timeline.html");
        } 
    }
    if (!isLoggedIn) {
        alert("your log in or password is incorrect");
    }
}
