import ModulesControls from "./ModulesControls";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";
import { BsGripVertical } from "react-icons/bs";

export default function Modules() {
  return (
    <div>
      <ModulesControls /><br /><br /><br /><br />
      <ul id="wd-modules" className="list-group rounded-0">
        <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" /> Week 1 <ModuleControlButtons />
          </div>
          <ul className="wd-lessons list-group rounded-0">
            <li className="wd-lesson list-group-item p-3 ps-1">
              <BsGripVertical className="me-2 fs-3" /> LEARNING OBJECTIVES <LessonControlButtons />
              <ul className="wd-content">
                <li className="wd-content-item">Introduction to the course <LessonControlButtons /></li>
                <li className="wd-content-item">Learn what is Web Development <LessonControlButtons /></li>
              </ul>
            </li>
            <li className="wd-lesson list-group-item p-3 ps-1">
              <BsGripVertical className="me-2 fs-3" /> READING <LessonControlButtons />
              <ul className="wd-content">
                <li className="wd-content-item">Full Stack Developer - Chapter 1 - Introduction <LessonControlButtons /></li>
                <li className="wd-content-item">Full Stack Developer - Chapter 2 - Creating User <LessonControlButtons /></li>
              </ul>
            </li>
            <li className="wd-lesson list-group-item p-3 ps-1">
              <BsGripVertical className="me-2 fs-3" /> SLIDES <LessonControlButtons />
              <ul className="wd-content">
                <li className="wd-content-item">Introduction to Web Development <LessonControlButtons /></li>
                <li className="wd-content-item">Creating an HTTP server with Node.js <LessonControlButtons /></li>
                <li className="wd-content-item">Creating a React Application <LessonControlButtons /></li>
              </ul>
            </li>
          </ul>
        </li>
        <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" /> Week 2 <ModuleControlButtons />
          </div>
          <ul className="wd-lessons list-group rounded-0">
            <li className="wd-lesson list-group-item p-3 ps-1">
              <BsGripVertical className="me-2 fs-3" /> LEARNING OBJECTIVES <LessonControlButtons />
            </li>
          </ul>
        </li>
        <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" /> Week 3 <ModuleControlButtons />
          </div>
        </li>
      </ul>
    </div>
  );
}