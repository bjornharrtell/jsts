import hasInterface from '../../../../../hasInterface';
import Collection from '../../../../../java/util/Collection';
import QuadEdgeTriangle from './QuadEdgeTriangle';
import extend from '../../../../../extend';
import LinkedList from '../../../../../java/util/LinkedList';
export default function EdgeConnectedTriangleTraversal() {
	this.triQueue = new LinkedList();
}
extend(EdgeConnectedTriangleTraversal.prototype, {
	init: function () {
		if (arguments[0] instanceof QuadEdgeTriangle) {
			let tri = arguments[0];
			this.triQueue.addLast(tri);
		} else if (hasInterface(arguments[0], Collection)) {
			let tris = arguments[0];
			this.triQueue.addAll(tris);
		}
	},
	process: function (currTri, visitor) {
		currTri.getNeighbours();
		for (var i = 0; i < 3; i++) {
			var neighTri = currTri.getEdge(i).sym().getData();
			if (neighTri === null) continue;
			if (visitor.visit(currTri, i, neighTri)) this.triQueue.addLast(neighTri);
		}
	},
	visitAll: function (visitor) {
		while (!this.triQueue.isEmpty()) {
			var tri = this.triQueue.removeFirst();
			this.process(tri, visitor);
		}
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return EdgeConnectedTriangleTraversal;
	}
});
