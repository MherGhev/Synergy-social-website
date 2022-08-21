
let loggedInUser=JSON.parse(localStorage.getItem("loggedInUser"));
    // module.exports = User;
// //Adding friends
    for (let i = 0; i < loggedInUser.followers.length; ++i) {
        let myDiv = document.createElement('div');
        myDiv.innerHTML = loggedInUser.followers[i].fName + " " + loggedInUser.followers[i].lName;
        myDiv.style.cssText = 'padding-top: 10px; width:200px;font-size: 20px;color: #5a5959';
        document.getElementById("cnt-label").append(myDiv);

}