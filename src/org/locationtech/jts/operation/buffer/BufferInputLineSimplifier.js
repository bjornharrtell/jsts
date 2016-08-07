import CGAlgorithms from '../../algorithm/CGAlgorithms';
import CoordinateList from '../../geom/CoordinateList';
import extend from '../../../../../extend';
export default function BufferInputLineSimplifier() {
	this.inputLine = null;
	this.distanceTol = null;
	this.isDeleted = null;
	this.angleOrientation = CGAlgorithms.COUNTERCLOCKWISE;
	let inputLine = arguments[0];
	this.inputLine = inputLine;
}
extend(BufferInputLineSimplifier.prototype, {
	isDeletable: function (i0, i1, i2, distanceTol) {
		var p0 = this.inputLine[i0];
		var p1 = this.inputLine[i1];
		var p2 = this.inputLine[i2];
		if (!this.isConcave(p0, p1, p2)) return false;
		if (!this.isShallow(p0, p1, p2, distanceTol)) return false;
		return this.isShallowSampled(p0, p1, i0, i2, distanceTol);
	},
	deleteShallowConcavities: function () {
		var index = 1;
		var maxIndex = this.inputLine.length - 1;
		var midIndex = this.findNextNonDeletedIndex(index);
		var lastIndex = this.findNextNonDeletedIndex(midIndex);
		var isChanged = false;
		while (lastIndex < this.inputLine.length) {
			var isMiddleVertexDeleted = false;
			if (this.isDeletable(index, midIndex, lastIndex, this.distanceTol)) {
				this.isDeleted[midIndex] = BufferInputLineSimplifier.DELETE;
				isMiddleVertexDeleted = true;
				isChanged = true;
			}
			if (isMiddleVertexDeleted) index = lastIndex; else index = midIndex;
			midIndex = this.findNextNonDeletedIndex(index);
			lastIndex = this.findNextNonDeletedIndex(midIndex);
		}
		return isChanged;
	},
	isShallowConcavity: function (p0, p1, p2, distanceTol) {
		var orientation = CGAlgorithms.computeOrientation(p0, p1, p2);
		var isAngleToSimplify = orientation === this.angleOrientation;
		if (!isAngleToSimplify) return false;
		var dist = CGAlgorithms.distancePointLine(p1, p0, p2);
		return dist < distanceTol;
	},
	isShallowSampled: function (p0, p2, i0, i2, distanceTol) {
		var inc = Math.trunc((i2 - i0) / BufferInputLineSimplifier.NUM_PTS_TO_CHECK);
		if (inc <= 0) inc = 1;
		for (var i = i0; i < i2; i += inc) {
			if (!this.isShallow(p0, p2, this.inputLine[i], distanceTol)) return false;
		}
		return true;
	},
	isConcave: function (p0, p1, p2) {
		var orientation = CGAlgorithms.computeOrientation(p0, p1, p2);
		var isConcave = orientation === this.angleOrientation;
		return isConcave;
	},
	simplify: function (distanceTol) {
		this.distanceTol = Math.abs(distanceTol);
		if (distanceTol < 0) this.angleOrientation = CGAlgorithms.CLOCKWISE;
		this.isDeleted = new Array(this.inputLine.length).fill(null);
		var isChanged = false;
		do {
			isChanged = this.deleteShallowConcavities();
		} while (isChanged);
		return this.collapseLine();
	},
	findNextNonDeletedIndex: function (index) {
		var next = index + 1;
		while (next < this.inputLine.length && this.isDeleted[next] === BufferInputLineSimplifier.DELETE) next++;
		return next;
	},
	isShallow: function (p0, p1, p2, distanceTol) {
		var dist = CGAlgorithms.distancePointLine(p1, p0, p2);
		return dist < distanceTol;
	},
	collapseLine: function () {
		var coordList = new CoordinateList();
		for (var i = 0; i < this.inputLine.length; i++) {
			if (this.isDeleted[i] !== BufferInputLineSimplifier.DELETE) coordList.add(this.inputLine[i]);
		}
		return coordList.toCoordinateArray();
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return BufferInputLineSimplifier;
	}
});
BufferInputLineSimplifier.simplify = function (inputLine, distanceTol) {
	var simp = new BufferInputLineSimplifier(inputLine);
	return simp.simplify(distanceTol);
};
BufferInputLineSimplifier.INIT = 0;
BufferInputLineSimplifier.DELETE = 1;
BufferInputLineSimplifier.KEEP = 1;
BufferInputLineSimplifier.NUM_PTS_TO_CHECK = 10;
