export default function ConditionalOutputIfElse() {
  let loggedIn = true;
  
  if (loggedIn) {
    return (
      <div id="wd-conditional-output-if-else-welcome">
        <h2>Welcome If Else</h2>
      </div>
    );
  } else {
    return (
      <div id="wd-conditional-output-if-else-login">
        <h2>Please login If Else</h2>
      </div>
    );
  }
}