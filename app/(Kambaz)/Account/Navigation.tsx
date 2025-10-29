"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";

export default function AccountNavigation() {
  const pathname = usePathname();
  
  // Get current user from Redux store
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  
  // Show Profile if user is signed in, otherwise show Signin and Signup
  const links = currentUser ? ["Profile"] : ["Signin", "Signup"];
  
  return (
    <div id="wd-account-navigation" className="list-group">
      {links.map((link) => (
        <Link
          key={link}
          href={`/Account/${link}`}
          className={`list-group-item ${pathname === `/Account/${link}` ? "active text-danger" : "text-danger"}`}
        >
          {link}
        </Link>
      ))}
    </div>
  );
}