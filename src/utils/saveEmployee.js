export function saveEmployee(event, form) {
  event.preventDefault();

  const toParse = localStorage.getItem("employees");
  const employees = toParse === null ? [] : JSON.parse(toParse);
  localStorage.setItem("employees", JSON.stringify(employees.concat([form])));
}
