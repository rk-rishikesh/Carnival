import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css'
import App from './components/App';
import { MoralisProvider } from "react-moralis";
import * as serviceWorker from './serviceWorker';
import './index.css';

ReactDOM.render(
    <MoralisProvider appId="RfsNAmKzEWhilM7PZ2DQnAQJmRKz4mq5gSZsFOVN" serverUrl="https://5pj7sp9xvrl9.grandmoralis.com:2053/server">
            <App />
    </MoralisProvider>

, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
