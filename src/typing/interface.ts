enum CellState {
  Correct,
  WrongSpot,
  Wrong,
  Undecided,
}

export enum GameStatus {
  Pending = 'pending',
  Error = 'error',
  Fail = 'fail',
  Success = 'success',
}

interface Game {
  data: string[];
  state: CellState[][];
  currentIndex: number;
  gameStatus: GameStatus;
  bottomMessage: string;
}

export { CellState, Game };
