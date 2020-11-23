import CardObject from "./CardObject";
import LayoutObject from "./LayoutObject";
import {v4 as uuidv4} from 'uuid';

export default class DeckObject {
    ownerId = 0 // owner of deck
    name = "" // mean null
    cards = [new CardObject()]
    layout = [new LayoutObject()]
    description = "test description"
    rowHeight = 100
    cols = 2
    uuid = uuidv4()
    privacy = "global" // private | global
    allowedUsersId = [] // TODO write place where you can set it

    constructor(props = {}) {
        this.ownerId = props.ownerId || this.ownerId
        this.name = props.name || this.name
        this.cards = props.cards || this.cards
        this.layout = props.layout || this.layout
        this.description = props.description || this.description
        this.rowHeight = props.rowHeight || this.rowHeight
        this.cols = props.cols || this.cols
        this.uuid = props.uuid || this.uuid
        this.privacy = props.privacy || this.privacy
        this.allowedUsersId = props.allowedUsers || this.allowedUsersId
        this.urlName = props.urlName || this.urlName
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
    canSee(id) {
        if (this.privacy === "global")
            return true
        if (this.ownerId === id)
            return true
        return id in this.allowedUsersId
    }

    isValid() {
        return this.name !== ""
    }
}