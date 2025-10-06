import Link from "next/link";

export default function Profile() {
  return (
    <div id="wd-profile-screen" className="container mt-5" style={{ maxWidth: "500px" }}>
      <h3>Profile</h3>
      <form>
        <div className="mb-3">
          <label htmlFor="wd-username" className="form-label">Username</label>
          <input
            id="wd-username"
            type="text"
            className="form-control"
            defaultValue="alice"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="wd-password" className="form-label">Password</label>
          <input
            id="wd-password"
            type="password"
            className="form-control"
            defaultValue="123"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="wd-firstname" className="form-label">First Name</label>
          <input
            id="wd-firstname"
            type="text"
            className="form-control"
            defaultValue="Alice"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="wd-lastname" className="form-label">Last Name</label>
          <input
            id="wd-lastname"
            type="text"
            className="form-control"
            defaultValue="Wonderland"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="wd-dob" className="form-label">Date of Birth</label>
          <input
            id="wd-dob"
            type="date"
            className="form-control"
            defaultValue="2000-01-01"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="wd-email" className="form-label">Email</label>
          <input
            id="wd-email"
            type="email"
            className="form-control"
            defaultValue="alice@wonderland.com"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="wd-role" className="form-label">User</label>
          <select id="wd-role" className="form-select">
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>
            <option value="STUDENT">Student</option>
          </select>
        </div>
        <Link
          id="wd-signout-btn"
          href="/Account/Signin"
          className="btn btn-danger w-100"
        >
          Signout
        </Link>
      </form>
    </div>
  );
}
