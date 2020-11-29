import "./Card.css"
import React, {Component} from 'react';
import CardSettingsBar from "./cardSettingsBar/CardSettingsBar";
import TextEditDialog from "./textEditDialog/TextEditDialog";
import ReactMarkdown from "react-markdown";
import ReactCardFlip from "react-card-flip";
import Paper from "@material-ui/core/Paper";
import AnswerEditDialog from "./answerEditDialog/AnswerEditDialog";

class Card extends Component {
    state = {
        metadata: this.props.metadata,
        inputAnswerDialog: false,
        textEditDialog: false,

        newCard: this.props.metadata.isNew,
        newCardOpacity: 1,
    }

    openTextEditDialog = (open) => {
        this.setState({textEditDialog: open})
    }
    openInputAnswerDialog = (open) => {
        this.setState({inputAnswerDialog: open})
    }

    deleteCard = () => {
        this.props.deleteCard(this.props.card.id)
    }

    duplicateCard = () => {
        this.props.duplicateCard({...this.props.card})
    }

    setText = (text) => {
        this.props.changeCardText(text, this.props.card.id, this.state.metadata.isFlipped)
    }

    answerCheck = (answer) => {
        if (answer === this.props.card.answer) {
            this.props.changeCardVerdict(1, this.props.card.id)
        } else {
            this.props.changeCardVerdict(-1, this.props.card.id)
        }
    }

    setAnswer = (text) => {
        this.props.changeCardAnswer(text, this.props.card.id)
    }

    flip = (e) => {
        e.preventDefault();
        this.props.metadata.isFlipped = !this.state.metadata.isFlipped
        this.props.setCardMetadata(this.props.metadata)
        this.setState({isFlipped: this.props.metadata.isFlipped})
    }

    getText = (isFlipped) => {
        if (isFlipped)
            return this.props.card.secondTextField
        return this.props.card.textField
    }

    changeVerdict = (verdict) => {
        this.props.metadata.verdict = verdict
        this.props.setCardMetadata(this.props.metadata)
    }

    newTextOk = () => {
        this.props.metadata.isNew = false
        this.props.setCardMetadata(this.props.metadata)
        this.setState({newCardOpacity: 0})
        setTimeout(() => this.setState({newCard: false}), 1000);
    }

    getColor() {
        let color = "white"
        let verdict = this.state.metadata.verdict
        if (verdict === 1)
            color = "#cdffce"
        if (verdict === -1)
            color = "#ffcbcb"
        return {background: color}
    }

    render() {
        return <div className="handler">
            <ReactCardFlip isFlipped={this.state.metadata.isFlipped}>
                {this.createTwoSidesOfCard()}
            </ReactCardFlip>
            {this.state.newCard &&
            <div className="newCardTextHolder" style={{opacity: this.state.newCardOpacity}} onTouchEnd={this.newTextOk}
                 onClick={this.newTextOk}>
                <div className="newText heading" > New card !!</div>
            </div>}
        </div>
    }

    createTwoSidesOfCard = () => {
        return [false, true].map(isFlipped => {
            return <Paper key={isFlipped} className="paper" style={this.getColor()}>

                <CardSettingsBar duplicateCard={this.duplicateCard} deleteCard={this.deleteCard}
                                 needFlipButton={this.props.card.type === "turing"}
                                 openTextEditDialog={this.openTextEditDialog} flipButtonClick={this.flip}
                                 needAnswerButtons={this.props.card.type === "answer"}
                                 changeVerdict={this.changeVerdict}
                                 inputAnswerDialogOpen={this.openInputAnswerDialog}
                                 cardTitle={this.props.card.name}
                />

                <div className="text">
                    <ReactMarkdown>
                        {this.getText(isFlipped)}
                    </ReactMarkdown>
                </div>

                <TextEditDialog open={this.state.textEditDialog} openTextEditDialog={this.openTextEditDialog}
                                textField={this.getText(this.state.metadata.isFlipped)} setText={this.setText}
                                needAnswer={this.props.card.type === "answer"}
                                answer={this.props.card.answer} setAnswer={this.setAnswer}/>
                {this.props.card.type === "answer" &&
                <AnswerEditDialog open={this.state.inputAnswerDialog}
                                  openInputAnswerDialog={this.openInputAnswerDialog}
                                  answer={this.props.card.answer} answerCheck={this.answerCheck}/>}

            </Paper>
        })
    }
}

export default Card;