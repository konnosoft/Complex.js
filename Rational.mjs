const gcd = (a, b) => (b === 0 ? Math.abs(a) : gcd(b, a % b));

export default class Rational {
  constructor(a = 0, b = 1) {
    if (b < 0) return new Rational(-a, -b);
    const g = gcd(a, b);
    this.numerator = a / g;
    this.denominator = b / g;
  }

  add(that) {
    if (!(that instanceof Rational)) return this.add(new Rational(that));
    const a = this.numerator;
    const b = this.denominator;
    const c = that.numerator;
    const d = that.denominator;
    return new Rational(a * d - b * c, b * d);
  }

  sub(that) {
    if (!(that instanceof Rational)) return this.sub(new Rational(that));
    return this.add(that.mul(-1));
  }

  mul(that) {
    if (!(that instanceof Rational)) return this.mul(new Rational(that));
    const a = this.numerator;
    const b = this.denominator;
    const c = that.numerator;
    const d = that.denominator;
    return new Rational(a * c, b * d);
  }

  div(that) {
    if (!(that instanceof Rational)) return this.div(new Rational(that));
    return this.mul(that.pow(-1));
  }

  sqrt() {
    return this.pow(1 / 2);
  }

  pow(that) {
    const a = this.numerator;
    const b = this.denominator;
    return new Rational(a ** that, b ** that);
  }

  equals(that) {
    if (!(that instanceof Rational)) return this.equals(new Rational(that));
    const a = this.numerator;
    const b = this.denominator;
    const c = that.numerator;
    const d = that.denominator;
    return a * d === b * c;
  }

  valueOf() {
    const a = this.numerator;
    const b = this.denominator;
    return a / b;
  }

  toString() {
    const a = this.numerator;
    const b = this.denominator;
    return b === 1 ? `${a}` : `${a}/${b}`;
  }
}
