import React from 'react';
import clsx from 'clsx';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
import ThreeSixtypIcon from '@material-ui/icons/ThreeSixty';
import PlusOneIcon from '@material-ui/icons/PlusOne';
import Fab from "@material-ui/core/Fab";
import CreateIcon from "@material-ui/icons/Create";
import SettingsOverscanOutlinedIcon from "@material-ui/icons/SettingsOverscanOutlined";
import LockOpenRoundedIcon from "@material-ui/icons/LockOpenRounded";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    openButton: {
        position: 'fixed',
        bottom: 30,
        right: 30
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        width: "100%",
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginRight: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: 0,
    },
}));

export default function DeckEditMenu(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const openDrawer = () => {
        setOpen(true);
    };

    const closeDrawer = () => {
        setOpen(false);
    };

    function openEditView() {
        closeDrawer();
        props.openEditDeckDialog(true)
    }

    function addDefaultCard() {
        props.addCard({
            type: "default", textfield: "", isFlipped: false, id: "0"
        })
    }

    function addTurningCard() {
        props.addCard({
            type: "turing", textfield: "", secondfield: "", isFlipped: false, id: "0"
        })
    }

    function addAnswerCard() {
        props.addCard({
            type: "answer", textfield: "", secondfield: "", answer: "", answered: 0, isFlipped: false, id: "0"
        })
    }

    return <div className={classes.root}>
        <div className={clsx(classes.content, {[classes.contentShift]: open})}>
            {props.children}

            <Fab onClick={openDrawer} className={clsx(open && classes.hide, classes.openButton)}>
                <CreateIcon/>
            </Fab>
        </div>

        <SwipeableDrawer className={classes.drawer} anchor="right" open={open} onClose={() => setOpen(false)}
                         classes={{paper: classes.drawerPaper}} onOpen={() => setOpen(true)}>
            <div>
                <IconButton onClick={closeDrawer}>
                    <ChevronRightIcon/>
                </IconButton>
            </div>
            <Divider/>
            <List>
                <ListItem button>
                    <ListItemIcon><LockOpenRoundedIcon/></ListItemIcon>
                    <ListItemText primary={"Login"}/>
                </ListItem>
            </List>
            <Divider/>
            <List>
                <ListItem button onClick={openEditView}>
                    <ListItemIcon> <SettingsOverscanOutlinedIcon/> </ListItemIcon>
                    <ListItemText primary={"Edit grid view"}/>
                </ListItem>
                <ListItem button onClick={addDefaultCard}>
                    <ListItemIcon> <PlusOneIcon/></ListItemIcon>
                    <ListItemText primary={"Create Default Card"}/>
                </ListItem>
                <ListItem button onClick={addTurningCard}>
                    <ListItemIcon> <PlusOneIcon/></ListItemIcon>
                    <ListItemText primary={"Create Turning Card"}/>
                </ListItem>
                <ListItem button onClick={addAnswerCard}>
                    <ListItemIcon> <PlusOneIcon/></ListItemIcon>
                    <ListItemText primary={"Create Answer Card"}/>
                </ListItem>
                <ListItem button onClick={props.resetLayout}>
                    <ListItemIcon> <ThreeSixtypIcon/> </ListItemIcon>
                    <ListItemText primary={"Reset Card Grid"}/>
                </ListItem>
                <ListItem button onClick={props.clearAll}>
                    <ListItemIcon> <DeleteSweepIcon/> </ListItemIcon>
                    <ListItemText primary={"Delete all"}/>
                </ListItem>
            </List>
        </SwipeableDrawer>
    </div>
}