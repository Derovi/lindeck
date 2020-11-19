import "./DeckPage.css"
import 'react-grid-layout/css/styles.css';
import React, {Component} from 'react';
import ReactGridLayout from "react-grid-layout";
import ReactResizeDetector from 'react-resize-detector';
import MovingDeckEditButton from "./deckEditMenu/DeckEditMenu";
import DeckEditDialog from "./editDeckDialog/DeckEditDialog";
import Card from "./card/Card";
import GS from "../../../common/classes/GlobalStorage";


class deckPage extends Component {
    state = {
        deck: GS.getDeckFromUsernameDeckname(this.props.username, this.props.deckname),
        editDeckDialogOpened: false,
        gridWidth: 800,
    }

    addCard = (card) => {
        this.state.deck.addCard(card)
        GS.saveDeck(this.state.deck)
        this.setState({deck: this.state.deck})
    }

    resetLayout = () => {
        this.state.deck.resetLayout()
        GS.saveDeck(this.state.deck)
        this.setState({deck: this.state.deck})
    }

    clearAll = () => {
        this.state.deck.clear()
        GS.saveDeck(this.state.deck)
        this.setState({deck: this.state.deck})
    }

    duplicateCard = (card) => {
        this.state.deck.duplicateCard(card)  // will  call onLayoutChange, dntknw wy but it is
    }

    deleteCard = (id) => {
        this.state.deck.deleteCard(id) // mb because of moving deck edit menu (if it is open, layoutChange does not calling)
    }

    onLayoutChange(layout) {
        this.state.deck.layout = layout
        GS.saveDeck(this.state.deck)
        this.setState({deck: this.state.deck});
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
            this.state.deck.getCard(id).secondfield = text
        } else {
            this.state.deck.getCard(id).textfield = text
        }
        GS.saveDeck(this.state.deck)
    }

    openEditDeckDialog = (open) => {
        this.setState({editDeckDialogOpened: open})
    }

    render() {
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

    saveDeckProps = (description, cols, height) => {
        this.state.deck.description= description
        this.state.deck.cols = parseInt(cols)
        this.state.deck.rowHeight = parseInt(height)
        this.setState({deck: this.state.deck});
        GS.saveDeck(this.state.deck)

        if (this.state.deck.cols > cols) {
            this.state.deck.cols = cols
            this.resetLayout()
        }
    }

}


export default deckPage;