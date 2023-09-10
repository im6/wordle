import { fromEvent } from 'rxjs';
import { map, scan, filter } from 'rxjs/operators';
import createReducer from './reducer';
import { allowEngChar } from './helper';
import { wordClosure } from './helper';
import { GameStatus } from './typing/interface';

export const startGame$ = () =>
  fromEvent(document, 'keydown').pipe(
    map((v: KeyboardEvent) => v.key.toLowerCase()),
    filter(allowEngChar),
    scan(createReducer(wordClosure()), {
      currentIndex: 0,
      data: [''],
      state: [],
      gameStatus: GameStatus.Pending,
      bottomMessage: null,
    })
  );
