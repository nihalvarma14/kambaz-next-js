import Link from "next/link";
import { AiFillDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaClipboardCheckSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";

export default function KambazNavigation() {
  return (
    <div id="wd-kambaz-navigation" style={{ width: 120 }}
         className="list-group rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2">
      <a id="wd-neu-link" target="_blank"
         href="https://www.northeastern.edu/"
         className="list-group-item bg-black border-0 text-center">
        <img src="/images/NEU.png" width="75px" alt="Northeastern University" />
      </a>
      <Link href="/Account" id="wd-account-link"
            className="list-group-item text-center border-0 bg-black text-white">
        <FaRegCircleUser className="fs-1 text-white" />
        <br />
        Account
      </Link>
      <Link href="/Dashboard" id="wd-dashboard-link"
            className="list-group-item text-center border-0 bg-white text-danger">
        <AiFillDashboard className="fs-1 text-danger" />
        <br />
        Dashboard
      </Link>
      <Link href="/Dashboard" id="wd-course-link"
            className="list-group-item text-center border-0 bg-black text-white">
        <LiaBookSolid className="fs-1 text-danger" />
        <br />
        Courses
      </Link>
      <Link href="/Calendar" id="wd-calendar-link"
            className="list-group-item text-center border-0 bg-black text-white">
        <IoCalendarOutline className="fs-1 text-danger" />
        <br />
        Calendar
      </Link>
      <Link href="/Inbox" id="wd-inbox-link"
            className="list-group-item text-center border-0 bg-black text-white">
        <FaInbox className="fs-1 text-danger" />
        <br />
        Inbox
      </Link>
      <Link href="/Labs" id="wd-labs-link"
            className="list-group-item text-center border-0 bg-black text-white">
        <LiaClipboardCheckSolid className="fs-1 text-danger" />
        <br />
        Labs
      </Link>
    </div>
  );
}
