'use strict';

const EventEmitter = require('events');
const createPoint = require('./point');
const createSquare = require('./square');
const world = require('./world');

const eatenEvent = 'eaten';

function random(max) {
    let n = Math.floor(Math.random() * max);
    n = Math.round(n / createSquare.size) * createSquare.size;
    if (n >= max) {
        n -= createSquare.size;
    }
    return n;
}

function createFood(head) {
    const instance = createSquare('red');

    const emitter = Object.create(EventEmitter.prototype);

    instance.onEaten = (cb) => {
        emitter.on(eatenEvent, cb);
    };

    instance.update = () => {
        const coor = instance.position();
        if (head.position().x !== coor.x) {
            return;
        }
        if (head.position().y !== coor.y) {
            return;
        }
        gotEaten();
    };

    function gotEaten() {
        emitter.emit(eatenEvent);
        newPosition();
    }

    function newPosition() {
        let x = random(world.width);
        let y = random(world.height);
        const coor = createPoint(x, y);
        if (head.intersect(coor)) {
            newPosition();
            return;
        }
        instance.position(x, y);
    }

    newPosition();

    return instance;
}

module.exports = createFood;
