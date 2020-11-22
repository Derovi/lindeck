import React from "react";

import "./UserPage.css"
import UserCard from "./userCard/UserCard";
import Paper from "@material-ui/core/Paper";
import GS from "../../../common/classes/GlobalStorage";
import {Redirect} from "@reach/router";


export default class UserPage extends React.Component {
    username = this.props.username
    user = GS.getUser(this.props.username)

    updateUrl() {
        if (this.username !== this.props.username) {
            this.user = GS.getUser(this.props.username)
            this.username = this.props.username
        }
    }

    render() {
        this.updateUrl()
        if (!this.user) return <Redirect to="/nonfound" noThrow/>;
        return <div className="rootUserPage backGroundImage">
            <UserCard user={this.user} isMe={GS.session.isMe(this.username)}/>
            <Paper className="titlePaper">
                {console.log(GS.session)}
                {GS.session.isOnline && <span>
                Following : {this.user.following.length}
                </span>}
                {!GS.session.isOnline && <span>
                Session is offline. Connect to see following.
                </span>}
            </Paper>
            {GS.session.isOnline && this.generateFollowing(this.user.following)}
        </div>
    }

    generateFollowing = (followingArray) => {
        return followingArray.map((userNameToFollow, uniqId) => {
            let user = GS.getUser(userNameToFollow)
            return <UserCard user={user} key={uniqId} isMe={GS.session.isMe(user.username)}/>
        })
    }
}
