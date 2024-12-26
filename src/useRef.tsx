/*
1:组件在重新渲染的时候，useRef的值不会被重新初始化。

2:改变 ref.current 属性时，React 不会重新渲染组件。React 不知道它何时会发生改变，因为 ref 是一个普通的 JavaScript 对象，并不是响应式数据。

3:useRef的值不能作为useEffect等其他hooks的依赖项，因为它并不是一个响应式状态。

4:useRef不能直接获取子组件的实例，react18需要使用forwardRef+useImperativeHandle，19版本直接使用useImperativeHandle即可。
*/ 
// 一、获取dom用途
import { useRef, useState } from "react"
function App() {
  //首先，声明一个 初始值 为 null 的 ref 对象
  const div = useRef(null)
  const handleClick = () => {
    //当 React 创建 DOM 节点并将其渲染到屏幕时，React 将会把 DOM 节点设置为 ref 对象的 current 属性
    console.log(div.current)
  }
  return (
    <>
      {/*然后将 ref 对象作为 ref 属性传递给想要操作的 DOM 节点的 JSX*/}
      <div ref={div}>dom元素</div>
      <button onClick={handleClick}>获取dom元素</button>
    </>
  )
}
// 二、缓存老值
// let num = 0; // 也可以使用全局变量进行替换，不过不太合适

function App1(){
 
  // let num = 0; // 缓存老值失效=》 原因：count 是一个响应式数据，当count改变时，组件会重新渲染，num的值一直为0；
  const num = useRef(0); // 使用useRef解决这个问题，因为useRef只会在初始化的时候执行一次，当组件reRender的时候，useRef的值不会被重新初始化。
  const [count, setCount] = useState(0)
  const handleClick = () => {
     setCount(count + 1)
     num.current = count;
    // num = count;
  };
  return (
     <div>
        <button onClick={handleClick}>增加</button>
        <div>{count}:{num.current}</div>
        {/* <div>{count}:{num}</div> */}
     </div>
  );
}
// export default App;
export default App1;