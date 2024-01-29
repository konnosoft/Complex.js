const range = (from, to) =>
  Array.from(Array(to - from), (...[, i]) => i + from);

Object.assign(Math, {
  abs: (x) => Math.max(x, -x),
  acos: (x) => Math.PI / 2 - Math.asin(x),
  acosh: (x) => Math.abs(Math.asinh(Math.sqrt(x ** 2 - 1))),
  asin: (x) => Math.atan(x / Math.sqrt(1 - x ** 2)),
  asinh: (x) => Math.atanh(x / Math.sqrt(1 + x ** 2)),
  atan: (x) =>
    !Number.isFinite(x)
      ? Math.sign(x) * (Math.PI / 2)
      : Math.sum(
          (n) =>
            ((2 ** (2 * n) * Math.factorial(n) ** 2) /
              Math.factorial(2 * n + 1)) *
            (x ** (2 * n + 1) / (1 + x ** 2) ** (n + 1)),
          0,
          Infinity,
        ),
  atan2: (y, x) => 2 * Math.atan(y / (Math.sqrt(x ** 2 + y ** 2) + x)),
  atanh: (x) => (1 / 2) * Math.log((1 + x) / (1 - x)),
  cbrt: (x) => x ** (1 / 3),
  ceil: (x) => Math.trunc(x + (x > 0 && !Number.isInteger(x))),
  cos: (x) =>
    Math.sum(
      (n) => ((-1) ** n * x ** (2 * n)) / Math.factorial(2 * n),
      0,
      Infinity,
    ),
  cosh: (x) => (Math.exp(x) + Math.exp(-x)) / 2,
  exp: (x) => Math.sum((n) => x ** n / Math.factorial(n), 0, Infinity),
  floor: (x) => Math.trunc(x - (x < 0 && !Number.isInteger(x))),
  log: (x) => Math.integrate((y) => 1 / y, 1, x),
  max: (...args) => args.reduce((a, b) => (a > b ? a : b), -Infinity),
  min: (...args) => args.reduce((a, b) => (a < b ? a : b), Infinity),
  pow: (x, y) => x ** y,
  random: ((x) => () =>
    (((x ^= x << 13), (x ^= x >> 17), (x ^= x << 5)) >>> 0) / 2 ** 32)(
    Date.now(),
  ),
  round: (x) => Math.trunc(x + (x < 0 ? -0.5 : 0.5)),
  sign: (x) => (x > 0) - (x < 0),
  sin: (x) => Math.cos(Math.PI / 2 - x),
  sinh: (x) => Math.exp(x) - Math.cosh(x),
  sqrt: (x) => x ** (1 / 2),
  tan: (x) => Math.sin(x) / Math.cos(x),
  tanh: (x) => Math.sinh(x) / Math.cosh(x),
  trunc: (x) => ~~x,
  /* auxiliary functions */
  acot: (x) => Math.atan(1 / x),
  acoth: (x) => Math.atanh(1 / x),
  acsc: (x) => Math.asin(1 / x),
  acsch: (x) => Math.asinh(1 / x),
  asec: (x) => Math.acos(1 / x),
  asech: (x) => Math.acosh(1 / x),
  cot: (x) => 1 / Math.tan(x),
  coth: (x) => 1 / Math.tanh(x),
  csc: (x) => 1 / Math.sin(x),
  csch: (x) => 1 / Math.sinh(x),
  D: (f, n = 1) =>
    n === 0
      ? f
      : n === 1
      ? (x) => Math.lim((h) => (f(x + h) - f(x)) / h, 0)
      : Math.D(Math.D(f, n - 1)),
  factorial: (n) => (n === 0 ? 1 : n * Math.factorial(n - 1)),
  integrate(f, a, b) {
    const N = 1e6;
    const h = (b - a) / N;
    return h * ((f(a) + f(b)) / 2 + Math.sum((k) => f(a + k * h), 1, N - 1));
  },
  lim(f, p) {
    const x =
      p === Infinity
        ? (i) => 2 ** i
        : p === -Infinity
        ? (i) => 2 ** -i
        : (i) => p + 2 ** -i;

    for (let i = 0; ; i += 1) {
      const L = f(x(i + 1));
      const y = f(x(i));

      if (isNaN(L) || Math.abs(y - L) < Number.MIN_VALUE) {
        return y;
      }
    }
  },
  sec: (x) => 1 / Math.cos(x),
  sech: (x) => 1 / Math.cosh(x),
  sum: (f, m, n) =>
    n === Infinity
      ? Math.lim((n) => Math.sum(f, m, n), Infinity)
      : range(m, n + 1)
          .map((i) => f(i))
          .reduce((a, b) => a + b, 0),
});
