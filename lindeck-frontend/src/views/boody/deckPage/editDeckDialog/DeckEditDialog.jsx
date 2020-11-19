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
import "./DeckEditDialog.css"
import TextField from "@material-ui/core/TextField";
import {Typography} from "@material-ui/core";

export default function DeckEditDialog(props) {
    const oldValueOfCols = props.deck.cols
    const [height, setHeight] = React.useState(props.deck.rowHeight);
    const [cols, setCols] = React.useState(props.deck.cols);
    const descriptionRef = useRef(null);

    const close = () => {
        props.openDeckEditDialog(false);
    };

    function selectCols(event) {
        setCols(event.target.value)
    }

    function selectHeight(event) {
        setHeight(event.target.value)
    }

    function save() {
        props.saveDeckProps(descriptionRef.current.value, cols, height)
        close()
    }

    const createWarnings = () => {
        return <div>
            {(oldValueOfCols > cols) && <span style={{color: "brown"}}>
                The grid will reset, cause of cols decreasing.<br/>
            </span>
            }
        </div>
    }

    return <Dialog className="wrapperCreate" fullWidth={true} open={props.open} onClose={close}>
        <DialogTitle>Deck Grid Settings</DialogTitle>
        <DialogContent className="mainPaperCreate ">
            <div className="centerField"><h1 className="betterFont">
                {props.deck.name}
            </h1></div>
            <br/>
            <TextField defaultValue={props.deck.description} inputRef={descriptionRef} inputProps={{
                maxLength: 20,
            }} className="centerField" label="Describe "/>
            <br/>
            {createWarnings()}
            <FormControl className="formControl">
                <InputLabel>maxWidth</InputLabel>
                <Select autoFocus value={cols} onChange={selectCols}>
                    {["2", "4", "6", "12", "20"].map((str, uniqId) =>
                        <MenuItem key={uniqId} value={str}>{str}</MenuItem>
                    )}
                </Select>
            </FormControl>
            <FormControl className="formControl">
                <InputLabel> RowHeight</InputLabel>
                <Select autoFocus value={height} onChange={selectHeight}>
                    {["400", "300", "240", "100", "60"].map((str, uniqId) =>
                        <MenuItem key={uniqId} value={str}>{str}</MenuItem>
                    )}
                </Select>
            </FormControl>
        </DialogContent>
        <DialogActions>
            <Button onClick={close}>Close</Button>
            <Button onClick={save}> Save</Button>
        </DialogActions>
    </Dialog>
}