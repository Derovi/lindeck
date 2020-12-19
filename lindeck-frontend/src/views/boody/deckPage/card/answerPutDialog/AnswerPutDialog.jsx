import "./AnswerPutDialog.css"
import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import CardObject from "../../../../../common/classes/CardObject";
import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import Checkbox from "@material-ui/core/Checkbox";

let currentAnswer = ""
export default function AnswerPutDialog(props) {

    let card = new CardObject(props.card)
    let [checkedValues, setCheckedValues] = useState([])

    const close = () => {
        props.openInputAnswerDialog(false)
    }
    let onCheck = (e) => {
        let newChecked = [...checkedValues]
        if (e.target.checked) {
            newChecked.push(e.target.value)
        } else {
            newChecked = newChecked.filter(value => value !== e.target.value)
        }

        setCheckedValues(newChecked)
        console.log(newChecked)
    }
    let answerCheck = (answer) => {
        if (card.isAnswerCorrect(answer)) {
            props.changeVerdict(1)
            return 1
        } else {
            props.changeVerdict(-1)
            return -1
        }

    }

    let getIcon = () => {
        let verdict = props.verdict
        if (verdict === 1)
            return <DoneOutlineIcon style={{color: "darkcyan"}}/>
        if (verdict === 0)
            return <HelpOutlineOutlinedIcon style={{color: "#6724f3"}}/>
        if (verdict === -1)
            return <CloseOutlinedIcon style={{color: "darkred"}}/>
    }

    const saveAndClose = () => {
        let verdict = props.verdict
        if (card.answerType === "string")
            verdict = answerCheck([currentAnswer])
        if (card.answerType === "select" || card.answerType === "multiple")
            verdict = answerCheck(checkedValues)
        if (verdict === 1)
            close()
    }

    function hideThisText(answer) {
        let array = answer.split("")
        return "Answer format: " + array.map(letter => letter === " " ? " " : "*").join("")
    }

    let check = (event) => {
        checkedValues = [event.target.value]
        setCheckedValues(checkedValues)
    };

    function renderInput() {
        if (card.answerType === "string")
            return <TextField placeholder={hideThisText(card.answer[0] || "")}
                              onChange={(event) => currentAnswer = event.target.value}
                              className="inputAnswer" variant="filled"
            />
        if (card.answerType === "select")
            return <RadioGroup className="overflowOverlay" value={checkedValues[0] || ""} onChange={check}>
                {card.selectFrom.map((select, key) => <FormControlLabel className="checkBox" key={key} value={select} control={<Radio/>}
                                                                        label={select}/>)}
            </RadioGroup>
        if (card.answerType === "multiple")
            return <div className="overflowOverlay">
                {card.selectFrom.map((value, key) => <FormControlLabel className="checkBox"
                    control={<Checkbox checked={Boolean(checkedValues.includes(value))} onChange={onCheck}
                                       value={value}/>}
                    label={value} key={key}
                />)}
            </div>

    }

    return <Paper className={"answerBlock"}
                  style={{height: props.open ? "4em" : "0"}}>
        {renderInput()}
        <div className="marginRightFlex">
            {getIcon()}
        </div>
        <Button className="marginRightFlex" variant="outlined" color="primary" onClick={saveAndClose}>
            Check
        </Button>
    </Paper>

}