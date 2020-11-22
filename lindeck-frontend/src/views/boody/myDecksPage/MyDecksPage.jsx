import React from "react";

import "./MyDecksPage.css"
import Paper from "@material-ui/core/Paper";
import GS from "../../../common/classes/GlobalStorage";
import UserCard from "../userPage/userCard/UserCard";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import DeckCard from "./DeckCard/DeckCard";


export default class MyDecksPage extends React.Component {
    state = {
        decks: []
    }

    changeText = (event) => {
        let decksFound = GS.session.myDecks.filter(deck => deck.name.toLowerCase().includes(event.target.value.toLowerCase()));
        this.setState({decks: decksFound})
    }

    render() {
        return <div className="rootUserPage backGroundImage">
            <Paper className="titleInputPaper">
                <TextField label="Label" placeholder="Placeholder"
                           helperText="Full width!" fullWidth
                           margin="normal" InputLabelProps={{shrink: true}}
                           variant="outlined" onChange={this.changeText}/>
            </Paper>

            <Paper className="titlePaper">
                <span>
                    My decks :
                    </span>}
            </Paper>

            {this.state.decks.map((deck, uniqId) => {
                return <DeckCard deck={deck} key={uniqId}/>
            })}
            <Pagination count={10} shape="rounded"/>
        </div>
    }

}
