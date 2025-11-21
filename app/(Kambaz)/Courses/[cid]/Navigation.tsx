"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function CourseNavigation({ cid }: { cid: string }) {
  const pathname = usePathname();
  const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades", "People"];

  const getLinkHref = (link: string) => {
    if (link === "Piazza") return "https://piazza.com/";
    if (link === "Zoom") return "https://www.zoom.com/";
    if (link === "People") return `/Courses/${cid}/People/Table`;
    return `/Courses/${cid}/${link}`;
  };

  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((link) => (
        <div key={link}>
          <Link
            href={getLinkHref(link)}
            id={`wd-course-${link.toLowerCase()}-link`}
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