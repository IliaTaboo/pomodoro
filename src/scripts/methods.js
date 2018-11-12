import { formatTwoDigit } from './timeFormat.js';

export function updateSessionLengthDisplay (minutes) {
  const display = document.getElementById('session-length');
  display.textContent = formatTwoDigit(minutes);
}

export function updateBreakLengthDisplay (minutes) {
  const display = document.getElementById('break-length');
  display.textContent = formatTwoDigit(minutes);
}

export function updateSetting (observ, action) {
  switch (action) {
    case 'increment':
      if (observ() !== 60) observ(observ() + 1);
      break;
    case 'decrement':
      if (observ() !== 1) observ(observ() - 1);
      break;
    default:
      break;
  }
}
