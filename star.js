export class Star {


    x = 50;
    y = 50;
    pencil;

    constructor(canvas, pencil) {
        this.canvas = canvas;
        this.pencil = pencil;
        this.x = canvas.width * Math.random();
        this.y = canvas.height * Math.random();

         this.image = new Image();
        this.image.src = "sprites/star.png";
    }

    draw(pencil) {
        this.pencil.drawImage(this.image, this.x, this.y, 15, 15);  // Adjust width/height as needed
    }
    
    
 //recycle stars/restart stars
    move() {
        this.x -= 5;
        if (this.x < 0) this.x = this.canvas.width;
        if (this.x > this.canvas.width) this.x = 0;
        if (this.y < 0) this.y = this.canvas.height;
        if (this.y > this.canvas.height) this.y = 0;
    }

}