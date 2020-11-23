import React from "react";

import "./UserDecksPage.css"
import Paper from "@material-ui/core/Paper";
import Controller from "../../../common/classes/ControllerObject";
import TextField from "@material-ui/core/TextField";
import DeckCard from "./DeckCard/DeckCard";
import Pagination from "@material-ui/lab/Pagination";
import {Redirect} from "@reach/router";
import Grid from "@material-ui/core/Grid";
import DeckObject from "../../../common/classes/DeckObject";

const CARDS_PER_PAGE = 4
export default class UserDecksPage extends React.Component {
    inputText = ""

    getDecks(name) {
        let decks = Controller.getUsersDecks(this.props.username)
            .map(deck => new DeckObject(deck))
            .filter(deck => deck.canSee(Controller.session.id))
        if (name !== "")
            decks = decks.filter(deck => deck.name.toLowerCase().includes(this.inputText));

        return decks
    }

    state = {
        decks: this.getDecks(),
        page: 1,
    }

    deleteDeck(uuid) {
        Controller.deleteDeck(uuid)
        this.setState({decks: this.getDecks()})
    }

    changeText = (event) => {
        this.inputText = event.target.value
        this.setState({decks: this.getDecks()})
    }

    render() {
        if (Controller.session.cashedUser.username !== this.props.username && !Controller.session.isOnline)

            return <Redirect to="/not-found" noThrow/>;
        if (!Controller.getUser(this.props.username))
            return <Redirect to="/not-found" noThrow/>;

        return <div className="rootUserPage backGroundImage">
            <div className="decksWrapper">

                <Paper className="titleInputPaperWide">
                    <TextField label="Label" placeholder="Placeholder"
                               helperText="Full width!" fullWidth
                               margin="normal" InputLabelProps={{shrink: true}}
                               variant="outlined" onChange={this.changeText}/>
                </Paper>

                <Paper className="titlePaperWide">
                <span>
                    {this.props.username} decks =>
                    </span>
                </Paper>

                <Grid container spacing={2}>
                    {this.renderDecks(this.state.page)}
                </Grid>
                <Paper className="titlePaperWide paginationHandle">
                    <Pagination count={Math.ceil(Controller.session.cashedDecks.length / CARDS_PER_PAGE)} variant="outlined"
                                onChange={(event, number) => this.setState({page: number})}
                    />
                </Paper>
            </div>
        </div>
    }

    renderDecks(page) {
        let decks = this.state.decks.map((deck, uniqId) => {
            return <Grid item xs={12} sm={6} lg={3} key={uniqId}>
                <DeckCard deck={deck} delete={(uuid) => this.deleteDeck(uuid)}/>

            </Grid>
        })
        return decks.slice((page - 1) * CARDS_PER_PAGE, (page) * CARDS_PER_PAGE)
    }

}
