import { CellState } from '../typing/enum';

class Cell {
  content: string;
  state: CellState;
  constructor(content: string) {
    this.content = content;
    this.state = CellState.Undecided;
  }
}

export default Cell;
