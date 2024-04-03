class snake {
  snakeRect: any;
  food: any;
  currentPosition: any;
  steps: number;

  constructor(){
    this.snakeRect = {
      x: 10,
      y: 10,
      width: 30,
      height: 10
    };
    this.currentPosition = "right";
    this.food = {};
    this.steps = 10;
  }

  drawSnake(ctx:any) :void{
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.strokeStyle = "white";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(this.snakeRect.x, this.snakeRect.y);
    ctx.lineTo(this.snakeRect.width, this.snakeRect.height);
    ctx.closePath();
    ctx.stroke();
  }

  drawFood(ctx:any) :void{
    ctx.fillStyle = "red";
    ctx.fillRect(this.food.x, this.food.y, this.food.width, this.food.height);
  }

  updatePosition(position: string): void {
    switch (position) {
      case 'up':
        this.snakeRect.y = this.snakeRect.y - this.steps;
        break;
      case 'down':
        this.snakeRect.y = this.snakeRect.y + this.steps;
        break;
      case 'left':
        this.snakeRect.x = this.snakeRect.x - this.steps;
        break;
      case 'right':
        this.snakeRect.x = this.snakeRect.x + this.steps;
        break;
      default:
        break;
    }
  }


}