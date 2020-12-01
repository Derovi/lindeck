import 'react-grid-layout/css/styles.css';
import React, {Component} from 'react';
import ReactGridLayout from "react-grid-layout";
import ReactResizeDetector from 'react-resize-detector';
import DeckEditDialog from "./deckEditDialog/DeckEditDialog";
import Card from "../card/Card";
import Controller from "../../../../common/classes/ControllerObject";
import {navigate, Redirect} from "@reach/router";
import CardObject from "../../../../common/classes/CardObject";
import DeckEditMenu from "./deckEditMenu/DeckEditMenu";
import DeckObject from "../../../../common/classes/DeckObject";

class DeckEditPage extends Component {
    state = {
        deck: this.props.deck,
        deckMetadata: this.props.deckMetadata,
        editDeckDialogOpened: false,
        gridWidth: 800,
    }


    setCardMetadata = (metadata) => {
        let newMetadata = this.state.deckMetadata
        newMetadata.setCardMetadata(metadata)

        Controller.saveMetadata(newMetadata)
    }

    setCardMainData = (cardData) => {
        let newDeck = new DeckObject({...this.state.deck})
        let myCard = newDeck.getCard(cardData.id)
        newDeck.cards[newDeck.cards.indexOf(myCard)] = cardData

        Controller.saveDeck(newDeck)
    }

    addCard = (card) => {
        let newDeck = this.state.deck
        let newCardId = newDeck.addCard(new CardObject(card))

        let newMetadata = this.state.deckMetadata
        newMetadata.createMetadataIfNotExists(newCardId)

        Controller.saveDeck(newDeck)
        Controller.saveMetadata(newMetadata)
        this.setState({deck: newDeck})
    }

    resetLayout = () => {
        let newMetadata = this.state.deckMetadata
        newMetadata.resetLayout()

        Controller.saveMetadata(newMetadata)
        this.setState({metadata: newMetadata})
    }

    clearAll = () => {
        let newDeck = this.state.deck
        let newMetadata = this.state.deckMetadata

        newDeck.clear()
        newMetadata.clear()

        Controller.saveDeck(newDeck)
        Controller.saveMetadata(newMetadata)
        this.setState({deck: newDeck, metadata: newMetadata})
    }

    duplicateCard = (card) => {
        let newAndOldId = this.state.deck.duplicateCard(card)  // will  call onLayoutChange, dntknw wy but it is
        this.state.deckMetadata.duplicateLayoutForCard(newAndOldId)
        this.state.deckMetadata.duplicateMetadataForCard(newAndOldId)

        Controller.saveDeck(this.state.deck)
        Controller.saveMetadata(this.state.deckMetadata)
        this.setState({deck: this.state.deck, metadata: this.state.deckMetadata})
    }

    deleteCard = (id) => {
        this.state.deck.deleteCard(id) // mb because of moving deck edit menu (if it is open, layoutChange does not calling)
        this.state.deckMetadata.deleteCard(id)
        Controller.saveDeck(this.state.deck)
        Controller.saveMetadata(this.state.deckMetadata)
        this.setState({deck: this.state.deck, metadata: this.state.deckMetadata})
    }

    onLayoutChange(layout) {
        let newMetadata = this.state.deckMetadata
        newMetadata.setLayout(layout)
        Controller.saveMetadata(newMetadata)
        this.setState({metadata: newMetadata});
    }

    changeCardVerdict = (verdict, id) => {
        let newMetadata = this.state.deckMetadata
        newMetadata.getCardMetadataId(id).verdict = verdict
        Controller.saveMetadata(newMetadata)
        this.setState({metadata: newMetadata});
    }

    openEditDeckDialog = (open) => {
        this.setState({editDeckDialogOpened: open})
    }

    render() {
        return <>
            <DeckEditMenu openEditDeckDialog={this.openEditDeckDialog} addCard={this.addCard}
                          resetLayout={this.resetLayout} clearAll={this.clearAll}

                        >
                <div className="backGround">
                    <ReactResizeDetector handleWidth>
                        {({width}) => {
                            this.contentWidth = width

                            return <ReactGridLayout
                                measureBeforeMount={false}
                                className="layout" cols={this.state.deckMetadata.cols}
                                rowHeight={this.state.deckMetadata.rowHeight} width={width || 0}
                                onLayoutChange={layout => this.onLayoutChange(layout)}>

                                {this.state.deck.cards.map((card) => {
                                    let layout = this.state.deckMetadata.getLayout(card.id)
                                    if (!layout) {
                                        layout = this.state.deckMetadata.addLayoutForCard(card.id)
                                    }
                                    let metadata = this.state.deckMetadata.getCardMetadataId(card.id)
                                    return <div className="cardHolder" key={card.id}
                                                data-grid={layout}>
                                        <Card card={card} setCardMainData={this.setCardMainData}
                                              setCardMetadata={this.setCardMetadata} metadata={metadata}
                                              duplicateCard={this.duplicateCard} deleteCard={this.deleteCard}/>
                                    </div>
                                })}
                            </ ReactGridLayout>
                        }}
                    </ReactResizeDetector>
                </div>
            </DeckEditMenu>
            <DeckEditDialog deck={this.state.deck} saveDeckProps={this.saveDeckProps} metadata={this.state.deckMetadata}
                            openDeckEditDialog={this.openEditDeckDialog} open={this.state.editDeckDialogOpened}/>
        </>
    }

    saveDeckProps = (settings) => {
        let newMetadata = this.state.deckMetadata
        newMetadata.rowHeight = settings.height
        newMetadata.cols = settings.cols

        if (newMetadata.cols > settings.cols) {
            newMetadata.cols = settings.cols
            this.resetLayout()
        }

        let newDeck = this.state.deck
        newDeck.name = settings.name
        newDeck.description = settings.description
        newDeck.privacy = settings.privacy

        newDeck.members = settings.members

        this.setState({deck: newDeck});
        Controller.saveDeck(newDeck)


        this.setState({metadata: newMetadata});
        Controller.saveMetadata(newMetadata)

        navigate('/user/' + this.props.username + "/deck/" + settings.name + "/edit")
    }

}


export default DeckEditPage;