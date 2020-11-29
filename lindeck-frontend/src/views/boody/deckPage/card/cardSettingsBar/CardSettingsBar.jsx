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
import Button from "@material-ui/core/Button";

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
        <IconButton size="small" className="floatLeft" onClick={openSettingsMenu}
                    onTouchEnd={openSettingsMenu}>
            <SettingsIcon/>
        </IconButton>
        <IconButton size="small" className="floatLeft" onClick={openTextEditDialog}
                    onTouchEnd={openTextEditDialog}>
            <TextFieldsIcon/></IconButton>
        <div className="cardTitle">{props.cardTitle}</div>
        {props.needFlipButton && (
            <IconButton onClick={props.flipButtonClick} className="floatRight" size="small">
                <ThreeSixtyIcon onTouchEnd={props.flipButtonClick}/>
            </IconButton>)
        }
        {props.needAnswerButtons && (<>
            <IconButton className="floatRight" size="small"
                        onClick={() => props.inputAnswerDialogOpen(true)}
                        onTouchEnd={()=>props.inputAnswerDialogOpen(true)}>
                <PlaylistAddCheckIcon/>
            </IconButton>
            <IconButton className="floatRight" size="small"
                        onClick={() => props.changeVerdict(0)}
                        onTouchEnd={()=>props.changeVerdict(0)}>
                <RefreshIcon/>
            </IconButton>
        </>)
        }
        <Menu anchorEl={refToButton} open={Boolean(refToButton)}
              getContentAnchorEl={null} onClose={handleClose}
              transformOrigin={{vertical: "bottom", horizontal: "left"}}>
            <MenuItem onClick={openTextEditDialog}
                      onTouchEnd={openTextEditDialog}
            > Edit Card </MenuItem>
            <MenuItem onClick={duplicateCard}
                      onTouchEnd={duplicateCard}
            > Duplicate </MenuItem>
            <MenuItem className="deleteButton" onClick={deleteCard}
                      onTouchEnd={deleteCard}> Delete </MenuItem>
        </Menu>
    </div>
}
