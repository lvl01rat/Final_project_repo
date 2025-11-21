import { TitleScreen } from "./titleScreen.js";
import { GameOverScreen } from "./gameOver.js";
import { PipeObstacle } from "./pipeObstacle.js";
import { Bird } from "./bird.js";
import { Star } from "./star.js";

let canvas = document.getElementById("myCanvas");
let pencil = canvas.getContext("2d");

let stars = [];
for (let i = 0; i < 120; i++) {
    stars.push(new Star(canvas, pencil));
}

let titleScreen = new TitleScreen(canvas, pencil);
let gameOverScreen = new GameOverScreen(canvas, pencil);
let gameStarted = false;
let gameOver = false;
let highScore = localStorage.getItem("flappyHighScore") || 0;

let testPipe = new PipeObstacle(canvas, pencil);
let newPipe = new PipeObstacle(canvas, pencil);


PipeObstacle.otherObstaclePosition = testPipe.currentPositionIndex;
newPipe.currentPositionIndex = Math.floor(Math.random() * 3);
while (newPipe.currentPositionIndex === testPipe.currentPositionIndex) {
    newPipe.currentPositionIndex = Math.floor(Math.random() * 3);
}
newPipe.y = newPipe.presetPositions[newPipe.currentPositionIndex];


//function for resetting the game
function resetGame() {
    console.log("resetting game")
    bird.x = 50;
    bird.currentPositionIndex = 1; 
    bird.y = bird.presetPositions[bird.currentPositionIndex];
    score = 0;
    testPipe = new PipeObstacle(canvas, pencil);
    newPipe = new PipeObstacle(canvas, pencil);
  

     PipeObstacle.otherObstaclePosition = testPipe.currentPositionIndex;
    newPipe.currentPositionIndex = Math.floor(Math.random() * 3);
    while (newPipe.currentPositionIndex === testPipe.currentPositionIndex) {
        newPipe.currentPositionIndex = Math.floor(Math.random() * 3);
    }
    newPipe.y = newPipe.presetPositions[newPipe.currentPositionIndex];
}

function gameLoop() {
    // Draw background
    pencil.clearRect(0, 0, canvas.width, canvas.height);
    pencil.drawImage(background, 0, 0, canvas.width, canvas.height);

    stars.forEach(star => {
        star.draw(pencil);
        star.move();
    });

   
    if (!gameStarted) {
        titleScreen.draw();
        return;
    }

   
    if (gameOver) {
        gameOverScreen.draw(score, highScore);
        return;
    }

    testPipe.move();
    testPipe.draw();

    newPipe.move();
    newPipe.draw();

    
    bird.draw();

    let wasHit = bird.isHitByPipe(testPipe);
    if(wasHit) {
        console.log("you're dead, comrade!");
        gameOver = true;
        updateHighScore();
    }

     let getHit = bird.getsHitByPipe(newPipe);
    if(getHit) {
        console.log("you're dead, comrade!");
        gameOver = true;
        updateHighScore();
    } 
    
    if (bird.y <= 0 || bird.y + bird.height >= canvas.height) {
            console.log("No cheating, comrade!");
            gameOver = true;
            updateHighScore();
    }
}

setInterval(gameLoop, 50);

let score = 0;

//score goes up every second
function raiseScore() {
    if (gameStarted && !gameOver) {
        score += 1;
        let scoreElement = document.getElementById("scoreDisplay");
        scoreElement.innerHTML = "SCORE: " + score;
    }
}
setInterval(raiseScore, 50);

// Update high score in localStorage
function updateHighScore() {
    if (score > highScore) {
        highScore = score;
        localStorage.setItem("flappyHighScore", highScore);
    }
}

function detectClick(event) {
    if (!gameStarted) {
        if (titleScreen.handleClick(event)) {
            gameStarted = true;
        }
    } else if (gameOver) {
        if (gameOverScreen.handleClick(event)) {
            gameOver = false;
            resetGame();
            gameStarted = true;
        }
    }
}

function detectKey(event) {
    if (!gameStarted) {
        if (titleScreen.handleKey(event)) {
            gameStarted = true;
        }
    } else if (gameOver) {
        if (gameOverScreen.handleKey(event)) {
            gameOver = false;
            resetGame();
            gameStarted = true;
        }
    } else {
       if (event.key.toLowerCase() === 'w') {
            bird.moveUp();
        } else if (event.key.toLowerCase() === 's') {
            bird.moveDown();
        }
    }
}

canvas.addEventListener("click", detectClick);
document.addEventListener("keypress", detectKey)



let bird = new Bird(canvas, pencil);