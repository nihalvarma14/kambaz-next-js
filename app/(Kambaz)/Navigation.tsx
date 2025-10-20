"use client"

import Link from "next/link";
import { AiFillDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaClipboardCheckSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";
import { usePathname } from "next/navigation";

export default function KambazNavigation() {
  const pathname = usePathname();
  
  const links = [
    { label: "Dashboard", path: "/Dashboard", icon: AiFillDashboard },
    { label: "Courses", path: "/Dashboard", icon: LiaBookSolid },
    { label: "Calendar", path: "/Calendar", icon: IoCalendarOutline },
    { label: "Inbox", path: "/Inbox", icon: FaInbox },
    { label: "Labs", path: "/Labs", icon: LiaClipboardCheckSolid },
  ];
  
  return (
    <div id="wd-kambaz-navigation" style={{ width: 120 }}
         className="list-group rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2">
      <a id="wd-neu-link" target="_blank"
         href="https://www.northeastern.edu/"
         className="list-group-item bg-white border-0 text-center">
        <img src="/images/NEU.png" width="75px" alt="Northeastern University" />
      </a>
      
      <Link href="/Account" id="wd-account-link"
            className={`list-group-item text-center border-0 ${
              pathname.includes("Account") ? "bg-white text-danger" : "bg-black text-white"
            }`}>
        <FaRegCircleUser className={`fs-1 ${pathname.includes("Account") ? "text-danger" : "text-white"}`} />
        <br />
        Account
      </Link>
      
      {links.map((link) => {
        const Icon = link.icon;
        return (
          <Link key={link.label} href={link.path}
                className={`list-group-item text-center border-0 ${
                  pathname.includes(link.label) ? "bg-white text-danger" : "bg-black text-white"
                }`}>
            <Icon className="fs-1 text-danger" />
            <br />
            {link.label}
          </Link>
        );
      })}
    </div>
  );
}