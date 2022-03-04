enum CellState {
  Correct,
  WrongSpot,
  Wrong,
  Undecided,
}

interface Game {
  rows: string[];
  state: CellState[][];
  answer: string;
  rowIndex: number;
  gameOver: boolean;
}

export { CellState, Game };
