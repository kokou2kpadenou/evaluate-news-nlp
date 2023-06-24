import { checkForName, addHttpsToUrl } from './js/nameChecker';
import { handleSubmit, handleClearInput, onBlur, onInput } from './js/formHandler';
import { handleClickToggle, setModeAtStartup } from './js/modeToggle';
import { openNav, closeNav } from './js/nav';
import { setCopyrightYear } from './js/utils';

import './styles/resets.scss';
import './styles/base.scss';
import './styles/footer.scss';
import './styles/form.scss';
import './styles/header.scss';

const asciiArt = `
          ..      :.
        -====    -====
        -=============
  --. :-===============:..:-.
:============================:
 -===========================.
  ====:..:-========-:..:-===.
  ===..-=-.===:.===.-==:.===.
  ===: :-:.===. ===::--.:===.
  =====---====--====----====.
  .....-====::::::-====.....
  ====..---- ----..---: ====.
  .-==---:::-====-:::---===:
    .-==================-.
        ...::::::::...

`;

console.log(asciiArt);

// console.log(checkForName);

// alert('I EXIST');
// console.log('CHANGE!!');
//
document.addEventListener('DOMContentLoaded', () => {
  const inputName = document.getElementById('name');
  const event = new Event('input');

  inputName.dispatchEvent(event);

  setModeAtStartup();
  setCopyrightYear();
});

export {
  checkForName,
  addHttpsToUrl,
  handleSubmit,
  handleClearInput,
  onBlur,
  onInput,
  handleClickToggle,
  openNav,
  closeNav,
};
