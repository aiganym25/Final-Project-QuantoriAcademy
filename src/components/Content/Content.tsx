import "./Content.css";
import InputContainer from "../InputContainer/InputContainer";
import TableComponent from "../Table/TableComponent";
import { useState } from "react";

export default function Content(): JSX.Element {
  return (
    <div className="content">
      <InputContainer />
      <br />
      <TableComponent />
    </div>
  );
}
