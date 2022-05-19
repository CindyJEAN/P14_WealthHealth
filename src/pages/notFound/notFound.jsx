import { Link } from "react-router-dom";
import React from "react";

export default function NotFound() {
  return (
    <main>
      <h1>404 Not Found</h1>
      <p>This page doesn't exist.</p>
      <Link to="/">Go to homepage</Link>
    </main>
  );
}
