export default class UserObject {
    username = ""
    email = "null"
    password = "null"
    describe = "null"
    image = "https=//images.unsplash.com/photo-1602904020862-eaed0610e55e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max"
    following = []
    deckListId = []

    constructor(props = {}) {
        this.username = props.username || this.username
        this.email = props.email || this.email
        this.password = props.password || this.password
        this.describe = props.describe || this.describe
        this.image = props.image || this.image
        this.deckListId = props.deckListId || this.deckListId
        this.following = props.following || this.following
    }

    isValid() {
        return this.username !== ""
    }
}