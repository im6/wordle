import Row from './Row';
import { rowNum, wordLen } from '../constant';
import { CellState } from '../typing/enum';

class Game {
  private answer: string = 'abcde';
  private gameOver: boolean = false;
  currentRowIndex: number = 0;
  table: Row[];
  constructor(answer: string) {
    this.answer = answer;
    this.table = [];
    for (let i = 0; i < rowNum; i += 1) {
      this.table.push(new Row());
    }
  }
  public endGame() {
    this.gameOver = true;
  }
  public handleBack() {
    if (this.currentRowIndex === rowNum - 1) {
      return;
    }
    this.table[this.currentRowIndex].cells.pop();
  }
  public handleEnter() {
    if (this.table[this.currentRowIndex].cells.length < wordLen) {
      return;
    }

    this.table[this.currentRowIndex].cells.forEach((v, k) => {
      if (this.answer[k] === v.content) {
        v.state = CellState.Correct;
      } else if (this.answer.includes(v.content)) {
        v.state = CellState.WrongSpot;
      } else {
        v.state = CellState.Wrong;
      }
    });
    if (this.currentRowIndex < rowNum - 1) {
      this.currentRowIndex++;
    } else {
      this.endGame();
    }
  }
  public handleAddNewChar(newChar: string) {
    this.table[this.currentRowIndex].appendLetter(newChar);
  }
}

export default Game;
