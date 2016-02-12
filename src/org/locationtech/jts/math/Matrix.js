import IllegalArgumentException from '../../../../java/lang/IllegalArgumentException';
export default class Matrix {
	get interfaces_() {
		return [];
	}
	static solve(a, b) {
		var n = b.length;
		if (a.length !== n || a[0].length !== n) throw new IllegalArgumentException("Matrix A is incorrectly sized");
		for (var i = 0; i < n; i++) {
			var maxElementRow = i;
			for (var j = i + 1; j < n; j++) if (Math.abs(a[j][i]) > Math.abs(a[maxElementRow][i])) maxElementRow = j;
			if (a[maxElementRow][i] === 0.0) return null;
			Matrix.swapRows(a, i, maxElementRow);
			Matrix.swapRows(b, i, maxElementRow);
			for (var j = i + 1; j < n; j++) {
				var rowFactor = a[j][i] / a[i][i];
				for (var k = n - 1; k >= i; k--) a[j][k] -= a[i][k] * rowFactor;
				b[j] -= b[i] * rowFactor;
			}
		}
		var solution = new Array(n);
		for (var j = n - 1; j >= 0; j--) {
			var t = 0.0;
			for (var k = j + 1; k < n; k++) t += a[j][k] * solution[k];
			solution[j] = (b[j] - t) / a[j][j];
		}
		return solution;
	}
	static swapRows(...args) {
		switch (args.length) {
			case 3:
				if (Number.isInteger(args[2]) && (args[0] instanceof Array && Number.isInteger(args[1]))) {
					return ((...args) => {
						let [m, i, j] = args;
						if (i === j) return null;
						for (var col = 0; col < m[0].length; col++) {
							var temp = m[i][col];
							m[i][col] = m[j][col];
							m[j][col] = temp;
						}
					})(...args);
				} else if (Number.isInteger(args[2]) && (args[0] instanceof Array && Number.isInteger(args[1]))) {
					return ((...args) => {
						let [m, i, j] = args;
						if (i === j) return null;
						var temp = m[i];
						m[i] = m[j];
						m[j] = temp;
					})(...args);
				}
		}
	}
	getClass() {
		return Matrix;
	}
}

