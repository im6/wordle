import { Game } from './typing/interface';
import style from './style.less';
import { CellState } from './typing/interface';
import { rowNum, wordLen } from './constant';

const calculateState = (word: string, answer: string): CellState[] => {
  const res = word.split('').map((v, k) => {
    if (answer[k] === v) {
      return CellState.Correct;
    } else if (answer.includes(v)) {
      return CellState.WrongSpot;
    } else {
      return CellState.Wrong;
    }
  });

  return res;
};

export const decideTable = (model: Game, newKey: string) => {
  if (newKey === 'enter') {
    if (model.rows[model.rowIndex].length === wordLen) {
      model.state.push(
        calculateState(model.rows[model.rowIndex], model.answer)
      );
      if (model.rowIndex < rowNum) {
        model.rowIndex += 1;
        model.rows.push('');
      }
    }
  } else if (newKey === 'backspace') {
    if (model.rows[model.rowIndex].length > 0) {
      model.rows[model.rowIndex] = model.rows[model.rowIndex].slice(0, -1);
    }
  } else {
    if (model.rows[model.rowIndex].length < wordLen) {
      model.rows[model.rowIndex] += newKey;
    }
  }
  return model;
};

const drawPreviousRows = (rootDom: HTMLElement, model: Game) => {
  for (let i = 0; i < model.rowIndex; i += 1) {
    const rowData = model.state[i];
    for (let j = 0; j < rowData.length; j += 1) {
      let cellColor = null;
      switch (rowData[j]) {
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
  const cellsDom = rootDom.children[model.rowIndex].children;
  const rowData = model.rows[model.rowIndex];
  for (let i = 0; i < cellsDom.length; i += 1) {
    (cellsDom[i] as HTMLElement).innerText =
      i < rowData.length ? rowData[i] : '';
  }
  if (model.rowIndex < rowNum - 1) {
    (rootDom.children[model.rowIndex] as HTMLElement).classList.add(
      style.currentRow
    );
  }
};

export const render = (rootDom: HTMLElement, model: Game) => {
  if (model.rowIndex > 0) {
    drawPreviousRows(rootDom, model);
  }
  if (model.rowIndex < rowNum) {
    drawCurrentRow(rootDom, model);
  }
};
