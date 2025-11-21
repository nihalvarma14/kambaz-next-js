/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";

export default function AccountNavigation() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const pathname = usePathname();
  
  const links = currentUser ? ["Profile"] : ["Signin", "Signup"];

  return (
    <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((link) => (
        <div key={link}>
          <Link
            href={`/Account/${link}`}
            id={`wd-account-${link.toLowerCase()}-link`}
            className={`list-group-item border-0 ${
              pathname.includes(link)
                ? "text-black border-start border-dark border-3"
                : "text-danger"
            }`}
          >
            {link}
          </Link>
          <br />
        </div>
      ))}
    </div>
  );
}