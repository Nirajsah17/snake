import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css'],
  standalone: true
})
export class CanvasComponent implements AfterViewInit {
  highestScore = 0;
  score = 0;
  width = 400;
  height = 340;
  box: number = 20;
  snake: { x: number, y: number }[] = [{ x: 10 * this.box, y: 10 * this.box }];
  food: { x: number, y: number } = { x: Math.floor(Math.random() * 20) * this.box, y: 0 };
  d: any;
  gamePause: boolean = false;
  ctx: any;
  game: any;

  @ViewChild("canvas") canvas!: ElementRef;
  @ViewChild("container") container!: ElementRef;


  ngAfterViewInit() {
    this.ctx = this.canvas.nativeElement.getContext("2d");
    console.log(this.ctx);

    const resizeObserver = new ResizeObserver(entries => {
      entries.forEach(entry => {
        const container = entry.target;
        this.canvas.nativeElement.width = container.clientWidth;
        this.canvas.nativeElement.height = container.clientHeight;
      });
    });
    resizeObserver.observe(this.container.nativeElement);
    this.game = setInterval(this.draw.bind(this), 100);
  }

  direction(e: any) {
    if (e.keyCode == 37 && this.d != "RIGHT") {
      this.d = "LEFT";
    } else if (e.keyCode == 38 && this.d != "DOWN") {
      this.d = "UP";
    } else if (e.keyCode == 39 && this.d != "LEFT") {
      this.d = "RIGHT";
    } else if (e.keyCode == 40 && this.d != "UP") {
      this.d = "DOWN";
    } else if (e.keyCode == 32) { // Space key for pause
      this.gamePause = !this.gamePause;
      if (!this.gamePause) {
        this.game = setInterval(this.draw, 100);
      } else {
        clearInterval(this.game);
        this.draw();
      }
    }
    console.log(this.d);

  }

  draw() {
    if (this.gamePause) return;  // Stop drawing if game is paused

    this.ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);

    for (let i = 0; i < this.snake.length; i++) {
      this.ctx.fillStyle = (i === 0) ? "green" : "white";
      this.ctx.fillRect(this.snake[i].x, this.snake[i].y, this.box, this.box);
      this.ctx.strokeStyle = "black";
      this.ctx.strokeRect(this.snake[i].x, this.snake[i].y, this.box, this.box);
    }
    this.ctx.fillStyle = "red";
    this.ctx.fillRect(this.food.x, this.food.y, this.box, this.box);
    let snakeX = this.snake[0].x;
    let snakeY = this.snake[0].y;
    if (this.d == "LEFT") snakeX -= this.box;
    if (this.d == "UP") snakeY -= this.box;
    if (this.d == "RIGHT") snakeX += this.box;
    if (this.d == "DOWN") snakeY += this.box;
    if (snakeX == this.food.x && snakeY == this.food.y) {
      this.score += 1;
      if (this.score > this.highestScore) {
        this.highestScore = this.score;
        // localStorage.setItem("highestScore", this.highestScore);
      }
      this.food = {
        x: Math.floor(Math.random() * 20) * this.box,
        y: Math.floor(Math.random() * 20) * this.box
      };
    } else {
      this.snake.pop();
    }

    let newHead = {
      x: snakeX,
      y: snakeY
    };

    this.checkCollision(newHead, this.snake);

    this.snake.unshift(newHead);
  }
  checkCollision(head: any, array: any) {
    for (let i = 1; i < array.length; i++) {
      if (head.x === array[i].x && head.y === array[i].y) {
        this.gameOver();
      }
    }

    if (
      head.x < 0 || head.y < 0 ||
      head.x >= this.canvas.nativeElement.width || head.y >= this.canvas.nativeElement.height
    ) {
      this.gameOver();
    }
  }

  gameOver() {
    clearInterval(this.game);
    alert("Game Over! Your score is " + this.score);
    location.reload();
  }

  upClick(){
    this.d = "UP"
  }

  leftClick() {
    this.d = "LEFT";
  }

  playClick() {

  }

  rightClick() {
    this.d = "RIGHT";
  }

  downClick() {
    this.d = "DOWN";
  }


}
