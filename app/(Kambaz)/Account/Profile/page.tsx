"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "../reducer";

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

// Define the Redux state type (at least the part we're using)
interface RootState {
  accountReducer: {
    currentUser: User | null;
  };
}

export default function Profile() {
  const [profile, setProfile] = useState<User>({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    dob: "",
    email: "",
    role: "USER",
  });
  const dispatch = useDispatch();
  const router = useRouter();
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  
  // Function to fetch and populate profile data
  const fetchProfile = () => {
    // If no user is signed in, redirect to Signin
    if (!currentUser) {
      router.push("/Account/Signin");
      return;
    }
    // Populate profile with current user data
    setProfile(currentUser);
  };
  
  // Function to sign out user
  const signout = () => {
    // Set current user to null in Redux store
    dispatch(setCurrentUser(null));
    // Navigate to Signin screen
    router.push("/Account/Signin");
  };
  
  // Fetch profile when component mounts
  useEffect(() => {
    fetchProfile();
  }, []);
  
  return (
    <div id="wd-profile-screen" className="container mt-5" style={{ maxWidth: "500px" }}>
      <h3>Profile</h3>
      {profile && (
        <form>
          <div className="mb-3">
            <label htmlFor="wd-username" className="form-label">Username</label>
            <input
              id="wd-username"
              type="text"
              className="form-control"
              value={profile.username || ""}
              onChange={(e) =>
                setProfile({ ...profile, username: e.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <label htmlFor="wd-password" className="form-label">Password</label>
            <input
              id="wd-password"
              type="password"
              className="form-control"
              value={profile.password || ""}
              onChange={(e) =>
                setProfile({ ...profile, password: e.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <label htmlFor="wd-firstname" className="form-label">First Name</label>
            <input
              id="wd-firstname"
              type="text"
              className="form-control"
              value={profile.firstName || ""}
              onChange={(e) =>
                setProfile({ ...profile, firstName: e.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <label htmlFor="wd-lastname" className="form-label">Last Name</label>
            <input
              id="wd-lastname"
              type="text"
              className="form-control"
              value={profile.lastName || ""}
              onChange={(e) =>
                setProfile({ ...profile, lastName: e.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <label htmlFor="wd-dob" className="form-label">Date of Birth</label>
            <input
              id="wd-dob"
              type="date"
              className="form-control"
              value={profile.dob || ""}
              onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="wd-email" className="form-label">Email</label>
            <input
              id="wd-email"
              type="email"
              className="form-control"
              value={profile.email || ""}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="wd-role" className="form-label">Role</label>
            <select
              id="wd-role"
              className="form-select"
              value={profile.role || "USER"}
              onChange={(e) => setProfile({ ...profile, role: e.target.value as User["role"] })}
            >
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
              <option value="FACULTY">Faculty</option>
              <option value="STUDENT">Student</option>
            </select>
          </div>
          <button
            type="button"
            id="wd-signout-btn"
            onClick={signout}
            className="btn btn-danger w-100"
          >
            Sign out
          </button>
        </form>
      )}
    </div>
  );
}