import { ReactNode } from "react";
import TOC from "./TOC";
import "bootstrap/dist/css/bootstrap.min.css";

export default function LabsLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <div className="d-flex">
      <div className="flex-fill">
        <TOC />
      </div>
      <div className="flex-fill">
        {children}
      </div>
    </div>
  );
}