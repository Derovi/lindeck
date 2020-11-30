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
import FormHelperText from "@material-ui/core/FormHelperText";


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
            {card.id}
            <FormControl>
                <InputLabel shrink>
                    Type
                </InputLabel>
                <Select value={card.type} onChange={e => change(e, "type")} displayEmpty>
                    <MenuItem value={"turning"}>turning</MenuItem>
                    <MenuItem value={"answer"}>answer</MenuItem>
                    <MenuItem value={"default"}>default</MenuItem>
                </Select>
                <FormHelperText>Select type of card</FormHelperText>
            </FormControl><br/>
        </>
    }

    let generateCenterText = () => {
        return <>
            <span className="stylishTextSmaller"> Text : </span>
            <TextareaAutosize onChange={e => change(e, "textField")}
                              className="inputCardText" defaultValue={card.textField}/>

            {card.isOfType("turning") && <><span className="stylishTextSmaller"> Answer : </span>
                <TextareaAutosize onChange={e => change(e, "secondTextField")}
                                  className="inputCardText" defaultValue={card.secondTextField}/>
            </>}

            {card.isOfType("answer") && <><span className="stylishTextSmaller"> Answer : </span>
                <TextareaAutosize onChange={e => change(e, "answer")} className="inputCardAnswer"
                                  defaultValue={card.answer}/></>}
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
            <Button color="primary" onClick={saveAndClose}>
                Save
            </Button>
        </DialogActions>
    </Dialog>

}