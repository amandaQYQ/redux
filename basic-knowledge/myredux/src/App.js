import React from 'react';

// import Principle from './components/1.principle'; // 三大原则
// import Basic_Api from './components/2.basic_api'; // 基础api
// import Demo_Todolist from './components/3.demo_todolist/index'; // todolist Demo
import Demo_async from './components/4.demo_async/index'; // 异步请求demo
import Root from './components/5/containers/Root'

function App() {
  return (
    <div className="App">
      {/* <Principle /> */}
      {/* <Basic_Api /> */}
      {/* <Demo_Todolist /> */}
      <Demo_async />
      <Root />
    </div>
  );
}

export default App;
