import React from 'react';
import "./DeckEditDialog.css"
import DeckSettingsForm from "../../../../common/views/deckSettingsForm/DeckSettingsForm";
import DeckSettingsObject from "../../../../common/classes/DeckSettingsObject";
import Controller from "../../../../common/classes/ControllerObject";

export default function DeckEditDialog(props) {
    const close = () => {
        props.openDeckEditDialog(false);
    };
 
    function save(settings) {
        let error = ""
        if (settings.name !== props.deck.name)
            error = Controller.newDeckNameIsPossible(Controller.session.id, settings.name)
        if (error === "") {
            props.saveDeckProps(settings)
            close()
        }
        return error
    }
  

    return <>
        <DeckSettingsForm
            checkForm={save}
            close={close}
            settings={new DeckSettingsObject({
                name: props.deck.name,
                description: props.deck.description,
                cols: props.metadata.cols,
                height: props.metadata.rowHeight,
                privacy: props.deck.privacy
            })}
            open={props.open}/>
    </>
}