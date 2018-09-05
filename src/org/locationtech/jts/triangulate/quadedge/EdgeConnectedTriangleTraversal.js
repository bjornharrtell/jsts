import hasInterface from '../../../../../hasInterface';
import Collection from '../../../../../java/util/Collection';
import QuadEdgeTriangle from './QuadEdgeTriangle';
import LinkedList from '../../../../../java/util/LinkedList';
export default class EdgeConnectedTriangleTraversal {
	constructor() {
		EdgeConnectedTriangleTraversal.constructor_.apply(this, arguments);
	}
	init() {
		if (arguments[0] instanceof QuadEdgeTriangle) {
			let tri = arguments[0];
			this._triQueue.addLast(tri);
		} else if (hasInterface(arguments[0], Collection)) {
			let tris = arguments[0];
			this._triQueue.addAll(tris);
		}
	}
	process(currTri, visitor) {
		currTri.getNeighbours();
		for (var i = 0; i < 3; i++) {
			var neighTri = currTri.getEdge(i).sym().getData();
			if (neighTri === null) continue;
			if (visitor.visit(currTri, i, neighTri)) this._triQueue.addLast(neighTri);
		}
	}
	visitAll(visitor) {
		while (!this._triQueue.isEmpty()) {
			var tri = this._triQueue.removeFirst();
			this.process(tri, visitor);
		}
	}
	getClass() {
		return EdgeConnectedTriangleTraversal;
	}
	get interfaces_() {
		return [];
	}
}
EdgeConnectedTriangleTraversal.constructor_ = function () {
	this._triQueue = new LinkedList();
};
