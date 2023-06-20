/**
 *
 * Sets the specified item in the local storage.
 * @param {string} item - The name of the item to be stored.
 * @param {string} value - The value to be assigned to the item.
 */
function setItem(item, value) {
  localStorage.setItem(item, value);
}

/**
 *
 * Retrieves the value of the specified item from the local storage.
 * @param {string} item - The name of the item to retrieve.
 * @returns {string|null} The value of the item, or null if the item is not found.
 */
function getItem(item) {
  return localStorage.getItem(item);
}

/**
 * Sets the current year as the copyright year in the footer.
 */
function setCopyrightYear() {
  const currentYear = new Date().getFullYear();
  const yearElement = document.getElementById('current-year');
  yearElement.textContent = currentYear;
}

export { setItem, getItem, setCopyrightYear };
