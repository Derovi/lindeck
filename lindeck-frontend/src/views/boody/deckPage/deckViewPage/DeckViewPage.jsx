import 'react-grid-layout/css/styles.css';
import React, {Component} from 'react';
import Controller from "../../../../common/classes/ControllerObject";
import DeckEditDialog from "../deckEditPage/deckEditDialog/DeckEditDialog";
import DeckEditMenu from "../deckEditPage/deckSettingsMenu/DeckEditMenu";

class DeckViewPage extends Component {
    state = {
        deck: this.props.deck,
        deckMetadata: this.props.deckMetadata,

    }

    setCardMetadata = (metadata) => {
        let newMetadata = this.state.deckMetadata
        newMetadata.setCardMetadata(metadata)
        Controller.saveMetadata(newMetadata)
    }

    changeCardVerdict = (verdict, id) => {
        let newMetadata = this.state.deckMetadata
        newMetadata.getCardMetadataId(id).verdict = verdict
        Controller.saveMetadata(newMetadata)
        this.setState({metadata: newMetadata});
    }


    openEditDeckDialog = (open) => {
        this.setState({editDeckDialogOpened: open})
    }

    render() {
        return <>
            <DeckEditMenu isEdit={false}
                          openEditDeckDialog={this.openEditDeckDialog}
                          ownerAndDeckNames={this.props.ownerAndDeckNames}>
                <div className="backGround" style={{background: this.state.deck.background}}>
                    CONTENT VIEW
                </div>
            </DeckEditMenu>

        </>
    }


}


export default DeckViewPage;