import React from 'react';

export default class Principle extends React.Component {
    render() {
        return (
            <div>
                <h4>①三大原则</h4>
                <ul>
                    <li><b>单一数据源:</b>  整个应用的 state 被储存在一棵 object tree 中，并且这个 object tree 只存在于唯一一个 store 中。</li>
                    <li><b>State 是只读的:</b>  唯一改变 state 的方法就是触发 action，action 是一个用于描述已发生事件的普通对象。</li>
                    <li><b>使用纯函数来执行修改:</b>  为了描述 action 如何改变 state tree ，你需要编写 reducers。</li>
                </ul>

                <h4>②和flux的不同</h4>
                <ul>
                    <li>Redux 并没有 dispatcher 的概念。</li>
                    <li>Redux 设想你永远不会变动你的数据。</li>
                </ul>

                <h4>③设计核心</h4>
                <p>严格的单向数据流是 Redux 架构的设计核心。</p>
            </div>
        )
    }
}