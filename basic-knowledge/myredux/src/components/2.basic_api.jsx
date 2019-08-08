import React, { Component } from 'react';
import { createStore, combineReducers, subscribe } from 'redux';
import { connect, Provider } from 'react-redux';

import png1 from './images/1.png';
import png2 from './images/2.png';
import png3 from './images/3.png';
import png4 from './images/4.png';
import png5 from './images/5.png';
import png6 from './images/6.png';

export default class Basic_Api extends React.Component {
    render() {
        return (
            <div style={{ padding: 10 }}>
                <h3 style={{ color: '#007fff' }}>①Action</h3>
                <p>1.Action 是把数据从应用<sup>（注：这里之所以不叫 view 是因为这些数据有可能是服务器响应，用户输入或其它非 view 的数据 ）</sup>传到 store 的有效载荷。</p>

                <p>2.Action是 store 数据的<b>唯一来源。</b>一般来说你会通过 store.dispatch() 将 action 传到 store。</p>

                <p>3.Action 本质上是 <b>JavaScript 普通对象。</b><span style={{ color: 'red' }}>我们约定，action 内必须使用一个字符串类型的 type 字段来表示将要执行的动作</span>。多数情况下，type 会被定义成字符串常量。当应用规模越来越大时，建议使用单独的模块或文件来存放 action。</p>
                <div style={{ background: `url(${png1}) no-repeat center`, backgroundSize: '100% 100%', width: 300, height: 200 }}></div>

                <p>4.Action 可以创建函数生成action，称为Action创建函数，在 Redux 中的 action 创建函数只是简单的返回一个 action: </p>
                <div style={{ background: `url(${png2}) no-repeat center`, backgroundSize: '100% 100%', width: 300, height: 200 }}></div>




                <h3 style={{ color: '#007fff' }}>②Reducer</h3>
                <p>1.Reducer描述应用如何更新 state。</p>

                <p>2.Reducer 就是一个纯函数，接收旧的 state 和 action，返回新的 state。</p>
                <div style={{ background: `url(${png3}) no-repeat center`, backgroundSize: '100% 100%', width: 300, height: 50 }}></div>

                <p>3.<span style={{ color: 'red' }}>不能</span>在Reducer内做以下操作</p>
                <ul>
                    <li>修改传入参数；<sup>(不要修改state: <b>使用Object.assign()创建新副本，或者使用es7的对象扩展运算符 {"{...state, ...newState}"}</b>)</sup></li>
                    <li>行有副作用的操作，如 API 请求和路由跳转；</li>
                    <li>调用非纯函数，如 Date.now() 或 Math.random()。</li>
                </ul>

                <p>4.编写一个reducer</p>
                <p>首先，指定state的初始状态：</p>
                <div style={{ background: `url(${png4}) no-repeat center`, backgroundSize: '100% 100%', width: 300, height: 200 }}></div>
                <p>这里一个技巧是使用 ES6 参数默认值语法 来精简代码。</p>
                <div style={{ background: `url(${png5}) no-repeat center`, backgroundSize: '100% 100%', width: 300, height: 130 }}></div>
                <p><b>注意：</b>在default的情况下返回就得state，遇到未知的action时，一定要返回旧的state, 如下：</p>
                <div style={{ background: `url(${png6}) no-repeat center`, backgroundSize: '100% 100%', width: 300, height: 200 }}></div>

                <p>5.拆分reducer</p>
                <p>每个 reducer 只负责管理全局 state 中它负责的一部分。每个 reducer 的 state 参数都不同，分别对应它管理的那部分 state 数据。</p>
                <p>最后，Redux 提供了 combineReducers(),合并拆分的reducer</p>




                <h3 style={{ color: '#007fff' }}>③数据流：Redux 应用中数据的生命周期</h3>
                <p>1.调用 store.dispatch(action)。 => dispatch()</p>
                <p>2.Redux store 调用传入的 reducer 函数。计算出下一个state => reducer()</p>
                <p>3.根 reducer 应该把多个子 reducer 输出合并成一个单一的 state 树。=> combineReducer()</p>
                <p>4.Redux store 保存了根 reducer 返回的完整 state 树。所有订阅 store.subscribe(listener) 的监听器都将被调用；监听器里可以调用 store.getState() 获得当前 state。</p>




                <h3 style={{ color: '#007fff' }}>④搭配react</h3>
                <p>1.redux和react的绑定库 react-redux => 安装：npm install --save react-redux</p>
                <p>2.react组件 同 redux 关联： </p>
                <ul>
                    <li>使用store.subscribe() 从redux State中读取数据，并通过props提供 <span style={{ color: 'red' }}>???</span></li>
                    <MySubscribe />
                    <li>使用 React Redux 库的 connect() 方法</li>
                    <FatherConnect />
                </ul>
                <p>3.传入store</p>
                <ul>
                    <li>1.把store以props形式传入到所有容器中</li>
                    <li>2.使用 {"<Provider store>"}</li>
                </ul>
                <Child />
            </div>
        )
    }
}

