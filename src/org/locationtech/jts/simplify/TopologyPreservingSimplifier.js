import LineString from '../geom/LineString';
import HashMap from '../../../../java/util/HashMap';
import TaggedLinesSimplifier from './TaggedLinesSimplifier';
import IllegalArgumentException from '../../../../java/lang/IllegalArgumentException';
import GeometryComponentFilter from '../geom/GeometryComponentFilter';
import TaggedLineString from './TaggedLineString';
export default class TopologyPreservingSimplifier {
	constructor(...args) {
		(() => {
			this.inputGeom = null;
			this.lineSimplifier = new TaggedLinesSimplifier();
			this.linestringMap = null;
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
	static get LineStringMapBuilderFilter() {
		return LineStringMapBuilderFilter;
	}
	static simplify(geom, distanceTolerance) {
		var tss = new TopologyPreservingSimplifier(geom);
		tss.setDistanceTolerance(distanceTolerance);
		return tss.getResultGeometry();
	}
	getResultGeometry() {
		if (this.inputGeom.isEmpty()) return this.inputGeom.copy();
		this.linestringMap = new HashMap();
		this.inputGeom.apply(new LineStringMapBuilderFilter(this));
		this.lineSimplifier.simplify(this.linestringMap.values());
		var result = new LineStringTransformer().transform(this.inputGeom);
		return result;
	}
	setDistanceTolerance(distanceTolerance) {
		if (distanceTolerance < 0.0) throw new IllegalArgumentException("Tolerance must be non-negative");
		this.lineSimplifier.setDistanceTolerance(distanceTolerance);
	}
	getClass() {
		return TopologyPreservingSimplifier;
	}
}
class LineStringMapBuilderFilter {
	constructor(...args) {
		(() => {
			this.tps = null;
		})();
		const overloads = (...args) => {
			switch (args.length) {
				case 1:
					return ((...args) => {
						let [tps] = args;
						this.tps = tps;
					})(...args);
			}
		};
		return overloads.apply(this, args);
	}
	get interfaces_() {
		return [GeometryComponentFilter];
	}
	filter(geom) {
		if (geom instanceof LineString) {
			var line = geom;
			if (line.isEmpty()) return null;
			var minSize = line.isClosed() ? 4 : 2;
			var taggedLine = new TaggedLineString(line, minSize);
			this.tps.linestringMap.put(line, taggedLine);
		}
	}
	getClass() {
		return LineStringMapBuilderFilter;
	}
}

