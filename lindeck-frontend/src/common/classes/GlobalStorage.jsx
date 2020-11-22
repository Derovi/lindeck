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
                        password: "1234",
                        describe: " Я влад коз",
                        image: "https://images.unsplash.com/photo-1602904020862-eaed0610e55e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max",
                        following: ["burik", "derovi"],
                        deckListId: [0]
                    }
                )
                ,
                new UserObject({
                    username: "derovi",
                    email: "iwillpush@mail.ru",
                    password: "4321",
                    describe: " Я запушу",
                    image: "https://picsum.photos/200/300",
                    following: ["burik"],
                    deckListId: []
                })
                ,
                new UserObject({
                    username: "burik",
                    email: "bura@mail.ru",
                    password: "burik",
                    describe: "где",
                    image: "https://picsum.photos/200",
                    following: [],
                    deckListId: []
                })
            ])
        }

        if (!getFromLS("decks")) {
            saveToLS("decks", [new DeckObject({
                owner: "watislaf", name: "name1", cards: [new CardObject()], layout: [new LayoutObject()],
                description: "description", rowHeight: 100, cols: 6, uniqueId: 0,
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
            jsonDeck = allDecks.filter(deck => deck.owner === username && deck.name === deckname)[0]
            // SERVER GET DATA PART
        } else {
            let allDecks = this.session.cashedDecks
            jsonDeck = allDecks.filter(deck => deck.owner === username && deck.name === deckname)[0]
        }
        let deckObject = new DeckObject(jsonDeck)
        if (!deckObject.canSee(this.session.username)) {
            return null
        }
        return deckObject
    }

    getDeckById(deckId) {
        let jsonDeck = null
        if (this.session.isOnline) {
            // SERVER GET DATA PART ->
            let allDecks = getFromLS("decks")
            jsonDeck = allDecks.filter(deck => deck.uniqueId === deckId)[0]
            // SERVER GET DATA PART
        } else {
            let allDecks = this.session.cashedDecks
            jsonDeck = allDecks.filter(deck => deck.uniqueId === deckId)[0]
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
        return new UserObject( jsonUser)
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
        users.push({
            username: username,
            email: email,
            password: password,
            describe: "I love lindeck.",
            image: "https://thumbs.dreamstime.com/z/no-image-available-icon-photo-camera-flat-vector-illustration-132483097.jpg",
            deckList: [],
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
            let allMyDecks = getFromLS("decks").filter(decks => decks.owner === userFound.username)
            // SERVER GET TOKEN
            this.session = new SessionObject({
                myUserName: userFound.username,
                myToken: "42",
                myUser: userFound,
                myDecks: allMyDecks
            })
            this.session.isOnline = true
            this.session.isUpToDate = true
            saveToLS("session", this.session);

            return "";
        }
        return "Email or password is incorrect."
    }


    newDeckNameIsPossible(username, possibleDeckname) {
        let expression = /^[a-zA-Z0-9]*$/;
        if (!expression.test(String(possibleDeckname).toLowerCase())) {
            return "only letters and numbers available."
        }
        let decks = this.session.cashedDecks

        if (decks.filter(deck => {
            return deck.owner === username && deck.name === possibleDeckname
        }).length !== 0) {
            return "this deckname u already use."
        }
        return ""
    }

    createNewDeckWithSettings(name, description, cols, height, privacy) {
        let decks = this.session.cashedDecks
        let ids = decks.map(deck => deck.uniqueId)
        let newUniq = 1 + Math.max(...ids)
        let deck = new DeckObject({
            owner: this.session.username, name: name, description: description, rowHeight: height,
            cols: cols, uniqueId: newUniq, privacy: privacy
        })
        decks.push(deck)
        this.session.cashedDecks = decks // Save localy
        this.session.cashedUser.deckListId.push(deck.uniqueId)
        if (!this.session.isOnline) {
            this.session.isUpToDate = false
        } else {
            // save globaly
            this.updateDecksFromSession()
            this.updateUser(this.session.cashedUser)
        }
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
        let myUsername = this.session.username
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
        let deckToChange = newDecks.filter(deck => deck.uniqueId === newDeck.uniqueId)[0]
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
        let clearDecks = decks.filter(deck => deck.owner !== this.session.username) // remove all my decks
        clearDecks.push(...this.session.cashedDecks) // push updated decks and maybe new decks
        saveToLS("decks", clearDecks)
        // SERVER UPDATE
    }
}

let
    GS = new GlobalStorage();
export default GS;
