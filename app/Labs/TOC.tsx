"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TOC() {
  const pathname = usePathname();
  
  return (
    <ul className="nav nav-pills flex-column" style={{ width: "200px" }}>
      <li className="nav-item">
        <Link 
          href="/Labs" 
          className={`nav-link ${pathname === "/Labs" ? "active" : ""}`}
        >
          Labs
        </Link>
      </li>
      <li className="nav-item">
        <Link 
          href="/Labs/Lab1" 
          className={`nav-link ${pathname.includes("/Labs/Lab1") ? "active" : ""}`}
        >
          Lab 1
        </Link>
      </li>
      <li className="nav-item">
        <Link 
          href="/Labs/Lab2" 
          className={`nav-link ${pathname.includes("/Labs/Lab2") ? "active" : ""}`}
        >
          Lab 2
        </Link>
      </li>
      <li className="nav-item">
        <Link 
          href="/Labs/Lab3" 
          className={`nav-link ${pathname.includes("/Labs/Lab3") ? "active" : ""}`}
        >
          Lab 3
        </Link>
      </li>
      <li className="nav-item">
        <Link 
          href="/Labs/Lab4" 
          className={`nav-link ${pathname.includes("/Labs/Lab4") ? "active" : ""}`}
        >
          Lab 4
        </Link>
      </li>
      <li className="nav-item">
        <Link href="/Dashboard" className="nav-link">
          Kambaz
        </Link>
      </li>
      <li className="nav-item">
        <a href="https://github.com/nihalvarma14/kambaz-next-js.git" className="nav-link" target="_blank" rel="noopener noreferrer">
          My GitHub
        </a>
      </li>
    </ul>
  );
}