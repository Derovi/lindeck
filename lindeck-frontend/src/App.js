import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import DeckPage from "./boody/deckPage/DeckPage";
import Header from "./header/Header";
import LoginPage from "./boody/loginPage/LoginPage";
import HomePage from "./boody/homePage/HomePage";
import Footer from "./footer/Footer";
import UserPage from "./boody/userPage/UserPage";
import GlobalStorage from "./common/GlobalStorage";
import RegisterPage from "./boody/registerPage/RegisterPage";



class App extends Component {

    render() {
        return (
            <Router>
                <Route component={(props) => <Header {...props} />}/>
                <Switch>
                    <Route path='/deck' component={DeckPage}/>
                    <Route path='/login' component={LoginPage}/>
                    <Route path='/register' component={(props) => <RegisterPage {...props}/>}/>
                    <Route path='/user' component={(props) => <UserPage {...props}/>}/>
                    <Route path='/' component={(props) => <HomePage {...props}/>}/>
                </Switch>
                <Route component={Footer}/>
            </Router>
        )
    }
}

export default App;

// Live Cycle Hooks ->
// Mount -> construcor / render / componentDidMount
// update ->   render / componentDidUpdate
// UnMount(destructor) ->   componentWillUnMount