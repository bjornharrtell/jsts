import HashMap from '../../../../java/util/HashMap';
export default class ObjectCounter {
	constructor(...args) {
		this.counts = new HashMap();
		switch (args.length) {
			case 0:
				return ((...args) => {
					let [] = args;
				})(...args);
		}
	}
	get interfaces_() {
		return [];
	}
	static get Counter() {
		return Counter;
	}
	count(o) {
		var counter = this.counts.get(o);
		if (counter === null) return 0; else return counter.count();
	}
	add(o) {
		var counter = this.counts.get(o);
		if (counter === null) this.counts.put(o, new Counter(1)); else counter.increment();
	}
	getClass() {
		return ObjectCounter;
	}
}
class Counter {
	constructor(...args) {
		this._count = 0;
		const overloaded = (...args) => {
			switch (args.length) {
				case 0:
					return ((...args) => {
						let [] = args;
					})(...args);
				case 1:
					return ((...args) => {
						let [count] = args;
						this._count = count;
					})(...args);
			}
		};
		return overloaded.apply(this, args);
	}
	get interfaces_() {
		return [];
	}
	count() {
		return this._count;
	}
	increment() {
		this._count++;
	}
	getClass() {
		return Counter;
	}
}

