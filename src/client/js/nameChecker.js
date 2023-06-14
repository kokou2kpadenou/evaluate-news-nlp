/**
 *
 * Check if the input text matches a valid URL pattern.
 * @param {string} inputText - The input text to be checked.
 * @returns {boolean} - True if the input text is a valid URL, false otherwise.
 */
function checkForName(inputText) {
  const urlPattern = /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,})(:\d{2,5})?([/?].*)?$/i;

  return urlPattern.test(inputText);
}


/**
 * Add 'https://' to the URL if it doesn't already have it.
 * @param {string} url - The URL to be modified.
 * @returns {string} - The modified URL with 'https://' added if necessary.
 */
function addHttpsToUrl(url) {
  let urlWithProtocol = url;

  if (!urlWithProtocol.startsWith('http://') && !urlWithProtocol.startsWith('https://')) {
    urlWithProtocol = `https://${urlWithProtocol}`;
  }

  return urlWithProtocol;
}

export { checkForName, addHttpsToUrl };
