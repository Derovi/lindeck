import "./DeckPage.css"
import 'react-grid-layout/css/styles.css';
import React, {Component} from 'react';
import {navigate, Redirect} from "@reach/router";
import DeckEditPage from "./deckEditPage/DeckEditPage";
import Controller from "../../../common/classes/ControllerObject";
import DeckViewPage from "./deckViewPage/DeckViewPage";

class DeckPage extends Component {
    state = {
        deck: null,
        deckMetadata: null,
    }

    constructor(props) {
        super(props)
        if (Controller.session.isActive) {
            this.state.deck = Controller.getDeckNyUsernameDeckname(this.props.username, this.props.deckname)
            this.state.deckMetadata = Controller.getDeckMetadata(this.state.deck.uuid)
            this.state.deck.cards.forEach(card => this.state.deckMetadata.createMetadataIfNotExists(card.id))
        }
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

        if (this.props.mode === "edit")
            return <DeckEditPage deck={this.state.deck} deckMetadata={this.state.deckMetadata}/>
        if (this.props.mode === "view")
            return <DeckViewPage deck={this.state.deck} deckMetadata={this.state.deckMetadata}/>

    }

}

export default DeckPage;