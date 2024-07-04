// Get references
const score = document.querySelector(".current-score") as HTMLElement | null;
const highScore = document.querySelector(".high") as HTMLElement | null;
const board = document.querySelector(".screen-container") as HTMLElement | null;

// interfaces
interface ScreenPosition {
    dx: number;
    dy: number;
}

// Variables

// posicion inicial de la serpiente en nuestra pantalla

let snakePosition: ScreenPosition[] = [{
    dx: 15,
    dy: 15,
}]
const GRIDSIZE = 30;
let food = generateRandomFood();

// functions

// la funcion draw es donde vamos a ejecutar nuestras funciones que se mostraran (dibujar) en nuestra screen

function draw(): void {

    drawSnake();
    drawFood();
}

// Test draw()
// crear htmlElement de manera dinamica

function createHtmlElement(tag: string, className: string): HTMLElement {

    const htmlElement = document.createElement(tag);
    htmlElement.classList.add(className);
    return htmlElement;
}

// setear la posicion en nuestro grid element

function setGridPosition(element: HTMLElement, position: ScreenPosition): void {

    element.style.gridRow = `${position.dx + 1}`;
    element.style.gridColumn = `${position.dy + 1}`;
}
// draw snake es la funcion que crea el objeto snake tenemos que tener en cuenta que mientras mas jugemos la serpiente se hara mas grande por lo que crecera y tnemos que evaluar cada uno de sus segmentos

function drawSnake(): void {

    snakePosition.forEach(segment => {

        const snakeElement = createHtmlElement("div", "snake");
        setGridPosition(snakeElement, segment);
        board?.appendChild(snakeElement);
    });
}


// Draw food funciona de la misma manera que drawSnake solo que esta vez dibuja la comida de la serpiente

function generateRandomFood(): { dx: number, dy: number } {
    const randomPosition: number = Math.floor(Math.random() * GRIDSIZE) + 1;

    const dx = randomPosition;
    const dy = randomPosition;

    return { dx, dy };
}

function drawFood(): void {

    const foodElement = createHtmlElement("div", "food");
    setGridPosition(foodElement, food);
    board?.appendChild(foodElement);
}
draw();
