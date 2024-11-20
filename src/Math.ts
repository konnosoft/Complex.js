Math.abs = (x: number): number => {
  return x < 0 ? -x : x;
};

console.log(Math.abs(-3))
