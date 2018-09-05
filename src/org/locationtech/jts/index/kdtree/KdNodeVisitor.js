export default class KdNodeVisitor {
	constructor() {
		KdNodeVisitor.constructor_.apply(this, arguments);
	}
	visit(node) {}
	getClass() {
		return KdNodeVisitor;
	}
	get interfaces_() {
		return [];
	}
}
KdNodeVisitor.constructor_ = function () {};
