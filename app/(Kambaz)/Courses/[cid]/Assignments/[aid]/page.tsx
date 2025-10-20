"use client"

import { useParams } from "next/navigation";
import Link from "next/link";
import { assignments } from "../../../../Database";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const assignment = assignments.find((a: any) => a._id === aid);
  
  return (
    <div id="wd-assignments-editor" className="p-3">
      <form>
        <div className="mb-3">
          <label htmlFor="wd-name" className="form-label">Assignment Name</label>
          <input
            id="wd-name"
            type="text"
            className="form-control"
            defaultValue={assignment?.title || ""}
          />
        </div>

        <div className="mb-3">
          <textarea
            id="wd-description"
            className="form-control"
            rows={5}
            defaultValue={assignment?.description || ""}
          />
        </div>

        <div className="row mb-3">
          <label htmlFor="wd-points" className="col-sm-2 col-form-label text-end">
            Points
          </label>
          <div className="col-sm-10">
            <input id="wd-points" type="number" className="form-control" defaultValue={assignment?.points || 100} />
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
                  defaultValue={assignment?.dueDate || "2024-05-13T23:59"}
                />
              </div>

              <div className="row">
                <div className="col-md-6">
                  <label htmlFor="wd-available-from" className="form-label">Available from</label>
                  <input
                    id="wd-available-from"
                    type="datetime-local"
                    className="form-control"
                    defaultValue={assignment?.availableFrom || "2024-05-06T00:00"}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="wd-available-until" className="form-label">Until</label>
                  <input
                    id="wd-available-until"
                    type="datetime-local"
                    className="form-control"
                    defaultValue={assignment?.availableUntil || "2024-05-20T23:59"}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr />
        <div className="d-flex justify-content-end">
          <Link href={`/Courses/${cid}/Assignments`} className="btn btn-secondary me-2">
            Cancel
          </Link>
          <Link href={`/Courses/${cid}/Assignments`} className="btn btn-danger">
            Save
          </Link>
        </div>
      </form>
    </div>
  );
}