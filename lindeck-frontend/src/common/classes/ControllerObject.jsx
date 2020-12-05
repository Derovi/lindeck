import UserObject from "./UserObject";
import SessionObject from "./SessionObject";
import DeckObject from "./DeckObject";
import Connect from "./ServerConnector";
import DeckMetadataObject from "./DeckMetadataObject";

function getFromLS(key) {
    return JSON.parse(global.localStorage.getItem(key));
}

function saveToLS(key, value) {
    if (global.localStorage) {
        global.localStorage.setItem(key, JSON.stringify(value));
    }
}

class ControllerObject {
    session = new SessionObject()

    constructor() {
        if (!getFromLS("session")) {
            saveToLS("session", new SessionObject())
        }
        this.session = new SessionObject(getFromLS("session"))
        this.sessionOnlineCheck()
    }

    getDeckNyUsernameDeckname(username, deckname) {
        let jsonDeck
        if (this.session.isOnline) {
            jsonDeck = Connect.getDeckNyUsernameDeckname(username, deckname)
        } else {
            let myId = this.session.id
            jsonDeck = this.session.cashedDecks.filter(deck => deck.ownerId === myId && deck.name === deckname)[0]
        }
        let deckObject = new DeckObject(jsonDeck)
        if (!deckObject.canSee(this.session.cashedUser.id)) {
            return new DeckObject()
        }
        return deckObject
    }

    getDeckByUuid(uuid) {
        let jsonDeck
        if (this.session.isOnline) {
            jsonDeck = Connect.getDeckByUuid(uuid)
        } else {
            let allDecks = this.session.cashedDecks
            jsonDeck = allDecks.filter(deck => deck.uuid === uuid)[0]
        }

        return new DeckObject(jsonDeck)
    }


    getUser(UserName) {
        let jsonUser = null
        if (this.session.isOnline) {
            jsonUser = Connect.getUser(UserName)
        } else {
            let allUsers = [this.session.cashedUser]
            jsonUser = allUsers.filter(user => user.username === UserName)[0]
        }
        if (!jsonUser)
            return null
        return new UserObject(jsonUser)
    }

    getUserById(id) {
        let jsonUser = null
        if (this.session.isOnline) {
            jsonUser = Connect.getUserById(id)
        } else {
            let allUsers = [this.session.cashedUser]
            jsonUser = allUsers.filter(user => user.id === id)[0]
        }
        if (!jsonUser)
            return null
        return new UserObject(jsonUser)

    }

    checkUserName(name) {
        if (name.length < 3) {
            return "name is too short"
        }
        if (!this.session.isOnline) {
            return "connect to the internet"
        }

        return ""
    }

    checkEmail(mail) {
        let isValid = mail.match(".+@.+\\..+")
        if (!isValid) {
            return "Email is invalid"
        }

        if (!this.session.isOnline) {
            return "connect to the internet"
        }
        return ""
    }

    isUserNameOrEmailAlreadyExists(username, email) {
        return Connect.isUserNameOrEmailAlreadyExists(username, email)
    }

    createUser(username, email, password) {
        Connect.signUp(username, email, password)
    }

    signIn(email, password) {
        if (!this.session.isOnline) {
            return "connect to the internet"
        }
        let sessionData = Connect.SignIn(email, password)
        if (sessionData.token === "") return "Email or password is incorrect."

        this.session = new SessionObject({
            token: sessionData.token,
            id: sessionData.user.id,
            cashedUser: new UserObject(sessionData.user),
            cashedDecks: sessionData.decks.map(deckJson => new DeckObject(deckJson))
        })
        this.session.isOnline = true
        this.session.isUpToDate = true
        saveToLS("session", this.session);
        return "";
    }


    newDeckNameIsPossible(userId, possibleDeckname) {
        let expression = /^[a-zA-Z0-9]*$/;
        if (!expression.test(String(possibleDeckname).toLowerCase())) {
            return "only letters and numbers available."
        }
        let decks = this.session.cashedDecks

        if (decks.filter(deck => {
            return deck.ownerId === userId && deck.name === possibleDeckname
        }).length !== 0) {
            return "this deckname u already use."
        }
        return ""
    }

