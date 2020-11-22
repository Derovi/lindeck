import CardObject from "./CardObject";
import LayoutObject from "./LayoutObject";

export default class DeckObject {
    owner = "admin" // owner of deck
    name = "" // mean null
    cards = [new CardObject()]
    layout = [new LayoutObject()]
    description = "test description"
    rowHeight = 100
    cols = 2
    uniqueId = ""
    privacy = "global" // private | global
    allowedUsers = [] // TODO write place where you can set it

    constructor(props = {}) {
        this.owner = props.owner || this.owner
        this.name = props.name || this.name
        this.cards = props.cards || this.cards
        this.layout = props.layout || this.layout
        this.description = props.description || this.description
        this.rowHeight = props.rowHeight || this.rowHeight
        this.cols = props.cols || this.cols
        this.uniqueId = props.owner + "|" + props.name
        this.privacy = props.privacy || this.privacy
        this.allowedUsers = props.allowedUsers || this.allowedUsers
    }


    cardIdGen = () => {
        if (this.cards.length === 0)
            return "0"
        return (Math.max(...this.cards.map(card => card.id))) + 1
    }

    addLayoutForCard(newId) {
        let x = Math.floor(Math.random() * this.cols)
        this.layout.push({i: newId, x: x, y: 999, w: 2, h: 2})
    }

    duplicateLayoutForCard(id, newId) {
        if (this.layout.length === 0) {
            this.layout = new LayoutObject()
        }
        let layoutWithNewId = {...this.layout.filter(cardLayout => cardLayout.i === id)[0]}
        layoutWithNewId.i = newId
        this.layout.push(layoutWithNewId)
    }

    addCard(card) {
        let newId = this.cardIdGen().toString()
        this.addLayoutForCard(newId)
        card.id = newId
        this.cards.push(card)
    }

    duplicateCard(card) {
        let newId = this.cardIdGen().toString()
        this.duplicateLayoutForCard(card.id, newId)
        card.id = newId
        this.cards.push(card)
    }

    resetLayout() {
        this.layout.forEach((layout, index) => {
                layout.x = index % this.cols;
                layout.y = Math.floor(index / this.cols);
                layout.w = 1;
                layout.h = 1
            }
        )
        this.layout = [...this.layout]
    }

    deleteCard(id) {
        this.cards = this.cards.filter(card => card.id !== id)
    }

    clear() {
        this.layout = []
        this.cards = []
    }

    getCard(id) {
        return this.cards.filter(card => card.id === id)[0]
    }

    // Privacy
    canSee(username) {
        if (this.privacy === "global")
            return true
        if (this.owner === username)
            return true
        return username in this.allowedUsers
    }
}