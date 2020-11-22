import React from "react";

import "./UserFindPage.css"
import Paper from "@material-ui/core/Paper";
import GS from "../../../common/classes/GlobalStorage";
import UserCard from "../userPage/userCard/UserCard";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";


export default class UserFindPage extends React.Component {
    state = {
        input: "",
        loading: false,
        users: []
    }
    inputValue = ""
    wait = 0

    findMe = () => {
        this.wait -= 1
        if (this.wait === 0) {
            this.setState({loading: false})
            this.setState({users: GS.searchUsers(this.inputValue)})
        }
    }

    changeText = (event) => {
        this.inputValue = event.target.value;
        this.wait += 1
        this.setState({loading: true})
        setTimeout(() => this.findMe(), 900);
    }

    render() {
        return <div className="rootUserPage backGroundImage">
            <Paper className="titleInputPaper inputLoadingHeight">
                <TextField label="Label" placeholder="Placeholder"
                           helperText="Full width!" fullWidth
                           margin="normal" InputLabelProps={{shrink: true}}
                           variant="outlined" onChange={this.changeText}/>
                {this.state.loading && <CircularProgress color="secondary"/>}
            </Paper>

            <Paper className="titlePaper">
                {GS.session.isOnline && < span>
                Users :
                    </span>}
                {!GS.session.isOnline && < span>
                U cant find users while offline mode :
                    </span>}
            </Paper>

            {this.generateFound(this.state.users)}
        </div>
    }

    generateFound = (usersFound) => {
        return usersFound.map((user, uniqId) => {
            return <UserCard user={user} key={uniqId} isMe={GS.session.isMe(user.id)}/>
        })
    }
}
