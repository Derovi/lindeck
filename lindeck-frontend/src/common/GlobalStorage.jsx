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

export default class GlobalStorage {
    constructor() {
        if (getFromLS("users")) {
            saveToLS("users", [
                {
                    username: "watislaf",
                    email: "vladkozulin@mail.ru",
                    password: "1234",
                    describe: " Я влад коз",
                    image: "https://images.unsplash.com/photo-1602904020862-eaed0610e55e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max",
                    deckListId: [1],
                    following: ["burik", "derovi"]
                },
                {
                    username: "derovi",
                    email: "iwillpush@mail.ru",
                    password: "4321",
                    describe: " Я запушу",
                    image: "https://picsum.photos/200/300",
                    deckListId: [],
                    following: ["burik"]
                },
                {
                    username: "burik",
                    email: "bura@mail.ru",
                    password: "burik",
                    describe: "где",
                    image: "https://picsum.photos/200",
                    deckListId: [],
                    following: []
                }
            ])
        }

        if (getFromLS("decks")) {
            saveToLS("decks", [{// TODO permission, owner and description posibility and Views all time
                layout: [{i: "0", x: 1, y: 1, w: 2, h: 2}],
                cards: [{
                    type: "answer", textfield: "qwe", secondfield: "", answer: "",
                    answered: 0, isFlipped: false, id: "0"
                }],
                deckSettings: {
                    owner: "watislaf", uniqueId: 1, cols: 2, rowHeight: 100, name: "name1", description: "description"
                }
            }])
        }
    }

    getMyName() {
        return getFromLS("myUserName");
    }

    getDeckIdFromUsernameDeckname(username, deckname) {
        let allDecks = getFromLS("decks")
        return allDecks.filter(deck => deck.deckSettings.owner === username && deck.deckSettings.name === deckname)[0]
    }

    getDeckById(deckId) {
        let allDecks = getFromLS("decks")
        return allDecks.filter(deck => deck.deckSettings.uniqueId === deckId)[0]
    }


    getUser(UserName) {
        let allUsers = getFromLS("users")
        return allUsers.filter(user => user.username === UserName)[0]
    }

    getLayout() {
        return JSON.parse(JSON.stringify(getFromLS("layout"))) || [{
            0: {
                h: 1, i: "0",
                moved: false, static: false,
                w: 2, x: 2, y: 0
            }
        }];
    }

    getCards() {
        return JSON.parse(JSON.stringify(getFromLS("cards"))) || [{
            type: "answer", textfield: "", secondfield: "", answer: "", verdict: 0, isFlipped: false, id: "0"
        }];
    }

    GetSettings() {
        return JSON.parse(JSON.stringify(getFromLS("settings"))) || {rowHeight: 100, cols: 6};
    }


    saveUser(user) {
        saveToLS("user", user)
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
        const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

        let isValid = expression.test(String(mail).toLowerCase())
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

    registerPasswordIsPossible(password) {
        if (password.length < 6) {
            return "password is too short"
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
            saveToLS("myUserName", userFound.username);
            return true;
        }
        return false
    }

    saveCards(newCardArray) {
        saveToLS("cards", newCardArray)
    }

    saveCardsToDeckId(uniqueId, newCardArray) {
        let allDecks = getFromLS("decks")
        let decks = allDecks.filter(deck => deck.deckSettings.uniqueId === uniqueId)[0]
        decks.cards = newCardArray
        saveToLS("decks", allDecks)
    }

    saveLayoutToDeckId(uniqueId, newLayout) {
        let allDecks = getFromLS("decks")
        let decks = allDecks.filter(deck => deck.deckSettings.uniqueId === uniqueId)[0]
        decks.layout = newLayout
        saveToLS("decks", allDecks)
    }

    saveSettingsToDeckId(uniqueId, newSettings) {
        let allDecks = getFromLS("decks")
        let decks = allDecks.filter(deck => deck.deckSettings.uniqueId === uniqueId)[0]
        decks.settings = newSettings;
        saveToLS("decks", allDecks)
    }

    newDeckNameIsPossible(username, possibleDeckname) {
        let expression = /^[a-zA-Z0-9]*$/;
        if (!expression.test(String(possibleDeckname).toLowerCase())) {
            return "only letters and numbers available."
        }
        let decks = getFromLS("decks")

        if (decks.filter(deck => {
            return deck.deckSettings.owner === username && deck.deckSettings.name === possibleDeckname
        }).length !== 0) {
            return "this deckname u already use."
        }
        return ""
    }

    createNewDeckWithSettings(settings) {
        let decks = getFromLS("decks")
        let ids = decks.map(deck => deck.deckSettings.uniqueId)
        settings.uniqueId = 1 + Math.max(...ids)
        console.log(settings.uniqueId)
        decks.push(
            {
                layout: [{i: "0", x: 1, y: 1, w: 2, h: 2}],
                cards: [{
                    type: "default", textfield: "my first card", secondfield: "", answer: "",
                    answered: 0, isFlipped: false, id: "0"
                }],
                deckSettings: settings
            })
        saveToLS("decks", decks)
        // give deck to user
        let users = getFromLS("users")
        let user = users.filter(user => user.username === settings.owner)[0]
        user.deckListId.push(settings.uniqueId)
        saveToLS("users", users)
    }
}