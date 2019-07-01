export default class Complex {
  constructor(a = 0, b = 0) {
    const z = this;
    z.real = a;
    z.imag = b;
  }

  abs() {
    const z = this;
    const a = z.real;
    const b = z.imag;
    return Math.sqrt(a * a + b * b);
  }

  arg() {
    const z = this;
    const a = z.real;
    const b = z.imag;
    return Math.atan2(b, a);
  }

  add(w) {
    const z = this;
    if (!(w instanceof Complex)) return z.add(new Complex(w));
    const a = z.real;
    const b = z.imag;
    const c = w.real;
    const d = w.imag;
    return new Complex(a + c, b + d);
  }

  sub(w) {
    const z = this;
    if (!(w instanceof Complex)) return z.sub(new Complex(w));
    return z.add(w.mul(-1));
  }

  mul(w) {
    const z = this;
    if (!(w instanceof Complex)) return z.mul(new Complex(w));
    const r = z.abs();
    const theta = z.arg();
    const s = w.abs();
    const phi = w.arg();
    return Complex.fromPolar(r * s, theta + phi);
  }

  div(w) {
    const z = this;
    if (!(w instanceof Complex)) return z.div(new Complex(w));
    return z.mul(w.pow(-1));
  }

  conjugate() {
    const z = this;
    const a = z.real;
    const b = z.imag;
    return new Complex(a, -b);
  }

  sqrt() {
    const z = this;
    return z.pow(1 / 2);
  }

  pow(w) {
    const z = this;
    return z
      .log()
      .mul(w)
      .exp();
  }

  exp() {
    const z = this;
    const a = z.real;
    const b = z.imag;
    return Complex.fromPolar(Math.exp(a), b);
  }

  log() {
    const z = this;
    const r = z.abs();
    const theta = z.arg();
    return new Complex(Math.log(r), theta);
  }

  sin() {
    const z = this;
    return z.sub(Math.PI / 2).cos();
  }

  cos() {
    const z = this;
    const a = z.real;
    const b = z.imag;
    return new Complex(Math.cos(a) * Math.cosh(b), -Math.sin(a) * Math.sinh(b));
  }

  tan() {
    const z = this;
    return z.sin().div(z.cos());
  }

  equals(w) {
    const z = this;
    if (!(w instanceof Complex)) return z.equals(new Complex(w));
    const a = z.real;
    const b = z.imag;
    const c = w.real;
    const d = w.imag;
    return a === c && b === d;
  }

  toString() {
    const z = this;
    const a = z.real;
    const b = z.imag;
    // prettier-ignore
    return b === -1 ? a === 0 ? '-i' : `${a}-i`
      : b === 1 ? a === 0 ? 'i' : `${a}+i`
      : b < 0 ? a === 0 ? `${b}i` : `${a}${b}i`
      : b > 0 ? a === 0 ? `${b}i` : `${a}+${b}i`
      : `${a}`;
  }

  static fromPolar(r, theta) {
    return new Complex(r * Math.cos(theta), r * Math.sin(theta));
  }

  static get I() {
    return new Complex(0, 1);
  }
}
