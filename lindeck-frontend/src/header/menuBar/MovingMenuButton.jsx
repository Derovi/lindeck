import React, {Component} from "react";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import InboxIcon from '@material-ui/icons/MoveToInbox';
import IconButton from "@material-ui/core/IconButton";
import {Directions} from "@material-ui/icons";

const styles = {
    menu: {
        background:"red",
    }
}

class MovingMenuButton extends Component {
    state = {
        drawerOpen: false
    }
    toggleDrawer = (open, event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        this.setState({drawerOpen: open});
    };

    list = () => (
        <div
            role="presentation"
            onClick={ev => this.toggleDrawer(false, ev)}
            onKeyDown={ev => this.toggleDrawer(false, ev)}>
            <List>
                <ListItem button>
                    <ListItemIcon onClick={() => this.props.history.push('/deck')}> <InboxIcon/> </ListItemIcon>
                    <ListItemText onClick={() => this.props.history.push('/deck')} primary={"My last deck"}/>
                </ListItem>
            </List>
            <Divider/>
            <List>
                <ListItem button>
                    <ListItemIcon onClick={() => this.props.history.push('/decklibrary')}> <InboxIcon/> </ListItemIcon>
                    <ListItemText onClick={() => this.props.history.push('/decklibrary  ')} primary={"Deck library"}/>
                </ListItem>
            </List>
        </div>
    );

    render() {
        return <>
            <IconButton onClick={() => this.toggleDrawer(true)}
                        edge="start" color="inherit" aria-label="menu">
                <Directions/>
            </IconButton>
            <SwipeableDrawer  open={this.state.drawerOpen}
                             onClose={() => this.toggleDrawer(false)} onOpen={() => this.toggleDrawer(true)}>
                {this.list()}
            </SwipeableDrawer>
        </>
    }
}

export default MovingMenuButton;