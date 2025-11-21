export default function FunctionDestructing() {
  const add = (a: number, b: number) => a + b;
  const sum = add(1, 2);
  
  const subtract = ({ a, b }: { a: number; b: number }) => a - b;
  const difference = subtract({ a: 4, b: 2 });
  
  return (
    <div id="wd-function-destructing">
      <h4>Function Destructing</h4>
      <div>
        const add = (a, b) =&gt; a + b;<br />
        const sum = add(1, 2);<br />
        sum = {sum}<br />
        <br />
        const subtract = (&#123; a, b &#125;) =&gt; a - b;<br />
        const difference = subtract(&#123; a: 4, b: 2 &#125;);<br />
        difference = {difference}
      </div>
    </div>
  );
}