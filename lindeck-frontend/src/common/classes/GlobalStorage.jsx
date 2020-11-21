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
                [new CardObject()], [new LayoutObject()],
                "watislaf", "name1", "description", 100, 2, 0,
                "global", [])
            ])
        }

        // SERVER INITIALIZE PART

        if (!getFromLS("session")) {
            saveToLS("session", new SessionObject())
        }
        this.session = new SessionObject(...Object.values(getFromLS("session")))
    }

    getDeckFromUsernameDeckname(username, deckname) {
        let jsonDeck = null
        if (this.sessionOnlineCheck()) {

            // SERVER GET DATA PART ->
            let allDecks = getFromLS("decks")
            jsonDeck = allDecks.filter(deck => deck.owner === username && deck.name === deckname)[0]
            // SERVER GET DATA PART
        } else {

        }
        let deckObject = new DeckObject(...Object.values(jsonDeck))
        if (!deckObject.canSee(this.session.username)) {
            return null
        }
        return deckObject
    }

    getDeckById(deckId) {
        let allDecks = getFromLS("decks")
        let jsonDeck = allDecks.filter(deck => deck.uniqueId === deckId)[0]
        return new DeckObject(...Object.values(jsonDeck))
    }

    getSession() {
        return this.session
    }

    getUser(UserName) {
        let allUsers = getFromLS("users")
        let jsonUser = allUsers.filter(user => user.username === UserName)[0]
        if (!jsonUser)
            return null
        return new UserObject(...Object.values(jsonUser))
    }

    registerNameIsPossible(name) {
        if (name.length < 3) {
            return "name is too short"
        }
        let users = getFromLS("users").filter(
            user => user.username === name
        )

        if (users.length !== 0) {
            return "Username is existing."
        }

        return ""
    }

    registerEmailIsPossible(mail) {

        let isValid = mail.match(".+@.+\\..+")
        if (!isValid) {
            return "Email is invalid"
        }

        let users = getFromLS("users").filter(
            user => user.email === mail
        )

        if (users.length !== 0) {
            return "Email is existing."
        }

        return ""
    }

    createUser(username, email, password) {
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
    }

    signIn(email, password) {
        let userFound = getFromLS("users").filter(user => user.email === email && user.password === password)[0]
        let allMyDecks = getFromLS("decks").filter(decks => decks.owner === userFound)
        if (userFound) {
            this.session = new SessionObject(userFound.username, "42", userFound, allMyDecks)
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
        let decks = getFromLS("decks")

        if (decks.filter(deck => {
            return deck.owner === username && deck.name === possibleDeckname
        }).length !== 0) {
            return "this deckname u already use."
        }
        return ""
    }

    createNewDeckWithSettings(name, description, cols, height, privacy) {
        let decks = getFromLS("decks")
        let ids = decks.map(deck => deck.uniqueId)
        let newUniq = 1 + Math.max(...ids)
        let deck = new DeckObject(
            null, null, this.session.username, name, description, height,
            cols, newUniq, privacy, null)
        decks.push(deck)
        saveToLS("decks", decks)
        // give deck to user
        let users = getFromLS("users")
        let user = users.filter(user => user.username === deck.owner)[0]
        user.deckListId.push(deck.uniqueId)
        saveToLS("users", users)
    }

    myUserFollowing(username, startFollow) {
        let myUsername = this.getMyName()
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
    }

    getUserFollowing(username) {
        let user = this.getUser(username)
        return user.following
    }

    getSessionUser() {
        return this.getUser(this.getSession().username)
    }

    saveDeck(newDeck) {
        let newDecks = getFromLS("decks")
        let deckToChange = newDecks.filter(deck => deck.uniqueId === newDeck.uniqueId)[0]
        newDecks[newDecks.indexOf(deckToChange)] = newDeck // filter return copy. Why ???
        saveToLS("decks", newDecks)
    }

    SignOut() {
        this.session = new SessionObject("", "")
        saveToLS("session", this.session);
    }

    searchUsers(inputUsername) {
        if (inputUsername === "") return []
        let users = getFromLS("users")
        return users.filter(user => user.username.toLowerCase().includes(inputUsername.toLowerCase()));
    }

    sessionOnlineCheck() {
        let online = this.session.updateOnline()
        if (online && !this.session.isUpToDate) {
            this.updateUser(this.session.myUser)
            this.updateDecksFromSession(this.session.myDecks)
            this.session.isUpToDate = true
        }
    }

    updateUser(userUpdate) {
        let users = getFromLS("users")
        let newUser = users.filter(user => user.username === user.username)[0]
        Object.assign(newUser, userUpdate);   // copy
        saveToLS("users", users)
    }

    updateDecksFromSession(decksUpdate) {
        let decks = getFromLS("decks")
        let clearDecks = decks.map(deck => deck.owner !== this.session.username) // remove all my decks
        clearDecks.push(decksUpdate) // push updated decks and maybe new decks
        saveToLS("decks", clearDecks)
    }
}

let GS = new GlobalStorage();
export default GS;
