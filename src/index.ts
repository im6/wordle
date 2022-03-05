import './style.less';
import { fromEvent } from 'rxjs';
import { map, scan, startWith, filter } from 'rxjs/operators';
import { render } from './view';
import Game from './game';
import { rowNum } from './constant';

const appDom = document.getElementById('app');

const allowEngChar = (v: string) =>
  v === 'enter' || v === 'backspace' || /^[a-z]$/.test(v);

const key$ = fromEvent(document, 'keydown').pipe(
  map((v: KeyboardEvent) => v.key.toLowerCase()),
  filter(allowEngChar)
);

const game$ = key$.pipe(
  startWith(new Game('hello')),
  scan((g: Game, newKey: string) => {
    if (g.currentIndex >= rowNum) {
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

game$.subscribe((a: Game) => {
  console.log(a);
  if (a.gameOver) {
    console.log('game over');
  }
  render(appDom, a);
});
