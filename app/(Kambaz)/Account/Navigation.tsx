"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";

// Define the User type
interface User {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  dob: string;
  email: string;
  role: "USER" | "ADMIN" | "FACULTY" | "STUDENT";
}

// Define the Redux state type (at least the part we're using)
interface RootState {
  accountReducer: {
    currentUser: User | null;
  };
}

export default function AccountNavigation() {
  const pathname = usePathname();
  
  // Get current user from Redux store
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  
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