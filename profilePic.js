let pPic = document.getElementById('profile-picture');
let cover = document.getElementById('getFile');

pPic.addEventListener('click',_=>cover.click());

function changePic(){
    let file = cover.files[0];
    let freader = new FileReader();
    freader.onload = function (){
        pPic.src = freader.result;
        loggedInUser.profileImage.src = freader.result;
    }
    freader.readAsDataURL(file);

}
