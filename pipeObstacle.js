export class PipeObstacle {

    x = 300;
    y = 100;
    width = 50;  
    height = 50; 
    canvas;
    pencil;
    speed = 8;

    
    presetPositions = [];
    currentPositionIndex = 0;

    
    topPipeTopLeft;
    topPipeBottomRight;
    bottomPipeTopLeft;
    bottomPipeBottomRight;

    constructor(canvas, pencil) {
        this.pencil = pencil;
        this.canvas = canvas;
        this.image = new Image();
        this.image.src = "sprites/trees.png"; 

   
        this.presetPositions = [
            canvas.height / 4,           // Top
            canvas.height / 2 - 25,      // Middle
            (canvas.height * 3) / 4 - 50 // Bottom
        ];

        
        this.currentPositionIndex = Math.floor(Math.random() * 3);
        this.y = this.presetPositions[this.currentPositionIndex];
    }

    draw() {
        
        this.pencil.drawImage(
            this.image,
            this.x,
            this.y,
            this.width,
            this.height
        );

   
        this.topPipeTopLeft = {
            x: this.x,
            y: this.y
        };

        this.topPipeBottomRight = {
            x: this.x + this.width,
            y: this.y + this.height
        };

        this.bottomPipeTopLeft = {
            x: this.x,
            y: this.y
        };

        this.bottomPipeBottomRight = {
            x: this.x + this.width,
            y: this.y + this.height
        };
    }

    move() {
        this.x -= this.speed;

        // Recycle pipes when it goes off screen
        if (this.x < -this.width) {
            this.x = this.canvas.width;
            // Pick a new random preset position
            this.currentPositionIndex = Math.floor(Math.random() * 3);
            this.y = this.presetPositions[this.currentPositionIndex];
        }
    }
}