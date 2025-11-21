"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import * as client from "../../../../Account/client";
import * as enrollmentsClient from "../../../../Account/enrollmentsClient";
import { Table, Button, Modal, Form } from "react-bootstrap";
import { FaUserCircle, FaPlus, FaEdit, FaTrash } from "react-icons/fa";

interface User {
  _id?: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  email: string;
  role: string;
  section: string;
  loginId: string;
  lastActivity: string;
  totalActivity: string;
}

interface RootState {
  accountReducer: {
    currentUser: User | null;
  };
}

export default function PeopleTable() {
  const { cid } = useParams();
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const [users, setUsers] = useState<User[]>([]);
  const [enrolledUsers, setEnrolledUsers] = useState<User[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [userForm, setUserForm] = useState<User>({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    email: "",
    role: "STUDENT",
    section: "S101",
    loginId: "",
    lastActivity: "",
    totalActivity: "",
  });

  const fetchUsers = async () => {
    try {
      const allUsers = await client.findAllUsers();
      setUsers(allUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchEnrolledUsers = async () => {
    if (!cid || Array.isArray(cid)) return;
    try {
      const enrollments = await enrollmentsClient.findEnrollmentsForCourse(cid);
      const enrolledUserIds = enrollments.map((e: { user: string }) => e.user);
      const enrolled = users.filter((user) =>
        enrolledUserIds.includes(user._id || "")
      );
      setEnrolledUsers(enrolled);
    } catch (error) {
      console.error("Error fetching enrollments:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (users.length > 0) {
      fetchEnrolledUsers();
    }
  }, [users, cid]);

  const handleShowModal = (user?: User) => {
    if (user) {
      setEditingUser(user);
      setUserForm(user);
    } else {
      setEditingUser(null);
      setUserForm({
        firstName: "",
        lastName: "",
        username: "",
        password: "",
        email: "",
        role: "STUDENT",
        section: "S101",
        loginId: "",
        lastActivity: "",
        totalActivity: "",
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingUser(null);
  };

  const handleSaveUser = async () => {
    if (!cid || Array.isArray(cid)) return;
    
    try {
      if (editingUser) {
        // Update existing user
        await client.updateUser({ ...userForm, _id: editingUser._id });
      } else {
        // Create new user
        const newUser = await client.createUser(userForm);
        // Automatically enroll the new user in the current course
        if (newUser && newUser._id) {
          await enrollmentsClient.enrollUserInCourse(newUser._id, cid as string);
        }
      }
      fetchUsers();
      handleCloseModal();
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await client.deleteUser(userId);
        fetchUsers();
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  const isFaculty = currentUser?.role === "FACULTY";

  return (
    <div id="wd-people-table">
      {isFaculty && (
        <div className="mb-3">
          <Button variant="success" onClick={() => handleShowModal()}>
            <FaPlus className="me-2" />
            Add User
          </Button>
        </div>
      )}

      <Table striped>
        <thead>
          <tr>
            <th>Name</th>
            <th>Login ID</th>
            <th>Section</th>
            <th>Role</th>
            <th>Last Activity</th>
            <th>Total Activity</th>
            {isFaculty && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {enrolledUsers.map((user: User) => (
            <tr key={user._id}>
              <td className="wd-full-name text-nowrap">
                <FaUserCircle className="me-2 fs-1 text-secondary" />
                <span className="wd-first-name">{user.firstName}</span>{" "}
                <span className="wd-last-name">{user.lastName}</span>
              </td>
              <td className="wd-login-id">{user.loginId}</td>
              <td className="wd-section">{user.section}</td>
              <td className="wd-role">{user.role}</td>
              <td className="wd-last-activity">{user.lastActivity}</td>
              <td className="wd-total-activity">{user.totalActivity}</td>
              {isFaculty && (
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    className="me-2"
                    onClick={() => handleShowModal(user)}
                  >
                    <FaEdit />
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDeleteUser(user._id || "")}
                  >
                    <FaTrash />
                  </Button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </Table>

      {/* User Edit/Create Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{editingUser ? "Edit User" : "Add User"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                value={userForm.firstName}
                onChange={(e) =>
                  setUserForm({ ...userForm, firstName: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                value={userForm.lastName}
                onChange={(e) =>
                  setUserForm({ ...userForm, lastName: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={userForm.username}
                onChange={(e) =>
                  setUserForm({ ...userForm, username: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={userForm.password}
                onChange={(e) =>
                  setUserForm({ ...userForm, password: e.target.value })
                }
                placeholder={editingUser ? "Leave blank to keep current" : ""}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={userForm.email}
                onChange={(e) =>
                  setUserForm({ ...userForm, email: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Select
                value={userForm.role}
                onChange={(e) =>
                  setUserForm({ ...userForm, role: e.target.value })
                }
              >
                <option value="STUDENT">Student</option>
                <option value="FACULTY">Faculty</option>
                <option value="TA">TA</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Section</Form.Label>
              <Form.Control
                type="text"
                value={userForm.section}
                onChange={(e) =>
                  setUserForm({ ...userForm, section: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Login ID</Form.Label>
              <Form.Control
                type="text"
                value={userForm.loginId}
                onChange={(e) =>
                  setUserForm({ ...userForm, loginId: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveUser}>
            {editingUser ? "Update" : "Create"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}