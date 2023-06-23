import { setItem, getItem } from './utils';

const rootElement = document.documentElement;
const MODE = 'modePreference';

/**
 *
 * Updates the mode based on user selection.
 * @param {string} mode - The mode to be set (e.g., 'dark', 'light', 'auto').
 */
function updateMode(mode) {
  document.getElementById('mode-switch').setAttribute('aria-label', mode);
  rootElement.setAttribute('data-theme', mode);
  setItem(MODE, mode);
}

/**
 *
 * Handles the click event on the toggle button.
 * Determines the new theme based on the current theme and updates the mode accordingly.
 */
function handleClickToggle() {
  const currentTheme = rootElement.getAttribute('data-theme');
  let newTheme;
  // const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  switch (currentTheme) {
    case 'dark':
      newTheme = 'light';
      break;
    case 'auto':
      newTheme = 'dark';
      break;
    case 'light':
    default:
      newTheme = 'auto';
      break;
  }
  updateMode(newTheme);
}

/**
 *
 * Sets the mode at startup based on the saved mode preference in the local storage.
 * If no saved preference is found, the default mode is 'auto'.
 */
function setModeAtStartup() {
  const savedModePreference = getItem(MODE) || 'auto';
  if (savedModePreference) {
    updateMode(savedModePreference);
  }
}

export { setModeAtStartup, handleClickToggle };
