// default -> usual card, has a textfield in which you can enter text
// answer ->  a card with an answer, uses the default fields of the card, and also has a verdict (answer color), answerfield (answer)
// turning -> card, that can turn around and have two sides. Have isFlipped field and secondField

export default class CardObject {
    type = "default"  // turning | answer | default
    name = "card"
    textField = " text "

    secondTextField = " second text"
    answer = "42"

    id = "0" // string field !

    constructor(props = {}) {
        this.type = props.type || this.type
        this.textField = props.textField || this.textField
        this.secondTextField = props.secondTextField || this.secondTextField
        this.isFlipped = props.isFlipped || this.isFlipped
        this.answer = props.answer || this.answer
        this.verdict = props.verdict || this.verdict
        this.id = props.id || this.id
    }


}