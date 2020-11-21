import UserObject from "./UserObject";
import SessionObject from "./SessionObject";
import DeckObject from "./DeckObject";
import CardObject from "./CardObject";
import LayoutObject from "./LayoutObject";

// Settings
let cleanBaseOnPageReload = false //  important !! u can change it, so after reload all save


function getFromLS(key) {
    // Rewrite to Get From GS (global storage)
    return JSON.parse(global.localStorage.getItem(key));
}

function saveToLS(key, value) {
    // Rewrite to Push To GS (global storage)
    if (global.localStorage) {
        global.localStorage.setItem(key, JSON.stringify(value));
    }
}

class GlobalStorage {
    session = null

    constructor() {
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
                "watislaf", "name1", "description", 100, 2, 0)
            ])
        }

        if (!getFromLS("session")) {
            saveToLS("session", new SessionObject())
        }

        this.session = new SessionObject(...Object.values(getFromLS("session")))
    }

    getDeckFromUsernameDeckname(username, deckname) {
        let allDecks = getFromLS("decks")
        console.log(allDecks)
        let jsonDeck = allDecks.filter(deck => deck.owner === username && deck.name === deckname)[0]
        return new DeckObject(...Object.values(jsonDeck))
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
        if (userFound) {
            this.session = new SessionObject(userFound.username, "42")
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

    createNewDeckWithSettings(name, description, cols, height) {
        let decks = getFromLS("decks")
        let ids = decks.map(deck => deck.uniqueId)
        let newUniq = 1 + Math.max(...ids)
        let deck = new DeckObject(null, null, this.session.username, name, description, height, cols, newUniq)
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
}

let GS = new GlobalStorage();
export default GS;
