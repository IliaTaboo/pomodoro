import {formatTwoDigit, formatTime} from '../scripts/timeFormat.js';

describe('Time format functions tests::', () => {
  test('Should format one digit number to two digit nuber', () => {
    expect(formatTwoDigit(60)).toEqual(60);
    expect(formatTwoDigit(10)).toEqual(10);
    expect(formatTwoDigit(2)).toEqual('02');
    expect(formatTwoDigit(1)).toEqual('01');
    expect(formatTwoDigit(9)).toEqual('09');
  });

  test('Should transform seconds to minutes and seconds', () => {
    expect(formatTime(3600)).toEqual('60:00');
    expect(formatTime(1400)).toEqual('23:20');
    expect(formatTime(59)).toEqual('00:59');
    expect(formatTime(455)).toEqual('07:35');
    expect(formatTime(3333)).toEqual('55:33');
  });
});