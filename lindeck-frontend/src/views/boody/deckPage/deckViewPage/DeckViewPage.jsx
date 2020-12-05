import 'react-grid-layout/css/styles.css';
import React, {Component} from 'react';
import "./DeckViewPage.css"
import Controller from "../../../../common/classes/ControllerObject";
import DeckEditMenu from "../deckEditPage/deckSettingsMenu/DeckEditMenu";
import DeckMetadataObject from "../../../../common/classes/DeckMetadataObject";
import Card from "../card/Card";

let uniq = 0
let wait = 0

class DeckViewPage extends Component {
    state = {
        deck: this.props.deck,
        deckMetadata: this.props.deckMetadata,
        cardsRenderArray: []
    }


    componentDidMount() {
        if (this.state.deck.cards.length === 0)
            return
        this.addCard()
        this.moveCardToCenter()
        this.addCard()
    }

    setMetadataValue = (field, value) => {
        let newMetadata = new DeckMetadataObject(this.state.deckMetadata)
        newMetadata[field] = value
        Controller.saveMetadata(newMetadata)
        this.setState({deckMetadata: newMetadata});
    }

    setCardMetadata = (metadata) => {
        let newMetadata = this.state.deckMetadata
        newMetadata.setCardMetadata(metadata)
        Controller.saveMetadata(newMetadata)
    }


    openEditDeckDialog = (open) => {
        this.setState({editDeckDialogOpened: open})
    }

    addCard() {
        let toAnswerId = this.state.deckMetadata.getNewShift()
        if (toAnswerId === undefined) {
            return
        }

        let cardArray = this.state.cardsRenderArray
        uniq += 1
        cardArray.push({
            id: toAnswerId,
            uniq: uniq,
            where: "left",
            rotate: Math.random() * 20 - 10,
            top: 110 + Math.random() * 40 - 20,
            left: -180
        })
        this.setState({cardsRenderArray: cardArray})

        let tuniq = uniq
        setTimeout(() => {
            let cardArray = this.state.cardsRenderArray
            let obj = cardArray.filter(cardRenderData => cardRenderData.uniq === tuniq)[0]
            if (obj.where === "left")
                obj.left = -150
            this.setState({cardsRenderArray: cardArray})

        }, 1000);

    }

    moveCardToCenter() {
        let toMoveCenterId = this.state.cardsRenderArray
            .filter(cardRenderData => cardRenderData.where === "left")[0]
        if (toMoveCenterId === undefined)
            return
        let tuniq = toMoveCenterId.uniq

        let cardArray = this.state.cardsRenderArray
        let obj = cardArray.filter(cardRenderData => cardRenderData.uniq === tuniq)[0]
        obj.rotate = 0
        obj.top = 10
        obj.left = 0
        obj.where = "center"
        this.setState({cardsRenderArray: cardArray})
    }

    removeCard() {
        let toRemoveId = this.state.cardsRenderArray.filter(cardRenderData => cardRenderData.where === "center")[0]
        if (toRemoveId === undefined)
            return
        let tuniq = toRemoveId.uniq

        Controller.saveMetadata(this.state.deckMetadata)
        let cardArray = this.state.cardsRenderArray
        let obj = cardArray.filter(cardRenderData => cardRenderData.uniq === tuniq)[0]
        obj.rotate = 90
        obj.top = 300
        obj.left = 190
        obj.where = "out"

        this.setState({cardsRenderArray: cardArray})

        setTimeout(() => {
            let cardArray = this.state.cardsRenderArray
            cardArray = cardArray.filter(cardRenderData => cardRenderData.uniq !== tuniq)
            this.setState({cardsRenderArray: cardArray})
        }, 1000);
    }

    getCard = () => {
        this.addCard()
        this.moveCardToCenter()
        this.removeCard()
    }

    mainButtonClick = () => {
        if (wait === 0) {
            this.getCard()
            wait = 1
            setTimeout(() => {
                wait = 0
            }, 1000);
        }
    }

    render() {
        return <>
            <DeckEditMenu isEdit={false}
                          openEditDeckDialog={this.openEditDeckDialog}
                          ownerAndDeckNames={this.props.ownerAndDeckNames}>
                <div className={"backGround boxShadow"}

                     style={{backgroundColor: this.state.deck.background}}>
                    {this.state.deck.cards.length === 0 ?
                        <div className={"noCardYet stylishText"}> There is No cards Yet</div>
                        : this.renderViewMode()}
                </div>
            </DeckEditMenu>
        </>
    }


    getPosition(where) {
        if (where === "left")
            return "cardToTheLeft";
        if (where === "center")
            return "cardToTheCenter";
    }

    renderViewMode = () => {
        return <div>
            <button className={"big-button"} onClick={this.mainButtonClick}>
                {"Next"}
            </button>
            <div className={"absoluteHandler"}>
                {this.state.cardsRenderArray.map(cardRenderData => {
                    this.state.deckMetadata.createMetadataIfNotExists(cardRenderData.id)
                    return <div className={"cardHolder cardProjection " + this.getPosition(cardRenderData.where)}
                                key={cardRenderData.uniq}
                                style={{
                                    transform: "rotate(" + cardRenderData.rotate + "deg)",
                                    top: cardRenderData.top + "px",
                                    left: cardRenderData.left + "%"
                                }}>
                        <Card card={this.state.deck.getCard(cardRenderData.id)}
                              viewMode={true}
                              setCardMetadata={this.setCardMetadata}
                              metadata={this.state.deckMetadata.getCardMetadataId(cardRenderData.id)}/>
                    </div>
                })}
            </div>
        </div>
    }
}


export default DeckViewPage;

