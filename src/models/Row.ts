import Cell from './Cell';
import { wordLen } from '../constant';

class Row {
  cells: Cell[];

  constructor() {
    this.cells = [];
  }
  public get value() {
    return this.cells.map((v) => v.content).join('');
  }

  public appendLetter(newLetter: string): boolean {
    if (this.cells.length >= wordLen) {
      return true;
    }
    this.cells.push(new Cell(newLetter));
    return false;
  }
}

export default Row;
