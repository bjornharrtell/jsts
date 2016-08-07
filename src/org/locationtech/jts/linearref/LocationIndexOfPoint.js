import LinearIterator from './LinearIterator';
import LinearLocation from './LinearLocation';
import Double from '../../../../java/lang/Double';
import extend from '../../../../extend';
import LineSegment from '../geom/LineSegment';
import Assert from '../util/Assert';
export default function LocationIndexOfPoint() {
	this.linearGeom = null;
	let linearGeom = arguments[0];
	this.linearGeom = linearGeom;
}
extend(LocationIndexOfPoint.prototype, {
	indexOf: function (inputPt) {
		return this.indexOfFromStart(inputPt, null);
	},
	indexOfFromStart: function (inputPt, minIndex) {
		var minDistance = Double.MAX_VALUE;
		var minComponentIndex = 0;
		var minSegmentIndex = 0;
		var minFrac = -1.0;
		var seg = new LineSegment();
		for (var it = new LinearIterator(this.linearGeom); it.hasNext(); it.next()) {
			if (!it.isEndOfLine()) {
				seg.p0 = it.getSegmentStart();
				seg.p1 = it.getSegmentEnd();
				var segDistance = seg.distance(inputPt);
				var segFrac = seg.segmentFraction(inputPt);
				var candidateComponentIndex = it.getComponentIndex();
				var candidateSegmentIndex = it.getVertexIndex();
				if (segDistance < minDistance) {
					if (minIndex === null || minIndex.compareLocationValues(candidateComponentIndex, candidateSegmentIndex, segFrac) < 0) {
						minComponentIndex = candidateComponentIndex;
						minSegmentIndex = candidateSegmentIndex;
						minFrac = segFrac;
						minDistance = segDistance;
					}
				}
			}
		}
		if (minDistance === Double.MAX_VALUE) {
			return new LinearLocation(minIndex);
		}
		var loc = new LinearLocation(minComponentIndex, minSegmentIndex, minFrac);
		return loc;
	},
	indexOfAfter: function (inputPt, minIndex) {
		if (minIndex === null) return this.indexOf(inputPt);
		var endLoc = LinearLocation.getEndLocation(this.linearGeom);
		if (endLoc.compareTo(minIndex) <= 0) return endLoc;
		var closestAfter = this.indexOfFromStart(inputPt, minIndex);
		Assert.isTrue(closestAfter.compareTo(minIndex) >= 0, "computed location is before specified minimum location");
		return closestAfter;
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return LocationIndexOfPoint;
	}
});
LocationIndexOfPoint.indexOf = function (linearGeom, inputPt) {
	var locater = new LocationIndexOfPoint(linearGeom);
	return locater.indexOf(inputPt);
};
LocationIndexOfPoint.indexOfAfter = function (linearGeom, inputPt, minIndex) {
	var locater = new LocationIndexOfPoint(linearGeom);
	return locater.indexOfAfter(inputPt, minIndex);
};
