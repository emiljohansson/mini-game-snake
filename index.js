'use strict';

const createFood = require('./lib/food');
const createHead = require('./lib/head');

const head = createHead();
const food = createFood(head);

food.onEaten(() => {
    head.addTail();
});
food.appendTo(document.getElementById('food'));
head.appendTo(document.getElementById('snake'));
head.addTail();
head.addTail();
head.addTail();
head.addTail();
head.onCollide(() => {
    gameOver = true;
});

document.addEventListener('click', function() {
    paused = !paused;
});

document.addEventListener('keyup', function(event) {
    if (paused) {
        return;
    }
    switch (event.key) {
        case "ArrowDown":
            head.moveDown();
            break;
        case "ArrowUp":
            head.moveUp();
            break;
        case "ArrowLeft":
            head.moveLeft();
            break;
        case "ArrowRight":
            head.moveRight();
            break;
    }
});

let gameOver = false;
let paused = false;
let frame = 0;

function render() {
    frame++;
    if (frame > 4) {
        frame = 0;
        head.update();
        food.update();
    }
}

window.requestAnimFrame = (function() {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function(callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

(function animloop() {
    requestAnimFrame(animloop);
    if (paused || gameOver) {
        return;
    }
    render();
})();
