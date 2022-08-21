const searchBtn=document.getElementById("search-btn");
const input=document.getElementById("inputId");
const logo=document.querySelector(".logo")
const timeline=document.querySelector(".content-timeline")
const likeBtns=document.querySelectorAll(".like")
let likeCount=document.querySelector(".count")
// let loggedInUser=JSON.parse(localStorage.getItem("loggedInUser"))



//replace pictures with loggedinuser's picture
function changePictures() {
    let img1 = document.createElement('img');
    img1.src = loggedInUser.profileImage;
    let img2 = document.createElement('img');
    img2.src = loggedInUser.profileImage;
    let img3 = document.createElement('img');
    img3.src = loggedInUser.profileImage;
    document.getElementById("profile-picture").replaceWith(img1);
    document.getElementById("profile-picture-header").replaceWith(img2);
    document.getElementById("profile-picture-post").replaceWith(img3);

}

function changePictures1(){
    let postImg = document.getElementById("post-image");
    let postText = document.getElementById("post-description");
    if (postImg.src === "" && postText.value === "") {
        document.getElementById("popup").style = "border-color: red";
    }
    else {
        loggedInUser.addPost(new Post(loggedInUser.username, postImg.src, postText.value));
        localStorage.setItem("posts", JSON.stringify(Post.postArray));
        togglePopup();
        console.log(JSON.parse(localStorage.getItem("posts")));
        addPostProfile();
        postImg.src = "";
        postText.value = "";

    }
}





//header
searchBtn.addEventListener("click",()=>{
    if(input.value){
        if(timeline.style.display!=="none"){
            timeline.style.display="none"
            searchedUsers.style.display="flex"
        }
        displaySearchedUsers(JSON.parse(localStorage.getItem("users")))
    }
})

logo.addEventListener("click",()=>{
    input.value=""
    searchedUsers.style.display="none"
    timeline.style.display="flex"
})

input.addEventListener("keypress",(e)=>{
    if(e.keyCode==13){
        e.preventDefault()
        searchBtn.click()
    }
})


// function fillPost() {
//     let loggedInUser=JSON.parse(localStorage.getItem("loggedInUser"));
//         let x = JSON.parse(localStorage.getItem("posts"));
//         for (let i = 0 ; i < x.length ; ++i) {
//              if (x[i].username === loggedInUser.username) {
//                 let postImg = document.createElement('img');
//                 postImg.src = x[i].content.picture;
//                 let postText = x[i].content.text;
//                 let myDiv = document.createElement('div');
//                 if (postImg.src === "") {
//                     myDiv.append(postText);
//                 } else if (postText.value === "") {
//                     myDiv.append(postImg);
//                 } else {
//
//                     myDiv.append(postText);
//                     myDiv.append(postImg);
//                 }
//                 document.getElementById("main-posts").append(myDiv);
//             }
//          }
// }


//posts
const displayPosts=(postsArr)=>{
    let posts=[]
    for(let p of postsArr){
        if(p.username === loggedInUser.username){
            posts.push(p)
        }
    }
    const htmlString=posts.map((post)=>{
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
    timeline.innerHTML=htmlString;
}

searchedUsers.style.display="none"


let postsArr=JSON.parse(localStorage.getItem("posts"))
postsArr.sort((a,b)=> a.date-b.date)
displayPosts(postsArr)

//Adds friends

// //Add friends
for (let i = 0; i < loggedInUser.followers.length; ++i) {
    let myDiv = document.createElement('div');
    myDiv.innerHTML = loggedInUser.followers[i].fName + " " + loggedInUser.followers[i].lName;
    myDiv.style.cssText = 'padding-top: 10px; width:200px;font-size: 20px;color: #5a5959';
    document.getElementById("cnt-label").append(myDiv);
}
