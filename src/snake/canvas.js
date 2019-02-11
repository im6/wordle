import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
} from './constant';

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const isEmptyCell = (point, snake) => {
  return !snake.some(v => detectCollision(v, point));
};

export const checkCollision = (a, b) => {
  return a.x === b.x && a.y === b.y;
}

export const getRandomPosition = () => {
  const position = {
    x: getRandomNumber(0, CANVAS_WIDTH - 1),
    y: getRandomNumber(0, CANVAS_HEIGHT - 1)
  };

  return position;
}

export const renderScene = (ctx, scene) => {
  debugger;
}