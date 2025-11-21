import { ReactNode } from "react";

export default function Square({ children }: { children: ReactNode }) {
  const num = Number(children);
  return (
    <div id="wd-square">
      <h4>Square of {children}</h4>
      {num * num}
    </div>
  );
}