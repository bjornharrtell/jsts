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
	this._inputGeom = null;
	this._lineSimplifier = new TaggedLinesSimplifier();
	this._linestringMap = null;
	let inputGeom = arguments[0];
	this._inputGeom = inputGeom;
}
extend(TopologyPreservingSimplifier.prototype, {
	getResultGeometry: function () {
		if (this._inputGeom.isEmpty()) return this._inputGeom.copy();
		this._linestringMap = new HashMap();
		this._inputGeom.apply(new LineStringMapBuilderFilter(this));
		this._lineSimplifier.simplify(this._linestringMap.values());
		var result = new LineStringTransformer(this._linestringMap).transform(this._inputGeom);
		return result;
	},
	setDistanceTolerance: function (distanceTolerance) {
		if (distanceTolerance < 0.0) throw new IllegalArgumentException("Tolerance must be non-negative");
		this._lineSimplifier.setDistanceTolerance(distanceTolerance);
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
	this._linestringMap = null;
	let linestringMap = arguments[0];
	this._linestringMap = linestringMap;
}
inherits(LineStringTransformer, GeometryTransformer);
extend(LineStringTransformer.prototype, {
	transformCoordinates: function (coords, parent) {
		if (coords.size() === 0) return null;
		if (parent instanceof LineString) {
			var taggedLine = this._linestringMap.get(parent);
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
			this.tps._linestringMap.put(line, taggedLine);
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
