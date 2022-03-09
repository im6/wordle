import { fromEvent } from 'rxjs';
import { map, scan, startWith, filter } from 'rxjs/operators';
import Game from './game';

const allowEngChar = (v: string) =>
  v === 'enter' || v === 'backspace' || /^[a-z]$/.test(v);

const key$ = fromEvent(document, 'keydown').pipe(
  map((v: KeyboardEvent) => v.key.toLowerCase()),
  filter(allowEngChar)
);

export const game$ = key$.pipe(
  startWith(new Game()),
  scan((g: Game, newKey: string) => {
    if (g.gameOverMessage) {
      return g;
    }
    if (newKey === 'enter') {
      g.handleEnter();
    } else if (newKey === 'backspace') {
      g.handleBack();
    } else {
      g.handleAdd(newKey);
    }
    return g;
  })
);
