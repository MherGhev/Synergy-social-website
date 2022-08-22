let users = JSON.parse(localStorage.getItem("users"));

class MyChat {
    static id = 0;
    constructor(user1, user2) {
        this.user1 = user1;
        this.user2 = user2;
        this.messages = [];
        MyChat.id++;
        let myChats = {[user2.username]: "" + MyChat.id}
        let myChats2 =  {[user1.username]: "" + MyChat.id}
        for (const user of users) {
            if(user.username === user1.username){
                user.chats = myChats
            }
            if(user.username === user2.username){
                user.chats = myChats2;
            }
        }
        localStorage.setItem('users', JSON.stringify(users))
        loggedInUser.chats = myChats;
        chatWithUser.chats = myChats2;
        localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
        localStorage.setItem('chatWithUser', JSON.stringify(chatWithUser));

        localStorage.setItem("" + MyChat.id, JSON.stringify(this.messages));
    }
}

function getChat(user1, user2) {
    console.log("aa");
    console.log(user1.chats[user2.username]);
    if (user1.chats[user2.username] === undefined) {
        console.log("new chat is created");
        new MyChat(user1, user2);
    }
    chatId = user1.chats[user2.username];
    return localStorage.getItem(chatId);
}

function sendMessage(user1, user2, content) {
    let message = new Message(content, user1, user2);
    let a = localStorage.getItem(user1.chats[user2.username]);
    let arr = JSON.parse(a);
    arr.push(message);
    localStorage.setItem(user1.chats[user2.username], JSON.stringify(arr));
}

function f(user1, user2) {
    getChat(user1, user2);
    let messageList = JSON.parse(getChat(user1, user2));
    for (let i = 0; i < messageList.length; i++) {
        let myDiv = document.createElement('div');
        if (messageList[i].from.username === user1.username) {
            myDiv.className = 'from-me'
        } else {
            myDiv.className = 'to-me'
        }

        myDiv.innerText = messageList[i].content;
        document.getElementById("messages").appendChild(myDiv);
    }
    scrollBottom();
    let input = document.getElementById('input');
    input.addEventListener("keypress",
        (e) => {
            if (e.keyCode === 13) {
                e.preventDefault()
                send(user1, user2);
            }
        }
    )
    let h3 = document.getElementById('username');
    h3.innerText = user2.username;
}

function send(user1, user2) {
    let input = document.getElementById("input");
    let inputValue = input.value;
    input.value = ""
    if (inputValue !== "") {
        sendMessage(user1, user2, inputValue);
    }
    refresh(user1, user2);
}

function refresh(user1, user2) {
    document.getElementById('messages').innerHTML = "";
    f(user1, user2);
}

function scrollBottom() {
    let scroll_to_bottom = document.getElementById('messages');
    scroll_to_bottom.scrollTop = scroll_to_bottom.scrollHeight;
}

function changeTheme() {
    if (document.getElementById('chat-header').style.backgroundColor !== "") {
        document.getElementById('messages').style.backgroundColor = '#f9f9f9';
        document.getElementById('send-div').style.backgroundColor = '';
        document.getElementById('chat-header').style.backgroundColor = '';
        document.getElementById('chat-header').style.color = ''
    } else {
        document.getElementById('messages').style.backgroundColor = '#191919';
        document.getElementById('send-div').style.backgroundColor = 'black';
        document.getElementById('chat-header').style.backgroundColor = 'black';
        document.getElementById('chat-header').style.color = 'white'
    }
}


let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
let chatWithUser = JSON.parse(localStorage.getItem("chatWithUser"));
console.log(loggedInUser);
console.log(chatWithUser);

let sendButton = document.getElementById("send-button");
let refreshButton = document.getElementById("refresh");

sendButton.addEventListener("click", () => {
    send(loggedInUser, chatWithUser);
})

refreshButton.addEventListener("click", () => {
    refresh(loggedInUser, chatWithUser);
})

f(loggedInUser, chatWithUser);


let header_username = document.getElementById("header-username")
let profile_img = document.getElementById("profile-pic")
const logo = document.querySelector(".logo")

header_username.innerHTML = `${JSON.parse(localStorage.getItem("loggedInUser")).fName} ${JSON.parse(localStorage.getItem("loggedInUser")).lName}`
    profile_img.src = `${JSON.parse(localStorage.getItem("loggedInUser")).profileImage}`




        logo.addEventListener("click", () => {
            window.location.href = "../timeline/timeline.html"
        })
profile_img.addEventListener("click", () => {
    window.location.href = "./profile-page/index.html"
})