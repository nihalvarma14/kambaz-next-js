"use client"

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { BsGripVertical, BsPlus } from "react-icons/bs";
import { IoEllipsisVertical } from "react-icons/io5";
import { FaCheckCircle, FaTrash } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { deleteAssignment } from "./reducer";

// Define the Assignment type
interface Assignment {
  _id: string;
  title: string;
  course: string;
  description: string;
  points: number;
  due: string;
  dueDate: string;
  availableFrom: string;
  availableUntil: string;
}

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

// Define the Redux state type
interface RootState {
  assignmentsReducer: {
    assignments: Assignment[];
  };
  accountReducer: {
    currentUser: User | null;
  };
}

export default function Assignments() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  
  // Extract and normalize cid
  const cid = Array.isArray(params.cid) ? params.cid[0] : params.cid;
  
  // Get assignments from Redux store
  const { assignments } = useSelector((state: RootState) => state.assignmentsReducer);
  
  // Get current user to check role
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  
  // Filter assignments for this course
  const courseAssignments = assignments.filter((assignment) => assignment.course === cid);
  
  // Handle delete with confirmation
  const handleDelete = (assignmentId: string, assignmentTitle: string) => {
    if (window.confirm(`Are you sure you want to remove "${assignmentTitle}"?`)) {
      dispatch(deleteAssignment(assignmentId));
    }
  };
  
  return (
    <div id="wd-assignments">
      {/* Header with Search and Buttons */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <input
          id="wd-search-assignment"
          type="text"
          className="form-control"
          placeholder="Search for Assignments"
          style={{ width: "300px" }}
        />
        <div>
          <button id="wd-add-assignment-group" className="btn btn-secondary me-2">
            <BsPlus className="fs-4" /> Group
          </button>
          {/* Only show Add Assignment button for faculty */}
          {currentUser?.role === "FACULTY" && (
            <button
              id="wd-add-assignment"
              className="btn btn-danger"
              onClick={() => router.push(`/Courses/${cid}/Assignments/new`)}
            >
              <BsPlus className="fs-4" /> Assignment
            </button>
          )}
        </div>
      </div>

      {/* Assignments List */}
      <ul id="wd-assignment-list" className="list-group rounded-0">
        {/* Header */}
        <li className="wd-assignment-list-item list-group-item p-3 ps-1 bg-secondary">
          <div className="d-flex align-items-center">
            <BsGripVertical className="me-2 fs-3" />
            <span className="fw-bold">ASSIGNMENTS</span>
            <span className="ms-auto">
              <span className="me-3">40% of Total</span>
              <BsPlus className="fs-4" />
              <IoEllipsisVertical className="fs-5" />
            </span>
          </div>
        </li>

        {/* Dynamic Assignments */}
        {courseAssignments.map((assignment) => (
          <li key={assignment._id} className="wd-assignment-list-item list-group-item p-3 ps-1 border-start border-success border-3">
            <div className="d-flex align-items-start">
              <BsGripVertical className="me-2 fs-3" />
              <div className="flex-grow-1">
                <Link
                  href={`/Courses/${cid}/Assignments/${assignment._id}`}
                  className="wd-assignment-link text-dark text-decoration-none fw-bold"
                >
                  {assignment.title}
                </Link>
                <div className="mt-1">
                  <span className="text-danger">Multiple Modules</span>
                  <span className="mx-1">|</span>
                  <span className="fw-bold">Not available until</span> {assignment.availableFrom}
                  <span className="mx-1">|</span>
                  <div className="mt-1">
                    <span className="fw-bold">Due</span> {assignment.due}
                    <span className="mx-1">|</span>
                    {assignment.points} pts
                  </div>
                </div>
              </div>
              <div className="ms-auto d-flex align-items-center">
                {/* Only show delete button for faculty */}
                {currentUser?.role === "FACULTY" && (
                  <FaTrash
                    className="text-danger me-3"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleDelete(assignment._id, assignment.title)}
                  />
                )}
                <FaCheckCircle className="text-success fs-5 me-2" />
                <IoEllipsisVertical className="fs-5" />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}