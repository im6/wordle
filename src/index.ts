import './style.less';
import { Game, GameStatus } from './typing/interface';
import { startGame$ } from './observables';
import { render } from './view';
import { confetti } from 'dom-confetti';
import { confettiDuration } from './constant';

const appDom = document.getElementById('app');
const redTextDom = document.getElementById('redText');
const greenTextDom = document.getElementById('greenText');

const subscription = startGame$().subscribe((a: Game) => {
  render(appDom, a);
  redTextDom.innerText =
    a.gameStatus === GameStatus.Error ? 'This is not a valid word' : '';
  if (a.gameStatus === GameStatus.Success) {
    subscription.unsubscribe();
    greenTextDom.innerText = a.bottomMessage;
    confetti(appDom, {
      duration: confettiDuration,
    });
  } else if (a.gameStatus === GameStatus.Fail) {
    subscription.unsubscribe();
    redTextDom.innerText = a.bottomMessage;
  }
});
