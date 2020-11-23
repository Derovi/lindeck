import UserObject from "./UserObject";
import DeckObject from "./DeckObject";
import CardObject from "./CardObject";
import LayoutObject from "./LayoutObject";


function getFromLS(key) {
    return JSON.parse(global.localStorage.getItem(key));
}

function saveToLS(key, value) {
    if (global.localStorage) {
        global.localStorage.setItem(key, JSON.stringify(value));
    }
}

// Settings
let cleanBaseOnPageReload = true //  important !! u can change it to true, so after reload all save


class ServerConnector {
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
    }

    updateUser(userUpdate) {
        // SERVER UPDATE User->
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

    getUserDecks(username) {
        // SERVER PART FIND ->
        let user = getFromLS("users").filter(user => user.username === username)[0]
        if (!user)
            return []
        let decks = getFromLS("decks").filter(deck => deck.ownerId === user.id)
        // SERVER PART FIND
        return decks
    }

    searchUser(notFullUsername) {
        // SERVER PART ->
        let users = getFromLS("users")
        let user = users.filter(user => user.username.toLowerCase().includes(notFullUsername.toLowerCase()));
        // SERVER PART
        return user
    }


    setFollowing(username, startFollow) {
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
    }

    SignIn(email, password) {
        let sessionData = {token: "", user: new UserObject(), decks: [new DeckObject()]}
        // SERVER PART CHECK SIGN IN
        sessionData.user = getFromLS("users").filter(user => user.email === email && user.password === password)[0]
        if (sessionData.user) {
            sessionData.decks = getFromLS("decks").filter(decks => decks.ownerId === sessionData.user.id)
            sessionData.token = "42"
        }
        //
        // IF TOKEN === "" , means SING IN ERROR
        return sessionData
    }

    signUp(username, email, password) {

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

        return ""
    }

    isUserNameOrEmailAlreadyExists(username, email) {
        let errorUserOrEmail = {email: "", username: ""}
        // SERVER PART CHECK
        let users = getFromLS("users").filter(
            user => user.username === username
        )
        if (users.length !== 0) {
            errorUserOrEmail.username = "Username is existing."
        }
        users = getFromLS("users").filter(
            user => user.email === email
        )
        if (users.length !== 0) {
            errorUserOrEmail.email = "email already exists"
        }
        //SERVER PART CHECK
        return errorUserOrEmail
    }

    getUserById(id) {
        // SERVER GET DATA PART ->
        let allUsers = getFromLS("users")
        let jsonUser = allUsers.filter(user => user.id === id)[0]
        // SERVER GET DATA PART
        return jsonUser
    }

    getUser(UserName) {
        // SERVER GET DATA PART ->
        let allUsers = getFromLS("users")
        let jsonUser = allUsers.filter(user => user.username === UserName)[0]
        //
        return jsonUser
    }

    getDeckByUuid(uuid) {
        // SERVER GET DATA PART ->
        let allDecks = getFromLS("decks")
        let jsonDeck = allDecks.filter(deck => deck.uuid === uuid)[0]
        // SERVER GET DATA PART
        return jsonDeck
    }

    getDeckNyUsernameDeckname(username, deckname) {
        // SERVER GET DATA PART ->
        let allDecks = getFromLS("decks")
        let user = getFromLS("users").filter(user => user.username === username)[0]
        let jsonDeck = allDecks.filter(deck => deck.ownerId === user.id && deck.name === deckname)[0]
        // SERVER GET DATA PART
        return jsonDeck
    }
}


let Connect = new ServerConnector();
export default Connect;
