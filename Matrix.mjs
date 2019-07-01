const range = (from, to) =>
  Array.from(Array(to - from), (...[, i]) => i + from);

const sum = (array) => array.reduce((a, b) => a + b, 0);

export default class Matrix {
  constructor(entry, height, width) {
    const A = this;
    const isArray = Array.isArray(entry);

    if (isArray) {
      A.entry = (i, j) => entry[i][j];
      A.rows = entry;
      A.columns = { length: entry[0].length };
    } else {
      A.entry = entry;
      A.rows = { length: height };
      A.columns = { length: width };
    }

    const ToUint32 = (x) => String(x) >>> 0;

    const isArrayIndex = (p) =>
      String(ToUint32(p)) === p && ToUint32(p) !== 0xffffffff;

    return new Proxy(A, {
      get: (...[, i]) => {
        if (!isArrayIndex(i)) return A[i];

        if (isArray) return A.rows[i];

        const row = {
          get: (...[, j]) => {
            if (!isArrayIndex(j)) return row[j];

            return A.entry(+i, +j);
          },
        };

        return new Proxy(row, row);
      },
    });
  }

  add(B) {
    const A = this;

    if (
      !(
        A.rows.length === B.rows.length && A.columns.length === B.columns.length
      )
    ) {
      return;
    }

    return new Matrix(
      (i, j) => A[i][j] + B[i][j],
      A.rows.length,
      A.columns.length,
    );
  }

  sub(B) {
    const A = this;
    return A.add(B.mul(-1));
  }

  mul(B) {
    const A = this;

    if (typeof B === 'number') {
      return new Matrix((i, j) => A[i][j] * B, A.rows.length, A.columns.length);
    }

    if (!(A.columns.length === B.rows.length)) return;

    return new Matrix(
      (i, j) => sum(range(0, A.columns.length).map((k) => A[i][k] * B[k][j])),
      A.rows.length,
      B.columns.length,
    );
  }

  div(B) {
    const A = this;

    if (typeof B === 'number') {
      return A.mul(1 / B);
    }

    return A.mul(B.inverse());
  }

  pow(n) {
    const A = this;
    if (n === 0) return Matrix.I(A.rows.length);
    return A.mul(A.pow(n - 1));
  }

  trace() {
    const A = this;
    return sum(range(0, A.rows.length).map((i) => A[i][i]));
  }

  transpose() {
    const A = this;
    return new Matrix((i, j) => A[j][i], A.columns.length, A.rows.length);
  }

  inverse() {
    const A = this;
    return A.adjugate().div(A.determinant());
  }

  adjugate() {
    const A = this;
    return A.cofactor().transpose();
  }

  determinant() {
    const A = this;

    if (A.rows.length === 0) return 1;

    return sum(
      range(0, A.columns.length).map((j) => A[0][j] * A.cofactor(0, j)),
    );
  }

  cofactor(i, j) {
    const A = this;

    if (!arguments.length) {
      return new Matrix(
        (i, j) => A.cofactor(i, j),
        A.rows.length,
        A.columns.length,
      );
    }

    return (-1) ** (i + j) * A.minor(i, j);
  }

  minor(i, j) {
    const A = this;
    return A.submatrix(i, j).determinant();
  }

  submatrix(row, column) {
    const A = this;

    return new Matrix(
      (i, j) => A[i < row ? i : i + 1][j < column ? j : j + 1],
      A.rows.length - 1,
      A.columns.length - 1,
    );
  }

  eigenvalues() {
    const A = this;
    const trA = A.trace();

    switch (A.rows.length) {
      case 2: {
        const detA = A.determinant();
        const gap = Math.sqrt(trA * trA - 4 * detA);
        return [(trA + gap) / 2, (trA - gap) / 2];
      }
      case 3: {
        const q = trA / 3;
        const A_qI = A.sub(Matrix.I(3).mul(q));
        const p = Math.sqrt(A_qI.pow(2).trace() / 6);

        const B = A_qI.div(p);
        const detB = B.determinant();

        return range(0, 3)
          .map(
            (k) =>
              2 *
              Math.cos((1 / 3) * Math.acos(detB / 2) + (2 * k * Math.PI) / 3),
          )
          .map((beta) => p * beta + q);
      }
    }
  }

  equals(B) {
    const A = this;
    return String(A) === String(B);
  }

  toArray() {
    const A = this;

    if (0 in A.rows) return A.rows;

    return range(0, A.rows.length).map((i) =>
      range(0, A.columns.length).map((j) => A[i][j]),
    );
  }

  toString() {
    const A = this;
    return JSON.stringify(A.toArray());
  }

  static O(n) {
    return new Matrix(() => 0, n, n);
  }

  static I(n) {
    return new Matrix((i, j) => +(i === j), n, n);
  }
}
