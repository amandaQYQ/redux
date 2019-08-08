// 容器组件
import React from 'react';
import { connect } from 'react-redux';

import { add, show, inverse, all } from './action';

import { MyLi } from './components';

// ①添加功能
const Add = (props) => {
    let input = null;
    const { dispatch } = props;
    return (
        <>
            <form onSubmit={(e) => {
                e.preventDefault();
                if (!input.value.trim()) {
                    return
                }
                dispatch(add(input.value));
                input.value = '';
            }} >
                <input type="text" ref={node => input = node} />
                <button type="submit">新增</button>
            </form>
        </>
    )
}
const AddConnect = connect()(Add);

// ②列表展示功能
const ShowList = ({ data, listOnClick }) => {
    // const change = React.useCallback((id) => {
    //     dispatch({ type: 'SHOW', id: id })
    // })
    return (
        <ul>
            {
                data && data.map(d => {
                    return <MyLi key={d.id} d={d}
                        click={() => listOnClick(d.id)}
                    // onClick={() => {
                    //     dispatch({ type: 'SHOW', id: d.id })
                    // }}
                    // onClick={() => change(d.id)}  // 疑问？？ 直接调用就自动触发了onclick。但是useCallback不是当回调使用的吗
                    // onClick={change.bind(this, d.id)} // 貌似是因为this指向改变的问题
                    // onClick={change(d.id)} // 貌似是因为this指向改变的问题  除了这句无法执行，其他都可以
                    
                    />
                })
            }
        </ul>
    )
}
const mapStateToProps = (store) => {
    return {
        data: store
    }
}
const mapDispatchToProps = dispatch => {
    return {
        listOnClick: id => {
            dispatch(show(id))
        }
    }
}
const ShowListConnect = connect(mapStateToProps, mapDispatchToProps)(ShowList);

// ③功能操作按钮
const Footer = ({ dispatch }) => {

    return (
        <>
            <button onClick={() => dispatch(inverse())} >反选</button>
            <button onClick={() => dispatch(all())} >全选</button>
        </>
    )
}
const FooterConnect = connect()(Footer)

export {
    AddConnect, // ①添加功能
    ShowListConnect, // 列表展示功能
    FooterConnect // ③功能操作按钮
}