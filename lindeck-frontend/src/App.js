import React, {Component} from 'react';
import {Router} from "@reach/router"
import Header from "./views/header/Header";
import Footer from "./views/footer/Footer";
import DeckPage from "./views/boody/deckPage/DeckPage";
import LoginPage from "./views/boody/loginPage/LoginPage";
import RegisterPage from "./views/boody/registerPage/RegisterPage";
import HomePage from "./views/boody/homePage/HomePage";
import UserPage from "./views/boody/userPage/UserPage";
import OnRouteChange from "reach-router-scroll-top";
import CreateDeckPage from "./views/boody/createDeckPage/CreateDeckPage";
import NotFoundPage from "./views/boody/nonFoundPage/NotFoundPage";
import ResetPasswordPage from "./views/boody/resetPasswordPage/resetPasswordPage";


class App extends Component {

    render() {
        return <div>
                <Header/>
                <Router primary={false}>
                    <DeckPage path="/user/:username/deck/:deckname"/>
                    <CreateDeckPage path='/user/:username/deck-build'/>
                    <LoginPage path="/login"/>
                    <ResetPasswordPage path="/reset-password"/>
                    <RegisterPage path="/register"/>
                    <HomePage path="/"/>
                    <UserPage path='/user/:username'/>
                    <NotFoundPage default />
                </Router>
                <Footer/>
                <OnRouteChange
                    action={() => {
                        window.scrollTo({
                            top: 0,
                            left: 0,
                            behavior: 'smooth'
                        });
                    }}
                />
            </div>

    }
}

export default App;

// Live Cycle Hooks ->
// Mount -> construcor / render / componentDidMount
// update ->   render / componentDidUpdate
// UnMount(destructor) ->   componentWillUnMount