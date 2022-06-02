import React, { useState } from "react";
import { Link } from "react-router-dom";
import { saveEmployee } from "../../utils/saveEmployee";
import { states } from "../../data/states";

const initialForm = {
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  startDate: "",
  department: "",
  street: "",
  city: "",
  state: "",
  zipCode: "",
};

export default function Home() {
  const [form, setForm] = useState(initialForm);

  function handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const id = target.id;
    const updatedForm = { ...form, [id]: value };
    setForm(updatedForm);
  }

  return (
    <main className="container">
      <h1>HRnet</h1>
      <Link to="/employee-list">View Current Employees</Link>
      <h2>Create Employee</h2>

      <form id="createEmployee">
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          id="firstName"
          value={form?.firstName}
          onChange={handleInputChange}
        />

        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          type="text"
          value={form?.lastName}
          onChange={handleInputChange}
        />

        <label htmlFor="dateOfBirth">Date of Birth</label>
        <input
          id="dateOfBirth"
          type="text"
          value={form?.dateOfBirth}
          onChange={handleInputChange}
        />

        <label htmlFor="startDate">Start Date</label>
        <input
          id="startDate"
          type="text"
          value={form?.startDate}
          onChange={handleInputChange}
        />

        <fieldset className="address">
          <legend>Address</legend>

          <label htmlFor="street">Street</label>
          <input
            id="street"
            type="text"
            value={form?.street}
            onChange={handleInputChange}
          />

          <label htmlFor="city">City</label>
          <input
            id="city"
            type="text"
            value={form?.city}
            onChange={handleInputChange}
          />

          <label htmlFor="state">State</label>
          <select
            name="state"
            id="state"
            value={form?.state}
            onChange={handleInputChange}
          >
            {states.map((state) => (
              <option key={state.abbreviation} value={state.abbreviation}>
                {state.name}
              </option>
            ))}
          </select>

          <label htmlFor="zipCode">Zip Code</label>
          <input
            id="zipCode"
            type="number"
            value={form?.zipCode}
            onChange={handleInputChange}
          />
        </fieldset>

        <label htmlFor="department">Department</label>
        <select
          name="department"
          id="department"
          value={form?.department}
          onChange={handleInputChange}
        >
          <option value="sales">Sales</option>
          <option value="marketing">Marketing</option>
          <option value="engineering">Engineering</option>
          <option value="humanResources">Human Resources</option>
          <option value="legal">Legal</option>
        </select>
        <button onClick={(event) => saveEmployee(event, form)}>Save</button>
      </form>
      {/* <div id="confirmation" class="modal">Employee Created!</div> */}
      {/* TODO add modal plugin */}
    </main>
  );
}
