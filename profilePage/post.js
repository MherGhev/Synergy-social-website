let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));


function post() {
    let postImg = document.getElementById("post-image");
    let postText = document.getElementById("post-description");
    if (postImg.src === "" && postText.value === "") {
        document.getElementById("popup").style = "border-color: red";
    }
    else {
        new Post(loggedInUser.username, postImg.src, postText.value)
        console.log(Post.postArray)
        localStorage.setItem("posts", JSON.stringify(Post.postArray));
        displayPosts(JSON.parse(localStorage.getItem("posts")))
        togglePopup();
        postImg.src = "";
        postText.value = "";

    }
}