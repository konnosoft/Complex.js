/**
 * @file Math.js
 */

/**
 * Absolute value of x
 * 
 * $|x| = \begin{cases}
 *   x,  & \text{if } x \ge 0 \\
 *   -x, & \text{if } x < 0
 * \end{cases}$
 */
Math.abs = function (x) {
  return x < 0 ? -x : x;
};


Math.exp = function (x) {
  return sum(function (n) {
    return Math.pow(x, n) / factorial(n);
  }, 0, Infinity);
};


function factorial(n) {
  return product(function (i) {
    return i;
  }, 1, n);
}


function sum(f, a, b) {
  var result = 0;
  for (var i = a; i <= b; i++) {
    result += f(i);
  }
  return result;
}

function product(f, a, b) {
  var result = 1;
  for (var i = a; i <= b; i++) {
    result *= f(i);
  }
  return result;
}


function lim() {

}


console.log(Math.exp(1));
