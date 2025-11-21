export default function SimpleArrays() {
  const functionScoped = 2;
  const blockScoped = 5;
  const constant1 = functionScoped - blockScoped;
  const numberArray1 = [1, 2, 3, 4, 5];
  const stringArray1 = ["string1", "string2"];
  const variableArray1 = [
    functionScoped,
    blockScoped,
    constant1,
    numberArray1,
    stringArray1,
  ];
  
  return (
    <div id="wd-simple-arrays">
      <h4>Simple Arrays</h4>
      <div>
        numberArray1 = {numberArray1}<br />
        stringArray1 = {stringArray1}<br />
        variableArray1 = {variableArray1.toString()}<br />
        Todo list:<br />
        <ol>
          <li>Buy milk</li>
          <li>Feed the pets</li>
        </ol>
      </div>
    </div>
  );
}