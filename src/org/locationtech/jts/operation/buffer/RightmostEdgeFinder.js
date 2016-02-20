import CGAlgorithms from '../../algorithm/CGAlgorithms';
import Position from '../../geomgraph/Position';
import extend from '../../../../../extend';
import Assert from '../../util/Assert';
export default function RightmostEdgeFinder() {
	this.minIndex = -1;
	this.minCoord = null;
	this.minDe = null;
	this.orientedDe = null;
}
extend(RightmostEdgeFinder.prototype, {
	getCoordinate: function () {
		return this.minCoord;
	},
	getRightmostSide: function (de, index) {
		var side = this.getRightmostSideOfSegment(de, index);
		if (side < 0) side = this.getRightmostSideOfSegment(de, index - 1);
		if (side < 0) {
			this.minCoord = null;
			this.checkForRightmostCoordinate(de);
		}
		return side;
	},
	findRightmostEdgeAtVertex: function () {
		var pts = this.minDe.getEdge().getCoordinates();
		Assert.isTrue(this.minIndex > 0 && this.minIndex < pts.length, "rightmost point expected to be interior vertex of edge");
		var pPrev = pts[this.minIndex - 1];
		var pNext = pts[this.minIndex + 1];
		var orientation = CGAlgorithms.computeOrientation(this.minCoord, pNext, pPrev);
		var usePrev = false;
		if (pPrev.y < this.minCoord.y && pNext.y < this.minCoord.y && orientation === CGAlgorithms.COUNTERCLOCKWISE) {
			usePrev = true;
		} else if (pPrev.y > this.minCoord.y && pNext.y > this.minCoord.y && orientation === CGAlgorithms.CLOCKWISE) {
			usePrev = true;
		}
		if (usePrev) {
			this.minIndex = this.minIndex - 1;
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
		return this.orientedDe;
	},
	checkForRightmostCoordinate: function (de) {
		var coord = de.getEdge().getCoordinates();
		for (var i = 0; i < coord.length - 1; i++) {
			if (this.minCoord === null || coord[i].x > this.minCoord.x) {
				this.minDe = de;
				this.minIndex = i;
				this.minCoord = coord[i];
			}
		}
	},
	findRightmostEdgeAtNode: function () {
		var node = this.minDe.getNode();
		var star = node.getEdges();
		this.minDe = star.getRightmostEdge();
		if (!this.minDe.isForward()) {
			this.minDe = this.minDe.getSym();
			this.minIndex = this.minDe.getEdge().getCoordinates().length - 1;
		}
	},
	findEdge: function (dirEdgeList) {
		for (var i = dirEdgeList.iterator(); i.hasNext(); ) {
			var de = i.next();
			if (!de.isForward()) continue;
			this.checkForRightmostCoordinate(de);
		}
		Assert.isTrue(this.minIndex !== 0 || this.minCoord.equals(this.minDe.getCoordinate()), "inconsistency in rightmost processing");
		if (this.minIndex === 0) {
			this.findRightmostEdgeAtNode();
		} else {
			this.findRightmostEdgeAtVertex();
		}
		this.orientedDe = this.minDe;
		var rightmostSide = this.getRightmostSide(this.minDe, this.minIndex);
		if (rightmostSide === Position.LEFT) {
			this.orientedDe = this.minDe.getSym();
		}
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return RightmostEdgeFinder;
	}
});

