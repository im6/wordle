/* eslint-disable @typescript-eslint/no-explicit-any  */
import { Game, GameStatus } from './typing/interface';
import { rowNum, wordLen } from './constant';
import { isValidWord } from './helper';

const createReducer =
  (wordRef: any) =>
  (g: Game, newKey: string): Game => {
    const currentWord = g.data[g.currentIndex];
    if (newKey === 'enter') {
      if (currentWord.length === wordLen) {
        if (isValidWord(currentWord)) {
          const ans = wordRef.exposeAnswer();
          //console.log(ans);
          const newState = [...g.state, wordRef.calculateState(currentWord)];
          if (currentWord === ans) {
            return {
              ...g,
              state: newState,
              gameStatus: GameStatus.Success,
              bottomMessage: 'Congrat! You did it!',
            };
          } else if (g.currentIndex === rowNum - 1) {
            return {
              ...g,
              state: newState,
              gameStatus: GameStatus.Fail,
              bottomMessage: `The Answer is [${ans.toUpperCase()}]`,
            };
          } else {
            return {
              ...g,
              currentIndex: g.currentIndex + 1,
              data: [...g.data, ''],
              state: newState,
            };
          }
        } else {
          return {
            ...g,
            gameStatus: GameStatus.Error,
          };
        }
      } else {
        // todo: some shake effect
        return g;
      }
    } else if (newKey === 'backspace') {
      if (currentWord.length > 0) {
        const newData = [...g.data];
        newData[g.currentIndex] = currentWord.slice(0, -1);
        return {
          ...g,
          data: newData,
          gameStatus: GameStatus.Pending,
        };
      } else {
        return g;
      }
    } else {
      if (currentWord.length < wordLen) {
        const newData = [...g.data];
        newData[g.currentIndex] += newKey;
        return {
          ...g,
          data: newData,
        };
      } else {
        return g;
      }
    }
  };

export default createReducer;
