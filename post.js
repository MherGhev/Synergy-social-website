class Post {
    constructor(username, pic, text) {
        this.username = username;
        this.content = new Content(pic, text);
        this.likes = 0;
        this.usersLiked = []
        this.date = new Date();
        Post.postArray.push(this);
        this.id = Post.id++;
    }
    static postArray = [];
    static id = 0;
}


class Content {
    constructor(picture, text) {
        this.picture = picture;
        this.text = text;
    }
}

function handlePostButtonClick() {
    let imageInput = document.getElementById("post-image-input");
    let popup = document.getElementById("popup");
    let img = document.createElement("img");

    popup.addEventListener("load", () => {
        img.src = imageInput;
        popup.append(img);
        alert("Hi");
    })
}


function loadFile(event) {
    let image = document.getElementById("post-image");
    image.src = URL.createObjectURL(event.target.files[0]);
}


function togglePopup() {
    const popup = document.getElementById('popup-wrapper');
    if (popup.style.display === "none") {
        popup.style.display = "flex";
    } else {
        popup.style.display = "none"
    }
}

function addPostProfile(){
    let x = JSON.parse(localStorage.getItem("posts"));
    let length = x.length;
    let postImg = document.createElement('img');
    postImg.src = x[length - 1].content.picture;
    let postText = x[length - 1].content.text;
    let myDiv = document.createElement('div');
    if (postImg.src === "") {
        myDiv.append(postText);
    }
    else if (postText.value === "") {
        myDiv.append(postImg);
    }
    else {

        myDiv.append(postText);
        myDiv.append(postImg);
    }
    document.getElementById("main-posts").append(myDiv);
}

function post() {

    let postImg = document.getElementById("post-image");
    let postText = document.getElementById("post-description");
    if (postImg.src === "" && postText.value === "") {
        document.getElementById("popup").style = "border-color: red";
    } else {
        let haykaz = new User("Haykaz", "Martirosyan", new Date(1970, 12, 23), "haykazhaykaz", "male");
        haykaz.addPost(new Post(haykaz.username, postImg.src, postText.value));
        localStorage.setItem("posts", JSON.stringify(Post.postArray));
        togglePopup();
        // console.log(JSON.parse(localStorage.getItem("posts")));
        addPostProfile();
        postImg.src = "";
        postText.value = "";

    }
}
