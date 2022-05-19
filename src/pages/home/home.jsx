import { Link } from "react-router-dom";
import React from "react";

export default function Home() {
  return (
    <>
      <h1>HRnet</h1>
      <Link to="/employee-list">View Current Employees</Link>
    </>
  );
}
