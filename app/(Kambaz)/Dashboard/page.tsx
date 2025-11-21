/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import * as client from "../Courses/client";
import * as enrollmentsClient from "../Account/enrollmentsClient";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { addNewCourse, deleteCourse, updateCourse, setCourses } from "../Courses/reducer";
import { enrollCourse, unenrollCourse, setEnrollments } from "../Account/enrollmentsReducer";
import {
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Button,
  FormControl,
} from "react-bootstrap";

export default function Dashboard() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { enrollments } = useSelector((state: any) => state.enrollmentsReducer);
  const { courses } = useSelector((state: any) => state.coursesReducer);
  const dispatch = useDispatch();
  const [showAllCourses, setShowAllCourses] = useState(false);
  const [course, setCourse] = useState<any>({
    _id: "0", name: "New Course", number: "New Number",
    startDate: "2023-09-10", endDate: "2023-12-15",
    image: "/images/reactjs.jpg", description: "New Description"
  });

  const fetchCourses = async () => {
    try {
      let courses;
      if (showAllCourses) {
        courses = await client.fetchAllCourses();
      } else {
        courses = await client.findMyCourses();
      }
      dispatch(setCourses(courses));
    } catch (error) {
      console.error(error);
    }
  };

  const fetchEnrollments = async () => {
    if (!currentUser) return;
    try {
      const enrollments = await enrollmentsClient.findEnrollmentsForUser(currentUser._id);
      dispatch(setEnrollments(enrollments));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCourses();
    fetchEnrollments();
  }, [currentUser, showAllCourses]);

  const onAddNewCourse = async () => {
    const newCourse = await client.createCourse(course);
    dispatch(setCourses([...courses, newCourse]));
  };

  const onDeleteCourse = async (courseId: string) => {
    await client.deleteCourse(courseId);
    dispatch(setCourses(courses.filter((course: any) => course._id !== courseId)));
  };

  const onUpdateCourse = async () => {
    await client.updateCourse(course);
    dispatch(setCourses(courses.map((c: any) => {
      if (c._id === course._id) { return course; }
      else { return c; }
    })));
  };

  const isEnrolled = (courseId: string) => {
    return enrollments.some(
      (enrollment: any) =>
        enrollment.user === currentUser?._id && enrollment.course === courseId
    );
  };

  const handleEnroll = async (courseId: string) => {
    if (!currentUser) return;
    try {
      const enrollment = await enrollmentsClient.enrollUserInCourse(currentUser._id, courseId);
      dispatch(enrollCourse(enrollment));
    } catch (error) {
      console.error(error);
    }
  };

  const handleUnenroll = async (courseId: string) => {
    if (!currentUser) return;
    try {
      await enrollmentsClient.unenrollUserFromCourse(currentUser._id, courseId);
      dispatch(unenrollCourse({ userId: currentUser._id, courseId }));
    } catch (error) {
      console.error(error);
    }
  };

  const enrolledCourses = courses.filter((c: any) =>
    enrollments.some(
      (enrollment: any) =>
        enrollment.user === currentUser?._id && enrollment.course === c._id
    )
  );

  const displayedCourses = showAllCourses ? courses : enrolledCourses;

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      
      {/* Course Management - Only show when NOT showing all courses */}
      {!showAllCourses && currentUser?.role === "FACULTY" && (
        <>
          <h5>New Course
            <button className="btn btn-primary float-end"
                    id="wd-add-new-course-click"
                    onClick={onAddNewCourse}> Add </button>
            <button className="btn btn-warning float-end me-2"
                    onClick={onUpdateCourse} id="wd-update-course-click">
              Update </button>
          </h5><br />
          <FormControl 
            value={course.name} 
            className="mb-2" 
            onChange={(e) => setCourse({ ...course, name: e.target.value })} 
          />
          <FormControl 
            value={course.description}
            onChange={(e) => setCourse({ ...course, description: e.target.value })} 
          />
          <hr />
        </>
      )}
      
      <div className="d-flex justify-content-between align-items-center">
        <h2 id="wd-dashboard-published">
          {showAllCourses ? `All Courses (${courses.length})` : `Published Courses (${enrolledCourses.length})`}
        </h2>
        <Button 
          variant="primary"
          onClick={() => setShowAllCourses(!showAllCourses)}
          id="wd-enrollments-btn"
        >
          {showAllCourses ? "Show My Courses" : "Enrollments"}
        </Button>
      </div>
      <hr />
      
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {displayedCourses.map((c: any) => (
            <Col key={c._id} className="wd-dashboard-course" style={{ width: "300px" }}>
              <Card>
                <Link href={`/Courses/${c._id}/Home`}
                      className="wd-dashboard-course-link text-decoration-none text-dark" >
                  <CardImg src="images/reactjs.jpg" variant="top" width="100%" height={160} />
                  <CardBody className="card-body">
                    <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                      {c.name}
                    </CardTitle>
                    <CardText className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                      {c.description}
                    </CardText>
                    
                    {/* Show different buttons based on view mode */}
                    {showAllCourses ? (
                      // Enrollment view - show Enroll/Unenroll buttons
                      <>
                        <Button variant="primary"> Go </Button>
                        {isEnrolled(c._id) ? (
                          <button
                            onClick={(event) => {
                              event.preventDefault();
                              handleUnenroll(c._id);
                            }}
                            className="btn btn-danger float-end"
                          >
                            Unenroll
                          </button>
                        ) : (
                          <button
                            onClick={(event) => {
                              event.preventDefault();
                              handleEnroll(c._id);
                            }}
                            className="btn btn-success float-end"
                          >
                            Enroll
                          </button>
                        )}
                      </>
                    ) : (
                      // Regular view - show Go and management buttons
                      <>
                        <Button variant="primary"> Go </Button>
                        {currentUser?.role === "FACULTY" && (
                          <>
                            <button onClick={(event) => {
                              event.preventDefault();
                              onDeleteCourse(c._id);
                            }} className="btn btn-danger float-end"
                                id="wd-delete-course-click">
                              Delete
                            </button>
                            <button id="wd-edit-course-click"
                                    onClick={(event) => {
                                      event.preventDefault();
                                      setCourse(c);
                                    }}
                                    className="btn btn-warning me-2 float-end" >
                              Edit
                            </button>
                          </>
                        )}
                      </>
                    )}
                  </CardBody>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}