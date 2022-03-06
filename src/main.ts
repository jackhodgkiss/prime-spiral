// 1. Construct grid that spirals out from the center of the canvas.

// 2. Allow for `cells` to displayed within the canvas.

// 3. Alter the visual appearance of `cells` if they meet certain criteria (prime, mersenne prime)

let application: Application;

class Cell {
    is_prime: boolean;
    abscissa: number;
    ordinate: number;
    size: number;
    constructor(is_prime: boolean, abscissa: number, ordinate: number, size: number) {
        this.is_prime = is_prime;
        this.abscissa = abscissa;
        this.ordinate = ordinate;
        this.size = size;
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
    canvas_size: number = 600;
    cell_size: number;
    row_offset: number;
    column_offset: number;
    constructor(row_offset: number = 0, column_offset: number = 0, cell_size: number = 1) {
        this.canvas = document.getElementById("application-canvas") as HTMLCanvasElement;
        this.context = this.canvas.getContext("2d") as CanvasRenderingContext2D;
        this.canvas.setAttribute("style", "background-color: black");
        this.cell_size = cell_size;
        this.row_offset = row_offset;
        this.column_offset = column_offset;
        this.draw();
        this.register_event_listeners();
    }

    static coordinates_to_value(row: number, column: number): number {
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

    register_event_listeners() {
        this.canvas.addEventListener("click", this.on_click);
    }

    on_click(event: MouseEvent): void {
        const cell_size_field = document.getElementById("cell-size") as HTMLInputElement;
        const row_field = document.getElementById("row") as HTMLInputElement;
        const column_field = document.getElementById("column") as HTMLInputElement;
        const cell_size: number= parseInt(cell_size_field.value);
        const row_offset: number = parseInt(row_field.value);
        const column_offset: number = parseInt(column_field.value);
        const half_canvas_cell: number = Math.floor((600 / cell_size) / 2);
        const selected_row = (Math.floor(event.offsetY / cell_size) - half_canvas_cell) + row_offset;
        const selected_row_span = document.getElementById("selected-row") as HTMLSpanElement;
        selected_row_span.textContent = `Selected Row: ${selected_row}`;
        const selected_column = (Math.floor(event.offsetX / cell_size) - half_canvas_cell) + column_offset;
        const selected_column_span = document.getElementById("selected-column") as HTMLSpanElement;
        selected_column_span.textContent = `Selected Column: ${selected_column}`;
        const selected_value = Application.coordinates_to_value(selected_row, selected_column)
        const selected_value_span = document.getElementById("selected-value") as HTMLSpanElement;
        selected_value_span.textContent = `Selected Value: ${selected_value}`
        const is_prime_span = document.getElementById("is-prime") as HTMLSpanElement;
        is_prime_span.textContent = Application.is_prime(selected_value) ? "Is Prime: True" : "Is Prime: False";
    }

    unregister_event_listeners() {
        this.canvas.removeEventListener("click", this.on_click);
    }

    static is_prime(value: number): boolean {
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
        const half_canvas_cell: number = Math.floor((this.canvas_size / this.cell_size) / 2);
        this.context.clearRect(0, 0, this.canvas_size, this.canvas_size);
        this.context.save();
        this.context.translate(this.canvas_size / 2, this.canvas_size / 2);
        for (let row = this.row_offset + (half_canvas_cell * -1); row <= this.row_offset + half_canvas_cell; row++) {
            for (let column = this.column_offset + (half_canvas_cell * - 1); column <= this.column_offset + half_canvas_cell; column++) {
                const value = Application.coordinates_to_value(row, column);
                const is_prime: boolean = Application.is_prime(value);
                new Cell(is_prime, (column - this.column_offset) * this.cell_size, (row - this.row_offset) * this.cell_size, this.cell_size).draw(this.context);
            }
        }
        this.context.restore();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const cell_size_field = document.getElementById("cell-size") as HTMLInputElement;
    cell_size_field.value = "1";
    const row_field = document.getElementById("row") as HTMLInputElement;
    row_field.value = "0";
    const column_field = document.getElementById("column") as HTMLInputElement;
    column_field.value = "0";
    application = new Application();
});

let handle_controls = () => {
    const cell_size_field = document.getElementById("cell-size") as HTMLInputElement;
    const row_field = document.getElementById("row") as HTMLInputElement;
    const column_field = document.getElementById("column") as HTMLInputElement;
    application.unregister_event_listeners();
    application = new Application(parseInt(row_field.value), parseInt(column_field.value), parseInt(cell_size_field.value));
}