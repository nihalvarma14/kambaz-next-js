"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { FormControl, ListGroup } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import ModulesControls from "./ModulesControls";
import ModuleControlButtons from "./ModuleControlButtons";
import { addModule, editModule, updateModule, deleteModule } from "./reducer";
import { useSelector, useDispatch } from "react-redux";

// Define the Module type
interface Module {
  _id: string;
  name: string;
  course: string;
  editing?: boolean;
}

// Define the Redux state type
interface RootState {
  modulesReducer: {
    modules: Module[];
  };
}

export default function Modules() {
  const params = useParams();
  const [moduleName, setModuleName] = useState("");
  
  // Extract and normalize cid
  const cid = Array.isArray(params.cid) ? params.cid[0] : params.cid;
  
  const { modules } = useSelector((state: RootState) => state.modulesReducer);
  const dispatch = useDispatch();

  return (
    <div className="wd-modules">
      <ModulesControls
        moduleName={moduleName}
        setModuleName={setModuleName}
        addModule={() => {
          dispatch(addModule({ name: moduleName, course: cid || "" }));
          setModuleName("");
        }}
      />

      <br />

      <ListGroup id="wd-modules" className="rounded-0">
        {modules
          .filter((module) => module.course === cid)
          .map((module) => (
            <ListGroup.Item key={module._id} className="p-0 mb-3 fs-5 border-gray">
              <div className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center">
                <BsGripVertical className="me-2 fs-3" />
                
                {/* Show name if not editing */}
                {!module.editing && <span className="flex-grow-1">{module.name}</span>}
                
                {/* Show input field if editing */}
                {module.editing && (
                  <FormControl
                    className="w-50 d-inline-block me-2"
                    onChange={(e) =>
                      dispatch(
                        updateModule({ ...module, name: e.target.value })
                      )
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        dispatch(updateModule({ ...module, editing: false }));
                      }
                    }}
                    defaultValue={module.name}
                  />
                )}
                
                <ModuleControlButtons
                  moduleId={module._id}
                  deleteModule={(moduleId) => {
                    dispatch(deleteModule(moduleId));
                  }}
                  editModule={(moduleId) => dispatch(editModule(moduleId))}
                />
              </div>
            </ListGroup.Item>
          ))}
      </ListGroup>
    </div>
  );
}