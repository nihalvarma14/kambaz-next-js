"use client";
import { useState, useEffect } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import PeopleTable from "../../Courses/[cid]/People/Table/page";
import * as client from "../client";

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

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [role, setRole] = useState<string>("");
  const [name, setName] = useState<string>("");

  const filterUsersByRole = async (selectedRole: string) => {
    setRole(selectedRole);
    setName("");
    if (selectedRole) {
      const users = await client.findUsersByRole(selectedRole);
      setUsers(users);
    } else {
      fetchUsers();
    }
  };

  const filterUsersByName = async (searchName: string) => {
    setName(searchName);
    setRole("");
    if (searchName) {
      const users = await client.findUsersByPartialName(searchName);
      setUsers(users);
    } else {
      fetchUsers();
    }
  };

  const createUser = async () => {
    const newUser = {
      firstName: `User${users.length + 1}`,
      lastName: `New`,
      username: `newuser${Date.now()}`,
      password: "password123",
      email: `newuser${users.length + 1}@neu.edu`,
      role: "STUDENT",
      section: "S101",
      loginId: `001234567${users.length}`,
      lastActivity: new Date().toISOString().split('T')[0],
      totalActivity: "00:00:00",
    };
    
    const user = await client.createUser(newUser);
    setUsers([...users, user]);
  };

  const fetchUsers = async () => {
    const users = await client.findAllUsers();
    setUsers(users);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h3>Users</h3>
      
      <div className="d-flex gap-3 mb-3">
        <Form.Select
          value={role}
          onChange={(e) => filterUsersByRole(e.target.value)}
          className="w-25"
        >
          <option value="">All Roles</option>
          <option value="STUDENT">Students</option>
          <option value="FACULTY">Faculty</option>
          <option value="TA">Assistants</option>
          <option value="ADMIN">Administrators</option>
        </Form.Select>

        <InputGroup className="w-50">
          <Form.Control
            type="text"
            placeholder="Search people"
            value={name}
            onChange={(e) => filterUsersByName(e.target.value)}
          />
        </InputGroup>

        <Button variant="success" onClick={createUser}>
          <FaPlus className="me-2" />
          People
        </Button>
      </div>

      <PeopleTable users={users} fetchUsers={fetchUsers} />
    </div>
  );
}