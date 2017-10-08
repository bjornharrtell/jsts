import Boundable from './Boundable';
import extend from '../../../../../extend';
import ArrayList from '../../../../../java/util/ArrayList';
import Serializable from '../../../../../java/io/Serializable';
import Assert from '../../util/Assert';
export default function AbstractNode() {
	this._childBoundables = new ArrayList();
	this._bounds = null;
	this._level = null;
	if (arguments.length === 0) {} else if (arguments.length === 1) {
		let level = arguments[0];
		this._level = level;
	}
}
extend(AbstractNode.prototype, {
	getLevel: function () {
		return this._level;
	},
	size: function () {
		return this._childBoundables.size();
	},
	getChildBoundables: function () {
		return this._childBoundables;
	},
	addChildBoundable: function (childBoundable) {
		Assert.isTrue(this._bounds === null);
		this._childBoundables.add(childBoundable);
	},
	isEmpty: function () {
		return this._childBoundables.isEmpty();
	},
	getBounds: function () {
		if (this._bounds === null) {
			this._bounds = this.computeBounds();
		}
		return this._bounds;
	},
	interfaces_: function () {
		return [Boundable, Serializable];
	},
	getClass: function () {
		return AbstractNode;
	}
});
AbstractNode.serialVersionUID = 6493722185909573708;
