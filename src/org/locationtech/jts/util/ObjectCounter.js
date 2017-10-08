import HashMap from '../../../../java/util/HashMap';
import extend from '../../../../extend';
export default function ObjectCounter() {
	this._counts = new HashMap();
}
extend(ObjectCounter.prototype, {
	count: function (o) {
		var counter = this._counts.get(o);
		if (counter === null) return 0; else return counter.count();
	},
	add: function (o) {
		var counter = this._counts.get(o);
		if (counter === null) this._counts.put(o, new Counter(1)); else counter.increment();
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return ObjectCounter;
	}
});
function Counter() {
	this.count = 0;
	if (arguments.length === 0) {} else if (arguments.length === 1) {
		let count = arguments[0];
		this.count = count;
	}
}
extend(Counter.prototype, {
	count: function () {
		return this.count;
	},
	increment: function () {
		this.count++;
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return Counter;
	}
});
ObjectCounter.Counter = Counter;
