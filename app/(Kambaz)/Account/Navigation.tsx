"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AccountNavigation() {
  const pathname = usePathname();
  
  return (
    <div id="wd-account-navigation" className="list-group">
      <Link
        href="/Account/Signin"
        className={`list-group-item ${pathname === "/Account/Signin" ? "active text-danger" : "text-danger"}`}
      >
        Signin
      </Link>
      <Link
        href="/Account/Signup"
        className={`list-group-item ${pathname === "/Account/Signup" ? "active text-danger" : "text-danger"}`}
      >
        Signup
      </Link>
      <Link
        href="/Account/Profile"
        className={`list-group-item ${pathname === "/Account/Profile" ? "active text-danger" : "text-danger"}`}
      >
        Profile
      </Link>
    </div>
  );
}