// 1. Construct grid that spirals out from the center of the canvas.

// 2. Allow for `cells` to displayed within the canvas.

// 3. Alter the visual appearance of `cells` if they meet certain criteria (prime, mersenne prime)

class Cell {
    is_prime: boolean;
    abscissa: number;
    ordinate: number;
    size: number = 15;
    constructor(is_prime: boolean, abscissa: number, ordinate: number) {
        this.is_prime = is_prime;
        this.abscissa = abscissa;
        this.ordinate = ordinate;
    }

    draw(context: CanvasRenderingContext2D): void {
        if(this.is_prime) {
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

    coordinates_to_value(row: number, column: number): number {
        let value: number = 0;
        const layer: number = Math.max(Math.abs(row), Math.abs(column));
        const smallest_layer_element: number = Math.pow(3 + (layer - 2) * 2, 2) + 1;
        const largest_layer_element: number = Math.pow(3 + (layer - 1) * 2, 2);
        if (column == -layer || row == layer) {
            value = largest_layer_element - (Math.abs(row - layer) + Math.abs(column - layer));
        } else {
            value = smallest_layer_element + (Math.abs(row - (layer - 1)) + Math.abs(column - layer));
        }
        return value;
    }

    is_prime(value: number): boolean {
        if (value == 0 || value == 1) { return false; }
        if (value == 2 || value == 3) { return true; }
        if (value % 2 == 0) { return false; }
        let result: boolean = true;
        for (let divisor = 3; divisor <= Math.sqrt(value) + 2; divisor += 2) {
            const remainder = value % divisor;
            if(remainder == 0) {
                result = false;
                break;
            }
        }
        return result;
    }


    draw(): void {
        const canvas_size: number = 600;
        const cell_size: number = 1;
        this.context.save();
        this.context.translate(canvas_size / 2, canvas_size / 2);
        for (let row = - (canvas_size / cell_size) / 2; row <= (canvas_size / cell_size) / 2; row++) {
            for (let column = - (canvas_size / cell_size) / 2; column <= (canvas_size / cell_size) / 2; column++) {
                const value = this.coordinates_to_value(row, column);
                const is_prime: boolean = this.is_prime(value);
                new Cell(is_prime, (column * cell_size) + 2, (row * cell_size) + 2).draw(this.context);
            }
        }
        this.context.restore();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const cell_size_field = document.getElementById("cell-size") as HTMLInputElement;
    cell_size_field.value = "1";
    new Application();
});

let handle_controls = () => {
    new Application();
}