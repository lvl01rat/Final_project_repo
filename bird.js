export class Bird {
    
    x = 50;
    y = 50;
    width = 50;
    height = 50;
    canvas;
    pencil;

    ySpeed = 1;
    maximumYSpeed = 20;

    constructor(canvas, pencil) {
        this.canvas = canvas;
        this.pencil = pencil;
        this.image = new Image();
        this.image.src = "sprites/bird.webp"
    }

    draw() {
      this.pencil.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    flap() {
        console.log("Flapped!")
        this.ySpeed = -15;
    }

    gravity() {
        this.y += this.ySpeed
        this.ySpeed += 2;

        if(this.ySpeed > this.maximumYSpeed) {
            this.ySpeed = this.maximumYSpeed;
        }

    }

    isHitByPipe(pipeObstacle) {
        //this detects collisions for the top pipe
        let isFarEnoughRight = this.x > pipeObstacle.topPipeTopLeft.x;
        let isLowEnough = this.y > pipeObstacle.topPipeTopLeft.y;
        let isFarEnoughLeft = this.x < pipeObstacle.topPipeBottomRight.x;
        let isHighEnough = this.y < pipeObstacle.topPipeBottomRight.y;

       if(isFarEnoughRight && isLowEnough && isFarEnoughLeft && isHighEnough)
            return true;
        return false;  
    }


        //use the logic above to detect for the bottom pipe here:
        
        getsHitByPipe(pipeObstacle) {
        let isInTheRight = this.x > pipeObstacle.bottomPipeTopLeft.x;
        let isAtBottom = this.y > pipeObstacle.bottomPipeTopLeft.y;
        let isInTheLeft = this.x < pipeObstacle.bottomPipeBottomRight.x;
        let isHighUp = this.y < pipeObstacle.bottomPipeBottomRight.y;

       

         if(isInTheRight && isAtBottom && isInTheLeft && isHighUp)
            return true;
        return false;
    }


}