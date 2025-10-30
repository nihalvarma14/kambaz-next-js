"use client"

import { useState } from "react";

export default function BooleanStateVariables() {
  const [done, setDone] = useState(true);
  
  return (
    <div id="wd-boolean-state-variables">
      <h2>Boolean State Variables</h2>
      <p>{done ? "Done" : "Not done"}</p>
      <label className="form-check">
        <input 
          type="checkbox" 
          checked={done}
          onChange={() => setDone(!done)}
          className="form-check-input"
        />
        <span className="form-check-label ms-2">Done</span>
      </label>
      {done && (
        <div className="alert alert-success mt-2">
          Yay! you are done
        </div>
      )}
      <hr />
    </div>
  );
}