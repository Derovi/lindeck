import "./Card.css"
import React, {Component} from 'react';
import CardSettingsBar from "./cardSettingsBar/CardSettingsBar";
import CardEditDialog from "./cardEditDialog/CardEditDialog";
import ReactMarkdown from "react-markdown";
import ReactCardFlip from "react-card-flip";
import Paper from "@material-ui/core/Paper";

class Card extends Component {
    state = {
        editCardDialogOpened: false,
        isFlipped: this.props.card.isFlipped
    }

    openEditDialog = (open) => {
        this.setState({editCardDialogOpened: open})
    }

    deleteCard = () => {
        this.props.deleteCard(this.props.card.id)
    }

    duplicateCard = () => {
        this.props.duplicateCard({...this.props.card})
    }

    changeText = (text) => {
        this.props.changeCardText(text, this.props.card.id, this.state.isFlipped)
    }

    flip = (e) => {
        e.preventDefault();
        this.setState(prevState => ({isFlipped: !prevState.isFlipped}));
    }

    getText = (isFlipped) =>{
        if (isFlipped)
            return this.props.card.secondfield
        return this.props.card.textfield

    }

    render() {
        return <ReactCardFlip isFlipped={this.state.isFlipped}>
            {this.createTwoSidesOfCard()}
        </ReactCardFlip>
    }

    createTwoSidesOfCard() {
        return [false, true].map(isFlipped => {
            return <Paper key={isFlipped} className="paper">
                <CardSettingsBar duplicateCard={this.duplicateCard} deleteCard={this.deleteCard}
                                 openEditDialog={this.openEditDialog} flipButtonClick={this.flip}
                                 needFlipButton={this.props.card.type === "turing"}/>

                <div className="text">
                    <ReactMarkdown>
                        {this.getText(isFlipped)}
                    </ReactMarkdown>
                </div>


                <CardEditDialog textfield={this.getText(this.state.isFlipped)}  open={this.state.editCardDialogOpened}
                                setText={this.changeText}  editDialogIsOpened={this.openEditDialog}/>
            </Paper>
        })
    }

}

export default Card;