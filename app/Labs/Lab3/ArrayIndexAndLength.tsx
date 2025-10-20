export default function ArrayIndexAndLength() {
  const numberArray1 = [1, 2, 3, 4, 5];
  const length1 = numberArray1.length;
  const index1 = numberArray1.indexOf(3);
  
  return (
    <div id="wd-array-index-and-length">
      <h4>Array index and length</h4>
      <div>
        length1 = {length1}<br />
        index1 = {index1}
      </div>
    </div>
  );
}