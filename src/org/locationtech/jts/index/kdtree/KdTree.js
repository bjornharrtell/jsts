import CoordinateList from '../../geom/CoordinateList';
import ArrayList from '../../../../../java/util/ArrayList';
import KdNodeVisitor from './KdNodeVisitor';
import Envelope from '../../geom/Envelope';
import List from '../../../../../java/util/List';
import KdNode from './KdNode';
export default class KdTree {
	constructor(...args) {
		this.root = null;
		this.numberOfNodes = null;
		this.tolerance = null;
		const overloaded = (...args) => {
			switch (args.length) {
				case 0:
					return ((...args) => {
						let [] = args;
						overloaded.call(this, 0.0);
					})(...args);
				case 1:
					return ((...args) => {
						let [tolerance] = args;
						this.tolerance = tolerance;
					})(...args);
			}
		};
		return overloaded.apply(this, args);
	}
	get interfaces_() {
		return [];
	}
	static get BestMatchVisitor() {
		return BestMatchVisitor;
	}
	static toCoordinates(...args) {
		switch (args.length) {
			case 1:
				{
					let [kdnodes] = args;
					return KdTree.toCoordinates(kdnodes, false);
					break;
				}
			case 2:
				{
					let [kdnodes, includeRepeated] = args;
					var coord = new CoordinateList();
					for (var it = kdnodes.iterator(); it.hasNext(); ) {
						var node = it.next();
						var count = includeRepeated ? node.getCount() : 1;
						for (var i = 0; i < count; i++) {
							coord.add(node.getCoordinate(), true);
						}
					}
					return coord.toCoordinateArray();
					break;
				}
		}
	}
	insert(...args) {
		switch (args.length) {
			case 1:
				{
					let [p] = args;
					return this.insert(p, null);
					break;
				}
			case 2:
				{
					let [p, data] = args;
					if (this.root === null) {
						this.root = new KdNode(p, data);
						return this.root;
					}
					if (this.tolerance > 0) {
						var matchNode = this.findBestMatchNode(p);
						if (matchNode !== null) {
							matchNode.increment();
							return matchNode;
						}
					}
					return this.insertExact(p, data);
					break;
				}
		}
	}
	query(...args) {
		switch (args.length) {
			case 1:
				{
					let [queryEnv] = args;
					var result = new ArrayList();
					this.query(queryEnv, result);
					return result;
					break;
				}
			case 2:
				if (args[0] instanceof Envelope && (args[1].interfaces_ && args[1].interfaces_.indexOf(List) > -1)) {
					let [queryEnv, result] = args;
					this.queryNode(this.root, queryEnv, true, new (class {
						visit(node) {
							result.add(node);
						}
						get interfaces_() {
							return [KdNodeVisitor];
						}
					})());
				} else if (args[0] instanceof Envelope && (args[1].interfaces_ && args[1].interfaces_.indexOf(KdNodeVisitor) > -1)) {
					let [queryEnv, visitor] = args;
					this.queryNode(this.root, queryEnv, true, visitor);
				}
				break;
		}
	}
	queryNode(currentNode, queryEnv, odd, visitor) {
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
	}
	findBestMatchNode(p) {
		var visitor = new BestMatchVisitor(p, this.tolerance);
		this.query(visitor.queryEnvelope(), visitor);
		return visitor.getNode();
	}
	isEmpty() {
		if (this.root === null) return true;
		return false;
	}
	insertExact(p, data) {
		var currentNode = this.root;
		var leafNode = this.root;
		var isOddLevel = true;
		var isLessThan = true;
		while (currentNode !== null) {
			if (currentNode !== null) {
				var isInTolerance = p.distance(currentNode.getCoordinate()) <= this.tolerance;
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
		this.numberOfNodes = this.numberOfNodes + 1;
		var node = new KdNode(p, data);
		if (isLessThan) {
			leafNode.setLeft(node);
		} else {
			leafNode.setRight(node);
		}
		return node;
	}
	getClass() {
		return KdTree;
	}
}
class BestMatchVisitor {
	constructor(...args) {
		this.tolerance = null;
		this.matchNode = null;
		this.matchDist = 0.0;
		this.p = null;
		switch (args.length) {
			case 2:
				{
					let [p, tolerance] = args;
					this.p = p;
					this.tolerance = tolerance;
					break;
				}
		}
	}
	get interfaces_() {
		return [KdNodeVisitor];
	}
	visit(node) {
		var dist = this.p.distance(node.getCoordinate());
		var isInTolerance = dist <= this.tolerance;
		if (!isInTolerance) return null;
		var update = false;
		if (this.matchNode === null || dist < this.matchDist || this.matchNode !== null && dist === this.matchDist && node.getCoordinate().compareTo(this.matchNode.getCoordinate()) < 1) update = true;
		if (update) {
			this.matchNode = node;
			this.matchDist = dist;
		}
	}
	queryEnvelope() {
		var queryEnv = new Envelope(this.p);
		queryEnv.expandBy(this.tolerance);
		return queryEnv;
	}
	getNode() {
		return this.matchNode;
	}
	getClass() {
		return BestMatchVisitor;
	}
}

