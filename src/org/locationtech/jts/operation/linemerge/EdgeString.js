import CoordinateList from '../../geom/CoordinateList';
import extend from '../../../../../extend';
import CoordinateArrays from '../../geom/CoordinateArrays';
import ArrayList from '../../../../../java/util/ArrayList';
export default function EdgeString() {
	this._factory = null;
	this._directedEdges = new ArrayList();
	this._coordinates = null;
	let factory = arguments[0];
	this._factory = factory;
}
extend(EdgeString.prototype, {
	getCoordinates: function () {
		if (this._coordinates === null) {
			var forwardDirectedEdges = 0;
			var reverseDirectedEdges = 0;
			var coordinateList = new CoordinateList();
			for (var i = this._directedEdges.iterator(); i.hasNext(); ) {
				var directedEdge = i.next();
				if (directedEdge.getEdgeDirection()) {
					forwardDirectedEdges++;
				} else {
					reverseDirectedEdges++;
				}
				coordinateList.add(directedEdge.getEdge().getLine().getCoordinates(), false, directedEdge.getEdgeDirection());
			}
			this._coordinates = coordinateList.toCoordinateArray();
			if (reverseDirectedEdges > forwardDirectedEdges) {
				CoordinateArrays.reverse(this._coordinates);
			}
		}
		return this._coordinates;
	},
	toLineString: function () {
		return this._factory.createLineString(this.getCoordinates());
	},
	add: function (directedEdge) {
		this._directedEdges.add(directedEdge);
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return EdgeString;
	}
});
