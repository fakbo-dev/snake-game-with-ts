// Get references
var score = document.querySelector(".current-score");
var highScore = document.querySelector(".high");
var board = document.querySelector(".screen-container");
// Variables
// posicion inicial de la serpiente en nuestra pantalla
var snakePosition = [{
        dx: 15,
        dy: 15,
    }];
var GRIDSIZE = 30;
var food = generateRandomFood();
// functions
// la funcion draw es donde vamos a ejecutar nuestras funciones que se mostraran (dibujar) en nuestra screen
function draw() {
    drawSnake();
    drawFood();
}
// Test draw()
// crear htmlElement de manera dinamica
function createHtmlElement(tag, className) {
    var htmlElement = document.createElement(tag);
    htmlElement.classList.add(className);
    return htmlElement;
}
// setear la posicion en nuestro grid element
function setGridPosition(element, position) {
    element.style.gridRow = "".concat(position.dx + 1);
    element.style.gridColumn = "".concat(position.dy + 1);
}
// draw snake es la funcion que crea el objeto snake tenemos que tener en cuenta que mientras mas jugemos la serpiente se hara mas grande por lo que crecera y tnemos que evaluar cada uno de sus segmentos
function drawSnake() {
    snakePosition.forEach(function (segment) {
        var snakeElement = createHtmlElement("div", "snake");
        setGridPosition(snakeElement, segment);
        board === null || board === void 0 ? void 0 : board.appendChild(snakeElement);
    });
}
// Draw food funciona de la misma manera que drawSnake solo que esta vez dibuja la comida de la serpiente
function generateRandomFood() {
    var randomPosition = Math.floor(Math.random() * GRIDSIZE) + 1;
    var dx = randomPosition;
    var dy = randomPosition;
    return { dx: dx, dy: dy };
}
function drawFood() {
    var foodElement = createHtmlElement("div", "food");
    setGridPosition(foodElement, food);
    board === null || board === void 0 ? void 0 : board.appendChild(foodElement);
}
draw();
