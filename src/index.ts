import './style.less';
import Game from './game';
import { game$ } from './observables';
import { render } from './view';

const appDom = document.getElementById('app');
const errDom = document.getElementById('err');

const subscription = game$.subscribe((a: Game) => {
  render(appDom, a);
  errDom.innerText = a.gameErrorMessage || '';
  if (a.gameOverMessage) {
    setTimeout(() => {
      alert(a.gameOverMessage);
      subscription.unsubscribe();
    });
  }
});
