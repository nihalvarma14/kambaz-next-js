"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { setCurrentUser } from "../reducer";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import * as client from "../client";

interface User {
  username?: string;
  password?: string;
}

export default function Signup() {
  const [user, setUser] = useState<User>({});
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const signup = async () => {
    try {
      setError("");
      const currentUser = await client.signup(user);
      dispatch(setCurrentUser(currentUser));
      router.push("/Account/Profile");
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'message' in err) {
        setError((err as { message: string }).message);
      } else {
        setError("Signup failed");
      }
    }
  };

  return (
    <div id="wd-signup-screen" className="p-4" style={{ maxWidth: "400px" }}>
      <h3>Sign up</h3>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <Form>
        <Form.Control
          value={user.username || ""}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder="username"
          className="wd-username mb-2"
          autoComplete="off"
        />
        <Form.Control
          value={user.password || ""}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="password"
          type="password"
          className="wd-password mb-2"
          autoComplete="new-password"
        />
        <Button 
          onClick={signup} 
          variant="primary" 
          className="wd-signup-btn w-100 mb-2"
          id="wd-signup-btn"
        >
          Sign up
        </Button>
        <Link href="/Account/Signin" id="wd-signin-link">
          Sign in
        </Link>
      </Form>
    </div>
  );
}