function Post(pic,text) {
    this.content=new Content(pic,text);
    this.likes=0;
}


function Content(picture,text){
    this.picture=picture;
    this.text=text;
}
