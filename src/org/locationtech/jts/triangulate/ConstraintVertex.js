import extend from '../../../../extend';
import Vertex from './quadedge/Vertex';
import inherits from '../../../../inherits';
export default function ConstraintVertex() {
	this._isOnConstraint = null;
	this.constraint = null;
	let p = arguments[0];
	Vertex.call(this, p);
}
inherits(ConstraintVertex, Vertex);
extend(ConstraintVertex.prototype, {
	getConstraint: function () {
		return this.constraint;
	},
	setOnConstraint: function (isOnConstraint) {
		this._isOnConstraint = isOnConstraint;
	},
	merge: function (other) {
		if (other._isOnConstraint) {
			this._isOnConstraint = true;
			this.constraint = other.constraint;
		}
	},
	isOnConstraint: function () {
		return this._isOnConstraint;
	},
	setConstraint: function (constraint) {
		this._isOnConstraint = true;
		this.constraint = constraint;
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return ConstraintVertex;
	}
});

