
class User {
    constructor(fName, lName, username, birthday, password, gender) {
        this._fName = fName;
        this._lName = lName;
        this.username = username;
        this._birthday = birthday;
        this._password = password;
        this._gender = gender;
        this.followers = [];
        this.followings = [];
        this.posts = [];
        this.chats = [];
    }
    get fName() {
        return this._fName;
    }
    set fName(newFName) {
        this._fName = newFName;
    }
    get lName() {
        return this._lName;
    }
    set lName(newLName) {
        this._lName = newLName;
    }
    get birthday() {
        return this._birthday;
    }
    set birthday(newBirthday) {
        if (newBirthday instanceof Date) {
            this._birthday = newBirthday;
            return true;
        } else {
            return false;
        }
    }
    get password() {
        return this._password;
    }
    set password(newPassword) {
        this._password = newPassword;
    }
    get gender() {
        return this._gender;
    }
    set gender(newGender) {
        this._gender = newGender;
    }


    addFollower = function (newFollower) {
        this.followers.push(newFollower);
    }

    follow = function (newFollowing) {
        this.followings.push(newFollowing);
        newFollowing.addFollower(this);
    }

    unFollow = function (otherUser) {
        let indexOfFollowing = this.followings.indexOf(otherUser);
        let indexOfThisInOtherUserFollowers = otherUser.followers.indexOf(this);

        if (indexOfFollowing >= 0) {
            this.followings.splice(indexOfFollowing, 1);
            otherUser.followers.splice(indexOfThisInOtherUserFollowers, 1);
        } else {
            console.log("No such user.")
        }
    }

    addPost = function (newPost) {
        this.posts.push(newPost);
    }

    removePost = function (delPost) {
        let indexOfPost = this.posts.indexOf(delPost);
        if (indexOfPost >= 0) {
            this.posts.splice(indexOfPost, 1);
        } else {
            console.log("No such post.");
        }
    }

}

