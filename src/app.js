import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import AppContainer from './reactApp'

ReactDOM.render(
    <AppContainer />, document.getElementById("app")
);
