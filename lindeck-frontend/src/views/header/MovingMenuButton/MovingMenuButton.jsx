import React, {Component} from "react";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import InboxIcon from '@material-ui/icons/MoveToInbox';
import {Directions} from "@material-ui/icons";
import {navigate} from "@reach/router";
import GS from "../../../common/classes/GlobalStorage";


let session = GS.getSession()

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
                <ListItem onClick={() => navigate('/deck')} button>
                    <ListItemIcon> <InboxIcon/> </ListItemIcon>
                    <ListItemText primary={"My last deck"}/>
                </ListItem>
            </List>
            <Divider/>
            <List>
                <ListItem onClick={() => navigate('/decklibrary')} button>
                    <ListItemIcon> <InboxIcon/> </ListItemIcon>
                    <ListItemText primary={"Deck library"}/>
                </ListItem>
                {!session.isActive && <div>
                    <Divider/>
                    <ListItem onClick={() => navigate('/login')} button>
                        <ListItemIcon> <InboxIcon/> </ListItemIcon>
                        <ListItemText primary={"Login"}/>
                    </ListItem>
                    <ListItem onClick={() => navigate('/register')} button>
                        <ListItemIcon> <InboxIcon/> </ListItemIcon>
                        <ListItemText primary={"Register"}/>
                    </ListItem>
                </div>}
            </List>

        </div>
    );

    render() {
        return <>
            <IconButton onClick={() => this.toggleDrawer(true)}
                        edge="start" color="inherit" aria-label="menu">
                <Directions/>
            </IconButton>
            <SwipeableDrawer open={this.state.drawerOpen}
                             onClose={() => this.toggleDrawer(false)} onOpen={() => this.toggleDrawer(true)}>
                {this.list()}
            </SwipeableDrawer>
        </>
    }
}

export default MovingMenuButton;