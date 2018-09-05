export default class TraversalVisitor {
	constructor() {
		TraversalVisitor.constructor_.apply(this, arguments);
	}
	visit(currTri, edgeIndex, neighbTri) {}
	getClass() {
		return TraversalVisitor;
	}
	get interfaces_() {
		return [];
	}
}
TraversalVisitor.constructor_ = function () {};
