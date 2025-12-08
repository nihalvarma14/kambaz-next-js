"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import * as client from "../client";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../reducer";
import Link from "next/link";

export default function Signin() {
  const [credentials, setCredentials] = useState<{ username: string; password: string }>({
    username: "",
    password: "",
  });
  const router = useRouter();
  const dispatch = useDispatch();
  const [error, setError] = useState("");

  const signin = async () => {
    try {
      const user = await client.signin(credentials);
      if (!user) return;
      dispatch(setCurrentUser(user));
      router.push("/Dashboard");
    } catch (err: unknown) {
      setError("Invalid credentials. Please try again.");
      console.error("Signin error:", err);
    }
  };

  return (
    <div>
      <h1>Signin</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <input
        id="wd-username"
        value={credentials.username}
        onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
        className="form-control mb-2"
        placeholder="username"
      />
      <input
        id="wd-password"
        value={credentials.password}
        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
        className="form-control mb-2"
        placeholder="password"
        type="password"
      />
      <button
        id="wd-signin-btn"
        onClick={signin}
        className="btn btn-primary w-100 mb-2"
      >
        Sign in
      </button>
      <Link href="/Account/Signup">Sign up</Link>

      {/* Project Information */}
      <div className="mt-4 p-3 border rounded bg-light">
        <h6>Project Information</h6>
        <p className="mb-1"><strong>Name:</strong> Venkata Sai Siva Nihalvarma Pericherla</p>
        <p className="mb-1"><strong>Section:</strong> 4</p>
        <p className="mb-1">
          <strong>Frontend:</strong>{" "}
          <a href="https://github.com/nihalvarma14/kambaz-next-js" target="_blank" rel="noopener noreferrer">
            github.com/nihalvarma14/kambaz-next-js
          </a>
        </p>
        <p className="mb-0">
          <strong>Backend:</strong>{" "}
          <a href="https://github.com/nihalvarma14/kambaz-node-server-a6" target="_blank" rel="noopener noreferrer">
            github.com/nihalvarma14/kambaz-node-server-a6
          </a>
        </p>
      </div>
    </div>
  );
}