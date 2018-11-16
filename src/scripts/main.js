import registerSW from './registerServiceWorker.js';
import storeService from './storeService.js';
import observable from './observable.js';
import {
  updateSessionLengthDisplay,
  updateBreakLengthDisplay,
  updateSetting
} from './updateSetting.js';
import { disableBtn } from './utils.js';
import Timer from './timer.js';

import '../styles/main.scss';

const $timerSettings = Array.from(document.getElementsByClassName('settings-time'));
const $startBtn = document.getElementById('start');
const $stopBtn = document.getElementById('stop');
const $resetBtn = document.getElementById('reset');
const $timerToggleBtn = document.getElementById('change-timer');
const $countdownElement = document.getElementById('countdown');

const sessionLength = observable();
const breakLength = observable();

sessionLength.subscribe(updateSessionLengthDisplay);
breakLength.subscribe(updateBreakLengthDisplay);

sessionLength.subscribe(storeService.session);
breakLength.subscribe(storeService.break);

const AppTimer = new Timer($countdownElement);

sessionLength.subscribe(AppTimer.setSessionDuration);
sessionLength(storeService.session());
breakLength.subscribe(AppTimer.setBreakDuration);
breakLength(storeService.break());

$timerSettings.forEach(el => {
  el.addEventListener('click', function (e) {
    if (e.target.nodeName === 'BUTTON' && !AppTimer.isRunning()) {
      switch (this.id) {
        case 'session-setting':
          updateSetting(sessionLength, e.target.classList[0]);
          break;
        case 'break-setting':
          updateSetting(breakLength, e.target.classList[0]);
          break;
        default:
          break;
      }
    }
  });
});

$startBtn.addEventListener('click', () => {
  AppTimer.start();
  disableBtn(true, 'btn', $stopBtn);
});

$stopBtn.addEventListener('click', () => {
  AppTimer.stop();
  disableBtn(false, 'btn', $stopBtn);
});

document.addEventListener('keyup', e => {
  if (e.which === 32 && !AppTimer.isRunning()) {
    AppTimer.start();
    disableBtn(true, 'btn', $stopBtn);
  } else if (e.which === 32 && AppTimer.isRunning()) {
    AppTimer.stop();
    disableBtn(false, 'btn', $stopBtn);
  } else if (e.altKey && e.which === 80) {
    AppTimer.toggleTimer();
  } else if (e.altKey && e.which === 82) {
    AppTimer.reset();
  }
});

$resetBtn.addEventListener('click', () => AppTimer.reset());
$timerToggleBtn.addEventListener('click', () => AppTimer.toggleTimer());

registerSW();