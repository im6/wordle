import style from './style.less';
import { CellState } from './typing/interface';
import { rowNum } from './constant';
import Game from './game';

const drawOneRowState = (
  rootDom: HTMLElement,
  state: CellState[],
  rowInd: number
) => {
  for (let j = 0; j < state.length; j += 1) {
    let cellColor = null;
    switch (state[j]) {
      case CellState.Correct:
        cellColor = style.stateCorrect;
        break;
      case CellState.Wrong:
        cellColor = style.stateWrong;
        break;
      case CellState.WrongSpot:
        cellColor = style.stateWrongSpot;
        break;
      default:
        break;
    }
    if (cellColor) {
      rootDom.children[rowInd].children[j].classList.add(cellColor);
    }

    (rootDom.children[rowInd] as HTMLElement).classList.remove(
      style.currentRow
    );
  }
};

const drawCurrentRow = (rootDom: HTMLElement, model: Game) => {
  const cellsDom = rootDom.children[model.currentIndex].children;
  const rowData = model.data[model.currentIndex];

  for (let i = 0; i < cellsDom.length; i += 1) {
    (cellsDom[i] as HTMLElement).innerText =
      i < rowData.length ? rowData[i] : '';
  }
  if (model.currentIndex < rowNum - 1) {
    (rootDom.children[model.currentIndex] as HTMLElement).classList.add(
      style.currentRow
    );
  }
};

export const render = (rootDom: HTMLElement, model: Game) => {
  if (model.currentIndex > 1) {
    drawOneRowState(
      rootDom,
      model.state[model.currentIndex - 1],
      model.currentIndex - 1
    );
  } else if (model.state.length > 0) {
    drawOneRowState(rootDom, model.state[0], 0);
  }

  if (model.currentIndex < rowNum) {
    drawCurrentRow(rootDom, model);
  }
};
