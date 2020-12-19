import "./Card.css"
import React, {Component} from 'react';
import CardSettingsBar from "./cardSettingsBar/CardSettingsBar";
import CardEditDialog from "./cardEditDialog/CardEditDialog";
import ReactMarkdown from "react-markdown";
import ReactCardFlip from "react-card-flip";
import Paper from "@material-ui/core/Paper";
import AnswerPutDialog from "./answerPutDialog/AnswerPutDialog";
import CardObject from "../../../../common/classes/CardObject";
import CardMetadataObject from "../../../../common/classes/CardMetadataObject";

class Card extends Component {
    state = {
        card: new CardObject(this.props.card),
        metadata: this.props.metadata,
        answerPutDialog: false,
        textEditDialog: false,
        newCard: this.props.metadata.isNew,
        newCardOpacity: 1,
    }

    openTextEditDialog = (open) => {
        this.setState({textEditDialog: open})
    }

    openInputAnswerDialog = () => {
        this.setState({answerPutDialog: !this.state.answerPutDialog})
    }

    deleteCard = () => {
        this.props.deleteCard(this.state.card.id)
    }

    duplicateCard = () => {
        this.props.duplicateCard({...this.state.card})
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
        let newMetadata = new CardMetadataObject(this.state.metadata)
        newMetadata.verdict = verdict
        this.props.setCardMetadata(newMetadata)
        this.setState({metadata: newMetadata})
    }

    newTextOk = () => {
        this.props.metadata.isNew = false
        this.props.setCardMetadata(this.props.metadata)
        this.setState({newCardOpacity: 0})
        setTimeout(() => this.setState({newCard: false}), 1000);
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
            {this.state.card.type === "answer" &&
            <AnswerPutDialog open={this.state.answerPutDialog}
                             openInputAnswerDialog={this.openInputAnswerDialog}
                             card={this.state.card} verdict={this.state.metadata.verdict}
                             changeVerdict={this.changeVerdict}/>}
            <CardEditDialog open={this.state.textEditDialog} openTextEditDialog={this.openTextEditDialog}
                            setCardMainData={this.setCardMainData} card={this.state.card}/>

        </div>
    }

    createTwoSidesOfCard = () => {
        return [false, true].map(isFlipped => {
            return <Paper key={isFlipped} className="paper">

                <CardSettingsBar duplicateCard={this.duplicateCard} deleteCard={this.deleteCard}
                                 needFlipButton={this.state.card.isOfType("turning")}
                                 openTextEditDialog={this.openTextEditDialog} flipButtonClick={this.flip}
                                 needAnswerButtons={this.state.card.isOfType("answer")}
                                 changeVerdict={this.changeVerdict}
                                 viewMode = {this.props.viewMode}
                                 inputAnswerClick={this.openInputAnswerDialog}
                                 cardTitle={this.state.card.name}/>

                <div className="cardText">
                    <ReactMarkdown>
                        {this.getText(isFlipped)}
                    </ReactMarkdown>
                </div>


            </Paper>
        })
    }
}

export default Card;