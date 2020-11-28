import DeckMetadataObject from "./DeckMetadataObject";

export default class UserObject {
    username = ""
    id = 0
    email = "null"
    password = "null"
    describe = "null"
    image = "https=//images.unsplash.com/photo-1602904020862-eaed0610e55e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max"
    following = []

    ownerDecksUuid = []
    decksMetadata = [] // new DeckMetadataObject()

    constructor(props = {}) {
        this.username = props.username || this.username
        this.email = props.email || this.email
        this.password = props.password || this.password
        this.describe = props.describe || this.describe
        this.image = props.image || this.image
        this.ownerDecksUuid = props.ownerDecksUuid || this.ownerDecksUuid
        this.following = props.following || this.following
        this.id = props.id || this.id

        this.decksMetadata = props.decksMetadata || this.decksMetadata
        this.decksMetadata = this.decksMetadata.map(
            jsonDeckMetadata => new DeckMetadataObject(jsonDeckMetadata))
    }

    isValid() {
        return this.username !== ""
    }
}