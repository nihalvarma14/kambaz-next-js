"use client"

import { useState } from "react";

// Define a type for the simplified event object we'll store
interface SimplifiedEvent {
  target: string;
  type: string;
  bubbles: boolean;
  cancelable: boolean;
  defaultPrevented: boolean;
  eventPhase: number;
  isTrusted: boolean;
  timeStamp: number;
  // Add other event properties you want to display
}

export default function EventObject() {
  const [event, setEvent] = useState<SimplifiedEvent | null>(null);
  
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Create a simplified event object for display
    const simplifiedEvent: SimplifiedEvent = {
      target: e.target instanceof HTMLElement ? e.target.outerHTML : '',
      type: e.type,
      bubbles: e.bubbles,
      cancelable: e.cancelable,
      defaultPrevented: e.defaultPrevented,
      eventPhase: e.eventPhase,
      isTrusted: e.isTrusted,
      timeStamp: e.timeStamp,
    };
    
    setEvent(simplifiedEvent);
  };
  
  return (
    <div>
      <h2>Event Object</h2>
      <button 
        onClick={(e) => handleClick(e)}
        className="btn btn-primary"
        id="wd-display-event-obj-click"
      >
        Display Event Object
      </button>
      <pre>{JSON.stringify(event, null, 2)}</pre>
      <hr />
    </div>
  );
}