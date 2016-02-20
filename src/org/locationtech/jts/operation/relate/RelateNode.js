import Node from '../../geomgraph/Node';
import extend from '../../../../../extend';
import inherits from '../../../../../inherits';
export default function RelateNode() {
	let coord = arguments[0], edges = arguments[1];
	Node.call(this, coord, edges);
}
inherits(RelateNode, Node);
extend(RelateNode.prototype, {
	updateIMFromEdges: function (im) {
		this.edges.updateIM(im);
	},
	computeIM: function (im) {
		im.setAtLeastIfValid(this.label.getLocation(0), this.label.getLocation(1), 0);
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return RelateNode;
	}
});

