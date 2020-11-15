import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import SettingsIcon from "@material-ui/icons/Settings";
import ThreeSixtyIcon from "@material-ui/icons/ThreeSixty";
import "./CardSettingsBar.css"

export default function CardSettingsBar(props) {
    const [refToButton, setRefToButton] = React.useState(null);

    const handleClick = (event) => {
        setRefToButton(event.currentTarget);
    };

    const handleClose = () => {
        setRefToButton(null);
    };

    const opedEditDialog = () => {
        handleClose()
        props.openEditDialog(true)
    }

    const duplicateCard = () => {
        handleClose()
        props.duplicateCard()
    }

    const deleteCard = () => {
        handleClose()
        props.deleteCard()
    }

    return <div className="bar">
        <IconButton size="small" onClick={handleClick}> <SettingsIcon/></IconButton>
        {props.needFlipButton && (
            <IconButton className="flipButton" size="small" onClick={props.flipButtonClick}>
                <ThreeSixtyIcon/>
            </IconButton>)
        }
        <Menu anchorEl={refToButton} open={Boolean(refToButton)}
              getContentAnchorEl={null} onClose={handleClose}
              transformOrigin={{vertical: "bottom", horizontal: "left"}}>
            <MenuItem onClick={opedEditDialog}> Edit Card </MenuItem>
            <MenuItem onClick={duplicateCard}> Duplicate </MenuItem>
            <MenuItem className="deleteButton" onClick={deleteCard}> Delete </MenuItem>
        </Menu>
    </div>
}
