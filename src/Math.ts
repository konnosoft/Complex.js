/**
 * @class Math
 */
export default abstract class Math {
  /**
   * Absolute value.
   *
   * $|x| = -x.$
   */
  public static abs(x: number): number {
    return x < 0 ? -x : x;
  }
}

console.log(Math.abs.toString())
