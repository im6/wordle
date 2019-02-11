import {
  BOX_SIZE,
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  SNAKE_HEAD_COLOR,
  SNAKE_BODY_COLOR,
  FOOD_COLOR,
} from './constant.js';

const canvas_width = CANVAS_WIDTH * BOX_SIZE;
const canvas_height = CANVAS_HEIGHT * BOX_SIZE;

class SnakeCanvas {
  constructor(canvas){
    const ctx = canvas.getContext('2d');
    canvas.width = canvas_width;
    canvas.height = canvas_height;
    ctx.fillStyle = '#f5f5f5';
    ctx.fillRect(0, 0, canvas_width, canvas_height);
    this.ctx = ctx;
  }

  static getSnakeBoxColor(idx) {
    return idx === 0 ? SNAKE_HEAD_COLOR : SNAKE_BODY_COLOR;
  }
  static getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  static checkCollision(a, b) {
    return a.x === b.x && a.y === b.y;
  }
  static isEmptyCell(point, snake) {
    return !snake.some(v => this.checkCollision(v, point));
  }
  static getRandomPosition() {
    const position = {
      x: this.getRandomNumber(0, CANVAS_WIDTH - 1),
      y: this.getRandomNumber(0, CANVAS_HEIGHT - 1)
    };
    return position;
  }

  drawBox(point, color) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(point.x * BOX_SIZE, point.y * BOX_SIZE, BOX_SIZE, BOX_SIZE);
  }

  renderScene({ snake, apple, score}) {
    this.ctx.clearRect(0, 0, canvas_width, canvas_height);
    snake.forEach((v, k) => {
      this.drawBox(v, SnakeCanvas.getSnakeBoxColor(k));
    });
    this.drawBox(apple, FOOD_COLOR);
  }
}

export default SnakeCanvas;