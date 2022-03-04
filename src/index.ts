import './style.less';
import { fromEvent } from 'rxjs';
import { map, scan, startWith, filter } from 'rxjs/operators';
import { decideTable, render } from './helper';
import { Game } from './typing/interface';

const appDom = document.getElementById('app');

const allowEngChar = (v: string) =>
  v === 'enter' || v === 'backspace' || /^[a-z]$/.test(v);

const key$ = fromEvent(document, 'keydown').pipe(
  map((v: KeyboardEvent) => v.key.toLowerCase()),
  filter(allowEngChar)
);

const state: Game = {
  rows: [''],
  state: [],
  answer: 'hello',
  rowIndex: 0,
  gameOver: false,
};

const game$ = key$.pipe(startWith(state), scan(decideTable));

game$.subscribe((a: Game) => {
  render(appDom, a);
});
