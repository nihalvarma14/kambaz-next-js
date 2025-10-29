"use client";

import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import * as db from "../../../../Database";

export default function PeopleTable() {
  const { cid } = useParams();
  
  // Get enrollments from Redux
  const { enrollments } = useSelector((state: any) => state.enrollmentsReducer);
  
  // Get all users from database
  const { users } = db;
  
  // Filter users enrolled in this course
  const enrolledUsers = users.filter((user: any) =>
    enrollments.some((e: any) => e.user === user._id && e.course === cid)
  );
  
  // Separate faculty and students
  const faculty = enrolledUsers.filter((user: any) => user.role === "FACULTY");
  const students = enrolledUsers.filter((user: any) => user.role === "STUDENT");

  return (
    <div id="wd-people-table" className="p-3">
      <h2>People</h2>
      
      {/* Faculty Section */}
      <h4 className="mt-4 mb-3">Faculty ({faculty.length})</h4>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Login ID</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {faculty.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center">No faculty enrolled in this course</td>
              </tr>
            ) : (
              faculty.map((user: any) => (
                <tr key={user._id}>
                  <td>
                    <FaUserCircle className="fs-4 text-secondary me-2" />
                    <strong>{user.firstName} {user.lastName}</strong>
                  </td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Students Section */}
      <h4 className="mt-4 mb-3">Students ({students.length})</h4>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Login ID</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {students.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center">No students enrolled in this course</td>
              </tr>
              ) : (
              students.map((user: any) => (
                <tr key={user._id}>
                  <td>
                    <FaUserCircle className="fs-4 text-secondary me-2" />
                    <strong>{user.firstName} {user.lastName}</strong>
                  </td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}