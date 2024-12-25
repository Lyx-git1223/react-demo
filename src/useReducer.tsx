import { useReducer } from "react";

const init = {
  count: 0,
};
type State = typeof init;
type Action = {
  type: "add" | "minus";
};
const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "add":
      return { count: state.count + 1 };
    case "minus":
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
};

const App = () => {
  const [ state, dispatch ] = useReducer(reducer, init);
  return (
    <>
      <h1>{state.count}</h1>
      <div onClick={() => dispatch({type:'add'})}>+</div>
      <div onClick={() => dispatch({type:'minus'})}>-</div>
    </>
  );
};

export default App;
