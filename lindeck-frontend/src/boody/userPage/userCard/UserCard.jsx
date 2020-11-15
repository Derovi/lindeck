import Grid from "@material-ui/core/Grid";
import ButtonBase from "@material-ui/core/ButtonBase";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import React from "react";
import Button from "@material-ui/core/Button";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ViewCarouselIcon from "@material-ui/icons/ViewCarousel";
import ListItemText from "@material-ui/core/ListItemText";

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
                    <Grid item xs container direction="column" spacing={2}>
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
                            <Button variant="body2">
                                Edit
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid item>
                        {this.createHistory()}
                    </Grid>
                </Grid>
            </Grid>
        </Paper>

    }


    createHistory = () => {
        return <List>
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <ViewCarouselIcon/>
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Photos" secondary="Jan 9, 2014"/>
            </ListItem>
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <ViewCarouselIcon/>
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Work" secondary="Jan 7, 2014"/>
            </ListItem>
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <ViewCarouselIcon/>
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Vacation" secondary="July 20, 2014"/>
            </ListItem>
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <ViewCarouselIcon/>
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Vacation" secondary="July 20, 2014"/>
            </ListItem>
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <ViewCarouselIcon/>
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Vacation" secondary="July 20, 2014"/>
            </ListItem>
        </List>
    }
}