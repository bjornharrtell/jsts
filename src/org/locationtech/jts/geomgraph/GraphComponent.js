import extend from '../../../../extend';
import Assert from '../util/Assert';
export default function GraphComponent() {
	this.label = null;
	this._isInResult = false;
	this._isCovered = false;
	this._isCoveredSet = false;
	this._isVisited = false;
	if (arguments.length === 0) {} else if (arguments.length === 1) {
		let label = arguments[0];
		this.label = label;
	}
}
extend(GraphComponent.prototype, {
	setVisited: function (isVisited) {
		this._isVisited = isVisited;
	},
	setInResult: function (isInResult) {
		this._isInResult = isInResult;
	},
	isCovered: function () {
		return this._isCovered;
	},
	isCoveredSet: function () {
		return this._isCoveredSet;
	},
	setLabel: function (label) {
		this.label = label;
	},
	getLabel: function () {
		return this.label;
	},
	setCovered: function (isCovered) {
		this._isCovered = isCovered;
		this._isCoveredSet = true;
	},
	updateIM: function (im) {
		Assert.isTrue(this.label.getGeometryCount() >= 2, "found partial label");
		this.computeIM(im);
	},
	isInResult: function () {
		return this._isInResult;
	},
	isVisited: function () {
		return this._isVisited;
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return GraphComponent;
	}
});

