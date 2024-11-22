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
     * $$|x| \defeq \begin{cases}
     *   -x, & \text{if } x < 0 \\\\
     *   x,  & \text{otherwise}
     * \end{cases}$$
     */
    MyMath.abs = function (x) {
        return x < 0 ? -x : x;
    };
    /**
     * Exponential function
     *
     * $$\exp(x) \defeq \sum_{n = 0}^\infty \frac{x^n}{n!}$$
     */
    MyMath.exp = function (x) {
        var _this = this;
        return this.sum(function (n) { return Math.pow(x, n) / _this.factorial(n); }, 0, Infinity);
    };
    /**
     * Factorial
     *
     * $$n! \defeq \prod_{i = 1}^n i$$
     */
    MyMath.factorial = function (n) {
        return this.product(function (i) { return i; }, 1, n);
    };
    /**
     * Summation
     *
     * $$\sum_{i = a}^b f(i)$$
     */
    MyMath.sum = function (f, a, b) {
        var _this = this;
        if (b === Infinity) {
            return this.lim(function (i) { return _this.sum(f, a, i); });
        }
        var result = 0;
        for (var i = a; i <= b; i++) {
            result += f(i);
        }
        return result;
    };
    /**
     * Product
     *
     * $$\prod_{i = a}^b f(i)$$
     */
    MyMath.product = function (f, a, b) {
        var _this = this;
        if (b === Infinity) {
            return this.lim(function (i) { return _this.product(f, a, i); });
        }
        var result = 1;
        for (var i = a; i <= b; i++) {
            result *= f(i);
        }
        return result;
    };
    /**
     * Limit
     *
     * $$\lim_{i \to \infty} f(i)$$
     */
    MyMath.lim = function (f) {
        var previous = f(Math.pow(2, 0));
        for (var i = 1;; i++) {
            var current = f(Math.pow(2, i));
            var relativeDifference = (Math.abs(current - previous) / Math.abs(current));
            if (relativeDifference < Number.EPSILON) {
                return current;
            }
            previous = current;
        }
    };
    return MyMath;
}());
exports.default = MyMath;
