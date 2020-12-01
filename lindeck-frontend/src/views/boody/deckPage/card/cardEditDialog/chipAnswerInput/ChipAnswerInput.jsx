import "./ChipAnswerInput.css"
import Chip from "@material-ui/core/Chip";
import FormHelperText from "@material-ui/core/FormHelperText";
import React, {useState} from "react";
import TextField from "@material-ui/core/TextField";
import CardObject from "../../../../../../common/classes/CardObject";
import {IconButton} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';

export default function ChipAnswerInput(props) {
    let card = new CardObject(props.card)
    let [text, setText] = useState("")
    let deleteThis = (select) => {
        card.deleteSelectFrom(select)
        props.setCard(card)
    }

    let input = (e) => {
        setText(e.target.value)
    }

    let addSelect = () => {
        if (text === "" || card.selectFrom.includes(text))
            return
        let newValue = text
        setText("")
        let newCard = new CardObject(card)
        newCard.addSelectFrom(newValue)
    }

    let keyPressed = (e) => {
        if (e.key === 'Enter') {
            addSelect()
        }

    }

    let check = (value) => {
        card.setAnswer(value)
        props.setCard(card)
    }

    return <><TextField value={text} onChange={input} onKeyPress={keyPressed} label="Standard"/>
        <IconButton onClick={addSelect}> <AddIcon/> </IconButton>
        <FormHelperText>Write answers u want to put</FormHelperText>
        <div className={"chipContainer"}>
            {card.selectFrom.map((value, key) =>
                    <Chip className={"chip"} key={key}
                      label={value}
                      variant="outlined"
                      color={card.inAnswers(value) ? "primary" : "secondary"}
                      onClick={() => check(value)}
                      onDelete={() => deleteThis(value)}
                />
            )}
        </div>

    </>
}
