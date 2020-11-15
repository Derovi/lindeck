import React from "react";

import "./UserPage.css"
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import "./UserPage.css"
import GlobalStorage from "../../common/GlobalStorage";
import ButtonBase from "@material-ui/core/ButtonBase";
import Paper from "@material-ui/core/Paper";
import UserCard from "./userCard/UserCard";

let GS = new GlobalStorage()
const user = GS.getUser();

export default class UserPage extends React.Component {

    render() {
        return <div className="rootUserPage backGroundImage">
            <UserCard user={user}/>
        </div>
    }
}
