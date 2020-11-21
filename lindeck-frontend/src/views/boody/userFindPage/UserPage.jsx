import React from "react";

import "./UserPage.css"
import Paper from "@material-ui/core/Paper";
import GS from "../../../common/classes/GlobalStorage";
import UserCard from "../userPage/userCard/UserCard";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";


export default class UserFindPage extends React.Component {
    state = {
        input: "",
        wait: 0,
        users:[]
    }
    inputValue = ""


    findMe = () => {
        this.state.wait-=1
        if (this.state.wait === 0) {
            this.setState({wait: 0})
            this.setState({users:GS.searchUsers(this.inputValue)})
            console.log("SEARCH")

        }
    }

    changeText = (event) => {
        this.inputValue = event.target.value;
        this.setState({wait: (this.state.wait + 1)})

        setTimeout(() => this.findMe(), 900);
    }

    render() {
        return <div className="rootUserPage backGroundImage">
            <Paper className="titleInputPaper">
                <TextField label="Label" placeholder="Placeholder"
                           helperText="Full width!" fullWidth
                           margin="normal" InputLabelProps={{shrink: true}}
                           variant="outlined" onChange={this.changeText}/>
                {this.state.wait !== 0 && <CircularProgress color="secondary"/>}

            </Paper>


            <Paper className="titlePaper">
                <span>
                    Users :
                </span>
            </Paper>

            {this.generateFound(this.state.users)}
        </div>
    }

    generateFound = (usersFound) => {
        return usersFound.map((user, uniqId) => {
            return <UserCard user={user} key={uniqId} isMe={GS.getSession().isMe(user.username)}/>
        })
    }
}
