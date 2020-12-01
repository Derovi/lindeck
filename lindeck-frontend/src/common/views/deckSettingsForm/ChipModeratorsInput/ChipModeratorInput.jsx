import "./ChipModeratorInput.css"
import React, {useRef, useState} from "react";
import CloseIcon from '@material-ui/icons/Close';
import {IconButton} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import Controller from "../../../classes/ControllerObject";

let clearNow = false
let wait = 0
export default function ChipModeratorInput(props) {

    let [loading, setLoading] = useState(false)
    let [possibleVariants, setPossibleVariants] = useState([])
    let [members, setMembers] = useState(props.membersNow.map(id => {
        let user = Controller.getUserById(id)
        return {id: user.id, username: user.username}
    }))
    let [inputText, setInputText] = useState("42")

    function remove(nameToRemove) {
        let newMembers = members.filter(usedName => usedName.username !== nameToRemove)
        setMembers(newMembers)
        props.setMembers(newMembers.map(member => member.id))
    }

    function addUser(username) {
        if (members.filter(user => user.username === username).length === 0) {
            let newMembers = [...members]
            newMembers.push(possibleVariants.filter(user => user.username === username)[0])
            setMembers(newMembers);
            props.setMembers(newMembers.map(member => member.id))
        }
    }

    function getPossibleVariants() {
        if (loading || inputText === "") {
            return []
        }
        return possibleVariants
            .filter(user => user.id !== Controller.session.id)
            .map((user) => user.username)

    }

    let loadData = (input) => {
        setLoading(false)
        setPossibleVariants(Controller.searchUser(input).map(user => {
            return {id: user.id, username: user.username}
        }))
    }

    return <div>
        <div className="searchField">
            <Autocomplete
                options={getPossibleVariants()} inputValue={inputText}
                onInputChange={(event, newInputValue) => {
                    setInputText(newInputValue);

                    if (newInputValue === "") {
                        loadData(newInputValue)
                        return
                    }
                    setLoading(true)
                    wait += 1
                    setTimeout(() => {
                        wait -= 1
                        if (!wait) {
                            loadData(newInputValue)
                        }
                    }, 1000);
                }}

                loading={loading}
                onChange={(event, newValue) => {
                    if (newValue === null)
                        return

                    addUser(newValue)
                    clearNow = true
                }}
                renderInput={(params) => <TextField variant="outlined" {...params}/>


                }/>


            {members.map((user, key) => <div key={key} className="chip">
                {user.username}
                <IconButton onClick={() => remove(user.username)} size="small"> <CloseIcon/></IconButton>
            </div>)}
        </div>


    </div>

}
