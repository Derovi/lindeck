import "./DeckPage.css"
import 'react-grid-layout/css/styles.css';
import React, {Component} from 'react';
import ReactGridLayout from "react-grid-layout";
import ReactResizeDetector from 'react-resize-detector';
import MovingDeckEditButton from "./deckEditMenu/DeckEditMenu";
import DeckEditDialog from "./deckEditDialog/DeckEditDialog";
import Card from "./card/Card";
import Controller from "../../../common/classes/ControllerObject";
import {navigate, Redirect} from "@reach/router";
import CardObject from "../../../common/classes/CardObject";


class deckPage extends Component {
    state = {
        deck: Controller.getDeckNyUsernameDeckname(this.props.username, this.props.deckname),
        editDeckDialogOpened: false,
        gridWidth: 800,
    }

    addCard = (card) => {
        let newDeck = this.state.deck
        newDeck.addCard(new CardObject(card))
        Controller.saveDeck(newDeck)
        this.setState({deck: newDeck})
    }

    resetLayout = () => {
        let newDeck = this.state.deck
        newDeck.resetLayout()
        Controller.saveDeck(newDeck)
        this.setState({deck: newDeck})
    }

    clearAll = () => {
        let newDeck = this.state.deck
        newDeck.clear()
        Controller.saveDeck(newDeck)
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
        Controller.saveDeck(newDeck)
        this.setState({deck: newDeck});
    }

    changeCardAnswer = (text, id) => {
        this.state.deck.getCard(id).answer = text
        Controller.saveDeck(this.state.deck)
    }

    changeCardVerdict = (verdict, id) => {
        this.state.deck.getCard(id).verdict = verdict
        Controller.saveDeck(this.state.deck)
        this.setState({deck: this.state.deck});
    }

    changeCardText = (text, id, isFlipped) => {
        if (isFlipped) {
            this.state.deck.getCard(id).secondTextField = text
        } else {
            this.state.deck.getCard(id).textField = text
        }
        Controller.saveDeck(this.state.deck)
    }

    openEditDeckDialog = (open) => {
        this.setState({editDeckDialogOpened: open})
    }

    render() {
        if (!this.state.deck.isValid() || !"view edit".includes(this.props.mode))
            return <Redirect to="/not-found" noThrow/>;
        let userid = Controller.session.id
        if ((this.props.mode === "edit") && !this.state.deck.canEdit(userid))
            return <Redirect to="/permission-denied" noThrow/>;
        if ((this.props.mode === "view") && !this.state.deck.canSee(userid))
            return <Redirect to="/permission-denied" noThrow/>;

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

    saveDeckProps = (settings) => {
        let newDeck = this.state.deck

        if (newDeck.cols > settings.cols) {
            newDeck.cols = settings.cols
            this.resetLayout()
        }
        newDeck.name = settings.name
        newDeck.description = settings.description
        newDeck.cols = settings.cols
        newDeck.rowHeight = settings.height
        newDeck.privacy = settings.privacy
        this.setState({deck: newDeck});
        Controller.saveDeck(newDeck)


        navigate('/user/' + this.props.username + "/deck/" + settings.name)
    }

}


export default deckPage;