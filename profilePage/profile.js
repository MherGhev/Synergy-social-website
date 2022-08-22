const logo = document.querySelector(".logo")
const timeline = document.querySelector(".content-timeline")
const likeBtns = document.querySelectorAll(".like")
let likeCount = document.querySelector(".count")
const headerUsername = document.getElementById("user-name");
headerUsername.innerText = `${JSON.parse(localStorage.getItem("loggedInUser")).fName} ${JSON.parse(localStorage.getItem("loggedInUser")).lName}`;
const userName = document.getElementById("u-name");
userName.innerText = `${JSON.parse(localStorage.getItem("loggedInUser")).fName} ${JSON.parse(localStorage.getItem("loggedInUser")).lName}`;


//replace pictures with loggedinuser's picture
function changePictures() {
    let img1 = document.createElement('img');
    img1.src = loggedInUser.profileImage;
    let img2 = document.createElement('img');
    img2.src = loggedInUser.profileImage;
    let img3 = document.createElement('img');
    img3.src = loggedInUser.profileImage;
    document.getElementById("profile-picture").src = img1.src;
    document.getElementById("profile-picture-header").src = img2.src;
    document.getElementById("profile-picture-post").src = img3.src;
}

function changePictures1() {
    let postImg = document.getElementById("post-image");
    let postText = document.getElementById("post-description");
    if (postImg.src === "" && postText.value === "") {
        document.getElementById("popup").style = "border-color: red";
    }
    else {
        // loggedInUser.addPost(new Post(loggedInUser.username, postImg.src, postText.value));
        addPost(loggedInUser, new Post(loggedInUser.username, postImg.src, postText.value))
        localStorage.setItem("posts", JSON.stringify(Post.postArray));
        togglePopup();
        console.log(JSON.parse(localStorage.getItem("posts")));
        addPostProfile();
        postImg.src = "";
        postText.value = "";

    }
}

function loadProfilePic(event) {
    let img1 = document.getElementById("profile-picture");
    img1.src = URL.createObjectURL(event.target.files[0]);
    let img2 = document.getElementById("profile-picture-header");
    img2.src = URL.createObjectURL(event.target.files[0]);
    let img3 = document.getElementById("profile-picture-post");
    img3.src = URL.createObjectURL(event.target.files[0]);
    loggedInUser.profileImage = img1.src;
    localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
    console.log(loggedInUser.profileImage);
}


function changeProfilePicture() {
    let profPic = document.getElementById("getFile");
    console.log(profPic);
    loggedInUser.profileImage = profPic.src;
    document.getElementById("profile-pic").src = loggedInUser.profileImage;
}



//posts
const displayPosts = (postsArr) => {
    let posts = []
    for (let p of postsArr) {
        if (p.username === loggedInUser.username) {
            posts.push(p)
        }
    }
    const htmlString = posts.map((post) => {
        return `
        <div class="post-card">
            <div class="content-header">
                <div class="profile">
                    <img src="" alt="pic">
                    <span class="post-user">${JSON.parse(localStorage.getItem(post.username)).fName} ${JSON.parse(localStorage.getItem(post.username)).lName}</span>
                </div>
            </div>
            <div class="post-content">
                <div class="text">
                    ${post.content.text}
                </div>
                <img src="${post.content.picture}" alt="image">
            </div>
            <div class="likes">
                <div class="like">
                    <i class="fa-solid fa-heart" id="${post.id}"></i>
                    <span class="count">${post.likes}</span>
                </div>
            </div>
        </div>`;
    }).join("");
    timeline.innerHTML = htmlString;
}



let postsArr = JSON.parse(localStorage.getItem("posts"))
postsArr.sort((a, b) => a.date - b.date)
displayPosts(postsArr)

//Adds friends

//Add friends
for (let i = 0; i < loggedInUser.followers.length; ++i) {
    let myDiv = document.createElement('div');
    myDiv.innerHTML = loggedInUser.followers[i].fName + " " + loggedInUser.followers[i].lName;
    myDiv.style.cssText = 'padding-top: 10px; width:200px;font-size: 20px;color: #5a5959';
    document.getElementById("cnt-label").append(myDiv);
}
