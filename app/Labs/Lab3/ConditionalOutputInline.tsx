export default function ConditionalOutputInline() {
  let loggedIn = false;
  
  return (
    <div id="wd-conditional-output-inline">
      <h2>
        {loggedIn && <>Welcome inline</>}
        {!loggedIn && <>Please login inline</>}
      </h2>
    </div>
  );
}