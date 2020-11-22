import UserObject from "./UserObject";
import SessionObject from "./SessionObject";
import DeckObject from "./DeckObject";
import CardObject from "./CardObject";
import LayoutObject from "./LayoutObject";

// Settings
let cleanBaseOnPageReload = true //  important !! u can change it to true, so after reload all save


function getFromLS(key) {
    return JSON.parse(global.localStorage.getItem(key));
}

function saveToLS(key, value) {
    if (global.localStorage) {
        global.localStorage.setItem(key, JSON.stringify(value));
    }
}

class GlobalStorage {
    session = new SessionObject()

    constructor() {
        // SERVER DATABASE ->
        if (cleanBaseOnPageReload)
            global.localStorage.clear();

        if (!getFromLS("users")) {
            saveToLS("users", [
                new UserObject({
                        username: "watislaf",
                        email: "vladkozulin@mail.ru",
                        id: 0,
                        password: "1234",
                        describe: " Я влад коз",
                        image: "https://images.unsplash.com/photo-1602904020862-eaed0610e55e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max",
                        following: ["burik", "derovi"],
                        ownerDecksUuid: ["4321"],
                    }
                )
                ,
                new UserObject({
                    username: "derovi",
                    email: "iwillpush@mail.ru",
                    id: 1,
                    password: "4321",
                    describe: " Я запушу",
                    image: "https://picsum.photos/200/300",
                    following: ["burik"],
                    ownerDecksUuid: []
                })
                ,
                new UserObject({
                    username: "burik",
                    email: "bura@mail.ru",
                    id: 2,
                    password: "burik",
                    describe: "где",
                    image: "https://picsum.photos/200",
                    following: [],
                    ownerDecksUuid: []
                })
            ])
        }

        if (!getFromLS("decks")) {
            saveToLS("decks", [new DeckObject({
                ownerId: 0, name: "name1", cards: [new CardObject()], layout: [new LayoutObject()],
                description: "description", rowHeight: 100, cols: 6, uuid: "4321",
                privacy: "global", allowedUser: []
            })
            ])
        }

        // SERVER INITIALIZE PART

        if (!getFromLS("session")) {
            saveToLS("session", new SessionObject())

        }
        this.session = new SessionObject(getFromLS("session"))
        this.sessionOnlineCheck()
    }

