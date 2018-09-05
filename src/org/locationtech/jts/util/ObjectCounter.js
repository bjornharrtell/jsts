import HashMap from '../../../../java/util/HashMap';
export default class ObjectCounter {
	constructor() {
		ObjectCounter.constructor_.apply(this, arguments);
	}
	count(o) {
		var counter = this._counts.get(o);
		if (counter === null) return 0; else return counter.count();
	}
	add(o) {
		var counter = this._counts.get(o);
		if (counter === null) this._counts.put(o, new Counter(1)); else counter.increment();
	}
	getClass() {
		return ObjectCounter;
	}
	get interfaces_() {
		return [];
	}
}
class Counter {
	constructor() {
		Counter.constructor_.apply(this, arguments);
	}
	count() {
		return this.count;
	}
	increment() {
		this.count++;
	}
	getClass() {
		return Counter;
	}
	get interfaces_() {
		return [];
	}
}
Counter.constructor_ = function () {
	this.count = 0;
	if (arguments.length === 0) {} else if (arguments.length === 1) {
		let count = arguments[0];
		this.count = count;
	}
};
ObjectCounter.Counter = Counter;
ObjectCounter.constructor_ = function () {
	this._counts = new HashMap();
};
