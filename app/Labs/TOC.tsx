import Link from "next/link";

export default function TOC() {
  return (
    <ul className="nav nav-pills">
      <li className="nav-item">
        <Link href="/Labs" className="nav-link">
          Labs
        </Link>
      </li>
      <li className="nav-item">
        <Link href="/Labs/Lab1" className="nav-link">
          Lab 1
        </Link>
      </li>
      <li className="nav-item">
        <Link href="/Labs/Lab2" className="nav-link active">
          Lab 2
        </Link>
      </li>
      <li className="nav-item">
        <Link href="/Labs/Lab3" className="nav-link">
          Lab 3
        </Link>
      </li>
      <li className="nav-item">
        <Link href="/" className="nav-link">
          Kambaz
        </Link>
      </li>
      <li className="nav-item">
        <a href="https://github.com/jannunzi" className="nav-link" target="_blank" rel="noopener noreferrer">
          My GitHub
        </a>
      </li>
    </ul>
  );
}
