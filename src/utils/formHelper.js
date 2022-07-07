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
 * @param {String} condition type of date to set limit condition (dateOfBirth)
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

export { validateField };
