import "./CardEditDialog.css"
import React, {useRef} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextareaAutosize from "@material-ui/core/TextareaAutosize";

export default function CardEditDialog(props) {
    let inputRef = useRef(null)
    const close = () => {
        props.editDialogIsOpened(false)
    }

    const saveAndClose = () => {
        props.setText(inputRef.current.value)
        close()
    }

    return <Dialog scroll="paper" fullWidth={true} open={props.open} onClose={close}>
        <DialogTitle>Save</DialogTitle>
        <DialogContent>
            <TextareaAutosize ref={inputRef} className="input" defaultValue={props.textfield}/>
        </DialogContent>
        <DialogActions>
            <Button color="primary" onClick={close}>
                Cancel
            </Button>
            <Button color="primary" onClick={saveAndClose}>
                Save
            </Button>
        </DialogActions>
    </Dialog>

}