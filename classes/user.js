class User {
    constructor(fName, lName, username, birthday, password, gender) {
        this.fName = fName;
        this.lName = lName;
        this.username = username
        this.birthday = birthday;
        this.password = password;
        this.gender = gender;
        this.profileImage = "./pictures/profile.png"
        this.followers = [];
        this.followings = [];
        this.posts = [];
        this.chats = [];
        User.userArray.push(this);
        localStorage.setItem("users", JSON.stringify(User.userArray));
    }

    static userArray = [];

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