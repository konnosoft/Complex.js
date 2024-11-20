/**
 * Reimplementation of the built-in Math object
 */
export default abstract class Math {
  /**
   * Absolute value
   *
   * $$|x| = \begin{cases}
   *    x, & \text{if } x \ge 0 \\\\
   *   -x, & \text{if } x < 0
   * \end{cases}$$
   */
  public static abs(x: number): number {
    return x < 0 ? -x : x;
  }
}

console.log(Math.abs.toString())
