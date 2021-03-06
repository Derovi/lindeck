import "./Header.css"
import React from "react";
import MovingMenuButton from "./MovingMenuButton/MovingMenuButton";
import Controller from "../../common/classes/ControllerObject";
import ButtonBase from "@material-ui/core/ButtonBase";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import {globalHistory, navigate} from "@reach/router";

import WifiOffIcon from '@material-ui/icons/WifiOff';
import {useWindowWidth} from "@react-hook/window-size";

export default class Header extends React.Component {
    state = {
        backgroundColor: {background: "black"},
        session: Controller.session
    }

    componentDidMount() {
        globalHistory.listen(({action}) => {
            if (action === 'PUSH' && Controller.session.id !== this.state.session.id) {
                this.setState({
                    session: Controller.session
                })
            }
        })
    }

    render() {
        return <>
            <header>
                {!this.props.isOnline && <div className={"errorDiv"}>
                    <WifiOffIcon/>
                </div>}
                <AppBar className="appBar" position="static">
                    <Toolbar style={this.state.backgroundColor} className="toolbar">
                        <MovingMenuButton className="menuButton"/>
                        <div className="longPlaceHolder">
                            <button className="headerLindeckButton"
                                    onMouseEnter={() => this.setState({backgroundColor: {background: "#f6b93b"}})}
                                    onMouseLeave={() => this.setState({backgroundColor: {background: "black"}})}
                                    onClick={() => {
                                        this.setState({backgroundColor: {background: "black"}})
                                        navigate(`/`)
                                    }}>
                                <Logo/>

                            </button>
                        </div>

                        {this.state.session.isActive ? this.state.session.isActive &&
                            this.renderAva() : this.renderRegisterLoginButtons()}

                    </Toolbar>
                </AppBar>
            </header>

            <Button style={{background: "aqua", position: "fixed"}}
                    onClick={() => Controller.session.isOnline = !Controller.session.isOnline}> WIFI </Button>

            {this.props.children}</>
    }// TODO -> Remove wifi button

    renderRegisterLoginButtons() {
        return <div className={"registerAndLoginButtons"}>
            <Button onClick={() => navigate(`/login`)} color="inherit">
                Login
            </Button><Button onClick={() => navigate('/register')} color="inherit">
            Register
        </Button></div>
    }

    renderAva() {
        return <ButtonBase onClick={() => navigate('/user/' + this.state.session.cashedUser.username)}
                           className="AvaSmallHolder">
            <img src={this.state.session.cashedUser.image} alt={"ava"}/>
        </ButtonBase>
    }
}

function Logo() {
    const onlyWidth = useWindowWidth()
    let text = "Life in deck"
    if (onlyWidth < 900) {
        text = "LinDeck"
    }
    console.log(onlyWidth)
    return <h1 className={"logoName " + (onlyWidth < 900 && " smallLogo")}>{text}</h1>
}
