// 1. Construct grid that spirals out from the center of the canvas.

// 2. Allow for `cells` to displayed within the canvas.

// 3. Alter the visual appearance of `cells` if they meet certain criteria (prime, mersenne prime)

class Cell {
    is_prime: boolean;
    abscissa: number;
    ordinate: number;
    size: number = 12;
    constructor(is_prime: boolean, abscissa: number, ordinate: number) {
        this.is_prime = is_prime;
        this.abscissa = abscissa;
        this.ordinate = ordinate;
    }

    draw(context: CanvasRenderingContext2D): void {
        if(!this.is_prime) {
            context.fillStyle = "white";
        } else {
            context.fillStyle = "black";
        }
        context.fillRect(this.abscissa, this.ordinate, this.size, this.size);
    }
}

class Application {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    constructor() {
        this.canvas = document.getElementById("application-canvas") as HTMLCanvasElement;
        this.context = this.canvas.getContext("2d") as CanvasRenderingContext2D;
        this.canvas.setAttribute("style", "background-color: black");
        this.draw();
    }
    draw(): void {
        let width: number = 600 / 15;
        for (let row = 0; row < width; row++) {
            for (let column = 0; column < width; column++) {
                if(row == 19 && column == 19) {
                    const cell = new Cell(true, row * 15, column * 15);
                    cell.draw(this.context);
                } else {
                    const cell = new Cell(false, row * 15, column * 15);
                    cell.draw(this.context);
                }
            }
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    new Application();
});