import React, {Component} from 'react'
import {Breadcrumbs, FormLabel, Grid, Link} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import {red} from "@material-ui/core/colors";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import {makeStyles} from "@material-ui/core/styles";
import {withStyles} from "@material-ui/styles";

const style = {
    root: {
        align: 'center',
        width: '600px',
        color: "#a3455c"
    }
}

class AuthPage extends Component {
    constructor(props) {
        super(props);
        this.classes = props.classes
        this.state = {selected: 0}
    }

    handleChange = (event, value) => {
        this.setState({selected: value})
    }

    render() {
        return (
            <Container className={this.classes.root}>
                <AppBar position="static">
                    <Tabs value={this.state.selected} variant="fullWidth" onChange={this.handleChange} aria-label="simple tabs example">
                        <Tab label="Регистрация" />
                        <Tab label="Авторизация" />
                    </Tabs>
                </AppBar>
                {this.state.selected ? <SignIn/> : <SignUp/>}
            </Container>
        )
    }
}

export default withStyles(style)(AuthPage)
