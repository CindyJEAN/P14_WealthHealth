import { Link } from "react-router-dom";
import React from "react";
// import { Table } from "table";

export default function EmployeeList() {
  return (
    <main className="container">
      <h1>Current employees</h1>
      {/* <Table /> */}
      <Link to="/">Home</Link>
    </main>
  );
}
