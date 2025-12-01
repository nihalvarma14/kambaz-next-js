"use client";
import { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { FaUserCircle, FaPencilAlt, FaCheck } from "react-icons/fa";
import * as client from "../../../Account/client";

interface User {
  _id?: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  role: string;
  section: string;
  loginId: string;
  lastActivity: string;
  totalActivity: string;
}

interface PeopleDetailsProps {
  uid: string | null;
  onClose: () => void;
  fetchUsers?: () => void;
}

export default function PeopleDetails({ uid, onClose, fetchUsers }: PeopleDetailsProps) {
  const [user, setUser] = useState<User | null>(null);
  const [editing, setEditing] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const fetchUser = async () => {
    if (!uid) return;
    try {
      const fetchedUser = await client.findUserById(uid);
      setUser(fetchedUser);
      setFirstName(fetchedUser.firstName);
      setLastName(fetchedUser.lastName);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const saveUser = async () => {
    if (!user) return;
    try {
      const updatedUser = { ...user, firstName, lastName };
      await client.updateUser(updatedUser);
      setUser(updatedUser);
      setEditing(false);
      if (fetchUsers) {
        fetchUsers();
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleClose = () => {
    setEditing(false);
    onClose();
  };

  useEffect(() => {
    if (uid) {
      fetchUser();
      setEditing(false);
    }
  }, [uid]);

  if (!uid) return null;

  return (
    <Modal show={!!uid} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>User Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {user ? (
          <div className="text-center">
            <FaUserCircle className="fs-1 text-secondary mb-3" />
            
            {editing ? (
              <div className="mb-3">
                <Form.Group className="mb-2">
                  <Form.Control
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First Name"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Control
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last Name"
                  />
                </Form.Group>
              </div>
            ) : (
              <h4>
                {user.firstName} {user.lastName}
                <Button
                  variant="link"
                  className="text-warning ms-2"
                  onClick={() => setEditing(true)}
                >
                  <FaPencilAlt />
                </Button>
              </h4>
            )}

            <div className="text-start mt-4">
              <p>
                <strong>Roles:</strong> {user.role}
              </p>
              <p>
                <strong>Login ID:</strong> {user.loginId}
              </p>
              <p>
                <strong>Section:</strong> {user.section}
              </p>
              <p>
                <strong>Total Activity:</strong> {user.totalActivity}
              </p>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        {editing ? (
          <>
            <Button variant="secondary" onClick={() => setEditing(false)}>
              Cancel
            </Button>
            <Button variant="success" onClick={saveUser}>
              <FaCheck className="me-2" />
              Save
            </Button>
          </>
        ) : (
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}