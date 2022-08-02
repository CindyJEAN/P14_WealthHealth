import "./home.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "react-modal/lib/components/Modal";
import { formElements } from "./formElements";
import { useEffect } from "react";
import { validateField } from "../../utils/formHelper";

/**
 * @var {Object} initialFormData initial form values and validity
 */
const initialFormData = {};
formElements.forEach((element) => {
  initialFormData[element.name] = { value: "", isValid: false };
});

/**
 * Index page : form to save an employee
 * @param {Object} props
 * @param {Function} props.saveEmployee
 * @component
 */
export default function Home({ saveEmployee }) {
  const [formData, setFormData] = useState({});
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [formIsValid, setFormIsValid] = useState(true);

  useEffect(() => {
    setFormData(initialFormData);
  }, []);

  /**
   *@type {Object} Functions that return input and select jsx
   */
  const elements = {
    input: (data) => {
      return (
        <div key={data.name}>
          <label htmlFor={data.name}>{data.label}</label>
          <input
            id={data.name}
            type={data.type}
            value={formData[data.name]?.value || ""}
            onChange={handleInputChange}
          />
        </div>
      );
    },
    select: (data) => {
      return (
        <div key={data.name}>
          <label htmlFor={data.name}>{data.label}</label>
          <select
            id={data.name}
            value={formData[data.name]?.value || ""}
            onChange={handleInputChange}
            required
          >
            <option value={""}>Choose an option</option>
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

  /**
   * checks if the value of the targetted element is valid, and adds to formData its value and validity.
   * If the value is invalid, it adds the className "error" to the parent, and removes it if valid.
   */
  function handleInputChange(event) {
    const { value, id, type } = event.target;
    const isValid = validateField(type, value, id);
    setFormData({
      ...formData,
      [id]: {
        ...[id],
        value,
        isValid,
      },
    });

    const parent = event.target.parentNode;
    !isValid ? parent.classList.add("error") : parent.classList.remove("error");
  }

  /**
   * checks if inputs are set as valid. It sets isFormValid as the result, and returns the result
   * @return {Boolean} isFormValid
   */
  function validateForm() {
    for (const data of Object.values(formData)) {
      if (!data.isValid) {
        setFormIsValid(false);
        return false;
      }
    }
    setFormIsValid(true);
    return true;
  }

  /**
   * If form is valid, saves the employee and opens message modal
   */
  function sendForm(event) {
    event.preventDefault();
    event.stopPropagation();
    const isValid = validateForm();
    if (!isValid) return;

    const formDataValues = {};
    Object.entries(formData).forEach(([key, value]) => {
      formDataValues[key] = value.value;
    });

    setModalIsOpen(true);
    saveEmployee(formDataValues);
  }

  /**
   * Reinitialises form values and closes modal
   */
  function closeModal() {
    setFormData(initialFormData);
    setModalIsOpen(false);
  }

  return (
    <main className="container homePage">
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
        <button onClick={sendForm}>Save</button>
        {!formIsValid && <p>Le formulaire n'est pas valide.</p>}
      </form>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        appElement={document.getElementById("app")}
        className="modal"
      >
        <p>Employee Created!</p>
        <button onClick={closeModal}>Close</button>
      </Modal>
    </main>
  );
}
