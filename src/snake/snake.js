import {
  SNAKE_INIT_LENGTH,
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
 } from './constant';
import SnakeCanvas from './SnakeCanvas';
 
export const initSnake = () => {
  const snake = [];
  for (let i = SNAKE_INIT_LENGTH; i > 0; i--) {
    // box on index == 0 will be the head
    snake.push({ x: i, y: 0 });
  }
  return snake;
}

export const move = (snake, [direction, len]) => {
  let x = snake[0].x + direction.x;
  let y = snake[0].y + direction.y;

  if(x < 0){
    x += CANVAS_WIDTH;
  } else if(x >= CANVAS_WIDTH) {
    x -= CANVAS_WIDTH;
  }
  if(y < 0){
    y += CANVAS_HEIGHT;
  } else if(y >= CANVAS_HEIGHT) {
    y -= CANVAS_HEIGHT;
  }

  const nextHead = {
    x, y
  };

  if(snake.length > len){
    snake.pop()
  }

  snake.unshift(nextHead);
  return snake;
}

export const eat = (apple, snake) => {
  const head = snake[0];
  if(snake.some(_ => SnakeCanvas.checkCollision(apple, head))){
    return SnakeCanvas.getRandomPosition();
  } else {
    return apple;
  }
}

export const nextDirection = (prev, next)=> {
  return (prev.x === next.x * -1 || prev.y === next.y * -1) ? prev: next;
}

export const willHitSelf = ({ snake }) => {
  const head = snake[0];
  for(let i = 4; i < snake.length; i++){
    if(SnakeCanvas.checkCollision(snake[i], head)){
      return false;
    }
  }
  return true;
}