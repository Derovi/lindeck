import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import React, {useRef, useState} from "react";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import {navigate} from "@reach/router";
import GS from "../../../../common/classes/GlobalStorage";


const useStyles = makeStyles((theme) => ({
    submit: {
        margin: theme.spacing(3, 0, 2),
    }
}))

export default function LoginForm(props) {
    const refToEmailField = useRef(null);
    const refToPasswordField = useRef(null);

    const classes = useStyles();

    const [loginGood, setLoginGood] = useState("");

    let fields = [
        {username: "email", label: "Email Address", error: "", refset: refToEmailField},
        {username: "password", label: "Password", error: "", refset: refToPasswordField},
    ]

    function renderFields() {
        return fields.map((json, num) => {
            return <TextField error={json.error !== ""} variant="outlined" margin="normal"
                              required fullWidth inputRef={json.refset} key={num} helperText={json.error}
                              label={json.label} name={json.username} type={json.username}/>
        })
    }

    function signIn() {
        let verdict = GS.signIn(refToEmailField.current.value, refToPasswordField.current.value)
        if (verdict === "") {
            navigate('/user/' + GS.session.cashedUser.username)
            return
        }
        setLoginGood(verdict)
    }

    return <> {renderFields()}
        <FormControlLabel control={<Checkbox value="remember" color="primary"/>}
                          label="Remember me"/>
        <Typography color="secondary">{loginGood}</Typography>
        <Button type="submit" fullWidth onClick={signIn}
                variant="contained" color="primary"
                className={classes.submit}>
            Sign In
        </Button>
    </>
}
