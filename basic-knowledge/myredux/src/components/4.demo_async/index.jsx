import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';

import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'

import { searchReducer } from './redux';

import fetchSearch from './middleware';


class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.search = this.search.bind(this);
        this.searchFail = this.searchFail.bind(this);
    }
    componentDidMount() {
        console.log(this.props)
    }
    search() {
        const { dispatch } = this.props;

        // fetchSearch()(dispatch);
        dispatch(fetchSearch('success'))

    }
    searchFail() {
        const { dispatch } = this.props;

        // fetchSearch()(dispatch);
        dispatch(fetchSearch('fail'))
    }
    render() {
        console.log(this.props)
        const { data, error } = this.props;
        return (
            <div>
                <button onClick={this.search}>搜索成功</button>
                <button onClick={this.searchFail}>搜索失败</button>
                <ul>
                    {
                        data && data.map(d => {
                            return <li key={d.id}>{d.text}</li>
                        })
                    }
                </ul>
                {error && <p>{error}</p>}
            </div>
        )
    }
}
const mapStateToProps = ({data, error}) => {
    return {
        data: data,
        error: error
    }
}

const MyDemo = connect(mapStateToProps)(Demo);

// const Demo_async = (props) => {
//     const store = createStore(searchReducer);
//     return (
//         <Provider store={store}>
//             <Demo />
//         </Provider>
//     )
// }
const loggerMiddleware = createLogger()
let store = createStore(searchReducer, applyMiddleware(
    thunkMiddleware,
    loggerMiddleware)
);
class Demo_async extends React.Component {
    render() {


        return (
            <Provider store={store}>
                <MyDemo />
            </Provider>
        )
    }
}

export default Demo_async;