import Vertex from './quadedge/Vertex';
export default class ConstraintVertex extends Vertex {
	constructor() {
		super();
		ConstraintVertex.constructor_.apply(this, arguments);
	}
	getConstraint() {
		return this._constraint;
	}
	setOnConstraint(isOnConstraint) {
		this._isOnConstraint = isOnConstraint;
	}
	merge(other) {
		if (other._isOnConstraint) {
			this._isOnConstraint = true;
			this._constraint = other._constraint;
		}
	}
	isOnConstraint() {
		return this._isOnConstraint;
	}
	setConstraint(constraint) {
		this._isOnConstraint = true;
		this._constraint = constraint;
	}
	getClass() {
		return ConstraintVertex;
	}
	get interfaces_() {
		return [];
	}
}
ConstraintVertex.constructor_ = function () {
	this._isOnConstraint = null;
	this._constraint = null;
	let p = arguments[0];
	Vertex.constructor_.call(this, p);
};
