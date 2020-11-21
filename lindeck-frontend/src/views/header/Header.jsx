import "./Header.css"
import React from "react";
import MovingMenuButton from "./MovingMenuButton/MovingMenuButton";
import GS from "../../common/classes/GlobalStorage";
import ButtonBase from "@material-ui/core/ButtonBase";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import {globalHistory, navigate} from "@reach/router";


export default class Header extends React.Component {
    state = {
        style: {background: "black"},
        session: GS.getSession(),
        user: GS.getSessionUser()
    }

    componentDidMount() {
        globalHistory.listen(({action}) => {
            if (action === 'PUSH' && GS.getSession().username !== this.state.session.username) {
                this.setState({
                    session: GS.getSession(),
                    user: GS.getSessionUser()
                })
            }
        })
    }

    render() {
        let session = this.state.session
        let user = this.state.user
        return <>
            <header className="root">
                <AppBar className="appBar" position="static">
                    <Toolbar style={this.state.style} className="toolbar">
                        <MovingMenuButton session={this.state.session} className="menuButton"/>
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

                        {!session.isActive &&
                        <div className={"registerAndLoginButtons"}>
                            <Button onClick={() => navigate(`/login`)} color="inherit">
                                Login
                            </Button><Button onClick={() => navigate('/register')} color="inherit">
                            Register
                        </Button></div>}
                        {session.isActive &&
                        <ButtonBase onClick={() => navigate('/user/' + session.username)} className="AvaSmallHolder">
                            <img src={user.image} alt={"ava"}/>
                        </ButtonBase>
                        }

                    </Toolbar>
                </AppBar>
            </header>
            {this.props.children}</>
    }
}
