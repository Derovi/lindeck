import "./CardEditDialog.css"
import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import CardObject from "../../../../../common/classes/CardObject";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import ChipTextInput from "./chipAnswerInput/ChipAnswerInput";


export default function CardEditDialog(props) {
    const [card, setCard] = useState(new CardObject(props.card), () => console.log("lol"))

    let change = (event, field) => {
        let newCard = new CardObject({...card})
        newCard[field] = event.target.value
        setCard(newCard)
    }

    const close = () => {
        props.openTextEditDialog(false)
    }

    const saveAndClose = () => {
        props.setCardMainData(card)
        close()
    }

    let generateTopSettings = () => {
        return <>

            <TextField label="CardName" defaultValue={card.name} onChange={e => change(e, "name")}
                       variant="outlined"/>
            <br/>
            <FormControl className="marginSmall">
                <InputLabel shrink>
                    Type
                </InputLabel>
                <Select value={card.type} onChange={e => change(e, "type")} displayEmpty>
                    <MenuItem value={"turning"}>turning</MenuItem>
                    <MenuItem value={"answer"}>answer</MenuItem>
                    <MenuItem value={"default"}>default</MenuItem>
                </Select>
            </FormControl>

            {card.isOfType("answer") &&
            <FormControl className="marginSmall">
                <InputLabel shrink>
                    Type
                </InputLabel>
                <Select value={card.answerType} onChange={e => change(e, "answerType")} displayEmpty>
                    <MenuItem value={"string"}>String input</MenuItem>
                    <MenuItem value={"select"}>Select one</MenuItem>
                    <MenuItem value={"multiple"}>Select multiple</MenuItem>
                </Select>
            </FormControl>
            }
            <br/>
        </>
    }

    function changeAnswer(e, answerType) {
        let newCard = new CardObject({...card})
        if (answerType === "string") {
            newCard.answer[0] = e.target.value
        }
        console.log(newCard)

        setCard(newCard)
    }

    function generateAnswerInput(answerType) {
        if (answerType === "string")
            return <><span className="stylishTextSmaller"> Answer : </span>
                <TextareaAutosize onChange={e => changeAnswer(e, "string")} className="inputCardAnswer"
                                  defaultValue={card.answer[0]}/></>
        if (answerType === "select" || answerType === "multiple")
            return <><ChipTextInput card={card} setCard={setCard}/> </>

    }

// Answer
    let generateCenterText = () => {
        return <>
            <span className="stylishTextSmaller"> Text : </span>
            <TextareaAutosize onChange={e => change(e, "textField")}
                              className="inputCardText" defaultValue={card.textField}/>

            {card.isOfType("turning") && <><span className="stylishTextSmaller"> Answer : </span>
                <TextareaAutosize onChange={e => change(e, "secondTextField")}
                                  className="inputCardText" defaultValue={card.secondTextField}/>

            </>}

            {card.isOfType("answer") && generateAnswerInput(card.answerType)}
        </>
    }

    return <Dialog scroll="paper" fullWidth={true} open={props.open} onClose={close}>
        <span className="stylishText dialogTitle">Text card edit</span>
        <DialogContent>
            {generateTopSettings()}
            {generateCenterText()}
        </DialogContent>
        <DialogActions>
            <Button color="primary" onClick={close}>
                Cancel
            </Button>
            <Button color="primary" autoFocus={true} onClick={saveAndClose}>
                Save
            </Button>
        </DialogActions>
    </Dialog>

}