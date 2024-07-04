// Get references
const score = document.querySelector(".current-score")
const highScore = document.querySelector(".high")
const board = document.querySelector(".screen-container")

// event listener

document.addEventListener("keydown", keyHandler)
// Variables

// posicion inicial de la serpiente en nuestra pantalla

let snakePosition = [
    {
        dx: 15,
        dy: 15
    }
]
const GRIDSIZE = 30
let gameStarted = false
let food = generateRandomFood()
let position = "right"
let gameSpeed = 200
let gameInterval
let highScorePoint = 0
// functions

// la funcion draw es donde vamos a ejecutar nuestras funciones que se mostraran (dibujar) en nuestra screen

function draw() {
    if (board) {
        board.innerHTML = ""
        drawSnake()
        drawFood()
        updateScore()
    }
}

// Test draw()
// crear htmlElement de manera dinamica

function createHtmlElement(tag, className) {
    const htmlElement = document.createElement(tag)
    htmlElement.classList.add(className)
    return htmlElement
}

// setear la posicion en nuestro grid element

function setGridPosition(element, position) {
    element.style.gridRow = `${position.dx + 1}`
    element.style.gridColumn = `${position.dy + 1}`
}
// draw snake es la funcion que crea el objeto snake tenemos que tener en cuenta que mientras mas jugemos la serpiente se hara mas grande por lo que crecera y tnemos que evaluar cada uno de sus segmentos

function drawSnake() {
    if (gameStarted) {
        snakePosition.forEach(segment => {
            const snakeElement = createHtmlElement("div", "snake")
            setGridPosition(snakeElement, segment)
            board?.appendChild(snakeElement)
        })
    }
}

//  genera la comida en una posicion aleatoria en el grid layout

function generateRandomFood() {
    const randomPosition = Math.floor(Math.random() * GRIDSIZE) + 1

    const dx = randomPosition
    const dy = randomPosition

    return { dx, dy }
}
// Draw food funciona de la misma manera que drawSnake solo que esta vez dibuja la comida de la serpiente

function drawFood() {
    if (gameStarted) {
        const foodElement = createHtmlElement("div", "food")
        setGridPosition(foodElement, food)
        board?.appendChild(foodElement)
    }
}

// para mover la snake necesitamos utilizar mover su cabeza y que sus segmentos lo persigan

function moveTheSnake() {
    const head = { ...snakePosition[0] }
    switch (position) {
        case "up":
            head.dx--
            break
        case "down":
            head.dx++
            break
        case "right":
            head.dy++
            break
        case "left":
            head.dy--
            break
    }

    snakePosition.unshift(head)

    //check is in the same spot with the food

    if (head.dx === food.dx && head.dy === food.dy) {
        food = generateRandomFood()
        increaseSpeed()
        clearInterval(gameInterval)
        gameInterval = setInterval(() => {
            moveTheSnake()
            checkCollision()
            draw()
        }, gameSpeed)
    } else {
        snakePosition.pop()
    }
}

function startGame() {
    gameStarted = true
    gameInterval = setInterval(() => {
        moveTheSnake()
        draw()
        checkCollision()
    }, gameSpeed)
}

function keyHandler(event) {
    if (
        !gameStarted &&
        (event.code === "KeyA" ||
            event.code === "KeyS" ||
            event.code === "KeyD" ||
            event.code === "KeyW" ||
            event.code === "Space" ||
            event.key === " ")
    ) {
        startGame()
    } else {
        switch (event.key) {
            case "a":
                if (position !== "right") {
                    position = "left"
                }
                break
            case "d":
                if (position !== "left") {
                    position = "right"
                }
                break
            case "s":
                if (position !== "up") {
                    position = "down"
                }
                break
            case "w":
                if (position !== "down") {
                    position = "up"
                }
                break
        }
    }
}
function increaseSpeed() {
    if (gameSpeed > 150) {
        gameSpeed -= 10
    } else if (gameSpeed > 100) {
        gameSpeed -= 5
    } else if (gameSpeed > 50) {
        gameSpeed -= 3
    } else if (gameSpeed > 25) {
        gameSpeed -= 2
    }
}

function checkCollision() {
    const head = { ...snakePosition[0] }

    if (head.dx < 0 || head.dx > GRIDSIZE || head.dy < 0 || head.dy > GRIDSIZE) {
        resetGame()
        return
    } else {
        for (let i = 1; i < snakePosition.length; i++) {
            const index = snakePosition[i]

            if (head.dx === index.dx && head.dy === index.dy) {
                resetGame()
                return
            }
        }
    }
}

function resetGame() {
    updateHighScore()
    stopGame()
    snakePosition = [{ dx: 10, dy: 10 }]
    food = generateRandomFood()
    position = "right"
    gameSpeed = 200
    updateScore()
}

function updateScore() {
    const currentScore = snakePosition.length - 1
    if (score) {
        score.textContent = currentScore.toString().padStart(3, "0")
    }
}

function stopGame() {
    clearInterval(gameInterval)
    gameStarted = false
}

function updateHighScore() {
    const currentScore = snakePosition.length - 1

    if (currentScore > highScorePoint) {
        highScorePoint = currentScore
        if (highScore) {
            highScore.textContent = highScorePoint.toString().padStart(3, "0")
        }
    }
}
