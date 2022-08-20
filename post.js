class Post {
    constructor(user, pic, text) {
        this.user = user;
        this.content = new Content(pic, text);
        this.likes = 0;
        this.usersLiked = []
        this.date = new Date();
        Post.postArray.push(this);
    }
    static postArray = [];
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

function post() {
    let postImg = document.getElementById("post-image");
    let postText = document.getElementById("post-description");
    if (postImg.src === "" && postText.value === "") {
        document.getElementById("popup").style.border = "1px solid red";
    } else {
        let haykaz = new User("Haykaz", "Martirosyan", new Date(1970, 12, 23), "haykazhaykaz", "male");
        haykaz.addPost(new Post(haykaz, postImg.src, postText.value));
        console.log(Post.postArray)
        localStorage.setItem("posts", JSON.stringify(Post.postArray));
        console.log(localStorage);
        togglePopup();
    }
}

console.log(JSON.parse(localStorage.getItem("posts")))