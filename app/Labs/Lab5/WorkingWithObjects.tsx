import React, { useState } from "react";
import { FormControl } from "react-bootstrap";
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;

export default function WorkingWithObjects() {
  const [assignment, setAssignment] = useState({
    id: 1, title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10", completed: false, score: 0,
  });

  const [moduleName, setModuleName] = useState("");
  const [moduleDescription, setModuleDescription] = useState("");
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const ASSIGNMENT_API_URL = `${HTTP_SERVER}/lab5/assignment`;

  return (
    <div id="wd-working-with-objects">
      <h3>Working With Objects</h3>
      <h4>Modifying Properties</h4>
      <a id="wd-update-assignment-title"
         className="btn btn-primary float-end"
         href={`${ASSIGNMENT_API_URL}/title/${assignment.title}`}>
        Update Title </a>
      <FormControl className="w-75" id="wd-assignment-title"
        defaultValue={assignment.title} onChange={(e) =>
          setAssignment({ ...assignment, title: e.target.value })}/>
      <hr />

      <h4>Retrieving Objects</h4>
      <a id="wd-retrieve-assignments" className="btn btn-primary"
         href={`${HTTP_SERVER}/lab5/assignment`}>
        Get Assignment
      </a><hr/>
      
      <h4>Retrieving Properties</h4>
      <a id="wd-retrieve-assignment-title" className="btn btn-primary"
         href={`${HTTP_SERVER}/lab5/assignment/title`}>
        Get Title
      </a><hr/>

      <h3>Working with Module Object</h3>
      <h4>Retrieving Module</h4>
      <a id="wd-get-module" className="btn btn-primary me-2"
         href={`${HTTP_SERVER}/lab5/module`}>
        Get Module
      </a>
      <a id="wd-get-module-name" className="btn btn-primary"
         href={`${HTTP_SERVER}/lab5/module/name`}>
        Get Module Name
      </a><hr/>

      <h4>Modifying Module Name</h4>
      <a id="wd-update-module-name" className="btn btn-primary float-end"
         href={`${HTTP_SERVER}/lab5/module/name/${moduleName}`}>
        Update Module Name
      </a>
      <FormControl className="w-75 mb-2" value={moduleName}
        onChange={(e) => setModuleName(e.target.value)}
        placeholder="New Module Name"/>
      <hr/>

      <h4>Modifying Module Description</h4>
      <a id="wd-update-module-description" className="btn btn-primary float-end"
         href={`${HTTP_SERVER}/lab5/module/description/${moduleDescription}`}>
        Update Module Description
      </a>
      <FormControl as="textarea" className="w-75 mb-2" 
        value={moduleDescription}
        onChange={(e) => setModuleDescription(e.target.value)}
        placeholder="New Module Description"/>
      <hr/>

      <h4>Modifying Assignment Score</h4>
      <a id="wd-update-assignment-score" className="btn btn-primary float-end"
         href={`${HTTP_SERVER}/lab5/assignment/score/${score}`}>
        Update Score
      </a>
      <FormControl type="number" className="w-75 mb-2" value={score}
        onChange={(e) => setScore(parseInt(e.target.value))}
        placeholder="New Score"/>
      <hr/>

      <h4>Modifying Assignment Completed</h4>
      <div className="form-check mb-2">
        <input type="checkbox" className="form-check-input"
          id="wd-assignment-completed" checked={completed}
          onChange={(e) => setCompleted(e.target.checked)}/>
        <label className="form-check-label" htmlFor="wd-assignment-completed">
          Completed
        </label>
      </div>
      <a id="wd-update-assignment-completed" className="btn btn-primary"
         href={`${HTTP_SERVER}/lab5/assignment/completed/${completed}`}>
        Update Completed
      </a>
      <hr/>
    </div>
  );
}

