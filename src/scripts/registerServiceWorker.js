export default function () {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/pomodoro/sw.js', {scope: '/pomodoro/'});
  }
}
