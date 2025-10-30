"use client"

export default function ClickEvent() {
  const hello = () => {
    alert("Hello World!");
  };
  
  const lifeIs = (good: string) => {
    alert(`Life is ${good}!`);
  };
  
  return (
    <div id="wd-click-event">
      <h2>Click Event</h2>
      <button onClick={hello} id="wd-hello-world-click" className="btn btn-primary">
        Hello World
      </button>
      <button onClick={() => lifeIs("Good!")} id="wd-life-is-good-click" className="btn btn-success ms-2">
        Life is Good!
      </button>
      <button onClick={() => {
        hello();
        lifeIs("Great!");
      }} id="wd-life-is-great-click" className="btn btn-info ms-2">
        Life is Great!
      </button>
    </div>
  );
}