import React, { useLayoutEffect, useEffect, useState } from 'react';

function App() {
   const [count, setCount] = useState(0)
   //不阻塞DOM useEffect 是异步执行的，先执行完同步任务再去执行异步任务，所以不阻塞页面DOM
   // useEffect(() => {
   //    for (let i = 0; i < 50000; i++) {
   //       //console.log(i);
   //       setCount(count => count + 1)
   //    }
   // }, []);
   //阻塞DOM useLayoutEffect 是同步执行的，并且他是页面渲染完成之前调用，所以会阻塞DOM  
   useLayoutEffect(() => {
      for (let i = 0; i < 50000; i++) {
         //console.log(i);
         setCount(count => count + 1)
      }
   }, []);
   return (
      <div>
         <div>app </div>
         {
            Array.from({ length: count }).map((_, index) => (
               <div key={index}>{index}</div>
            ))
         }
      </div>
   );
}

export default App;


// function App() {
//    useLayoutEffect(() => {
//       const list = document.getElementById('list') as HTMLUListElement;
//       list.scrollTop = 900
//    }, []);

//    return (
//       <ul id="list" style={{ height: '500px', overflowY: 'scroll' }}>
//          {Array.from({ length: 500 }, (_, i) => (
//             <li key={i}>Item {i + 1}</li>
//          ))}
//       </ul>
//    );
// }

// export default App;