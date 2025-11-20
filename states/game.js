import { PipeObstacle } from "./pipeObstacle.js";
import { Bird } from "./bird.js";

export class Game {
    
    constructor() {
        this.canvas = document.getElementById("myCanvas");
        this.pencil = this.canvas.getContext("2d");

        this.score = 0;

        this.bird = new Bird(this.canvas, this.pencil);
        this.testPipe = new PipeObstacle(this.canvas, this.pencil);

        this.background = new Image();
        this.background.src = "background.png";

        this.start();
    }

    start() {

        this.loopInterval = setInterval(() => this.gameLoop(), 50);

        this.scoreInterval = setInterval(() => this.raiseScore(), 1000);
t
        this.canvas.addEventListener("click", () => this.bird.flap());
        document.addEventListener("keypress", () => this.bird.flap());
    }

    resetGame() {
        console.log("resetting game");

        this.bird.x = 50;
        this.bird.y = 50;

        this.testPipe = new PipeObstacle(this.canvas, this.pencil);
    }

    raiseScore() {
        this.score += 1;
        document.getElementById("scoreDisplay").innerHTML =
            "SCORE: " + this.score;
    }

    gameLoop() {
        let ctx = this.pencil;

        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if (this.background.complete) {
            ctx.drawImage(this.background, 0, 0, this.canvas.width, this.canvas.height);
        }

        this.testPipe.move();
        this.testPipe.draw();

        this.bird.gravity();
        this.bird.draw();

        if (
            this.bird.isHitByPipe(this.testPipe) ||
            this.bird.getsHitByPipe(this.testPipe) ||
            this.bird.y <= 0 ||
            this.bird.y + this.bird.height >= this.canvas.height
        ) {
            console.log("you're dead, comrade!");
            this.score = -1;
            this.resetGame();
        }
    }
}
