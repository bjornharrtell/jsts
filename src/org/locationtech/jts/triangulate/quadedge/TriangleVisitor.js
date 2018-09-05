export default class TriangleVisitor {
	constructor() {
		TriangleVisitor.constructor_.apply(this, arguments);
	}
	visit(triEdges) {}
	getClass() {
		return TriangleVisitor;
	}
	get interfaces_() {
		return [];
	}
}
TriangleVisitor.constructor_ = function () {};
