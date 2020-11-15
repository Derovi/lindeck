const originalLayout = getFromLS("layout") || [];
const originalCards = getFromLS("cards") || [];
const originalDeckSettings = getFromLS("deck") || {rowHeight: 100, cols: 6};

function getFromLS(key) {
    // Rewrite to Get From GS (global storage)
    return JSON.parse(global.localStorage.getItem(key));
}

function saveToLS(key, value) {
    // Rewrite to Push From GS (global storage)

    if (global.localStorage) {
        global.localStorage.setItem(key, JSON.stringify(value));
    }
}

export default class GlobalStorage {
    getUser() {
        //return getFromLS("user") ||
        return {
            username: "watislaf",
            discribe: " Я влад коз",
            isLogged: false,
            image: "https://images.unsplash.com/photo-1602904020862-eaed0610e55e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max"
        };
    }

    getLayout() {
        return JSON.parse(JSON.stringify(getFromLS("layout"))) || [];
    }

    getCards() {
        return JSON.parse(JSON.stringify(getFromLS("cards"))) || [];
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