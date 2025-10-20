"use client"

import Link from "next/link";
import { useParams } from "next/navigation";
import { BsGripVertical, BsPlus } from "react-icons/bs";
import { IoEllipsisVertical } from "react-icons/io5";
import { FaCheckCircle } from "react-icons/fa";
import { assignments } from "../../../Database";

export default function Assignments() {
  const { cid } = useParams();
  const courseAssignments = assignments.filter((assignment: any) => assignment.course === cid);
  
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
          <button id="wd-add-assignment" className="btn btn-danger">
            <BsPlus className="fs-4" /> Assignment
          </button>
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
        {courseAssignments.map((assignment: any) => (
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
                  <span className="fw-bold">Not available until</span> {new Date(assignment.availableFrom).toLocaleDateString()}
                  <span className="mx-1">|</span>
                  <div className="mt-1">
                    <span className="fw-bold">Due</span> {new Date(assignment.dueDate).toLocaleDateString()}
                    <span className="mx-1">|</span>
                    {assignment.points} pts
                  </div>
                </div>
              </div>
              <div className="ms-auto d-flex align-items-center">
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