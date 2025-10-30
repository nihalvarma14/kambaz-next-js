"use client"

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addAssignment, updateAssignment } from "../reducer";

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

// Define the Redux state type
interface RootState {
  assignmentsReducer: {
    assignments: Assignment[];
  };
}

export default function AssignmentEditor() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  
  // Extract and normalize params
  const cid = Array.isArray(params.cid) ? params.cid[0] : params.cid;
  const aid = Array.isArray(params.aid) ? params.aid[0] : params.aid;
  
  // Get assignments from Redux store
  const { assignments } = useSelector((state: RootState) => state.assignmentsReducer);
  
  // Find existing assignment if editing
  const existingAssignment = assignments.find((a) => a._id === aid);
  
  // State for assignment form
  const [assignment, setAssignment] = useState<Assignment>({
    _id: "",
    title: "",
    course: cid || "",
    description: "",
    points: 100,
    due: "",
    dueDate: "",
    availableFrom: "",
    availableUntil: "",
  });
  
  // Load existing assignment data if editing
  useEffect(() => {
    if (aid !== "new" && existingAssignment) {
      setAssignment(existingAssignment);
    }
  }, [aid, existingAssignment]);
  
  // Handle save
  const handleSave = () => {
    if (aid === "new") {
      // Create new assignment
      dispatch(addAssignment(assignment));
    } else {
      // Update existing assignment
      dispatch(updateAssignment(assignment));
    }
    // Navigate back to assignments list
    router.push(`/Courses/${cid}/Assignments`);
  };
  
  // Handle cancel
  const handleCancel = () => {
    router.push(`/Courses/${cid}/Assignments`);
  };
  
  return (
    <div id="wd-assignments-editor" className="p-3">
      <form>
        <div className="mb-3">
          <label htmlFor="wd-name" className="form-label">Assignment Name</label>
          <input
            id="wd-name"
            type="text"
            className="form-control"
            value={assignment.title}
            onChange={(e) => setAssignment({ ...assignment, title: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <textarea
            id="wd-description"
            className="form-control"
            rows={5}
            value={assignment.description}
            onChange={(e) => setAssignment({ ...assignment, description: e.target.value })}
          />
        </div>

        <div className="row mb-3">
          <label htmlFor="wd-points" className="col-sm-2 col-form-label text-end">
            Points
          </label>
          <div className="col-sm-10">
            <input
              id="wd-points"
              type="number"
              className="form-control"
              value={assignment.points}
              onChange={(e) => setAssignment({ ...assignment, points: parseInt(e.target.value) || 0 })}
            />
          </div>
        </div>

        <div className="row mb-3">
          <label htmlFor="wd-group" className="col-sm-2 col-form-label text-end">
            Assignment Group
          </label>
          <div className="col-sm-10">
            <select id="wd-group" className="form-select">
              <option>ASSIGNMENTS</option>
            </select>
          </div>
        </div>

        <div className="row mb-3">
          <label htmlFor="wd-display-grade-as" className="col-sm-2 col-form-label text-end">
            Display Grade as
          </label>
          <div className="col-sm-10">
            <select id="wd-display-grade-as" className="form-select">
              <option>Percentage</option>
            </select>
          </div>
        </div>

        <div className="row mb-3">
          <label htmlFor="wd-submission-type" className="col-sm-2 col-form-label text-end">
            Submission Type
          </label>
          <div className="col-sm-10">
            <div className="border rounded p-3">
              <select id="wd-submission-type" className="form-select mb-3">
                <option>Online</option>
              </select>

              <div className="mb-3">
                <strong>Online Entry Options</strong>
                <div className="form-check">
                  <input type="checkbox" className="form-check-input" id="wd-text-entry" />
                  <label className="form-check-label" htmlFor="wd-text-entry">Text Entry</label>
                </div>
                <div className="form-check">
                  <input type="checkbox" className="form-check-input" id="wd-website-url" defaultChecked />
                  <label className="form-check-label" htmlFor="wd-website-url">Website URL</label>
                </div>
                <div className="form-check">
                  <input type="checkbox" className="form-check-input" id="wd-media-recordings" />
                  <label className="form-check-label" htmlFor="wd-media-recordings">Media Recordings</label>
                </div>
                <div className="form-check">
                  <input type="checkbox" className="form-check-input" id="wd-student-annotation" />
                  <label className="form-check-label" htmlFor="wd-student-annotation">Student Annotation</label>
                </div>
                <div className="form-check">
                  <input type="checkbox" className="form-check-input" id="wd-file-upload" />
                  <label className="form-check-label" htmlFor="wd-file-upload">File Uploads</label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row mb-3">
          <label className="col-sm-2 col-form-label text-end">Assign</label>
          <div className="col-sm-10">
            <div className="border rounded p-3">
              <div className="mb-3">
                <label htmlFor="wd-assign-to" className="form-label">Assign to</label>
                <input id="wd-assign-to" type="text" className="form-control" defaultValue="Everyone" />
              </div>

              <div className="mb-3">
                <label htmlFor="wd-due-date" className="form-label">Due</label>
                <input
                  id="wd-due-date"
                  type="datetime-local"
                  className="form-control"
                  value={assignment.dueDate}
                  onChange={(e) => setAssignment({ ...assignment, dueDate: e.target.value, due: e.target.value })}
                />
              </div>

              <div className="row">
                <div className="col-md-6">
                  <label htmlFor="wd-available-from" className="form-label">Available from</label>
                  <input
                    id="wd-available-from"
                    type="datetime-local"
                    className="form-control"
                    value={assignment.availableFrom}
                    onChange={(e) => setAssignment({ ...assignment, availableFrom: e.target.value })}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="wd-available-until" className="form-label">Until</label>
                  <input
                    id="wd-available-until"
                    type="datetime-local"
                    className="form-control"
                    value={assignment.availableUntil}
                    onChange={(e) => setAssignment({ ...assignment, availableUntil: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr />
        <div className="d-flex justify-content-end">
          <button
            type="button"
            className="btn btn-secondary me-2"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}