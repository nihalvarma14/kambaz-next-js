"use client"

import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { add } from "./addReducer";

interface RootState {
  addReducer: {
    sum: number;
  };
}

export default function AddRedux() {
  const [a, setA] = useState<number>(12);
  const [b, setB] = useState<number>(23);
  const { sum } = useSelector((state: RootState) => state.addReducer);
  const dispatch = useDispatch();
  
  return (
    <div className="w-25" id="wd-add-redux">
      <h2>Add Redux</h2>
      <h3>{a} + {b} = {sum}</h3>
      <input
        type="number"
        className="form-control mb-2"
        value={a}
        onChange={(e) => setA(parseInt(e.target.value))}
      />
      <input
        type="number"
        className="form-control mb-2"
        value={b}
        onChange={(e) => setB(parseInt(e.target.value))}
      />
      <button
        id="wd-add-redux-click"
        className="btn btn-primary w-100"
        onClick={() => dispatch(add({ a, b }))}
      >
        Add Redux
      </button>
      <hr />
    </div>
  );
}