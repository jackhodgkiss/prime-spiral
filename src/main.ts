// 1. Construct grid that spirals out from the center of the canvas.

// 2. Allow for `cells` to displayed within the canvas.

// 3. Alter the visual appearance of `cells` if they meet certain criteria (prime, mersenne prime)

class Application {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    constructor() {
        this.canvas = document.getElementById("application-canvas") as HTMLCanvasElement;
        this.context = this.canvas.getContext("2d") as CanvasRenderingContext2D;
        this.canvas.setAttribute("style", "background-color: black;");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    new Application();
});