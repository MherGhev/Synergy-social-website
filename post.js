function Post(user,pic,text) {
    this.user=user;
    this.content=new Content(pic,text);
    this.likes=0;
    this.date=new Date();
}


function Content(picture,text){
    this.picture=picture;
    this.text=text;
}
