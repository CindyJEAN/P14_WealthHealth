export function saveEmployee(event, form) {
  event.preventDefault();

  const employees = JSON.parse(localStorage.getItem("employees")) || [];
  const employee = { ...form };
  employees.push(employee);
  localStorage.setItem("employees", JSON.stringify(employees));
}
