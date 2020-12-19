// default -> usual card, has a textfield in which you can enter text
// answer ->  a card with an answer, uses the default fields of the card, and also has a verdict (answer color), answerfield (answer)
// turning -> card, that can turn around and have two sides. Have isFlipped field and secondField

export default class CardObject {
    type = "default"  // turning | answer | default
    name = "card"
    textField = ""

    secondTextField = " second text"

    answerType = "string" // string/ select / / multiple
    selectFrom = ["42", "52"] //['Angular','jQuery','lol']
    answer = ["42"] // ['Angular','jQuery','lol']

    id = "0" // string field !
    isOfType(string) {
        return this.type.includes(string)
    }

    constructor(props = {}) {
        this.type = props.type || this.type
        this.textField = props.textField || this.textField
        this.secondTextField = props.secondTextField || this.secondTextField
        this.isFlipped = props.isFlipped || this.isFlipped
        this.verdict = props.verdict || this.verdict
        this.id = props.id || this.id
        this.name = props.name || this.name

        this.answer = props.answer || this.answer
        this.selectFrom = props.selectFrom || this.selectFrom
        this.answerType = props.answerType || this.answerType

        if (this.answerType === "string" || this.answerType === "select") {
            this.answer = [this.answer[0]]
        }
    }

    deleteSelectFrom(answerFrom) {
        this.selectFrom = this.selectFrom.filter(value => value !== answerFrom)
        this.answer = this.answer.filter(value => value !== answerFrom)
    }

    addSelectFrom(answer) {
        this.selectFrom.push(answer)
    }

    isAnswerCorrect(answer) {
        if (this.answerType === "string") {
            return this.answer[0] === answer[0]
        }
        if (this.answerType === "select") {
            return this.answer.includes(answer[0])
        }
        if (this.answerType === "multiple") {
            return answer.every(oneAnswer => this.answer.includes(oneAnswer))
        }

        // || this.answerType === "multiple"
    }

    inAnswers(answer) {
        return this.answer.includes(answer)
    }

    setAnswer(value) {
        if (this.answerType === "string") {
            this.answer[0] = value
        }
        if (this.answerType === "select") {
            this.answer = [value]
        }
        if (this.answerType === "multiple") {
            if (this.answer.includes(value)) {
                this.answer = this.answer.filter(answer => answer !== value)
            } else {
                this.answer.push(value)
            }
        }
    }
}