export class TitleScreen {
    constructor(canvas, pencil) {
        this.canvas = canvas;
        this.pencil = pencil;
        this.gameStarted = false;
    }

    draw() {
        // Clear canvas
        this.pencil.fillStyle = "white";
        this.pencil.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw title text
        this.pencil.fillStyle = "white";
        this.pencil.font = "bold 60px Arial";
        this.pencil.textAlign = "center";
        this.pencil.textBaseline = "middle";
        this.pencil.fillText("Belt Blitz", this.canvas.width / 2, this.canvas.height / 2 - 80);

          // Draw controls tutorial
        this.pencil.font = "bold 20px Arial";
        this.pencil.fillStyle = "lightblue";
        this.pencil.textAlign = "center";
        this.pencil.fillText("CONTROLS", this.canvas.width / 2, this.canvas.height / 2 - 10);

        this.pencil.font = "18px Arial";
        this.pencil.fillStyle = "white";
        this.pencil.fillText("W - Move Up", this.canvas.width / 2, this.canvas.height / 2 + 20);
        this.pencil.fillText("S - Move Down", this.canvas.width / 2, this.canvas.height / 2 + 50);
        this.pencil.fillText("Avoid the asteroids!", this.canvas.width / 2, this.canvas.height / 2 + 85);

        // Draw start button
        this.pencil.fillStyle = "white";
        this.pencil.strokeStyle = "white";
        this.pencil.lineWidth = 3;
        let buttonX = this.canvas.width / 2 - 75;
        let buttonY = this.canvas.height / 2 + 130;
        let buttonWidth = 150;
        let buttonHeight = 50;
        
        this.pencil.strokeRect(buttonX, buttonY, buttonWidth, buttonHeight);
        this.pencil.font = "bold 30px Arial";
        this.pencil.fillText("START", this.canvas.width / 2, buttonY + buttonHeight / 2);

    
    }

    handleClick(event) {
        let rect = this.canvas.getBoundingClientRect();
        let x = event.clientX - rect.left;
        let y = event.clientY - rect.top;
        
        // Check if click is on START button
        let buttonX = this.canvas.width / 2 - 75;
        let buttonY = this.canvas.height / 2 + 130;
        let buttonWidth = 150;
        let buttonHeight = 50;
        
        if (x > buttonX && x < buttonX + buttonWidth && y > buttonY && y < buttonY + buttonHeight) {
            this.gameStarted = true;
            return true;
        }
        return false;
    }

    handleKey(event) {
        if (event.key === " " || event.key === "Enter") {
            this.gameStarted = true;
            return true;
        }
        return false;
    }
}