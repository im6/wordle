import Game from './models/Game';

export const decideTable = (model: Game, newKey: string) => {
  if (newKey === 'enter') {
    model.nextRow();
  } else if (newKey === 'backspace') {
    model.table[model.currentRowIndex].removeLetter();
  } else {
    model.table[model.currentRowIndex].appendLetter(newKey);
  }

  return model;
};

export const render = (rootDom: HTMLElement, model: Game) => {
  const cellsDom = rootDom.children[model.currentRowIndex].children;
  const rowData = model.table[model.currentRowIndex];
  for (let i = 0; i < rowData.cells.length; i += 1) {
    (cellsDom[i] as HTMLElement).innerText = rowData.cells[i].content;
  }
};
