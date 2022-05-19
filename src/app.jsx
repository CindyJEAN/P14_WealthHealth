import "./app.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import EmployeeList from "./pages/employeeList/employeeList";
import Home from "./pages/home/home";
import NotFound from "./pages/notFound/notFound";
import React from "react";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/employee-list" element={<EmployeeList />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
