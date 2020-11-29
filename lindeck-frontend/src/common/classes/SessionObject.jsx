import UserObject from "./UserObject";
import DeckObject from "./DeckObject";

export default class SessionObject {
    id = undefined

    token = "" // TODO set token from server
    cashedUser = new UserObject()
    cashedDecks = [] // new DeckObject()
    isUpToDate = true

    isOnline = true
    isActive = false;

    constructor(props = {}) {
        this.token = props.token || this.token
        this.cashedUser = new UserObject(props.cashedUser) || this.cashedUser
        this.isUpToDate = props.isUpToDate || this.isUpToDate
        this.id = props.id

        this.cashedDecks = props.cashedDecks || this.cashedDecks
        this.cashedDecks = this.cashedDecks.map(deck => new DeckObject(deck))
        this.isActive = this.id !== undefined
        this.updateOnline()
    }

    isMe(id) {
        return id === this.id
    }

    updateOnline() {
//        this.isOnline = window.navigator.onLine
        return this.isOnline  // now sets offline by Button
    }
}