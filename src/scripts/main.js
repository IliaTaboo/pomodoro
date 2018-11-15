import registerSW from './registerServiceWorker.js';
import storeService from './storeService.js';
import observable from './observable.js';
import {
  updateSessionLengthDisplay,
  updateBreakLengthDisplay,
  updateSetting
} from './updateSetting.js';
import Timer from './timer.js';

import '../styles/main.scss';

const $timerSettings = Array.from(document.getElementsByClassName('settings-time'));
const $startBtn = document.getElementById('start');
const $stopBtn = document.getElementById('stop');
const $resetBtn = document.getElementById('reset');
const $timerToggleBtn = document.getElementById('change-timer');

function settingsChange (e) {
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
}

function timerToggleHandler () {
  AppTimer.toggleTimer();
}

function disableBtn (disable) {
  const $buttons = document.getElementsByClassName('btn');
  
  for (let i = 0; i < $buttons.length; i++) {
    $buttons[i].disabled = disable;
  }

  $stopBtn.disabled = !disable;
}

const sessionLength = observable();
const breakLength = observable();

sessionLength.subscribe(updateSessionLengthDisplay);
breakLength.subscribe(updateBreakLengthDisplay);

sessionLength.subscribe(storeService.session);
breakLength.subscribe(storeService.break);

const AppTimer = new Timer();

sessionLength.subscribe(AppTimer.setSessionDuration);
sessionLength(storeService.session());
breakLength.subscribe(AppTimer.setBreakDuration);
breakLength(storeService.break());

$timerSettings.forEach(el => {
  el.addEventListener('click', settingsChange);
});

$startBtn.addEventListener('click', function () {
  AppTimer.start();
  disableBtn(true);
});

$stopBtn.addEventListener('click', function () {
  AppTimer.stop();
  disableBtn(false);
});

document.onkeyup = function (e) {
  if (e.which === 32 && !AppTimer.isRunning()) {
    AppTimer.start();
  } else if (e.which === 32 && AppTimer.isRunning()) {
    AppTimer.stop();
  } else if (e.altKey && e.which === 80) {
    timerToggleHandler();
  } else if (e.altKey && e.which === 82) {
    AppTimer.reset();
  }
};

$resetBtn.addEventListener('click', () => AppTimer.reset());
$timerToggleBtn.addEventListener('click', timerToggleHandler);

registerSW();