import { ReactNode } from "react";

export default function Highlight({ children }: { children: ReactNode }) {
  return (
    <div id="wd-highlight">
      <span style={{ backgroundColor: "yellow", color: "red" }}>
        {children}
      </span>
    </div>
  );
}