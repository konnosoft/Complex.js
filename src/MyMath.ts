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
   * Limit of a sequence
   *
   * $$\lim_{n \to \infty} f(n)$$
   */
  public static lim(
    f: (n: number) => number,
    debug: boolean = false,
  ): number {
    let previous = f(0);

    for (let n = 1;; n++) {
      const current = f(n);

      if (debug) {
        console.log(n, current);
      }

      if (Math.abs(current - previous) < Number.EPSILON) {
        return current;
      }

      previous = current;
    }
  }
}
