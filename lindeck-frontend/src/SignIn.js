import React, {Component} from 'react'
import {Container} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios"

class SignIn extends Component {
    constructor(props) {
        super(props)
        this.state = {emailValidationMessage: null, passwordScore: 0, form: {}}
    }

    loginChanged = (event) => {
        let newForm = this.state.form
        newForm.username = event.target.value
        this.setState({ newForm })
    }

    passwordChanged = (event) => {
        let newForm = this.state.form
        newForm.password = event.target.value
        this.setState({ newForm })
    }

    submitForm = (event) => {
        axios.get("/auth/login", { params: this.state.form} ).then((resp) => {
          console.log("logged in!")
        }).catch((err) => {
            console.log(err)
        })
    }

    render() {
        return (<Container>
                <TextField variant="outlined" margin="normal" onChange={this.loginChanged} required fullWidth autoFocus label="Login"/>
                <TextField variant="outlined" type="password" margin="normal" onChange={this.passwordChanged}
                           error = {this.state.passwordValidationMessage != null}
                           helperText= {this.state.passwordValidationMessage}
                           required fullWidth label="Password"/>
                <Button variant="outlined" margin="normal" fullWidth onClick={this.submitForm}>Sign in</Button>
            </Container>
        )
    }
}

export default SignIn
