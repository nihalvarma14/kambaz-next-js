export default function VariablesAndConstants() {
  let functionScoped = 2;
  const blockScoped = 5;
  const constant1 = blockScoped - functionScoped;
  
  return (
    <div id="wd-variables-and-constants">
      <h4>Variables and Constants</h4>
      <div>
        functionScoped = {functionScoped}<br />
        blockScoped = {blockScoped}<br />
        constant1 = {constant1}
      </div>
    </div>
  );
}