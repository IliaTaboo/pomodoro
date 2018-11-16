export const formatTwoDigit = time =>
  String(time).length === 1 ? time = '0' + time : time;

export const formatTime = inSeconds => {
  const minutes = formatTwoDigit(Math.floor(inSeconds / 60));
  const seconds = formatTwoDigit(inSeconds % 60);

  return `${minutes}:${seconds}`;
};