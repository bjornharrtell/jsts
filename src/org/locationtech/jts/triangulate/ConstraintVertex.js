import Vertex from './quadedge/Vertex';
export default class ConstraintVertex extends Vertex {
	constructor(...args) {
		super();
		this._isOnConstraint = null;
		this.constraint = null;
		if (args.length === 1) {
			let [p] = args;
			super(p);
		}
	}
	get interfaces_() {
		return [];
	}
	getConstraint() {
		return this.constraint;
	}
	setOnConstraint(isOnConstraint) {
		this._isOnConstraint = isOnConstraint;
	}
	merge(other) {
		if (other._isOnConstraint) {
			this._isOnConstraint = true;
			this.constraint = other.constraint;
		}
	}
	isOnConstraint() {
		return this._isOnConstraint;
	}
	setConstraint(constraint) {
		this._isOnConstraint = true;
		this.constraint = constraint;
	}
	getClass() {
		return ConstraintVertex;
	}
}

