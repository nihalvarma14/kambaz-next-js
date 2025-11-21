/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { BsGripVertical } from "react-icons/bs";
import { MdOutlineAssignment } from "react-icons/md";
import { IoEllipsisVertical } from "react-icons/io5";
import { FaCheckCircle, FaTrash } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { useSelector, useDispatch } from "react-redux";
import { deleteAssignment, setAssignments } from "./reducer";
import { Modal, Button } from "react-bootstrap";
import * as client from "./client";

export default function Assignments() {
  const { cid } = useParams();
  const dispatch = useDispatch();
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);
  
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [assignmentToDelete, setAssignmentToDelete] = useState<any>(null);

  const fetchAssignments = async () => {
    if (!cid || Array.isArray(cid)) return;
    const assignments = await client.findAssignmentsForCourse(cid);
    dispatch(setAssignments(assignments));
  };

  useEffect(() => {
    fetchAssignments();
  }, [cid]);

  const handleDeleteClick = (assignment: any) => {
    setAssignmentToDelete(assignment);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (assignmentToDelete) {
      await client.deleteAssignment(assignmentToDelete._id);
      dispatch(deleteAssignment(assignmentToDelete._id));  // ← Changed from deleteAssignmentAction
      setShowDeleteModal(false);
      setAssignmentToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setAssignmentToDelete(null);
  };

  return (
    <div id="wd-assignments" className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="input-group" style={{ width: "300px" }}>
          <span className="input-group-text bg-white border-end-0">
            <CiSearch className="fs-5" />
          </span>
          <input
            type="text"
            className="form-control border-start-0"
            placeholder="Search for Assignments"
            id="wd-search-input"
          />
        </div>
        <div>
          <button className="btn btn-secondary me-2" id="wd-group-add">
            <FaPlus className="me-1" /> Group
          </button>
          <Link href={`/Courses/${cid}/Assignments/new`}>
            <button className="btn btn-danger" id="wd-assignment-add">
              <FaPlus className="me-1" /> Assignment
            </button>
          </Link>
        </div>
      </div>

      <div className="border rounded">
        <div className="bg-light p-3 d-flex align-items-center justify-content-between border-bottom">
          <div className="d-flex align-items-center">
            <BsGripVertical className="fs-5 me-2 text-muted" />
            <span className="fw-bold">▼ ASSIGNMENTS</span>
          </div>
          <div className="d-flex align-items-center">
            <span className="border rounded-pill px-2 py-1 me-3" style={{ fontSize: "0.85rem" }}>
              40% of Total
            </span>
            <FaPlus className="me-3" />
            <IoEllipsisVertical />
          </div>
        </div>

        <ul className="list-group list-group-flush" id="wd-assignment-list">
          {assignments.map((assignment: any) => (
            <li
              key={assignment._id}
              className="list-group-item py-3 wd-assignment-list-item"
              style={{ borderLeft: "4px solid #28a745" }}
            >
              <div className="d-flex align-items-start">
                <BsGripVertical className="fs-5 me-2 text-muted mt-1" />
                <MdOutlineAssignment className="fs-4 text-success me-3 mt-1" />
                <div className="flex-grow-1">
                  <Link
                    href={`/Courses/${cid}/Assignments/${assignment._id}`}
                    className="fw-bold text-dark text-decoration-none wd-assignment-link"
                  >
                    {assignment.title}
                  </Link>
                  <div className="mt-1" style={{ fontSize: "0.85rem", color: "#6c757d" }}>
                    <span className="text-danger">Multiple Modules</span> |{" "}
                    <span className="fw-normal">Not available until</span>{" "}
                    {assignment.availableFromDate} |
                    <br />
                    <span className="fw-normal">Due</span> {assignment.dueDate} |{" "}
                    {assignment.points} pts
                  </div>
                </div>
                <div className="d-flex align-items-start">
                  <FaCheckCircle className="text-success fs-5 me-3 mt-1" />
                  <button
                    onClick={() => handleDeleteClick(assignment)}
                    className="btn btn-link text-danger p-0 me-2"
                    title="Delete Assignment"
                  >
                    <FaTrash />
                  </button>
                  <IoEllipsisVertical className="fs-5 mt-1" />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={cancelDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Assignment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to remove the assignment &quot;{assignmentToDelete?.title}&quot;?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelDelete}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Yes, Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}