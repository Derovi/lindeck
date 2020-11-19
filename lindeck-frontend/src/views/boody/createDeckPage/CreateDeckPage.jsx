import React, {useRef} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import "./CreateDeckPage.css"
import {navigate} from "@reach/router";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import makeStyles from "@material-ui/core/styles/makeStyles";
import TextField from "@material-ui/core/TextField";
import GlobalStorage from "../../../common/GlobalStorage";


const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

let GS = new GlobalStorage()

export default function CreateDeckPage(props) {
    const classes = useStyles();
    const nameRef = useRef(null);
    const descriptionRef = useRef(null);
    const [height, setHeight] = React.useState(100);
    const [cols, setCols] = React.useState(6);
    const [nameError, setNameError] = React.useState("");


    const [open, setOpen] = React.useState(false);
    const handleToggle = () => {
        setOpen(!open);
    };


    function selectCols(event) {
        setCols(event.target.value)
    }

    function selectHeight(event) {
        setHeight(event.target.value)
    }


    function checkForm() {
        let error = GS.newDeckNameIsPossible(props.username, nameRef.current.value)
        if (error === "") {
            handleToggle()
            GS.createNewDeckWithSettings({
                owner: props.username, uniqueId: 42, cols: parseInt(cols), rowHeight: parseInt(height),
                name: nameRef.current.value, description: descriptionRef.current.value
            })
            navigate('/user/' + props.username + "/deck/" + nameRef.current.value)
            return
        }
        setNameError(error)
    }

    return <>
        <div className="backGroundImage" style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1603657886780-a9369c8433f4?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max)'
        }}/>
        <Dialog className="wrapperCreate" fullWidth={true} open={true}>
            <DialogTitle className="centerField ">Deck creation</DialogTitle>
            <DialogContent className="mainPaperCreate ">
                <TextField defaultValue={props.username + "Deck"} error={nameError !== ""} helperText={nameError}
                           inputRef={nameRef} inputProps={{
                    maxLength: 20,
                }} className="centerField" label="Deck Name"/>
                <br/>
                <TextField defaultValue={"my loved deck"} inputRef={descriptionRef} inputProps={{
                    maxLength: 20,
                }} className="centerField" label="Describe "/>
                <br/>
                <br/>
                <FormControl className="formControlCreate">
                    <InputLabel>maxWidth</InputLabel>
                    <Select autoFocus value={cols} onChange={selectCols}>
                        <MenuItem value="2">2</MenuItem>
                        <MenuItem value="4">4</MenuItem>
                        <MenuItem value="6">6</MenuItem>
                        <MenuItem value="12">12</MenuItem>
                        <MenuItem value="20">20</MenuItem>
                    </Select>
                </FormControl>
                <FormControl className="formControlCreate">
                    <InputLabel> RowHeight</InputLabel>
                    <Select autoFocus value={height} onChange={selectHeight}>
                        <MenuItem value="300">300</MenuItem>
                        <MenuItem value="240">240</MenuItem>
                        <MenuItem value="100">100</MenuItem>
                        <MenuItem value="60">60</MenuItem>
                        <MenuItem value="30">30</MenuItem>
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => navigate('/user/' + props.username)}>Close</Button>
                <Button onClick={() => checkForm()}> Start </Button>
            </DialogActions>

            <Backdrop className={classes.backdrop} open={open}>
                <CircularProgress color="inherit"/>
            </Backdrop>
        </Dialog></>
}