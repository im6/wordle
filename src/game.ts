import { wordLen } from './constant';
import { CellState } from './typing/interface';
import allWords from './words';

class Game {
  private _answer: string;
  private _gameOver: boolean;
  currentIndex: number = 0;
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

  constructor(answer: string) {
    this._answer = answer;
    this.data = [''];
    this.state = [];
  }
  public get gameOver(): boolean {
    return this._gameOver;
  }
  public endGame() {
    this._gameOver = true;
  }
  public handleBack() {
    const currentWord = this.data[this.currentIndex];
    if (currentWord.length > 0) {
      this.data[this.currentIndex] = currentWord.slice(0, -1);
    }
  }
  public handleEnter() {
    const currentWord = this.data[this.currentIndex];
    if (currentWord.length === wordLen && allWords.has(currentWord)) {
      const thisState = this._calculateState(currentWord);
      this.state.push(thisState);
      if (currentWord === this._answer) {
        this._gameOver = true;
      }
      this.currentIndex += 1;
      this.data.push('');
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
