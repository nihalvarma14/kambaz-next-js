export default function ForLoops() {
  let stringArray1 = ["string1", "string2"];
  let stringArray2: string[] = [];
  
  for (let i = 0; i < stringArray1.length; i++) {
    const string1 = stringArray1[i];
    stringArray2.push(string1.toUpperCase());
  }
  
  return (
    <div id="wd-for-loops">
      <h4>Looping through arrays</h4>
      <div>
        stringArray2 = {stringArray2.join(", ")}
      </div>
    </div>
  );
}