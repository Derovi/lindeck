import React, {useRef} from 'react';
import "./DeckEditDialog.css"
import DeckSettingsForm from "../../../../common/views/deckSettingsForm/DeckSettingsForm";
import DeckSettingsObject from "../../../../common/classes/DeckSettingsObject";
import GS from "../../../../common/classes/GlobalStorage";

export default function DeckEditDialog(props) {
    const close = () => {
        props.openDeckEditDialog(false);
    };
 
    function save(settings) {
        let error = ""
        if (settings.name !== props.deck.name)
            error = GS.newDeckNameIsPossible(GS.session.id, settings.name)
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
                cols: props.deck.cols,
                height: props.deck.rowHeight,
                privacy: props.deck.privacy
            })}
            open={props.open}/>
    </>
}