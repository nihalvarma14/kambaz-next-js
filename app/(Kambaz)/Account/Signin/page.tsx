/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Link from "next/link";
import * as client from "../client";
import { useRouter } from "next/navigation";
import { setCurrentUser } from "../reducer";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { Form, FormControl, Button, Alert } from "react-bootstrap";

export default function Signin() {
  const [credentials, setCredentials] = useState<any>({ username: "", password: "" });
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  
  const signin = async () => {
    try {
      setError(""); // Clear any previous errors
      const user = await client.signin(credentials);
      if (!user) {
        setError("User does not exist. Please check your credentials or sign up.");
        return;
      }
      dispatch(setCurrentUser(user));
      localStorage.setItem('currentUser', JSON.stringify(user)); // Save to localStorage
      router.push("/Dashboard");
    } catch (err: any) {
      // Handle error from server
      if (err.response && err.response.status === 401) {
        setError("User does not exist. Please check your credentials or sign up.");
      } else if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div id="wd-signin-screen" className="p-4" style={{ maxWidth: "400px" }}>
      <h3>Sign in</h3>
      
      {/* Error Alert */}
      {error && (
        <Alert variant="danger" dismissible onClose={() => setError("")}>
          {error}
        </Alert>
      )}
      
      <Form>
        <FormControl
          value={credentials.username}
          onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
          placeholder="username"
          className="wd-username mb-2"
          id="wd-username"
          autoComplete="off"
        />
        <FormControl
          value={credentials.password}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          placeholder="password"
          type="password"
          className="wd-password mb-2"
          id="wd-password"
          autoComplete="new-password"
        />
        <Button 
          onClick={signin} 
          variant="primary" 
          className="w-100 mb-2"
          id="wd-signin-btn"
        >
          Sign in
        </Button>
        <Link href="/Account/Signup" id="wd-signup-link">
          Sign up
        </Link>
      </Form>
    </div>
  );
}