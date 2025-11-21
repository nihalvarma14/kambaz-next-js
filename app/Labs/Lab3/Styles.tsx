export default function Styles() {
  const color = "blue";
  const padding10px = { padding: "10px" };
  const bgBlue = { backgroundColor: "lightblue", color: "black", ...padding10px };
  const bgRed = {
    backgroundColor: "lightcoral",
    color: "black",
    ...padding10px,
  };
  
  return (
    <div id="wd-styles">
      <h2>Styles</h2>
      <div style={{ backgroundColor: "lightyellow", color: "black", padding: "10px" }}>
        Yellow background
      </div>
      <div style={{ backgroundColor: "lightcoral" }}>
        Red background
      </div>
      <div style={bgBlue}>
        Blue background
      </div>
    </div>
  );
}