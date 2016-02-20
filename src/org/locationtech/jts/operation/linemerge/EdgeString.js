import CoordinateList from '../../geom/CoordinateList';
import extend from '../../../../../extend';
import CoordinateArrays from '../../geom/CoordinateArrays';
import ArrayList from '../../../../../java/util/ArrayList';
export default function EdgeString() {
	this.factory = null;
	this.directedEdges = new ArrayList();
	this.coordinates = null;
	let factory = arguments[0];
	this.factory = factory;
}
extend(EdgeString.prototype, {
	getCoordinates: function () {
		if (this.coordinates === null) {
			var forwardDirectedEdges = 0;
			var reverseDirectedEdges = 0;
			var coordinateList = new CoordinateList();
			for (var i = this.directedEdges.iterator(); i.hasNext(); ) {
				var directedEdge = i.next();
				if (directedEdge.getEdgeDirection()) {
					forwardDirectedEdges++;
				} else {
					reverseDirectedEdges++;
				}
				coordinateList.add(directedEdge.getEdge().getLine().getCoordinates(), false, directedEdge.getEdgeDirection());
			}
			this.coordinates = coordinateList.toCoordinateArray();
			if (reverseDirectedEdges > forwardDirectedEdges) {
				CoordinateArrays.reverse(this.coordinates);
			}
		}
		return this.coordinates;
	},
	toLineString: function () {
		return this.factory.createLineString(this.getCoordinates());
	},
	add: function (directedEdge) {
		this.directedEdges.add(directedEdge);
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return EdgeString;
	}
});

