/**
 * Reimplementation of the built-in Math object
 * @hideconstructor
 */
export default abstract class MyMath {
  /**
   * Absolute value
   *
   * $$|x| = \begin{cases}
   *   -x, & \text{if } x < 0 \\\\
   *   x,  & \text{otherwise}
   * \end{cases}$$
   */
  public static abs(x: number): number {
    return x < 0 ? -x : x;
  }

  /**
   * Exponential function
   *
   * $$\exp(x) = \sum_{n = 0}^\infty \frac{x^n}{n!}$$
   */
  public static exp(x: number): number {
    return this.sum((n) => x**n / this.factorial(n), 0, Infinity);
  }

  /**
   * Factorial
   *
   * $$n! = \prod_{i = 1}^n i$$
   *
   * @group Auxiliary Methods
   */
  public static factorial(n: number): number {
    return this.product((i) => i, 1, n);
  }

  /**
   * Summation
   *
   * $$\sum_{i = a}^b f(i)$$
   *
   * @group Auxiliary Methods
   */
  public static sum(
    f: (i: number) => number,
    a: number,
    b: number,
  ): number {
    if (b === Infinity) {
      return this.lim((i) => this.sum(f, a, i));
    }

    let result = 0;
    for (let i = a; i <= b; i++) {
      result += f(i);
    }
    return result;
  }

  /**
   * Product
   *
   * $$\prod_{i = a}^b f(i)$$
   *
   * @group Auxiliary Methods
   */
  public static product(
    f: (i: number) => number,
    a: number,
    b: number,
  ): number {
    if (b === Infinity) {
      return this.lim((i) => this.product(f, a, i));
    }

    let result = 1;
    for (let i = a; i <= b; i++) {
      result *= f(i);
    }
    return result;
  }

  /**
   * Limit
   *
   * $$\lim_{i \to \infty} f(i)$$
   *
   * @group Auxiliary Methods
   */
  public static lim(f: (i: number) => number): number {
    let previous = f(2**0);

    for (let i = 1;; i++) {
      const current = f(2**i);
      const relativeDifference = (
        Math.abs(current - previous) / Math.abs(current)
      );

      if (relativeDifference < Number.EPSILON) {
        return current;
      }

      previous = current;
    }
  }
}
