import "./UserCard.css"
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

export default class UserCard extends React.Component {

    render() {
        let user = this.props.user
        return <Paper className="userPaper">
            <Grid container spacing={2}>
                <Grid item>
                    <ButtonBase className="imageHolderAva" onClick={() => this.props.history.push('/user')}>
                        <img className="imageAva" src={user.image} alt={"ava"}/>
                    </ButtonBase>
                </Grid>
                <Grid item xs={12} sm container>
                    <Grid item xs={5} container direction="column" spacing={2}>
                        <Grid item xs>
                            <Typography gutterBottom variant="overline">
                                {user.username}
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                                {user.discribe}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                ID: 1030114
                            </Typography>
                        </Grid>
                        <Grid item>
                            {this.props.isMe && <Button>Edit</Button>}
                            {!this.props.isMe && <Button>Unfollow</Button>}
                        </Grid>
                    </Grid>
                    <Grid item xs={7}>
                        {this.createHistory()}
                    </Grid>
                </Grid>
            </Grid>
        </Paper>

    }


    createHistory = () => {
        return <List className="listOfDecks">
            {this.props.user.deckList.map((decks,index) => {
                return <button className="deckSelectButton" style={{background:index%2===0?"gainsboro":"white"}}>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <ViewCarouselIcon/>
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={decks.name} secondary={decks.description}/>
                    </ListItem>
                </button>
            })
            }
        </List>
    }
}