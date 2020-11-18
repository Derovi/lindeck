import React from 'react';
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

export default function DeckEditDialog(props) {
    const oldValueOfHeight = props.deckSettings.rowHeight
    const oldValueOfCols = props.deckSettings.cols
    const [height, setHeight] = React.useState(props.deckSettings.rowHeight);
    const [cols, setCols] = React.useState(props.deckSettings.cols);

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
        props.saveDeckProps(cols, height)
        close()
    }

    const createWarnings = () => {
        return <div>
            {(oldValueOfCols > cols) && <span style={{color: "brown"}}>
                The grid will reset, cause of cols decreasing.<br/>
            </span>
            }
            {(oldValueOfHeight !== height) && <span style={{color: "brown"}}>
                To apply height change - reload the page.<br/>
            </span>}
        </div>
    }

    return <Dialog fullWidth={true} open={props.open} onClose={close}>
        <DialogTitle>Deck Grid Settings</DialogTitle>
        <DialogContent>
            {createWarnings()}
            <FormControl className="formControl">
                <InputLabel>maxWidth</InputLabel>
                <Select autoFocus value={cols} onChange={selectCols}>
                    <MenuItem value="2">2</MenuItem>
                    <MenuItem value="4">4</MenuItem>
                    <MenuItem value="6">6</MenuItem>
                    <MenuItem value="12">12</MenuItem>
                    <MenuItem value="20">20</MenuItem>
                </Select>
            </FormControl>
            <FormControl className="formControl">
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
            <Button onClick={close}>Close</Button>
            <Button onClick={save} color="primary">
                Save
            </Button>
        </DialogActions>
    </Dialog>
}