import extend from '../../../../extend';
import Assert from '../util/Assert';
export default function GraphComponent() {
	this.label = null;
	this.__isInResult = false;
	this.__isCovered = false;
	this.__isCoveredSet = false;
	this.__isVisited = false;
	if (arguments.length === 0) {} else if (arguments.length === 1) {
		let label = arguments[0];
		this.label = label;
	}
}
extend(GraphComponent.prototype, {
	setVisited: function (isVisited) {
		this.__isVisited = isVisited;
	},
	setInResult: function (isInResult) {
		this.__isInResult = isInResult;
	},
	isCovered: function () {
		return this.__isCovered;
	},
	isCoveredSet: function () {
		return this.__isCoveredSet;
	},
	setLabel: function (label) {
		this.label = label;
	},
	getLabel: function () {
		return this.label;
	},
	setCovered: function (isCovered) {
		this.__isCovered = isCovered;
		this.__isCoveredSet = true;
	},
	updateIM: function (im) {
		Assert.isTrue(this.label.getGeometryCount() >= 2, "found partial label");
		this.computeIM(im);
	},
	isInResult: function () {
		return this.__isInResult;
	},
	isVisited: function () {
		return this.__isVisited;
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return GraphComponent;
	}
});