// demo: subscribe
class MySubscribe extends Component {
    constructor(props) {
        super(props);
        this.myreducer = this.myreducer.bind(this);
        this.store = createStore(this.myreducer);

        this.state = {
            data: []
        }
    }
    myreducer(state = [], action) {
        switch (action.type) {
            case "ADD":
                return [...state, action.add];
            default:
                return state;
        }
    }
    componentDidMount() {
        const { store } = this;
        const unsubscribe = store.subscribe(() => {
            const newData = store.getState();
            // console.log(newData);
            this.setState({
                data: newData
            })
        });

        store.dispatch({ type: "ADD", add: "1" });
        store.dispatch({ type: "ADD", add: "2" });
        store.dispatch({ type: "ADD", add: "3" });
        store.dispatch({ type: "ADD", add: "4" });
        store.dispatch({ type: "ADD", add: "5" });

        unsubscribe();
    }
    render() {
        const { data } = this.state;

        return <div style={{ border: '1px solid black', padding: 10, margin: 20, width: 200 }}>
            <h4>demo: subscribe</h4>
            {data && data.length > 0 && data.map(d => <p key={d}>{d}</p>)}
        </div>
    }
}

// demo: 使用connect
const FatherConnect = () => {
    const add = (state = 1, action) => {
        switch (action.type) {
            case "ADD":
                return state + 1;
            case "DECREASE":
                return state - 1;
            default:
                return state;
        }
    };

    const myreducer = combineReducers({
        myadd: add
    })
    const store = createStore(myreducer);

    // 通过props传递store
    // return <FinalConnect store={store} />; 

    // 通过Provider传递
    return <Provider store={store} ><FinalConnect /></Provider>
}
// 传递具体的某一个state
// const mapStateToProps = ({myadd}) => {
//     return {
//         data: myadd
//     }
// }    

// 传递整个store，并从store内取得相应的state
const mapStateToProps = (store) => {
    return {
        data: store.myadd
    }
}

// 关于报错：Support for the experimental syntax 'decorators-legacy' isn't currently enabled
// 装饰器写法不被支持
// 解决办法： 
// @connect(mapStateToProps)
// class ChildConnect extends Component {
//     render() {
//         const { data, dispatch } = this.props;
//         return (
//             <div style={{ width: 200, margin: 20, padding: 10, border: '1px solid black' }}>
//                 <h4>Demo: connect()</h4>
//                 <p>{data}</p>
//                 <button onClick={() => dispatch({ type: "ADD" })}>加一</button>
//                 <button onClick={() => dispatch({ type: "DECREASE" })}>减一</button>
//             </div>
//         )
//     }
// }
const ChildConnect = (props) => {

    const { data, dispatch } = props;
    return (
        <div style={{ width: 200, margin: 20, padding: 10, border: '1px solid black' }}>
            <h4>Demo: connect()</h4>
            <p>{data}</p>
            <button onClick={() => dispatch({ type: "ADD" })}>加一</button>
            <button onClick={() => dispatch({ type: "DECREASE" })}>减一</button>
        </div>
    )

}

