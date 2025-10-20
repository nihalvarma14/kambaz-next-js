export default function Add({ a, b }: { a: number; b: number }) {
  return (
    <div id="wd-add">
      <h4>Add</h4>
      <div>
        {a} + {b} = {a + b}
      </div>
    </div>
  );
}