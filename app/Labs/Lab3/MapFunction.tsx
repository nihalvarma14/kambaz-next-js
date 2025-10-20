export default function MapFunction() {
  let numberArray1 = [1, 2, 3, 4, 5, 6];
  const square = (a: number) => a * a;
  const squares = numberArray1.map(square);
  const cubes = numberArray1.map((a) => a * a * a);
  const todos = ["Buy milk", "Feed the pets"];
  
  return (
    <div id="wd-map-function">
      <h4>Map Function</h4>
      <div>
        squares = {squares.join(", ")}<br />
        cubes = {cubes.join(", ")}<br />
        Todos:
        <ol>
          {todos.map((todo, index) => (
            <li key={index}>{todo}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}