import CardObject from "./CardObject";
import {v4 as uuidv4} from 'uuid';

export default class DeckObject {
    ownerId = 0 // owner of deck
    name = "" // mean null
    cards = [new CardObject()]
    description = "test description"

    uuid = uuidv4()
    privacy = "global" // private | global
    members = []
    background = "#f0f8ff"

    constructor(props = {}) {
        this.ownerId = props.ownerId || this.ownerId
        this.name = props.name || this.name
        this.cards = props.cards || this.cards
        this.background = props.background || this.background
        this.description = props.description || this.description

        this.uuid = props.uuid || this.uuid
        this.privacy = props.privacy || this.privacy
        this.members = props.members || this.members
    }


    cardIdGen = () => {
        if (this.cards.length === 0)
            return "0"
        return (Math.max(...this.cards.map(card => card.id))) + 1
    }

    addCard(card) {
        let newId = this.cardIdGen().toString()
        card.id = newId
        this.cards.push(card)
        return newId
    }

    duplicateCard(card) {
        let newId = this.cardIdGen().toString()
        let oldId = card.id
        card.id = newId
        this.cards.push(card)
        return {newId: newId, oldId: oldId}
    }

    deleteCard(id) {
        this.cards = this.cards.filter(card => card.id !== id)
    }

    clear() {
        this.cards = []
    }

    getCard(id) {
        return this.cards.filter(card => card.id === id)[0]
    }

    // Privacy
    canSee(id) {
        if (id === undefined)
            return false
        if (this.privacy === "global")
            return true
        if (this.ownerId === id)
            return true
        return this.members.includes(id)
    }

    canEdit(id) {
        if (this.ownerId === id)
            return true

        return this.members.includes(id)
    }

    canDelete(id) {
        return this.ownerId === id;
    }

    isValid() {
        return this.name !== ""
    }
}