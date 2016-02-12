import LinearIterator from './LinearIterator';
import Double from '../../../../java/lang/Double';
import LineSegment from '../geom/LineSegment';
import Assert from '../util/Assert';
export default class LengthIndexOfPoint {
	constructor(...args) {
		this.linearGeom = null;
		switch (args.length) {
			case 1:
				return ((...args) => {
					let [linearGeom] = args;
					this.linearGeom = linearGeom;
				})(...args);
		}
	}
	get interfaces_() {
		return [];
	}
	static indexOf(linearGeom, inputPt) {
		var locater = new LengthIndexOfPoint(linearGeom);
		return locater.indexOf(inputPt);
	}
	static indexOfAfter(linearGeom, inputPt, minIndex) {
		var locater = new LengthIndexOfPoint(linearGeom);
		return locater.indexOfAfter(inputPt, minIndex);
	}
	indexOf(inputPt) {
		return this.indexOfFromStart(inputPt, -1.0);
	}
	indexOfFromStart(inputPt, minIndex) {
		var minDistance = Double.MAX_VALUE;
		var ptMeasure = minIndex;
		var segmentStartMeasure = 0.0;
		var seg = new LineSegment();
		var it = new LinearIterator(this.linearGeom);
		while (it.hasNext()) {
			if (!it.isEndOfLine()) {
				seg.p0 = it.getSegmentStart();
				seg.p1 = it.getSegmentEnd();
				var segDistance = seg.distance(inputPt);
				var segMeasureToPt = this.segmentNearestMeasure(seg, inputPt, segmentStartMeasure);
				if (segDistance < minDistance && segMeasureToPt > minIndex) {
					ptMeasure = segMeasureToPt;
					minDistance = segDistance;
				}
				segmentStartMeasure += seg.getLength();
			}
			it.next();
		}
		return ptMeasure;
	}
	indexOfAfter(inputPt, minIndex) {
		if (minIndex < 0.0) return this.indexOf(inputPt);
		var endIndex = this.linearGeom.getLength();
		if (endIndex < minIndex) return endIndex;
		var closestAfter = this.indexOfFromStart(inputPt, minIndex);
		Assert.isTrue(closestAfter >= minIndex, "computed index is before specified minimum index");
		return closestAfter;
	}
	segmentNearestMeasure(seg, inputPt, segmentStartMeasure) {
		var projFactor = seg.projectionFactor(inputPt);
		if (projFactor <= 0.0) return segmentStartMeasure;
		if (projFactor <= 1.0) return segmentStartMeasure + projFactor * seg.getLength();
		return segmentStartMeasure + seg.getLength();
	}
	getClass() {
		return LengthIndexOfPoint;
	}
}

