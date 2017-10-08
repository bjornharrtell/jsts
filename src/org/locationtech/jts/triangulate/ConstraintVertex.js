import extend from '../../../../extend';
import Vertex from './quadedge/Vertex';
import inherits from '../../../../inherits';
export default function ConstraintVertex() {
	this._isOnConstraint = null;
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
		this._isOnConstraint = isOnConstraint;
	},
	merge: function (other) {
		if (other._isOnConstraint) {
			this._isOnConstraint = true;
			this._constraint = other._constraint;
		}
	},
	isOnConstraint: function () {
		return this._isOnConstraint;
	},
	setConstraint: function (constraint) {
		this._isOnConstraint = true;
		this._constraint = constraint;
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return ConstraintVertex;
	}
});
