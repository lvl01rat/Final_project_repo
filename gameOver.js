export class GameOverScreen {
    constructor(canvas, pencil) {
        this.canvas = canvas;
        this.pencil = pencil;
        this.restartClicked = false;
    }

    draw(score, highScore) {
        // Draw semi-transparent overlay
        this.pencil.fillStyle = "rgba(0, 0, 0, 0.7)";
        this.pencil.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw GAME OVER text
        this.pencil.fillStyle = "white";
        this.pencil.font = "bold 80px Arial";
        this.pencil.textAlign = "center";
        this.pencil.textBaseline = "middle";
        this.pencil.fillText("GAME OVER", this.canvas.width / 2, this.canvas.height / 2 - 120);

        // Draw score
        this.pencil.font = "bold 40px Arial";
        this.pencil.fillText("SCORE: " + score, this.canvas.width / 2, this.canvas.height / 2 - 20);

        // Draw high score
        this.pencil.font = "bold 40px Arial";
        this.pencil.fillText("HIGH SCORE: " + highScore, this.canvas.width / 2, this.canvas.height / 2 + 40);

        // Draw restart button
        this.pencil.fillStyle = "white";
        this.pencil.strokeStyle = "white";
        this.pencil.lineWidth = 3;
        let buttonX = this.canvas.width / 2 - 100;
        let buttonY = this.canvas.height / 2 + 120;
        let buttonWidth = 200;
        let buttonHeight = 60;
        
        this.pencil.strokeRect(buttonX, buttonY, buttonWidth, buttonHeight);
        this.pencil.font = "bold 30px Arial";
        this.pencil.fillText("RESTART", this.canvas.width / 2, buttonY + buttonHeight / 2);

        // Draw instructions
        this.pencil.font = "20px Arial";
        this.pencil.fillText("Press SPACE or CLICK to restart", this.canvas.width / 2, this.canvas.height - 50);
    }

    handleClick(event) {
        let rect = this.canvas.getBoundingClientRect();
        let x = event.clientX - rect.left;
        let y = event.clientY - rect.top;
        
        // Check if click is on RESTART button
        let buttonX = this.canvas.width / 2 - 100;
        let buttonY = this.canvas.height / 2 + 120;
        let buttonWidth = 200;
        let buttonHeight = 60;
        
        if (x > buttonX && x < buttonX + buttonWidth && y > buttonY && y < buttonY + buttonHeight) {
            return true;
        }
        return false;
    }

    handleKey(event) {
        if (event.key === " " || event.key === "Enter") {
            return true;
        }
        return false;
    }
}