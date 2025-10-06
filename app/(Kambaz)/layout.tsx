import { ReactNode } from "react";
import KambazNavigation from "./Navigation";
import "./styles.css";

export default function KambazLayout({ 
  children 
}: Readonly<{ 
  children: ReactNode 
}>) {
  return (
    <div id="wd-kambaz">
      <div className="d-flex">
        <div className="d-none d-md-block">
          <KambazNavigation />
        </div>
        <div className="flex-fill" style={{ marginLeft: 140 }}>
          {children}
        </div>
      </div>
    </div>
  );
}
