import CGAlgorithms from '../../algorithm/CGAlgorithms';
import Position from '../../geomgraph/Position';
import extend from '../../../../../extend';
import Assert from '../../util/Assert';
export default function RightmostEdgeFinder() {
	this._minIndex = -1;
	this._minCoord = null;
	this._minDe = null;
	this._orientedDe = null;
}
extend(RightmostEdgeFinder.prototype, {
	getCoordinate: function () {
		return this._minCoord;
	},
	getRightmostSide: function (de, index) {
		var side = this.getRightmostSideOfSegment(de, index);
		if (side < 0) side = this.getRightmostSideOfSegment(de, index - 1);
		if (side < 0) {
			this._minCoord = null;
			this.checkForRightmostCoordinate(de);
		}
		return side;
	},
	findRightmostEdgeAtVertex: function () {
		var pts = this._minDe.getEdge().getCoordinates();
		Assert.isTrue(this._minIndex > 0 && this._minIndex < pts.length, "rightmost point expected to be interior vertex of edge");
		var pPrev = pts[this._minIndex - 1];
		var pNext = pts[this._minIndex + 1];
		var orientation = CGAlgorithms.computeOrientation(this._minCoord, pNext, pPrev);
		var usePrev = false;
		if (pPrev.y < this._minCoord.y && pNext.y < this._minCoord.y && orientation === CGAlgorithms.COUNTERCLOCKWISE) {
			usePrev = true;
		} else if (pPrev.y > this._minCoord.y && pNext.y > this._minCoord.y && orientation === CGAlgorithms.CLOCKWISE) {
			usePrev = true;
		}
		if (usePrev) {
			this._minIndex = this._minIndex - 1;
		}
	},
	getRightmostSideOfSegment: function (de, i) {
		var e = de.getEdge();
		var coord = e.getCoordinates();
		if (i < 0 || i + 1 >= coord.length) return -1;
		if (coord[i].y === coord[i + 1].y) return -1;
		var pos = Position.LEFT;
		if (coord[i].y < coord[i + 1].y) pos = Position.RIGHT;
		return pos;
	},
	getEdge: function () {
		return this._orientedDe;
	},
	checkForRightmostCoordinate: function (de) {
		var coord = de.getEdge().getCoordinates();
		for (var i = 0; i < coord.length - 1; i++) {
			if (this._minCoord === null || coord[i].x > this._minCoord.x) {
				this._minDe = de;
				this._minIndex = i;
				this._minCoord = coord[i];
			}
		}
	},
	findRightmostEdgeAtNode: function () {
		var node = this._minDe.getNode();
		var star = node.getEdges();
		this._minDe = star.getRightmostEdge();
		if (!this._minDe.isForward()) {
			this._minDe = this._minDe.getSym();
			this._minIndex = this._minDe.getEdge().getCoordinates().length - 1;
		}
	},
	findEdge: function (dirEdgeList) {
		for (var i = dirEdgeList.iterator(); i.hasNext(); ) {
			var de = i.next();
			if (!de.isForward()) continue;
			this.checkForRightmostCoordinate(de);
		}
		Assert.isTrue(this._minIndex !== 0 || this._minCoord.equals(this._minDe.getCoordinate()), "inconsistency in rightmost processing");
		if (this._minIndex === 0) {
			this.findRightmostEdgeAtNode();
		} else {
			this.findRightmostEdgeAtVertex();
		}
		this._orientedDe = this._minDe;
		var rightmostSide = this.getRightmostSide(this._minDe, this._minIndex);
		if (rightmostSide === Position.LEFT) {
			this._orientedDe = this._minDe.getSym();
		}
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return RightmostEdgeFinder;
	}
});
