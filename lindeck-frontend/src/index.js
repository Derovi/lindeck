import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css'
import App from "./App";
import axios from 'axios'
import * as serviceWorker from './serviceWorker';

axios.defaults.baseURL = "http://api.localhost/"

ReactDOM.render(<App/>, document.getElementById('root'));

serviceWorker.register();