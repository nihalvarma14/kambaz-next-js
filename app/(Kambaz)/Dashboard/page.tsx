"use client"

import { useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { addNewCourse, deleteCourse, updateCourse } from "../Courses/reducer";
import { enrollUser, unenrollUser } from "../Enrollments/reducer";

export default function Dashboard() {
  const { courses } = useSelector((state: any) => state.coursesReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { enrollments } = useSelector((state: any) => state.enrollmentsReducer);
  const dispatch = useDispatch();
  
  // State to toggle between showing all courses or only enrolled courses
  const [showAllCourses, setShowAllCourses] = useState(false);
  
  const [course, setCourse] = useState({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    description: "New Description",
    department: "D123",
    credits: 4
  });
  
  // Check if user is enrolled in a course
  const isEnrolled = (courseId: string) => {
    if (!currentUser) return false;
    return enrollments.some(
      (e: any) => e.user === currentUser._id && e.course === courseId
    );
  };
  
  // Handle enrollment toggle
  const handleEnrollment = (courseId: string) => {
    if (!currentUser) return;
    
    if (isEnrolled(courseId)) {
      dispatch(unenrollUser({ userId: currentUser._id, courseId }));
    } else {
      dispatch(enrollUser({ userId: currentUser._id, courseId }));
    }
  };
  
  // Filter courses based on showAllCourses state
  const displayedCourses = showAllCourses
    ? courses
    : courses.filter((course: any) => !currentUser || isEnrolled(course._id));
  
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      
      {/* Course management section - available to all users */}
      <h5>
        New Course
        <button
          className="btn btn-primary float-end"
          id="wd-add-new-course-click"
          onClick={() => dispatch(addNewCourse(course))}
        >
          Add
        </button>
        <button
          className="btn btn-warning float-end me-2"
          id="wd-update-course-click"
          onClick={() => dispatch(updateCourse(course))}
        >
          Update
        </button>
        {/* Enrollments toggle button */}
        {currentUser && (
          <button
            className="btn btn-primary float-end me-2"
            onClick={() => setShowAllCourses(!showAllCourses)}
          >
            {showAllCourses ? "Show My Courses" : "Show All Courses"}
          </button>
        )}
      </h5>
      <br />
      
      <input
        value={course.name}
        className="form-control mb-2"
        onChange={(e) => setCourse({ ...course, name: e.target.value })}
      />
      <textarea
        value={course.description}
        className="form-control mb-2"
        rows={3}
        onChange={(e) => setCourse({ ...course, description: e.target.value })}
      />
      
      <hr />
      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>
      <hr />
      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {displayedCourses.map((course: any) => (
            <div key={course._id} className="wd-dashboard-course col" style={{ width: "300px" }}>
              <div className="card rounded-3 overflow-hidden">
                <Link
                  className="wd-dashboard-course-link text-decoration-none text-dark"
                  href={`/Courses/${course._id}/Home`}
                  onClick={(e) => {
                    // Only allow navigation if enrolled or no user (public access)
                    if (currentUser && !isEnrolled(course._id)) {
                      e.preventDefault();
                      alert("Please enroll in this course first. Click 'Show All Courses' and then click 'Enroll'.");
                    }
                  }}
                >
                  <img src="/images/reactjs.jpg" width="100%" height={160} alt={course.name} />
                  <div className="card-body">
                    <h5 className="wd-dashboard-course-title card-title">
                      {course.number}
                    </h5>
                    <p className="wd-dashboard-course-title card-text overflow-y-hidden" style={{ maxHeight: 100 }}>
                      {course.name}
                    </p>
                    <button className="btn btn-primary"> Go </button>
                    
                    {/* Delete button - available to all */}
                    <button
                      onClick={(event) => {
                        event.preventDefault();
                        dispatch(deleteCourse(course._id));
                      }}
                      className="btn btn-danger float-end"
                      id="wd-delete-course-click"
                    >
                      Delete
                    </button>
                    
                    {/* Edit button - available to all */}
                    <button
                      onClick={(event) => {
                        event.preventDefault();
                        setCourse(course);
                      }}
                      className="btn btn-warning me-2 float-end"
                      id="wd-edit-course-click"
                    >
                      Edit
                    </button>
                  </div>
                </Link>
                
                {/* Show enrollment buttons OUTSIDE Link when viewing all courses */}
                {currentUser && showAllCourses && (
                  <div className="card-body border-top">
                    <button
                      onClick={() => handleEnrollment(course._id)}
                      className={`btn ${isEnrolled(course._id) ? "btn-danger" : "btn-success"} w-100`}
                    >
                      {isEnrolled(course._id) ? "Unenroll" : "Enroll"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}