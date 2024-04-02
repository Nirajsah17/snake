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
  food: { x: number; y: number } = { x: 0, y: 0 };

  resizeObserver! : ResizeObserver;

  ngAfterViewInit(): void {
    const canvas = this.canvasRef.nativeElement;
    const container = this.canvasContainer.nativeElement;
    this.context = canvas.getContext('2d');
    this.initGame();
    this.resizeCanvas(container);
  }

  createSnake(): void {
    this.context.strokeStyle = "white"; // Draw the line
    this.context.beginPath(); // Begin path
    this.context.moveTo(2, this.snakeHead.y); // Move to starting point (x=50, y=50)
    this.context.lineTo(this.snakeHead.x, this.snakeHead.y); // Draw a line to end point (x=350, y=150)
    this.context.stroke();
  }

  moveSnake(direction: string){
    switch (direction) {
      case 'left':
        this.snakeHead.x -= 10;
        break;
      case 'right':
        this.snakeHead.x += 10;
        break;
      case 'up':
        this.snakeHead.y -= 10;
        break;
      case 'down':
        this.snakeHead.y += 10;
        break;
    }
  }

  initGame(): void { 
    this.snakeHead = { x: 20, y: 30 };
    this.snakeTail = { x: 2, y: this.snakeHead.y };

    this.createSnake();
    // setInterval(() => this.gameLoop(), 10000);
  }

  gameLoop(): void {
    // Implement game logic here

    this.moveSnake("right");
    // this.moveFood();
    // this.checkCollision();
    // this.drawScore();
  }

  resizeCanvas(element: HTMLElement): void {
    this.resizeObserver = new ResizeObserver(() => {
      const canvas = this.canvasRef.nativeElement;
      const container = element;
      canvas.width = container.clientWidth - 10;
      canvas.height = container.clientHeight - 100;
      this.createSnake();
    });
    this.resizeObserver.observe(element);
  }

  handleLeftClick(event: MouseEvent): void {
    console.log(event);
    console.log("Left Click");
  }

  handleRightClick(){
    console.log("Right Click");
  }

  handleUpClick(){
    console.log("Up Click");
  }

  handleDownClick(){
    console.log("Down Click");
  }
  startGame(){
    
  }
}
