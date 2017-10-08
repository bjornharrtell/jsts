import extend from '../../../../extend';
import Vertex from './quadedge/Vertex';
import inherits from '../../../../inherits';
export default function ConstraintVertex() {
	this.__isOnConstraint = null;
	this._constraint = null;
	let p = arguments[0];
	Vertex.call(this, p);
}
inherits(ConstraintVertex, Vertex);
extend(ConstraintVertex.prototype, {
	getConstraint: function () {
		return this._constraint;
	},
	setOnConstraint: function (isOnConstraint) {
		this.__isOnConstraint = isOnConstraint;
	},
	merge: function (other) {
		if (other.__isOnConstraint) {
			this.__isOnConstraint = true;
			this._constraint = other._constraint;
		}
	},
	isOnConstraint: function () {
		return this.__isOnConstraint;
	},
	setConstraint: function (constraint) {
		this.__isOnConstraint = true;
		this._constraint = constraint;
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return ConstraintVertex;
	}
});