    createNewDeckWithSettings(settings) {
        let deck = new DeckObject({
            ownerId: this.session.id,
            name: settings.name,
            description: settings.description,
            privacy: settings.privacy,
            members: settings.members
        })
        this.session.cashedDecks.push(deck)
        this.session.cashedUser.ownerDecksUuid.push(deck.uuid)
        this.session.cashedUser.decksMetadata.push(new DeckMetadataObject({
            deckUuid: deck.uuid,
            cols: settings.cols,
            rowHeight: settings.height,
        }))

        this.session.updateDecks.push(deck.uuid)
        if (!this.session.isOnline) {
            this.session.isUpToDate = false
        } else {
            Connect.updateDecksFromSession(this.session)
            Connect.updateUser(this.session.cashedUser)
        }
        saveToLS("session", this.session)
    }

    myUserFollowing(username, startFollow) {
        if (this.session.isOnline)
            throw "u cant set follow when session is offline"

        if (startFollow) {
            this.session.cashedUser.following.push(username)
        } else {
            const index = this.session.cashedUser.following.indexOf(username);
            if (index > -1) {
                this.session.cashedUser.following.splice(index, 1);
            }
        }
        saveToLS("session", this.session)
        Connect.setFollowing(this.session.cashedUser.username, username, startFollow)
    }


    saveDeck(newDeck) {
        let newDecks = this.session.cashedDecks
        let deckToChange = newDecks.filter(deck => deck.uuid === newDeck.uuid)[0]
        newDecks[newDecks.indexOf(deckToChange)] = newDeck

        this.session.updateDecks.push(newDeck.uuid)
        if (!this.session.isOnline) {
            this.session.isUpToDate = false
        } else {
            Connect.updateDecksFromSession(this.session)
        }
        saveToLS("session", this.session)
    }

    SignOut(force) {
        if (!force && !this.session.isOnline && !this.session.isUpToDate) {
            return false // sorry if you SIGN OUT changes would been unsaved TODO
        }
        let wasOnline = this.session.isOnline
        this.session = new SessionObject()
        this.session.isOnline = wasOnline
        saveToLS("session", this.session);

        return true
    }

    searchUser(inputUsername) {
        if (!this.session.isOnline) return []
        if (inputUsername === "") return []
        return Connect.searchUser(inputUsername)
    }

    sessionOnlineCheck() {
        let online = this.session.updateOnline()
        if (this.session.isActive && online && !this.session.isUpToDate) {
            Connect.updateUser(this.session.cashedUser)
            Connect.updateDecksFromSession(this.session)
            this.session.isUpToDate = true
            saveToLS("session", this.session)
        }
        return online
    }


    getUserDecks(username) {
        if (username === this.session.cashedUser.username)
            return this.session.cashedDecks
        if (!this.session.isOnline)
            return []
        let decks = Connect.getUserDecks(username)
        return decks
    }

    deleteDeck(id) {
        this.session.cashedDecks = this.session.cashedDecks.filter(deck => deck.uuid !== id)
        this.session.cashedUser.ownerDecksUuid = this.session.cashedUser.ownerDecksUuid.filter(deckId => deckId !== id)

        this.session.updateDecks.push(id)
        if (this.session.isOnline) {
            Connect.updateDecksFromSession(this.session)
            Connect.updateUser(this.session.cashedUser)
        } else {
            this.session.isUpToDate = false
        }

        saveToLS("session", this.session)
    }


    getDeckMetadata(uuid) {
        let metadata = this.session.cashedUser.decksMetadata.filter(metadata => metadata.deckUuid === uuid)[0]

        if (!metadata) {
            metadata = new DeckMetadataObject({deckUuid: uuid})
            this.session.cashedUser.decksMetadata.push(metadata)
            if (this.session.isOnline) {
                Connect.updateUser(this.session.cashedUser)
            } else {
                this.session.isUpToDate = false
            }
            saveToLS("session", this.session)

        }
        return metadata
    }

    saveMetadata(newMetadata) {
         let allMetadata = this.session.cashedUser.decksMetadata
        let metadataToChange = allMetadata.filter(metadata => metadata.deckUuid === newMetadata.deckUuid)[0]
        allMetadata[allMetadata.indexOf(metadataToChange)] = newMetadata

        if (!this.session.isOnline) {
            this.session.isUpToDate = false
        } else {
            Connect.updateUser(this.session.cashedUser)
        }
        saveToLS("session", this.session)

    }
}

let Controller = new ControllerObject();
export default Controller;
