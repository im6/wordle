import Cell from './Cell';
import { wordLen } from '../constant';

class Row {
  cells: Cell[];
  private isLocked: boolean;

  constructor() {
    this.cells = [];
  }
  public get value() {
    return this.cells.map((v) => v.content).join('');
  }
  public lockRow() {
    this.isLocked = true;
  }
  public checkLock(): boolean {
    return this.isLocked;
  }
  public appendLetter(newLetter: string): boolean {
    if (this.cells.length >= wordLen || this.isLocked) {
      return true;
    }
    this.cells.push(new Cell(newLetter));
    return false;
  }
}

export default Row;
