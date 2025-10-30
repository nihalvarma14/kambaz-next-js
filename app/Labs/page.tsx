import Link from "next/link";

export default function Labs() {
  return (
    <div id="wd-labs" className="container-fluid">
      <h1 className="mb-4">Labs</h1>
      
      <div className="mb-3">
        <h3>Name: Venkata Sai Siva Nihalvarma Pericherla</h3>
        <h4>Section: 18616</h4>
      </div>
      
      <div className="mb-4">
        <h5>Links:</h5>
        <ul className="list-unstyled ms-3">
          <li>
            <a 
              href="https://github.com/nihalvarma14/kambaz-next-js.git" 
              id="wd-github"
              target="_blank"
              rel="noopener noreferrer"
              className="text-decoration-none"
            >
              📁 Github repo link
            </a>
          </li>
          <li>
            <a 
              href="https://kambaz-next-js-8y4w.vercel.app/Account/Signin" 
              id="wd-kambaz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-decoration-none"
            >
              🚀 Kambaz link
            </a>
          </li>
        </ul>
      </div>
      
      <div>
        <h5>Lab Assignments:</h5>
        <ul className="list-group" style={{ maxWidth: "500px" }}>
          <li className="list-group-item">
            <Link href="/Labs/Lab1" id="wd-lab1-link" className="text-decoration-none">
              Lab 1: HTML Examples
            </Link>
          </li>
          <li className="list-group-item">
            <Link href="/Labs/Lab2" id="wd-lab2-link" className="text-decoration-none">
              Lab 2: CSS Basics
            </Link>
          </li>
          <li className="list-group-item">
            <Link href="/Labs/Lab3" id="wd-lab3-link" className="text-decoration-none">
              Lab 3: JavaScript Fundamentals
            </Link>
          </li>
          <li className="list-group-item">
            <Link href="/Labs/Lab4" id="wd-lab4-link" className="text-decoration-none">
              Lab 4: User Events
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}