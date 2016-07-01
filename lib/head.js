'use strict';

const EventEmitter = require('events');
const world = require('./world');
const createSquare = require('./square');
const createTail = require('./tail');

const size = createSquare.size;
const collisionEvent = 'collision';

function createHead() {
    const instance = createSquare('yellow');

    const emitter = Object.create(EventEmitter.prototype);

    let oldCoor = instance.position().clone();

    let dirX = 1;
    let dirY = 0;

    let x = 0;
    let y = 0;

    let tail;

    instance.onCollide = (cb) => {
        emitter.on(collisionEvent, cb);
    };

    instance.addTail = () => {
        if (!tail) {
            tail = createTail(instance);
            tail.appendTo(instance.getParentEl());
            return;
        }
        tail.addTail();
    };

    instance.update = () => {
        oldCoor = instance.position().clone();

        x += (size * dirX);
        y += (size * dirY);

        if (x > world.width - size) {
            x = 0;
        }
        if (x < 0) {
            x = world.width - size;
        }
        if (y > world.height - size) {
            y = 0;
        }
        if (y < 0) {
            y = world.height - size;
        }
        instance.position(x, y);
        if (!tail) {
            return;
        }
        tail.update(oldCoor);
        if (tail.didCollide(instance.position())) {
            emitter.emit(collisionEvent);
        }
    };

    instance.intersect = (coor) => {
        if (instance.position().intersect(coor)) {
            return true;
        }
        if (!tail) {
            return false;
        }
        return tail.intersect(coor);
    }

    instance.moveDown = () => {
        if (!canMoveY()) {
            return;
        }
        dirY = 1;
        dirX = 0;
    };

    instance.moveUp = () => {
        if (!canMoveY()) {
            return;
        }
        dirY = -1;
        dirX = 0;
    };

    instance.moveLeft = () => {
        if (!canMoveX()) {
            return;
        }
        dirY = 0;
        dirX = -1;
    };

    instance.moveRight = () => {
        if (!canMoveX()) {
            return;
        }
        dirY = 0;
        dirX = 1;
    };

    function canMoveX() {
        return dirX === 0 && instance.position().y !== oldCoor.y;
    }

    function canMoveY() {
        return dirY === 0 && instance.position().x !== oldCoor.x;
    }

    return instance;
}

module.exports = createHead;
