// 1. Construct grid that spirals out from the center of the canvas.

// 2. Allow for `cells` to displayed within the canvas.

// 3. Alter the visual appearance of `cells` if they meet certain criteria (prime, mersenne prime)

class Cell {
    is_prime: boolean;
    abscissa: number;
    ordinate: number;
    constructor(is_prime: boolean, abscissa: number, ordinate: number) {
        this.is_prime = is_prime;
        this.abscissa = abscissa;
        this.ordinate = ordinate;
    }

    draw(context: CanvasRenderingContext2D): void {
        context.rect(this.abscissa, this.ordinate, 50, 50);
        context.fill();
    }
}

class Application {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    constructor() {
        this.canvas = document.getElementById("application-canvas") as HTMLCanvasElement;
        this.context = this.canvas.getContext("2d") as CanvasRenderingContext2D;
        this.draw();
    }
    draw(): void {
        const cell = new Cell(false, 50, 50);
        cell.draw(this.context);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    new Application();
});