const searchBtn=document.getElementById("search-btn");
const input=document.getElementById("inputId");
const logo=document.querySelector(".logo")
const timeline=document.querySelector(".content-timeline")
const searchedUsers=document.querySelector(".searched-users")
const usersCards=document.querySelector(".users-cards")
const likeBtns=document.querySelectorAll(".like")
let likeCount=document.querySelector(".count")
let loggedInUser=JSON.parse(localStorage.getItem("loggedInUser"))

searchBtn.addEventListener("click",()=>{
    if(input.value){
        if(timeline.style.display!="none"){
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



const displayPosts=(postsArr)=>{
    let posts=[]
    for(let p of postsArr){
        if(p.username!=loggedInUser && loggedInUser.followers.indexOf(JSON.parse(localStorage.getItem(p.username)))!=-1){
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


const displaySearchedUsers=(usersArr)=>{
    let filteredUsers=[]
    let users=[]
    for(let u of usersArr){
        if(u!=loggedInUser){
            users.push(u)
        }
    }
    for(let user of users){
        if((user.fName+" "+user.lName).toLowerCase().includes(input.value.toLowerCase())){
            filteredUsers.push(user);
        }
    }

    if(filteredUsers.length==0){
        const htmlStringNo= `<div class="no-user">No users found.</div>`;
        usersCards.innerHTML=htmlStringNo;
    } else{
        const htmlString=filteredUsers.map((user)=>{
            return `
                    <div class="user">
                        <img src="${user.profileImage}" alt="user-img">
                        <span>${user.fName} ${user.lName}</span>
                        <div class="btns">
                            <button class="message" id="${user.username}">Message</button>
                            <button class="follow">Follow</button>
                        </div>
                    </div>
            `;
        }).join("");
        usersCards.innerHTML=htmlString;
    }

}

document.querySelectorAll(".like").forEach(occurence=>{
    occurence.addEventListener("click",e=>{
        for(let post of postsArr){
            if(post.id==e.target.id){
                if(post.usersLiked.indexOf(loggedInUser)!=-1){
                    liked=false;
                    post.likes--;
                    post.usersLiked.splice(post.usersLiked.indexOf(loggedInUser),1)
                    console.log(post.likes)
                    occurence.children[0].style.color=" #c8c6e2";
                    occurence.children[1].innerHTML=`${post.likes}`
                } else {
                    liked=true;
                    post.likes++;
                    post.usersLiked.push(loggedInUser)
                    console.log(post.likes)
                    occurence.children[0].style.color="#62087c";
                    occurence.children[1].innerHTML=`${post.likes}`
                }
            }
        }
    })
})

document.querySelectorAll(".follow").forEach(occurence=>{
    occurence.addEventListener("click",e=>{
        for(let user of JSON.parse(localStorage.getItem("users"))){
            if(e.target.id==user.username){
                if(loggedInUser.followers.indexOf(user)=-1){
                    console.log("followed")
                    loggedInUser.addFollower(user)
                } else {
                    console.log("unfollowed")
                    loggedInUser.unFollow(user)
                }
            }
        }
    })
})

document.querySelectorAll(".message").forEach(occurence=>{
    occurence.addEventListener("click",e=>{
        for(let user of JSON.parse(localStorage.getItem("users"))){
            if(e.target.id==user.username){
                f(loggedInUser,user);
                window.location.href="./chat.html";  //need to fix this
            }
        }
    })
})

let header_username=document.getElementById("header-username")
let profile_img=document.getElementById("profile-pic")

header_username.innerHTML=`${JSON.parse(localStorage.getItem("loggedInUser")).fName} ${JSON.parse(localStorage.getItem("loggedInUser")).lName}`
profile_img.src=`${JSON.parse(localStorage.getItem("loggedInUser")).profileImage}`

let logout=document.querySelector(".logout-btn")

logout.addEventListener("click",()=>{
    window.location.href="./loginPage/index.html"
})

profile_img.addEventListener(()=>{
    window.location.href="./profile-page/index.html"
})
