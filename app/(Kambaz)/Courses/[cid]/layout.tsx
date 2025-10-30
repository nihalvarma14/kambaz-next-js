"use client";

import { ReactNode, useState, useEffect } from "react";
import CourseNavigation from "./Navigation";
import { FaAlignJustify } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import Breadcrumb from "./Breadcrumb";

// Define the Course type
interface Course {
  _id: string;
  name: string;
  number: string;
  startDate: string;
  endDate: string;
  department?: string;
  credits?: number;
  description?: string;
}

// Define the User type
interface User {
  _id: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  dob: string;
  email: string;
  role: "USER" | "ADMIN" | "FACULTY" | "STUDENT";
}

// Define the Enrollment type
interface Enrollment {
  _id: string;
  user: string;
  course: string;
}

// Define the Redux state type
interface RootState {
  coursesReducer: {
    courses: Course[];
  };
  accountReducer: {
    currentUser: User | null;
  };
  enrollmentsReducer: {
    enrollments: Enrollment[];
  };
}

export default function CoursesLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const params = useParams();
  const router = useRouter();
  
  // Extract and normalize cid
  const cid = Array.isArray(params.cid) ? params.cid[0] : params.cid;
  
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const { enrollments } = useSelector((state: RootState) => state.enrollmentsReducer);
  const course = courses.find((course) => course._id === cid);
  const [showNav, setShowNav] = useState(true);
  
  // Route protection - check if user is enrolled
  useEffect(() => {
    // If no user, allow access (public)
    if (!currentUser) return;
    
    // Check if user is enrolled in this course
    const isEnrolled = enrollments.some(
      (e) => e.user === currentUser._id && e.course === cid
    );
    
    // If not enrolled, redirect to dashboard
    if (!isEnrolled) {
      alert("You are not enrolled in this course. Please enroll first.");
      router.push("/Dashboard");
    }
  }, [currentUser, enrollments, cid, router]);
  
  return (
    <div id="wd-courses">
      <div className="d-flex align-items-center mb-3">
        <FaAlignJustify 
          className="me-3 fs-4" 
          style={{ cursor: "pointer" }}
          onClick={() => setShowNav(!showNav)}
        />
        <h2 className="text-danger mb-0">
          <Breadcrumb course={course} />
        </h2>
      </div>
      <hr />
      <div className="d-flex">
        {showNav && (
          <div className="d-none d-md-block me-4">
            <CourseNavigation />
          </div>
        )}
        <div className="flex-fill">
          {children}
        </div>
      </div>
    </div>
  );
}