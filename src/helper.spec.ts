import {
  isValidWord,
  wordClosure,
  allowEngChar,
  getShakeFrame,
} from './helper';

describe('helpers', () => {
  test('isValidWord', () => {
    expect(isValidWord('hello')).toBe(true);
  });
  test('getRandomWord', () => {
    const c = wordClosure();
    expect(c.exposeAnswer()).toHaveLength(5);
    expect(c.calculateState('zzzzz')).toHaveLength(5);
  });
  test('allowEngChar', () => {
    expect(allowEngChar('123')).toBe(false);
  });
  test('getShakeFrame', () => {
    expect(getShakeFrame(8)).toHaveLength(7);
  });
});
