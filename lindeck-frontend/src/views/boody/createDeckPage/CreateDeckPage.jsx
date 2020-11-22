import React, {useState} from 'react';
import "./CreateDeckPage.css"
import {navigate, Redirect} from "@reach/router";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import makeStyles from "@material-ui/core/styles/makeStyles";
import GS from "../../../common/classes/GlobalStorage";
import DeckSettingsForm from "../../../common/views/deckSettingsForm/DeckSettingsForm";
import DeckSettingsObject from "../../../common/classes/DeckSettingsObject";


export default function CreateDeckPage(props) {

    if (GS.session.cashedUser.username !== props.username) return <Redirect to="/permission-denied" noThrow/>;
 
    function checkForm(settings) {
        let error = GS.newDeckNameIsPossible(GS.session.id, settings.name)
 
        if (error === "") {
            GS.createNewDeckWithSettings(settings)
            navigate('/user/' + props.username + "/deck/" + settings.name)
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
                name: props.username + "Deck", description: "love lindeck", cols: 6, height: 100, privacy: "private"
            })}
            open={true}/>

    </>


}
