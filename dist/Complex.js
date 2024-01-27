(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Complex"] = factory();
	else
		root["Complex"] = factory();
})(this, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it uses a non-standard name for the exports (exports).
(() => {
var exports = __webpack_exports__;
var __webpack_unused_export__;

/**
 * @license MIT
 *
 * Copyright (c) 2023 Yuuki Konno
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
__webpack_unused_export__ = ({ value: true });
/**
 * Represents a complex number.
 */
var Complex = /** @class */ (function () {
    /**
     * Creates a complex number in Cartesian form.
     * @param real The real part.
     * @param imag The imaginary part.
     */
    function Complex(real, imag) {
        if (real === void 0) { real = 0; }
        if (imag === void 0) { imag = 0; }
        this.real = real;
        this.imag = imag;
    }
    /**
     * Creates a complex number in polar form.
     * @param abs The absolute value.
     * @param arg The argument.
     */
    Complex.fromPolar = function (abs, arg) {
        if (abs === void 0) { abs = 0; }
        if (arg === void 0) { arg = 0; }
        return new Complex(abs * Math.cos(arg), abs * Math.sin(arg));
    };
    /**
     * Returns the absolute value.
     *
     * Cartesian:
     * $$|a + bi| = \sqrt{a^2 + b^2}.$$
     *
     * Polar:
     * $$|re^{i \theta}| = r.$$
     */
    Complex.prototype.abs = function () {
        return Math.sqrt(Math.pow(this.real, 2) + Math.pow(this.imag, 2));
    };
    /**
     * Returns the argument.
     *
     * Cartesian:
     * $$\operatorname{Arg}(a + bi) = \operatorname{atan2}(b, a).$$
     *
     * Polar:
     * $$\operatorname{Arg}(re^{i \theta}) = \theta.$$
     */
    Complex.prototype.arg = function () {
        return Math.atan2(this.imag, this.real);
    };
    /**
     * Returns the sum of this and the given complex number.
     *
     * Cartesian:
     * $$(a + bi) + (c + di) = (a + c) + (b + d)i.$$
     */
    Complex.prototype.add = function (other) {
        if (!(other instanceof Complex)) {
            return new Complex(this.real + other, this.imag);
        }
        return new Complex(this.real + other.real, this.imag + other.imag);
    };
    /**
     * Returns the difference of this and the given complex number.
     *
     * Cartesian:
     * $$(a + bi) - (c + di) = (a - c) + (b - d)i.$$
     */
    Complex.prototype.sub = function (other) {
        if (!(other instanceof Complex)) {
            return new Complex(this.real - other, this.imag);
        }
        return new Complex(this.real - other.real, this.imag - other.imag);
    };
    /**
     * Returns the product of this and the given complex number.
     *
     * Cartesian:
     * $$(a + bi)(c + di) = (ac - bd) + (ad + bc)i.$$
     *
     * Polar:
     * $$r_1 e^{i \theta_1} r_2 e^{i \theta_2} = r_1 r_2 e^{i(\theta_1 + \theta_2)}.$$
     */
    Complex.prototype.mul = function (other) {
        if (!(other instanceof Complex)) {
            return new Complex(this.real * other, this.imag * other);
        }
        return new Complex(this.real * other.real - this.imag * other.imag, this.real * other.imag + this.imag * other.real);
        // Polar:
        // return Complex.fromPolar(
        //   this.arg() * other.arg(),
        //   this.abs() + other.abs(),
        // );
    };
    /**
     * Returns the quotient of this and the given complex number.
     *
     * Cartesian:
     * $$\frac{a + bi}{c + di} = \frac{ac + bc}{c^2 + d^2} + \frac{bc - ad}{c^2 + d^2}i.$$
     *
     * Polar:
     * $$\frac{r_1 e^{i \theta_1}}{r_2 e^{i \theta_2}} = \frac{r_1}{r_2} e^{i(\theta_1 - \theta_2)}.$$
     */
    Complex.prototype.div = function (other) {
        if (!(other instanceof Complex)) {
            return new Complex(this.real / other, this.imag / other);
        }
        var denominator = Math.pow(other.real, 2) + Math.pow(other.imag, 2);
        return new Complex((this.real * other.real + this.imag * other.imag) / denominator, (this.imag * other.real - this.real * other.imag) / denominator);
        // Polar:
        // return Complex.fromPolar(
        //   this.arg() / other.arg(),
        //   this.abs() - other.abs(),
        // );
    };
    /**
     * Returns whether this and the given complex number are equal.
     *
     * Cartesian:
     * $$a + bi = c + di \iff a = c \text{ and } b = d.$$
     */
    Complex.prototype.equals = function (other) {
        if (!(other instanceof Complex)) {
            return this.real === other && this.imag === 0;
        }
        return this.real === other.real && this.imag === other.imag;
    };
    /**
     * Returns the complex conjugate.
     *
     * Cartesian:
     * $$\overline{a + bi} = a - bi.$$
     */
    Complex.prototype.conj = function () {
        return new Complex(this.real, -this.imag);
    };
    /**
     * Returns the square root.
     *
     * Polar:
     * $$\sqrt{re^{i \theta}} = \sqrt{r} e^{i \theta/2}.$$
     */
    Complex.prototype.sqrt = function () {
        return Complex.fromPolar(Math.sqrt(this.abs()), this.arg() / 2);
    };
    /**
     * Returns the exponential.
     *
     * Cartesian:
     * $$e^{a + bi} = e^a e^{bi}.$$
     */
    Complex.prototype.exp = function () {
        return Complex.fromPolar(Math.exp(this.real), this.imag);
    };
    /**
     * Returns the logarithm.
     *
     * Polar:
     * $$\operatorname{Log}(re^{i \theta}) = \ln r + i \theta.$$
     */
    Complex.prototype.log = function () {
        return new Complex(Math.log(this.abs()), this.arg());
    };
    /**
     * Returns the power of this and the given complex number.
     *
     * General:
     * $$z^w = e^{w \operatorname{Log} z}.$$
     */
    Complex.prototype.pow = function (other) {
        return this.log().mul(other).exp();
    };
    /**
     * Returns the sine.
     *
     * Cartesian:
     * $$\sin(a + bi) = \sin a \cosh b + i \cos a \sinh b.$$
     */
    Complex.prototype.sin = function () {
        return new Complex(Math.sin(this.real) * Math.cosh(this.imag), Math.cos(this.real) * Math.sinh(this.imag));
    };
    /**
     * Returns the cosine.
     *
     * Cartesian:
     * $$\cos(a + bi) = \cos a \cosh b - i \sin a \sinh b.$$
     */
    Complex.prototype.cos = function () {
        return new Complex(Math.cos(this.real) * Math.cosh(this.imag), -Math.sin(this.real) * Math.sinh(this.imag));
    };
    /**
     * Returns the tangent.
     *
     * Cartesian:
     * $$\tan(a + bi) = \frac{\sin 2a}{\cos 2a + \cosh 2b} + i \frac{\sinh 2b}{\cos 2a + \cosh 2b}.$$
     */
    Complex.prototype.tan = function () {
        var twoA = 2 * this.real;
        var twoB = 2 * this.imag;
        var denominator = Math.cos(twoA) + Math.cosh(twoB);
        return new Complex(Math.sin(twoA) / denominator, Math.sinh(twoB) / denominator);
    };
    /**
     * Returns the arcsine.
     *
     * General:
     * $$\arcsin z = -i \operatorname{Log} \left( \sqrt{1 - z^2} + iz \right).$$
     */
    Complex.prototype.asin = function () {
        var negI = Complex.I.conj();
        var sqrt1z = Complex.ONE.sub(this.mul(this)).sqrt();
        return negI.mul(sqrt1z.add(Complex.I.mul(this)).log());
    };
    /**
     * Returns the arccosine.
     *
     * General:
     * $$\arccos z = -i \operatorname{Log} \left( i \sqrt{1 - z^2} + z \right).$$
     */
    Complex.prototype.acos = function () {
        var negI = Complex.I.conj();
        var sqrt1z = Complex.ONE.sub(this.mul(this)).sqrt();
        return negI.mul(Complex.I.mul(sqrt1z).add(this).log());
    };
    /**
     * Returns the arctangent.
     *
     * General:
     * $$\arctan z = -\frac{i}{2} \operatorname{Log} \frac{i - z}{i + z}.$$
     */
    Complex.prototype.atan = function () {
        var negI = Complex.I.conj();
        var iMinusZ = Complex.I.sub(this);
        var iPlusZ = Complex.I.add(this);
        return negI.div(2).mul(iMinusZ.div(iPlusZ).log());
    };
    /**
     * Returns a string representation in Cartesian form.
     */
    Complex.prototype.toString = function () {
        // Real.
        if (this.imag === 0) {
            return String(this.real);
        }
        var imaginary;
        if (this.imag === 1) {
            imaginary = 'i';
        }
        else if (this.imag === -1) {
            imaginary = '-i';
        }
        else {
            imaginary = "".concat(this.imag, "i");
        }
        // Purely imaginary.
        if (this.real === 0) {
            return imaginary;
        }
        // Both the real and imaginary parts are nonzero.
        return "".concat(this.real).concat(this.imag > 0 ? '+' : '').concat(imaginary);
    };
    /**
     * The imaginary unit.
     */
    Complex.I = new Complex(0, 1);
    /**
     * The complex number zero.
     */
    Complex.ZERO = new Complex(0, 0);
    /**
     * The complex number one.
     */
    Complex.ONE = new Complex(1, 0);
    return Complex;
}());
exports["default"] = Complex;

})();

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});