import { Link } from "react-router-dom";
import React from "react";
import { TablePlugin } from "table-plugin";
import employees from "./employees.json";

const headCells = [
  { label: "First Name", data: "firstName" },
  { label: "Last Name", data: "lastName" },
  { label: "Start Date", data: "startDate" },
  { label: "Department", data: "department" },
  { label: "Date of Birth", data: "dateOfBirth" },
  { label: "Street", data: "street" },
  { label: "City", data: "city" },
  { label: "State", data: "state" },
  { label: "Zip Code", data: "zipCode" },
];
export default function EmployeeList() {
  return (
    <main className="container">
      <h1>Current employees</h1>
      <TablePlugin data={employees} headCells={headCells} />
      <Link to="/">Home</Link>
    </main>
  );
}
