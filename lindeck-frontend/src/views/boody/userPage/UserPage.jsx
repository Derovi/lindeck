import React from "react";

import "./UserPage.css"
import UserCard from "./userCard/UserCard";
import Paper from "@material-ui/core/Paper";
import GS from "../../../common/classes/GlobalStorage";


export default class UserPage extends React.Component {
    username = this.props.username
    user = GS.getUser(this.username)

    updateUrl() {
        if (this.username !== this.props.username) {
            this.user = GS.getUser(this.props.username)
            this.username = this.props.username
        }
    }

    render() {
        this.updateUrl()
        return <div className="rootUserPage backGroundImage">
            <UserCard user={this.user} isMe={GS.getSession().isMe(this.username)}/>
            <Paper className="titlePaper">
                <span>
                Following
                </span>
            </Paper>
            {this.generateFollowing(this.user.following)}
        </div>
    }

    generateFollowing = (followingArray) => {
        return followingArray.map((userNameToFollow, uniqId) => {
            let user = GS.getUser(userNameToFollow)
            return <UserCard user={user} key={uniqId} isMe={GS.getSession().isMe(user.username)}/>
        })
    }
}
