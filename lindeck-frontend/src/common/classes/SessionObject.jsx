import UserObject from "./UserObject";
import DeckObject from "./DeckObject";
import Axios from "axios";

export default class MySession {
    username = ""
    myToken = "" // ???
    isActive = false;

    isOnline = false


    isUpToDate = true
    myUser = new UserObject()
    myDecks = [new DeckObject()]

    constructor(myUserName, myToken, myUser, myDecks) {
        this.username = myUserName || this.username
        this.myToken = myToken || this.username
        this.isActive = myUserName !== ""
        this.myUser = myUser || myUser
        this.myDecks = myDecks || myDecks
        this.updateOnline()
    }

    isMe(username) {
        return username === this.username
    }

    updateOnline() {
        Axios.get('https://dog.ceo/api/breeds/image/random')
            .then(response => {
                if (response.status >= 200 && response.status < 300) {
                    return Promise.resolve(response.data);
                } else {
                    this.isOnline = false
                }
            })
            .then(this.isOnline = true)
            .catch(err => {
                this.isOnline = false
            });

        return this.isOnline
    }
}