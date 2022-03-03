import './style.less';
import { fromEvent } from 'rxjs';
import { map, scan, startWith, filter } from 'rxjs/operators';
import Game from './models/Game';
import { decideTable, render } from './helper';

const appDom = document.getElementById('app');

const allowEngChar = (v: string) =>
  v === 'enter' || v === 'backspace' || /^[a-z]$/.test(v);

const key$ = fromEvent(document, 'keydown').pipe(
  map((v: KeyboardEvent) => v.key.toLowerCase()),
  filter(allowEngChar)
);

const game$ = key$.pipe(startWith(new Game('hello')), scan(decideTable));

game$.subscribe((a: Game) => {
  render(appDom, a);
});
