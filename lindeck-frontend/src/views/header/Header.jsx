import "./Header.css"
import React from "react";
import MovingMenuButton from "./MovingMenuButton/MovingMenuButton";
import GS from "../../common/classes/GlobalStorage";
import ButtonBase from "@material-ui/core/ButtonBase";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import {globalHistory, navigate} from "@reach/router";

import WifiOffIcon from '@material-ui/icons/WifiOff';

export default class Header extends React.Component {
    state = {
        backgroundColor: {background: "black"},
        session: GS.getSession()
    }

    componentDidMount() {
        globalHistory.listen(({action}) => {
            if (action === 'PUSH' && GS.session.username !== this.state.session.username) {
                this.setState({
                    session: GS.session
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
                                <h1 className={"logoName"}>Life in deck</h1>
                            </button>
                        </div>

                        {this.state.session.isActive ? this.state.session.isActive &&
                            this.renderAva() : this.renderRegisterLoginButtons()}

                    </Toolbar>
                </AppBar>
            </header>
            <Button style={{position: "fixed"}}
                    onClick={() => GS.session.isOnline = !GS.session.isOnline}> WIFI </Button>
            {this.props.children}</>
    }

    renderRegisterLoginButtons() {
        return <div className={"registerAndLoginButtons"}>
            <Button onClick={() => navigate(`/login`)} color="inherit">
                Login
            </Button><Button onClick={() => navigate('/register')} color="inherit">
            Register
        </Button></div>
    }

    renderAva() {
        return <ButtonBase onClick={() => navigate('/user/' + this.state.session.username)} className="AvaSmallHolder">
            <img src={this.state.session.myUser.image} alt={"ava"}/>
        </ButtonBase>
    }
}
