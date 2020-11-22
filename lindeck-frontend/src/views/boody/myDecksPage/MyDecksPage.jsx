import React from "react";

import "./MyDecksPage.css"
import Paper from "@material-ui/core/Paper";
import GS from "../../../common/classes/GlobalStorage";
import TextField from "@material-ui/core/TextField";
import DeckCard from "./DeckCard/DeckCard";
import Pagination from "@material-ui/lab/Pagination";
import {Redirect} from "@reach/router";
import Grid from "@material-ui/core/Grid";

const CARDS_PER_PAGE = 4
export default class MyDecksPage extends React.Component {
    getDecks() {
        if (GS.session.isOnline)
            return GS.getUsersDecks(this.props.username)
        if (this.props.username !== GS.session.username)
            return []
        return GS.session.cashedDecks
    }

    state = {
        decks: this.getDecks(),
        page: 1,
    }

    changeText = (event) => {
        if (event.target.value === "") {
            this.setState({decks: this.getDecks()})
            return;
        }
        if (GS.session.isOnline) {
            let decksFound = GS.searchDecks(this.props.username)
            this.setState({decks: decksFound})
            return
        }
        let decksFound = GS.session.cashedDecks.filter(deck => deck.name.toLowerCase().includes(event.target.value.toLowerCase()));
        this.setState({decks: decksFound})

    }

    render() {
        if (GS.session.username !== this.props.username && !GS.session.isOnline)
            return <Redirect to="/not-found" noThrow/>;
        if (!GS.getUser(this.props.username))
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
                    My decks :
                    </span>
                </Paper>

                <Grid container spacing={2}>
                    {this.renderDecks(this.state.page)}
                </Grid>
                <Paper className="titlePaperWide paginationHandle">
                    <Pagination count={Math.ceil(GS.session.cashedDecks.length / CARDS_PER_PAGE)} variant="outlined"
                                onChange={(event, number) => this.setState({page: number})}
                    />
                </Paper>
            </div>
        </div>
    }

    renderDecks(page) {
        let decks = this.state.decks.map((deck, uniqId) => {
            return <Grid item xs={12} sm={6} lg={3} key={uniqId}>
                <DeckCard deck={deck}/>
            </Grid>
        })
        return decks.slice((page - 1) * CARDS_PER_PAGE, (page) * CARDS_PER_PAGE)
    }


}
