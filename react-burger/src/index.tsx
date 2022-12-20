import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app/app';
import reportWebVitals from './reportWebVitals';
import { compose, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import {rootReducer} from "./services/reducers";
import {BrowserRouter as Router} from "react-router-dom";
import {socketMiddleware} from "./services/middleware";
import {WS_URL_ALL, WS_URL_OWNER} from "./utils/ws-constants";
import {wsActions} from "./services/actions/wsActions";
import {wsUserActions} from "./services/actions/wsUserActions";

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(
    applyMiddleware(
        socketMiddleware(WS_URL_ALL, wsActions, false),
        socketMiddleware(WS_URL_OWNER, wsUserActions, true),
        thunk)
);

export const store = createStore(rootReducer,enhancer)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store} >
        <Router>
             <App />
        </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
