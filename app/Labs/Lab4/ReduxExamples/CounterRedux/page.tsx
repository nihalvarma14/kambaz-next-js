"use client"

import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "./counterReducer";

// Define the Redux state type
interface RootState {
  counterReducer: {
    count: number;
  };
}

export default function CounterRedux() {
  const { count } = useSelector((state: RootState) => state.counterReducer);
  const dispatch = useDispatch();
  
  return (
    <div id="wd-counter-redux">
      <h2>Counter Redux</h2>
      <h3>{count}</h3>
      <button 
        onClick={() => dispatch(increment())}
        id="wd-counter-redux-increment-click"
        className="btn btn-success me-2"
      >
        Increment
      </button>
      <button 
        onClick={() => dispatch(decrement())}
        id="wd-counter-redux-decrement-click"
        className="btn btn-danger"
      >
        Decrement
      </button>
      <hr />
    </div>
  );
}