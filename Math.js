/**
 * @namespace Math
 */

/**
 * Computes the absolute value of a number.
 */
Math.abs = function (x) {
  if (x < 0) {
    return -x;
  }

  return x;
};

/**
 * Computes the power.
 */
Math.pow = function (x, y) {
  return Math.exp(y * Math.log(x));
};

/**
 * Computes the square root of a number.
 */
Math.sqrt = function (x) {
  return Math.pow(x, 0.5);
};

/**
 * Computes the sum.
 *
 * $\sum_{i = m}^n f(i) \defeq f(m) + f(m + 1) + \cdots + f(n).$
 */
function sum(f, m, n) {
  if (n === Infinity) {
    return lim(function (n) {
      return sum(f, m, n);
    }, Infinity);
  }

  var result = 0;

  for (var i = m; i <= n; i++) {
    result += f(i);
  }

  return result;
}
