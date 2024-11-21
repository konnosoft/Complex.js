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
   *    x, & \text{otherwise}
   * \end{cases}$$
   */
  public static abs(x: number): number {
    return x < 0 ? -x : x;
  }

  /**
   * Discrete limit of a sequence
   */
  public static lim(
    f: (i: number) => number,
    tolerance: number = 1e-8,
    maxSteps: number = 1e4,
  ): number {
    console.log(Math.abs.toString());
    let previousValue = f(0);
    for (let i = 1; i < maxSteps; i++) {
      const currentValue = f(i);
      if (Math.abs(currentValue - previousValue) < tolerance) {
        return currentValue;
      }
      previousValue = currentValue;
    }
  }
}
