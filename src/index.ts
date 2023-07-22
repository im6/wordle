import './style.less';
import Game from './game';
import { startGame$ } from './observables';
import { render } from './view';
import { confetti } from 'dom-confetti';

const appDom = document.getElementById('app');
const errDom = document.getElementById('err');
const duration = 2500;

const subscription = startGame$().subscribe((a: Game) => {
  render(appDom, a);
  errDom.innerText = a.gameErrorMessage || '';
  if (a.gameOverMessage) {
    subscription.unsubscribe();
    if (a.gameOverMessage.indexOf('Success') > -1) {
      confetti(appDom, {
        duration,
      });
      setTimeout(() => {
        alert(a.gameOverMessage.toUpperCase());
      }, duration);
    } else {
      alert(a.gameOverMessage.toUpperCase());
    }
  }
});
