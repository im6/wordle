// https://github.com/thoughtram/reactive-snake/blob/master/src/main.ts
// https://zhuanlan.zhihu.com/p/35457418
// https://blog.thoughtram.io/rxjs/2017/08/24/taming-snakes-with-reactive-streams.html

import './style.scss';
import {
  of,
  fromEvent,
  interval,
  BehaviorSubject, 
  animationFrameScheduler,
} from 'rxjs';
import { 
  map, 
  take,
  scan,
  filter, 
  share,
  switchMap,
  startWith,
  combineLatest,
  withLatestFrom,
  distinctUntilChanged,
 } from 'rxjs/operators';
import { 
  DIRECTIONS, 
  INIT_DIRECTION,
  SNAKE_INIT_LENGTH,
 } from './constant';
import { 
  eat,
  move,
  initSnake,
  initApple,
  nextDirection,
} from './snake';

const canvas = document.getElementById('appCan');
const ctx = canvas.getContext('2d');

const direction$ = fromEvent(document, 'keydown').pipe(
  map(({ keyCode }) => DIRECTIONS[keyCode]),
  startWith(INIT_DIRECTION),
  filter(d => !!d), // ignore other keydown
  scan(nextDirection), //determin direction change condition
  distinctUntilChanged(), // change on curve
);

const len$ = new BehaviorSubject(SNAKE_INIT_LENGTH);
const snakeLen$ = len$.pipe(
  scan((prev, next) => {
    debugger;
    return prev + next;
  }),
  share()
);
const score$ = snakeLen$.pipe(
  startWith(0),
  scan((prev, next) => prev + 1),
);

const ticks$ = interval(1000);
const snake$ = ticks$.pipe(
  withLatestFrom(direction$, snakeLen$, (_, direction, snakeLength) => [direction, snakeLength]), // mapper is optional but better to have, filter out unused.
  scan(move, initSnake()),
  share());

const apple$ = snake$.pipe(
  scan(eat, initApple()),
  distinctUntilChanged(),
  share(),
);

const scene$ = combineLatest(snake$, apple$, score$, (snake, apple, score) => ({snake, apple, score}));

const game$ = of('start game').pipe(
  map(a => {
    return interval(1000 / 2, animationFrameScheduler);
  }),
  switchMap((obs, n) => {
    debugger;
    return obs;
  })
);



game$.subscribe(c => {
  //console.log('snake: ', c);
});
