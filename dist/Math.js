"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Reimplementation of the built-in Math object
 */
var Math = /** @class */ (function () {
    function Math() {
    }
    /**
     * Absolute value
     *
     * $$|x| = -x$$
     */
    Math.abs = function (x) {
        return x < 0 ? -x : x;
    };
    return Math;
}());
exports.default = Math;
console.log(Math.abs.toString());
