import "./DeckPage.css"
import 'react-grid-layout/css/styles.css';
import React, {Component} from 'react';
import ReactGridLayout from "react-grid-layout";
import ReactResizeDetector from 'react-resize-detector';
import MovingDeckEditButton from "./movingDeckEditButton/DeckEditMenu";
import DeckEditDialog from "./editDeckDialog/DeckEditDialog";
import GlobalStorage from "../../../common/GlobalStorage";
import Card from "./card/Card";

let GS = new GlobalStorage()

class deckPage extends Component {
    state = {
        editDeckDialogOpened: false,
        gridWidth: 800,
        layout: null,
        cards: null,
        deckSettings: null,
    }

    constructor(props) {
        super(props);
        let myDeck = GS.getDeckIdFromUsernameDeckname(this.props.username, this.props.deckname)

        this.state.layout = myDeck.layout
        this.state.cards = myDeck.cards
        this.state.deckSettings = myDeck.deckSettings
    }

    cardIdGen = () => {
        if (this.state.cards.length === 0)
            return "0"
        return (Math.max(...this.state.cards.map(card => card.id))) + 1
    }

    duplicateLayoutForCard(id, newId) {
        let newLayout = this.state.layout
        if (newLayout.length === 0) {
            newLayout = [
                {i: "0", x: 2, y: 2, w: 3, h: 3},
            ]
            return newLayout
        }
        let layoutWithNewId = {...newLayout.filter(cardLayout => cardLayout.i === id)[0]}
        layoutWithNewId.i = newId
        newLayout.push(layoutWithNewId)
        return newLayout
    }

    addLayoutForCard(newId) {
        let newLayout = this.state.layout
        let x = Math.floor(Math.random() * this.state.deckSettings.cols)
        newLayout.push(
            {i: newId, x: x, y: 999, w: 2, h: 2},)
        return newLayout
    }

    addCard = (card) => {
        let newCardArray = [...this.state.cards]
        let newId = this.cardIdGen().toString()
        let newLayout = [...this.addLayoutForCard(newId)]
        card.id = newId
        newCardArray.push(card)
        GS.saveCardsToDeckId(this.state.deckSettings.uniqueId, newCardArray)
        this.setState({cards: newCardArray, layout: newLayout})
    }

    duplicateCard = (card) => {
        let newCardArray = [...this.state.cards]
        let newId = this.cardIdGen().toString()
        let newLayout = [...this.duplicatesaveLayoutForCard(card.id, newId)]
        card.id = newId
        newCardArray.push(card)
        GS.saveCardsToDeckId(this.state.deckSettings.uniqueId, newCardArray)
        this.setState({cards: newCardArray, layout: newLayout})
    }

    deleteCard = (id) => {
        let newCardArray = this.state.cards.filter(card => card.id !== id)
        GS.saveCardsToDeckId(this.state.deckSettings.uniqueId, newCardArray)
        this.setState({cards: newCardArray})
    }

    onLayoutChange(layout) {
        this.setState({layout: layout});
        GS.saveLayoutToDeckId(this.state.deckSettings.uniqueId, layout)
    }

    resetLayout = () => {
        let newLayout = this.state.layout
        newLayout.forEach((layout, index) => {
                layout.x = index % this.state.deckSettings.cols;
                layout.y = Math.floor(index / this.state.deckSettings.cols);
                layout.w = 1;
                layout.h = 1
            }
        )
        GS.saveLayoutToDeckId(this.state.deckSettings.uniqueId, newLayout)
        this.setState({layout: newLayout});
    }

    clearAll = () => {
        this.setState({layout: [], cards: []});
        GS.saveLayoutToDeckId(this.state.deckSettings.uniqueId, [])
    }

    changeCardAnswer = (text, id) => {
        let newCardArray = this.state.cards
        let card = newCardArray.filter(card => card.id === id)[0]
        card.answer = text
        GS.saveCardsToDeckId(this.state.deckSettings.uniqueId, newCardArray)
        this.setState({cards: newCardArray})
    }
    changeCardVerdict = (verdict, id) => {
        let newCardArray = this.state.cards
        let card = newCardArray.filter(card => card.id === id)[0]
        card.verdict = verdict
        GS.saveCardsToDeckId(this.state.deckSettings.uniqueId, newCardArray)
        this.setState({cards: newCardArray})
    }

    changeCardText = (text, id, isFlipped) => {
        let newCardArray = this.state.cards
        let card = newCardArray.filter(card => card.id === id)[0]
        if (isFlipped) {
            card.secondfield = text
        } else {
            card.textfield = text
        }
        GS.saveCardsToDeckId(this.state.deckSettings.uniqueId, newCardArray)
        this.setState({cards: newCardArray})
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
                            className="layout" cols={this.state.deckSettings.cols}
                            rowHeight={this.state.deckSettings.rowHeight} width={width || 0}
                            onLayoutChange={layout => this.onLayoutChange(layout)}>
                            {this.state.cards.map((card) => (
                                <div key={card.id} data-grid={this.state.layout.filter(lay => lay.i === card.id)[0]}>
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
            <DeckEditDialog deckSettings={this.state.deckSettings} saveDeckProps={this.saveDeckProps}
                            openDeckEditDialog={this.openEditDeckDialog} open={this.state.editDeckDialogOpened}/>
        </>
    }

    saveDeckProps = (cols, height) => {
        this.setState({
            deckSettings: {
                cols: cols, rowHeight: this.state.deckSettings.rowHeight
            }
        })
        if (this.state.deckSettings.cols > cols) {
            this.state.deckSettings.cols = cols
            this.resetLayout()
        }

        GS.saveSettingsToDeckId(this.state.deckSettings.uniqueId,
            {
                owner: GS.getMyName(), uniqueId: this.state.deckSettings.uniqueId,
                cols: parseInt(cols), rowHeight: parseInt(height),
                name: "name1", description: "description"
            })

    }

}


export default deckPage;