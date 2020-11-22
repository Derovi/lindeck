import UserObject from "./UserObject";
import DeckObject from "./DeckObject";

export default class SessionObject {
    username = ""

    myToken = "" // TODO set toker from server
    myUser = new UserObject()
    myDecks = [new DeckObject()]
    isUpToDate = true

    isOnline = true
    isActive = false;

    constructor(myUserName, myToken, myUser, myDecks, isUpToDate) {
        this.username = myUserName || this.username
        this.myToken = myToken || this.username
        this.myUser = myUser || this.myUser
        this.myDecks = myDecks || this.myDecks
        this.isUpToDate = isUpToDate || this.isUpToDate
        this.isActive = this.username !== ""
        this.updateOnline()
    }

    isMe(username) {
        return username === this.username
    }

    updateOnline() {
//        this.isOnline = window.navigator.onLine
        return this.isOnline  // now sets offline by Button
    }
}