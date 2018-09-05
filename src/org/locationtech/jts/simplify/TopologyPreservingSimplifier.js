import LineString from '../geom/LineString';
import HashMap from '../../../../java/util/HashMap';
import GeometryTransformer from '../geom/util/GeometryTransformer';
import TaggedLinesSimplifier from './TaggedLinesSimplifier';
import IllegalArgumentException from '../../../../java/lang/IllegalArgumentException';
import GeometryComponentFilter from '../geom/GeometryComponentFilter';
import TaggedLineString from './TaggedLineString';
export default class TopologyPreservingSimplifier {
	constructor() {
		TopologyPreservingSimplifier.constructor_.apply(this, arguments);
	}
	static simplify(geom, distanceTolerance) {
		var tss = new TopologyPreservingSimplifier(geom);
		tss.setDistanceTolerance(distanceTolerance);
		return tss.getResultGeometry();
	}
	getResultGeometry() {
		if (this._inputGeom.isEmpty()) return this._inputGeom.copy();
		this._linestringMap = new HashMap();
		this._inputGeom.apply(new LineStringMapBuilderFilter(this));
		this._lineSimplifier.simplify(this._linestringMap.values());
		var result = new LineStringTransformer(this._linestringMap).transform(this._inputGeom);
		return result;
	}
	setDistanceTolerance(distanceTolerance) {
		if (distanceTolerance < 0.0) throw new IllegalArgumentException("Tolerance must be non-negative");
		this._lineSimplifier.setDistanceTolerance(distanceTolerance);
	}
	getClass() {
		return TopologyPreservingSimplifier;
	}
	get interfaces_() {
		return [];
	}
}
class LineStringTransformer extends GeometryTransformer {
	constructor() {
		super();
		LineStringTransformer.constructor_.apply(this, arguments);
	}
	transformCoordinates(coords, parent) {
		if (coords.size() === 0) return null;
		if (parent instanceof LineString) {
			var taggedLine = this._linestringMap.get(parent);
			return this.createCoordinateSequence(taggedLine.getResultCoordinates());
		}
		return super.transformCoordinates.call(this, coords, parent);
	}
	getClass() {
		return LineStringTransformer;
	}
	get interfaces_() {
		return [];
	}
}
LineStringTransformer.constructor_ = function () {
	this._linestringMap = null;
	let linestringMap = arguments[0];
	this._linestringMap = linestringMap;
};
class LineStringMapBuilderFilter {
	constructor() {
		LineStringMapBuilderFilter.constructor_.apply(this, arguments);
	}
	filter(geom) {
		if (geom instanceof LineString) {
			var line = geom;
			if (line.isEmpty()) return null;
			var minSize = line.isClosed() ? 4 : 2;
			var taggedLine = new TaggedLineString(line, minSize);
			this.tps._linestringMap.put(line, taggedLine);
		}
	}
	getClass() {
		return LineStringMapBuilderFilter;
	}
	get interfaces_() {
		return [GeometryComponentFilter];
	}
}
LineStringMapBuilderFilter.constructor_ = function () {
	this.tps = null;
	let tps = arguments[0];
	this.tps = tps;
};
TopologyPreservingSimplifier.LineStringTransformer = LineStringTransformer;
TopologyPreservingSimplifier.LineStringMapBuilderFilter = LineStringMapBuilderFilter;
TopologyPreservingSimplifier.constructor_ = function () {
	this._inputGeom = null;
	this._lineSimplifier = new TaggedLinesSimplifier();
	this._linestringMap = null;
	let inputGeom = arguments[0];
	this._inputGeom = inputGeom;
};
