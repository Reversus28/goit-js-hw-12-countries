import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/Material.css';

import { alert, error, defaults, Stack } from '@pnotify/core';

const myStack = new Stack({
  dir1: 'down',
  dir2: 'left',
  firstpos1: 25,
  firstpos2: 25,
  spacing1: 36,
  spacing2: 36,
  push: 'bottom',
  context: document.body,
});

defaults.styling = 'material';
defaults.icons = 'material';

const notices = {
  errorEmptyInput() {
    error({
      title: 'Error',
      text: 'Enter country name',
      stack: myStack,
      delay: 2000,
    });
  },
  alertTooManyMatches() {
    alert({
      title: 'Attention',
      text: 'Too many matches found. Please enter a more specific  query',
      stack: myStack,
      delay: 2000,
    });
  },
};

export default notices;
