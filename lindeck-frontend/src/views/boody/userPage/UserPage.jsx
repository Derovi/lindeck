import React from "react";

import "./UserPage.css"
import GlobalStorage from "../../../common/GlobalStorage";
import UserCard from "./userCard/UserCard";
import Paper from "@material-ui/core/Paper";

let GS = new GlobalStorage()

export default class UserPage extends React.Component {
    usernameRoute = null

    isMe = false
    currentUser = null

    componentMount() {
        const username = this.props.username
        this.currentUser = GS.getUser(username)
        this.isMe = this.currentUser.username === GS.getMyName()
        this.usernameRoute= username
    }

    render() {
        this.componentMount()
        return <div className="rootUserPage backGroundImage">
            {this.usernameRoute && <>
                <UserCard history={this.props.history} user={this.currentUser}
                          isMe={this.isMe}/>
                <Paper className="titlePaper">
                <span>
                Following
                </span>
                </Paper>
                {this.followingGenerate(this.currentUser.following)}</>}
        </div>
    }

    followingGenerate = (following) => {
        return following.map((userName, number) => {
            let user = GS.getUser(userName)
            return <UserCard
                history={this.props.history} user={user}
                key={number} isMe={user.username === GS.getMyName()}/>
        })
    }
}
