import React from "react";

import "./UserPage.css"
import GlobalStorage from "../../common/GlobalStorage";
import UserCard from "./userCard/UserCard";
import Paper from "@material-ui/core/Paper";

let GS = new GlobalStorage()
const user = GS.getUser(GS.getMyName());

export default class UserPage extends React.Component {

    render() {
        return <div className="rootUserPage backGroundImage">
            {user && <><UserCard history={this.props.history} user={user} isMe={true}/>
                <Paper className="titlePaper">
                <span>
                Following
                </span>
                </Paper>
                {this.followingGenerate(user.following)}</>}
        </div>
    }

    followingGenerate = (following) => {
        return following.map((user, number) => <UserCard history={this.props.history} user={user} key={number}
                                                         isMe={false}/>)
    }
}
