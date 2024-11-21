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
   * $$\lim_{i \to \infty} f(i)$$
   */
  public static lim(
    f: (i: number) => number,
    epsilon: number = Number.EPSILON,
    maxSteps: number = Infinity,
    debug: boolean = false,
  ): number {
    let previous = f(0);

    for (let i = 1; i <= maxSteps; i++) {
      const current = f(i);

      if (debug) {
        console.log(i, current);
      }

      if (Math.abs(current - previous) < epsilon) {
        return current;
      }

      previous = current;
    }
  }
}
