import {
  SNAKE_INIT_LENGTH,
 } from './constant';
import SnakeCanvas from './SnakeCanvas';
 
export const initSnake = () => {
  let snake = [];
  for (let i = SNAKE_INIT_LENGTH; i > 0; i--) {
    // box on index == 0 will be the head
    snake.push({ x: i, y: 0 });
  }
  return snake;
}

export const initApple = () => {
  return SnakeCanvas.getRandomPosition();
}

export const move = (snake, [direction, len]) => {
  const nextHead = {
    x: snake[0].x + direction.x,
    y: snake[0].y + direction.y,
  };

  if(snake.length > len){
    snake.pop()
  }

  snake.unshift(nextHead);
  return snake;
}

export const eat = (apple, snake) => {
  const head = snake[0];
  if(snake.some(v => SnakeCanvas.checkCollision(apple, head))){
    return SnakeCanvas.getRandomPosition();
  } else {
    return apple;
  }
}

export const nextDirection = (prev, next)=> {
  return (prev.x === next.x * -1 || prev.y === next.y * -1) ? prev: next;
}