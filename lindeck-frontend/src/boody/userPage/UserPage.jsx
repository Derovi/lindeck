import React from "react";

import "./UserPage.css"
import GlobalStorage from "../../common/GlobalStorage";
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
