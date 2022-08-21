function fillPost() {
    let loggedInUser=JSON.parse(localStorage.getItem("loggedInUser"));
        let x = JSON.parse(localStorage.getItem("posts"));
        for (let i = 0 ; i < x.length ; ++i) {
             if (x[i].username === loggedInUser.username) {
                let postImg = document.createElement('img');
                postImg.src = x[i].content.picture;
                let postText = x[i].content.text;
                let myDiv = document.createElement('div');
                if (postImg.src === "") {
                    myDiv.append(postText);
                } else if (postText.value === "") {
                    myDiv.append(postImg);
                } else {

                    myDiv.append(postText);
                    myDiv.append(postImg);
                }
                document.getElementById("main-posts").append(myDiv);
            }
         }
}
