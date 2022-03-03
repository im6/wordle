import Row from './Row';
import { rowNum } from '../constant';

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
  endGame() {
    this.table.forEach((v) => {
      v.lockRow();
    });
    this.gameOver = true;
  }
  nextRow() {
    if (this.currentRowIndex >= rowNum - 1) {
      this.gameOver = true;
      return;
    }
    this.table[this.currentRowIndex].lockRow();

    this.currentRowIndex += 1;
  }
}

export default Game;
