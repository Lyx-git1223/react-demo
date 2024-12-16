import { useState } from "react"
function App() {
  const [lyx,setUser] = useState(() => {
    return {
      name:'刘雨鑫',
      age: 18,
      sex: '男'
    }
  })

  const heandleClick = () => {
    setUser({
      ...lyx,
      age:25
    })
    // 此种写法不生效
    // setIndex(index + 1);
    // setIndex(index + 1);
    // setIndex(index + 1);
    // 因为useState是异步操作且会抵消重复操作，提高性能 所以将上述写法调整成下述写法
    setIndex((prev) => prev + 1);
    setIndex((prev) => prev + 1);
    setIndex((prev) => prev + 1);
  }

  const [index,setIndex] = useState(0);
  return (
    <>
      <button onClick={heandleClick}>更改值</button>
      <div>姓名：{lyx.name}</div>
      <div>年龄：{lyx.age}</div>
      <div>{index}</div>
    </>
  )
}
export default App