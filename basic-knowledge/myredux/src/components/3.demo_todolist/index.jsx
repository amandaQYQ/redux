// 入口文件

import React, { Component } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducer.js';

import { AddConnect, ShowListConnect, FooterConnect } from './container';

let store = createStore(reducers);

export default class Demo_Todolist extends Component {
    render() {
        return (
            <Provider store={store}>
                <App />
            </Provider>
        )
    }
}

class App extends Component {
    render() {
        return (
            <div style={{ padding: 10 }}>
                <AddConnect />
                <ShowListConnect />
                <FooterConnect />
            </div>
        )
    }
}

