/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import * as client from "../client";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { setCurrentUser } from "../reducer";
import { Form, Button } from "react-bootstrap";

export default function Profile() {
  const [profile, setProfile] = useState<any>({});
  const dispatch = useDispatch();
  const router = useRouter();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  
  const updateProfile = async () => {
    const updatedProfile = await client.updateUser(profile);
    dispatch(setCurrentUser(updatedProfile));
    localStorage.setItem('currentUser', JSON.stringify(updatedProfile)); // Update localStorage
  };

  const signout = async () => {
    await client.signout();
    dispatch(setCurrentUser(null));
    localStorage.removeItem('currentUser'); // Clear localStorage
    router.push("/Account/Signin");
  };
  
  useEffect(() => {
    if (!currentUser) {
      router.push("/Account/Signin");
      return;
    }
    setProfile(currentUser);
  }, [currentUser, router]);

  return (
    <div id="wd-profile-screen" className="p-4" style={{ maxWidth: "500px" }}>
      <h3>Profile</h3>
      {profile && (
        <Form>
          <div className="mb-3">
            <Form.Label htmlFor="wd-username">Username</Form.Label>
            <Form.Control
              id="wd-username"
              value={profile.username || ""}
              onChange={(e) => setProfile({ ...profile, username: e.target.value })}
            />
          </div>

          <div className="mb-3">
            <Form.Label htmlFor="wd-password">Password</Form.Label>
            <Form.Control
              id="wd-password"
              type="password"
              value={profile.password || ""}
              onChange={(e) => setProfile({ ...profile, password: e.target.value })}
            />
          </div>

          <div className="mb-3">
            <Form.Label htmlFor="wd-firstname">First Name</Form.Label>
            <Form.Control
              id="wd-firstname"
              value={profile.firstName || ""}
              onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
            />
          </div>

          <div className="mb-3">
            <Form.Label htmlFor="wd-lastname">Last Name</Form.Label>
            <Form.Control
              id="wd-lastname"
              value={profile.lastName || ""}
              onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
            />
          </div>

          <div className="mb-3">
            <Form.Label htmlFor="wd-dob">Date of Birth</Form.Label>
            <Form.Control
              id="wd-dob"
              type="date"
              value={profile.dob || ""}
              onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
            />
          </div>

          <div className="mb-3">
            <Form.Label htmlFor="wd-email">Email</Form.Label>
            <Form.Control
              id="wd-email"
              type="email"
              value={profile.email || ""}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            />
          </div>

          <div className="mb-3">
            <Form.Label htmlFor="wd-role">Role</Form.Label>
            <Form.Select 
              id="wd-role" 
              value={profile.role || "USER"}
              onChange={(e) => setProfile({ ...profile, role: e.target.value })}
            >
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
              <option value="FACULTY">Faculty</option>
              <option value="STUDENT">Student</option>
            </Form.Select>
          </div>
          <button onClick={updateProfile} className="btn btn-primary w-100 mb-2"> Update </button>
          <Button 
            onClick={signout} 
            variant="danger" 
            className="w-100"
            id="wd-signout-btn"
          >
            Sign out
          </Button>
        </Form>
      )}
    </div>
  );
}