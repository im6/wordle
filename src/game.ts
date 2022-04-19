import { rowNum, wordLen } from './constant';
import { CellState } from './typing/interface';
import { isValidWord, getRandomWord } from './words';

const successMsg = 'Success, Congrat';

class Game {
  private _answer: string;
  gameOverMessage: string;
  gameErrorMessage: string;
  currentIndex = 0;
  data: string[];
  state: CellState[][];
  private _calculateState = (word: string): CellState[] => {
    const res = word.split('').map((v, k) => {
      if (this._answer[k] === v) {
        return CellState.Correct;
      } else if (this._answer.includes(v)) {
        return CellState.WrongSpot;
      } else {
        return CellState.Wrong;
      }
    });
    return res;
  };

  constructor() {
    this._answer = getRandomWord();
    this.data = [''];
    this.state = [];
  }
  public handleBack() {
    const currentWord = this.data[this.currentIndex];
    if (this.gameErrorMessage) {
      this.gameErrorMessage = null;
    }
    if (currentWord.length > 0) {
      this.data[this.currentIndex] = currentWord.slice(0, -1);
    }
  }
  public handleEnter() {
    const currentWord = this.data[this.currentIndex];
    if (currentWord.length === wordLen) {
      if (isValidWord(currentWord)) {
        const thisState = this._calculateState(currentWord);
        this.state.push(thisState);
        if (currentWord === this._answer || this.currentIndex === rowNum - 1) {
          this.gameOverMessage =
            currentWord === this._answer ? successMsg : this._answer;
        } else {
          this.currentIndex += 1;
          this.data.push('');
        }
        this.gameErrorMessage = null;
      } else {
        this.gameErrorMessage = 'This is not a valid word';
      }
    } else {
      // todo: some shaking effect
    }
  }
  public handleAdd(newChar: string) {
    const currentWord = this.data[this.currentIndex];
    if (currentWord.length < wordLen) {
      this.data[this.currentIndex] += newChar;
    }
  }
}

export default Game;
