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
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import GlobalStorage from "../../common/GlobalStorage";


let GS = new GlobalStorage()
let user = GS.getUser(GS.getMyName())

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
                <ListItem onClick={() => this.props.history.push('/deck')} button>
                    <ListItemIcon> <InboxIcon/> </ListItemIcon>
                    <ListItemText primary={"My last deck"}/>
                </ListItem>
            </List>
            <Divider/>
            <List>
                <ListItem onClick={() => this.props.history.push('/decklibrary')} button>
                    <ListItemIcon> <InboxIcon/> </ListItemIcon>
                    <ListItemText primary={"Deck library"}/>
                </ListItem>
                {!user && <div>
                    <Divider/>
                    <ListItem onClick={() => this.props.history.push('/login')} button>
                        <ListItemIcon> <InboxIcon/> </ListItemIcon>
                        <ListItemText primary={"Login"}/>
                    </ListItem>
                    <ListItem onClick={() => this.props.history.push('/register')} button>
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