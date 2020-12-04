import React from 'react';
import "./CreateDeckPage.css"
import {navigate, Redirect} from "@reach/router";
import Controller from "../../../common/classes/ControllerObject";
import DeckSettingsForm from "../../../common/views/deckSettingsForm/DeckSettingsForm";
import DeckSettingsObject from "../../../common/classes/DeckSettingsObject";


export default function CreateDeckPage(props) {

    if (Controller.session.cashedUser.username !== props.username) return <Redirect to="/permission-denied" noThrow/>;
 
    function checkForm(settings) {
        let error = Controller.newDeckNameIsPossible(Controller.session.id, settings.name)
 
        if (error === "") {
            Controller.createNewDeckWithSettings(settings)
            navigate('/user/' + props.username + "/deck/" + settings.name+"/edit")
            return ""
        }
        return error
    }

    function close() {
        navigate('/user/' + props.username)
    }

    return <>
        <div className="backGroundImage"
             style={{
                 backgroundImage: 'url(https://images.unsplash.com/photo-1603657886780-a9369c8433f4?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max)'
             }}/>
        <DeckSettingsForm
            checkForm={checkForm}
            close={close}
            settings={new DeckSettingsObject({
                name: props.username + "Deck", description: "love lindeck", cols: 6, height: 100, privacy: "private",
                members:[]
            })}
            ownerId = {Controller.session.id}
            open={true}/>
    </>


}
