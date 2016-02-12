import GeometryCollection from '../GeometryCollection';
export default class ShortCircuitedGeometryVisitor {
	constructor(...args) {
		this._isDone = false;
		if (args.length === 0) {
			let [] = args;
		}
	}
	get interfaces_() {
		return [];
	}
	applyTo(geom) {
		for (var i = 0; i < geom.getNumGeometries() && !this._isDone; i++) {
			var element = geom.getGeometryN(i);
			if (!(element instanceof GeometryCollection)) {
				this.visit(element);
				if (this.isDone()) {
					this._isDone = true;
					return null;
				}
			} else this.applyTo(element);
		}
	}
	getClass() {
		return ShortCircuitedGeometryVisitor;
	}
}

