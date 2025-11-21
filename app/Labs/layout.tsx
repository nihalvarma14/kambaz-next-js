"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import { ReactNode } from "react";
import { Provider } from "react-redux";
// import store from "../Labs/Lab4/store/index";
import TOC from "./TOC";
import store from "./store/index";

export default function LabsLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <Provider store={store}>
      <table>
        <tbody>
          <tr>
            <td valign="top" width="100px">
              <TOC />
            </td>
            <td valign="top">{children}</td>
          </tr>
        </tbody>
      </table>
    </Provider>
  );
}
