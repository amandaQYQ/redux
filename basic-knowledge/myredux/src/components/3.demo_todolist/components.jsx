// 展示组件
import React from 'react';

// 列表展示功能
export const MyLi = ({d, click}) => {
    return <li style={{ textDecoration: !d.show ? 'line-through' : 'none' }}
        onClick={() => click(d.id)}
    >{d.text}</li>
}
