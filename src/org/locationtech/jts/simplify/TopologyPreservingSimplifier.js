import LineString from '../geom/LineString';
import HashMap from '../../../../java/util/HashMap';
import GeometryTransformer from '../geom/util/GeometryTransformer';
import TaggedLinesSimplifier from './TaggedLinesSimplifier';
import IllegalArgumentException from '../../../../java/lang/IllegalArgumentException';
import extend from '../../../../extend';
import GeometryComponentFilter from '../geom/GeometryComponentFilter';
import inherits from '../../../../inherits';
import TaggedLineString from './TaggedLineString';
export default function TopologyPreservingSimplifier() {
	this.inputGeom = null;
	this.lineSimplifier = new TaggedLinesSimplifier();
	this.linestringMap = null;
	let inputGeom = arguments[0];
	this.inputGeom = inputGeom;
}
extend(TopologyPreservingSimplifier.prototype, {
	getResultGeometry: function () {
		if (this.inputGeom.isEmpty()) return this.inputGeom.copy();
		this.linestringMap = new HashMap();
		this.inputGeom.apply(new LineStringMapBuilderFilter(this));
		this.lineSimplifier.simplify(this.linestringMap.values());
		var result = new LineStringTransformer(this.linestringMap).transform(this.inputGeom);
		return result;
	},
	setDistanceTolerance: function (distanceTolerance) {
		if (distanceTolerance < 0.0) throw new IllegalArgumentException("Tolerance must be non-negative");
		this.lineSimplifier.setDistanceTolerance(distanceTolerance);
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return TopologyPreservingSimplifier;
	}
});
TopologyPreservingSimplifier.simplify = function (geom, distanceTolerance) {
	var tss = new TopologyPreservingSimplifier(geom);
	tss.setDistanceTolerance(distanceTolerance);
	return tss.getResultGeometry();
};
function LineStringTransformer() {
	GeometryTransformer.apply(this);
	this.linestringMap = null;
	let linestringMap = arguments[0];
	this.linestringMap = linestringMap;
}
inherits(LineStringTransformer, GeometryTransformer);
extend(LineStringTransformer.prototype, {
	transformCoordinates: function (coords, parent) {
		if (coords.size() === 0) return null;
		if (parent instanceof LineString) {
			var taggedLine = this.linestringMap.get(parent);
			return this.createCoordinateSequence(taggedLine.getResultCoordinates());
		}
		return GeometryTransformer.prototype.transformCoordinates.call(this, coords, parent);
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return LineStringTransformer;
	}
});
function LineStringMapBuilderFilter() {
	this.tps = null;
	let tps = arguments[0];
	this.tps = tps;
}
extend(LineStringMapBuilderFilter.prototype, {
	filter: function (geom) {
		if (geom instanceof LineString) {
			var line = geom;
			if (line.isEmpty()) return null;
			var minSize = line.isClosed() ? 4 : 2;
			var taggedLine = new TaggedLineString(line, minSize);
			this.tps.linestringMap.put(line, taggedLine);
		}
	},
	interfaces_: function () {
		return [GeometryComponentFilter];
	},
	getClass: function () {
		return LineStringMapBuilderFilter;
	}
});
TopologyPreservingSimplifier.LineStringTransformer = LineStringTransformer;
TopologyPreservingSimplifier.LineStringMapBuilderFilter = LineStringMapBuilderFilter;

