import Vertex from './quadedge/Vertex';
export default class ConstraintVertex extends Vertex {
	constructor(...args) {
		super();
		this._isOnConstraint = null;
		this.constraint = null;
		switch (args.length) {
			case 1:
				return ((...args) => {
					let [p] = args;
					super(p);
				})(...args);
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

