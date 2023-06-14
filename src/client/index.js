import { checkForName, addHttpsToUrl } from './js/nameChecker';
import { handleSubmit, onBlur } from './js/formHandler';
import { handleClickToggle } from './js/modeToggle';
import { openNav, closeNav } from './js/nav';

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

export { checkForName, addHttpsToUrl, handleSubmit, onBlur, handleClickToggle, openNav, closeNav };
