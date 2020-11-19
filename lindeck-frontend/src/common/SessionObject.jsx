
export default class MySession {
    username = ""
    myToken = "" // ???
    isActive = false;

    constructor(myUserName, myToken) {
        this.username = myUserName || this.username
        this.myToken = myToken || this.username
        this.isActive = myUserName !== ""
    }

    isMe(username) {
        return username === this.username
    }
}