    getDeckFromUsernameDeckname(username, deckname) {
        let jsonDeck = null
        if (this.session.isOnline) {
            // SERVER GET DATA PART ->
            let allDecks = getFromLS("decks")
            let user = getFromLS("users").filter(user => user.username === username)[0]
            jsonDeck = allDecks.filter(deck => deck.ownerId === user.id && deck.name === deckname)[0]
            // SERVER GET DATA PART
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
        let jsonDeck = null
        if (this.session.isOnline) {
            // SERVER GET DATA PART ->
            let allDecks = getFromLS("decks")
            jsonDeck = allDecks.filter(deck => deck.uuid === uuid)[0]
            // SERVER GET DATA PART
        } else {
            let allDecks = this.session.cashedDecks
            jsonDeck = allDecks.filter(deck => deck.uuid === uuid)[0]
        }

        return new DeckObject(jsonDeck)
    }


    getUser(UserName) {
        let jsonUser = null
        if (this.session.isOnline) {
            // SERVER GET DATA PART ->
            let allUsers = getFromLS("users")
            jsonUser = allUsers.filter(user => user.username === UserName)[0]
            // SERVER GET DATA PART
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
            // SERVER GET DATA PART ->
            let allUsers = getFromLS("users")
            jsonUser = allUsers.filter(user => user.id === id)[0]
            // SERVER GET DATA PART
        } else {
            let allUsers = [this.session.cashedUser]
            jsonUser = allUsers.filter(user => user.id === id)[0]
        }
        if (!jsonUser)
            return null
        return new UserObject(jsonUser)
    }

    registerNameIsPossible(name) {
        if (name.length < 3) {
            return "name is too short"
        }

        if (!this.session.isOnline) {
            return "connect to the internet"
        }

        // SERVER PART CHECK
        let users = getFromLS("users").filter(
            user => user.username === name
        )
        if (users.length !== 0) {
            return "Username is existing."
        }
        // SERVER PART CHECK
        return ""
    }

    registerEmailIsPossible(mail) {
        let isValid = mail.match(".+@.+\\..+")
        if (!isValid) {
            return "Email is invalid"
        }

        if (!this.session.isOnline) {
            return "connect to the internet"
        }

        //SERVER PART CHECK ->
        let users = getFromLS("users").filter(
            user => user.email === mail
        )
        if (users.length !== 0) {
            return "Email is existing."
        }
        //SERVER PART CHECK
        return ""
    }

    createUser(username, email, password) {
        // SEERVER PART DATA ADD ->
        let users = getFromLS("users")
        let id = (Math.max(...users.map(user => user.id)) + 1) || 0

        users.push({
            id: id,
            username: username,
            email: email,
            password: password,
            describe: "I love lindeck.",
            image: "https://thumbs.dreamstime.com/z/no-image-available-icon-photo-camera-flat-vector-illustration-132483097.jpg",
            ownerDecksUuid: [],
            following: []
        })
        saveToLS("users", users)
        // SERVER PART
    }

    signIn(email, password) {
        if (!this.session.isOnline) {
            return "connect to the internet"
        }
        let userFound = getFromLS("users").filter(user => user.email === email && user.password === password)[0]
        if (userFound) {
            let allMyDecks = getFromLS("decks").filter(decks => decks.ownerId === userFound.id)
            // SERVER GET TOKEN ->
            let token = "42"
            // SERVER GET TOKEN
            this.session = new SessionObject({
                token: token,
                id: userFound.id,
                cashedUser: userFound,
                cashedDecks: allMyDecks
            })
            this.session.isOnline = true
            this.session.isUpToDate = true
            saveToLS("session", this.session);
            return "";
        }
        return "Email or password is incorrect."
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

    createNewDeckWithSettings(name, description, cols, height, privacy) {
        let decks = getFromLS("decks")

        let deck = new DeckObject({
            ownerId: this.session.id, name: name, description: description, rowHeight: height,
            cols: cols, privacy: privacy
        })
        decks.push(deck)
        this.session.cashedDecks = decks // Save localy
        this.session.cashedUser.ownerDecksUuid.push(deck.uuid)

        console.log(this.session)
        if (!this.session.isOnline) {
            this.session.isUpToDate = false
        } else {
            // save globaly
            this.updateDecksFromSession()
            this.updateUser(this.session.cashedUser)
        }
        console.log(this.session)

        saveToLS("session", this.session)

    }

    myUserFollowing(username, startFollow) {
        if (startFollow) {
            this.session.cashedUser.following.push(username)
        } else {
            const index = this.session.cashedUser.following.indexOf(username);
            if (index > -1) {
                this.session.cashedUser.following.splice(index, 1);
            }
        }
        saveToLS("session", this.session)
        if (!this.session.isOnline) {
            return false
        }
        // SERVER ADD START FOLLOW (TRUE FALSE) ->
        let myUsername = this.session.cashedUser.username
        let users = getFromLS("users")
        let user = users.filter(user => user.username === myUsername)[0]
        if (startFollow) {
            user.following.push(username)
        } else {
            const index = user.following.indexOf(username);
            if (index > -1) {
                user.following.splice(index, 1);
            }
        }
        saveToLS("users", users)
        // SERVER ADD FOLLOW
        return true
    }

    getSessionUser() {
        return this.session.cashedUser
    }

    saveDeck(newDeck) {
        let newDecks = this.session.cashedDecks
        let deckToChange = newDecks.filter(deck => deck.uuid === newDeck.uuid)[0]
        newDecks[newDecks.indexOf(deckToChange)] = newDeck
        this.session.isUpToDate = false

        if (!this.session.isOnline) {
            return
        }
        this.updateDecksFromSession()
        saveToLS("session", this.session)

    }

    SignOut(force) {
        if (!force && !this.session.isOnline && !this.session.isUpToDate) {
            return false // sorry if you SIGN UOUT changes would been unsaved TODO
        }
        let wasOnline = this.session.isOnline
        this.session = new SessionObject()
        this.session.isOnline = wasOnline
        saveToLS("session", this.session);

        return true
    }

    searchUsers(inputUsername) {
        if (!this.session.isOnline) return []
        if (inputUsername === "") return []

        let users = getFromLS("users")
        return users.filter(user => user.username.toLowerCase().includes(inputUsername.toLowerCase()));
    }

    sessionOnlineCheck() {
        let online = this.session.updateOnline()
        if (this.session.isActive && online && !this.session.isUpToDate) {
            this.updateUser(this.session.cashedUser)
            this.updateDecksFromSession()
            this.session.isUpToDate = true
            saveToLS("session", this.session)
        }
        return online
    }

    updateUser(userUpdate) {
        if (!this.session.isOnline) {
            console.log("How ??? Offline state Here cant be reached. Bad using")
        }
        // SERVER UPDATE ->
        let users = getFromLS("users")
        let newUser = users.filter(user => user.username === userUpdate.username)[0]
        Object.assign(newUser, userUpdate);   // copy
        saveToLS("users", users)
        // SERVER UPDATE
    }

    updateDecksFromSession() {
        if (!this.session.isOnline) {
            console.log("HOW??? Offline state Here cant be reached. Bad using")
        }
        // SERVER UPDATE ->
        let decks = getFromLS("decks")
        let clearDecks = decks.filter(deck => deck.ownerId !== this.session.id) // remove all my decks
        clearDecks.push(...this.session.cashedDecks) // push updated decks and maybe new decks or delete old
        saveToLS("decks", clearDecks)
        // SERVER UPDATE
    }

    getUsersDecks(username) {
        if (username === GS.session.cashedUser.username)
            return GS.session.cashedDecks
        if (!this.session.isOnline)
            return []
        // SERVER PART FIND ->
        let user = getFromLS("users").filter(user => user.username === username)[0]
        if (!user)
            return []
        let decks = getFromLS("decks").filter(deck => deck.ownerId === user.id)
        // SERVER PART FIND

        return decks
    }

    deleteDeck(id) {
        console.log(id)
        this.session.cashedDecks = this.session.cashedDecks.filter(deck => deck.uuid !== id)
        this.session.cashedUser.ownerDecksUuid = this.session.cashedUser.ownerDecksUuid.filter(deckId => deckId !== id)

        if (this.session.isOnline) {
            this.updateDecksFromSession()
            this.updateUser(this.session.cashedUser)
        } else {
            this.session.isUpToDate = false
        }
        console.log(this.session)
        saveToLS("session", this.session)
    }


}

let GS = new GlobalStorage();
export default GS;
