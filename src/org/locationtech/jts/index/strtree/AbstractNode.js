import Boundable from './Boundable';
import extend from '../../../../../extend';
import ArrayList from '../../../../../java/util/ArrayList';
import Serializable from '../../../../../java/io/Serializable';
import Assert from '../../util/Assert';
export default function AbstractNode() {
	this.childBoundables = new ArrayList();
	this.bounds = null;
	this.level = null;
	if (arguments.length === 0) {} else if (arguments.length === 1) {
		let level = arguments[0];
		this.level = level;
	}
}
extend(AbstractNode.prototype, {
	getLevel: function () {
		return this.level;
	},
	size: function () {
		return this.childBoundables.size();
	},
	getChildBoundables: function () {
		return this.childBoundables;
	},
	addChildBoundable: function (childBoundable) {
		Assert.isTrue(this.bounds === null);
		this.childBoundables.add(childBoundable);
	},
	isEmpty: function () {
		return this.childBoundables.isEmpty();
	},
	getBounds: function () {
		if (this.bounds === null) {
			this.bounds = this.computeBounds();
		}
		return this.bounds;
	},
	interfaces_: function () {
		return [Boundable, Serializable];
	},
	getClass: function () {
		return AbstractNode;
	}
});
AbstractNode.serialVersionUID = 6493722185909573708;
