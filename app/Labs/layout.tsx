import { ReactNode } from "react";
import TOC from "./TOC";

export default function LabsLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <table style={{ width: '100%' }}>
      <tbody>
        <tr>
          <td valign="top" style={{ width: '150px', paddingRight: '20px' }}>
            <TOC />
          </td>
          <td valign="top">
            {children}
          </td>
        </tr>
      </tbody>
    </table>
  );
}