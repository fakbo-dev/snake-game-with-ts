var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
// Get references
var score = document.querySelector(".current-score");
var highScore = document.querySelector(".high");
var board = document.querySelector(".screen-container");
// event listener
document.addEventListener("keydown", keyHandler);
// Variables
// posicion inicial de la serpiente en nuestra pantalla
var snakePosition = [{
        dx: 15,
        dy: 15,
    }];
var GRIDSIZE = 30;
var gameStarted = false;
var food = generateRandomFood();
var position = "right";
var gameSpeed = 200;
var gameInterval;
var highScorePoint = 0;
// functions
// la funcion draw es donde vamos a ejecutar nuestras funciones que se mostraran (dibujar) en nuestra screen
function draw() {
    if (board) {
        board.innerHTML = "";
        drawSnake();
        drawFood();
        updateScore();
    }
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
    if (gameStarted) {
        snakePosition.forEach(function (segment) {
            var snakeElement = createHtmlElement("div", "snake");
            setGridPosition(snakeElement, segment);
            board === null || board === void 0 ? void 0 : board.appendChild(snakeElement);
        });
    }
}
//  genera la comida en una posicion aleatoria en el grid layout
function generateRandomFood() {
    var randomPosition = Math.floor(Math.random() * GRIDSIZE) + 1;
    var dx = randomPosition;
    var dy = randomPosition;
    return { dx: dx, dy: dy };
}
// Draw food funciona de la misma manera que drawSnake solo que esta vez dibuja la comida de la serpiente
function drawFood() {
    if (gameStarted) {
        var foodElement = createHtmlElement("div", "food");
        setGridPosition(foodElement, food);
        board === null || board === void 0 ? void 0 : board.appendChild(foodElement);
    }
}
// para mover la snake necesitamos utilizar mover su cabeza y que sus segmentos lo persigan
function moveTheSnake() {
    var head = __assign({}, snakePosition[0]);
    switch (position) {
        case "up":
            head.dx--;
            break;
        case "down":
            head.dx++;
            break;
        case "right":
            head.dy++;
            break;
        case "left":
            head.dy--;
            break;
    }
    snakePosition.unshift(head);
    //check is in the same spot with the food
    if (head.dx === food.dx && head.dy === food.dy) {
        food = generateRandomFood();
        increaseSpeed();
        clearInterval(gameInterval);
        gameInterval = setInterval(function () {
            moveTheSnake();
            checkCollision();
            draw();
        }, gameSpeed);
    }
    else {
        snakePosition.pop();
    }
}
function startGame() {
    gameStarted = true;
    gameInterval = setInterval(function () {
        moveTheSnake();
        draw();
        checkCollision();
    }, gameSpeed);
}
function keyHandler(event) {
    if (!gameStarted && (event.code === "KeyA" ||
        event.code === "KeyS" ||
        event.code === "KeyD" ||
        event.code === "KeyW" ||
        event.code === "Space" ||
        event.key === " ")) {
        startGame();
    }
    else {
        switch (event.key) {
            case "a":
                if (position !== "right") {
                    position = "left";
                }
                break;
            case "d":
                if (position !== "left") {
                    position = "right";
                }
                break;
            case "s":
                if (position !== "up") {
                    position = "down";
                }
                break;
            case "w":
                if (position !== "down") {
                    position = "up";
                }
                break;
        }
    }
}
function increaseSpeed() {
    if (gameSpeed > 150) {
        gameSpeed -= 10;
    }
    else if (gameSpeed > 100) {
        gameSpeed -= 5;
    }
    else if (gameSpeed > 50) {
        gameSpeed -= 3;
    }
    else if (gameSpeed > 25) {
        gameSpeed -= 2;
    }
}
function checkCollision() {
    var head = __assign({}, snakePosition[0]);
    if (head.dx < 0 ||
        head.dx > GRIDSIZE ||
        head.dy < 0 ||
        head.dy > GRIDSIZE) {
        resetGame();
        return;
    }
    else {
        for (var i = 1; i < snakePosition.length; i++) {
            var index = snakePosition[i];
            if (head.dx === index.dx && head.dy === index.dy) {
                resetGame();
                return;
            }
        }
    }
}
function resetGame() {
    updateHighScore();
    stopGame();
    snakePosition = [{ dx: 10, dy: 10 }];
    food = generateRandomFood();
    position = "right";
    gameSpeed = 200;
    updateScore();
}
function updateScore() {
    var currentScore = snakePosition.length - 1;
    if (score) {
        score.textContent = currentScore.toString().padStart(3, "0");
    }
}
function stopGame() {
    clearInterval(gameInterval);
    gameStarted = false;
}
function updateHighScore() {
    var currentScore = snakePosition.length - 1;
    if (currentScore > highScorePoint) {
        highScorePoint = currentScore;
        if (highScore) {
            highScore.textContent = highScorePoint.toString().padStart(3, "0");
        }
    }
}
