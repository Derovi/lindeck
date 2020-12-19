import React from 'react';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
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
import {navigate} from "@reach/router";
import BuildIcon from '@material-ui/icons/Build';
import TvIcon from '@material-ui/icons/Tv';
import {Github} from "react-color/lib/components/github/Github";

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
    const [openColor, setOpenColor] = React.useState(false);

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
            type: "default", textField: "", id: "0"
        })
    }

    function addTurningCard() {
        props.addCard({
            type: "turning", textField: "", id: "0"
        })
    }

    function addAnswerCard() {
        props.addCard({
            type: "answer", textField: "", secondTextField: "", answer: "", id: "0"
        })
    }

    function renderEditButtons() {
        return <List>
            <ListItem button onClick={openEditView}>
                <ListItemIcon> <SettingsOverscanOutlinedIcon/> </ListItemIcon>
                <ListItemText primary={"Deck settings"}/>
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
            <ListItem button onClick={() => setOpenColor(!openColor)}>
                <ListItemIcon> <DeleteSweepIcon/> </ListItemIcon>
                <ListItemText primary={"Set background Color"}/>
            </ListItem>
            {openColor && <div className={"colorHandler"}>
                <Github onChange={props.setColor}
                        colors={ ['#2529ff', '#2e50ff', '#4574ff',
                            '#142cff', '#232323', '#3b3b3b','#797979',
                            '#b2ff18', '#c1ff59', '#d7ff88',
                            '#e7f3ff', '#d7d7d7', '#adadad',
                            '#df95ff', '#d274ff', '#bc52fd',
                        ]}/>
            </div>}
        </List>
    }

    function renderViewButtons() {
        return <List>
            <ListItem button>
                <ListItemIcon> <DeleteSweepIcon/> </ListItemIcon>
                <ListItemText primary={"Restart"}/>
            </ListItem>



        </List>
    }

    return <div className={classes.root} >
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
                <ListItem button onClick={() => {
                    navigate("/user/" + props.ownerAndDeckNames.ownerName)
                }}>
                    <ListItemIcon><LockOpenRoundedIcon/></ListItemIcon>
                    <ListItemText primary={"Owner:" + props.ownerAndDeckNames.ownerName}/>
                </ListItem>

                <ListItem button onClick={() => {
                    navigate("/user/" + props.ownerAndDeckNames.ownerName +
                        "/deck/" + props.ownerAndDeckNames.deckname + (props.isEdit ? "/view" : "/edit"))
                }}>
                    <ListItemIcon>{props.isEdit ? <TvIcon/> : <BuildIcon/>}</ListItemIcon>
                    <ListItemText primary={"Go to " + (props.isEdit ? "view" : "edit") + " mode"}/>
                </ListItem>
            </List>
            <Divider/>
            {props.isEdit && renderEditButtons()}
            {!props.isEdit && renderViewButtons()}

        </SwipeableDrawer>
    </div>
}