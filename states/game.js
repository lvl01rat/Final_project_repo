import { PipeObstacle } from "../pipeObstacle.js";
import { Bird } from "../bird.js";

export class Game {
    
    constructor() {
        this.canvas = document.getElementById("myCanvas");
        this.pencil = this.canvas.getContext("2d");

        this.score = 0;

        this.bird = new Bird(this.canvas, this.pencil);
        this.testPipe = new PipeObstacle(this.canvas, this.pencil);

    this.background = new Image();
    // background image is stored under the `background` folder
    this.background.src = "../background/hotline.jpg";

        this.start();
    }

    start() {
        // Register input handlers; the main loop in `code.js` will call `update()` every frame.
        this.canvas.addEventListener("click", () => this.bird.flap());
        document.addEventListener("keypress", () => this.bird.flap());
    }

    resetGame() {
        console.log("resetting game");

        this.bird.x = 50;
        this.bird.y = 50;
        // reset score and UI when game resets
        this.score = 0;
        const scoreEl = document.getElementById("scoreDisplay");
        if (scoreEl) scoreEl.innerHTML = "SCORE: " + this.score;

        this.testPipe = new PipeObstacle(this.canvas, this.pencil);
    }

    raiseScore() {
        this.score += 1;
        document.getElementById("scoreDisplay").innerHTML =
            "SCORE: " + this.score;
    }

    gameLoop() {
        // Deprecated: gameLoop was used when Game managed its own interval.
        // The centralized state machine calls `update()` every frame instead.
    }

    // Called each frame by the main loop in `code.js`.
    update() {
        let ctx = this.pencil;

        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // only draw the background if it loaded successfully
        if (this.background.complete && this.background.naturalWidth > 0) {
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
            return "gameOver";
        }
        // return undefined when staying in the same state
    }
}
