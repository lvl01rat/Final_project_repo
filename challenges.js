import { PipeObstacle } from "./pipeObstacle.js";
import { Bird } from "./bird.js";
import { Star } from "./star.js";

let canvas = document.getElementById("myCanvas");
let pencil = canvas.getContext("2d"); // This gives you the drawing context, like a pencil



let stars = [];
for (let i = 0; i < 120; i++) {
    stars.push(new Star(canvas, pencil));
}


//function for resetting the game
function resetGame() {
    console.log("resetting game")

    bird.x = 50;
    bird.y = 50;

    testPipe = new PipeObstacle(canvas, pencil);
}

function gameLoop() {
    
    // Draw background
    pencil.clearRect(0, 0, canvas.width, canvas.height);
    pencil.drawImage(background, 0, 0, canvas.width, canvas.height);


   stars.forEach(star => {
        star.draw(pencil);
        star.move();
    });

   
    testPipe.move();
    testPipe.draw();

    bird.gravity();
    bird.draw();

    let wasHit = bird.isHitByPipe(testPipe);
    if(wasHit) {
        console.log("you're dead, comrade!");
        score = -1
        resetGame();
    }

     let getHit = bird.getsHitByPipe(testPipe);
    if(getHit) {
        console.log("you're dead, comrade!");
        score = -1
        resetGame();

       
    } 
    
    if (bird.y <= 0 || bird.y + bird.height >= canvas.height) {
            console.log("No cheating, comrade!");
            score = -1
            resetGame();
        }
    
}


setInterval(gameLoop, 50);

let score = 0;

//score goes up every second
function raiseScore() {
    score += 1;
    let scoreElement = document.getElementById("scoreDisplay");
    scoreElement.innerHTML = "SCORE:" + score;
}
setInterval(raiseScore, 1000);

function detectClick() {
    bird.flap();
}

function detectKey() {
    bird.flap();

}

canvas.addEventListener("click", detectClick);
document.addEventListener("keypress", detectKey)

let testPipe = new PipeObstacle(canvas, pencil);
testPipe.draw();

let bird = new Bird(canvas, pencil);
