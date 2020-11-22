import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import React from "react";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import DeckSettingsObject from "../../classes/DeckSettingsObject";


export default function DeckSettingsForm(props) {

    const [settings, setSettings] = React.useState(props.settings);
    const [nameError, setNameError] = React.useState("");


    function changeSettings(event, value) {
        let newSettings = new DeckSettingsObject(settings)
        newSettings[value] = event.target.value
        setSettings(newSettings)
    }


    return <Dialog className="wrapperCreate" fullWidth={true} open={props.open}>
        <DialogTitle className="centerField ">Deck creation</DialogTitle>
        {renderContent()}
        <DialogActions>
            <Button onClick={() => props.close()}>Close</Button>
            <Button onClick={() => setNameError(props.checkForm(settings))}> Ok </Button>
        </DialogActions>


    </Dialog>

    function renderContent() {
        return <DialogContent className="mainPaperCreate ">
            <TextField defaultValue={settings.name} error={nameError !== ""} helperText={nameError}
                       className="centerField" label="Deck name"
                       onChange={(event) => changeSettings(event, "name")} inputProps={{maxLength: 20}}/>
            <br/>

            <TextField defaultValue={settings.description} inputProps={{maxLength: 20}}
                       className="centerField" label="Describe"
                       onChange={(event) => changeSettings(event, "description")}/>
            <br/><br/>
            {generateSelects(
                [
                    {
                        value: settings.cols,
                        label: "maxWidth",
                        values: ["2", "4", "6", "12", "20"],
                        onChange: "cols"
                    },
                    {
                        value: settings.height,
                        label: "RowHeight",
                        values: ["400", "300", "240", "100", "60"],
                        onChange: "height"
                    },
                    {
                        value: settings.privacy,
                        label: "className",
                        values: ["global", "private"],
                        onChange: "privacy"
                    },
                ]
            )}
        </DialogContent>
    }

    function generateSelects(param) {
        return param.map((data, uniqId) => {
            return <FormControl key={uniqId} className="formControlCreate">
                <InputLabel>{data.label}</InputLabel>
                <Select autoFocus value={data.value} onChange={(event) => changeSettings(event, data.onChange)}>
                    {data.values.map((str, uniqId) =>
                        <MenuItem key={uniqId} value={str}>{str}</MenuItem>
                    )}
                </Select>
            </FormControl>
        })
    }
}