import Game from './game';

describe('game utility tests', () => {
  let game: Game = null;
  beforeAll(() => {
    game = new Game();
  });
  test('handleAdd', () => {
    game.handleAdd('a');
    expect(game.data).toHaveLength(1);
  });
  test('handleEnter', () => {
    game.handleAdd('p');
    game.handleEnter();
    expect(game.currentIndex).toBe(0);
    game.handleAdd('p');
    game.handleAdd('l');
    game.handleAdd('e');
    game.handleEnter();
    expect(game.currentIndex).toBe(1);
  });
  test('handleBack', () => {
    game.handleAdd('p');
    game.handleBack();
    expect(game.data[1]).toBe('');
  });
  test('test end', () => {
    game.handleAdd('a');
    game.handleAdd('p');
    game.handleAdd('p');
    game.handleAdd('p');
    game.handleAdd('p');
    game.handleEnter();
    game.handleBack();
    game.handleBack();
    game.handleAdd('l');
    game.handleAdd('e');
    game.handleEnter();
    game.handleAdd('a');
    game.handleAdd('p');
    game.handleAdd('p');
    game.handleAdd('l');
    game.handleAdd('e');
    game.handleEnter();
    game.handleAdd('a');
    game.handleAdd('p');
    game.handleAdd('p');
    game.handleAdd('l');
    game.handleAdd('e');
    game.handleEnter();
    game.handleAdd('a');
    game.handleAdd('p');
    game.handleAdd('p');
    game.handleAdd('l');
    game.handleAdd('e');
    game.handleEnter();
    game.handleAdd('o');
    game.handleAdd('v');
    game.handleAdd('a');
    game.handleAdd('t');
    game.handleAdd('e');
    game.handleEnter();
    expect(game.gameOverMessage).toBeDefined();
  });
});
