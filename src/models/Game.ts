import Row from './Row';
import { rowNum, wordLen } from '../constant';

class Game {
  private answer: string;
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
    this.table.forEach((v) => {
      v.lockRow();
    });
    this.gameOver = true;
  }
  public handleBack() {
    if (this.table[this.currentRowIndex].checkLock()) {
      return;
    }
    this.table[this.currentRowIndex].cells.pop();
  }
  public handleEnter() {
    if (this.currentRowIndex >= rowNum - 1) {
      this.gameOver = true;
      return;
    }
    if (this.table[this.currentRowIndex].cells.length < wordLen) {
      return;
    }

    this.table[this.currentRowIndex++].lockRow();
  }
  public handleAddNewChar(newChar: string) {
    this.table[this.currentRowIndex].appendLetter(newChar);
  }
}

export default Game;
