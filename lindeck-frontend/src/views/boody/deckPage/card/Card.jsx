import "./Card.css"
import React, {Component} from 'react';
import CardSettingsBar from "./cardSettingsBar/CardSettingsBar";
import CardEditDialog from "./cardEditDialog/CardEditDialog";
import ReactMarkdown from "react-markdown";
import ReactCardFlip from "react-card-flip";
import Paper from "@material-ui/core/Paper";
import AnswerPutDialog from "./answerEditDialog/AnswerEditDialog";
import CardObject from "../../../../common/classes/CardObject";

class Card extends Component {
    state = {
        card: new CardObject(this.props.card),
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
        this.props.deleteCard(this.state.card.id)
    }

    duplicateCard = () => {
        this.props.duplicateCard({...this.state.card})
    }

    answerCheck = (answer) => {
        if (answer === this.state.card.answer) {
            this.props.changeCardVerdict(1, this.state.card.id)
        } else {
            this.props.changeCardVerdict(-1, this.state.card.id)
        }
    }


    flip = (e) => {
        e.preventDefault();
        this.props.metadata.isFlipped = !this.state.metadata.isFlipped
        this.props.setCardMetadata(this.props.metadata)
        this.setState({isFlipped: this.props.metadata.isFlipped})
    }

    setCardMainData = (card) => {
        this.props.setCardMainData(card)
        this.setState({card: card})
    }

    getText = (isFlipped) => {
        if (isFlipped)
            return this.state.card.secondTextField
        return this.state.card.textField
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
                <div className="newText heading"> New card !!</div>
            </div>}
            <CardEditDialog open={this.state.textEditDialog} openTextEditDialog={this.openTextEditDialog}
                            setCardMainData={this.setCardMainData} card={this.state.card}/>

            {this.state.card.type === "answer" &&
            <AnswerPutDialog open={this.state.inputAnswerDialog}
                             openInputAnswerDialog={this.openInputAnswerDialog}
                             answer={this.state.card.answer} answerCheck={this.answerCheck}/>}
        </div>
    }

    createTwoSidesOfCard = () => {
        return [false, true].map(isFlipped => {
            return <Paper key={isFlipped} className="paper" style={this.getColor()}>

                <CardSettingsBar duplicateCard={this.duplicateCard} deleteCard={this.deleteCard}
                                 needFlipButton={this.state.card.isOfType("turning")}
                                 openTextEditDialog={this.openTextEditDialog} flipButtonClick={this.flip}
                                 needAnswerButtons={this.state.card.isOfType("answer")}
                                 changeVerdict={this.changeVerdict}
                                 inputAnswerDialogOpen={this.openInputAnswerDialog}
                                 cardTitle={this.state.card.name}/>

                <div className="text">
                    <ReactMarkdown>
                        {this.getText(isFlipped)}
                    </ReactMarkdown>
                </div>
            </Paper>
        })
    }
}

export default Card;