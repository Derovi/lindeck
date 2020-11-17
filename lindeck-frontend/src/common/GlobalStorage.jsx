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
    myName = "";

    getMyName() {
        return this.myName
    }

    getUser(UserName) {
        let users = getFromLS("users") || [
            {
                username: "watislaf",
                email: "vladkozulin@mail.ru",
                describe: " Я влад коз",
                image: "https://images.unsplash.com/photo-1602904020862-eaed0610e55e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max",
                deckList: [
                    {cols: 42, rowHeight: 123, name: "name1", description: "lol"},
                    {cols: 12, rowHeight: 123, name: "name1", description: "kek"},
                    {cols: 4, rowHeight: 241, name: "name1", description: "azaza"}
                ],
                following: ["burik", "derovi"]
            },
            {
                username: "derovi",
                email: "iwillpush@mail.ru",
                describe: " Я запушу",
                image: "https://picsum.photos/200/300",
                deckList: [
                    {cols: 42, rowHeight: 123, name: "name1", description: "lol"},
                ],
                following: ["burik"]
            },
            {
                username: "burik",
                email: "bura@mail.ru",
                password: "burik",
                describe: "где",
                image: "https://picsum.photos/200",
                deckList: [],
                following: []
            }
        ]
        return users.filter(user => user.username === UserName)[0]
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

    saveCards(newCardArray) {
        saveToLS("cards", newCardArray)
    }

    saveUser(user) {
        saveToLS("user", user)
    }

    saveLayout(layout) {
        saveToLS("layout", layout)
    }

    saveSettings(param) {
        saveToLS("settings", param)
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
        saveToLS("users",users)
    }
}