import EdgeEndBundleStar from './EdgeEndBundleStar';
import RelateNode from './RelateNode';
import NodeFactory from '../../geomgraph/NodeFactory';
export default class RelateNodeFactory extends NodeFactory {
	constructor() {
		super();
		RelateNodeFactory.constructor_.apply(this, arguments);
	}
	createNode(coord) {
		return new RelateNode(coord, new EdgeEndBundleStar());
	}
	getClass() {
		return RelateNodeFactory;
	}
	get interfaces_() {
		return [];
	}
}
RelateNodeFactory.constructor_ = function () {};
