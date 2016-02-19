import WKTWriter from '../../io/WKTWriter';
import CoordinateArraySequence from '../../geom/impl/CoordinateArraySequence';
import extend from '../../../../../extend';
import DD from '../../math/DD';
import System from '../../../../../java/lang/System';
import Triangle from '../../geom/Triangle';
export default function TrianglePredicate() {}
extend(TrianglePredicate.prototype, {
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return TrianglePredicate;
	}
});
TrianglePredicate.triArea = function (a, b, c) {
	return (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
};
TrianglePredicate.isInCircleDDNormalized = function (a, b, c, p) {
	var adx = DD.valueOf(a.x).selfSubtract(p.x);
	var ady = DD.valueOf(a.y).selfSubtract(p.y);
	var bdx = DD.valueOf(b.x).selfSubtract(p.x);
	var bdy = DD.valueOf(b.y).selfSubtract(p.y);
	var cdx = DD.valueOf(c.x).selfSubtract(p.x);
	var cdy = DD.valueOf(c.y).selfSubtract(p.y);
	var abdet = adx.multiply(bdy).selfSubtract(bdx.multiply(ady));
	var bcdet = bdx.multiply(cdy).selfSubtract(cdx.multiply(bdy));
	var cadet = cdx.multiply(ady).selfSubtract(adx.multiply(cdy));
	var alift = adx.multiply(adx).selfAdd(ady.multiply(ady));
	var blift = bdx.multiply(bdx).selfAdd(bdy.multiply(bdy));
	var clift = cdx.multiply(cdx).selfAdd(cdy.multiply(cdy));
	var sum = alift.selfMultiply(bcdet).selfAdd(blift.selfMultiply(cadet)).selfAdd(clift.selfMultiply(abdet));
	var isInCircle = sum.doubleValue() > 0;
	return isInCircle;
};
TrianglePredicate.checkRobustInCircle = function (a, b, c, p) {
	var nonRobustInCircle = TrianglePredicate.isInCircleNonRobust(a, b, c, p);
	var isInCircleDD = TrianglePredicate.isInCircleDDSlow(a, b, c, p);
	var isInCircleCC = TrianglePredicate.isInCircleCC(a, b, c, p);
	var circumCentre = Triangle.circumcentre(a, b, c);
	System.out.println("p radius diff a = " + Math.abs(p.distance(circumCentre) - a.distance(circumCentre)) / a.distance(circumCentre));
	if (nonRobustInCircle !== isInCircleDD || nonRobustInCircle !== isInCircleCC) {
		System.out.println("inCircle robustness failure (double result = " + nonRobustInCircle + ", DD result = " + isInCircleDD + ", CC result = " + isInCircleCC + ")");
		System.out.println(WKTWriter.toLineString(new CoordinateArraySequence([a, b, c, p])));
		System.out.println("Circumcentre = " + WKTWriter.toPoint(circumCentre) + " radius = " + a.distance(circumCentre));
		System.out.println("p radius diff a = " + Math.abs(p.distance(circumCentre) / a.distance(circumCentre) - 1));
		System.out.println("p radius diff b = " + Math.abs(p.distance(circumCentre) / b.distance(circumCentre) - 1));
		System.out.println("p radius diff c = " + Math.abs(p.distance(circumCentre) / c.distance(circumCentre) - 1));
		System.out.println();
	}
};
TrianglePredicate.isInCircleDDFast = function (a, b, c, p) {
	var aTerm = DD.sqr(a.x).selfAdd(DD.sqr(a.y)).selfMultiply(TrianglePredicate.triAreaDDFast(b, c, p));
	var bTerm = DD.sqr(b.x).selfAdd(DD.sqr(b.y)).selfMultiply(TrianglePredicate.triAreaDDFast(a, c, p));
	var cTerm = DD.sqr(c.x).selfAdd(DD.sqr(c.y)).selfMultiply(TrianglePredicate.triAreaDDFast(a, b, p));
	var pTerm = DD.sqr(p.x).selfAdd(DD.sqr(p.y)).selfMultiply(TrianglePredicate.triAreaDDFast(a, b, c));
	var sum = aTerm.selfSubtract(bTerm).selfAdd(cTerm).selfSubtract(pTerm);
	var isInCircle = sum.doubleValue() > 0;
	return isInCircle;
};
TrianglePredicate.isInCircleCC = function (a, b, c, p) {
	var cc = Triangle.circumcentre(a, b, c);
	var ccRadius = a.distance(cc);
	var pRadiusDiff = p.distance(cc) - ccRadius;
	return pRadiusDiff <= 0;
};
TrianglePredicate.isInCircleNormalized = function (a, b, c, p) {
	var adx = a.x - p.x;
	var ady = a.y - p.y;
	var bdx = b.x - p.x;
	var bdy = b.y - p.y;
	var cdx = c.x - p.x;
	var cdy = c.y - p.y;
	var abdet = adx * bdy - bdx * ady;
	var bcdet = bdx * cdy - cdx * bdy;
	var cadet = cdx * ady - adx * cdy;
	var alift = adx * adx + ady * ady;
	var blift = bdx * bdx + bdy * bdy;
	var clift = cdx * cdx + cdy * cdy;
	var disc = alift * bcdet + blift * cadet + clift * abdet;
	return disc > 0;
};
TrianglePredicate.isInCircleDDSlow = function (a, b, c, p) {
	var px = DD.valueOf(p.x);
	var py = DD.valueOf(p.y);
	var ax = DD.valueOf(a.x);
	var ay = DD.valueOf(a.y);
	var bx = DD.valueOf(b.x);
	var by = DD.valueOf(b.y);
	var cx = DD.valueOf(c.x);
	var cy = DD.valueOf(c.y);
	var aTerm = ax.multiply(ax).add(ay.multiply(ay)).multiply(TrianglePredicate.triAreaDDSlow(bx, by, cx, cy, px, py));
	var bTerm = bx.multiply(bx).add(by.multiply(by)).multiply(TrianglePredicate.triAreaDDSlow(ax, ay, cx, cy, px, py));
	var cTerm = cx.multiply(cx).add(cy.multiply(cy)).multiply(TrianglePredicate.triAreaDDSlow(ax, ay, bx, by, px, py));
	var pTerm = px.multiply(px).add(py.multiply(py)).multiply(TrianglePredicate.triAreaDDSlow(ax, ay, bx, by, cx, cy));
	var sum = aTerm.subtract(bTerm).add(cTerm).subtract(pTerm);
	var isInCircle = sum.doubleValue() > 0;
	return isInCircle;
};
TrianglePredicate.isInCircleNonRobust = function (a, b, c, p) {
	var isInCircle = (a.x * a.x + a.y * a.y) * TrianglePredicate.triArea(b, c, p) - (b.x * b.x + b.y * b.y) * TrianglePredicate.triArea(a, c, p) + (c.x * c.x + c.y * c.y) * TrianglePredicate.triArea(a, b, p) - (p.x * p.x + p.y * p.y) * TrianglePredicate.triArea(a, b, c) > 0;
	return isInCircle;
};
TrianglePredicate.isInCircleRobust = function (a, b, c, p) {
	return TrianglePredicate.isInCircleNormalized(a, b, c, p);
};
TrianglePredicate.triAreaDDSlow = function (ax, ay, bx, by, cx, cy) {
	return bx.subtract(ax).multiply(cy.subtract(ay)).subtract(by.subtract(ay).multiply(cx.subtract(ax)));
};
TrianglePredicate.triAreaDDFast = function (a, b, c) {
	var t1 = DD.valueOf(b.x).selfSubtract(a.x).selfMultiply(DD.valueOf(c.y).selfSubtract(a.y));
	var t2 = DD.valueOf(b.y).selfSubtract(a.y).selfMultiply(DD.valueOf(c.x).selfSubtract(a.x));
	return t1.selfSubtract(t2);
};

