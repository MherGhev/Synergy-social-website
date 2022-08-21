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
        console.log(User.userArray)
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


let loggedInUser= new User("Haykaz", "Martirosyan", new Date(1970, 12, 23), "haykazhaykaz", "male");
let esim1 = new User("name1", "lastName1","esim1", new Date(1970, 12, 23), "12345", "male");
let esim2 = new User("name2", "lastName2", "esim2",new Date(1970, 12, 23), "12345", "male");
let esim3 = new User("name3", "lastName3", "esim3",new Date(1970, 12, 23), "12345", "male");
let esim4 = new User("name4", "lastName4", "esim4",new Date(1970, 12, 23), "12345", "male");

loggedInUser.addFollower(esim1);
loggedInUser.addFollower(esim2);
loggedInUser.addFollower(esim3);
loggedInUser.addFollower(esim4);
