import "./DeckPage.css"
import 'react-grid-layout/css/styles.css';
import React, {Component} from 'react';
import ReactGridLayout from "react-grid-layout";
import ReactResizeDetector from 'react-resize-detector';
import MovingDeckEditButton from "./movingDeckEditButton/deckEditMenu";
import DeckEditDialog from "./editDeckDialog/DeckEditDialog";
import GlobalStorage from "../../common/GlobalStorage";
import Card from "./card/Card";

let GS = new GlobalStorage()
const originalLayout = GS.getLayout();
const originalCards = GS.getCards();
const originalDeckSettings = GS.GetSettings();

class deckPage extends Component {
    state = {
        editDeckDialogOpened: false,
        gridWidth: 800,
        layout: originalLayout,
        cards: originalCards,
        deckSettings: originalDeckSettings,
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
        GS.saveCards(newCardArray)
        this.setState({cards: newCardArray, layout: newLayout})
    }

    duplicateCard = (card) => {
        let newCardArray = [...this.state.cards]
        let newId = this.cardIdGen().toString()
        let newLayout = [...this.duplicateLayoutForCard(card.id, newId)]
        card.id = newId
        newCardArray.push(card)
        GS.saveCards(newCardArray)
        this.setState({cards: newCardArray, layout: newLayout})
    }

    deleteCard = (id) => {
        let newCardArray = this.state.cards.filter(card => card.id !== id)
        GS.saveCards(newCardArray)
        this.setState({cards: newCardArray})
    }

    onLayoutChange(layout) {
        this.setState({layout: layout});
        GS.saveLayout(layout);
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
        GS.saveLayout(newLayout)
        this.setState({layout: newLayout});
    }

    clearAll = () => {
        this.setState({layout: [], cards: []});
        GS.saveCards([])
    }

    changeCardText = (text, id, isFlipped) => {
        let newCardArray = this.state.cards
        let card = newCardArray.filter(card => card.id === id)[0]
        if (isFlipped) {
            card.secondfield = text
        } else {
            card.textfield = text
        }
        GS.saveCards(newCardArray)
        this.setState({cards: newCardArray})
    }

    openEditDeckDialog = (open) => {
        this.setState({editDeckDialogOpened: open})
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
        GS.saveSettings({cols: parseInt(cols), rowHeight: parseInt(height)})
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
                                          changeCardText={this.changeCardText} duplicateCard={this.duplicateCard}
                                          deleteCard={this.deleteCard}/>
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

}


export default deckPage;