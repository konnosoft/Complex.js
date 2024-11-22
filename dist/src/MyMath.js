"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Reimplementation of the built-in Math object
 * @hideconstructor
 */
var MyMath = /** @class */ (function () {
    function MyMath() {
    }
    /**
     * Absolute value
     *
     * $$|x| = \begin{cases}
     *   -x, & \text{if } x < 0 \\\\
     *   x,  & \text{otherwise}
     * \end{cases}$$
     */
    MyMath.abs = function (x) {
        return x < 0 ? -x : x;
    };
    /**
     * Limit of a sequence
     *
     * $$\lim_{n \to \infty} f(n)$$
     */
    MyMath.lim = function (f, debug) {
        if (debug === void 0) { debug = false; }
        var previous = f(Math.pow(2, 0));
        if (debug) {
            console.log(0, previous);
        }
        for (var n = 1;; n++) {
            var current = f(Math.pow(2, n));
            var relative_difference = Math.abs(current - previous) / Math.abs(current);
            if (debug) {
                console.log(n, current, relative_difference);
            }
            if (relative_difference < Number.EPSILON) {
                return current;
            }
            previous = current;
        }
    };
    return MyMath;
}());
exports.default = MyMath;
