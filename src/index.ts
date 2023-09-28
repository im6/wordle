import './style.less';
import anime from 'animejs/lib/anime.es.js';
import { Game, GameStatus } from './typing/interface';
import { startGame$ } from './observables';
import { render } from './view';
import { confetti } from 'dom-confetti';
import { confettiDuration } from './constant';
import { getShakeFrame } from './helper';

const appDom = document.getElementById('app');
const redTextDom = document.getElementById('redText');
const greenTextDom = document.getElementById('greenText');

const subscription = startGame$().subscribe((a: Game) => {
  render(appDom, a);
  if (a.gameStatus === GameStatus.Error) {
    redTextDom.innerText = a.bottomMessage;
    anime({
      targets: `#app > ul:nth-child(${a.currentIndex + 1})`,
      easing: 'linear',
      duration: 800,
      translateX: getShakeFrame(30),
    });
  } else {
    redTextDom.innerText = '';
  }
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
