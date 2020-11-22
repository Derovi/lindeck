import UserObject from "./UserObject";
import SessionObject from "./SessionObject";
import DeckObject from "./DeckObject";
import CardObject from "./CardObject";
import LayoutObject from "./LayoutObject";

// Settings
let cleanBaseOnPageReload = false //  important !! u can change it, so after reload all save


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
                new UserObject(
                    "watislaf",
                    "vladkozulin@mail.ru",
                    "1234",
                    " Я влад коз",
                    "https://images.unsplash.com/photo-1602904020862-eaed0610e55e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max",
                    ["burik", "derovi"],
                    [0]
                )
                ,
                new UserObject(
                    "derovi",
                    "iwillpush@mail.ru",
                    "4321",
                    " Я запушу",
                    "https://picsum.photos/200/300",
                    ["burik"],
                    [])
                ,
                new UserObject(
                    "burik",
                    "bura@mail.ru",
                    "burik",
                    "где",
                    "https://picsum.photos/200",
                    [],
                    [])
            ])
        }

        if (!getFromLS("decks")) {
            saveToLS("decks", [new DeckObject(
                "watislaf", "name1", [new CardObject()], [new LayoutObject()],
                "description", 100, 2, 0,
                "global", [])
            ])
        }

        // SERVER INITIALIZE PART

        if (!getFromLS("session")) {
            saveToLS("session", new SessionObject())

        }
        this.session = new SessionObject(...Object.values(getFromLS("session")))
        this.sessionOnlineCheck()
    }

    getDeckFromUsernameDeckname(username, deckname) {
        let jsonDeck = null
        if (this.sessionOnlineCheck()) {
            // SERVER GET DATA PART ->
            let allDecks = getFromLS("decks")
            jsonDeck = allDecks.filter(deck => deck.owner === username && deck.name === deckname)[0]
            // SERVER GET DATA PART
        } else {
            let allDecks = this.session.myDecks
            jsonDeck = allDecks.filter(deck => deck.owner === username && deck.name === deckname)[0]
        }
        if (!jsonDeck) {
            return null
        }
        let deckObject = new DeckObject(...Object.values(jsonDeck))
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
            let allDecks = this.session.myDecks
            jsonDeck = allDecks.filter(deck => deck.uniqueId === deckId)[0]
        }
        jsonDeck = jsonDeck || {}
        return new DeckObject(...Object.values(jsonDeck))
    }


    getUser(UserName) {
        let jsonUser = null
        if (this.session.isOnline) {
            // SERVER GET DATA PART ->
            let allUsers = getFromLS("users")
            jsonUser = allUsers.filter(user => user.username === UserName)[0]
            // SERVER GET DATA PART
        } else {
            let allUsers = [this.session.myUser]
            jsonUser = allUsers.filter(user => user.username === UserName)[0]
        }
        if (!jsonUser)
            return null
        return new UserObject(...Object.values(jsonUser))
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
        let allMyDecks = getFromLS("decks").filter(decks => decks.owner === userFound.username)
        if (userFound) {
            this.session = new SessionObject(userFound.username, "42", userFound, allMyDecks)
            this.session.isOnline = true
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
        let decks = this.session.myDecks

        if (decks.filter(deck => {
            return deck.owner === username && deck.name === possibleDeckname
        }).length !== 0) {
            return "this deckname u already use."
        }
        return ""
    }

    createNewDeckWithSettings(name, description, cols, height, privacy) {
        let decks = this.session.myDecks
        let ids = decks.map(deck => deck.uniqueId)
        let newUniq = 1 + Math.max(...ids)
        let deck = new DeckObject(
            this.session.username, name, null, null, description, height,
            cols, newUniq, privacy, null)
        decks.push(deck)
        this.session.myDecks = decks // Save localy
        this.session.myUser.deckListId.push(deck.uniqueId)
        if (!this.session.isOnline) {
            this.session.isUpToDate = false
        } else {
            // save globaly
            this.updateDecksFromSession()
            this.updateUser(this.session.myUser)
        }
        saveToLS("session", this.session)

    }

    myUserFollowing(username, startFollow) {
        if (startFollow) {
            this.session.myUser.following.push(username)
        } else {
            const index = this.session.myUser.following.indexOf(username);
            if (index > -1) {
                this.session.myUser.following.splice(index, 1);
            }
        }
        saveToLS("session", this.session)
        console.log(this.session)
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
        return this.session.myUser
    }

    saveDeck(newDeck) {
        let newDecks = this.session.myDecks
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
        if (!this.session.isOnline) {
            return []
        }
        if (inputUsername === "") return []
        let users = getFromLS("users")
        return users.filter(user => user.username.toLowerCase().includes(inputUsername.toLowerCase()));
    }

    sessionOnlineCheck() {
        let online = this.session.updateOnline()
        if (this.session.isActive && online && !this.session.isUpToDate) {
            this.updateUser(this.session.myUser)
            this.updateDecksFromSession()
            this.session.isUpToDate = true
            saveToLS("session", this.session)
            console.log("SAVE")
        }
        return online
    }

    updateUser(userUpdate) {
        if (!this.session.isOnline) {
            console.log("HOW&???")
        }
        // SERVER UPDATE ->
        let users = getFromLS("users")
        let newUser = users.filter(user => user.username === user.username)[0]
        Object.assign(newUser, userUpdate);   // copy
        saveToLS("users", users)
        // SERVER UPDATE
    }

    updateDecksFromSession() {

        if (!this.session.isOnline) {
            console.log("HOW&???")
        }
        // SERVER UPDATE ->
        let decks = getFromLS("decks")
        console.log(decks)
        let clearDecks = decks.filter(deck => deck.owner !== this.session.username) // remove all my decks
        clearDecks.push(...this.session.myDecks) // push updated decks and maybe new decks
        saveToLS("decks", clearDecks)
        console.log(clearDecks)
        // SERVER UPDATE
    }
}

let
    GS = new GlobalStorage();
export default GS;
