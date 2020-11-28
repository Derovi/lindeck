export default class CardMetadataObject {
    cardId = "0"

    verdict = 0 // red-white-green : -1 0 1
    isFlipped = false // turning make card flippable

    constructor(props) {
        this.cardId = props.cardId || this.cardId
        this.verdict = props.verdict || this.verdict
        this.isFlipped = props.isFlipped || this.isFlipped
    }
}