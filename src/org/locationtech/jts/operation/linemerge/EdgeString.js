import CoordinateList from '../../geom/CoordinateList';
import CoordinateArrays from '../../geom/CoordinateArrays';
import ArrayList from '../../../../../java/util/ArrayList';
export default class EdgeString {
	constructor() {
		EdgeString.constructor_.apply(this, arguments);
	}
	getCoordinates() {
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
	}
	toLineString() {
		return this._factory.createLineString(this.getCoordinates());
	}
	add(directedEdge) {
		this._directedEdges.add(directedEdge);
	}
	getClass() {
		return EdgeString;
	}
	get interfaces_() {
		return [];
	}
}
EdgeString.constructor_ = function () {
	this._factory = null;
	this._directedEdges = new ArrayList();
	this._coordinates = null;
	let factory = arguments[0];
	this._factory = factory;
};
