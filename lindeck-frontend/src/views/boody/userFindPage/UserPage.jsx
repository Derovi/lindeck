import React from "react";

import "./UserPage.css"
import Paper from "@material-ui/core/Paper";
import GS from "../../../common/classes/GlobalStorage";
import {Redirect} from "@reach/router";
import UserCard from "../userPage/userCard/UserCard";
import TextField from "@material-ui/core/TextField";


export default class UserFindPage extends React.Component {
    state = {
        input: ""
    }

    render() {
        return <div className="rootUserPage backGroundImage">

            <Paper className="titleInputPaper">
                <TextField
                    label="Label"
                    placeholder="Placeholder"
                    helperText="Full width!"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                />
            </Paper>


            <Paper className="titlePaper">
                <span>
                    Users :
                </span>
            </Paper>
            {this.generateFound(this.state.input)}
        </div>
    }

    generateFound = (followingArray) => {
        return ""
        return followingArray.map((userNameToFollow, uniqId) => {
            let user = GS.getUser(userNameToFollow)
            return <UserCard user={user} key={uniqId} isMe={GS.getSession().isMe(user.username)}/>
        })
    }
}
