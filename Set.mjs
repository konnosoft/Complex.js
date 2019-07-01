export default class Set {
  constructor(args) {
    const A = this;
    Object.assign(A, ...(args || []).map((x) => ({ [x]: x })));
  }

  equals(B) {
    const A = this;
    return A.every((x) => x in B) && B.every((x) => x in A);
  }

  filter(f) {
    const A = this;

    return A.map((x) => {
      if (f(x)) {
        return x;
      }
    });
  }

  union(...args) {
    const F = this;

    if (args.length) {
      return new Set([F, ...args]).union();
    }

    const A = new Set();

    F.forEach((Y) => {
      Y.forEach((x) => {
        A.add(x);
      });
    });

    return A;
  }

  map(f) {
    const A = this;
    const B = new Set();

    A.forEach((x) => {
      const y = f(x);

      if (y !== undefined) {
        B.add(y);
      }
    });

    return B;
  }

  powerset() {
    const S = this;

    if (S.equals(new Set())) {
      return new Set([new Set()]);
    }

    const F = (e, T) => T.map((X) => X.union(new Set([e])));
    const e = S.pick();
    const T = S.difference(new Set([e]));
    const PT = T.powerset();
    return PT.union(F(e, PT));
  }

  difference(A) {
    const B = this;
    return B.filter((x) => !(x in A));
  }

  intersection(...args) {
    const F = this;

    if (args.length) {
      return new Set([F, ...args]).intersection();
    }

    if (F.equals(new Set())) return;

    const B = F.pick();
    return B.filter((x) => F.every((Y) => x in Y));
  }

  product(B) {
    const A = this;
    return A.map((x) => B.map((y) => Set.pair(x, y)));
  }

  every(f) {
    const A = this;

    for (const x of A) {
      if (!f(x)) {
        return false;
      }
    }

    return true;
  }

  some(f) {
    const A = this;
    return !A.every((x) => !f(x));
  }

  pick() {
    const A = this;

    for (const x of A) {
      return x;
    }
  }

  toString() {
    const A = this;
    return `{${[...A]}}`;
  }

  static pair(x, y) {
    return new Set([new Set([x]), new Set([x, y])]);
  }

  static N(n) {
    if (n === 0) {
      return new Set();
    }

    return Set.N(n - 1).union(new Set([Set.N(n - 1)]));
  }

  /* ES6 Set polyfill */

  get size() {
    const A = this;
    return [...A].length;
  }

  static get [Symbol.species]() {
    return Set;
  }

  add(x) {
    const A = this;
    A[x] = x;
    return A;
  }

  clear() {
    const A = this;

    A.forEach((x) => {
      A.delete(x);
    });
  }

  delete(x) {
    const A = this;
    const has = A.has(x);
    delete A[x];
    return has;
  }

  *entries() {
    const A = this;

    for (const x of A) {
      yield [x, x];
    }
  }

  forEach(f, ...args) {
    const A = this;

    for (const x of A) {
      f.call(args[0], x, x, A);
    }
  }

  has(x) {
    const A = this;
    return Object.prototype.hasOwnProperty.call(A, x);
  }

  *[Symbol.iterator]() {
    const A = this;

    for (const x of Object.values(A)) {
      yield x;
    }
  }
}

Object.defineProperties(Set.prototype, {
  keys: {
    value: Set.prototype[Symbol.iterator],
  },
  values: {
    value: Set.prototype[Symbol.iterator],
  },
});
