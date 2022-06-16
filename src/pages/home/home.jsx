import "./home.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "react-modal/lib/components/Modal";
import { saveEmployee } from "../../utils/saveEmployee";
import { states } from "../../data/states";

const initialFormData = {
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
  const [formData, setFormData] = useState(initialFormData);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const id = target.id;
    const updatedForm = { ...formData, [id]: value };
    setFormData(updatedForm);
  }

  function validateForm(event) {
    event.stopPropagation();
    /**
     * @type {HTMLInputElement} form
     */
    // @ts-ignore
    const form = document.getElementById("createEmployee");
    const inputs = document.querySelectorAll("input");
    if (!form.checkValidity()) {
      inputs.forEach((input) => {
        if (!input.validity.valid) {
          input.setAttribute("aria-invalid", "true");
          return;
        }
        input.setAttribute("aria-invalid", "false");
      });
      return;
    }
    saveEmployee(event, formData);
    setModalIsOpen(true);
  }

  function closeModal() {
    setFormData(initialFormData);
    setModalIsOpen(false);
  }

  return (
    <main className="container">
      <h1>HRnet</h1>
      <Link to="/employee-list">View Current Employees</Link>
      <h2>Create Employee</h2>

      <form id="createEmployee">
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          type="text"
          required
          value={formData?.firstName}
          onChange={handleInputChange}
        />

        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          type="text"
          required
          value={formData?.lastName}
          onChange={handleInputChange}
        />

        <label htmlFor="dateOfBirth">Date of Birth</label>
        <input
          id="dateOfBirth"
          type="date"
          required
          value={formData?.dateOfBirth}
          onChange={handleInputChange}
        />

        <label htmlFor="startDate">Start Date</label>
        <input
          id="startDate"
          type="date"
          required
          value={formData?.startDate}
          onChange={handleInputChange}
        />

        <fieldset className="address">
          <legend>Address</legend>

          <label htmlFor="street">Street</label>
          <input
            id="street"
            type="text"
            required
            value={formData?.street}
            onChange={handleInputChange}
          />

          <label htmlFor="city">City</label>
          <input
            id="city"
            type="text"
            required
            value={formData?.city}
            onChange={handleInputChange}
          />

          <label htmlFor="state">State</label>
          <select
            name="state"
            id="state"
            value={formData?.state}
            onChange={handleInputChange}
            required
          >
            <option value={""} disabled>
              Choose an option
            </option>
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
            required
            value={formData?.zipCode}
            onChange={handleInputChange}
          />
        </fieldset>

        <label htmlFor="department">Department</label>
        <select
          name="department"
          id="department"
          value={formData?.department}
          onChange={handleInputChange}
          required
        >
          <option value={""} disabled>
            Choose an option
          </option>
          <option value="sales">Sales</option>
          <option value="marketing">Marketing</option>
          <option value="engineering">Engineering</option>
          <option value="humanResources">Human Resources</option>
          <option value="legal">Legal</option>
        </select>
        <button onClick={validateForm}>Save</button>
      </form>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className="modal">
        <p>Employee Created!</p>
        <button onClick={closeModal}>Close</button>
      </Modal>
    </main>
  );
}
