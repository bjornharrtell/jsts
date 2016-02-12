import Collection from '../../../../../java/util/Collection';
import QuadEdgeTriangle from './QuadEdgeTriangle';
import LinkedList from '../../../../../java/util/LinkedList';
export default class EdgeConnectedTriangleTraversal {
	constructor(...args) {
		this.triQueue = new LinkedList();
		if (args.length === 0) {
			let [] = args;
		}
	}
	get interfaces_() {
		return [];
	}
	init(...args) {
		if (args.length === 1) {
			if (args[0] instanceof QuadEdgeTriangle) {
				let [tri] = args;
				this.triQueue.addLast(tri);
			} else if (args[0].interfaces_ && args[0].interfaces_.indexOf(Collection) > -1) {
				let [tris] = args;
				this.triQueue.addAll(tris);
			}
		}
	}
	process(currTri, visitor) {
		currTri.getNeighbours();
		for (var i = 0; i < 3; i++) {
			var neighTri = currTri.getEdge(i).sym().getData();
			if (neighTri === null) continue;
			if (visitor.visit(currTri, i, neighTri)) this.triQueue.addLast(neighTri);
		}
	}
	visitAll(visitor) {
		while (!this.triQueue.isEmpty()) {
			var tri = this.triQueue.removeFirst();
			this.process(tri, visitor);
		}
	}
	getClass() {
		return EdgeConnectedTriangleTraversal;
	}
}

