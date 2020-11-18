import "./Header.css"
import React from "react";
import MovingMenuButton from "./menuBar/MovingMenuButton";
import GlobalStorage from "../../common/GlobalStorage";
import ButtonBase from "@material-ui/core/ButtonBase";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import {navigate} from "@reach/router";

let GS = new GlobalStorage()
let user = GS.getUser(GS.getMyName())

export default class Header extends React.Component {
    state = {
        style: {background: "black"}
    }

    render() {
        let props = this.props
        return <><header className="root">
            <AppBar className="appBar" position="static">
                <Toolbar style={this.state.style} className="toolbar">
                    <MovingMenuButton className="menuButton" history={props.history}/>
                    <div className="longPlaceHolder">
                        <button className="headerLindeckButton"
                                onMouseEnter={() => this.setState({style: {background: "#f6b93b"}})}
                                onMouseLeave={() => this.setState({style: {background: "black"}})}
                                onClick={() => {
                                    this.setState({style: {background: "black"}})
                                    navigate(`/`)
                                }}>
                            <h1 className={"logoName"}>Life in deck</h1>
                        </button>
                    </div>
                    {!user && <div className={"registerAndLoginButtons"}><Button onClick={() => navigate(`/login`)} color="inherit">
                        Login
                    </Button><Button onClick={() => navigate('/register')} color="inherit">
                        Register
                    </Button></div>}
                    {user && <ButtonBase onClick={() => navigate('/user/'+GS.getMyName())} className="AvaSmallHolder">
                        <img src={user.image} alt={"ava"}/>
                    </ButtonBase>
                    }

                </Toolbar>
            </AppBar>
        </header>
            {this.props.children}</>
    }
}
