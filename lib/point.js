'use strict';

function createPoint(x, y) {
    const instance = {};

    instance.clone = () => {
        return createPoint(instance.x, instance.y);
    };

    instance.intersect = (coor) => {
        return coor.x === instance.x && coor.y === instance.y
    };

    Object.defineProperty(instance, 'x', {
        get: () => {
            return x;
        },
        set: (newX) => {
            x = newX;
        }
    });

    Object.defineProperty(instance, 'y', {
        get: () => {
            return y;
        },
        set: (newY) => {
            y = newY;
        }
    });

    return instance;
}

module.exports = createPoint;
