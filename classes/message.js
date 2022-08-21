class Message {
    constructor(content, from, to) {
        this.content = content;
        this.from = from;
        this.to = to;
        this.date = new Date();
    }
}