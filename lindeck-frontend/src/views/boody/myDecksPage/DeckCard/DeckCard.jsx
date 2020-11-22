import "./DeckCard.css"
import React from "react";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import ButtonBase from "@material-ui/core/ButtonBase";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import Grid from "@material-ui/core/Grid";
import ViewCarouselIcon from "@material-ui/icons/ViewCarousel";
import AddIcon from '@material-ui/icons/Add';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import {navigate} from "@reach/router";
import GS from "../../../../common/classes/GlobalStorage";

export default class DeckCard extends React.Component {
    constructor(props) {
        super(props)
        if (GS.session.isActive) {
            this.state = {
                AmIFollowing: (GS.session.myUser.following.includes(this.props.user.username))
            }
        }
    }

    follow(username, startFollow) {
        GS.myUserFollowing(username, startFollow)
        this.setState({AmIFollowing: startFollow})
    }


    render() {
        let deck = this.props.deck
        return <Paper className="userPaper">
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
                            {GS.session.myUser.username === deck.owner && this.renderEditButton(deck)}
                            {GS.session.myUser.deckListId.includes(deck.id) && this.renderDeleteButton(deck)}
                        </Grid>
                    </Grid>
                    <Grid item xs={7}> {this.decksCreated()}</Grid>
                </Grid>
            </Grid>
        </Paper>

    }

    renderDeleteButton(deck) {
        return <Button onClick={() => {
            this.follow(user.username, true)
        }}> Follow</Button>;
    }


    renderEditButton(deck) {
        return <Button> Edit </Button> // TODO EDIT button
    }
}