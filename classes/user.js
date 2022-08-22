class User {
    constructor(fName, lName, username, birthday, password, gender) {
        this.fName = fName;
        this.lName = lName;
        this.username = username
        this.birthday = birthday;
        this.password = password;
        this.gender = gender;
        this.profileImage = "../pictures/profile.png";
        this.followers = [];
        this.followings = [];
        this.posts = [];
        this.chats = {};
        User.userArray.push(this);
        localStorage.setItem("users", JSON.stringify(User.userArray));
        console.log(User.userArray)
    }
 
    static userArray = [];

}

if (localStorage.getItem('users')) {
    for (let usr of JSON.parse(localStorage.getItem("users"))) {
        User.userArray.push(usr);
    }
}

function addFollower(user,newFollower) {
    user.followers.push(newFollower.username);
}

function follow(user,newFollowing) {
    user.followings.push(newFollowing.username);
    addFollower(newFollowing,user);
}

function  unFollow(user,otherUser) {
    let indexOfFollowing = user.followings.indexOf(otherUser.username);
    let indexOfThisInOtherUserFollowers = otherUser.followers.indexOf(user.username);

    if (indexOfFollowing >= 0) {
        user.followings.splice(indexOfFollowing, 1);
        otherUser.followers.splice(indexOfThisInOtherUserFollowers, 1);
    } else {
         console.log("No such user.")
    }
}

function addPost(user,newPost) {
    user.posts.push(newPost);
}
