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
     * $$\lim_{i \to \infty} f(i)$$
     */
    MyMath.lim = function (f, epsilon, maxSteps, debug) {
        if (epsilon === void 0) { epsilon = Number.EPSILON; }
        if (maxSteps === void 0) { maxSteps = Infinity; }
        if (debug === void 0) { debug = false; }
        var previous = f(0);
        for (var i = 1; i <= maxSteps; i++) {
            var current = f(i);
            if (debug) {
                console.log(i, current);
            }
            if (Math.abs(current - previous) < epsilon) {
                return current;
            }
            previous = current;
        }
    };
    return MyMath;
}());
exports.default = MyMath;
