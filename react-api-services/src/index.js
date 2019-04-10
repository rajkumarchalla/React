import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Progress from './Progress';
//import styles from "./styles.css";
//import ExampleButton from './ExampleButton';
import Users from "./Users"
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<Progress data-testid="progress-display" title="GV" data-animated="true"  value="60" data-color="success"/>,document.getElementById('ProgressVL'));
//ReactDOM.render(<ExampleButton title="Button example Title" text="sample" btTitle="Ex Button" className="center_position"/>, document.getElementById('div_five'));
ReactDOM.render(<Users />, document.getElementById('Users'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
//serviceWorker.unregister();
