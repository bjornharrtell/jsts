import HashMap from '../../../../java/util/HashMap';
import extend from '../../../../extend';
export default function ObjectCounter() {
	this.counts = new HashMap();
}
extend(ObjectCounter.prototype, {
	count: function (o) {
		var counter = this.counts.get(o);
		if (counter === null) return 0; else return counter.count();
	},
	add: function (o) {
		var counter = this.counts.get(o);
		if (counter === null) this.counts.put(o, new Counter(1)); else counter.increment();
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return ObjectCounter;
	}
});
function Counter() {
	this._count = 0;
	if (arguments.length === 0) {} else if (arguments.length === 1) {
		let count = arguments[0];
		this._count = count;
	}
}
extend(Counter.prototype, {
	count: function () {
		return this._count;
	},
	increment: function () {
		this._count++;
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return Counter;
	}
});
ObjectCounter.Counter = Counter;
