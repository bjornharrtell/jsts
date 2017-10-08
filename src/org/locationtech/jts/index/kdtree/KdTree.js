import CoordinateList from '../../geom/CoordinateList';
import hasInterface from '../../../../../hasInterface';
import extend from '../../../../../extend';
import ArrayList from '../../../../../java/util/ArrayList';
import KdNodeVisitor from './KdNodeVisitor';
import Envelope from '../../geom/Envelope';
import List from '../../../../../java/util/List';
import KdNode from './KdNode';
export default function KdTree() {
	this._root = null;
	this._numberOfNodes = null;
	this._tolerance = null;
	if (arguments.length === 0) {
		KdTree.call(this, 0.0);
	} else if (arguments.length === 1) {
		let tolerance = arguments[0];
		this._tolerance = tolerance;
	}
}
extend(KdTree.prototype, {
	insert: function () {
		if (arguments.length === 1) {
			let p = arguments[0];
			return this.insert(p, null);
		} else if (arguments.length === 2) {
			let p = arguments[0], data = arguments[1];
			if (this._root === null) {
				this._root = new KdNode(p, data);
				return this._root;
			}
			if (this._tolerance > 0) {
				var matchNode = this.findBestMatchNode(p);
				if (matchNode !== null) {
					matchNode.increment();
					return matchNode;
				}
			}
			return this.insertExact(p, data);
		}
	},
	query: function () {
		if (arguments.length === 1) {
			let queryEnv = arguments[0];
			var result = new ArrayList();
			this.query(queryEnv, result);
			return result;
		} else if (arguments.length === 2) {
			if (arguments[0] instanceof Envelope && hasInterface(arguments[1], List)) {
				let queryEnv = arguments[0], result = arguments[1];
				this.queryNode(this._root, queryEnv, true, {
					interfaces_: function () {
						return [KdNodeVisitor];
					},
					visit: function (node) {
						result.add(node);
					}
				});
			} else if (arguments[0] instanceof Envelope && hasInterface(arguments[1], KdNodeVisitor)) {
				let queryEnv = arguments[0], visitor = arguments[1];
				this.queryNode(this._root, queryEnv, true, visitor);
			}
		}
	},
	queryNode: function (currentNode, queryEnv, odd, visitor) {
		if (currentNode === null) return null;
		var min = null;
		var max = null;
		var discriminant = null;
		if (odd) {
			min = queryEnv.getMinX();
			max = queryEnv.getMaxX();
			discriminant = currentNode.getX();
		} else {
			min = queryEnv.getMinY();
			max = queryEnv.getMaxY();
			discriminant = currentNode.getY();
		}
		var searchLeft = min < discriminant;
		var searchRight = discriminant <= max;
		if (searchLeft) {
			this.queryNode(currentNode.getLeft(), queryEnv, !odd, visitor);
		}
		if (queryEnv.contains(currentNode.getCoordinate())) {
			visitor.visit(currentNode);
		}
		if (searchRight) {
			this.queryNode(currentNode.getRight(), queryEnv, !odd, visitor);
		}
	},
	findBestMatchNode: function (p) {
		var visitor = new BestMatchVisitor(p, this._tolerance);
		this.query(visitor.queryEnvelope(), visitor);
		return visitor.getNode();
	},
	isEmpty: function () {
		if (this._root === null) return true;
		return false;
	},
	insertExact: function (p, data) {
		var currentNode = this._root;
		var leafNode = this._root;
		var isOddLevel = true;
		var isLessThan = true;
		while (currentNode !== null) {
			if (currentNode !== null) {
				var isInTolerance = p.distance(currentNode.getCoordinate()) <= this._tolerance;
				if (isInTolerance) {
					currentNode.increment();
					return currentNode;
				}
			}
			if (isOddLevel) {
				isLessThan = p.x < currentNode.getX();
			} else {
				isLessThan = p.y < currentNode.getY();
			}
			leafNode = currentNode;
			if (isLessThan) {
				currentNode = currentNode.getLeft();
			} else {
				currentNode = currentNode.getRight();
			}
			isOddLevel = !isOddLevel;
		}
		this._numberOfNodes = this._numberOfNodes + 1;
		var node = new KdNode(p, data);
		if (isLessThan) {
			leafNode.setLeft(node);
		} else {
			leafNode.setRight(node);
		}
		return node;
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return KdTree;
	}
});
KdTree.toCoordinates = function () {
	if (arguments.length === 1) {
		let kdnodes = arguments[0];
		return KdTree.toCoordinates(kdnodes, false);
	} else if (arguments.length === 2) {
		let kdnodes = arguments[0], includeRepeated = arguments[1];
		var coord = new CoordinateList();
		for (var it = kdnodes.iterator(); it.hasNext(); ) {
			var node = it.next();
			var count = includeRepeated ? node.getCount() : 1;
			for (var i = 0; i < count; i++) {
				coord.add(node.getCoordinate(), true);
			}
		}
		return coord.toCoordinateArray();
	}
};
function BestMatchVisitor() {
	this._tolerance = null;
	this._matchNode = null;
	this._matchDist = 0.0;
	this._p = null;
	let p = arguments[0], tolerance = arguments[1];
	this._p = p;
	this._tolerance = tolerance;
}
extend(BestMatchVisitor.prototype, {
	visit: function (node) {
		var dist = this._p.distance(node.getCoordinate());
		var isInTolerance = dist <= this._tolerance;
		if (!isInTolerance) return null;
		var update = false;
		if (this._matchNode === null || dist < this._matchDist || this._matchNode !== null && dist === this._matchDist && node.getCoordinate().compareTo(this._matchNode.getCoordinate()) < 1) update = true;
		if (update) {
			this._matchNode = node;
			this._matchDist = dist;
		}
	},
	queryEnvelope: function () {
		var queryEnv = new Envelope(this._p);
		queryEnv.expandBy(this._tolerance);
		return queryEnv;
	},
	getNode: function () {
		return this._matchNode;
	},
	interfaces_: function () {
		return [KdNodeVisitor];
	},
	getClass: function () {
		return BestMatchVisitor;
	}
});
KdTree.BestMatchVisitor = BestMatchVisitor;
