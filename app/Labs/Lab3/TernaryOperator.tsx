export default function TernaryOperator() {
  let loggedIn = true;
  
  return (
    <div id="wd-ternary-operator">
      <h4>Logged In</h4>
      <div>
        {loggedIn ? <p>Welcome</p> : <p>Please login</p>}
      </div>
    </div>
  );
}