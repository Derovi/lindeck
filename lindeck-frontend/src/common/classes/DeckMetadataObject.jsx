import LayoutObject from "./LayoutObject";
import CardMetadataObject from "./CardMetadataObject";

export default class DeckMetadataObject {
    deckUuid = ""

    cardsMetadata = [] // [ new CardMetadataObject()]
    layout = [] // new LayoutObject()
    rowHeight = 100
    cols = 2

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

    clear() {
        this.layout = []
    }

    getMetadataId(id) {
        return this.cardsMetadata.filter(metadata => metadata.cardId === id)[0]
    }

    setLayout(layout) {
        this.layout = layout
    }

    deleteCard(id) {
        this.layout = this.layout.filter(layout => layout.i !== id)
    }

    duplicateLayoutForCard(newAndOldId) {
        if (this.layout.length === 0) {
            this.layout = new LayoutObject()
        }
        let oldId = newAndOldId.oldId
        let newId = newAndOldId.newId
        let layoutWithNewId = {...this.layout.filter(cardLayout => cardLayout.i === oldId)[0]}
        layoutWithNewId.i = newId
        this.layout.push(layoutWithNewId)
    }

    addLayoutForCard(newId) {
        let x = Math.floor(Math.random() * this.cols)
        this.layout.push({i: newId, x: x, y: 999, w: 2, h: 2})
    }

    constructor(props) {
        this.deckUuid = props.deckUuid
        this.rowHeight = props.rowHeight || this.rowHeight
        this.cols = props.cols || this.cols

        this.cardsMetadata = props.cardsMetadata || this.cardsMetadata
        this.layout = props.layout || this.layout
        this.cardsMetadata = this.cardsMetadata.map(
            jsonCardMetadada => new CardMetadataObject(jsonCardMetadada))
    }
}