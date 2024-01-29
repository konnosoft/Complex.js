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

/**
 * Represents a complex number.
 */
export default class Complex {
  /**
   * The real part.
   */
  real: number;

  /**
   * The imaginary part.
   */
  imag: number;

  /**
   * The imaginary unit.
   */
  static I: Complex = new Complex(0, 1);

  /**
   * The complex number zero.
   */
  static ZERO: Complex = new Complex(0, 0);

  /**
   * The complex number one.
   */
  static ONE: Complex = new Complex(1, 0);

  /**
   * Creates a complex number in Cartesian form.
   * @param real The real part.
   * @param imag The imaginary part.
   */
  constructor(real: number = 0, imag: number = 0) {
    this.real = real;
    this.imag = imag;
  }

  /**
   * Creates a complex number in polar form.
   * @param abs The absolute value.
   * @param arg The argument.
   */
  static fromPolar(abs: number = 0, arg: number = 0): Complex {
    return new Complex(abs * Math.cos(arg), abs * Math.sin(arg));
  }

  /**
   * Returns the absolute value.
   *
   * Cartesian:
   * $$|a + bi| = \sqrt{a^2 + b^2}.$$
   *
   * Polar:
   * $$|re^{i \theta}| = r.$$
   */
  abs(): number {
    return Math.sqrt(this.real ** 2 + this.imag ** 2);
  }

  /**
   * Returns the argument.
   *
   * Cartesian:
   * $$\operatorname{Arg}(a + bi) = \operatorname{atan2}(b, a).$$
   *
   * Polar:
   * $$\operatorname{Arg}(re^{i \theta}) = \theta.$$
   */
  arg(): number {
    return Math.atan2(this.imag, this.real);
  }

  /**
   * Returns the sum of this and the given complex number.
   *
   * Cartesian:
   * $$(a + bi) + (c + di) = (a + c) + (b + d)i.$$
   */
  add(other: Complex | number): Complex {
    if (!(other instanceof Complex)) {
      return new Complex(this.real + other, this.imag);
    }

    return new Complex(this.real + other.real, this.imag + other.imag);
  }

  /**
   * Returns the difference of this and the given complex number.
   *
   * Cartesian:
   * $$(a + bi) - (c + di) = (a - c) + (b - d)i.$$
   */
  sub(other: Complex | number): Complex {
    if (!(other instanceof Complex)) {
      return new Complex(this.real - other, this.imag);
    }

    return new Complex(this.real - other.real, this.imag - other.imag);
  }

  /**
   * Returns the product of this and the given complex number.
   *
   * Cartesian:
   * $$(a + bi)(c + di) = (ac - bd) + (ad + bc)i.$$
   *
   * Polar:
   * $$r_1 e^{i \theta_1} r_2 e^{i \theta_2} = r_1 r_2 e^{i(\theta_1 + \theta_2)}.$$
   */
  mul(other: Complex | number): Complex {
    if (!(other instanceof Complex)) {
      return new Complex(this.real * other, this.imag * other);
    }

    return new Complex(
      this.real * other.real - this.imag * other.imag,
      this.real * other.imag + this.imag * other.real,
    );

    // Polar:

    // return Complex.fromPolar(
    //   this.arg() * other.arg(),
    //   this.abs() + other.abs(),
    // );
  }

  /**
   * Returns the quotient of this and the given complex number.
   *
   * Cartesian:
   * $$\frac{a + bi}{c + di} = \frac{ac + bc}{c^2 + d^2} + \frac{bc - ad}{c^2 + d^2}i.$$
   *
   * Polar:
   * $$\frac{r_1 e^{i \theta_1}}{r_2 e^{i \theta_2}} = \frac{r_1}{r_2} e^{i(\theta_1 - \theta_2)}.$$
   */
  div(other: Complex | number): Complex {
    if (!(other instanceof Complex)) {
      return new Complex(this.real / other, this.imag / other);
    }

    const denominator: number = other.real ** 2 + other.imag ** 2;
    return new Complex(
      (this.real * other.real + this.imag * other.imag) / denominator,
      (this.imag * other.real - this.real * other.imag) / denominator,
    );

    // Polar:

    // return Complex.fromPolar(
    //   this.arg() / other.arg(),
    //   this.abs() - other.abs(),
    // );
  }

  /**
   * Returns whether this and the given complex number are equal.
   *
   * Cartesian:
   * $$a + bi = c + di \iff a = c \text{ and } b = d.$$
   */
  equals(other: Complex | number): boolean {
    if (!(other instanceof Complex)) {
      return this.real === other && this.imag === 0;
    }

    return this.real === other.real && this.imag === other.imag;
  }

