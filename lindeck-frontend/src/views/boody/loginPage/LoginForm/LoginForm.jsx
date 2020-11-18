import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import React, {useRef, useState} from "react";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import GlobalStorage from "../../../../common/GlobalStorage";
import Typography from "@material-ui/core/Typography";
import {navigate} from "@reach/router";


let GS = new GlobalStorage()

const useStyles = makeStyles((theme) => ({
    submit: {
        margin: theme.spacing(3, 0, 2),
    }
}))

export default function LoginForm(props) {

    const refToEmailField = useRef(null);
    const refToPasswordField = useRef(null);

    const classes = useStyles();

    const [loginGood, setLoginGood] = useState(true);

    let myFields = [
        {username: "email", label: "Email Address", error: "", refset: refToEmailField},
        {username: "password", label: "Password", error: "", refset: refToPasswordField},
    ]

    function fields() {
        return myFields.map((json, num) => {
            return <TextField error={json.error !== ""} variant="outlined" margin="normal"
                              required fullWidth inputRef={json.refset} key={num} helperText={json.error}
                              label={json.label} name={json.username} type={json.username}/>
        })
    }

    function signIn() {
        let verdict = GS.signIn(refToEmailField.current.value, refToPasswordField.current.value)
        if (verdict) {
            navigate('/user/' + GS.getMyName())
            return
        }
        setLoginGood(verdict)
    }

    return <> {fields()}
        <FormControlLabel control={<Checkbox value="remember" color="primary"/>}
                          label="Remember me"/>
        {!loginGood && <Typography color="secondary"> Email or password is incorrect.</Typography>}
        <Button type="submit" fullWidth onClick={signIn}
                variant="contained" color="primary"
                className={classes.submit}>
            Sign In
        </Button>
    </>
}
