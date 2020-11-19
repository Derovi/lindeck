import "./Card.css"
import React, {Component} from 'react';
import CardSettingsBar from "./cardSettingsBar/CardSettingsBar";
import TextEditDialog from "./textEditDialog/TextEditDialog";
import ReactMarkdown from "react-markdown";
import ReactCardFlip from "react-card-flip";
import Paper from "@material-ui/core/Paper";
import AnswerEditDialog from "./answerEditDialog/AnswerEditDialog";
import CardObject from "../../../../common/CardObject";

class Card extends Component {
    state = {
        card: new CardObject(),
        textEditDialog: false,
        inputAnswerDialog: false,
        isFlipped: this.props.card.isFlipped,
        verdict: this.props.card.verdict
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
        this.props.changeCardText(text, this.props.card.id, this.state.isFlipped)
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
        this.setState(prevState => ({isFlipped: !prevState.isFlipped}));
    }

    getText = (isFlipped) => {
        if (isFlipped)
            return this.props.card.secondfield
        return this.props.card.textfield

    }

    changeVerdict = (verdict) => {
        this.props.changeCardVerdict(verdict, this.props.card.id)
    }

    getColor() {
        let color = "white"
        let verdict = this.props.card.verdict
        if (verdict === 1)
            color = "#cdffce"
        if (verdict === -1)
            color = "#ffcbcb"
        return {background: color}
    }

    render() {
        return <ReactCardFlip isFlipped={this.state.isFlipped}>
            {this.createTwoSidesOfCard()}
        </ReactCardFlip>
    }

    createTwoSidesOfCard() {
        return [false, true].map(isFlipped => {
            return <Paper key={isFlipped} className="paper" style={this.getColor()}>
                <CardSettingsBar duplicateCard={this.duplicateCard} deleteCard={this.deleteCard}
                                 needFlipButton={this.props.card.type === "turing"}
                                 openTextEditDialog={this.openTextEditDialog} flipButtonClick={this.flip}
                                 needAnswerButtons={this.props.card.type === "answer"}
                                 changeVerdict={this.changeVerdict} inputAnswerDialogOpen={this.openInputAnswerDialog}
                />
                <div className="text">
                    <ReactMarkdown>
                        {this.getText(isFlipped)}
                    </ReactMarkdown>
                </div>

                <TextEditDialog open={this.state.textEditDialog} openTextEditDialog={this.openTextEditDialog}
                                textfield={this.getText(this.state.isFlipped)} setText={this.setText}
                                needAnswer={this.props.card.type === "answer"}
                                answerfield={this.props.card.answer} setAnswer={this.setAnswer}/>
                {this.props.card.type === "answer"&&
                <AnswerEditDialog open={this.state.inputAnswerDialog} openInputAnswerDialog={this.openInputAnswerDialog}
                                  answer={this.props.card.answer} answerCheck={this.answerCheck}/>}
            </Paper>
        })
    }
}

export default Card;