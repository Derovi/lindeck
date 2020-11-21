export default class UserObject {
    username = ""
    email = "null"
    password = "null"
    describe = "null"
    image = "https=//images.unsplash.com/photo-1602904020862-eaed0610e55e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max"
    following = []
    deckListId = []

    constructor(username, email, password, describe, image, following, deckListId) {
        this.username = username || this.username
        this.email = email || this.email
        this.password = password || this.password
        this.describe = describe || this.describe
        this.image = image || this.image
        this.deckListId = deckListId || this.deckListId
        this.following = following || this.following
    }

    isValid() {
        return this.username !== ""
    }
}