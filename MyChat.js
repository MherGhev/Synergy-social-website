class MyChat{
    static id = 0;
    constructor(user1, user2) {
        this.user1 = user1;
        this.user2 = user2;
        this.messages = [];
        MyChat.id ++;
        user1.chats[user2.username] = "" +  MyChat.id;
        user2.chats[user1.username] = "" + MyChat.id;
        localStorage.setItem("" + MyChat.id, JSON.stringify(this.messages));
    }
}

function getChat(user1, user2){
    let chatId;
    if(user1.chats[user2.username] === undefined){
        new MyChat(user1,user2);
    }
    chatId = user1.chats[user2.username];
    return localStorage.getItem(chatId);
}

function sendMessage(user1, user2, content){
    let message = new Message(user1, user2, content);
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
        if (messageList[i].from._username === user1.username) {
            myDiv.className = 'from-me'
        } else {
            myDiv.className = 'to-me'
        }
        myDiv.innerHTML = messageList[i].content;
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
    let inputValue = document.querySelector("input").value;
    let input = document.getElementById('input');
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

let header_username=document.getElementById("header-username")
let profile_img=document.getElementById("profile-pic")
const logo=document.querySelector(".logo")

header_username.innerHTML=`${JSON.parse(localStorage.getItem("loggedInUser")).fName} ${JSON.parse(localStorage.getItem("loggedInUser")).lName}`
profile_img.src=`${JSON.parse(localStorage.getItem("loggedInUser")).profileImage}`

let logout=document.querySelector(".logout-btn")

logout.addEventListener("click",()=>{
    window.location.href="./loginPage/index.html"
})
logo.addEventListener("click",()=>{
    window.location.href="./timeline.html"
})
profile_img.addEventListener(()=>{
    window.location.href="./profile-page/index.html"
})
