import "./CardSettingsBar.css"

import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import SettingsIcon from "@material-ui/icons/Settings";
import RefreshIcon from '@material-ui/icons/Refresh';
import ThreeSixtyIcon from "@material-ui/icons/ThreeSixty";
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import TextFieldsIcon from '@material-ui/icons/TextFields';

export default function CardSettingsBar(props) {
    const [refToButton, setRefToButton] = React.useState(null);

    const openSettingsMenu = (event) => {
        setRefToButton(event.currentTarget);
    };

    const handleClose = () => {
        setRefToButton(null);
    };

    const openTextEditDialog = () => {
        props.openTextEditDialog(true)
    }

    const duplicateCard = () => {
        handleClose()
        props.duplicateCard()
    }

    const deleteCard = () => {
        handleClose()
        props.deleteCard()
    }

    return <div className="settingsBar">
        <IconButton size="small" onClick={openSettingsMenu}> <SettingsIcon/></IconButton>
        <IconButton size="small" onClick={openTextEditDialog}> <TextFieldsIcon/></IconButton>
        {props.needFlipButton && (
            <IconButton className="floatRight" size="small" onClick={props.flipButtonClick}>
                <ThreeSixtyIcon/>
            </IconButton>)
        }
        {props.needAnswerButtons && (<>
            <IconButton className="floatRight" size="small" onClick={() => props.inputAnswerDialogOpen(true)}>
                <PlaylistAddCheckIcon/>
            </IconButton>
            <IconButton className="floatRight" size="small" onClick={() => props.changeVerdict(0)}>
                <RefreshIcon/>
            </IconButton>
        </>)
        }
        <Menu anchorEl={refToButton} open={Boolean(refToButton)}
              getContentAnchorEl={null} onClose={handleClose}
              transformOrigin={{vertical: "bottom", horizontal: "left"}}>
            <MenuItem onClick={openTextEditDialog}> Edit Card </MenuItem>
            <MenuItem onClick={duplicateCard}> Duplicate </MenuItem>
            <MenuItem className="deleteButton" onClick={deleteCard}> Delete </MenuItem>
        </Menu>
    </div>
}
