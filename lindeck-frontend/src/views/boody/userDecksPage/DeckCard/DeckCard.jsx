import "./DeckCard.css"
import React from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import GS from "../../../../common/classes/GlobalStorage";
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import {navigate} from "@reach/router";

export default class DeckCard extends React.Component {
    constructor(props) {
        super(props)
        if (GS.session.isActive) {
            this.state = {
                canDelete: (GS.session.id === this.props.deck.ownerId),
                canEdit: (GS.session.id === this.props.deck.ownerId)
            }
        }
    }

    render() {
        let deck = this.props.deck
        return <Paper className="deckCardHandler">
            <Grid container>
                <Grid container item md={12}>
                    <Grid item xs={6} lg={12} container>
                        <Grid item xs={12} style={{background: "gainsboro"}}>
                            <Typography gutterBottom variant="overline" className="deckCardText">
                                Owner : {GS.getUserById(deck.ownerId).username}
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
                    {GS.session.isActive && this.renderControlButtons(deck)}
                </div>
                {deck.privacy === "private" && <VisibilityOffIcon color="primary"/>}
            </Grid>
        </Paper>

    }

    renderControlButtons = (deck) => {
        return <> {this.state.canEdit && this.renderEditButton(deck)}
            {this.state.canDelete && this.renderDeleteButton(deck)}
            {this.renderSeeButton(deck)}
        </>
    }

    renderDeleteButton = (deck) => {
        return <Button className="deckCardButton" variant="contained" color="secondary" onClick={() => {
            this.setState({canDelete: false})
            this.props.delete(deck.uuid)
        }}> Delete </Button>;
    }

    renderEditButton = (deck) => {
        return <Button className="deckCardButton" variant="contained"> Edit </Button> // TODO EDIT button
    }

    renderSeeButton = (deck) => {
        return <Button className="deckCardButton" variant="contained" color="primary" onClick={() => {
            navigate('/user/' + GS.getUserById(deck.ownerId).username + "/deck/" + deck.name)
        }}> See </Button>;
    }
}