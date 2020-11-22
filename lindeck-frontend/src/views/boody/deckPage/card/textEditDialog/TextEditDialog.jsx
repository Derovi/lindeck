import "./TextEditDialog.css"
import React, {useRef} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextareaAutosize from "@material-ui/core/TextareaAutosize";

export default function TextEditDialog(props) {
    let inputRef = useRef(null)
    let inputAnswerRef = useRef(null)
    const close = () => {
        props.openTextEditDialog(false)
    }

    const saveAndClose = () => {
        props.setText(inputRef.current.value)
        if (props.needAnswer) {
            props.setAnswer(inputAnswerRef.current.value)
        }
        close()
    }

    return <Dialog scroll="paper" fullWidth={true} open={props.open} onClose={close}>
        <span className="stylishText dialogTitle">Text card edit</span>
        <DialogContent>
            <span className="stylishTextSmaller"> Text : </span>
            <TextareaAutosize ref={inputRef} className="inputCardText" defaultValue={props.textField}/>
            {props.needAnswer && <><span className="stylishTextSmaller"> Answer : </span>
                <TextareaAutosize ref={inputAnswerRef} className="inputCardAnswer" defaultValue={props.answer}/></>}
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