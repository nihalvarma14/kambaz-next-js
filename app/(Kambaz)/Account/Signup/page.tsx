import Link from "next/link";

export default function Signup() {
  return (
    <div id="wd-signup-screen" className="container mt-5" style={{ maxWidth: "400px" }}>
      <h3>Sign up</h3>
      <form>
        <div className="mb-3">
          <input
            id="wd-username"
            type="text"
            className="form-control"
            placeholder="username"
          />
        </div>
        <div className="mb-3">
          <input
            id="wd-password"
            type="password"
            className="form-control"
            placeholder="password"
          />
        </div>
        <Link
          id="wd-signup-btn"
          href="/Account/Profile"
          className="btn btn-primary w-100 mb-2"
        >
          Sign up
        </Link>
        <Link
          id="wd-signin-link"
          href="/Account/Signin"
          className="d-block text-center"
        >
          Sign in
        </Link>
      </form>
    </div>
  );
}