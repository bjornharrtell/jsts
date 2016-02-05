import IllegalArgumentException from '../../../../java/lang/IllegalArgumentException';
export default class DouglasPeuckerSimplifier {
	constructor(...args) {
		(() => {
			this.inputGeom = null;
			this.distanceTolerance = null;
			this.isEnsureValidTopology = true;
		})();
		const overloads = (...args) => {
			switch (args.length) {
				case 1:
					return ((...args) => {
						let [inputGeom] = args;
						this.inputGeom = inputGeom;
					})(...args);
			}
		};
		return overloads.apply(this, args);
	}
	get interfaces_() {
		return [];
	}
	static simplify(geom, distanceTolerance) {
		var tss = new DouglasPeuckerSimplifier(geom);
		tss.setDistanceTolerance(distanceTolerance);
		return tss.getResultGeometry();
	}
	setEnsureValid(isEnsureValidTopology) {
		this.isEnsureValidTopology = isEnsureValidTopology;
	}
	getResultGeometry() {
		if (this.inputGeom.isEmpty()) return this.inputGeom.copy();
		return new DPTransformer(this.isEnsureValidTopology).transform(this.inputGeom);
	}
	setDistanceTolerance(distanceTolerance) {
		if (distanceTolerance < 0.0) throw new IllegalArgumentException("Tolerance must be non-negative");
		this.distanceTolerance = distanceTolerance;
	}
	getClass() {
		return DouglasPeuckerSimplifier;
	}
}

