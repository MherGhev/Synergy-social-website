// if(!Post){
    class Post {
        constructor(username, pic, text) {
            this.username = username;
            this.content = new Content(pic, text);
            this.likes = 0;
            this.usersLiked = []
            this.date = new Date();
            Post.postArray.push(this);
            this.id = Post.id++;
        }
        static postArray = [];
        static id = 0;
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



// }

