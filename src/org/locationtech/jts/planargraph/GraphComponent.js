export default class GraphComponent {
	constructor(...args) {
		this._isMarked = false;
		this._isVisited = false;
		this.data = null;
		switch (args.length) {
			case 0:
				{
					let [] = args;
					break;
				}
		}
	}
	get interfaces_() {
		return [];
	}
	static getComponentWithVisitedState(i, visitedState) {
		while (i.hasNext()) {
			var comp = i.next();
			if (comp.isVisited() === visitedState) return comp;
		}
		return null;
	}
	static setVisited(i, visited) {
		while (i.hasNext()) {
			var comp = i.next();
			comp.setVisited(visited);
		}
	}
	static setMarked(i, marked) {
		while (i.hasNext()) {
			var comp = i.next();
			comp.setMarked(marked);
		}
	}
	setVisited(isVisited) {
		this._isVisited = isVisited;
	}
	isMarked() {
		return this._isMarked;
	}
	setData(data) {
		this.data = data;
	}
	getData() {
		return this.data;
	}
	setMarked(isMarked) {
		this._isMarked = isMarked;
	}
	getContext() {
		return this.data;
	}
	isVisited() {
		return this._isVisited;
	}
	setContext(data) {
		this.data = data;
	}
	getClass() {
		return GraphComponent;
	}
}

