import "./employeeList.css";
import "table-plugin-react/dist/index.css";
import "./table.css";
import { Link } from "react-router-dom";
import React from "react";
import { TablePlugin } from "table-plugin-react";

const headCells = [
  { label: "First Name", data: "firstName", type: "text" },
  { label: "Last Name", data: "lastName", type: "text" },
  { label: "Start Date", data: "startDate", type: "date" },
  { label: "Department", data: "department", type: "text" },
  { label: "Date of Birth", data: "dateOfBirth", type: "date" },
  { label: "Street", data: "street", type: "text" },
  { label: "City", data: "city", type: "text" },
  { label: "State", data: "state", type: "text" },
  { label: "Zip Code", data: "zipCode", type: "text" },
];

/**
 * Current employees table page
 * @param {Object} props
 * @param {Array} props.data
 * @component
 */
export default function EmployeeList({ data }) {
  return (
    <main className="container employeeListPage">
      <h1>Current employees</h1>
      <TablePlugin data={data} headCells={headCells} />
      <Link to="/">Home</Link>
    </main>
  );
}
