const searchBtn = document.getElementById("search-btn");
const input = document.getElementById("inputId");
const logo = document.querySelector(".logo")
const timeline = document.querySelector(".content-timeline")
const searchedUsers = document.querySelector(".searched-users")
const usersCards = document.querySelector(".users-cards")
const likeBtns = document.querySelectorAll(".like")
let likeCount = document.querySelector(".count")
let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"))

searchBtn.addEventListener("click", () => {
    if (input.value) {
        if (timeline.style.display != "none") {
            timeline.style.display = "none"
            searchedUsers.style.display = "flex"
        }
        displaySearchedUsers(JSON.parse(localStorage.getItem("users")))

        let usersArr = JSON.parse(localStorage.getItem("users"))
        document.querySelectorAll(".follow").forEach(occurence => {
            occurence.addEventListener("click", e => {
                for (let user of usersArr) {
                    if (e.target.id == user.username) {
                        if (loggedInUser.followings.indexOf(user.username) == -1) {
                            console.log("followed")
                            occurence.innerHTML = "Unfollow"
                            follow(loggedInUser, user)
                        } else {
                            console.log("unfollowed")
                            occurence.innerHTML = "Follow"
                            unFollow(loggedInUser, user)
                        }
                    }
                }
                localStorage.setItem("users", JSON.stringify(usersArr))
            })
        })

        document.querySelectorAll(".message").forEach(occurence => {
            occurence.addEventListener("click", e => {
                for (let user of JSON.parse(localStorage.getItem("users"))) {
                    if (e.target.id == user.username) {
                        localStorage.setItem("chatWithUser", JSON.stringify(user));
                        window.location.href = "../chat/chat.html";
                    }
                }
            })
        })
    }
})

logo.addEventListener("click", () => {
    input.value = ""
    searchedUsers.style.display = "none"
    timeline.style.display = "flex"
})

input.addEventListener("keypress", (e) => {
    if (e.keyCode == 13) {
        e.preventDefault()
        searchBtn.click()
    }
})



const displayPosts = (postsArr) => {
    if (postsArr) {
        let posts = []
        for (let p of postsArr) {
            // if (loggedInUser.followings.indexOf(JSON.parse(localStorage.getItem(p.username))) != -1) {
            posts.push(p)
            // }
        }
        console.log(posts)
        const htmlString = posts.map((post) => {
            return `
        <div class="post-card">
            <div class="content-header">
                <div class="profile">
                    <img src="" alt="pic">
                    <span class="post-user">${post.username}</span>
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

}


searchedUsers.style.display = "none"


let postsArr = JSON.parse(localStorage.getItem("posts"))
displayPosts(postsArr)


const displaySearchedUsers = (usersArr) => {
    let filteredUsers = []
    let users = []
    for (let u of usersArr) {
        if (u.username != loggedInUser.username) {
            users.push(u)
        }
    }
    for (let user of users) {
        if ((user.fName + " " + user.lName).toLowerCase().includes(input.value.toLowerCase())) {
            filteredUsers.push(user);
        }
    }

    if (filteredUsers.length == 0) {
        const htmlStringNo = `<div class="no-user">No users found.</div>`;
        usersCards.innerHTML = htmlStringNo;
    } else {
        let follows = []
        for (let user of filteredUsers) {
            if (loggedInUser.followings.indexOf(user.username) == -1) {
                follows.push("Follow")
            } else {
                follows.push("Unfollow")
            }
        }
        let i = 0;
        const htmlString = filteredUsers.map((user) => {
            return `
                    <div class="user">
                        <img src="${user.profileImage}" alt="user-img">
                        <span>${user.fName} ${user.lName}</span>
                        <div class="btns">
                            <button class="message" id="${user.username}">Message</button>
                            <button class="follow" id="${user.username}">${follows[i++]}</button>
                        </div>
                    </div>
            `;
        }).join("");
        usersCards.innerHTML = htmlString;
    }

}

document.querySelectorAll(".like").forEach(occurence => {
    occurence.addEventListener("click", e => {
        console.log("dd");

        for (let post of postsArr) {

            if (post.id == e.target.id) {
                if (post.usersLiked.indexOf(loggedInUser.username) != - 1) {
                    post.likes--;
                    post.usersLiked.splice(post.usersLiked.indexOf(loggedInUser.username), 1)
                    occurence.children[0].style.color = " #c8c6e2";
                    occurence.children[1].innerHTML = `${post.usersLiked.length}`
                } else {

                    post.likes++;
                    post.usersLiked.push(loggedInUser.username)
                    console.log(post.usersLiked);
                    occurence.children[0].style.color = "#62087c";
                    occurence.children[1].innerHTML = `${post.usersLiked.length}`
                }
            }
        }
        localStorage.setItem("posts", JSON.stringify(postsArr));
    })
})


let header_username = document.getElementById("header-username")
let profile_img = document.getElementById("profile-pic")

header_username.innerHTML = `${JSON.parse(localStorage.getItem("loggedInUser")).fName} ${JSON.parse(localStorage.getItem("loggedInUser")).lName}`
profile_img.src = `${JSON.parse(localStorage.getItem("loggedInUser")).profileImage}`

let logout = document.querySelector(".logout-btn")


profile_img.addEventListener("click", () => {
    window.location.href = "./profile-page/index.html"
})