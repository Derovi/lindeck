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
        deck: null,
        deckMetadata: null,
        editDeckDialogOpened: false,
        gridWidth: 800,
    }

    setCardMetadata = (metadata) => {
        let newMetadata = this.state.deckMetadata
        newMetadata.setCardMetadata(metadata)

        Controller.saveMetadata(newMetadata)
    }

    constructor(props) {
        super(props)
        if (Controller.session.isActive) {
            this.state.deck = Controller.getDeckNyUsernameDeckname(this.props.username, this.props.deckname)
            this.state.deckMetadata = Controller.getDeckMetadata(this.state.deck.uuid)
            this.state.deck.cards.forEach(card => this.state.deckMetadata.createMetadataIfNotExists(card.id))
        }
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

    changeCardAnswer = (text, id) => {
        this.state.deck.getCard(id).answer = text
        Controller.saveDeck(this.state.deck)
    }

    getMetadata(id) {
        let metadataCard = this.state.deckMetadata.getCardMetadataId(id)
        return metadataCard
    }

    changeCardVerdict = (verdict, id) => {
        let newMetadata = this.state.deckMetadata
        newMetadata.getCardMetadataId(id).verdict = verdict
        Controller.saveMetadata(newMetadata)
        this.setState({metadata: newMetadata});
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
        if (!Controller.session.isActive)
            return <Redirect to="/permission-denied" noThrow/>;
        if (!this.state.deck.isValid() || !"view edit".includes(this.props.mode))
            return <Redirect to="/not-found" noThrow/>;
        let userid = Controller.session.id
        if ((this.props.mode === "edit") && !this.state.deck.canEdit(userid))
            return <Redirect to={"/user/" + this.props.username + "/deck/" + this.state.deck.name + "/view"} noThrow/>;
        if ((this.props.mode === "view") && !this.state.deck.canSee(userid))
            return <Redirect to="/permission-denied" noThrow/>;


        return <>
            <MovingDeckEditButton
                openEditDeckDialog={this.openEditDeckDialog} addCard={this.addCard}
                resetLayout={this.resetLayout} clearAll={this.clearAll}>
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
                                    let isNew = false
                                    if (!layout) {
                                        isNew = true
                                        layout = this.state.deckMetadata.addLayoutForCard(card.id)
                                    }
                                    let metadata = this.state.deckMetadata.getCardMetadataId(card.id)
                                    return <div className="cardHolder" key={card.id}
                                                data-grid={layout}>
                                        <Card isNew={isNew} card={card} metadata={metadata}
                                              setCardMetadata={this.setCardMetadata}
                                              changeCardText={this.changeCardText}
                                              changeCardAnswer={this.changeCardAnswer}
                                              duplicateCard={this.duplicateCard} deleteCard={this.deleteCard}/>
                                    </div>
                                })}
                            </ ReactGridLayout>
                        }}
                    </ReactResizeDetector>
                </div>
            </MovingDeckEditButton>
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

        this.setState({deck: newDeck});
        Controller.saveDeck(newDeck)


        this.setState({metadata: newMetadata});
        Controller.saveMetadata(newMetadata)

        navigate('/user/' + this.props.username + "/deck/" + settings.name + "/edit")
    }

}


export default deckPage;