  /**
   * Returns the complex conjugate.
   *
   * Cartesian:
   * $$\overline{a + bi} = a - bi.$$
   */
  conj(): Complex {
    return new Complex(this.real, -this.imag);
  }

  /**
   * Returns the square root.
   *
   * Polar:
   * $$\sqrt{re^{i \theta}} = \sqrt{r} e^{i \theta/2}.$$
   */
  sqrt(): Complex {
    return Complex.fromPolar(Math.sqrt(this.abs()), this.arg() / 2);
  }

  /**
   * Returns the exponential.
   *
   * Cartesian:
   * $$e^{a + bi} = e^a e^{bi}.$$
   */
  exp(): Complex {
    return Complex.fromPolar(Math.exp(this.real), this.imag);
  }

  /**
   * Returns the logarithm.
   *
   * Polar:
   * $$\operatorname{Log}(re^{i \theta}) = \ln r + i \theta.$$
   */
  log(): Complex {
    return new Complex(Math.log(this.abs()), this.arg());
  }

  /**
   * Returns the power of this and the given complex number.
   *
   * General:
   * $$z^w = e^{w \operatorname{Log} z}.$$
   */
  pow(other: Complex | number): Complex {
    return this.log().mul(other).exp();
  }

  /**
   * Returns the sine.
   *
   * Cartesian:
   * $$\sin(a + bi) = \sin a \cosh b + i \cos a \sinh b.$$
   */
  sin(): Complex {
    return new Complex(
      Math.sin(this.real) * Math.cosh(this.imag),
      Math.cos(this.real) * Math.sinh(this.imag),
    );
  }

  /**
   * Returns the cosine.
   *
   * Cartesian:
   * $$\cos(a + bi) = \cos a \cosh b - i \sin a \sinh b.$$
   */
  cos(): Complex {
    return new Complex(
      Math.cos(this.real) * Math.cosh(this.imag),
      -Math.sin(this.real) * Math.sinh(this.imag),
    );
  }

  /**
   * Returns the tangent.
   *
   * Cartesian:
   * $$\tan(a + bi) = \frac{\sin 2a}{\cos 2a + \cosh 2b} + i \frac{\sinh 2b}{\cos 2a + \cosh 2b}.$$
   */
  tan(): Complex {
    const twoA: number = 2 * this.real;
    const twoB: number = 2 * this.imag;
    const denominator: number = Math.cos(twoA) + Math.cosh(twoB);
    return new Complex(
      Math.sin(twoA) / denominator,
      Math.sinh(twoB) / denominator,
    );
  }

  /**
   * Returns the arcsine.
   *
   * General:
   * $$\arcsin z = -i \operatorname{Log} \left( \sqrt{1 - z^2} + iz \right).$$
   */
  asin(): Complex {
    const negI: Complex = Complex.I.conj();
    const sqrt1z: Complex = Complex.ONE.sub(this.mul(this)).sqrt();
    return negI.mul(sqrt1z.add(Complex.I.mul(this)).log());
  }

  /**
   * Returns the arccosine.
   *
   * General:
   * $$\arccos z = -i \operatorname{Log} \left( i \sqrt{1 - z^2} + z \right).$$
   */
  acos(): Complex {
    const negI: Complex = Complex.I.conj();
    const sqrt1z: Complex = Complex.ONE.sub(this.mul(this)).sqrt();
    return negI.mul(Complex.I.mul(sqrt1z).add(this).log());
  }

  /**
   * Returns the arctangent.
   *
   * General:
   * $$\arctan z = -\frac{i}{2} \operatorname{Log} \frac{i - z}{i + z}.$$
   */
  atan(): Complex {
    const negI: Complex = Complex.I.conj();
    const iMinusZ: Complex = Complex.I.sub(this);
    const iPlusZ: Complex = Complex.I.add(this);
    return negI.div(2).mul(iMinusZ.div(iPlusZ).log());
  }

  /**
   * Returns a string representation in Cartesian form.
   */
  toString(): string {
    // Real.
    if (this.imag === 0) {
      return String(this.real);
    }

    let imaginary: string;
    if (this.imag === 1) {
      imaginary = 'i';
    } else if (this.imag === -1) {
      imaginary = '-i';
    } else {
      imaginary = `${this.imag}i`;
    }

    // Purely imaginary.
    if (this.real === 0) {
      return imaginary;
    }

    // Both the real and imaginary parts are nonzero.
    return `${this.real}${this.imag > 0 ? '+' : ''}${imaginary}`;
  }
}
