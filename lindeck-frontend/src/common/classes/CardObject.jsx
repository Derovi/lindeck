export default class CardObject {
    type = "default"  // turing | answer |
    textfield = " text "
    secondfield = " second text"
    answer = "42"
    verdict = 0 // red-white-green : -1 0 1
    isFlipped = false // turning make card flippable
    id = "0" // string field !

    constructor(type, textfield, secondfield, answer, answered, isFlipped, id) {
        this.type = type || this.type
        this.textfield = textfield || this.textfield
        this.secondfield = secondfield || this.secondfield
        this.answer = answer || this.answer
        this.answered = answered || this.answered
        this.isFlipped = isFlipped || this.isFlipped
        this.id = id || this.id
    }
}