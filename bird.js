export class Bird {
    
    x = 50;
    y = 45;
    width = 50;
    height = 50;
    canvas;
    pencil;

   presetPositions = [];
    currentPositionIndex = 1;

    constructor(canvas, pencil) {
        this.canvas = canvas;
        this.pencil = pencil;

        this.presetPositions = [
            canvas.height / 4,           // Top position
            canvas.height / 2 - 25,      // Middle position
            (canvas.height * 3) / 4 - 50 // Bottom position
        ];
        
        this.y = this.presetPositions[this.currentPositionIndex];
        this.image = new Image();
        this.image.src = "sprites/bird.webp"

         this.explosionImage = new Image();
        this.explosionImage.src = "sprites/explode.gif"; // Change to your explosion sprite filename
    }

    draw() {
    if (this.isExploding) {
            this.pencil.drawImage(
                this.explosionImage,
                this.x,
                this.y,
                this.width,
                this.height
            );
        } else {
            this.pencil.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
    }

  moveUp() {
        if (this.currentPositionIndex > 0) {
            this.currentPositionIndex--;
            this.y = this.presetPositions[this.currentPositionIndex];
            console.log("Moved up to position " + this.currentPositionIndex);
        }
    }

    moveDown() {
        if (this.currentPositionIndex < this.presetPositions.length - 1) {
            this.currentPositionIndex++;
            this.y = this.presetPositions[this.currentPositionIndex];
            console.log("Moved down to position " + this.currentPositionIndex);
        }
    }

     isHitByPipe(pipeObstacle) {
        // Check if bird rectangle overlaps with obstacle rectangle
        let birdRight = this.x + this.width;
        let birdBottom = this.y + this.height;
        
        let obstacleRight = pipeObstacle.topPipeBottomRight.x;
        let obstacleBottom = pipeObstacle.topPipeBottomRight.y;
        let obstacleLeft = pipeObstacle.topPipeTopLeft.x;
        let obstacleTop = pipeObstacle.topPipeTopLeft.y;

        // Check if rectangles overlap
        if (this.x < obstacleRight && 
            birdRight > obstacleLeft && 
            this.y < obstacleBottom && 
            birdBottom > obstacleTop) {
            return true;
        }
        return false;  
    }

    getsHitByPipe(pipeObstacle) {
        // Check if bird rectangle overlaps with obstacle rectangle
        let birdRight = this.x + this.width;
        let birdBottom = this.y + this.height;
        
        let obstacleRight = pipeObstacle.bottomPipeBottomRight.x;
        let obstacleBottom = pipeObstacle.bottomPipeBottomRight.y;
        let obstacleLeft = pipeObstacle.bottomPipeTopLeft.x;
        let obstacleTop = pipeObstacle.bottomPipeTopLeft.y;

        // Check if rectangles overlap
        if (this.x < obstacleRight && 
            birdRight > obstacleLeft && 
            this.y < obstacleBottom && 
            birdBottom > obstacleTop) {
            return true;
        }
        return false;
    }


}