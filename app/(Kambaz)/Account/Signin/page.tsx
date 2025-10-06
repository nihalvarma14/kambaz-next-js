import Link from "next/link";

export default function Signin() {
  return (
    <div id="wd-signin-screen" className="container mt-5" style={{ maxWidth: "400px" }}>
      <h3>Sign in</h3>
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
          id="wd-signin-btn"
          href="/Dashboard"
          className="btn btn-primary w-100 mb-2"
        >
          Sign in
        </Link>
        <Link
          id="wd-signup-link"
          href="/Account/Signup"
          className="d-block text-center"
        >
          Sign up
        </Link>
      </form>
    </div>
  );
}
