import hasInterface from '../../../../hasInterface';
import Collection from '../../../../java/util/Collection';
import Noder from './Noder';
import Coordinate from '../geom/Coordinate';
import NodedSegmentString from './NodedSegmentString';
import extend from '../../../../extend';
import System from '../../../../java/lang/System';
import CoordinateArrays from '../geom/CoordinateArrays';
import ArrayList from '../../../../java/util/ArrayList';
export default function ScaledNoder() {
	this._noder = null;
	this._scaleFactor = null;
	this._offsetX = null;
	this._offsetY = null;
	this._isScaled = false;
	if (arguments.length === 2) {
		let noder = arguments[0], scaleFactor = arguments[1];
		ScaledNoder.call(this, noder, scaleFactor, 0, 0);
	} else if (arguments.length === 4) {
		let noder = arguments[0], scaleFactor = arguments[1], offsetX = arguments[2], offsetY = arguments[3];
		this._noder = noder;
		this._scaleFactor = scaleFactor;
		this._isScaled = !this.isIntegerPrecision();
	}
}
extend(ScaledNoder.prototype, {
	rescale: function () {
		if (hasInterface(arguments[0], Collection)) {
			let segStrings = arguments[0];
			for (var i = segStrings.iterator(); i.hasNext(); ) {
				var ss = i.next();
				this.rescale(ss.getCoordinates());
			}
		} else if (arguments[0] instanceof Array) {
			let pts = arguments[0];
			var p0 = null;
			var p1 = null;
			if (pts.length === 2) {
				p0 = new Coordinate(pts[0]);
				p1 = new Coordinate(pts[1]);
			}
			for (var i = 0; i < pts.length; i++) {
				pts[i].x = pts[i].x / this._scaleFactor + this._offsetX;
				pts[i].y = pts[i].y / this._scaleFactor + this._offsetY;
			}
			if (pts.length === 2 && pts[0].equals2D(pts[1])) {
				System.out.println(pts);
			}
		}
	},
	scale: function () {
		if (hasInterface(arguments[0], Collection)) {
			let segStrings = arguments[0];
			var nodedSegmentStrings = new ArrayList(segStrings.size());
			for (var i = segStrings.iterator(); i.hasNext(); ) {
				var ss = i.next();
				nodedSegmentStrings.add(new NodedSegmentString(this.scale(ss.getCoordinates()), ss.getData()));
			}
			return nodedSegmentStrings;
		} else if (arguments[0] instanceof Array) {
			let pts = arguments[0];
			var roundPts = new Array(pts.length).fill(null);
			for (var i = 0; i < pts.length; i++) {
				roundPts[i] = new Coordinate(Math.round((pts[i].x - this._offsetX) * this._scaleFactor), Math.round((pts[i].y - this._offsetY) * this._scaleFactor), pts[i].z);
			}
			var roundPtsNoDup = CoordinateArrays.removeRepeatedPoints(roundPts);
			return roundPtsNoDup;
		}
	},
	isIntegerPrecision: function () {
		return this._scaleFactor === 1.0;
	},
	getNodedSubstrings: function () {
		var splitSS = this._noder.getNodedSubstrings();
		if (this._isScaled) this.rescale(splitSS);
		return splitSS;
	},
	computeNodes: function (inputSegStrings) {
		var intSegStrings = inputSegStrings;
		if (this._isScaled) intSegStrings = this.scale(inputSegStrings);
		this._noder.computeNodes(intSegStrings);
	},
	interfaces_: function () {
		return [Noder];
	},
	getClass: function () {
		return ScaledNoder;
	}
});
