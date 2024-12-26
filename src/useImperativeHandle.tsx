import React, { useState, useImperativeHandle, useRef} from "react";

//#region  18版本
/*
interface ChildRef {
   name: string
   count: number
   addCount: () => void
   subCount: () => void
}

//React18.2
const Child = forwardRef<ChildRef>((_, ref) => {
   const [count, setCount] = useState(0)
   //重点
   useImperativeHandle(ref, () => {
      return {
         name: 'child',
         count,
         addCount: () => setCount(count + 1),
         subCount: () => setCount(count - 1)
      }
   })
   return <div>
      <h3>我是子组件</h3>
      <div>count:{count}</div>
      <button onClick={() => setCount(count + 1)}>增加</button>
      <button onClick={() => setCount(count - 1)}>减少</button>
   </div>
})

function App() {
   const childRef = useRef<ChildRef>(null)
   const showRefInfo = () => {
      console.log(childRef.current)
   }
   return (
      <div>
         <h2>我是父组件</h2>
         <button onClick={showRefInfo}>获取子组件信息</button>
         <button onClick={() => childRef.current?.addCount()}>操作子组件+1</button>
         <button onClick={() => childRef.current?.subCount()}>操作子组件-1</button>
         <hr />
         <Child ref={childRef}></Child>
      </div>
   );
}

export default App;
*/ 
//#endregion

//#region  19版本
/*
interface ChildRef {
   name: string
   count: number
   addCount: () => void
   subCount: () => void
}

//React19

const Child = ({ ref }: { ref: React.Ref<ChildRef> }) => { 
   const [count, setCount] = useState(0)
   useImperativeHandle(ref, () => {
      return {
         name: 'child',
         count,
         addCount: () => setCount(count + 1),
         subCount: () => setCount(count - 1)
      }
   })
   return <div>
      <h3>我是子组件</h3>
      <div>count:{count}</div>
      <button onClick={() => setCount(count + 1)}>增加</button>
      <button onClick={() => setCount(count - 1)}>减少</button>
   </div>
}

function App() {
   const childRef = useRef<ChildRef>(null)
   const showRefInfo = () => {
      console.log(childRef.current)
   }
   return (
      <div>
         <h2>我是父组件</h2>
         <button onClick={showRefInfo}>获取子组件信息</button>
         <button onClick={() => childRef.current?.addCount()}>操作子组件+1</button>
         <button onClick={() => childRef.current?.subCount()}>操作子组件-1</button>
         <hr />
         <Child ref={childRef}></Child>
      </div>
   );
}

export default App;
*/ 
//#endregion

interface ChildRef {
  name: string
  validate: () => string | true
  reset: () => void
}

const Child = ({ ref }: { ref: React.Ref<ChildRef> }) => {
  const [form, setForm] = useState({
     username: '',
     password: '',
     email: ''
  })
  const validate = () => {
     if (!form.username) {
        return '用户名不能为空'
     }
     if (!form.password) {
        return '密码不能为空'
     }
     if (!form.email) {
        return '邮箱不能为空'
     }
     return true
  }
  const reset = () => {
     setForm({
        username: '',
        password: '',
        email: ''
     })
  }
  useImperativeHandle(ref, () => {
     return {
        name: 'child',
        validate: validate,
        reset: reset
     }
  })
  return <div style={{ marginTop: '20px' }}>
     <h3>我是表单组件</h3>
     <input value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} placeholder='请输入用户名' type="text" />
     <input value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder='请输入密码' type="text" />
     <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder='请输入邮箱' type="text" />
  </div>
}

function App() {
  const childRef = useRef<ChildRef>(null)
  const showRefInfo = () => {
     console.log(childRef.current)
  }
  const submit = () => {
     const res = childRef.current?.validate()
     console.log(res)
  }
  return (
     <div>
        <h2>我是父组件</h2>
        <button onClick={showRefInfo}>获取子组件信息</button>
        <button onClick={() => submit()}>校验子组件</button>
        <button onClick={() => childRef.current?.reset()}>重置</button>
        <hr />
        <Child ref={childRef}></Child>
     </div>
  );
}

export default App;