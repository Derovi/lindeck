import "./AnswerEditDialog.css"
import React, {useRef, useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from "@material-ui/core/TextField";

export default function AnswerEditDialog(props) {
    let currentAnswer = ""
    const close = () => {
        props.openInputAnswerDialog(false)
    }

    const saveAndClose = () => {
        props.answerCheck(currentAnswer)
        close()
    }

    function hideThisText(answer) {
        let array = answer.split("")
        return array.map(letter => letter === " " ? " " : "*").join("")
    }

    return <Dialog scroll="paper" fullWidth={true} open={props.open} onClose={close}>
        <span className="stylishText dialogTitle">Put your answer</span>
        <DialogContent>
            <TextField label="Answer" placeholder={hideThisText(props.answer)} fullWidth
                       onChange={(event) => currentAnswer = event.target.value}
                       variant="outlined"
            />
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