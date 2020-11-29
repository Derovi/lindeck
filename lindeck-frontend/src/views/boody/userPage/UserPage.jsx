import React from "react";

import "./UserPage.css"
import UserCard from "../../../common/views/userCard/UserCard";
import Paper from "@material-ui/core/Paper";
import Controller from "../../../common/classes/ControllerObject";
import {Redirect} from "@reach/router";


export default class UserPage extends React.Component {
    username = this.props.username
    user = Controller.getUser(this.props.username)

    updateUrl() {
        if (this.username !== this.props.username) {
            this.user = Controller.getUser(this.props.username)
            this.username = this.props.username
        }
    }

    render() {
        this.updateUrl()
        if (!this.user) return <Redirect to="/not-found" noThrow/>;
        return <div className="rootUserPage backGroundImage">
            <UserCard user={this.user} isMe={Controller.session.isMe(this.user.id)}/>
            <Paper className="titlePaper">
                {Controller.session.isOnline && <span>
                Following : {this.user.following.length}
                </span>}
                {!Controller.session.isOnline && <span>
                Session is offline. Connect to see following.
                </span>}
            </Paper>
            {Controller.session.isOnline && this.generateFollowing(this.user.following)}
        </div>
    }

    generateFollowing = (followingArray) => {
        return followingArray.map((userNameToFollow, uniqId) => {
            let user = Controller.getUser(userNameToFollow)
            return <UserCard user={user} key={uniqId} isMe={Controller.session.isMe(user.id)}/>
        })
    }
}
