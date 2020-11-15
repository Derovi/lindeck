import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import React from "react";
import MovingMenuButton from "./menuBar/MovingMenuButton";
import Button from "@material-ui/core/Button";
import "./Header.css"
import GlobalStorage from "../common/GlobalStorage";
import ButtonBase from "@material-ui/core/ButtonBase";

let GS = new GlobalStorage()
let user = GS.getUser()

export default class Header extends React.Component {
    state = {
        style: {background: "black"}
    }

    render() {
        let props = this.props
        return <header className="root">
            <AppBar className="appBar" position="static">
                <Toolbar style={this.state.style} className="toolbar">
                    <MovingMenuButton className="menuButton" history={props.history}/>
                    <div className="longPlaceHolder">
                        <button className="headerLindeckButton"
                                onMouseEnter={() => this.setState({style: {background: "#f6b93b"}})}
                                onMouseLeave={() => this.setState({style: {background: "black"}})}
                                onClick={() => {
                                    props.history.push('/')
                                    this.setState({style: {background: "black"}})
                                }}>
                            <h1 className={"logoName"}>Life in deck</h1>
                        </button>
                    </div>

                    {user.isLogged && <Button onClick={() => props.history.push('/login')} color="inherit">
                        Login
                    </Button>}
                    {!user.isLogged && <ButtonBase onClick={() => props.history.push('/user')} className="AvaSmallHolder">
                        <img  src={user.image} alt={"ava"}/>
                    </ButtonBase>
                    }

                </Toolbar>
            </AppBar>
        </header>
    }
}
