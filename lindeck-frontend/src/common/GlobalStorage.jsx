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
    getUser() {
        //return getFromLS("user") ||
        return {
            isLogged: false,
            username: "watislaf",
            describe: " Я влад коз",
            image: "https://images.unsplash.com/photo-1602904020862-eaed0610e55e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max",
            deckList: [
                {cols: 42, rowHeight: 123, name: "name1", description: "lol"},
                {cols: 12, rowHeight: 123, name: "name1", description: "kek"},
                {cols: 4, rowHeight: 241, name: "name1", description: "azaza"}
            ],

            following: [
                {
                    username: "derovi",
                    describe: " Я запушу",
                    image: "https://picsum.photos/200/300",
                    deckList: [
                        {cols: 42, rowHeight: 123, name: "name1", description: "lol"},
                    ],
                },
                {
                    username: "burik",
                    describe: "где",
                    image: "https://picsum.photos/200",
                    deckList: [],
                }
            ]
        };
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
}