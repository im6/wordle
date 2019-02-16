// https://github.com/thoughtram/reactive-snake/blob/master/src/main.ts
// https://zhuanlan.zhihu.com/p/35457418
// https://blog.thoughtram.io/rxjs/2017/08/24/taming-snakes-with-reactive-streams.html

import './style.scss';
import {
  of,
  fromEvent,
  interval,
  combineLatest,
  BehaviorSubject, 
  animationFrameScheduler,
} from 'rxjs';
import { 
  map,
  tap,
  skip,
  scan,
  filter, 
  share,
  switchMap,
  startWith,
  takeWhile,
  withLatestFrom,
  distinctUntilChanged,
 } from 'rxjs/operators';
import { 
  DIRECTIONS, 
  INIT_DIRECTION,
  SNAKE_INIT_LENGTH,
  GAME_INTERVAL,
 } from './constant';
import { 
  eat,
  move,
  initSnake,
  willHitSelf,
} from './snake';
import SnakeCanvas from './SnakeCanvas';

const textElem = document.getElementById('scoreText');
const viewElem = new SnakeCanvas(document.getElementById('appCan'), textElem);

const createGame = (animObs) => {
  const direction$ = fromEvent(document, 'keydown').pipe(
    map(({ keyCode }) => DIRECTIONS[keyCode]),
    startWith(INIT_DIRECTION),
    filter(d => !!d), // ignore other keydown
    distinctUntilChanged(), // change on curve
  );
  
  const len$ = new BehaviorSubject(SNAKE_INIT_LENGTH);
  const snakeLen$ = len$.pipe(
    scan((prev, next) => prev + next), // do this because $appleEaten release 1 every eating time
  );
  const score$ = snakeLen$.pipe(
    startWith(0),
    scan((prev, next) => prev + 1),
  );
  
  const ticks$ = interval(GAME_INTERVAL);
  const snake$ = ticks$.pipe(
    withLatestFrom(direction$, snakeLen$, (_, direction, snakeLength) => [direction, snakeLength]), // mapper is optional but better to have, filter out unused.
    scan(move, initSnake()),
    share());
  
  const apple$ = snake$.pipe(
    scan(eat, SnakeCanvas.getRandomPosition()),
    distinctUntilChanged(),
    share(),
  );

  const appleEatenSubscription = apple$.pipe(
    skip(1),
    tap(() => len$.next(1))
  ).subscribe();
  
  const scene$ = combineLatest(snake$, apple$, score$, (snake, apple, score) => ({ snake, apple, score, }));
  
  return animObs.pipe(withLatestFrom(scene$, (_, b) => b))
}

const game$ = of('Start Game').pipe(
  map(_ => interval(1000 / 10, animationFrameScheduler)),
  switchMap(createGame), // from 'Start Game' to game scene observable
  takeWhile(willHitSelf),
);

game$.subscribe({
  next: scene => {
    viewElem.renderScene(scene);
  },
  complete: (a) => {
    console.log('game complete.');
    textElem.innerText = 'game over';
  }
});