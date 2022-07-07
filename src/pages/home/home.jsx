import "./home.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "react-modal/lib/components/Modal";
import { formElements } from "./formElements";
import { saveEmployee } from "../../utils/saveEmployee";
import { useEffect } from "react";

// /**
//  * @var {Object} initialFormData initialFormData form values and validity
//  */
// const initialForm = {
//   firstName: {
//     value: "",
//     isValid: false,
//   },
//   lastName: {
//     value: "",
//     isValid: false,
//   },
//   dateOfBirth: {
//     value: "",
//     isValid: false,
//   },
//   startDate: {
//     value: "",
//     isValid: false,
//   },
//   department: {
//     value: "",
//     isValid: false,
//   },
//   street: {
//     value: "",
//     isValid: false,
//   },
//   city: {
//     value: "",
//     isValid: false,
//   },
//   state: {
//     value: "",
//     isValid: false,
//   },
//   zipCode: {
//     value: "",
//     isValid: false,
//   },
// };

const initialFormData = {};
formElements.forEach((element) => {
  initialFormData[element.name] = { value: "", isValid: false };
});

function checkString(string) {
  const regex = /^[ A-Za-z0-9'-]{2,30}/;
  return regex.test(string);
}

function checkNumber(string) {
  const regex = /^\d{2,}/;
  return regex.test(string);
}

/**
 * Checks the date format and the limit if there is one.
 * @param {String} string date saved as string
 * @param {*} condition type of date to set limit condition (dateOfBirth)
 * @return {Boolean} date validity
 */
function checkDate(string, condition) {
  const now = new Date(Date.now());
  const dateToCheck = new Date(string);
  const regex = /^\d{4}[-](0?[1-9]|1[012])[-](0?[1-9]|[12][0-9]|3[01])$/;
  const isValid = regex.test(string);

  if (isValid && condition === "dateOfBirth") {
    const dateLimit = now.getFullYear() - 18;
    const difference = dateToCheck.getFullYear() - dateLimit;
    const isDateToCheckOutsideLimit = difference >= 0;
    return !isDateToCheckOutsideLimit;
  }
  return isValid;
}

/**
 * Calls function to check field validity depending on its type
 * @param {String} type
 * @param {String} value
 * @param {String} id
 * @return {Boolean} validity
 */
function validateField(type, value, id) {
  if (type === "text") return checkString(value);
  if (type === "number") return checkNumber(value);
  if (type === "date") return checkDate(value, id);
  if (type === "select-one") return Boolean(value);
  return true;
}
// Modal.setAppElement("#app");
export default function Home() {
  const [formData, setFormData] = useState({});
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [formIsValid, setFormIsValid] = useState(true);

  useEffect(() => {
    setFormData(initialFormData);
  }, []);

  const elements = {
    input: (data) => {
      return (
        <div key={data.name}>
          <label htmlFor={data.name}>{data.label}</label>
          <input
            id={data.name}
            type={data.type}
            value={formData[data.name]?.value}
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
            value={formData[data.name]?.value}
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
   * checks if inputs are set as valid, sets isFormValid, and returns if form is valid
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
   * If form is valid, saves the employee and opens message
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

    saveEmployee(event, formDataValues);
    setModalIsOpen(true);
  }

  function closeModal() {
    setFormData(initialFormData);
    setModalIsOpen(false);
  }

  // useEffect(() => {
  //   console.log(formData);
  // }, [formData]);

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
