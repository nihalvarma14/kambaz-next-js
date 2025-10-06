import Link from "next/link";

export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2>
      <hr />
      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          <div className="wd-dashboard-course col" style={{ width: "300px" }}>
            <div className="card rounded-3 overflow-hidden">
              <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                    href="/Courses/1234/Home">
                <img src="/images/reactjs.jpg" width="100%" height={160} alt="React JS Course" />
                <div className="card-body">
                  <h5 className="wd-dashboard-course-title card-title">
                    CS1234 React JS
                  </h5>
                  <p className="wd-dashboard-course-title card-text">
                    Full Stack software developer
                  </p>
                  <button className="btn btn-primary"> Go </button>
                </div>
              </Link>
            </div>
          </div>

          <div className="wd-dashboard-course col" style={{ width: "300px" }}>
            <div className="card rounded-3 overflow-hidden">
              <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                    href="/Courses/1234/Home">
                <img src="/images/reactjs.jpg" width="100%" height={160} alt="Node JS Course" />
                <div className="card-body">
                  <h5 className="wd-dashboard-course-title card-title">
                    CS1235 Node JS
                  </h5>
                  <p className="wd-dashboard-course-title card-text">
                    Backend development with Node.js
                  </p>
                  <button className="btn btn-primary"> Go </button>
                </div>
              </Link>
            </div>
          </div>

          <div className="wd-dashboard-course col" style={{ width: "300px" }}>
            <div className="card rounded-3 overflow-hidden">
              <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                    href="/Courses/1234/Home">
                <img src="/images/reactjs.jpg" width="100%" height={160} alt="Python Course" />
                <div className="card-body">
                  <h5 className="wd-dashboard-course-title card-title">
                    CS1236 Python
                  </h5>
                  <p className="wd-dashboard-course-title card-text">
                    Introduction to Python programming
                  </p>
                  <button className="btn btn-primary"> Go </button>
                </div>
              </Link>
            </div>
          </div>

          <div className="wd-dashboard-course col" style={{ width: "300px" }}>
            <div className="card rounded-3 overflow-hidden">
              <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                    href="/Courses/1234/Home">
                <img src="/images/reactjs.jpg" width="100%" height={160} alt="JavaScript Course" />
                <div className="card-body">
                  <h5 className="wd-dashboard-course-title card-title">
                    CS1237 JavaScript
                  </h5>
                  <p className="wd-dashboard-course-title card-text">
                    Modern JavaScript development
                  </p>
                  <button className="btn btn-primary"> Go </button>
                </div>
              </Link>
            </div>
          </div>

          <div className="wd-dashboard-course col" style={{ width: "300px" }}>
            <div className="card rounded-3 overflow-hidden">
              <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                    href="/Courses/1234/Home">
                <img src="/images/reactjs.jpg" width="100%" height={160} alt="Database Course" />
                <div className="card-body">
                  <h5 className="wd-dashboard-course-title card-title">
                    CS1238 Database Systems
                  </h5>
                  <p className="wd-dashboard-course-title card-text">
                    Relational and NoSQL databases
                  </p>
                  <button className="btn btn-primary"> Go </button>
                </div>
              </Link>
            </div>
          </div>

          <div className="wd-dashboard-course col" style={{ width: "300px" }}>
            <div className="card rounded-3 overflow-hidden">
              <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                    href="/Courses/1234/Home">
                <img src="/images/reactjs.jpg" width="100%" height={160} alt="Algorithms Course" />
                <div className="card-body">
                  <h5 className="wd-dashboard-course-title card-title">
                    CS1239 Algorithms
                  </h5>
                  <p className="wd-dashboard-course-title card-text">
                    Data structures and algorithms
                  </p>
                  <button className="btn btn-primary"> Go </button>
                </div>
              </Link>
            </div>
          </div>

          <div className="wd-dashboard-course col" style={{ width: "300px" }}>
            <div className="card rounded-3 overflow-hidden">
              <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                    href="/Courses/1234/Home">
                <img src="/images/reactjs.jpg" width="100%" height={160} alt="Web Dev Course" />
                <div className="card-body">
                  <h5 className="wd-dashboard-course-title card-title">
                    CS1240 Web Development
                  </h5>
                  <p className="wd-dashboard-course-title card-text">
                    HTML, CSS, and responsive design
                  </p>
                  <button className="btn btn-primary"> Go </button>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}