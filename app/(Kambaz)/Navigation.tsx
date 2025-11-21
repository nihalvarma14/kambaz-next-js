"use client"
import { AiOutlineDashboard } from "react-icons/ai";
import {  FaRegCircleUser } from "react-icons/fa6";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { PiBookLight } from "react-icons/pi";
import { PiCalendarDotsLight } from "react-icons/pi";
import { CiInboxIn } from "react-icons/ci";
import { CiSettings } from "react-icons/ci";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
export default function KambazNavigation() {
  const pathname = usePathname();
  const links = [
    { label: "Dashboard", path: "/Dashboard", icon: AiOutlineDashboard },
    { label: "Courses",   path: "/Dashboard", icon: PiBookLight },
    { label: "Calendar",  path: "/Calendar",  icon: PiCalendarDotsLight },
    { label: "Inbox",     path: "/Inbox",     icon: CiInboxIn },
    { label: "Labs",      path: "/Labs",             icon: CiSettings },
  ];

 return (
   <ListGroup className="rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2" style={{ width: 120 }}
              id="wd-kambaz-navigation">
     <ListGroupItem className="bg-black border-0 text-center" as="a"
              target="_blank" href="https://www.northeastern.edu/" id="wd-neu-link">
       <Image 
  src="/images/NEU.svg" 
  width={75} 
  height={75} 
  alt="Northeastern University" 
/>
     </ListGroupItem><br />
     
     <ListGroupItem as={Link} href="/Account"
        className={`text-center border-0 bg-black
            ${pathname.includes("Account") ? "bg-white text-danger" : "bg-black text-white"}`}>
        <FaRegCircleUser
          className={`fs-1 ${pathname.includes("Account") ? "text-danger" : "text-white"}`} />
        <br />
        Account
      </ListGroupItem>
      {links.map((link) => (
        <ListGroupItem key={link.label} as={Link} href={link.path}
          className={`bg-black text-center border-0
              ${pathname.includes(link.label) ? "text-danger bg-white" : "text-white bg-black"}`}>
          {link.icon({ className: "fs-1 text-danger"})}
          <br />
          {link.label}
        </ListGroupItem>
      ))}
   </ListGroup>
);}




// import Link from "next/link";
// export default function KambazNavigation(){
//     return(
//         <div id="wd-kambaz-navigation">
//         <a href="https://www.northeastern.edu/" id="wd-neu-link" target="_blank">Northeastern</a><br/>
//         <Link href="/Account" id="wd-account-link">Account</Link><br/>
//         <Link href="/Dashboard" id="wd-dashboard-link">Dashboard</Link><br/>
//         <Link href="/Courses/1234" id="wd-course-link">Courses</Link><br/>
//         <Link href="/Calendar" id="wd-calendar-link">Calendar</Link><br/>
//         <Link href="/Inbox" id="wd-inbox-link">Inbox</Link><br/>
//         <Link href="/Labs" id="wd-labs-link">Labs</Link><br/>
//         </div>
//     );
// }

// "use client"; // if you’re in Next.js App Router
// import { AiOutlineDashboard } from "react-icons/ai";
// import { FaRegCircleUser } from "react-icons/fa6";
// import { PiBookLight, PiCalendarDotsLight } from "react-icons/pi";
// import { CiInboxIn, CiSettings } from "react-icons/ci";
// import { ListGroup, ListGroupItem } from "react-bootstrap";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import React from "react";

// export default function KambazNavigation() {
//   const pathname = usePathname();

//   const navItems = [
//     {
//       href: "/Account",
//       id: "wd-account-link",
//       label: "Account",
//       icon: <FaRegCircleUser className="fs-1" />,
//     },
//     {
//       href: "/Dashboard",
//       id: "wd-dashboard-link",
//       label: "Dashboard",
//       icon: <AiOutlineDashboard className="fs-1" />,
//     },
//     {
//       href: "/Courses/1234",
//       id: "wd-courses-link",
//       label: "Courses",
//       icon: <PiBookLight className="fs-1" />,
//     },
//     {
//       href: "/Calendar",
//       id: "wd-calendar-link",
//       label: "Calendar",
//       icon: <PiCalendarDotsLight className="fs-1" />,
//     },
//     {
//       href: "/Inbox",
//       id: "wd-inbox-link",
//       label: "Inbox",
//       icon: <CiInboxIn className="fs-1" />,
//     },
//     {
//       href: "/Labs",
//       id: "wd-labs-link",
//       label: "Labs",
//       icon: <CiSettings className="fs-1" />,
//     },
//   ];

//   return (
//     <ListGroup
//       className="rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2"
//       style={{ width: 120 }}
//       id="wd-kambaz-navigation"
//     >
//       <ListGroupItem
//         className="bg-black border-0 text-center"
//         as="a"
//         target="_blank"
//         href="https://www.northeastern.edu/"
//         id="wd-neu-link"
//       >
//         <img src="/images/NEU.png" width="75px" alt="Northeastern University" />
//       </ListGroupItem>
//       <br />

//       {navItems.map((item) => {
//         const isActive = pathname.startsWith(item.href);
//         return (
//           <ListGroupItem
//             key={item.id}
//             className={`border-0 text-center ${
//               isActive ? "bg-white" : "bg-black"
//             }`}
//           >
//             <Link
//               href={item.href}
//               id={item.id}
//               className={`text-decoration-none ${
//                 isActive ? "text-danger" : "text-white"
//               }`}
//             >
//               {React.cloneElement(item.icon, {
//                 className: `fs-1 ${isActive ? "text-danger" : "text-white"}`,
//               })}
//               <br />
//               {item.label}
//             </Link>
//           </ListGroupItem>
//         );
//       })}
//     </ListGroup>
//   );
// }
