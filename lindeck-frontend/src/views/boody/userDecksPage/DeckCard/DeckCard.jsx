import "./DeckCard.css"
import React from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Controller from "../../../../common/classes/ControllerObject";
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import {navigate} from "@reach/router";

export default class DeckCard extends React.Component {
    render() {
        let deck = this.props.deck
        return <Paper className="deckCardHandler" style={{background: deck.background}}>
            <Grid container>
                <Grid container item md={12}>
                    <Grid item xs={6} lg={12} container>
                        <Grid item xs={12} style={{background: "gainsboro"}}>
                            <Typography gutterBottom variant="overline" className="deckCardText">
                                Owner : {Controller.getUserById(deck.ownerId).username}
                            </Typography>
                        </Grid>

                        <Grid item xs={12} style={{background: "#ececec"}}>
                            <Typography gutterBottom variant="overline" className="deckCardText">
                                Name : {deck.name}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item xs={6} lg={12} style={{background: "#f3f3f3"}}>
                        <Typography gutterBottom variant="overline" className="deckCardText">
                            {deck.description}
                        </Typography>
                    </Grid>
                </Grid>
                <div style={{width: "100%"}}>
                    {Controller.session.isActive && this.renderControlButtons(deck)}
                </div>
                {deck.privacy === "private" && <VisibilityOffIcon className="deckIcon" color="primary"/>}
            </Grid>
        </Paper>

    }

    renderControlButtons = (deck) => {
        this.props.deck.canDelete(Controller.session.id)
        return <> {this.props.deck.canEdit(Controller.session.id) && this.renderEditButton(deck)}
            {this.props.deck.canDelete(Controller.session.id) && this.renderDeleteButton(deck)}
            {this.props.deck.canSee(Controller.session.id) && this.renderSeeButton(deck)}
        </>
    }

    renderDeleteButton = (deck) => {
        return <Button className="deckCardButton" variant="contained" color="secondary" onClick={() => {
            this.props.delete(deck.uuid)
        }}> Delete </Button>;
    }

    renderEditButton = (deck) => {
        return <Button className="deckCardButton" variant="contained"
                       onClick={() => {
                           navigate('/user/' + Controller.getUserById(deck.ownerId).username + "/deck/" + deck.name + "/edit")
                       }}> Edit </Button>
    }

    renderSeeButton = (deck) => {
        return <Button className="deckCardButton" variant="contained" color="primary"
                       onClick={() => {
                           navigate('/user/' + Controller.getUserById(deck.ownerId).username + "/deck/" + deck.name + "/view")
                       }}>See </Button>
    }

}