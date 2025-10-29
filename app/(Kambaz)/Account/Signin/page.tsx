"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { setCurrentUser } from "../reducer";
import { useDispatch } from "react-redux";
import { useState } from "react";
import * as db from "../../Database";

export default function Signin() {
  // State variable to track user credentials
  const [credentials, setCredentials] = useState<any>({});
  const dispatch = useDispatch();
  const router = useRouter();

  // Function to sign in the user
  const signin = () => {
    // Search for user with matching credentials
    const user = db.users.find(
      (u: any) =>
        u.username === credentials.username &&
        u.password === credentials.password
    );
    
    // If no user found, ignore the sign in attempt
    if (!user) {
      alert("Invalid username or password");
      return;
    }
    
    // Store user in reducer by dispatching to Account reducer
    dispatch(setCurrentUser(user));
    
    // Navigate to Dashboard after successful sign in
    router.push("/Dashboard");
  };

  return (
    <div id="wd-signin-screen" className="container mt-5" style={{ maxWidth: "400px" }}>
      <h3 className="mb-4">Sign in</h3>
      
      <form onSubmit={(e) => { e.preventDefault(); signin(); }}>
        {/* Username input field */}
        <div className="mb-3">
          <input
            type="text"
            value={credentials.username || ""}
            onChange={(e) =>
              setCredentials({ ...credentials, username: e.target.value })
            }
            className="form-control"
            placeholder="username"
            id="wd-username"
          />
        </div>
        
        {/* Password input field */}
        <div className="mb-3">
          <input
            type="password"
            value={credentials.password || ""}
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
            className="form-control"
            placeholder="password"
            id="wd-password"
          />
        </div>
        
        {/* Sign in button */}
        <button 
          type="submit"
          onClick={signin} 
          id="wd-signin-btn" 
          className="btn btn-primary w-100 mb-3"
        >
          Sign in
        </button>
      </form>
      
      {/* Link to sign up page */}
      <div className="text-center">
        <Link id="wd-signup-link" href="/Account/Signup" className="text-decoration-none">
          Don't have an account? Sign up
        </Link>
      </div>
    </div>
  );
}