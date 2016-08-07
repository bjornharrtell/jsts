import extend from '../../../../extend';
import ArrayList from '../../../../java/util/ArrayList';
export default function CollectionUtil() {}
extend(CollectionUtil.prototype, {
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return CollectionUtil;
	}
});
CollectionUtil.transform = function (coll, func) {
	var result = new ArrayList();
	for (var i = coll.iterator(); i.hasNext(); ) {
		result.add(func.execute(i.next()));
	}
	return result;
};
CollectionUtil.select = function (collection, func) {
	var result = new ArrayList();
	for (var i = collection.iterator(); i.hasNext(); ) {
		var item = i.next();
		if (Boolean.TRUE.equals(func.execute(item))) {
			result.add(item);
		}
	}
	return result;
};
CollectionUtil.apply = function (coll, func) {
	for (var i = coll.iterator(); i.hasNext(); ) {
		func.execute(i.next());
	}
};
function Function() {}
CollectionUtil.Function = Function;
