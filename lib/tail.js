'use strict';

const createSquare = require('./square');

function createTail(parent) {
    const instance = createSquare('yellow');

    let tail;

    instance.addTail = () => {
        if (!tail) {
            tail = createTail(tail);
            tail.appendTo(instance.getParentEl());
            return;
        }
        tail.addTail();
    };

    instance.update = (coor) => {
        const oldCoor = instance.position().clone();
        instance.position(coor.x, coor.y);
        if (!tail) {
            return;
        }
        tail.update(oldCoor);
    };

    instance.didCollide = (coor) => {
        if (instance.position().intersect(coor)) {
            return true;
        }
        if (!tail) {
            return false;
        }
        return tail.didCollide(coor);
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

    instance.position(-100, -100);

    return instance;
}

module.exports = createTail;;
