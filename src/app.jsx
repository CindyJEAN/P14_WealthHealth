import "./app.css";
import React, { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import EmployeeList from "./pages/employeeList/employeeList";
import Home from "./pages/home/home";
import NotFound from "./pages/notFound/notFound";

function App() {
  const [data, setData] = useState(
    // @ts-ignore
    JSON.parse(localStorage.getItem("employees")) || []
  );

  /**
   * Updates data state and saves data in local storage
   * @param {Object} newEmployee newEmployee information
   */
  function saveEmployee(newEmployee) {
    const newData = data.concat([newEmployee]);
    localStorage.setItem("employees", JSON.stringify(newData));
    setData(newData);
  }

  return (
    <div id="app" className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home saveEmployee={saveEmployee} />} />
          <Route path="/employee-list" element={<EmployeeList data={data} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
