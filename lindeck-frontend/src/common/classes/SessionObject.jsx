import UserObject from "./UserObject";
import DeckObject from "./DeckObject";

export default class SessionObject {
    username = ""

    token = "" // TODO set token from server
    cashedUser = new UserObject()
    cashedDecks = [new DeckObject()]
    isUpToDate = true

    isOnline = true
    isActive = false;

    constructor(props = {}) {
        this.username = props.myUserName || this.username
        this.token = props.myToken || this.username
        this.cashedUser = props.myUser || this.cashedUser
        this.cashedDecks = props.myDecks || this.cashedDecks
        this.isUpToDate = props.isUpToDate || this.isUpToDate
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