const FinalConnect = connect(mapStateToProps)(ChildConnect);


// demo : redux 普通应用
class Child extends Component {
    constructor(props) {
        super(props);
        this.state = {
            islogin: false,
            account: "",
            password: "",
            list: [],
            text: {}
        };

        this.typeIn = this.typeIn.bind(this);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.toText = this.toText.bind(this);
        this.add = this.add.bind(this);
    }
    static initialState = {
        islogin: false,
        login: {
            account: '',
            password: ''
        }
    }
    static log = (state = Child.initialState, action) => {
        switch (action.type) {
            case 'LOGIN':
                return {
                    ...state,
                    islogin: true,
                    login: {
                        account: action.account,
                        password: action.password
                    }
                };
            case 'LOGOUT':
                return {
                    ...state,
                    islogin: false,
                    login: {
                        account: '',
                        password: ''
                    }
                };
            default:
                return state;
        }
    }
    static operate = (state = [], action) => {
        switch (action.type) {
            case 'ADD':
                return Object.assign([], action.add);
            case 'DELATE':
                return [state.map(d => {
                    if (d.id !== action.id) {
                        return d
                    }
                })];
            default:
                return state;
        }
    }
    static reducer = combineReducers({
        log: Child.log,
        operate: Child.operate
    })
    static store = createStore(Child.reducer);
    typeIn(key, e) {
        if (key === "account") {
            this.setState({
                account: e.target.value
            })

        } else if (key === "password") {
            this.setState({
                password: e.target.value
            })
        }

    }
    login() {
        const { account, password } = this.state;

        if (!account) {
            alert('账户不能为空');
            return;
        }

        if (!password) {
            alert("密码不能为空");
            return;
        }

        if (account && password) {
            // store.dispatch({
            //     type: 'LOGIN',
            //     account,
            //     password
            // })
            const { dispatch } = Child.store;  // 这样写  并没有改变state 所以subscribe的作用是？
            const a = Child.store.subscribe(() => {
                dispatch({
                    type: 'LOGIN',
                    account,
                    password
                })
            })
            a()
            console.log(Child.store.getState())

            this.setState({
                islogin: true
            })
        }

    }
    logout() {
        Child.store.dispatch({
            type: 'LOGOUT'
        })

        this.setState({
            islogin: false,
            account: '',
            password: ''
        })
    }
    toText(e) {
        this.setState({
            text: {
                text: e.target.value,
                id: Math.random()
            }
        })
    }
    add() {
        const { list, text } = this.state;
        Child.store.dispatch({
            type: 'ADD',
            add: [...list, text]
        })
        this.setState({
            list: [...list, text],
            text: {
                text: '',
                id: ''
            }
        })

    }
    delate(d) {
        const { list } = this.state;

        Child.store.dispatch({
            type: 'DELATE',
            id: d.id
        })
        this.setState({
            list: list.filter(target => {
                if (target.id != d.id) {
                    return target
                }
            })
        })
    }
    render() {
        const { islogin, list, text } = this.state;
        // console.log(this.props);

        return (
            <>
                {
                    !islogin ?
                        <>
                            <label>
                                账号：<input type="text" onChange={(e) => this.typeIn('account', e)} />
                            </label>
                            <br />
                            <label>
                                密码：<input type="password" onChange={(e) => this.typeIn('password', e)} />
                            </label>
                            <button onClick={this.login} >登录</button>
                        </>
                        :
                        <div>
                            <p>用户{this.state.account} 您好！<button onClick={this.logout} >退出</button></p>
                            <ul>
                                {
                                    list && list.length > 0 ?
                                        list.map((d, i) => {
                                            return (
                                                <li key={i}>{d.text} <button onClick={() => this.delate(d)}>删除</button>
                                                </li>
                                            )
                                        })
                                        : <li>暂无数据</li>
                                }
                            </ul>
                            <label>
                                新增数据：<input type="text" value={text.text} onChange={(e) => this.toText(e)} />
                            </label>
                            <button onClick={this.add}>确认新增</button>
                        </div>
                }

            </>
        )

    }
}