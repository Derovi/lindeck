import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import React, {useRef, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Link, navigate} from "@reach/router";
import GS from "../../../../common/classes/GlobalStorage";


const useStyles = makeStyles((theme) => ({
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

function checkPassword(password) {
    let score = 0;
    if (!password)
        return "To simple";

    // award every unique letter until 5 repetitions
    let letters = {};
    for (var i = 0; i < password.length; i++) {
        letters[password[i]] = (letters[password[i]] || 0) + 1;
        score += 5.0 / letters[password[i]];
    }

    // bonus points for mixing it up
    let variations = {
        digits: /\d/.test(password),
        lower: /[a-z]/.test(password),
        upper: /[A-Z]/.test(password),
        nonWords: /\W/.test(password),
    }

    let variationCount = 0;
    for (var check in variations) {
        variationCount += (variations[check] === true) ? 1 : 0;
    }
    score += (variationCount - 1) * 10;
    if(score<30)
        return "To simple"
    return ""
}

export default function RegisterForm(props) {
    function checkSignUp(fields) {
        let errors = {username: "", email: "", password: "", passwordR: ""}
        errors.username = GS.registerNameIsPossible(fields.username)
        errors.email = GS.registerEmailIsPossible(fields.email)
        errors.password =checkPassword(fields.password)
        errors.passwordR = (fields.password === fields.passwordR ? "" : "Password arnt equals.")

        if (errors.username === "" && errors.email === "" && errors.password === "" && errors.passwordR === "") {
            GS.createUser(fields.username, fields.email, fields.password)
            navigate('/login')

        }
        return errors
    }

    const refToNameField = useRef(null);
    const refToEmailField = useRef(null);
    const refToPasswordField = useRef(null);
    const refToRepeatPasswordField = useRef(null);

    let [myFields, setMyFields] = useState([
        {username: "name", label: "Nick Name", error: "", refset: refToNameField},
        {username: "email", label: "Email Address", error: "", refset: refToEmailField},
        {username: "password", label: "Password", error: "", refset: refToPasswordField},
        {username: "password", label: "Repeat Password", error: "", refset: refToRepeatPasswordField}
    ]);

    const classes = useStyles();

    function signUp() {
        let verdict = checkSignUp({
            username: refToNameField.current.value,
            email: refToEmailField.current.value,
            password: refToPasswordField.current.value,
            passwordR: refToRepeatPasswordField.current.value
        })
        let newFields = [...myFields]
        newFields[0].error = verdict["username"]
        newFields[1].error = verdict["email"]
        newFields[2].error = verdict["password"]
        newFields[3].error = verdict["passwordR"]

        setMyFields(newFields)
    }

    function fields() {
        return myFields.map((json, num) => {
            return <TextField error={json.error !== ""} variant="outlined" margin="normal"
                              required fullWidth inputRef={json.refset} key={num} helperText={json.error}
                              label={json.label} name={json.username} type={json.username}/>
        })
    }

    return (<div>
        {fields()}
        <Button fullWidth onClick={signUp} variant="contained" color="primary" className={classes.submit}>
            Sign Up
        </Button>
        <Grid container>
            <Grid item>
                <Link to="/login">
                    Already have an account? Sign in.
                </Link>
            </Grid>
        </Grid></div>)
}