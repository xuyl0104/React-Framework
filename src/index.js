import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './CSS/index.css';
import App from './App/App';
import 'bootstrap/dist/css/bootstrap.css';
import './CSS/newStyle.css';
import Routes from './routes';
import './CSS/transition-main.css';

ReactDOM.render(
    <Routes/>, document.getElementById('root'));
