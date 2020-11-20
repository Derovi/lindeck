import './App.css';
import React from 'react';
import AuthPage from "./AuthPage";
import Grid from "@material-ui/core/Grid";

function App() {
    function handleClick(event) {
        alert(event.targetElement.tagName)
    }

    return (<AuthPage/>)
}

export default App;
