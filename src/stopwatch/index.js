// https://github.com/chen-yumin/rxjs-canvas-stopwatch/blob/master/src/app.js

import { interval, fromEvent, merge, BehaviorSubject, combineLatest, } from 'rxjs';
import { timeInterval, takeWhile, map, } from 'rxjs/operators';

const mapBtnToAction = {
  "stopBtn": "pause",
  "startBtn": "running",
  "loopBtn": "capture",
  "resetBtn": "reset",
};

const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const loopBtn = document.getElementById('loopBtn');
const resetBtn = document.getElementById('resetBtn');

const displayElem = document.getElementById('display');
const loopElem = document.getElementById('loop');

const timer$ = interval(100).pipe(timeInterval());

const startClick$ = fromEvent(startBtn, 'click');
const stopClick$ = fromEvent(stopBtn, 'click');
const loopClick$ = fromEvent(loopBtn, 'click');
const resetClick$ = fromEvent(resetBtn, 'click');

const control$ = new BehaviorSubject('running');

const timeFormat = (time) => {
  return Math.floor(time / 600) + ":" + Math.floor((time / 10) % 60) + ":" + (time % 10) + "0";
}

const userControl$ = merge(startClick$, stopClick$, loopClick$, resetClick$)
  .pipe(
    map(e => mapBtnToAction[e.target.id]),
  )
  .subscribe({
    next: (a) => control$.next(a),
  }
);

const app$ = combineLatest(timer$, control$, ({value}, state) => {
  return [value, state];
}).pipe(
  takeWhile(([_, state]) => {
    return true || state === 'running';
  }),
)

app$.subscribe({
  next: ([time, state]) => {
    if(state === 'capture'){
      loopElem.innerHTML += displayElem.innerText + '<br />'
    } else {

    }
    displayElem.innerText = timeFormat(time);
  },
  complete: () => {
    console.log('finish');
  },
})

