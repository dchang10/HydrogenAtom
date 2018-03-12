import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
const $ = require('jquery');


const root = $('#root');
root.addClass('fluid-container');
ReactDOM.render(<App />, root.get(0));

registerServiceWorker();
