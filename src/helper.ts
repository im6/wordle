import Game from './models/Game';
import style from './style.less';

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

export const render = (rootDom: HTMLElement, model: Game) => {
  const cellsDom = rootDom.children[model.currentRowIndex].children;
  const rowData = model.table[model.currentRowIndex].cells;
  console.log(style);
  for (let i = 0; i < cellsDom.length; i += 1) {
    (cellsDom[i] as HTMLElement).innerText =
      i < rowData.length ? rowData[i].content : '';
  }
  for (let i = 0; i < rootDom.children.length; i += 1) {
    if (i === model.currentRowIndex) {
      (rootDom.children[i] as HTMLElement).classList.add(style.currentRow);
    } else {
      (rootDom.children[i] as HTMLElement).classList.remove(style.currentRow);
    }
  }
};
