import { departments } from "../../data/departments";
import { states } from "../../data/states";

export const formElements = [
  {
    tag: "input",
    type: "text",
    name: "firstName",
    label: "First Name",
    formSection: "basicInformation",
  },
  {
    tag: "input",
    type: "text",
    name: "lastName",
    label: "Last Name",
    formSection: "basicInformation",
  },
  {
    tag: "input",
    type: "date",
    name: "dateOfBirth",
    label: "Date of Birth",
    formSection: "basicInformation",
  },
  {
    tag: "input",
    type: "date",
    name: "startDate",
    label: "Start Date",
    formSection: "basicInformation",
  },
  {
    tag: "input",
    type: "text",
    name: "street",
    label: "Street",
    formSection: "address",
  },
  {
    tag: "input",
    type: "text",
    name: "city",
    label: "City",
    formSection: "address",
  },
  {
    tag: "select",
    name: "state",
    label: "State",
    dataSet: states,
    formSection: "address",
  },
  {
    tag: "input",
    type: "number",
    name: "zipCode",
    label: "Zip Code",
    formSection: "address",
  },
  {
    tag: "select",
    name: "department",
    label: "Department",
    dataSet: departments,
    formSection: "department",
  },
];
