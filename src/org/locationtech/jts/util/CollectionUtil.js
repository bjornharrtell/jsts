import ArrayList from '../../../../java/util/ArrayList';
export default class CollectionUtil {
	constructor() {
		CollectionUtil.constructor_.apply(this, arguments);
	}
	static transform(coll, func) {
		var result = new ArrayList();
		for (var i = coll.iterator(); i.hasNext(); ) {
			result.add(func.execute(i.next()));
		}
		return result;
	}
	static select(collection, func) {
		var result = new ArrayList();
		for (var i = collection.iterator(); i.hasNext(); ) {
			var item = i.next();
			if (Boolean.TRUE.equals(func.execute(item))) {
				result.add(item);
			}
		}
		return result;
	}
	static apply(coll, func) {
		for (var i = coll.iterator(); i.hasNext(); ) {
			func.execute(i.next());
		}
	}
	getClass() {
		return CollectionUtil;
	}
	get interfaces_() {
		return [];
	}
}
function Function() {}
CollectionUtil.Function = Function;
CollectionUtil.constructor_ = function () {};
