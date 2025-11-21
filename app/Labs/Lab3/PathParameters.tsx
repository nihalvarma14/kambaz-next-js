import Link from "next/link";

export default function PathParameters() {
  return (
    <div id="wd-path-parameters">
      <h2>Path Parameters</h2>
      <Link href="/Labs/Lab3/add/1/2" className="d-block">
        1 + 2
      </Link>
      <Link href="/Labs/Lab3/add/3/4" className="d-block">
        3 + 4
      </Link>
      
      <h2>Add Path Parameters</h2>
      <div>3 + 4 = 7</div>
    </div>
  );
}