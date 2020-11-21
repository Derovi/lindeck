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
import AddIcon from '@material-ui/icons/Add';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import {navigate} from "@reach/router";
import GS from "../../../../common/classes/GlobalStorage";

export default class UserCard extends React.Component {
    session = GS.getSession()
    state = {}

    constructor(props) {
        super(props)
        if (this.session.isActive) {
            this.state = {
                isFollowing: (this.props.user.username in GS.getUserFollowing(this.session.username))
            }
        }
    }

    follow(username, startFollow) {
        GS.myUserFollowing(username, startFollow)
        this.setState({following: !startFollow})
    }


    render() {
        let user = this.props.user
        return <Paper className="userPaper">
            <Grid container spacing={2}>
                <Grid item> {this.userImage(user)} </Grid>
                <Grid item xs={12} sm container>
                    <Grid item xs={5} container direction="column" spacing={2}>
                        <Grid item xs>
                            <Typography gutterBottom variant="overline">
                                <span className="fontSize20">{user.username}</span>
                            </Typography>
                            <br/>
                            <Typography color="textSecondary" variant="caption" gutterBottom>
                                <span className="fontSize15">{user.describe}</span>
                            </Typography>
                        </Grid>
                        <Grid item>
                            {!this.props.isMe && this.followUnfollow(user)}
                            {this.props.isMe && this.describeButton(user)}
                        </Grid>
                    </Grid>
                    <Grid item xs={7}> {this.decksCreated()}</Grid>
                </Grid>
            </Grid>
        </Paper>

    }

    userImage = (user) => {
        return <div className="image-upload">
            {!this.props.isMe &&
            <ButtonBase className="imageHolderAva"
                        onClick={() => {
                            navigate('/user/' + user.username)
                        }}>
                <img className="imageAva" src={user.image} alt={"ava"}/>
            </ButtonBase>
            }
            {this.props.isMe && <><ButtonBase className="imageHolderAva">
                <label htmlFor="file-input">
                    <img className="imageAva" src={user.image} alt={"ava"}/>
                </label>
            </ButtonBase>
                <input id="file-input" type="file"/></> // TODO get img url and use it
            }
        </div>
    }

    decksCreated = () => {
        let deckSaw = 0
        return <List className="listOfDecks">
            {this.props.user.deckListId
                .map(deckId => GS.getDeckById(deckId))
                .filter(deck => deck.canSee(this.session.username))
                .map((deck, uniqId) => {
                    deckSaw += 1
                    return <button key={uniqId} className="deckSelectButton"
                                   style={{background: uniqId % 2 === 0 ? "gainsboro" : "white"}}>
                        <ListItem
                            onClick={() => navigate('/user/' + this.props.user.username + "/deck/" + deck.name)}>
                            <ListItemAvatar>
                                <Avatar> {deck.privacy === "private" ? <VisibilityOffIcon/> :
                                    <ViewCarouselIcon/>}</Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={deck.name} secondary={deck.description}/>

                        </ListItem>
                    </button>
                })
            }

            {this.props.isMe && <button className="deckSelectButton"
                                        style={{background: this.props.user.deckListId.length % 2 === 0 ? "gainsboro" : "white"}}>
                <ListItem onClick={() => navigate('/user/' + this.props.user.username + "/deck-build")}>
                    <ListItemAvatar>
                        <Avatar>
                            <AddIcon/>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Create new Deck" secondary="write now"/>
                </ListItem>
            </button>
            }
            {deckSaw === 0 && <ListItem>
                <Typography variant="overline" color="textSecondary">
                    There is no deck created yest.
                </Typography></ListItem>}
        </List>
    }

    followUnfollow(user) {
        if (this.session.isActive) {
            if (this.state.isFollowing) {
                return <Button onClick={() => {
                    this.follow(user.username, true)
                }}> Follow</Button>;
            }
            return <Button onClick={() => {
                this.follow(user.username, false)
            }}> Unfollow</Button>;
        }
    }

    describeButton(user) {
        return <Button> Edit </Button> // TODO EDIT button
    }
}