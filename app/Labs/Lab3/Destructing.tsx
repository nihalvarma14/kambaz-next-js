export default function Destructing() {
  const person = { name: "John", age: 25 };
  const { name, age } = person;
  
  const numbers = ["one", "two", "three"];
  const [first, second, third] = numbers;
  
  return (
    <div id="wd-destructing">
      <h4>Destructing</h4>
      <h5>Object Destructing</h5>
      <div>
        const &#123; name, age &#125; = person;<br />
        name = {name}<br />
        age = {age}
      </div>
      <h5>Array Destructing</h5>
      <div>
        const [ first, second, third ] = [&quot;one&quot;, &quot;two&quot;, &quot;three&quot;];<br />
        first = {first}<br />
        second = {second}<br />
        third = {third}
      </div>
    </div>
  );
}