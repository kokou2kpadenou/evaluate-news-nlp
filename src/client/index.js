import { checkForName } from './js/nameChecker';
import { handleSubmit, onBlur, onInput } from './js/formHandler';
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

export { checkForName, handleSubmit, onBlur, onInput, handleClickToggle, openNav, closeNav };
