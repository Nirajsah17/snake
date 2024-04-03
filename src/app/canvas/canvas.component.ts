import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-canvas',
  standalone: true,
  imports: [],
  templateUrl: './canvas.component.html',
})
export class CanvasComponent implements AfterViewInit {
  @ViewChild('canvas') canvasRef!: ElementRef;
  @ViewChild('canvasContainer') canvasContainer!: ElementRef;
  
  context!: CanvasRenderingContext2D;
  snakeHead!: { x: number; y: number };
  snakeTail!: { x: number; y: number };
  score = 0; // score 
  food: { x: number; y: number , width: number, height: number} = { x: 0, y: 0 , width: 10, height: 10 };
  step: number = 10; //

  resizeObserver! : ResizeObserver;
  currentPos: string = "right";

  ngAfterViewInit(): void {
    const canvas = this.canvasRef.nativeElement;
    const container = this.canvasContainer.nativeElement;
    this.context = canvas.getContext('2d');
    this.resizeCanvas(container);
    this.initGame();
  }

  initGame(){
    // Set the initial head and tail position
    // Set initial food position
    this.snakeHead = { x: 10, y: 10 };
    this.snakeTail = { x: 20, y: 10 };
    let x = this.context.canvas.width;
    let y = this.context.canvas.height;
    this.food.x = this.getRandomInt(1,x);
    this.food.y = this.getRandomInt(1,y);
    this.drawSnake(this.snakeHead, this.snakeTail); 
    this.drawFood(this.food);
    // this.drawScore();  
  }

  render(){
    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
    this.drawSnake(this.snakeHead, this.snakeTail);
    this.drawFood(this.food);
  }

  drawSnake(head : any , tail: any) :void{
      this.context.strokeStyle = "white";
      this.context.lineWidth = 4;
      this.context.beginPath();
      this.context.moveTo(head.x, head.y);
      this.context.lineTo(tail.x, tail.y);
      this.context.closePath();
      this.context.stroke();
  }

  drawFood(food:any){
    this.context.fillStyle = "red";
    this.context.fillRect(food.x, food.y, food.width, food.height);
  }

  moveSnake(food: any) : void{
    if(this.snakeHead.x == food.x && this.snakeHead.y == food.y){
      // this.grow();
    }
    this.updatePosition(this.currentPos);
  }

  resizeCanvas(element: HTMLElement): void {
    this.resizeObserver = new ResizeObserver(() => {
      const canvas = this.canvasRef.nativeElement;
      const container = element;
      canvas.width = container.clientWidth - 10;
      canvas.height = container.clientHeight - 100;
      this.render();
    });
    this.resizeObserver.observe(element);
  }

  getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  updatePosition(position: string): void {
    switch (position) {
      case 'up':
        this.snakeHead.y = this.snakeHead.y - this.step;
        this.snakeTail.y = this.snakeTail.y - this.step;
        break;
      case 'down':
        this.snakeHead.y = this.snakeHead.y + this.step;
        this.snakeTail.y = this.snakeTail.y + this.step;
        break;
      case 'left':
        this.snakeHead.x = this.snakeHead.x - this.step;
        this.snakeTail.x = this.snakeTail.x - this.step;
        break;
      case 'right':
        this.snakeHead.x = this.snakeHead.x + this.step;
        this.snakeTail.x = this.snakeTail.x + this.step;
        break;
      default:
        break;
    }
  }

  handleLeftClick(event: any): void {
    this.updatePosition("left")
    this.currentPos = "left";
  }

  handleRightClick(){
    this.currentPos = "right";
    this.updatePosition("right")
  }

  handleUpClick(){
    this.updatePosition("up")
    this.currentPos = "up";
  }

  handleDownClick(){
    this.updatePosition("down");
    this.currentPos = "down";
  }
  startGame(){
    setInterval(()=>{
      this.render();
      this.moveSnake(this.food);
    }, 200)
  }
}