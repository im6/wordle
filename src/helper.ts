import Game from './models/Game';
import style from './style.less';
import { CellState } from './typing/enum';
import { rowNum } from './constant';

export const decideTable = (model: Game, newKey: string) => {
  if (newKey === 'enter') {
    model.handleEnter();
  } else if (newKey === 'backspace') {
    model.handleBack();
  } else {
    model.handleAddNewChar(newKey);
  }
  return model;
};

const drawPreviousRows = (rootDom: HTMLElement, model: Game) => {
  for (let i = 0; i < model.currentRowIndex + 1; i += 1) {
    const rowData = model.table[i].cells;
    for (let j = 0; j < rowData.length; j += 1) {
      let cellColor = null;
      switch (rowData[j].state) {
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
        rootDom.children[i].children[j].classList.add(cellColor);
      }
    }
    (rootDom.children[i] as HTMLElement).classList.remove(style.currentRow);
  }
};

const drawCurrentRow = (rootDom: HTMLElement, model: Game) => {
  drawPreviousRows(rootDom, model);
  const cellsDom = rootDom.children[model.currentRowIndex].children;
  const rowData = model.table[model.currentRowIndex].cells;
  for (let i = 0; i < cellsDom.length; i += 1) {
    (cellsDom[i] as HTMLElement).innerText =
      i < rowData.length ? rowData[i].content : '';
  }
  if (model.currentRowIndex < rowNum - 1) {
    (rootDom.children[model.currentRowIndex] as HTMLElement).classList.add(
      style.currentRow
    );
  }
};

export const render = (rootDom: HTMLElement, model: Game) => {
  drawPreviousRows(rootDom, model);
  drawCurrentRow(rootDom, model);
};
