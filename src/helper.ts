import { words, allWordsSet } from './words';
import { CellState } from './typing/interface';

export const allowEngChar = (v: string) =>
  v === 'enter' || v === 'backspace' || /^[a-z]$/.test(v);

const getRandomWord = () => {
  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex];
};

export const isValidWord = (w: string) => allWordsSet.has(w);

export const wordClosure = () => {
  const ans = getRandomWord();
  return {
    exposeAnswer: () => ans,
    calculateState: (word: string): CellState[] =>
      word.split('').map((v, k) => {
        if (ans[k] === v) {
          return CellState.Correct;
        } else if (ans.includes(v)) {
          return CellState.WrongSpot;
        } else {
          return CellState.Wrong;
        }
      }),
  };
};

export const getShakeFrame = (full: number) => {
  let amplitude = full;
  const frames = [];
  while (amplitude > 1) {
    frames.push({
      value: amplitude,
    });
    frames.push({
      value: -amplitude,
    });
    amplitude /= 2;
  }
  frames.push({
    value: 0,
  });
  return frames;
};
