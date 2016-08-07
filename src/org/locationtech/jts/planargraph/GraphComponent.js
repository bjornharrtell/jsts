import extend from '../../../../extend';
export default function GraphComponent() {
	this._isMarked = false;
	this._isVisited = false;
	this.data = null;
}
extend(GraphComponent.prototype, {
	setVisited: function (isVisited) {
		this._isVisited = isVisited;
	},
	isMarked: function () {
		return this._isMarked;
	},
	setData: function (data) {
		this.data = data;
	},
	getData: function () {
		return this.data;
	},
	setMarked: function (isMarked) {
		this._isMarked = isMarked;
	},
	getContext: function () {
		return this.data;
	},
	isVisited: function () {
		return this._isVisited;
	},
	setContext: function (data) {
		this.data = data;
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return GraphComponent;
	}
});
GraphComponent.getComponentWithVisitedState = function (i, visitedState) {
	while (i.hasNext()) {
		var comp = i.next();
		if (comp.isVisited() === visitedState) return comp;
	}
	return null;
};
GraphComponent.setVisited = function (i, visited) {
	while (i.hasNext()) {
		var comp = i.next();
		comp.setVisited(visited);
	}
};
GraphComponent.setMarked = function (i, marked) {
	while (i.hasNext()) {
		var comp = i.next();
		comp.setMarked(marked);
	}
};
