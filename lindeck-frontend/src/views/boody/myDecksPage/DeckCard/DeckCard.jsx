import "./DeckCard.css"
import React from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import GS from "../../../../common/classes/GlobalStorage";

export default class DeckCard extends React.Component {
    constructor(props) {
        super(props)
        if (GS.session.isActive) {
            this.state = {
                CanDelete: (GS.session.username === this.props.deck.owner)
            }
        }
    }


    render() {
        let deck = this.props.deck
        return <Paper>
            <Typography gutterBottom variant="overline">
                <span className="fontSize20"> {deck.owner}</span>
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm container>
                    <Grid item xs={5} container direction="column" spacing={2}>
                        <Grid item xs>

                            <br/>
                            <Typography color="textSecondary" variant="caption" gutterBottom>
                                <span className="fontSize15">{deck.describe}</span>
                            </Typography>
                        </Grid>
                        <Grid item>
                            {GS.session.cashedUser.username === deck.owner && this.renderEditButton(deck)}
                            {GS.session.cashedUser.deckListId.includes(deck.id) && this.renderDeleteButton(deck)}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>

    }

    renderDeleteButton(deck) {
        return <Button onClick={() => {
            this.setState({CanDelete: false})
            // Delete action GA TODO
        }}> Delete </Button>;
    }


    renderEditButton(deck) {
        return <Button> Edit </Button> // TODO EDIT button
    }
}