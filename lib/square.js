'use strict';

const createPoint = require('./point');

exports = module.exports = createSquare;

exports.size = 25;

function createSquare(color) {
    const instance = {};

    const el = document.createElement('img');
    el.src = color + '.jpg';
    el.width = exports.size;
    el.height = exports.size;

    const coor = createPoint(0, 0);

    instance.position = (x, y) => {
        if (x === undefined) {
            return coor;
        }
        coor.x = x;
        coor.y = y;
        el.style.left = coor.x + 'px';
        el.style.top = coor.y + 'px';
    };

    instance.appendTo = (parentEl) => {
        parentEl.appendChild(el);
    };

    instance.getParentEl = () => {
        return el.parentElement;
    };

    return instance;
}
