import "./DeckPage.css"
import 'react-grid-layout/css/styles.css';
import React, {Component} from 'react';
import ReactGridLayout from "react-grid-layout";
import ReactResizeDetector from 'react-resize-detector';
import MovingDeckEditButton from "./deckEditMenu/DeckEditMenu";
import DeckEditDialog from "./editDeckDialog/DeckEditDialog";
import Card from "./card/Card";
import GS from "../../../common/classes/GlobalStorage";
import {Redirect} from "@reach/router";
import CardObject from "../../../common/classes/CardObject";


class deckPage extends Component {
    state = {
        deck: GS.getDeckFromUsernameDeckname(this.props.username, this.props.deckname),
        editDeckDialogOpened: false,
        gridWidth: 800,
    }

    addCard = (card) => {
        let newDeck = this.state.deck
        newDeck.addCard(new CardObject(card))
        GS.saveDeck(newDeck)
        this.setState({deck: newDeck})
    }

    resetLayout = () => {
        let newDeck = this.state.deck
        newDeck.resetLayout()
        GS.saveDeck(newDeck)
        this.setState({deck: newDeck})
    }

    clearAll = () => {
        let newDeck = this.state.deck
        newDeck.clear()
        GS.saveDeck(newDeck)
        this.setState({deck: newDeck})
    }

    duplicateCard = (card) => {
        this.state.deck.duplicateCard(card)  // will  call onLayoutChange, dntknw wy but it is
    }

    deleteCard = (id) => {
        this.state.deck.deleteCard(id) // mb because of moving deck edit menu (if it is open, layoutChange does not calling)
    }

    onLayoutChange(layout) {
        let newDeck = this.state.deck
        newDeck.layout = layout
        GS.saveDeck(newDeck)
        this.setState({deck: newDeck});
    }

    changeCardAnswer = (text, id) => {
        this.state.deck.getCard(id).answer = text
        GS.saveDeck(this.state.deck)
    }

    changeCardVerdict = (verdict, id) => {
        this.state.deck.getCard(id).verdict = verdict
        GS.saveDeck(this.state.deck)
        this.setState({deck: this.state.deck});
    }

    changeCardText = (text, id, isFlipped) => {
        if (isFlipped) {
            this.state.deck.getCard(id).secondTextField = text
        } else {
            this.state.deck.getCard(id).textField = text
        }
        GS.saveDeck(this.state.deck)
    }

    openEditDeckDialog = (open) => {
        this.setState({editDeckDialogOpened: open})
    }

    render() {
        if (!this.state.deck.isValid()) return <Redirect to="/not-found" noThrow/>;
        return <>
            <MovingDeckEditButton
                openEditDeckDialog={this.openEditDeckDialog} addCard={this.addCard}
                resetLayout={this.resetLayout} clearAll={this.clearAll}>
                <div className="backGround">
                    <ReactResizeDetector handleWidth>
                        {({width}) => <ReactGridLayout
                            className="layout" cols={this.state.deck.cols}
                            rowHeight={this.state.deck.rowHeight} width={width || 0}
                            onLayoutChange={layout => this.onLayoutChange(layout)}>
                            {this.state.deck.cards.map((card) => (
                                <div key={card.id}
                                     data-grid={this.state.deck.layout.filter(lay => lay.i === card.id)[0]}>
                                    <Card card={card}
                                          changeCardText={this.changeCardText} changeCardAnswer={this.changeCardAnswer}
                                          changeCardVerdict={this.changeCardVerdict}
                                          duplicateCard={this.duplicateCard} deleteCard={this.deleteCard}/>
                                </div>
                            ))}
                        </ ReactGridLayout>}
                    </ReactResizeDetector>
                </div>
            </MovingDeckEditButton>
            <DeckEditDialog deck={this.state.deck} saveDeckProps={this.saveDeckProps}
                            openDeckEditDialog={this.openEditDeckDialog} open={this.state.editDeckDialogOpened}/>
        </>
    }

    saveDeckProps = (description, cols, height, privacy) => {
        let newDeck = this.state.deck
        newDeck.description = description
        newDeck.cols = parseInt(cols)
        newDeck.rowHeight = parseInt(height)
        newDeck.privacy = privacy
        this.setState({deck: newDeck});
        GS.saveDeck(newDeck)

        if (newDeck.cols > cols) {
            newDeck.cols = cols
            this.resetLayout()
        }
    }

}


export default deckPage;