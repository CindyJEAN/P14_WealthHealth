import "./home.css";
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Modal from "react-modal/lib/components/Modal";
import { formElements } from "./formElements";
import { saveEmployee } from "../../utils/saveEmployee";

/**
 * @var {Object} initialFormData initial form values
 */
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

function checkString(string) {
  const regex = /^[ A-Za-z0-9'-]{2,30}/;
  return regex.test(string);
}

function checkNumber(string) {
  const regex = /^\d{2,}/;
  return regex.test(string);
}

function checkDate(string, condition) {
  const now = new Date(Date.now());
  const dateToCheck = new Date(string);

  if (condition === "dateOfBirth") {
    const dateLimit = now.getFullYear() - 18;
    const difference = dateToCheck.getFullYear() - dateLimit;
    const isDateToCheckOutsideLimit = difference >= 0;
    return !isDateToCheckOutsideLimit;
  }
}

function validateField(type, value, id) {
  if (type === "text") return checkString(value);
  if (type === "number") return checkNumber(value);
  if (type === "date") return checkDate(value, id);
  return false;
}

export default function Home() {
  const [formData, setFormData] = useState(initialFormData);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const refs = {};

  function setRef(name) {
    refs[name] = useRef(null);
  }

  const elements = {
    input: (data) => {
      setRef(data.name);
      return (
        <div key={data.name}>
          <label htmlFor={data.name}>{data.label}</label>
          <input
            ref={refs[data.name]}
            id={data.name}
            type={data.type}
            // required
            // value=""
            onChange={handleInputChange}
          />
        </div>
      );
    },
    select: (data) => {
      setRef(data.name);
      return (
        <div key={data.name}>
          <label htmlFor={data.name}>{data.label}</label>
          <select
            ref={refs[data.name]}
            id={data.name}
            // value=""
            onChange={handleInputChange}
            required
          >
            <option value={""} disabled>
              Choose an option
            </option>
            {data.dataSet.map((element) => (
              <option key={element.value} value={element.value}>
                {element.label}
              </option>
            ))}
          </select>
        </div>
      );
    },
  };

  function handleInputChange(event) {
    const { value, id, type } = event.target;
    formData[id] = value;
    const isValid = validateField(type, value, id);
    const parent = event.target.parentNode;
    !isValid ? parent.classList.add("error") : parent.classList.remove("error");
  }

  function validateForm(event) {
    event.preventDefault();
    event.stopPropagation();
    /**
     * @type {HTMLInputElement} form
     */
    // @ts-ignore
    const form = document.getElementById("createEmployee");
    const inputs = document.querySelectorAll("input");
    // for (const [key, value] of Object.entries(initialFormData)) {
    //   const element = document.getElementById(key);
    // }

    if (document.querySelectorAll("[data-error-visible]").length > 0) return;
    saveEmployee(event, formData);
    // setModalIsOpen(true);
    //add date validation ?
    // check si error existent + si select autre que "choose an option"
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
        {formElements
          .filter((elm) => elm.formSection === "basicInformation")
          .map((elm) => elements[elm.tag](elm))}

        <fieldset className="address">
          <legend>Address</legend>
          {formElements
            .filter((elm) => elm.formSection === "address")
            .map((elm) => elements[elm.tag](elm))}
        </fieldset>

        {formElements
          .filter((elm) => elm.formSection === "department")
          .map((elm) => elements[elm.tag](elm))}
        <button onClick={validateForm}>Save</button>
      </form>

      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className="modal">
        <p>Employee Created!</p>
        <button onClick={closeModal}>Close</button>
      </Modal>
    </main>
  );
}
