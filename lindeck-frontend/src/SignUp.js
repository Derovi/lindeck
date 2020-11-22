import React, {Component} from 'react'
import ReactDOM from 'react-dom';
import {Container} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import axios from "axios"
import Button from "@material-ui/core/Button";

function scorePassword(pass) {
    let score = 0;
    if (!pass)
        return score;

    // award every unique letter until 5 repetitions
    let letters = new Object();
    for (var i=0; i<pass.length; i++) {
        letters[pass[i]] = (letters[pass[i]] || 0) + 1;
        score += 5.0 / letters[pass[i]];
    }

    // bonus points for mixing it up
    let variations = {
        digits: /\d/.test(pass),
        lower: /[a-z]/.test(pass),
        upper: /[A-Z]/.test(pass),
        nonWords: /\W/.test(pass),
    }

    let variationCount = 0;
    for (var check in variations) {
        variationCount += (variations[check] == true) ? 1 : 0;
    }
    score += (variationCount - 1) * 10;

    return parseInt(score);
}

class SignUp extends Component {
    constructor(props) {
        super(props)
        this.state = {login: null, email: null, emailValidationMessage: null, passwordScore: 0,
            passwordConfirmValidationMessage: null, password: "", confirmPassword: "",
            loginValidationMessage: null}
    }

    validateEmail = (event) => {
        this.setState({email: event.target.value})
        if (!event.target.value.match(".+@.+\\..+")) {
            this.setState({emailValidationMessage: "Invalid email"})
        } else {
            this.setState({emailValidationMessage: null})
        }
    }

    loginChanged = (event) => {
        this.setState({login: event.target.value})
        this.validateLogin(event.target.value)
    }

    passwordFieldChanged = (event) => {
        this.setState({password: event.target.value})
        this.setState({passwordScore: scorePassword(this.state.password)})
        if (this.state.passwordScore > 0 && this.state.passwordScore < 30) {
            this.setState({passwordValidationMessage: "Password is too weak"})
        } else {
            this.setState({passwordValidationMessage: null})
        }
        if (!this.state.confirmPassword.empty) {
            this.validateConfirmPassword(event.target.value, this.state.confirmPassword)
        }
    }

    confirmPasswordFieldChanged = (event) => {
        this.setState({confirmPassword: event.target.value})
        this.validateConfirmPassword(this.state.password, event.target.value)
    }

    validateLogin = (login) => {
        if (login == null || login.length < 4) {
            this.setState({loginValidationMessage: "Too short login!"})
            return;
        }
        this.setState({loginValidationMessage: null})
    }

    validateConfirmPassword = (password, confirmPassword) => {
        if (password != confirmPassword) {
            this.setState({passwordConfirmValidationMessage: "Invalid password!"})
        } else {
            this.setState({passwordConfirmValidationMessage: null})
        }
        console.log(this.state.passwordConfirmValidationMessage)
    }

    submitForm = () => {
        if (this.state.passwordConfirmValidationMessage != null) {
            return
        }
        const data = {
            "login": this.state.login,
            "email": this.state.email,
            "password": this.state.password,
        }
        axios.post("/auth/register", {
            "login": this.state.login,
            "email": this.state.email,
            "password": this.state.password,
        }).then ((resp) => {
            console.log("Successfully signed in!")
        }).catch(reason => {
            console.log(reason)
        })
    }

    render() {
        return (
            <Container>
                <TextField variant="outlined" margin="normal" required fullWidth autoFocus label="Login"
                            onChange={this.loginChanged}
                            error = {this.state.loginValidationMessage != null}
                            helperText= {this.state.loginValidationMessage}/>
                <TextField variant="outlined" margin="normal" onChange={this.validateEmail} onBlur={this.validateEmail}
                           error = {this.state.emailValidationMessage != null}
                           helperText= {this.state.emailValidationMessage}
                           required fullWidth label="Email address"/>

                <TextField ref="password" variant="outlined" type="password" margin="normal" onChange={this.passwordFieldChanged}
                           error = {this.state.passwordValidationMessage != null}
                           helperText= {this.state.passwordValidationMessage}
                           required fullWidth label="Password"/>

                <TextField variant="outlined" type="password" margin="normal" onChange={this.confirmPasswordFieldChanged}
                           error = {this.state.passwordConfirmValidationMessage != null}
                           helperText= {this.state.passwordConfirmValidationMessage}
                           required fullWidth label="Confirm password"/>

                <Button variant="outlined" style={ {height: "100px"} } color="primary" fullWidth margin="normal" onClick={this.submitForm}>Sign Up</Button>
            </Container>
        )
    }
}

export default SignUp



