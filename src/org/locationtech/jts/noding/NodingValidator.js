import GeometryFactory from '../geom/GeometryFactory';
import RobustLineIntersector from '../algorithm/RobustLineIntersector';
import RuntimeException from '../../../../java/lang/RuntimeException';
export default class NodingValidator {
	constructor(...args) {
		this.li = new RobustLineIntersector();
		this.segStrings = null;
		const overloads = (...args) => {
			switch (args.length) {
				case 1:
					return ((...args) => {
						let [segStrings] = args;
						this.segStrings = segStrings;
					})(...args);
			}
		};
		return overloads.apply(this, args);
	}
	get interfaces_() {
		return [];
	}
	checkEndPtVertexIntersections(...args) {
		const overloads = (...args) => {
			switch (args.length) {
				case 0:
					return ((...args) => {
						let [] = args;
						for (var i = this.segStrings.iterator(); i.hasNext(); ) {
							var ss = i.next();
							var pts = ss.getCoordinates();
							this.checkEndPtVertexIntersections(pts[0], this.segStrings);
							this.checkEndPtVertexIntersections(pts[pts.length - 1], this.segStrings);
						}
					})(...args);
				case 2:
					return ((...args) => {
						let [testPt, segStrings] = args;
						for (var i = segStrings.iterator(); i.hasNext(); ) {
							var ss = i.next();
							var pts = ss.getCoordinates();
							for (var j = 1; j < pts.length - 1; j++) {
								if (pts[j].equals(testPt)) throw new RuntimeException("found endpt/interior pt intersection at index " + j + " :pt " + testPt);
							}
						}
					})(...args);
			}
		};
		return overloads.apply(this, args);
	}
	checkInteriorIntersections(...args) {
		const overloads = (...args) => {
			switch (args.length) {
				case 0:
					return ((...args) => {
						let [] = args;
						for (var i = this.segStrings.iterator(); i.hasNext(); ) {
							var ss0 = i.next();
							for (var j = this.segStrings.iterator(); j.hasNext(); ) {
								var ss1 = j.next();
								this.checkInteriorIntersections(ss0, ss1);
							}
						}
					})(...args);
				case 2:
					return ((...args) => {
						let [ss0, ss1] = args;
						var pts0 = ss0.getCoordinates();
						var pts1 = ss1.getCoordinates();
						for (var i0 = 0; i0 < pts0.length - 1; i0++) {
							for (var i1 = 0; i1 < pts1.length - 1; i1++) {
								this.checkInteriorIntersections(ss0, i0, ss1, i1);
							}
						}
					})(...args);
				case 4:
					return ((...args) => {
						let [e0, segIndex0, e1, segIndex1] = args;
						if (e0 === e1 && segIndex0 === segIndex1) return null;
						var p00 = e0.getCoordinates()[segIndex0];
						var p01 = e0.getCoordinates()[segIndex0 + 1];
						var p10 = e1.getCoordinates()[segIndex1];
						var p11 = e1.getCoordinates()[segIndex1 + 1];
						this.li.computeIntersection(p00, p01, p10, p11);
						if (this.li.hasIntersection()) {
							if (this.li.isProper() || this.hasInteriorIntersection(this.li, p00, p01) || this.hasInteriorIntersection(this.li, p10, p11)) {
								throw new RuntimeException("found non-noded intersection at " + p00 + "-" + p01 + " and " + p10 + "-" + p11);
							}
						}
					})(...args);
			}
		};
		return overloads.apply(this, args);
	}
	checkValid() {
		this.checkEndPtVertexIntersections();
		this.checkInteriorIntersections();
		this.checkCollapses();
	}
	checkCollapses(...args) {
		const overloads = (...args) => {
			switch (args.length) {
				case 0:
					return ((...args) => {
						let [] = args;
						for (var i = this.segStrings.iterator(); i.hasNext(); ) {
							var ss = i.next();
							this.checkCollapses(ss);
						}
					})(...args);
				case 1:
					return ((...args) => {
						let [ss] = args;
						var pts = ss.getCoordinates();
						for (var i = 0; i < pts.length - 2; i++) {
							this.checkCollapse(pts[i], pts[i + 1], pts[i + 2]);
						}
					})(...args);
			}
		};
		return overloads.apply(this, args);
	}
	hasInteriorIntersection(li, p0, p1) {
		for (var i = 0; i < li.getIntersectionNum(); i++) {
			var intPt = li.getIntersection(i);
			if (!(intPt.equals(p0) || intPt.equals(p1))) return true;
		}
		return false;
	}
	checkCollapse(p0, p1, p2) {
		if (p0.equals(p2)) throw new RuntimeException("found non-noded collapse at " + NodingValidator.fact.createLineString([p0, p1, p2]));
	}
	getClass() {
		return NodingValidator;
	}
}
NodingValidator.fact = new GeometryFactory();

