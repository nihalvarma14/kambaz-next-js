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
    { label: "Account", path: "/Account", icon: FaRegCircleUser },
    { label: "Dashboard", path: "/Dashboard", icon: AiFillDashboard },
    { label: "Courses", path: "/Dashboard", icon: LiaBookSolid },
    { label: "Calendar", path: "/Calendar", icon: IoCalendarOutline },
    { label: "Inbox", path: "/Inbox", icon: FaInbox },
    { label: "Labs", path: "/Labs", icon: LiaClipboardCheckSolid },
  ];
  
  return (
    <div id="wd-kambaz-navigation" style={{ width: 90 }}
         className="list-group rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2">
      <a id="wd-neu-link" target="_blank"
         href="https://www.northeastern.edu/"
         className="list-group-item bg-black border-0 text-center py-3">
        <img src="/images/NEU.png" width="60px" alt="Northeastern University" />
      </a>
      
      {links.map((link) => {
        const Icon = link.icon;
        const isActive = pathname.includes(link.path) || 
                        (link.label === "Courses" && pathname.includes("/Courses/"));
        
        return (
          <Link 
            key={link.label} 
            href={link.path}
            className={`list-group-item text-center border-0 py-3 ${
              isActive ? "bg-white text-danger" : "bg-black text-white"
            }`}
            style={{ 
              borderLeft: isActive ? "4px solid #dc3545" : "4px solid transparent",
              transition: "all 0.2s ease"
            }}
          >
            <Icon className={`fs-2 ${isActive ? "text-danger" : "text-white"}`} />
            <div className="mt-1" style={{ fontSize: "0.75rem" }}>
              {link.label}
            </div>
          </Link>
        );
      })}
    </div>
  );
}