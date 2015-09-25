(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BoundaryNodeRule = (function () {
	function BoundaryNodeRule() {
		_classCallCheck(this, BoundaryNodeRule);

		this.init_.apply(this, arguments);
	}

	_createClass(BoundaryNodeRule, [{
		key: "init_",
		value: function init_() {
			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			switch (args.length) {}
		}
	}, {
		key: "isInBoundary",
		value: function isInBoundary(boundaryCount) {}
	}, {
		key: "interfaces_",
		get: function get() {
			return [];
		}
	}]);

	return BoundaryNodeRule;
})();

exports["default"] = BoundaryNodeRule;

var Mod2BoundaryNodeRule = (function () {
	function Mod2BoundaryNodeRule() {
		_classCallCheck(this, Mod2BoundaryNodeRule);

		this.init_.apply(this, arguments);
	}

	_createClass(Mod2BoundaryNodeRule, [{
		key: "init_",
		value: function init_() {
			for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
				args[_key2] = arguments[_key2];
			}

			switch (args.length) {}
		}
	}, {
		key: "isInBoundary",
		value: function isInBoundary(boundaryCount) {
			return boundaryCount % 2 === 1;
		}
	}, {
		key: "interfaces_",
		get: function get() {
			return [BoundaryNodeRule];
		}
	}]);

	return Mod2BoundaryNodeRule;
})();

BoundaryNodeRule.Mod2BoundaryNodeRule = Mod2BoundaryNodeRule;

var EndPointBoundaryNodeRule = (function () {
	function EndPointBoundaryNodeRule() {
		_classCallCheck(this, EndPointBoundaryNodeRule);

		this.init_.apply(this, arguments);
	}

	_createClass(EndPointBoundaryNodeRule, [{
		key: "init_",
		value: function init_() {
			for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
				args[_key3] = arguments[_key3];
			}

			switch (args.length) {}
		}
	}, {
		key: "isInBoundary",
		value: function isInBoundary(boundaryCount) {
			return boundaryCount > 0;
		}
	}, {
		key: "interfaces_",
		get: function get() {
			return [BoundaryNodeRule];
		}
	}]);

	return EndPointBoundaryNodeRule;
})();

BoundaryNodeRule.EndPointBoundaryNodeRule = EndPointBoundaryNodeRule;

var MultiValentEndPointBoundaryNodeRule = (function () {
	function MultiValentEndPointBoundaryNodeRule() {
		_classCallCheck(this, MultiValentEndPointBoundaryNodeRule);

		this.init_.apply(this, arguments);
	}

	_createClass(MultiValentEndPointBoundaryNodeRule, [{
		key: "init_",
		value: function init_() {
			for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
				args[_key4] = arguments[_key4];
			}

			switch (args.length) {}
		}
	}, {
		key: "isInBoundary",
		value: function isInBoundary(boundaryCount) {
			return boundaryCount > 1;
		}
	}, {
		key: "interfaces_",
		get: function get() {
			return [BoundaryNodeRule];
		}
	}]);

	return MultiValentEndPointBoundaryNodeRule;
})();

BoundaryNodeRule.MultiValentEndPointBoundaryNodeRule = MultiValentEndPointBoundaryNodeRule;

var MonoValentEndPointBoundaryNodeRule = (function () {
	function MonoValentEndPointBoundaryNodeRule() {
		_classCallCheck(this, MonoValentEndPointBoundaryNodeRule);

		this.init_.apply(this, arguments);
	}

	_createClass(MonoValentEndPointBoundaryNodeRule, [{
		key: "init_",
		value: function init_() {
			for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
				args[_key5] = arguments[_key5];
			}

			switch (args.length) {}
		}
	}, {
		key: "isInBoundary",
		value: function isInBoundary(boundaryCount) {
			return boundaryCount === 1;
		}
	}, {
		key: "interfaces_",
		get: function get() {
			return [BoundaryNodeRule];
		}
	}]);

	return MonoValentEndPointBoundaryNodeRule;
})();

BoundaryNodeRule.MonoValentEndPointBoundaryNodeRule = MonoValentEndPointBoundaryNodeRule;
BoundaryNodeRule.MOD2_BOUNDARY_RULE = new Mod2BoundaryNodeRule();
BoundaryNodeRule.ENDPOINT_BOUNDARY_RULE = new EndPointBoundaryNodeRule();
BoundaryNodeRule.MULTIVALENT_ENDPOINT_BOUNDARY_RULE = new MultiValentEndPointBoundaryNodeRule();
BoundaryNodeRule.MONOVALENT_ENDPOINT_BOUNDARY_RULE = new MonoValentEndPointBoundaryNodeRule();
BoundaryNodeRule.OGC_SFS_BOUNDARY_RULE = BoundaryNodeRule.MOD2_BOUNDARY_RULE;
module.exports = exports["default"];

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _comVividsolutionsJtsGeomLocation = require('com/vividsolutions/jts/geom/Location');

var _comVividsolutionsJtsGeomLocation2 = _interopRequireDefault(_comVividsolutionsJtsGeomLocation);

var _comVividsolutionsJtsGeomCoordinate = require('com/vividsolutions/jts/geom/Coordinate');

var _comVividsolutionsJtsGeomCoordinate2 = _interopRequireDefault(_comVividsolutionsJtsGeomCoordinate);

var _comVividsolutionsJtsMathMathUtil = require('com/vividsolutions/jts/math/MathUtil');

var _comVividsolutionsJtsMathMathUtil2 = _interopRequireDefault(_comVividsolutionsJtsMathMathUtil);

var _comVividsolutionsJtsAlgorithmCGAlgorithmsDD = require('com/vividsolutions/jts/algorithm/CGAlgorithmsDD');

var _comVividsolutionsJtsAlgorithmCGAlgorithmsDD2 = _interopRequireDefault(_comVividsolutionsJtsAlgorithmCGAlgorithmsDD);

var _comVividsolutionsJtsGeomCoordinateSequence = require('com/vividsolutions/jts/geom/CoordinateSequence');

var _comVividsolutionsJtsGeomCoordinateSequence2 = _interopRequireDefault(_comVividsolutionsJtsGeomCoordinateSequence);

var _comVividsolutionsJtsAlgorithmRobustLineIntersector = require('com/vividsolutions/jts/algorithm/RobustLineIntersector');

var _comVividsolutionsJtsAlgorithmRobustLineIntersector2 = _interopRequireDefault(_comVividsolutionsJtsAlgorithmRobustLineIntersector);

var _comVividsolutionsJtsGeomEnvelope = require('com/vividsolutions/jts/geom/Envelope');

var _comVividsolutionsJtsGeomEnvelope2 = _interopRequireDefault(_comVividsolutionsJtsGeomEnvelope);

var _comVividsolutionsJtsAlgorithmRayCrossingCounter = require('com/vividsolutions/jts/algorithm/RayCrossingCounter');

var _comVividsolutionsJtsAlgorithmRayCrossingCounter2 = _interopRequireDefault(_comVividsolutionsJtsAlgorithmRayCrossingCounter);

var CGAlgorithms = (function () {
	function CGAlgorithms() {
		_classCallCheck(this, CGAlgorithms);

		this.init_.apply(this, arguments);
	}

	_createClass(CGAlgorithms, [{
		key: 'init_',
		value: function init_() {
			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			switch (args.length) {
				case 0:
					return (function () {
						for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
							args[_key2] = arguments[_key2];
						}
					}).apply(undefined, args);
			}
		}
	}, {
		key: 'interfaces_',
		get: function get() {
			return [];
		}
	}], [{
		key: 'orientationIndex',
		value: function orientationIndex(p1, p2, q) {
			return _comVividsolutionsJtsAlgorithmCGAlgorithmsDD2['default'].orientationIndex(p1, p2, q);
		}
	}, {
		key: 'signedArea',
		value: function signedArea() {
			var _this = this;

			for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
				args[_key3] = arguments[_key3];
			}

			switch (args.length) {
				case 1:
					if (args[0] instanceof Array) {
						return (function () {
							for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
								args[_key4] = arguments[_key4];
							}

							var ring = args[0];

							if (ring.length < 3) return 0.0;
							var sum = 0.0;
							var x0 = _this.x;
							for (var i = 1; i < ring.length - 1; i++) {
								var x = _this.x - x0;
								var y1 = _this.y;
								var y2 = _this.y;
								sum += x * (y2 - y1);
							}
							return sum / 2.0;
						}).apply(undefined, args);
					} else if (args[0].interfaces_ && args[0].interfaces_.indexOf(_comVividsolutionsJtsGeomCoordinateSequence2['default']) > -1) {
						return (function () {
							for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
								args[_key5] = arguments[_key5];
							}

							var ring = args[0];

							var n = ring.size();
							if (n < 3) return 0.0;
							var p0 = new _comVividsolutionsJtsGeomCoordinate2['default']();
							var p1 = new _comVividsolutionsJtsGeomCoordinate2['default']();
							var p2 = new _comVividsolutionsJtsGeomCoordinate2['default']();
							ring.getCoordinate(0, p1);
							ring.getCoordinate(1, p2);
							var x0 = p1.x;
							p2.x -= x0;
							var sum = 0.0;
							for (var i = 1; i < n - 1; i++) {
								p0.y = p1.y;
								p1.x = p2.x;
								p1.y = p2.y;
								ring.getCoordinate(i + 1, p2);
								p2.x -= x0;
								sum += p1.x * (p0.y - p2.y);
							}
							return sum / 2.0;
						}).apply(undefined, args);
					}
			}
		}
	}, {
		key: 'distanceLineLine',
		value: function distanceLineLine(A, B, C, D) {
			if (A.equals(B)) return CGAlgorithms.distancePointLine(A, C, D);
			if (C.equals(D)) return CGAlgorithms.distancePointLine(D, A, B);
			var noIntersection = false;
			if (!_comVividsolutionsJtsGeomEnvelope2['default'].intersects(A, B, C, D)) {
				noIntersection = true;
			} else {
				var denom = (B.x - A.x) * (D.y - C.y) - (B.y - A.y) * (D.x - C.x);
				if (denom === 0) {
					noIntersection = true;
				} else {
					var r_num = (A.y - C.y) * (D.x - C.x) - (A.x - C.x) * (D.y - C.y);
					var s_num = (A.y - C.y) * (B.x - A.x) - (A.x - C.x) * (B.y - A.y);
					var s = s_num / denom;
					var r = r_num / denom;
					if (r < 0 || (r > 1 || (s < 0 || s > 1))) {
						noIntersection = true;
					}
				}
			}
			if (noIntersection) {
				return _comVividsolutionsJtsMathMathUtil2['default'].min(CGAlgorithms.distancePointLine(A, C, D), CGAlgorithms.distancePointLine(B, C, D), CGAlgorithms.distancePointLine(C, A, B), CGAlgorithms.distancePointLine(D, A, B));
			}
			return 0.0;
		}
	}, {
		key: 'isPointInRing',
		value: function isPointInRing(p, ring) {
			return CGAlgorithms.locatePointInRing(p, ring) !== _comVividsolutionsJtsGeomLocation2['default'].EXTERIOR;
		}
	}, {
		key: 'isCCW',
		value: function isCCW(ring) {
			var nPts = ring.length - 1;
			if (nPts < 3) throw new IllegalArgumentException("Ring has fewer than 4 points, so orientation cannot be determined");
			var hiPt = ring[0];
			var hiIndex = 0;
			for (var i = 1; i <= nPts; i++) {
				var p = ring[i];
				if (p.y > hiPt.y) {
					hiPt = p;
					hiIndex = i;
				}
			}
			var iPrev = hiIndex;
			do {
				iPrev = iPrev - 1;
				if (iPrev < 0) iPrev = nPts;
			} while (ring[iPrev].equals2D(hiPt) && iPrev !== hiIndex);
			var iNext = hiIndex;
			do {
				iNext = (iNext + 1) % nPts;
			} while (ring[iNext].equals2D(hiPt) && iNext !== hiIndex);
			var prev = ring[iPrev];
			var next = ring[iNext];
			if (prev.equals2D(hiPt) || (next.equals2D(hiPt) || prev.equals2D(next))) return false;
			var disc = CGAlgorithms.computeOrientation(prev, hiPt, next);
			var isCCW = false;
			if (disc === 0) {
				isCCW = prev.x > next.x;
			} else {
				isCCW = disc > 0;
			}
			return isCCW;
		}
	}, {
		key: 'locatePointInRing',
		value: function locatePointInRing(p, ring) {
			return _comVividsolutionsJtsAlgorithmRayCrossingCounter2['default'].locatePointInRing(p, ring);
		}
	}, {
		key: 'distancePointLinePerpendicular',
		value: function distancePointLinePerpendicular(p, A, B) {
			var len2 = (B.x - A.x) * (B.x - A.x) + (B.y - A.y) * (B.y - A.y);
			var s = ((A.y - p.y) * (B.x - A.x) - (A.x - p.x) * (B.y - A.y)) / len2;
			return Math.abs(s) * Math.sqrt(len2);
		}
	}, {
		key: 'computeOrientation',
		value: function computeOrientation(p1, p2, q) {
			return CGAlgorithms.orientationIndex(p1, p2, q);
		}
	}, {
		key: 'distancePointLine',
		value: function distancePointLine() {
			for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
				args[_key6] = arguments[_key6];
			}

			switch (args.length) {
				case 2:
					return (function () {
						for (var _len7 = arguments.length, args = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
							args[_key7] = arguments[_key7];
						}

						var p = args[0];
						var line = args[1];

						if (line.length === 0) throw new IllegalArgumentException("Line array must contain at least one vertex");
						var minDistance = p.distance(line[0]);
						for (var i = 0; i < line.length - 1; i++) {
							var dist = CGAlgorithms.distancePointLine(p, line[i], line[i + 1]);
							if (dist < minDistance) {
								minDistance = dist;
							}
						}
						return minDistance;
					}).apply(undefined, args);
				case 3:
					return (function () {
						for (var _len8 = arguments.length, args = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
							args[_key8] = arguments[_key8];
						}

						var p = args[0];
						var A = args[1];
						var B = args[2];

						if (A.x === B.x && A.y === B.y) return p.distance(A);
						var len2 = (B.x - A.x) * (B.x - A.x) + (B.y - A.y) * (B.y - A.y);
						var r = ((p.x - A.x) * (B.x - A.x) + (p.y - A.y) * (B.y - A.y)) / len2;
						if (r <= 0.0) return p.distance(A);
						if (r >= 1.0) return p.distance(B);
						var s = ((A.y - p.y) * (B.x - A.x) - (A.x - p.x) * (B.y - A.y)) / len2;
						return Math.abs(s) * Math.sqrt(len2);
					}).apply(undefined, args);
			}
		}
	}, {
		key: 'isOnLine',
		value: function isOnLine(p, pt) {
			var lineIntersector = new _comVividsolutionsJtsAlgorithmRobustLineIntersector2['default']();
			for (var i = 1; i < pt.length; i++) {
				var p0 = pt[i - 1];
				var p1 = pt[i];
				lineIntersector.computeIntersection(p, p0, p1);
				if (lineIntersector.hasIntersection()) {
					return true;
				}
			}
			return false;
		}
	}, {
		key: 'distance',
		value: function distance(pts) {
			var n = pts.size();
			if (n <= 1) return 0.0;
			var len = 0.0;
			var p = new _comVividsolutionsJtsGeomCoordinate2['default']();
			pts.getCoordinate(0, p);
			var x0 = p.x;
			var y0 = p.y;
			for (var i = 1; i < n; i++) {
				pts.getCoordinate(i, p);
				var x1 = p.x;
				var y1 = p.y;
				var dx = x1 - x0;
				var dy = y1 - y0;
				len += Math.sqrt(dx * dx + dy * dy);
				x0 = x1;
				y0 = y1;
			}
			return len;
		}
	}]);

	return CGAlgorithms;
})();

exports['default'] = CGAlgorithms;

CGAlgorithms.CLOCKWISE = -1;
CGAlgorithms.RIGHT = CGAlgorithms.CLOCKWISE;
CGAlgorithms.COUNTERCLOCKWISE = 1;
CGAlgorithms.LEFT = CGAlgorithms.COUNTERCLOCKWISE;
CGAlgorithms.COLLINEAR = 0;
CGAlgorithms.STRAIGHT = CGAlgorithms.COLLINEAR;
module.exports = exports['default'];

},{"com/vividsolutions/jts/algorithm/CGAlgorithmsDD":3,"com/vividsolutions/jts/algorithm/RayCrossingCounter":8,"com/vividsolutions/jts/algorithm/RobustLineIntersector":11,"com/vividsolutions/jts/geom/Coordinate":15,"com/vividsolutions/jts/geom/CoordinateSequence":19,"com/vividsolutions/jts/geom/Envelope":24,"com/vividsolutions/jts/geom/Location":36,"com/vividsolutions/jts/math/MathUtil":83}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _comVividsolutionsJtsGeomCoordinate = require('com/vividsolutions/jts/geom/Coordinate');

var _comVividsolutionsJtsGeomCoordinate2 = _interopRequireDefault(_comVividsolutionsJtsGeomCoordinate);

var _comVividsolutionsJtsMathDD = require('com/vividsolutions/jts/math/DD');

var _comVividsolutionsJtsMathDD2 = _interopRequireDefault(_comVividsolutionsJtsMathDD);

var CGAlgorithmsDD = (function () {
	function CGAlgorithmsDD() {
		_classCallCheck(this, CGAlgorithmsDD);

		this.init_.apply(this, arguments);
	}

	_createClass(CGAlgorithmsDD, [{
		key: 'init_',
		value: function init_() {
			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			switch (args.length) {}
		}
	}, {
		key: 'interfaces_',
		get: function get() {
			return [];
		}
	}], [{
		key: 'orientationIndex',
		value: function orientationIndex(p1, p2, q) {
			var index = CGAlgorithmsDD.orientationIndexFilter(p1, p2, q);
			if (index <= 1) return index;
			var dx1 = _comVividsolutionsJtsMathDD2['default'].valueOf(p2.x).selfAdd(-p1.x);
			var dy1 = _comVividsolutionsJtsMathDD2['default'].valueOf(p2.y).selfAdd(-p1.y);
			var dx2 = _comVividsolutionsJtsMathDD2['default'].valueOf(q.x).selfAdd(-p2.x);
			var dy2 = _comVividsolutionsJtsMathDD2['default'].valueOf(q.y).selfAdd(-p2.y);
			return dx1.selfMultiply(dy2).selfSubtract(dy1.selfMultiply(dx2)).signum();
		}
	}, {
		key: 'signOfDet2x2',
		value: function signOfDet2x2(x1, y1, x2, y2) {
			var det = x1.multiply(y2).selfSubtract(y1.multiply(x2));
			return det.signum();
		}
	}, {
		key: 'intersection',
		value: function intersection(p1, p2, q1, q2) {
			var denom1 = _comVividsolutionsJtsMathDD2['default'].valueOf(q2.y).selfSubtract(q1.y).selfMultiply(_comVividsolutionsJtsMathDD2['default'].valueOf(p2.x).selfSubtract(p1.x));
			var denom2 = _comVividsolutionsJtsMathDD2['default'].valueOf(q2.x).selfSubtract(q1.x).selfMultiply(_comVividsolutionsJtsMathDD2['default'].valueOf(p2.y).selfSubtract(p1.y));
			var denom = denom1.subtract(denom2);
			var numx1 = _comVividsolutionsJtsMathDD2['default'].valueOf(q2.x).selfSubtract(q1.x).selfMultiply(_comVividsolutionsJtsMathDD2['default'].valueOf(p1.y).selfSubtract(q1.y));
			var numx2 = _comVividsolutionsJtsMathDD2['default'].valueOf(q2.y).selfSubtract(q1.y).selfMultiply(_comVividsolutionsJtsMathDD2['default'].valueOf(p1.x).selfSubtract(q1.x));
			var numx = numx1.subtract(numx2);
			var fracP = numx.selfDivide(denom).doubleValue();
			var x = _comVividsolutionsJtsMathDD2['default'].valueOf(p1.x).selfAdd(_comVividsolutionsJtsMathDD2['default'].valueOf(p2.x).selfSubtract(p1.x).selfMultiply(fracP)).doubleValue();
			var numy1 = _comVividsolutionsJtsMathDD2['default'].valueOf(p2.x).selfSubtract(p1.x).selfMultiply(_comVividsolutionsJtsMathDD2['default'].valueOf(p1.y).selfSubtract(q1.y));
			var numy2 = _comVividsolutionsJtsMathDD2['default'].valueOf(p2.y).selfSubtract(p1.y).selfMultiply(_comVividsolutionsJtsMathDD2['default'].valueOf(p1.x).selfSubtract(q1.x));
			var numy = numy1.subtract(numy2);
			var fracQ = numy.selfDivide(denom).doubleValue();
			var y = _comVividsolutionsJtsMathDD2['default'].valueOf(q1.y).selfAdd(_comVividsolutionsJtsMathDD2['default'].valueOf(q2.y).selfSubtract(q1.y).selfMultiply(fracQ)).doubleValue();
			return new _comVividsolutionsJtsGeomCoordinate2['default'](x, y);
		}
	}, {
		key: 'orientationIndexFilter',
		value: function orientationIndexFilter(pa, pb, pc) {
			var detsum = null;
			var detleft = (pa.x - pc.x) * (pb.y - pc.y);
			var detright = (pa.y - pc.y) * (pb.x - pc.x);
			var det = detleft - detright;
			if (detleft > 0.0) {
				if (detright <= 0.0) {
					return CGAlgorithmsDD.signum(det);
				} else {
					detsum = detleft + detright;
				}
			} else if (detleft < 0.0) {
				if (detright >= 0.0) {
					return CGAlgorithmsDD.signum(det);
				} else {
					detsum = -detleft - detright;
				}
			} else {
				return CGAlgorithmsDD.signum(det);
			}
			var errbound = CGAlgorithmsDD.DP_SAFE_EPSILON * detsum;
			if (det >= errbound || -det >= errbound) {
				return CGAlgorithmsDD.signum(det);
			}
			return 2;
		}
	}, {
		key: 'signum',
		value: function signum(x) {
			if (x > 0) return 1;
			if (x < 0) return -1;
			return 0;
		}
	}]);

	return CGAlgorithmsDD;
})();

exports['default'] = CGAlgorithmsDD;

CGAlgorithmsDD.DP_SAFE_EPSILON = 1e-15;
module.exports = exports['default'];

},{"com/vividsolutions/jts/geom/Coordinate":15,"com/vividsolutions/jts/math/DD":82}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _comVividsolutionsJtsAlgorithmNotRepresentableException = require('com/vividsolutions/jts/algorithm/NotRepresentableException');

var _comVividsolutionsJtsAlgorithmNotRepresentableException2 = _interopRequireDefault(_comVividsolutionsJtsAlgorithmNotRepresentableException);

var _comVividsolutionsJtsGeomCoordinate = require('com/vividsolutions/jts/geom/Coordinate');

var _comVividsolutionsJtsGeomCoordinate2 = _interopRequireDefault(_comVividsolutionsJtsGeomCoordinate);

var _javaLangDouble = require('java/lang/Double');

var _javaLangDouble2 = _interopRequireDefault(_javaLangDouble);

var HCoordinate = (function () {
	function HCoordinate() {
		_classCallCheck(this, HCoordinate);

		this.init_.apply(this, arguments);
	}

	_createClass(HCoordinate, [{
		key: 'init_',
		value: function init_() {
			var _this = this;

			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			this.x = null;
			this.y = null;
			this.w = null;
			switch (args.length) {
				case 0:
					return (function () {
						for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
							args[_key2] = arguments[_key2];
						}

						_this.x = 0.0;
						_this.y = 0.0;
						_this.w = 1.0;
					}).apply(undefined, args);
				case 1:
					return (function () {
						for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
							args[_key3] = arguments[_key3];
						}

						var p = args[0];

						_this.x = p.x;
						_this.y = p.y;
						_this.w = 1.0;
					}).apply(undefined, args);
				case 2:
					if (!Number.isInteger(args[0]) && !Number.isInteger(args[1])) {
						return (function () {
							for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
								args[_key4] = arguments[_key4];
							}

							var _x = args[0];
							var _y = args[1];

							_this.x = _x;
							_this.y = _y;
							_this.w = 1.0;
						}).apply(undefined, args);
					} else if (args[0] instanceof HCoordinate && args[1] instanceof HCoordinate) {
						return (function () {
							for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
								args[_key5] = arguments[_key5];
							}

							var p1 = args[0];
							var p2 = args[1];

							_this.x = p1.y * p2.w - p2.y * p1.w;
							_this.y = p2.x * p1.w - p1.x * p2.w;
							_this.w = p1.x * p2.y - p2.x * p1.y;
						}).apply(undefined, args);
					} else if (args[0] instanceof _comVividsolutionsJtsGeomCoordinate2['default'] && args[1] instanceof _comVividsolutionsJtsGeomCoordinate2['default']) {
						return (function () {
							for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
								args[_key6] = arguments[_key6];
							}

							var p1 = args[0];
							var p2 = args[1];

							_this.x = p1.y - p2.y;
							_this.y = p2.x - p1.x;
							_this.w = p1.x * p2.y - p2.x * p1.y;
						}).apply(undefined, args);
					}
				case 3:
					return (function () {
						for (var _len7 = arguments.length, args = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
							args[_key7] = arguments[_key7];
						}

						var _x = args[0];
						var _y = args[1];
						var _w = args[2];

						_this.x = _x;
						_this.y = _y;
						_this.w = _w;
					}).apply(undefined, args);
				case 4:
					return (function () {
						for (var _len8 = arguments.length, args = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
							args[_key8] = arguments[_key8];
						}

						var p1 = args[0];
						var p2 = args[1];
						var q1 = args[2];
						var q2 = args[3];

						var px = p1.y - p2.y;
						var py = p2.x - p1.x;
						var pw = p1.x * p2.y - p2.x * p1.y;
						var qx = q1.y - q2.y;
						var qy = q2.x - q1.x;
						var qw = q1.x * q2.y - q2.x * q1.y;
						_this.x = py * qw - qy * pw;
						_this.y = qx * pw - px * qw;
						_this.w = px * qy - qx * py;
					}).apply(undefined, args);
			}
		}
	}, {
		key: 'getY',
		value: function getY() {
			var a = this.y / this.w;
			if (_javaLangDouble2['default'].isNaN(a) || _javaLangDouble2['default'].isInfinite(a)) {
				throw new _comVividsolutionsJtsAlgorithmNotRepresentableException2['default']();
			}
			return a;
		}
	}, {
		key: 'getX',
		value: function getX() {
			var a = this.x / this.w;
			if (_javaLangDouble2['default'].isNaN(a) || _javaLangDouble2['default'].isInfinite(a)) {
				throw new _comVividsolutionsJtsAlgorithmNotRepresentableException2['default']();
			}
			return a;
		}
	}, {
		key: 'getCoordinate',
		value: function getCoordinate() {
			var p = new _comVividsolutionsJtsGeomCoordinate2['default']();
			p.x = this.getX();
			p.y = this.getY();
			return p;
		}
	}, {
		key: 'interfaces_',
		get: function get() {
			return [];
		}
	}], [{
		key: 'intersection',
		value: function intersection(p1, p2, q1, q2) {
			var px = p1.y - p2.y;
			var py = p2.x - p1.x;
			var pw = p1.x * p2.y - p2.x * p1.y;
			var qx = q1.y - q2.y;
			var qy = q2.x - q1.x;
			var qw = q1.x * q2.y - q2.x * q1.y;
			var x = py * qw - qy * pw;
			var y = qx * pw - px * qw;
			var w = px * qy - qx * py;
			var xInt = x / w;
			var yInt = y / w;
			if (_javaLangDouble2['default'].isNaN(xInt) || (_javaLangDouble2['default'].isInfinite(xInt) || _javaLangDouble2['default'].isNaN(yInt) || _javaLangDouble2['default'].isInfinite(yInt))) {
				throw new _comVividsolutionsJtsAlgorithmNotRepresentableException2['default']();
			}
			return new _comVividsolutionsJtsGeomCoordinate2['default'](xInt, yInt);
		}
	}]);

	return HCoordinate;
})();

exports['default'] = HCoordinate;
module.exports = exports['default'];

},{"com/vividsolutions/jts/algorithm/NotRepresentableException":6,"com/vividsolutions/jts/geom/Coordinate":15,"java/lang/Double":106}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _comVividsolutionsJtsGeomCoordinate = require('com/vividsolutions/jts/geom/Coordinate');

var _comVividsolutionsJtsGeomCoordinate2 = _interopRequireDefault(_comVividsolutionsJtsGeomCoordinate);

var _comVividsolutionsJtsUtilAssert = require('com/vividsolutions/jts/util/Assert');

var _comVividsolutionsJtsUtilAssert2 = _interopRequireDefault(_comVividsolutionsJtsUtilAssert);

var LineIntersector = (function () {
	function LineIntersector() {
		_classCallCheck(this, LineIntersector);

		this.init_.apply(this, arguments);
	}

	_createClass(LineIntersector, [{
		key: 'init_',
		value: function init_() {
			var _this = this;

			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			this.result = null;
			this.inputLines = [];
			this.intPt = [];
			this.intLineIndex = null;
			this.isProper = null;
			this.pa = null;
			this.pb = null;
			this.precisionModel = null;
			switch (args.length) {
				case 0:
					return (function () {
						for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
							args[_key2] = arguments[_key2];
						}

						_this.intPt[0] = new _comVividsolutionsJtsGeomCoordinate2['default']();
						_this.intPt[1] = new _comVividsolutionsJtsGeomCoordinate2['default']();
						_this.pa = _this.intPt[0];
						_this.pb = _this.intPt[1];
						_this.result = 0;
					}).apply(undefined, args);
			}
		}
	}, {
		key: 'getIndexAlongSegment',
		value: function getIndexAlongSegment(segmentIndex, intIndex) {
			this.computeIntLineIndex();
			return this.intLineIndex[segmentIndex][intIndex];
		}
	}, {
		key: 'getTopologySummary',
		value: function getTopologySummary() {
			var catBuf = new StringBuffer();
			if (this.isEndPoint()) catBuf.append(" endpoint");
			if (this.isProper) catBuf.append(" proper");
			if (this.isCollinear()) catBuf.append(" collinear");
			return catBuf.toString();
		}
	}, {
		key: 'computeIntersection',
		value: function computeIntersection(p1, p2, p3, p4) {
			this.inputLines[0][0] = p1;
			this.inputLines[0][1] = p2;
			this.inputLines[1][0] = p3;
			this.inputLines[1][1] = p4;
			this.result = this.computeIntersect(p1, p2, p3, p4);
		}
	}, {
		key: 'getIntersectionNum',
		value: function getIntersectionNum() {
			return this.result;
		}
	}, {
		key: 'computeIntLineIndex',
		value: function computeIntLineIndex() {
			var _this2 = this;

			for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
				args[_key3] = arguments[_key3];
			}

			switch (args.length) {
				case 1:
					return (function () {
						for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
							args[_key4] = arguments[_key4];
						}

						var segmentIndex = args[0];

						var dist0 = _this2.getEdgeDistance(segmentIndex, 0);
						var dist1 = _this2.getEdgeDistance(segmentIndex, 1);
						if (dist0 > dist1) {
							_this2.intLineIndex[segmentIndex][0] = 0;
							_this2.intLineIndex[segmentIndex][1] = 1;
						} else {
							_this2.intLineIndex[segmentIndex][0] = 1;
							_this2.intLineIndex[segmentIndex][1] = 0;
						}
					}).apply(undefined, args);
				case 0:
					return (function () {
						for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
							args[_key5] = arguments[_key5];
						}

						if (_this2.intLineIndex === null) {
							_this2.intLineIndex = [];
							_this2.computeIntLineIndex(0);
							_this2.computeIntLineIndex(1);
						}
					}).apply(undefined, args);
			}
		}
	}, {
		key: 'isProper',
		value: function isProper() {
			return this.hasIntersection() && this.isProper;
		}
	}, {
		key: 'setPrecisionModel',
		value: function setPrecisionModel(precisionModel) {
			this.precisionModel = precisionModel;
		}
	}, {
		key: 'isInteriorIntersection',
		value: function isInteriorIntersection() {
			var _this3 = this;

			for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
				args[_key6] = arguments[_key6];
			}

			switch (args.length) {
				case 1:
					return (function () {
						for (var _len7 = arguments.length, args = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
							args[_key7] = arguments[_key7];
						}

						var inputLineIndex = args[0];

						for (var i = 0; i < _this3.result; i++) {
							if (!(_this3.intPt[i].equals2D(_this3.inputLines[inputLineIndex][0]) || _this3.intPt[i].equals2D(_this3.inputLines[inputLineIndex][1]))) {
								return true;
							}
						}
						return false;
					}).apply(undefined, args);
				case 0:
					return (function () {
						for (var _len8 = arguments.length, args = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
							args[_key8] = arguments[_key8];
						}

						if (_this3.isInteriorIntersection(0)) return true;
						if (_this3.isInteriorIntersection(1)) return true;
						return false;
					}).apply(undefined, args);
			}
		}
	}, {
		key: 'getIntersection',
		value: function getIntersection(intIndex) {
			return this.intPt[intIndex];
		}
	}, {
		key: 'isEndPoint',
		value: function isEndPoint() {
			return this.hasIntersection() && !this.isProper;
		}
	}, {
		key: 'hasIntersection',
		value: function hasIntersection() {
			return this.result !== LineIntersector.NO_INTERSECTION;
		}
	}, {
		key: 'getEdgeDistance',
		value: function getEdgeDistance(segmentIndex, intIndex) {
			var dist = LineIntersector.computeEdgeDistance(this.intPt[intIndex], this.inputLines[segmentIndex][0], this.inputLines[segmentIndex][1]);
			return dist;
		}
	}, {
		key: 'isCollinear',
		value: function isCollinear() {
			return this.result === LineIntersector.COLLINEAR_INTERSECTION;
		}
	}, {
		key: 'setMakePrecise',
		value: function setMakePrecise(precisionModel) {
			this.precisionModel = precisionModel;
		}
	}, {
		key: 'getEndpoint',
		value: function getEndpoint(segmentIndex, ptIndex) {
			return this.inputLines[segmentIndex][ptIndex];
		}
	}, {
		key: 'isIntersection',
		value: function isIntersection(pt) {
			for (var i = 0; i < this.result; i++) {
				if (this.intPt[i].equals2D(pt)) {
					return true;
				}
			}
			return false;
		}
	}, {
		key: 'getIntersectionAlongSegment',
		value: function getIntersectionAlongSegment(segmentIndex, intIndex) {
			this.computeIntLineIndex();
			return this.intPt[this.intLineIndex[segmentIndex][intIndex]];
		}
	}, {
		key: 'interfaces_',
		get: function get() {
			return [];
		}
	}], [{
		key: 'computeEdgeDistance',
		value: function computeEdgeDistance(p, p0, p1) {
			var dx = Math.abs(p1.x - p0.x);
			var dy = Math.abs(p1.y - p0.y);
			var dist = -1.0;
			if (p.equals(p0)) {
				dist = 0.0;
			} else if (p.equals(p1)) {
				if (dx > dy) dist = dx;else dist = dy;
			} else {
				var pdx = Math.abs(p.x - p0.x);
				var pdy = Math.abs(p.y - p0.y);
				if (dx > dy) dist = pdx;else dist = pdy;
				if (dist === 0.0 && !p.equals(p0)) {
					dist = Math.max(pdx, pdy);
				}
			}
			_comVividsolutionsJtsUtilAssert2['default'].isTrue(!(dist === 0.0 && !p.equals(p0)), "Bad distance calculation");
			return dist;
		}
	}, {
		key: 'nonRobustComputeEdgeDistance',
		value: function nonRobustComputeEdgeDistance(p, p1, p2) {
			var dx = p.x - p1.x;
			var dy = p.y - p1.y;
			var dist = Math.sqrt(dx * dx + dy * dy);
			_comVividsolutionsJtsUtilAssert2['default'].isTrue(!(dist === 0.0 && !p.equals(p1)), "Invalid distance calculation");
			return dist;
		}
	}]);

	return LineIntersector;
})();

exports['default'] = LineIntersector;

LineIntersector.DONT_INTERSECT = 0;
LineIntersector.DO_INTERSECT = 1;
LineIntersector.COLLINEAR = 2;
LineIntersector.NO_INTERSECTION = 0;
LineIntersector.POINT_INTERSECTION = 1;
LineIntersector.COLLINEAR_INTERSECTION = 2;
module.exports = exports['default'];

},{"com/vividsolutions/jts/geom/Coordinate":15,"com/vividsolutions/jts/util/Assert":97}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _javaLangException = require('java/lang/Exception');

var _javaLangException2 = _interopRequireDefault(_javaLangException);

var NotRepresentableException = (function (_Exception) {
	_inherits(NotRepresentableException, _Exception);

	function NotRepresentableException() {
		_classCallCheck(this, NotRepresentableException);

		_get(Object.getPrototypeOf(NotRepresentableException.prototype), "constructor", this).call(this);
		this.init_.apply(this, arguments);
	}

	_createClass(NotRepresentableException, [{
		key: "init_",
		value: function init_() {
			var _this = this;

			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			_get(Object.getPrototypeOf(NotRepresentableException.prototype), "init_", this).call(this);
			switch (args.length) {
				case 0:
					return (function () {
						for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
							args[_key2] = arguments[_key2];
						}

						_get(Object.getPrototypeOf(NotRepresentableException.prototype), "init_", _this).call(_this, "Projective point not representable on the Cartesian plane.");
					}).apply(undefined, args);
			}
		}
	}, {
		key: "interfaces_",
		get: function get() {
			return [];
		}
	}]);

	return NotRepresentableException;
})(_javaLangException2["default"]);

exports["default"] = NotRepresentableException;
module.exports = exports["default"];

},{"java/lang/Exception":107}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _comVividsolutionsJtsGeomLocation = require('com/vividsolutions/jts/geom/Location');

var _comVividsolutionsJtsGeomLocation2 = _interopRequireDefault(_comVividsolutionsJtsGeomLocation);

var _comVividsolutionsJtsGeomLineString = require('com/vividsolutions/jts/geom/LineString');

var _comVividsolutionsJtsGeomLineString2 = _interopRequireDefault(_comVividsolutionsJtsGeomLineString);

var _comVividsolutionsJtsAlgorithmCGAlgorithms = require('com/vividsolutions/jts/algorithm/CGAlgorithms');

var _comVividsolutionsJtsAlgorithmCGAlgorithms2 = _interopRequireDefault(_comVividsolutionsJtsAlgorithmCGAlgorithms);

var _comVividsolutionsJtsGeomGeometry = require('com/vividsolutions/jts/geom/Geometry');

var _comVividsolutionsJtsGeomGeometry2 = _interopRequireDefault(_comVividsolutionsJtsGeomGeometry);

var _comVividsolutionsJtsGeomCoordinate = require('com/vividsolutions/jts/geom/Coordinate');

var _comVividsolutionsJtsGeomCoordinate2 = _interopRequireDefault(_comVividsolutionsJtsGeomCoordinate);

var _comVividsolutionsJtsGeomPoint = require('com/vividsolutions/jts/geom/Point');

var _comVividsolutionsJtsGeomPoint2 = _interopRequireDefault(_comVividsolutionsJtsGeomPoint);

var _comVividsolutionsJtsGeomPolygon = require('com/vividsolutions/jts/geom/Polygon');

var _comVividsolutionsJtsGeomPolygon2 = _interopRequireDefault(_comVividsolutionsJtsGeomPolygon);

var _comVividsolutionsJtsAlgorithmBoundaryNodeRule = require('com/vividsolutions/jts/algorithm/BoundaryNodeRule');

var _comVividsolutionsJtsAlgorithmBoundaryNodeRule2 = _interopRequireDefault(_comVividsolutionsJtsAlgorithmBoundaryNodeRule);

var _comVividsolutionsJtsGeomMultiPolygon = require('com/vividsolutions/jts/geom/MultiPolygon');

var _comVividsolutionsJtsGeomMultiPolygon2 = _interopRequireDefault(_comVividsolutionsJtsGeomMultiPolygon);

var _comVividsolutionsJtsGeomGeometryCollectionIterator = require('com/vividsolutions/jts/geom/GeometryCollectionIterator');

var _comVividsolutionsJtsGeomGeometryCollectionIterator2 = _interopRequireDefault(_comVividsolutionsJtsGeomGeometryCollectionIterator);

var _comVividsolutionsJtsGeomGeometryCollection = require('com/vividsolutions/jts/geom/GeometryCollection');

var _comVividsolutionsJtsGeomGeometryCollection2 = _interopRequireDefault(_comVividsolutionsJtsGeomGeometryCollection);

var _comVividsolutionsJtsGeomMultiLineString = require('com/vividsolutions/jts/geom/MultiLineString');

var _comVividsolutionsJtsGeomMultiLineString2 = _interopRequireDefault(_comVividsolutionsJtsGeomMultiLineString);

var PointLocator = (function () {
	function PointLocator() {
		_classCallCheck(this, PointLocator);

		this.init_.apply(this, arguments);
	}

	_createClass(PointLocator, [{
		key: 'init_',
		value: function init_() {
			var _this = this;

			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			this.boundaryRule = _comVividsolutionsJtsAlgorithmBoundaryNodeRule2['default'].OGC_SFS_BOUNDARY_RULE;
			this.isIn = null;
			this.numBoundaries = null;
			switch (args.length) {
				case 1:
					return (function () {
						for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
							args[_key2] = arguments[_key2];
						}

						var boundaryRule = args[0];

						if (boundaryRule === null) throw new IllegalArgumentException("Rule must be non-null");
						_this.boundaryRule = boundaryRule;
					}).apply(undefined, args);
				case 0:
					return (function () {
						for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
							args[_key3] = arguments[_key3];
						}
					}).apply(undefined, args);
			}
		}
	}, {
		key: 'locateInPolygonRing',
		value: function locateInPolygonRing(p, ring) {
			if (!ring.getEnvelopeInternal().intersects(p)) return _comVividsolutionsJtsGeomLocation2['default'].EXTERIOR;
			return _comVividsolutionsJtsAlgorithmCGAlgorithms2['default'].locatePointInRing(p, ring.getCoordinates());
		}
	}, {
		key: 'intersects',
		value: function intersects(p, geom) {
			return this.locate(p, geom) !== _comVividsolutionsJtsGeomLocation2['default'].EXTERIOR;
		}
	}, {
		key: 'updateLocationInfo',
		value: function updateLocationInfo(loc) {
			if (loc === _comVividsolutionsJtsGeomLocation2['default'].INTERIOR) this.isIn = true;
			if (loc === _comVividsolutionsJtsGeomLocation2['default'].BOUNDARY) this.numBoundaries++;
		}
	}, {
		key: 'computeLocation',
		value: function computeLocation(p, geom) {
			if (geom instanceof _comVividsolutionsJtsGeomPoint2['default']) {
				this.updateLocationInfo(this.locate(p, geom));
			}
			if (geom instanceof _comVividsolutionsJtsGeomLineString2['default']) {
				this.updateLocationInfo(this.locate(p, geom));
			} else if (geom instanceof _comVividsolutionsJtsGeomPolygon2['default']) {
				this.updateLocationInfo(this.locate(p, geom));
			} else if (geom instanceof _comVividsolutionsJtsGeomMultiLineString2['default']) {
				var ml = geom;
				for (var i = 0; i < ml.getNumGeometries(); i++) {
					var l = ml.getGeometryN(i);
					this.updateLocationInfo(this.locate(p, l));
				}
			} else if (geom instanceof _comVividsolutionsJtsGeomMultiPolygon2['default']) {
				var mpoly = geom;
				for (var i = 0; i < mpoly.getNumGeometries(); i++) {
					var poly = mpoly.getGeometryN(i);
					this.updateLocationInfo(this.locate(p, poly));
				}
			} else if (geom instanceof _comVividsolutionsJtsGeomGeometryCollection2['default']) {
				var geomi = new _comVividsolutionsJtsGeomGeometryCollectionIterator2['default'](geom);
				while (geomi.hasNext()) {
					var g2 = geomi.next();
					if (g2 !== geom) this.computeLocation(p, g2);
				}
			}
		}
	}, {
		key: 'locate',
		value: function locate() {
			var _this2 = this;

			for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
				args[_key4] = arguments[_key4];
			}

			switch (args.length) {
				case 2:
					if (args[0] instanceof _comVividsolutionsJtsGeomCoordinate2['default'] && args[1] instanceof _comVividsolutionsJtsGeomPoint2['default']) {
						return (function () {
							for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
								args[_key5] = arguments[_key5];
							}

							var p = args[0];
							var pt = args[1];

							var ptCoord = pt.getCoordinate();
							if (ptCoord.equals2D(p)) return _comVividsolutionsJtsGeomLocation2['default'].INTERIOR;
							return _comVividsolutionsJtsGeomLocation2['default'].EXTERIOR;
						}).apply(undefined, args);
					} else if (args[0] instanceof _comVividsolutionsJtsGeomCoordinate2['default'] && args[1] instanceof _comVividsolutionsJtsGeomLineString2['default']) {
						return (function () {
							for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
								args[_key6] = arguments[_key6];
							}

							var p = args[0];
							var l = args[1];

							if (!l.getEnvelopeInternal().intersects(p)) return _comVividsolutionsJtsGeomLocation2['default'].EXTERIOR;
							var pt = l.getCoordinates();
							if (!l.isClosed()) {
								if (p.equals(pt[0]) || p.equals(pt[pt.length - 1])) {
									return _comVividsolutionsJtsGeomLocation2['default'].BOUNDARY;
								}
							}
							if (_comVividsolutionsJtsAlgorithmCGAlgorithms2['default'].isOnLine(p, pt)) return _comVividsolutionsJtsGeomLocation2['default'].INTERIOR;
							return _comVividsolutionsJtsGeomLocation2['default'].EXTERIOR;
						}).apply(undefined, args);
					} else if (args[0] instanceof _comVividsolutionsJtsGeomCoordinate2['default'] && args[1] instanceof _comVividsolutionsJtsGeomPolygon2['default']) {
						return (function () {
							for (var _len7 = arguments.length, args = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
								args[_key7] = arguments[_key7];
							}

							var p = args[0];
							var poly = args[1];

							if (poly.isEmpty()) return _comVividsolutionsJtsGeomLocation2['default'].EXTERIOR;
							var shell = poly.getExteriorRing();
							var shellLoc = _this2.locateInPolygonRing(p, shell);
							if (shellLoc === _comVividsolutionsJtsGeomLocation2['default'].EXTERIOR) return _comVividsolutionsJtsGeomLocation2['default'].EXTERIOR;
							if (shellLoc === _comVividsolutionsJtsGeomLocation2['default'].BOUNDARY) return _comVividsolutionsJtsGeomLocation2['default'].BOUNDARY;
							for (var i = 0; i < poly.getNumInteriorRing(); i++) {
								var hole = poly.getInteriorRingN(i);
								var holeLoc = _this2.locateInPolygonRing(p, hole);
								if (holeLoc === _comVividsolutionsJtsGeomLocation2['default'].INTERIOR) return _comVividsolutionsJtsGeomLocation2['default'].EXTERIOR;
								if (holeLoc === _comVividsolutionsJtsGeomLocation2['default'].BOUNDARY) return _comVividsolutionsJtsGeomLocation2['default'].BOUNDARY;
							}
							return _comVividsolutionsJtsGeomLocation2['default'].INTERIOR;
						}).apply(undefined, args);
					} else if (args[0] instanceof _comVividsolutionsJtsGeomCoordinate2['default'] && args[1] instanceof _comVividsolutionsJtsGeomGeometry2['default']) {
						return (function () {
							for (var _len8 = arguments.length, args = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
								args[_key8] = arguments[_key8];
							}

							var p = args[0];
							var geom = args[1];

							if (geom.isEmpty()) return _comVividsolutionsJtsGeomLocation2['default'].EXTERIOR;
							if (geom instanceof _comVividsolutionsJtsGeomLineString2['default']) {
								return _this2.locate(p, geom);
							} else if (geom instanceof _comVividsolutionsJtsGeomPolygon2['default']) {
								return _this2.locate(p, geom);
							}
							_this2.isIn = false;
							_this2.numBoundaries = 0;
							_this2.computeLocation(p, geom);
							if (_this2.boundaryRule.isInBoundary(_this2.numBoundaries)) return _comVividsolutionsJtsGeomLocation2['default'].BOUNDARY;
							if (_this2.numBoundaries > 0 || _this2.isIn) return _comVividsolutionsJtsGeomLocation2['default'].INTERIOR;
							return _comVividsolutionsJtsGeomLocation2['default'].EXTERIOR;
						}).apply(undefined, args);
					}
			}
		}
	}, {
		key: 'interfaces_',
		get: function get() {
			return [];
		}
	}]);

	return PointLocator;
})();

exports['default'] = PointLocator;
module.exports = exports['default'];

},{"com/vividsolutions/jts/algorithm/BoundaryNodeRule":1,"com/vividsolutions/jts/algorithm/CGAlgorithms":2,"com/vividsolutions/jts/geom/Coordinate":15,"com/vividsolutions/jts/geom/Geometry":25,"com/vividsolutions/jts/geom/GeometryCollection":26,"com/vividsolutions/jts/geom/GeometryCollectionIterator":27,"com/vividsolutions/jts/geom/LineString":33,"com/vividsolutions/jts/geom/Location":36,"com/vividsolutions/jts/geom/MultiLineString":37,"com/vividsolutions/jts/geom/MultiPolygon":39,"com/vividsolutions/jts/geom/Point":40,"com/vividsolutions/jts/geom/Polygon":41}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _comVividsolutionsJtsGeomLocation = require('com/vividsolutions/jts/geom/Location');

var _comVividsolutionsJtsGeomLocation2 = _interopRequireDefault(_comVividsolutionsJtsGeomLocation);

var _comVividsolutionsJtsGeomCoordinate = require('com/vividsolutions/jts/geom/Coordinate');

var _comVividsolutionsJtsGeomCoordinate2 = _interopRequireDefault(_comVividsolutionsJtsGeomCoordinate);

var _comVividsolutionsJtsGeomCoordinateSequence = require('com/vividsolutions/jts/geom/CoordinateSequence');

var _comVividsolutionsJtsGeomCoordinateSequence2 = _interopRequireDefault(_comVividsolutionsJtsGeomCoordinateSequence);

var _comVividsolutionsJtsAlgorithmRobustDeterminant = require('com/vividsolutions/jts/algorithm/RobustDeterminant');

var _comVividsolutionsJtsAlgorithmRobustDeterminant2 = _interopRequireDefault(_comVividsolutionsJtsAlgorithmRobustDeterminant);

var RayCrossingCounter = (function () {
	function RayCrossingCounter() {
		_classCallCheck(this, RayCrossingCounter);

		this.init_.apply(this, arguments);
	}

	_createClass(RayCrossingCounter, [{
		key: 'init_',
		value: function init_() {
			var _this = this;

			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			this.p = null;
			this.crossingCount = 0;
			this.isPointOnSegment = false;
			switch (args.length) {
				case 1:
					return (function () {
						for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
							args[_key2] = arguments[_key2];
						}

						var p = args[0];

						_this.p = p;
					}).apply(undefined, args);
			}
		}
	}, {
		key: 'countSegment',
		value: function countSegment(p1, p2) {
			if (p1.x < this.p.x && p2.x < this.p.x) return null;
			if (this.p.x === p2.x && this.p.y === p2.y) {
				this.isPointOnSegment = true;
				return null;
			}
			if (p1.y === this.p.y && p2.y === this.p.y) {
				var minx = p1.x;
				var maxx = p2.x;
				if (minx > maxx) {
					minx = p2.x;
					maxx = p1.x;
				}
				if (this.p.x >= minx && this.p.x <= maxx) {
					this.isPointOnSegment = true;
				}
				return null;
			}
			if (p1.y > this.p.y && p2.y <= this.p.y || p2.y > this.p.y && p1.y <= this.p.y) {
				var x1 = p1.x - this.p.x;
				var y1 = p1.y - this.p.y;
				var x2 = p2.x - this.p.x;
				var y2 = p2.y - this.p.y;
				var xIntSign = _comVividsolutionsJtsAlgorithmRobustDeterminant2['default'].signOfDet2x2(x1, y1, x2, y2);
				if (xIntSign === 0.0) {
					this.isPointOnSegment = true;
					return null;
				}
				if (y2 < y1) xIntSign = -xIntSign;
				if (xIntSign > 0.0) {
					this.crossingCount++;
				}
			}
		}
	}, {
		key: 'isPointInPolygon',
		value: function isPointInPolygon() {
			return this.getLocation() !== _comVividsolutionsJtsGeomLocation2['default'].EXTERIOR;
		}
	}, {
		key: 'getLocation',
		value: function getLocation() {
			if (this.isPointOnSegment) return _comVividsolutionsJtsGeomLocation2['default'].BOUNDARY;
			if (this.crossingCount % 2 === 1) {
				return _comVividsolutionsJtsGeomLocation2['default'].INTERIOR;
			}
			return _comVividsolutionsJtsGeomLocation2['default'].EXTERIOR;
		}
	}, {
		key: 'isOnSegment',
		value: function isOnSegment() {
			return this.isPointOnSegment;
		}
	}, {
		key: 'interfaces_',
		get: function get() {
			return [];
		}
	}], [{
		key: 'locatePointInRing',
		value: function locatePointInRing() {
			for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
				args[_key3] = arguments[_key3];
			}

			switch (args.length) {
				case 2:
					if (args[0] instanceof _comVividsolutionsJtsGeomCoordinate2['default'] && args[1] instanceof Array) {
						return (function () {
							for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
								args[_key4] = arguments[_key4];
							}

							var p = args[0];
							var ring = args[1];

							var counter = new RayCrossingCounter(p);
							for (var i = 1; i < ring.length; i++) {
								var p1 = ring[i];
								var p2 = ring[i - 1];
								counter.countSegment(p1, p2);
								if (counter.isOnSegment()) return counter.getLocation();
							}
							return counter.getLocation();
						}).apply(undefined, args);
					} else if (args[0] instanceof _comVividsolutionsJtsGeomCoordinate2['default'] && (args[1].interfaces_ && args[1].interfaces_.indexOf(_comVividsolutionsJtsGeomCoordinateSequence2['default']) > -1)) {
						return (function () {
							for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
								args[_key5] = arguments[_key5];
							}

							var p = args[0];
							var ring = args[1];

							var counter = new RayCrossingCounter(p);
							var p1 = new _comVividsolutionsJtsGeomCoordinate2['default']();
							var p2 = new _comVividsolutionsJtsGeomCoordinate2['default']();
							for (var i = 1; i < ring.size(); i++) {
								ring.getCoordinate(i, p1);
								ring.getCoordinate(i - 1, p2);
								counter.countSegment(p1, p2);
								if (counter.isOnSegment()) return counter.getLocation();
							}
							return counter.getLocation();
						}).apply(undefined, args);
					}
			}
		}
	}]);

	return RayCrossingCounter;
})();

exports['default'] = RayCrossingCounter;
module.exports = exports['default'];

},{"com/vividsolutions/jts/algorithm/RobustDeterminant":10,"com/vividsolutions/jts/geom/Coordinate":15,"com/vividsolutions/jts/geom/CoordinateSequence":19,"com/vividsolutions/jts/geom/Location":36}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _comVividsolutionsJtsGeomCoordinate = require('com/vividsolutions/jts/geom/Coordinate');

var _comVividsolutionsJtsGeomCoordinate2 = _interopRequireDefault(_comVividsolutionsJtsGeomCoordinate);

var _comVividsolutionsJtsAlgorithmRobustLineIntersector = require('com/vividsolutions/jts/algorithm/RobustLineIntersector');

var _comVividsolutionsJtsAlgorithmRobustLineIntersector2 = _interopRequireDefault(_comVividsolutionsJtsAlgorithmRobustLineIntersector);

var _comVividsolutionsJtsGeomEnvelope = require('com/vividsolutions/jts/geom/Envelope');

var _comVividsolutionsJtsGeomEnvelope2 = _interopRequireDefault(_comVividsolutionsJtsGeomEnvelope);

var RectangleLineIntersector = (function () {
	function RectangleLineIntersector() {
		_classCallCheck(this, RectangleLineIntersector);

		this.init_.apply(this, arguments);
	}

	_createClass(RectangleLineIntersector, [{
		key: 'init_',
		value: function init_() {
			var _this = this;

			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			this.li = new _comVividsolutionsJtsAlgorithmRobustLineIntersector2['default']();
			this.rectEnv = null;
			this.diagUp0 = null;
			this.diagUp1 = null;
			this.diagDown0 = null;
			this.diagDown1 = null;
			switch (args.length) {
				case 1:
					return (function () {
						for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
							args[_key2] = arguments[_key2];
						}

						var rectEnv = args[0];

						_this.rectEnv = rectEnv;
						_this.diagUp0 = new _comVividsolutionsJtsGeomCoordinate2['default'](rectEnv.getMinX(), rectEnv.getMinY());
						_this.diagUp1 = new _comVividsolutionsJtsGeomCoordinate2['default'](rectEnv.getMaxX(), rectEnv.getMaxY());
						_this.diagDown0 = new _comVividsolutionsJtsGeomCoordinate2['default'](rectEnv.getMinX(), rectEnv.getMaxY());
						_this.diagDown1 = new _comVividsolutionsJtsGeomCoordinate2['default'](rectEnv.getMaxX(), rectEnv.getMinY());
					}).apply(undefined, args);
			}
		}
	}, {
		key: 'intersects',
		value: function intersects(p0, p1) {
			var segEnv = new _comVividsolutionsJtsGeomEnvelope2['default'](p0, p1);
			if (!this.rectEnv.intersects(segEnv)) return false;
			if (this.rectEnv.intersects(p0)) return true;
			if (this.rectEnv.intersects(p1)) return true;
			if (p0.compareTo(p1) > 0) {
				var tmp = p0;
				p0 = p1;
				p1 = tmp;
			}
			var isSegUpwards = false;
			if (p1.y > p0.y) isSegUpwards = true;
			if (isSegUpwards) {
				this.li.computeIntersection(p0, p1, this.diagDown0, this.diagDown1);
			} else {
				this.li.computeIntersection(p0, p1, this.diagUp0, this.diagUp1);
			}
			if (this.li.hasIntersection()) return true;
			return false;
		}
	}, {
		key: 'interfaces_',
		get: function get() {
			return [];
		}
	}]);

	return RectangleLineIntersector;
})();

exports['default'] = RectangleLineIntersector;
module.exports = exports['default'];

},{"com/vividsolutions/jts/algorithm/RobustLineIntersector":11,"com/vividsolutions/jts/geom/Coordinate":15,"com/vividsolutions/jts/geom/Envelope":24}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RobustDeterminant = (function () {
	function RobustDeterminant() {
		_classCallCheck(this, RobustDeterminant);

		this.init_.apply(this, arguments);
	}

	_createClass(RobustDeterminant, [{
		key: "init_",
		value: function init_() {
			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			switch (args.length) {}
		}
	}, {
		key: "interfaces_",
		get: function get() {
			return [];
		}
	}], [{
		key: "orientationIndex",
		value: function orientationIndex(p1, p2, q) {
			var dx1 = p2.x - p1.x;
			var dy1 = p2.y - p1.y;
			var dx2 = q.x - p2.x;
			var dy2 = q.y - p2.y;
			return RobustDeterminant.signOfDet2x2(dx1, dy1, dx2, dy2);
		}
	}, {
		key: "signOfDet2x2",
		value: function signOfDet2x2(x1, y1, x2, y2) {
			var sign = null;
			var swap = null;
			var k = null;
			var count = 0;
			sign = 1;
			if (x1 === 0.0 || y2 === 0.0) {
				if (y1 === 0.0 || x2 === 0.0) {
					return 0;
				} else if (y1 > 0) {
					if (x2 > 0) {
						return -sign;
					} else {
						return sign;
					}
				} else {
					if (x2 > 0) {
						return sign;
					} else {
						return -sign;
					}
				}
			}
			if (y1 === 0.0 || x2 === 0.0) {
				if (y2 > 0) {
					if (x1 > 0) {
						return sign;
					} else {
						return -sign;
					}
				} else {
					if (x1 > 0) {
						return -sign;
					} else {
						return sign;
					}
				}
			}
			if (0.0 < y1) {
				if (0.0 < y2) {
					if (y1 <= y2) {
						;
					} else {
						sign = -sign;
						swap = x1;
						x1 = x2;
						x2 = swap;
						swap = y1;
						y1 = y2;
						y2 = swap;
					}
				} else {
					if (y1 <= -y2) {
						sign = -sign;
						x2 = -x2;
						y2 = -y2;
					} else {
						swap = x1;
						x1 = -x2;
						x2 = swap;
						swap = y1;
						y1 = -y2;
						y2 = swap;
					}
				}
			} else {
				if (0.0 < y2) {
					if (-y1 <= y2) {
						sign = -sign;
						x1 = -x1;
						y1 = -y1;
					} else {
						swap = -x1;
						x1 = x2;
						x2 = swap;
						swap = -y1;
						y1 = y2;
						y2 = swap;
					}
				} else {
					if (y1 >= y2) {
						x1 = -x1;
						y1 = -y1;
						x2 = -x2;
						y2 = -y2;
						;
					} else {
						sign = -sign;
						swap = -x1;
						x1 = -x2;
						x2 = swap;
						swap = -y1;
						y1 = -y2;
						y2 = swap;
					}
				}
			}
			if (0.0 < x1) {
				if (0.0 < x2) {
					if (x1 <= x2) {
						;
					} else {
						return sign;
					}
				} else {
					return sign;
				}
			} else {
				if (0.0 < x2) {
					return -sign;
				} else {
					if (x1 >= x2) {
						sign = -sign;
						x1 = -x1;
						x2 = -x2;
						;
					} else {
						return -sign;
					}
				}
			}
			while (true) {
				count = count + 1;
				k = Math.floor(x2 / x1);
				x2 = x2 - k * x1;
				y2 = y2 - k * y1;
				if (y2 < 0.0) {
					return -sign;
				}
				if (y2 > y1) {
					return sign;
				}
				if (x1 > x2 + x2) {
					if (y1 < y2 + y2) {
						return sign;
					}
				} else {
					if (y1 > y2 + y2) {
						return -sign;
					} else {
						x2 = x1 - x2;
						y2 = y1 - y2;
						sign = -sign;
					}
				}
				if (y2 === 0.0) {
					if (x2 === 0.0) {
						return 0;
					} else {
						return -sign;
					}
				}
				if (x2 === 0.0) {
					return sign;
				}
				k = Math.floor(x1 / x2);
				x1 = x1 - k * x2;
				y1 = y1 - k * y2;
				if (y1 < 0.0) {
					return sign;
				}
				if (y1 > y2) {
					return -sign;
				}
				if (x2 > x1 + x1) {
					if (y2 < y1 + y1) {
						return -sign;
					}
				} else {
					if (y2 > y1 + y1) {
						return sign;
					} else {
						x1 = x2 - x1;
						y1 = y2 - y1;
						sign = -sign;
					}
				}
				if (y1 === 0.0) {
					if (x1 === 0.0) {
						return 0;
					} else {
						return sign;
					}
				}
				if (x1 === 0.0) {
					return -sign;
				}
			}
		}
	}]);

	return RobustDeterminant;
})();

exports["default"] = RobustDeterminant;
module.exports = exports["default"];

},{}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _comVividsolutionsJtsAlgorithmNotRepresentableException = require('com/vividsolutions/jts/algorithm/NotRepresentableException');

var _comVividsolutionsJtsAlgorithmNotRepresentableException2 = _interopRequireDefault(_comVividsolutionsJtsAlgorithmNotRepresentableException);

var _comVividsolutionsJtsAlgorithmCGAlgorithms = require('com/vividsolutions/jts/algorithm/CGAlgorithms');

var _comVividsolutionsJtsAlgorithmCGAlgorithms2 = _interopRequireDefault(_comVividsolutionsJtsAlgorithmCGAlgorithms);

var _comVividsolutionsJtsGeomCoordinate = require('com/vividsolutions/jts/geom/Coordinate');

var _comVividsolutionsJtsGeomCoordinate2 = _interopRequireDefault(_comVividsolutionsJtsGeomCoordinate);

var _comVividsolutionsJtsAlgorithmCGAlgorithmsDD = require('com/vividsolutions/jts/algorithm/CGAlgorithmsDD');

var _comVividsolutionsJtsAlgorithmCGAlgorithmsDD2 = _interopRequireDefault(_comVividsolutionsJtsAlgorithmCGAlgorithmsDD);

var _comVividsolutionsJtsAlgorithmHCoordinate = require('com/vividsolutions/jts/algorithm/HCoordinate');

var _comVividsolutionsJtsAlgorithmHCoordinate2 = _interopRequireDefault(_comVividsolutionsJtsAlgorithmHCoordinate);

var _comVividsolutionsJtsGeomEnvelope = require('com/vividsolutions/jts/geom/Envelope');

var _comVividsolutionsJtsGeomEnvelope2 = _interopRequireDefault(_comVividsolutionsJtsGeomEnvelope);

var _comVividsolutionsJtsAlgorithmLineIntersector = require('com/vividsolutions/jts/algorithm/LineIntersector');

var _comVividsolutionsJtsAlgorithmLineIntersector2 = _interopRequireDefault(_comVividsolutionsJtsAlgorithmLineIntersector);

var RobustLineIntersector = (function (_LineIntersector) {
	_inherits(RobustLineIntersector, _LineIntersector);

	function RobustLineIntersector() {
		_classCallCheck(this, RobustLineIntersector);

		_get(Object.getPrototypeOf(RobustLineIntersector.prototype), 'constructor', this).call(this);
		this.init_.apply(this, arguments);
	}

	_createClass(RobustLineIntersector, [{
		key: 'init_',
		value: function init_() {
			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			_get(Object.getPrototypeOf(RobustLineIntersector.prototype), 'init_', this).call(this);
			switch (args.length) {
				case 0:
					return (function () {
						for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
							args[_key2] = arguments[_key2];
						}
					}).apply(undefined, args);
			}
		}
	}, {
		key: 'isInSegmentEnvelopes',
		value: function isInSegmentEnvelopes(intPt) {
			var env0 = new _comVividsolutionsJtsGeomEnvelope2['default'](this.inputLines[0][0], this.inputLines[0][1]);
			var env1 = new _comVividsolutionsJtsGeomEnvelope2['default'](this.inputLines[1][0], this.inputLines[1][1]);
			return env0.contains(intPt) && env1.contains(intPt);
		}
	}, {
		key: 'computeIntersection',
		value: function computeIntersection(p, p1, p2) {
			this.isProper = false;
			if (_comVividsolutionsJtsGeomEnvelope2['default'].intersects(p1, p2, p)) {
				if (_comVividsolutionsJtsAlgorithmCGAlgorithms2['default'].orientationIndex(p1, p2, p) === 0 && _comVividsolutionsJtsAlgorithmCGAlgorithms2['default'].orientationIndex(p2, p1, p) === 0) {
					this.isProper = true;
					if (p.equals(p1) || p.equals(p2)) {
						this.isProper = false;
					}
					this.result = _comVividsolutionsJtsAlgorithmLineIntersector2['default'].POINT_INTERSECTION;
					return null;
				}
			}
			this.result = _comVividsolutionsJtsAlgorithmLineIntersector2['default'].NO_INTERSECTION;
		}
	}, {
		key: 'normalizeToMinimum',
		value: function normalizeToMinimum(n1, n2, n3, n4, normPt) {
			normPt.x = this.smallestInAbsValue(n1.x, n2.x, n3.x, n4.x);
			normPt.y = this.smallestInAbsValue(n1.y, n2.y, n3.y, n4.y);
			n1.x -= normPt.x;
			n1.y -= normPt.y;
			n2.x -= normPt.x;
			n2.y -= normPt.y;
			n3.x -= normPt.x;
			n3.y -= normPt.y;
			n4.x -= normPt.x;
			n4.y -= normPt.y;
		}
	}, {
		key: 'safeHCoordinateIntersection',
		value: function safeHCoordinateIntersection(p1, p2, q1, q2) {
			var intPt = null;
			try {
				intPt = _comVividsolutionsJtsAlgorithmHCoordinate2['default'].intersection(p1, p2, q1, q2);
			} catch (e) {
				if (e instanceof _comVividsolutionsJtsAlgorithmNotRepresentableException2['default']) {
					intPt = RobustLineIntersector.nearestEndpoint(p1, p2, q1, q2);
				}
			} finally {}
			return intPt;
		}
	}, {
		key: 'intersection',
		value: function intersection(p1, p2, q1, q2) {
			var intPt = this.intersectionWithNormalization(p1, p2, q1, q2);
			if (!this.isInSegmentEnvelopes(intPt)) {
				intPt = new _comVividsolutionsJtsGeomCoordinate2['default'](RobustLineIntersector.nearestEndpoint(p1, p2, q1, q2));
			}
			if (this.precisionModel !== null) {
				this.precisionModel.makePrecise(intPt);
			}
			return intPt;
		}
	}, {
		key: 'smallestInAbsValue',
		value: function smallestInAbsValue(x1, x2, x3, x4) {
			var x = x1;
			var xabs = Math.abs(x);
			if (Math.abs(x2) < xabs) {
				x = x2;
				xabs = Math.abs(x2);
			}
			if (Math.abs(x3) < xabs) {
				x = x3;
				xabs = Math.abs(x3);
			}
			if (Math.abs(x4) < xabs) {
				x = x4;
			}
			return x;
		}
	}, {
		key: 'checkDD',
		value: function checkDD(p1, p2, q1, q2, intPt) {
			var intPtDD = _comVividsolutionsJtsAlgorithmCGAlgorithmsDD2['default'].intersection(p1, p2, q1, q2);
			var isIn = this.isInSegmentEnvelopes(intPtDD);
			System.out.println("DD in env = " + (isIn + ("  --------------------- " + intPtDD)));
			if (intPt.distance(intPtDD) > 0.0001) {
				System.out.println("Distance = " + intPt.distance(intPtDD));
			}
		}
	}, {
		key: 'intersectionWithNormalization',
		value: function intersectionWithNormalization(p1, p2, q1, q2) {
			var n1 = new _comVividsolutionsJtsGeomCoordinate2['default'](p1);
			var n2 = new _comVividsolutionsJtsGeomCoordinate2['default'](p2);
			var n3 = new _comVividsolutionsJtsGeomCoordinate2['default'](q1);
			var n4 = new _comVividsolutionsJtsGeomCoordinate2['default'](q2);
			var normPt = new _comVividsolutionsJtsGeomCoordinate2['default']();
			this.normalizeToEnvCentre(n1, n2, n3, n4, normPt);
			var intPt = this.safeHCoordinateIntersection(n1, n2, n3, n4);
			intPt.x += normPt.x;
			intPt.y += normPt.y;
			return intPt;
		}
	}, {
		key: 'computeCollinearIntersection',
		value: function computeCollinearIntersection(p1, p2, q1, q2) {
			var p1q1p2 = _comVividsolutionsJtsGeomEnvelope2['default'].intersects(p1, p2, q1);
			var p1q2p2 = _comVividsolutionsJtsGeomEnvelope2['default'].intersects(p1, p2, q2);
			var q1p1q2 = _comVividsolutionsJtsGeomEnvelope2['default'].intersects(q1, q2, p1);
			var q1p2q2 = _comVividsolutionsJtsGeomEnvelope2['default'].intersects(q1, q2, p2);
			if (p1q1p2 && p1q2p2) {
				this.intPt[0] = q1;
				this.intPt[1] = q2;
				return _comVividsolutionsJtsAlgorithmLineIntersector2['default'].COLLINEAR_INTERSECTION;
			}
			if (q1p1q2 && q1p2q2) {
				this.intPt[0] = p1;
				this.intPt[1] = p2;
				return _comVividsolutionsJtsAlgorithmLineIntersector2['default'].COLLINEAR_INTERSECTION;
			}
			if (p1q1p2 && q1p1q2) {
				this.intPt[0] = q1;
				this.intPt[1] = p1;
				return q1.equals(p1) && (!p1q2p2 && !q1p2q2) ? _comVividsolutionsJtsAlgorithmLineIntersector2['default'].POINT_INTERSECTION : _comVividsolutionsJtsAlgorithmLineIntersector2['default'].COLLINEAR_INTERSECTION;
			}
			if (p1q1p2 && q1p2q2) {
				this.intPt[0] = q1;
				this.intPt[1] = p2;
				return q1.equals(p2) && (!p1q2p2 && !q1p1q2) ? _comVividsolutionsJtsAlgorithmLineIntersector2['default'].POINT_INTERSECTION : _comVividsolutionsJtsAlgorithmLineIntersector2['default'].COLLINEAR_INTERSECTION;
			}
			if (p1q2p2 && q1p1q2) {
				this.intPt[0] = q2;
				this.intPt[1] = p1;
				return q2.equals(p1) && (!p1q1p2 && !q1p2q2) ? _comVividsolutionsJtsAlgorithmLineIntersector2['default'].POINT_INTERSECTION : _comVividsolutionsJtsAlgorithmLineIntersector2['default'].COLLINEAR_INTERSECTION;
			}
			if (p1q2p2 && q1p2q2) {
				this.intPt[0] = q2;
				this.intPt[1] = p2;
				return q2.equals(p2) && (!p1q1p2 && !q1p1q2) ? _comVividsolutionsJtsAlgorithmLineIntersector2['default'].POINT_INTERSECTION : _comVividsolutionsJtsAlgorithmLineIntersector2['default'].COLLINEAR_INTERSECTION;
			}
			return _comVividsolutionsJtsAlgorithmLineIntersector2['default'].NO_INTERSECTION;
		}
	}, {
		key: 'normalizeToEnvCentre',
		value: function normalizeToEnvCentre(n00, n01, n10, n11, normPt) {
			var minX0 = n00.x < n01.x ? n00.x : n01.x;
			var minY0 = n00.y < n01.y ? n00.y : n01.y;
			var maxX0 = n00.x > n01.x ? n00.x : n01.x;
			var maxY0 = n00.y > n01.y ? n00.y : n01.y;
			var minX1 = n10.x < n11.x ? n10.x : n11.x;
			var minY1 = n10.y < n11.y ? n10.y : n11.y;
			var maxX1 = n10.x > n11.x ? n10.x : n11.x;
			var maxY1 = n10.y > n11.y ? n10.y : n11.y;
			var intMinX = minX0 > minX1 ? minX0 : minX1;
			var intMaxX = maxX0 < maxX1 ? maxX0 : maxX1;
			var intMinY = minY0 > minY1 ? minY0 : minY1;
			var intMaxY = maxY0 < maxY1 ? maxY0 : maxY1;
			var intMidX = (intMinX + intMaxX) / 2.0;
			var intMidY = (intMinY + intMaxY) / 2.0;
			normPt.x = intMidX;
			normPt.y = intMidY;
			n00.x -= normPt.x;
			n00.y -= normPt.y;
			n01.x -= normPt.x;
			n01.y -= normPt.y;
			n10.x -= normPt.x;
			n10.y -= normPt.y;
			n11.x -= normPt.x;
			n11.y -= normPt.y;
		}
	}, {
		key: 'computeIntersect',
		value: function computeIntersect(p1, p2, q1, q2) {
			this.isProper = false;
			if (!_comVividsolutionsJtsGeomEnvelope2['default'].intersects(p1, p2, q1, q2)) return _comVividsolutionsJtsAlgorithmLineIntersector2['default'].NO_INTERSECTION;
			var Pq1 = _comVividsolutionsJtsAlgorithmCGAlgorithms2['default'].orientationIndex(p1, p2, q1);
			var Pq2 = _comVividsolutionsJtsAlgorithmCGAlgorithms2['default'].orientationIndex(p1, p2, q2);
			if (Pq1 > 0 && Pq2 > 0 || Pq1 < 0 && Pq2 < 0) {
				return _comVividsolutionsJtsAlgorithmLineIntersector2['default'].NO_INTERSECTION;
			}
			var Qp1 = _comVividsolutionsJtsAlgorithmCGAlgorithms2['default'].orientationIndex(q1, q2, p1);
			var Qp2 = _comVividsolutionsJtsAlgorithmCGAlgorithms2['default'].orientationIndex(q1, q2, p2);
			if (Qp1 > 0 && Qp2 > 0 || Qp1 < 0 && Qp2 < 0) {
				return _comVividsolutionsJtsAlgorithmLineIntersector2['default'].NO_INTERSECTION;
			}
			var collinear = Pq1 === 0 && Pq2 === 0 && Qp1 === 0 && Qp2 === 0;
			if (collinear) {
				return this.computeCollinearIntersection(p1, p2, q1, q2);
			}
			if (Pq1 === 0 || Pq2 === 0 || Qp1 === 0 || Qp2 === 0) {
				this.isProper = false;
				if (p1.equals2D(q1) || p1.equals2D(q2)) {
					this.intPt[0] = p1;
				} else if (p2.equals2D(q1) || p2.equals2D(q2)) {
					this.intPt[0] = p2;
				} else if (Pq1 === 0) {
					this.intPt[0] = new _comVividsolutionsJtsGeomCoordinate2['default'](q1);
				} else if (Pq2 === 0) {
					this.intPt[0] = new _comVividsolutionsJtsGeomCoordinate2['default'](q2);
				} else if (Qp1 === 0) {
					this.intPt[0] = new _comVividsolutionsJtsGeomCoordinate2['default'](p1);
				} else if (Qp2 === 0) {
					this.intPt[0] = new _comVividsolutionsJtsGeomCoordinate2['default'](p2);
				}
			} else {
				this.isProper = true;
				this.intPt[0] = this.intersection(p1, p2, q1, q2);
			}
			return _comVividsolutionsJtsAlgorithmLineIntersector2['default'].POINT_INTERSECTION;
		}
	}, {
		key: 'interfaces_',
		get: function get() {
			return [];
		}
	}], [{
		key: 'nearestEndpoint',
		value: function nearestEndpoint(p1, p2, q1, q2) {
			var nearestPt = p1;
			var minDist = _comVividsolutionsJtsAlgorithmCGAlgorithms2['default'].distancePointLine(p1, q1, q2);
			var dist = _comVividsolutionsJtsAlgorithmCGAlgorithms2['default'].distancePointLine(p2, q1, q2);
			if (dist < minDist) {
				minDist = dist;
				nearestPt = p2;
			}
			dist = _comVividsolutionsJtsAlgorithmCGAlgorithms2['default'].distancePointLine(q1, p1, p2);
			if (dist < minDist) {
				minDist = dist;
				nearestPt = q1;
			}
			dist = _comVividsolutionsJtsAlgorithmCGAlgorithms2['default'].distancePointLine(q2, p1, p2);
			if (dist < minDist) {
				minDist = dist;
				nearestPt = q2;
			}
			return nearestPt;
		}
	}]);

	return RobustLineIntersector;
})(_comVividsolutionsJtsAlgorithmLineIntersector2['default']);

exports['default'] = RobustLineIntersector;
module.exports = exports['default'];

},{"com/vividsolutions/jts/algorithm/CGAlgorithms":2,"com/vividsolutions/jts/algorithm/CGAlgorithmsDD":3,"com/vividsolutions/jts/algorithm/HCoordinate":4,"com/vividsolutions/jts/algorithm/LineIntersector":5,"com/vividsolutions/jts/algorithm/NotRepresentableException":6,"com/vividsolutions/jts/geom/Coordinate":15,"com/vividsolutions/jts/geom/Envelope":24}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _comVividsolutionsJtsIndexItemVisitor = require('com/vividsolutions/jts/index/ItemVisitor');

var _comVividsolutionsJtsIndexItemVisitor2 = _interopRequireDefault(_comVividsolutionsJtsIndexItemVisitor);

var _comVividsolutionsJtsAlgorithmLocatePointOnGeometryLocator = require('com/vividsolutions/jts/algorithm/locate/PointOnGeometryLocator');

var _comVividsolutionsJtsAlgorithmLocatePointOnGeometryLocator2 = _interopRequireDefault(_comVividsolutionsJtsAlgorithmLocatePointOnGeometryLocator);

var _comVividsolutionsJtsIndexIntervalrtreeSortedPackedIntervalRTree = require('com/vividsolutions/jts/index/intervalrtree/SortedPackedIntervalRTree');

var _comVividsolutionsJtsIndexIntervalrtreeSortedPackedIntervalRTree2 = _interopRequireDefault(_comVividsolutionsJtsIndexIntervalrtreeSortedPackedIntervalRTree);

var _comVividsolutionsJtsGeomLineSegment = require('com/vividsolutions/jts/geom/LineSegment');

var _comVividsolutionsJtsGeomLineSegment2 = _interopRequireDefault(_comVividsolutionsJtsGeomLineSegment);

var _comVividsolutionsJtsGeomPolygonal = require('com/vividsolutions/jts/geom/Polygonal');

var _comVividsolutionsJtsGeomPolygonal2 = _interopRequireDefault(_comVividsolutionsJtsGeomPolygonal);

var _comVividsolutionsJtsGeomUtilLinearComponentExtracter = require('com/vividsolutions/jts/geom/util/LinearComponentExtracter');

var _comVividsolutionsJtsGeomUtilLinearComponentExtracter2 = _interopRequireDefault(_comVividsolutionsJtsGeomUtilLinearComponentExtracter);

var _comVividsolutionsJtsIndexArrayListVisitor = require('com/vividsolutions/jts/index/ArrayListVisitor');

var _comVividsolutionsJtsIndexArrayListVisitor2 = _interopRequireDefault(_comVividsolutionsJtsIndexArrayListVisitor);

var _comVividsolutionsJtsAlgorithmRayCrossingCounter = require('com/vividsolutions/jts/algorithm/RayCrossingCounter');

var _comVividsolutionsJtsAlgorithmRayCrossingCounter2 = _interopRequireDefault(_comVividsolutionsJtsAlgorithmRayCrossingCounter);

var IndexedPointInAreaLocator = (function () {
	function IndexedPointInAreaLocator() {
		_classCallCheck(this, IndexedPointInAreaLocator);

		this.init_.apply(this, arguments);
	}

	_createClass(IndexedPointInAreaLocator, [{
		key: 'init_',
		value: function init_() {
			var _this = this;

			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			this.index = null;
			switch (args.length) {
				case 1:
					return (function () {
						for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
							args[_key2] = arguments[_key2];
						}

						var g = args[0];

						if (!(g instanceof _comVividsolutionsJtsGeomPolygonal2['default'])) throw new IllegalArgumentException("Argument must be Polygonal");
						_this.index = new IntervalIndexedGeometry(g);
					}).apply(undefined, args);
			}
		}
	}, {
		key: 'locate',
		value: function locate(p) {
			var rcc = new _comVividsolutionsJtsAlgorithmRayCrossingCounter2['default'](p);
			var visitor = new SegmentVisitor(rcc);
			this.index.query(p.y, p.y, visitor);
			return rcc.getLocation();
		}
	}, {
		key: 'interfaces_',
		get: function get() {
			return [_comVividsolutionsJtsAlgorithmLocatePointOnGeometryLocator2['default']];
		}
	}]);

	return IndexedPointInAreaLocator;
})();

exports['default'] = IndexedPointInAreaLocator;

var SegmentVisitor = (function () {
	function SegmentVisitor() {
		_classCallCheck(this, SegmentVisitor);

		this.init_.apply(this, arguments);
	}

	_createClass(SegmentVisitor, [{
		key: 'init_',
		value: function init_() {
			var _this2 = this;

			for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
				args[_key3] = arguments[_key3];
			}

			this.counter = null;
			switch (args.length) {
				case 1:
					return (function () {
						for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
							args[_key4] = arguments[_key4];
						}

						var counter = args[0];

						_this2.counter = counter;
					}).apply(undefined, args);
			}
		}
	}, {
		key: 'visitItem',
		value: function visitItem(item) {
			var seg = item;
			this.counter.countSegment(seg.getCoordinate(0), seg.getCoordinate(1));
		}
	}, {
		key: 'interfaces_',
		get: function get() {
			return [_comVividsolutionsJtsIndexItemVisitor2['default']];
		}
	}]);

	return SegmentVisitor;
})();

IndexedPointInAreaLocator.SegmentVisitor = SegmentVisitor;

var IntervalIndexedGeometry = (function () {
	function IntervalIndexedGeometry() {
		_classCallCheck(this, IntervalIndexedGeometry);

		this.init_.apply(this, arguments);
	}

	_createClass(IntervalIndexedGeometry, [{
		key: 'init_',
		value: function init_() {
			var _this3 = this;

			for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
				args[_key5] = arguments[_key5];
			}

			this.index = new _comVividsolutionsJtsIndexIntervalrtreeSortedPackedIntervalRTree2['default']();
			switch (args.length) {
				case 1:
					return (function () {
						for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
							args[_key6] = arguments[_key6];
						}

						var geom = args[0];

						_this3.init(geom);
					}).apply(undefined, args);
			}
		}
	}, {
		key: 'init',
		value: function init(geom) {
			var lines = _comVividsolutionsJtsGeomUtilLinearComponentExtracter2['default'].getLines(geom);
			for (var i = lines.iterator(); i.hasNext();) {
				var line = i.next();
				var pts = line.getCoordinates();
				this.addLine(pts);
			}
		}
	}, {
		key: 'addLine',
		value: function addLine(pts) {
			for (var i = 1; i < pts.length; i++) {
				var seg = new _comVividsolutionsJtsGeomLineSegment2['default'](pts[i - 1], pts[i]);
				var min = Math.min(seg.p0.y, seg.p1.y);
				var max = Math.max(seg.p0.y, seg.p1.y);
				this.index.insert(min, max, seg);
			}
		}
	}, {
		key: 'query',
		value: function query() {
			var _this4 = this;

			for (var _len7 = arguments.length, args = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
				args[_key7] = arguments[_key7];
			}

			switch (args.length) {
				case 2:
					return (function () {
						for (var _len8 = arguments.length, args = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
							args[_key8] = arguments[_key8];
						}

						var min = args[0];
						var max = args[1];

						var visitor = new _comVividsolutionsJtsIndexArrayListVisitor2['default']();
						_this4.index.query(min, max, visitor);
						return visitor.getItems();
					}).apply(undefined, args);
				case 3:
					return (function () {
						for (var _len9 = arguments.length, args = Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
							args[_key9] = arguments[_key9];
						}

						var min = args[0];
						var max = args[1];
						var visitor = args[2];

						_this4.index.query(min, max, visitor);
					}).apply(undefined, args);
			}
		}
	}, {
		key: 'interfaces_',
		get: function get() {
			return [];
		}
	}]);

	return IntervalIndexedGeometry;
})();

IndexedPointInAreaLocator.IntervalIndexedGeometry = IntervalIndexedGeometry;
module.exports = exports['default'];

},{"com/vividsolutions/jts/algorithm/RayCrossingCounter":8,"com/vividsolutions/jts/algorithm/locate/PointOnGeometryLocator":13,"com/vividsolutions/jts/geom/LineSegment":32,"com/vividsolutions/jts/geom/Polygonal":42,"com/vividsolutions/jts/geom/util/LinearComponentExtracter":49,"com/vividsolutions/jts/index/ArrayListVisitor":75,"com/vividsolutions/jts/index/ItemVisitor":76,"com/vividsolutions/jts/index/intervalrtree/SortedPackedIntervalRTree":80}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PointOnGeometryLocator = (function () {
	function PointOnGeometryLocator() {
		_classCallCheck(this, PointOnGeometryLocator);

		this.init_.apply(this, arguments);
	}

	_createClass(PointOnGeometryLocator, [{
		key: "init_",
		value: function init_() {
			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			switch (args.length) {}
		}
	}, {
		key: "locate",
		value: function locate(p) {}
	}, {
		key: "interfaces_",
		get: function get() {
			return [];
		}
	}]);

	return PointOnGeometryLocator;
})();

exports["default"] = PointOnGeometryLocator;
module.exports = exports["default"];

},{}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _comVividsolutionsJtsGeomLocation = require('com/vividsolutions/jts/geom/Location');

var _comVividsolutionsJtsGeomLocation2 = _interopRequireDefault(_comVividsolutionsJtsGeomLocation);

var _comVividsolutionsJtsAlgorithmCGAlgorithms = require('com/vividsolutions/jts/algorithm/CGAlgorithms');

var _comVividsolutionsJtsAlgorithmCGAlgorithms2 = _interopRequireDefault(_comVividsolutionsJtsAlgorithmCGAlgorithms);

var _comVividsolutionsJtsGeomPolygon = require('com/vividsolutions/jts/geom/Polygon');

var _comVividsolutionsJtsGeomPolygon2 = _interopRequireDefault(_comVividsolutionsJtsGeomPolygon);

var _comVividsolutionsJtsAlgorithmLocatePointOnGeometryLocator = require('com/vividsolutions/jts/algorithm/locate/PointOnGeometryLocator');

var _comVividsolutionsJtsAlgorithmLocatePointOnGeometryLocator2 = _interopRequireDefault(_comVividsolutionsJtsAlgorithmLocatePointOnGeometryLocator);

var _comVividsolutionsJtsGeomGeometryCollectionIterator = require('com/vividsolutions/jts/geom/GeometryCollectionIterator');

var _comVividsolutionsJtsGeomGeometryCollectionIterator2 = _interopRequireDefault(_comVividsolutionsJtsGeomGeometryCollectionIterator);

var _comVividsolutionsJtsGeomGeometryCollection = require('com/vividsolutions/jts/geom/GeometryCollection');

var _comVividsolutionsJtsGeomGeometryCollection2 = _interopRequireDefault(_comVividsolutionsJtsGeomGeometryCollection);

var SimplePointInAreaLocator = (function () {
	function SimplePointInAreaLocator() {
		_classCallCheck(this, SimplePointInAreaLocator);

		this.init_.apply(this, arguments);
	}

	_createClass(SimplePointInAreaLocator, [{
		key: 'init_',
		value: function init_() {
			var _this = this;

			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			this.geom = null;
			switch (args.length) {
				case 1:
					return (function () {
						for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
							args[_key2] = arguments[_key2];
						}

						var geom = args[0];

						_this.geom = geom;
					}).apply(undefined, args);
			}
		}
	}, {
		key: 'locate',
		value: function locate(p) {
			return SimplePointInAreaLocator.locate(p, this.geom);
		}
	}, {
		key: 'interfaces_',
		get: function get() {
			return [_comVividsolutionsJtsAlgorithmLocatePointOnGeometryLocator2['default']];
		}
	}], [{
		key: 'isPointInRing',
		value: function isPointInRing(p, ring) {
			if (!ring.getEnvelopeInternal().intersects(p)) return false;
			return _comVividsolutionsJtsAlgorithmCGAlgorithms2['default'].isPointInRing(p, ring.getCoordinates());
		}
	}, {
		key: 'containsPointInPolygon',
		value: function containsPointInPolygon(p, poly) {
			if (poly.isEmpty()) return false;
			var shell = poly.getExteriorRing();
			if (!SimplePointInAreaLocator.isPointInRing(p, shell)) return false;
			for (var i = 0; i < poly.getNumInteriorRing(); i++) {
				var hole = poly.getInteriorRingN(i);
				if (SimplePointInAreaLocator.isPointInRing(p, hole)) return false;
			}
			return true;
		}
	}, {
		key: 'containsPoint',
		value: function containsPoint(p, geom) {
			if (geom instanceof _comVividsolutionsJtsGeomPolygon2['default']) {
				return SimplePointInAreaLocator.containsPointInPolygon(p, geom);
			} else if (geom instanceof _comVividsolutionsJtsGeomGeometryCollection2['default']) {
				var geomi = new _comVividsolutionsJtsGeomGeometryCollectionIterator2['default'](geom);
				while (geomi.hasNext()) {
					var g2 = geomi.next();
					if (g2 !== geom) if (SimplePointInAreaLocator.containsPoint(p, g2)) return true;
				}
			}
			return false;
		}
	}, {
		key: 'locate',
		value: function locate(p, geom) {
			if (geom.isEmpty()) return _comVividsolutionsJtsGeomLocation2['default'].EXTERIOR;
			if (SimplePointInAreaLocator.containsPoint(p, geom)) return _comVividsolutionsJtsGeomLocation2['default'].INTERIOR;
			return _comVividsolutionsJtsGeomLocation2['default'].EXTERIOR;
		}
	}]);

	return SimplePointInAreaLocator;
})();

exports['default'] = SimplePointInAreaLocator;
module.exports = exports['default'];

},{"com/vividsolutions/jts/algorithm/CGAlgorithms":2,"com/vividsolutions/jts/algorithm/locate/PointOnGeometryLocator":13,"com/vividsolutions/jts/geom/GeometryCollection":26,"com/vividsolutions/jts/geom/GeometryCollectionIterator":27,"com/vividsolutions/jts/geom/Location":36,"com/vividsolutions/jts/geom/Polygon":41}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _comVividsolutionsJtsUtilNumberUtil = require('com/vividsolutions/jts/util/NumberUtil');

var _comVividsolutionsJtsUtilNumberUtil2 = _interopRequireDefault(_comVividsolutionsJtsUtilNumberUtil);

var _javaLangDouble = require('java/lang/Double');

var _javaLangDouble2 = _interopRequireDefault(_javaLangDouble);

var _javaLangComparable = require('java/lang/Comparable');

var _javaLangComparable2 = _interopRequireDefault(_javaLangComparable);

var _javaLangCloneable = require('java/lang/Cloneable');

var _javaLangCloneable2 = _interopRequireDefault(_javaLangCloneable);

var _javaUtilComparator = require('java/util/Comparator');

var _javaUtilComparator2 = _interopRequireDefault(_javaUtilComparator);

var _javaIoSerializable = require('java/io/Serializable');

var _javaIoSerializable2 = _interopRequireDefault(_javaIoSerializable);

var _comVividsolutionsJtsUtilAssert = require('com/vividsolutions/jts/util/Assert');

var _comVividsolutionsJtsUtilAssert2 = _interopRequireDefault(_comVividsolutionsJtsUtilAssert);

var Coordinate = (function () {
	function Coordinate() {
		_classCallCheck(this, Coordinate);

		this.init_.apply(this, arguments);
	}

	_createClass(Coordinate, [{
		key: 'init_',
		value: function init_() {
			var _this = this;

			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			this.x = null;
			this.y = null;
			this.z = null;
			switch (args.length) {
				case 2:
					return (function () {
						for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
							args[_key2] = arguments[_key2];
						}

						var x = args[0];
						var y = args[1];

						_this.init_(x, y, Coordinate.NULL_ORDINATE);
					}).apply(undefined, args);
				case 1:
					return (function () {
						for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
							args[_key3] = arguments[_key3];
						}

						var c = args[0];

						_this.init_(c.x, c.y, c.z);
					}).apply(undefined, args);
				case 3:
					return (function () {
						for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
							args[_key4] = arguments[_key4];
						}

						var x = args[0];
						var y = args[1];
						var z = args[2];

						_this.x = x;
						_this.y = y;
						_this.z = z;
					}).apply(undefined, args);
				case 0:
					return (function () {
						for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
							args[_key5] = arguments[_key5];
						}

						_this.init_(0.0, 0.0);
					}).apply(undefined, args);
			}
		}
	}, {
		key: 'setOrdinate',
		value: function setOrdinate(ordinateIndex, value) {
			switch (ordinateIndex) {
				case Coordinate.X:
					this.x = value;
					break;
				case Coordinate.Y:
					this.y = value;
					break;
				case Coordinate.Z:
					this.z = value;
					break;
				default:
					throw new IllegalArgumentException("Invalid ordinate index: " + ordinateIndex);
			}
		}
	}, {
		key: 'equals2D',
		value: function equals2D() {
			var _this2 = this;

			for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
				args[_key6] = arguments[_key6];
			}

			switch (args.length) {
				case 2:
					return (function () {
						for (var _len7 = arguments.length, args = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
							args[_key7] = arguments[_key7];
						}

						var c = args[0];
						var tolerance = args[1];

						if (!_comVividsolutionsJtsUtilNumberUtil2['default'].equalsWithTolerance(_this2.x, c.x, tolerance)) {
							return false;
						}
						if (!_comVividsolutionsJtsUtilNumberUtil2['default'].equalsWithTolerance(_this2.y, c.y, tolerance)) {
							return false;
						}
						return true;
					}).apply(undefined, args);
				case 1:
					return (function () {
						for (var _len8 = arguments.length, args = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
							args[_key8] = arguments[_key8];
						}

						var other = args[0];

						if (_this2.x !== other.x) {
							return false;
						}
						if (_this2.y !== other.y) {
							return false;
						}
						return true;
					}).apply(undefined, args);
			}
		}
	}, {
		key: 'getOrdinate',
		value: function getOrdinate(ordinateIndex) {
			switch (ordinateIndex) {
				case Coordinate.X:
					return this.x;
				case Coordinate.Y:
					return this.y;
				case Coordinate.Z:
					return this.z;
			}
			throw new IllegalArgumentException("Invalid ordinate index: " + ordinateIndex);
		}
	}, {
		key: 'equals3D',
		value: function equals3D(other) {
			return this.x === other.x && (this.y === other.y && (this.z === other.z || _javaLangDouble2['default'].isNaN(this.z) && _javaLangDouble2['default'].isNaN(other.z)));
		}
	}, {
		key: 'equals',
		value: function equals(other) {
			if (!(other instanceof Coordinate)) {
				return false;
			}
			return this.equals2D(other);
		}
	}, {
		key: 'equalInZ',
		value: function equalInZ(c, tolerance) {
			return _comVividsolutionsJtsUtilNumberUtil2['default'].equalsWithTolerance(this.z, c.z, tolerance);
		}
	}, {
		key: 'compareTo',
		value: function compareTo(o) {
			var other = o;
			if (this.x < other.x) return -1;
			if (this.x > other.x) return 1;
			if (this.y < other.y) return -1;
			if (this.y > other.y) return 1;
			return 0;
		}
	}, {
		key: 'clone',
		value: function clone() {
			try {
				var coord = _get(Object.getPrototypeOf(Coordinate.prototype), 'clone', this).call(this);
				return coord;
			} catch (e) {
				if (e instanceof CloneNotSupportedException) {
					_comVividsolutionsJtsUtilAssert2['default'].shouldNeverReachHere("this shouldn't happen because this class is Cloneable");
					return null;
				}
			} finally {}
		}
	}, {
		key: 'toString',
		value: function toString() {
			return "(" + (this.x + (", " + (this.y + (", " + (this.z + ")")))));
		}
	}, {
		key: 'distance3D',
		value: function distance3D(c) {
			var dx = this.x - c.x;
			var dy = this.y - c.y;
			var dz = this.z - c.z;
			return Math.sqrt(dx * dx + dy * dy + dz * dz);
		}
	}, {
		key: 'distance',
		value: function distance(c) {
			var dx = this.x - c.x;
			var dy = this.y - c.y;
			return Math.sqrt(dx * dx + dy * dy);
		}
	}, {
		key: 'hashCode',
		value: function hashCode() {
			var result = 17;
			result = 37 * result + Coordinate.hashCode(this.x);
			result = 37 * result + Coordinate.hashCode(this.y);
			return result;
		}
	}, {
		key: 'setCoordinate',
		value: function setCoordinate(other) {
			this.x = other.x;
			this.y = other.y;
			this.z = other.z;
		}
	}, {
		key: 'interfaces_',
		get: function get() {
			return [_javaLangComparable2['default'], _javaLangCloneable2['default'], _javaIoSerializable2['default']];
		}
	}], [{
		key: 'hashCode',
		value: function hashCode(x) {
			var f = _javaLangDouble2['default'].doubleToLongBits(x);
			return f ^ f >>> 32;
		}
	}]);

	return Coordinate;
})();

exports['default'] = Coordinate;

var DimensionalComparator = (function () {
	function DimensionalComparator() {
		_classCallCheck(this, DimensionalComparator);

		this.init_.apply(this, arguments);
	}

	_createClass(DimensionalComparator, [{
		key: 'init_',
		value: function init_() {
			var _this3 = this;

			for (var _len9 = arguments.length, args = Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
				args[_key9] = arguments[_key9];
			}

			this.dimensionsToTest = 2;
			switch (args.length) {
				case 1:
					return (function () {
						for (var _len10 = arguments.length, args = Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
							args[_key10] = arguments[_key10];
						}

						var dimensionsToTest = args[0];

						if (dimensionsToTest !== 2 && dimensionsToTest !== 3) throw new IllegalArgumentException("only 2 or 3 dimensions may be specified");
						_this3.dimensionsToTest = dimensionsToTest;
					}).apply(undefined, args);
				case 0:
					return (function () {
						for (var _len11 = arguments.length, args = Array(_len11), _key11 = 0; _key11 < _len11; _key11++) {
							args[_key11] = arguments[_key11];
						}

						_this3.init_(2);
					}).apply(undefined, args);
			}
		}
	}, {
		key: 'compare',
		value: function compare(o1, o2) {
			var c1 = o1;
			var c2 = o2;
			var compX = DimensionalComparator.compare(c1.x, c2.x);
			if (compX !== 0) return compX;
			var compY = DimensionalComparator.compare(c1.y, c2.y);
			if (compY !== 0) return compY;
			if (this.dimensionsToTest <= 2) return 0;
			var compZ = DimensionalComparator.compare(c1.z, c2.z);
			return compZ;
		}
	}, {
		key: 'interfaces_',
		get: function get() {
			return [_javaUtilComparator2['default']];
		}
	}], [{
		key: 'compare',
		value: function compare(a, b) {
			if (a < b) return -1;
			if (a > b) return 1;
			if (_javaLangDouble2['default'].isNaN(a)) {
				if (_javaLangDouble2['default'].isNaN(b)) return 0;
				return -1;
			}
			if (_javaLangDouble2['default'].isNaN(b)) return 1;
			return 0;
		}
	}]);

	return DimensionalComparator;
})();

Coordinate.DimensionalComparator = DimensionalComparator;
Coordinate.serialVersionUID = 6683108902428366910;
Coordinate.NULL_ORDINATE = _javaLangDouble2['default'].NaN;
Coordinate.X = 0;
Coordinate.Y = 1;
Coordinate.Z = 2;
module.exports = exports['default'];

},{"com/vividsolutions/jts/util/Assert":97,"com/vividsolutions/jts/util/NumberUtil":99,"java/io/Serializable":101,"java/lang/Cloneable":104,"java/lang/Comparable":105,"java/lang/Double":106,"java/util/Comparator":115}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _comVividsolutionsJtsGeomCoordinateList = require('com/vividsolutions/jts/geom/CoordinateList');

var _comVividsolutionsJtsGeomCoordinateList2 = _interopRequireDefault(_comVividsolutionsJtsGeomCoordinateList);

var _comVividsolutionsJtsGeomCoordinate = require('com/vividsolutions/jts/geom/Coordinate');

var _comVividsolutionsJtsGeomCoordinate2 = _interopRequireDefault(_comVividsolutionsJtsGeomCoordinate);

var _comVividsolutionsJtsMathMathUtil = require('com/vividsolutions/jts/math/MathUtil');

var _comVividsolutionsJtsMathMathUtil2 = _interopRequireDefault(_comVividsolutionsJtsMathMathUtil);

var _javaUtilComparator = require('java/util/Comparator');

var _javaUtilComparator2 = _interopRequireDefault(_javaUtilComparator);

var _comVividsolutionsJtsGeomEnvelope = require('com/vividsolutions/jts/geom/Envelope');

var _comVividsolutionsJtsGeomEnvelope2 = _interopRequireDefault(_comVividsolutionsJtsGeomEnvelope);

var CoordinateArrays = (function () {
	function CoordinateArrays() {
		_classCallCheck(this, CoordinateArrays);

		this.init_.apply(this, arguments);
	}

	_createClass(CoordinateArrays, [{
		key: 'init_',
		value: function init_() {
			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			switch (args.length) {}
		}
	}, {
		key: 'interfaces_',
		get: function get() {
			return [];
		}
	}], [{
		key: 'isRing',
		value: function isRing(pts) {
			if (pts.length < 4) return false;
			if (!pts[0].equals2D(pts[pts.length - 1])) return false;
			return true;
		}
	}, {
		key: 'ptNotInList',
		value: function ptNotInList(testPts, pts) {
			for (var i = 0; i < testPts.length; i++) {
				var testPt = testPts[i];
				if (CoordinateArrays.indexOf(testPt, pts) < 0) return testPt;
			}
			return null;
		}
	}, {
		key: 'scroll',
		value: function scroll(coordinates, firstCoordinate) {
			var i = CoordinateArrays.indexOf(firstCoordinate, coordinates);
			if (i < 0) return null;
			var newCoordinates = [];
			System.arraycopy(coordinates, i, newCoordinates, 0, coordinates.length - i);
			System.arraycopy(coordinates, 0, newCoordinates, coordinates.length - i, i);
			System.arraycopy(newCoordinates, 0, coordinates, 0, coordinates.length);
		}
	}, {
		key: 'equals',
		value: function equals() {
			for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
				args[_key2] = arguments[_key2];
			}

			switch (args.length) {
				case 2:
					return (function () {
						for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
							args[_key3] = arguments[_key3];
						}

						var coord1 = args[0];
						var coord2 = args[1];

						if (coord1 === coord2) return true;
						if (coord1 === null || coord2 === null) return false;
						if (coord1.length !== coord2.length) return false;
						for (var i = 0; i < coord1.length; i++) {
							if (!coord1[i].equals(coord2[i])) return false;
						}
						return true;
					}).apply(undefined, args);
				case 3:
					return (function () {
						for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
							args[_key4] = arguments[_key4];
						}

						var coord1 = args[0];
						var coord2 = args[1];
						var coordinateComparator = args[2];

						if (coord1 === coord2) return true;
						if (coord1 === null || coord2 === null) return false;
						if (coord1.length !== coord2.length) return false;
						for (var i = 0; i < coord1.length; i++) {
							if (coordinateComparator.compare(coord1[i], coord2[i]) !== 0) return false;
						}
						return true;
					}).apply(undefined, args);
			}
		}
	}, {
		key: 'intersection',
		value: function intersection(coordinates, env) {
			var coordList = new _comVividsolutionsJtsGeomCoordinateList2['default']();
			for (var i = 0; i < coordinates.length; i++) {
				if (env.intersects(coordinates[i])) coordList.add(coordinates[i], true);
			}
			return coordList.toCoordinateArray();
		}
	}, {
		key: 'hasRepeatedPoints',
		value: function hasRepeatedPoints(coord) {
			for (var i = 1; i < coord.length; i++) {
				if (coord[i - 1].equals(coord[i])) {
					return true;
				}
			}
			return false;
		}
	}, {
		key: 'removeRepeatedPoints',
		value: function removeRepeatedPoints(coord) {
			if (!CoordinateArrays.hasRepeatedPoints(coord)) return coord;
			var coordList = new _comVividsolutionsJtsGeomCoordinateList2['default'](coord, false);
			return coordList.toCoordinateArray();
		}
	}, {
		key: 'reverse',
		value: function reverse(coord) {
			var last = coord.length - 1;
			var mid = last / 2;
			for (var i = 0; i <= mid; i++) {
				var tmp = coord[i];
				coord[i] = coord[last - i];
				coord[last - i] = tmp;
			}
		}
	}, {
		key: 'removeNull',
		value: function removeNull(coord) {
			var nonNull = 0;
			for (var i = 0; i < coord.length; i++) {
				if (coord[i] !== null) nonNull++;
			}
			var newCoord = [];
			if (nonNull === 0) return newCoord;
			var j = 0;
			for (var i = 0; i < coord.length; i++) {
				if (coord[i] !== null) newCoord[j++] = coord[i];
			}
			return newCoord;
		}
	}, {
		key: 'copyDeep',
		value: function copyDeep() {
			for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
				args[_key5] = arguments[_key5];
			}

			switch (args.length) {
				case 5:
					return (function () {
						for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
							args[_key6] = arguments[_key6];
						}

						var src = args[0];
						var srcStart = args[1];
						var dest = args[2];
						var destStart = args[3];
						var length = args[4];

						for (var i = 0; i < length; i++) {
							dest[destStart + i] = new _comVividsolutionsJtsGeomCoordinate2['default'](src[srcStart + i]);
						}
					}).apply(undefined, args);
				case 1:
					return (function () {
						for (var _len7 = arguments.length, args = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
							args[_key7] = arguments[_key7];
						}

						var coordinates = args[0];

						var copy = [];
						for (var i = 0; i < coordinates.length; i++) {
							copy[i] = new _comVividsolutionsJtsGeomCoordinate2['default'](coordinates[i]);
						}
						return copy;
					}).apply(undefined, args);
			}
		}
	}, {
		key: 'isEqualReversed',
		value: function isEqualReversed(pts1, pts2) {
			for (var i = 0; i < pts1.length; i++) {
				var p1 = pts1[i];
				var p2 = pts2[pts1.length - (i - 1)];
				if (p1.compareTo(p2) !== 0) return false;
			}
			return true;
		}
	}, {
		key: 'envelope',
		value: function envelope(coordinates) {
			var env = new _comVividsolutionsJtsGeomEnvelope2['default']();
			for (var i = 0; i < coordinates.length; i++) {
				env.expandToInclude(coordinates[i]);
			}
			return env;
		}
	}, {
		key: 'toCoordinateArray',
		value: function toCoordinateArray(coordList) {
			return coordList.toArray(CoordinateArrays.coordArrayType);
		}
	}, {
		key: 'atLeastNCoordinatesOrNothing',
		value: function atLeastNCoordinatesOrNothing(n, c) {
			return c.length >= n ? c : [];
		}
	}, {
		key: 'indexOf',
		value: function indexOf(coordinate, coordinates) {
			for (var i = 0; i < coordinates.length; i++) {
				if (coordinate.equals(coordinates[i])) {
					return i;
				}
			}
			return -1;
		}
	}, {
		key: 'increasingDirection',
		value: function increasingDirection(pts) {
			for (var i = 0; i < pts.length / 2; i++) {
				var j = pts.length - (1 - i);
				var comp = pts[i].compareTo(pts[j]);
				if (comp !== 0) return comp;
			}
			return 1;
		}
	}, {
		key: 'compare',
		value: function compare(pts1, pts2) {
			var i = 0;
			while (i < pts1.length && i < pts2.length) {
				var compare = pts1[i].compareTo(pts2[i]);
				if (compare !== 0) return compare;
				i++;
			}
			if (i < pts2.length) return -1;
			if (i < pts1.length) return 1;
			return 0;
		}
	}, {
		key: 'minCoordinate',
		value: function minCoordinate(coordinates) {
			var minCoord = null;
			for (var i = 0; i < coordinates.length; i++) {
				if (minCoord === null || minCoord.compareTo(coordinates[i]) > 0) {
					minCoord = coordinates[i];
				}
			}
			return minCoord;
		}
	}, {
		key: 'extract',
		value: function extract(pts, start, end) {
			start = _comVividsolutionsJtsMathMathUtil2['default'].clamp(start, 0, pts.length);
			end = _comVividsolutionsJtsMathMathUtil2['default'].clamp(end, -1, pts.length);
			var npts = end - start + 1;
			if (end < 0) npts = 0;
			if (start >= pts.length) npts = 0;
			if (end < start) npts = 0;
			var extractPts = [];
			if (npts === 0) return extractPts;
			var iPts = 0;
			for (var i = start; i <= end; i++) {
				extractPts[iPts++] = pts[i];
			}
			return extractPts;
		}
	}]);

	return CoordinateArrays;
})();

exports['default'] = CoordinateArrays;

var ForwardComparator = (function () {
	function ForwardComparator() {
		_classCallCheck(this, ForwardComparator);

		this.init_.apply(this, arguments);
	}

	_createClass(ForwardComparator, [{
		key: 'init_',
		value: function init_() {
			for (var _len8 = arguments.length, args = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
				args[_key8] = arguments[_key8];
			}

			switch (args.length) {}
		}
	}, {
		key: 'compare',
		value: function compare(o1, o2) {
			var pts1 = o1;
			var pts2 = o2;
			return CoordinateArrays.compare(pts1, pts2);
		}
	}, {
		key: 'interfaces_',
		get: function get() {
			return [_javaUtilComparator2['default']];
		}
	}]);

	return ForwardComparator;
})();

CoordinateArrays.ForwardComparator = ForwardComparator;

var BidirectionalComparator = (function () {
	function BidirectionalComparator() {
		_classCallCheck(this, BidirectionalComparator);

		this.init_.apply(this, arguments);
	}

	_createClass(BidirectionalComparator, [{
		key: 'init_',
		value: function init_() {
			for (var _len9 = arguments.length, args = Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
				args[_key9] = arguments[_key9];
			}

			switch (args.length) {}
		}
	}, {
		key: 'compare',
		value: function compare(o1, o2) {
			var pts1 = o1;
			var pts2 = o2;
			if (pts1.length < pts2.length) return -1;
			if (pts1.length > pts2.length) return 1;
			if (pts1.length === 0) return 0;
			var forwardComp = CoordinateArrays.compare(pts1, pts2);
			var isEqualRev = BidirectionalComparator.isEqualReversed(pts1, pts2);
			if (isEqualRev) return 0;
			return forwardComp;
		}
	}, {
		key: 'OLDcompare',
		value: function OLDcompare(o1, o2) {
			var pts1 = o1;
			var pts2 = o2;
			if (pts1.length < pts2.length) return -1;
			if (pts1.length > pts2.length) return 1;
			if (pts1.length === 0) return 0;
			var dir1 = BidirectionalComparator.increasingDirection(pts1);
			var dir2 = BidirectionalComparator.increasingDirection(pts2);
			var i1 = dir1 > 0 ? 0 : pts1.length - 1;
			var i2 = dir2 > 0 ? 0 : pts1.length - 1;
			for (var i = 0; i < pts1.length; i++) {
				var comparePt = pts1[i1].compareTo(pts2[i2]);
				if (comparePt !== 0) return comparePt;
				i1 += dir1;
				i2 += dir2;
			}
			return 0;
		}
	}, {
		key: 'interfaces_',
		get: function get() {
			return [_javaUtilComparator2['default']];
		}
	}]);

	return BidirectionalComparator;
})();

CoordinateArrays.BidirectionalComparator = BidirectionalComparator;
CoordinateArrays.coordArrayType = [];
module.exports = exports['default'];

},{"com/vividsolutions/jts/geom/Coordinate":15,"com/vividsolutions/jts/geom/CoordinateList":18,"com/vividsolutions/jts/geom/Envelope":24,"com/vividsolutions/jts/math/MathUtil":83,"java/util/Comparator":115}],17:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CoordinateFilter = (function () {
	function CoordinateFilter() {
		_classCallCheck(this, CoordinateFilter);

		this.init_.apply(this, arguments);
	}

	_createClass(CoordinateFilter, [{
		key: "init_",
		value: function init_() {
			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			switch (args.length) {}
		}
	}, {
		key: "filter",
		value: function filter(coord) {}
	}, {
		key: "interfaces_",
		get: function get() {
			return [];
		}
	}]);

	return CoordinateFilter;
})();

exports["default"] = CoordinateFilter;
module.exports = exports["default"];

},{}],18:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _comVividsolutionsJtsGeomCoordinate = require('com/vividsolutions/jts/geom/Coordinate');

var _comVividsolutionsJtsGeomCoordinate2 = _interopRequireDefault(_comVividsolutionsJtsGeomCoordinate);

var _javaUtilArrayList = require('java/util/ArrayList');

var _javaUtilArrayList2 = _interopRequireDefault(_javaUtilArrayList);

var CoordinateList = (function (_ArrayList) {
	_inherits(CoordinateList, _ArrayList);

	function CoordinateList() {
		_classCallCheck(this, CoordinateList);

		_get(Object.getPrototypeOf(CoordinateList.prototype), 'constructor', this).call(this);
		this.init_.apply(this, arguments);
	}

	_createClass(CoordinateList, [{
		key: 'init_',
		value: function init_() {
			var _this = this;

			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			_get(Object.getPrototypeOf(CoordinateList.prototype), 'init_', this).call(this);
			switch (args.length) {
				case 2:
					return (function () {
						for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
							args[_key2] = arguments[_key2];
						}

						var coord = args[0];
						var allowRepeated = args[1];

						_this.ensureCapacity(coord.length);
						_this.add(coord, allowRepeated);
					}).apply(undefined, args);
				case 1:
					return (function () {
						for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
							args[_key3] = arguments[_key3];
						}

						var coord = args[0];

						_this.ensureCapacity(coord.length);
						_this.add(coord, true);
					}).apply(undefined, args);
				case 0:
					return (function () {
						for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
							args[_key4] = arguments[_key4];
						}

						_get(Object.getPrototypeOf(CoordinateList.prototype), 'init_', _this).call(_this);
					}).apply(undefined, args);
			}
		}
	}, {
		key: 'getCoordinate',
		value: function getCoordinate(i) {
			return this.get(i);
		}
	}, {
		key: 'addAll',
		value: function addAll(coll, allowRepeated) {
			var isChanged = false;
			for (var i = coll.iterator(); i.hasNext();) {
				this.add(i.next(), allowRepeated);
				isChanged = true;
			}
			return isChanged;
		}
	}, {
		key: 'clone',
		value: function clone() {
			var clone = _get(Object.getPrototypeOf(CoordinateList.prototype), 'clone', this).call(this);
			for (var i = 0; i < this.size(); i++) {
				clone.add(i, this.get(i).clone());
			}
			return clone;
		}
	}, {
		key: 'toCoordinateArray',
		value: function toCoordinateArray() {
			return this.toArray(CoordinateList.coordArrayType);
		}
	}, {
		key: 'add',
		value: function add() {
			var _this2 = this;

			for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
				args[_key5] = arguments[_key5];
			}

			switch (args.length) {
				case 2:
					if (args[0] instanceof Array && typeof args[1] === "boolean") {
						return (function () {
							for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
								args[_key6] = arguments[_key6];
							}

							var coord = args[0];
							var allowRepeated = args[1];

							_this2.add(coord, allowRepeated, true);
							return true;
						}).apply(undefined, args);
					} else if (args[0] instanceof Object && typeof args[1] === "boolean") {
						return (function () {
							for (var _len7 = arguments.length, args = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
								args[_key7] = arguments[_key7];
							}

							var obj = args[0];
							var allowRepeated = args[1];

							_this2.add(obj, allowRepeated);
							return true;
						}).apply(undefined, args);
					} else if (args[0] instanceof _comVividsolutionsJtsGeomCoordinate2['default'] && typeof args[1] === "boolean") {
						return (function () {
							for (var _len8 = arguments.length, args = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
								args[_key8] = arguments[_key8];
							}

							var coord = args[0];
							var allowRepeated = args[1];

							if (!allowRepeated) {
								if (_this2.size() >= 1) {
									var last = _this2.get(_this2.size() - 1);
									if (last.equals2D(coord)) return null;
								}
							}
							_get(Object.getPrototypeOf(CoordinateList.prototype), 'add', _this2).call(_this2, coord);
						}).apply(undefined, args);
					}
				case 4:
					return (function () {
						for (var _len9 = arguments.length, args = Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
							args[_key9] = arguments[_key9];
						}

						var coord = args[0];
						var allowRepeated = args[1];
						var start = args[2];
						var end = args[3];

						var inc = 1;
						if (start > end) inc = -1;
						for (var i = start; i !== end; i += inc) {
							_this2.add(coord[i], allowRepeated);
						}
						return true;
					}).apply(undefined, args);
				case 3:
					if (typeof args[2] === "boolean" && (args[0] instanceof Array && typeof args[1] === "boolean")) {
						return (function () {
							for (var _len10 = arguments.length, args = Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
								args[_key10] = arguments[_key10];
							}

							var coord = args[0];
							var allowRepeated = args[1];
							var direction = args[2];

							if (direction) {
								for (var i = 0; i < coord.length; i++) {
									_this2.add(coord[i], allowRepeated);
								}
							} else {
								for (var i = coord.length - 1; i >= 0; i--) {
									_this2.add(coord[i], allowRepeated);
								}
							}
							return true;
						}).apply(undefined, args);
					} else if (typeof args[2] === "boolean" && (Number.isInteger(args[0]) && args[1] instanceof _comVividsolutionsJtsGeomCoordinate2['default'])) {
						return (function () {
							for (var _len11 = arguments.length, args = Array(_len11), _key11 = 0; _key11 < _len11; _key11++) {
								args[_key11] = arguments[_key11];
							}

							var i = args[0];
							var coord = args[1];
							var allowRepeated = args[2];

							if (!allowRepeated) {
								var size = _this2.size();
								if (size > 0) {
									if (i > 0) {
										var prev = _this2.get(i - 1);
										if (prev.equals2D(coord)) return null;
									}
									if (i < size) {
										var next = _this2.get(i);
										if (next.equals2D(coord)) return null;
									}
								}
							}
							_get(Object.getPrototypeOf(CoordinateList.prototype), 'add', _this2).call(_this2, i, coord);
						}).apply(undefined, args);
					}
			}
		}
	}, {
		key: 'closeRing',
		value: function closeRing() {
			if (this.size() > 0) this.add(new _comVividsolutionsJtsGeomCoordinate2['default'](this.get(0)), false);
		}
	}, {
		key: 'interfaces_',
		get: function get() {
			return [];
		}
	}]);

	return CoordinateList;
})(_javaUtilArrayList2['default']);

exports['default'] = CoordinateList;

CoordinateList.coordArrayType = [];
module.exports = exports['default'];

},{"com/vividsolutions/jts/geom/Coordinate":15,"java/util/ArrayList":111}],19:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _javaLangCloneable = require('java/lang/Cloneable');

var _javaLangCloneable2 = _interopRequireDefault(_javaLangCloneable);

var CoordinateSequence = (function () {
	function CoordinateSequence() {
		_classCallCheck(this, CoordinateSequence);

		this.init_.apply(this, arguments);
	}

	_createClass(CoordinateSequence, [{
		key: 'init_',
		value: function init_() {
			this.X = 0;
			this.Y = 1;
			this.Z = 2;
			this.M = 3;

			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			switch (args.length) {}
		}
	}, {
		key: 'setOrdinate',
		value: function setOrdinate(index, ordinateIndex, value) {}
	}, {
		key: 'size',
		value: function size() {}
	}, {
		key: 'getOrdinate',
		value: function getOrdinate(index, ordinateIndex) {}
	}, {
		key: 'getCoordinate',
		value: function getCoordinate() {
			for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
				args[_key2] = arguments[_key2];
			}

			switch (args.length) {
				case 2:
					return (function () {
						for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
							args[_key3] = arguments[_key3];
						}

						var index = args[0];
						var coord = args[1];
					}).apply(undefined, args);
				case 1:
					return (function () {
						for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
							args[_key4] = arguments[_key4];
						}

						var i = args[0];
					}).apply(undefined, args);
			}
		}
	}, {
		key: 'getCoordinateCopy',
		value: function getCoordinateCopy(i) {}
	}, {
		key: 'getDimension',
		value: function getDimension() {}
	}, {
		key: 'getX',
		value: function getX(index) {}
	}, {
		key: 'clone',
		value: function clone() {}
	}, {
		key: 'expandEnvelope',
		value: function expandEnvelope(env) {}
	}, {
		key: 'getY',
		value: function getY(index) {}
	}, {
		key: 'toCoordinateArray',
		value: function toCoordinateArray() {}
	}, {
		key: 'interfaces_',
		get: function get() {
			return [_javaLangCloneable2['default']];
		}
	}]);

	return CoordinateSequence;
})();

exports['default'] = CoordinateSequence;
module.exports = exports['default'];

},{"java/lang/Cloneable":104}],20:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _comVividsolutionsJtsGeomCoordinateSequence = require('com/vividsolutions/jts/geom/CoordinateSequence');

var _comVividsolutionsJtsGeomCoordinateSequence2 = _interopRequireDefault(_comVividsolutionsJtsGeomCoordinateSequence);

var CoordinateSequenceFactory = (function () {
	function CoordinateSequenceFactory() {
		_classCallCheck(this, CoordinateSequenceFactory);

		this.init_.apply(this, arguments);
	}

	_createClass(CoordinateSequenceFactory, [{
		key: 'init_',
		value: function init_() {
			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			switch (args.length) {}
		}
	}, {
		key: 'create',
		value: function create() {
			for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
				args[_key2] = arguments[_key2];
			}

			switch (args.length) {
				case 2:
					return (function () {
						for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
							args[_key3] = arguments[_key3];
						}

						var size = args[0];
						var dimension = args[1];
					}).apply(undefined, args);
				case 1:
					if (args[0] instanceof Array) {
						return (function () {
							for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
								args[_key4] = arguments[_key4];
							}

							var coordinates = args[0];
						}).apply(undefined, args);
					} else if (args[0].interfaces_ && args[0].interfaces_.indexOf(_comVividsolutionsJtsGeomCoordinateSequence2['default']) > -1) {
						return (function () {
							for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
								args[_key5] = arguments[_key5];
							}

							var coordSeq = args[0];
						}).apply(undefined, args);
					}
			}
		}
	}, {
		key: 'interfaces_',
		get: function get() {
			return [];
		}
	}]);

	return CoordinateSequenceFactory;
})();

exports['default'] = CoordinateSequenceFactory;
module.exports = exports['default'];

},{"com/vividsolutions/jts/geom/CoordinateSequence":19}],21:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CoordinateSequenceFilter = (function () {
	function CoordinateSequenceFilter() {
		_classCallCheck(this, CoordinateSequenceFilter);

		this.init_.apply(this, arguments);
	}

	_createClass(CoordinateSequenceFilter, [{
		key: "init_",
		value: function init_() {
			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			switch (args.length) {}
		}
	}, {
		key: "filter",
		value: function filter(seq, i) {}
	}, {
		key: "isDone",
		value: function isDone() {}
	}, {
		key: "isGeometryChanged",
		value: function isGeometryChanged() {}
	}, {
		key: "interfaces_",
		get: function get() {
			return [];
		}
	}]);

	return CoordinateSequenceFilter;
})();

exports["default"] = CoordinateSequenceFilter;
module.exports = exports["default"];

},{}],22:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _javaLangDouble = require('java/lang/Double');

var _javaLangDouble2 = _interopRequireDefault(_javaLangDouble);

var _comVividsolutionsJtsGeomCoordinateSequence = require('com/vividsolutions/jts/geom/CoordinateSequence');

var _comVividsolutionsJtsGeomCoordinateSequence2 = _interopRequireDefault(_comVividsolutionsJtsGeomCoordinateSequence);

var CoordinateSequences = (function () {
	function CoordinateSequences() {
		_classCallCheck(this, CoordinateSequences);

		this.init_.apply(this, arguments);
	}

	_createClass(CoordinateSequences, [{
		key: 'init_',
		value: function init_() {
			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			switch (args.length) {}
		}
	}, {
		key: 'interfaces_',
		get: function get() {
			return [];
		}
	}], [{
		key: 'copyCoord',
		value: function copyCoord(src, srcPos, dest, destPos) {
			var minDim = Math.min(src.getDimension(), dest.getDimension());
			for (var dim = 0; dim < minDim; dim++) {
				dest.setOrdinate(destPos, dim, src.getOrdinate(srcPos, dim));
			}
		}
	}, {
		key: 'isRing',
		value: function isRing(seq) {
			var n = seq.size();
			if (n === 0) return true;
			if (n <= 3) return false;
			return seq.getOrdinate(0, _comVividsolutionsJtsGeomCoordinateSequence2['default'].X) === seq.getOrdinate(n - 1, _comVividsolutionsJtsGeomCoordinateSequence2['default'].X) && seq.getOrdinate(0, _comVividsolutionsJtsGeomCoordinateSequence2['default'].Y) === seq.getOrdinate(n - 1, _comVividsolutionsJtsGeomCoordinateSequence2['default'].Y);
		}
	}, {
		key: 'isEqual',
		value: function isEqual(cs1, cs2) {
			var cs1Size = cs1.size();
			var cs2Size = cs2.size();
			if (cs1Size !== cs2Size) return false;
			var dim = Math.min(cs1.getDimension(), cs2.getDimension());
			for (var i = 0; i < cs1Size; i++) {
				for (var d = 0; d < dim; d++) {
					var v1 = cs1.getOrdinate(i, d);
					var v2 = cs2.getOrdinate(i, d);
					if (cs1.getOrdinate(i, d) === cs2.getOrdinate(i, d)) continue;
					if (_javaLangDouble2['default'].isNaN(v1) && _javaLangDouble2['default'].isNaN(v2)) continue;
					return false;
				}
			}
			return true;
		}
	}, {
		key: 'extend',
		value: function extend(fact, seq, size) {
			var newseq = fact.create(size, seq.getDimension());
			var n = seq.size();
			CoordinateSequences.copy(seq, 0, newseq, 0, n);
			if (n > 0) {
				for (var i = n; i < size; i++) CoordinateSequences.copy(seq, n - 1, newseq, i, 1);
			}
			return newseq;
		}
	}, {
		key: 'reverse',
		value: function reverse(seq) {
			var last = seq.size() - 1;
			var mid = last / 2;
			for (var i = 0; i <= mid; i++) {
				CoordinateSequences.swap(seq, i, last - i);
			}
		}
	}, {
		key: 'swap',
		value: function swap(seq, i, j) {
			if (i === j) return null;
			for (var dim = 0; dim < seq.getDimension(); dim++) {
				var tmp = seq.getOrdinate(i, dim);
				seq.setOrdinate(i, dim, seq.getOrdinate(j, dim));
				seq.setOrdinate(j, dim, tmp);
			}
		}
	}, {
		key: 'copy',
		value: function copy(src, srcPos, dest, destPos, length) {
			for (var i = 0; i < length; i++) {
				CoordinateSequences.copyCoord(src, srcPos + i, dest, destPos + i);
			}
		}
	}, {
		key: 'ensureValidRing',
		value: function ensureValidRing(fact, seq) {
			var n = seq.size();
			if (n === 0) return seq;
			if (n <= 3) return CoordinateSequences.createClosedRing(fact, seq, 4);
			var isClosed = seq.getOrdinate(0, _comVividsolutionsJtsGeomCoordinateSequence2['default'].X) === seq.getOrdinate(n - 1, _comVividsolutionsJtsGeomCoordinateSequence2['default'].X) && seq.getOrdinate(0, _comVividsolutionsJtsGeomCoordinateSequence2['default'].Y) === seq.getOrdinate(n - 1, _comVividsolutionsJtsGeomCoordinateSequence2['default'].Y);
			if (isClosed) return seq;
			return CoordinateSequences.createClosedRing(fact, seq, n + 1);
		}
	}, {
		key: 'createClosedRing',
		value: function createClosedRing(fact, seq, size) {
			var newseq = fact.create(size, seq.getDimension());
			var n = seq.size();
			CoordinateSequences.copy(seq, 0, newseq, 0, n);
			for (var i = n; i < size; i++) CoordinateSequences.copy(seq, 0, newseq, i, 1);
			return newseq;
		}
	}]);

	return CoordinateSequences;
})();

exports['default'] = CoordinateSequences;
module.exports = exports['default'];

},{"com/vividsolutions/jts/geom/CoordinateSequence":19,"java/lang/Double":106}],23:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _javaLangCharacter = require('java/lang/Character');

var _javaLangCharacter2 = _interopRequireDefault(_javaLangCharacter);

var Dimension = (function () {
	function Dimension() {
		_classCallCheck(this, Dimension);

		this.init_.apply(this, arguments);
	}

	_createClass(Dimension, [{
		key: "init_",
		value: function init_() {
			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			switch (args.length) {}
		}
	}, {
		key: "interfaces_",
		get: function get() {
			return [];
		}
	}], [{
		key: "toDimensionSymbol",
		value: function toDimensionSymbol(dimensionValue) {
			switch (dimensionValue) {
				case Dimension.FALSE:
					return Dimension.SYM_FALSE;
				case Dimension.TRUE:
					return Dimension.SYM_TRUE;
				case Dimension.DONTCARE:
					return Dimension.SYM_DONTCARE;
				case Dimension.P:
					return Dimension.SYM_P;
				case Dimension.L:
					return Dimension.SYM_L;
				case Dimension.A:
					return Dimension.SYM_A;
			}
			throw new IllegalArgumentException("Unknown dimension value: " + dimensionValue);
		}
	}, {
		key: "toDimensionValue",
		value: function toDimensionValue(dimensionSymbol) {
			switch (_javaLangCharacter2["default"].toUpperCase(dimensionSymbol)) {
				case Dimension.SYM_FALSE:
					return Dimension.FALSE;
				case Dimension.SYM_TRUE:
					return Dimension.TRUE;
				case Dimension.SYM_DONTCARE:
					return Dimension.DONTCARE;
				case Dimension.SYM_P:
					return Dimension.P;
				case Dimension.SYM_L:
					return Dimension.L;
				case Dimension.SYM_A:
					return Dimension.A;
			}
			throw new IllegalArgumentException("Unknown dimension symbol: " + dimensionSymbol);
		}
	}]);

	return Dimension;
})();

exports["default"] = Dimension;

Dimension.P = 0;
Dimension.L = 1;
Dimension.A = 2;
Dimension.FALSE = -1;
Dimension.TRUE = -2;
Dimension.DONTCARE = -3;
Dimension.SYM_FALSE = 'F';
Dimension.SYM_TRUE = 'T';
Dimension.SYM_DONTCARE = '*';
Dimension.SYM_P = '0';
Dimension.SYM_L = '1';
Dimension.SYM_A = '2';
module.exports = exports["default"];

},{"java/lang/Character":103}],24:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _comVividsolutionsJtsGeomCoordinate = require('com/vividsolutions/jts/geom/Coordinate');

var _comVividsolutionsJtsGeomCoordinate2 = _interopRequireDefault(_comVividsolutionsJtsGeomCoordinate);

var _javaLangComparable = require('java/lang/Comparable');

var _javaLangComparable2 = _interopRequireDefault(_javaLangComparable);

var _javaIoSerializable = require('java/io/Serializable');

var _javaIoSerializable2 = _interopRequireDefault(_javaIoSerializable);

var Envelope = (function () {
	function Envelope() {
		_classCallCheck(this, Envelope);

		this.init_.apply(this, arguments);
	}

	_createClass(Envelope, [{
		key: 'init_',
		value: function init_() {
			var _this = this;

			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			this.minx = null;
			this.maxx = null;
			this.miny = null;
			this.maxy = null;
			switch (args.length) {
				case 2:
					return (function () {
						for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
							args[_key2] = arguments[_key2];
						}

						var p1 = args[0];
						var p2 = args[1];

						_this.init(p1.x, p2.x, p1.y, p2.y);
					}).apply(undefined, args);
				case 4:
					return (function () {
						for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
							args[_key3] = arguments[_key3];
						}

						var x1 = args[0];
						var x2 = args[1];
						var y1 = args[2];
						var y2 = args[3];

						_this.init(x1, x2, y1, y2);
					}).apply(undefined, args);
				case 1:
					if (args[0] instanceof _comVividsolutionsJtsGeomCoordinate2['default']) {
						return (function () {
							for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
								args[_key4] = arguments[_key4];
							}

							var p = args[0];

							_this.init(p.x, p.x, p.y, p.y);
						}).apply(undefined, args);
					} else if (args[0] instanceof Envelope) {
						return (function () {
							for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
								args[_key5] = arguments[_key5];
							}

							var env = args[0];

							_this.init(env);
						}).apply(undefined, args);
					}
				case 0:
					return (function () {
						for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
							args[_key6] = arguments[_key6];
						}

						_this.init();
					}).apply(undefined, args);
			}
		}
	}, {
		key: 'getArea',
		value: function getArea() {
			return this.getWidth() * this.getHeight();
		}
	}, {
		key: 'equals',
		value: function equals(other) {
			if (!(other instanceof Envelope)) {
				return false;
			}
			var otherEnvelope = other;
			if (this.isNull()) {
				return otherEnvelope.isNull();
			}
			return this.maxx === otherEnvelope.getMaxX() && this.maxy === otherEnvelope.getMaxY() && this.minx === otherEnvelope.getMinX() && this.miny === otherEnvelope.getMinY();
		}
	}, {
		key: 'intersection',
		value: function intersection(env) {
			if (this.isNull() || (env.isNull() || !this.intersects(env))) return new Envelope();
			var intMinX = this.minx > env.minx ? this.minx : env.minx;
			var intMinY = this.miny > env.miny ? this.miny : env.miny;
			var intMaxX = this.maxx < env.maxx ? this.maxx : env.maxx;
			var intMaxY = this.maxy < env.maxy ? this.maxy : env.maxy;
			return new Envelope(intMinX, intMaxX, intMinY, intMaxY);
		}
	}, {
		key: 'isNull',
		value: function isNull() {
			return this.maxx < this.minx;
		}
	}, {
		key: 'getMaxX',
		value: function getMaxX() {
			return this.maxx;
		}
	}, {
		key: 'covers',
		value: function covers() {
			var _this2 = this;

			for (var _len7 = arguments.length, args = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
				args[_key7] = arguments[_key7];
			}

			switch (args.length) {
				case 2:
					return (function () {
						for (var _len8 = arguments.length, args = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
							args[_key8] = arguments[_key8];
						}

						var x = args[0];
						var y = args[1];

						if (_this2.isNull()) return false;
						return x >= _this2.minx && x <= _this2.maxx && y >= _this2.miny && y <= _this2.maxy;
					}).apply(undefined, args);
				case 1:
					if (args[0] instanceof _comVividsolutionsJtsGeomCoordinate2['default']) {
						return (function () {
							for (var _len9 = arguments.length, args = Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
								args[_key9] = arguments[_key9];
							}

							var p = args[0];

							return _this2.covers(p.x, p.y);
						}).apply(undefined, args);
					} else if (args[0] instanceof Envelope) {
						return (function () {
							for (var _len10 = arguments.length, args = Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
								args[_key10] = arguments[_key10];
							}

							var other = args[0];

							if (_this2.isNull() || other.isNull()) {
								return false;
							}
							return other.getMinX() >= _this2.minx && other.getMaxX() <= _this2.maxx && other.getMinY() >= _this2.miny && other.getMaxY() <= _this2.maxy;
						}).apply(undefined, args);
					}
			}
		}
	}, {
		key: 'intersects',
		value: function intersects() {
			var _this3 = this;

			for (var _len11 = arguments.length, args = Array(_len11), _key11 = 0; _key11 < _len11; _key11++) {
				args[_key11] = arguments[_key11];
			}

			switch (args.length) {
				case 2:
					return (function () {
						for (var _len12 = arguments.length, args = Array(_len12), _key12 = 0; _key12 < _len12; _key12++) {
							args[_key12] = arguments[_key12];
						}

						var x = args[0];
						var y = args[1];

						if (_this3.isNull()) return false;
						return !(x > _this3.maxx || x < _this3.minx || y > _this3.maxy || y < _this3.miny);
					}).apply(undefined, args);
				case 1:
					if (args[0] instanceof Envelope) {
						return (function () {
							for (var _len13 = arguments.length, args = Array(_len13), _key13 = 0; _key13 < _len13; _key13++) {
								args[_key13] = arguments[_key13];
							}

							var other = args[0];

							if (_this3.isNull() || other.isNull()) {
								return false;
							}
							return !(other.minx > _this3.maxx || other.maxx < _this3.minx || other.miny > _this3.maxy || other.maxy < _this3.miny);
						}).apply(undefined, args);
					} else if (args[0] instanceof _comVividsolutionsJtsGeomCoordinate2['default']) {
						return (function () {
							for (var _len14 = arguments.length, args = Array(_len14), _key14 = 0; _key14 < _len14; _key14++) {
								args[_key14] = arguments[_key14];
							}

							var p = args[0];

							return _this3.intersects(p.x, p.y);
						}).apply(undefined, args);
					}
			}
		}
	}, {
		key: 'getMinY',
		value: function getMinY() {
			return this.miny;
		}
	}, {
		key: 'getMinX',
		value: function getMinX() {
			return this.minx;
		}
	}, {
		key: 'expandToInclude',
		value: function expandToInclude() {
			var _this4 = this;

			for (var _len15 = arguments.length, args = Array(_len15), _key15 = 0; _key15 < _len15; _key15++) {
				args[_key15] = arguments[_key15];
			}

			switch (args.length) {
				case 2:
					return (function () {
						for (var _len16 = arguments.length, args = Array(_len16), _key16 = 0; _key16 < _len16; _key16++) {
							args[_key16] = arguments[_key16];
						}

						var x = args[0];
						var y = args[1];

						if (_this4.isNull()) {
							_this4.minx = x;
							_this4.maxx = x;
							_this4.miny = y;
							_this4.maxy = y;
						} else {
							if (x < _this4.minx) {
								_this4.minx = x;
							}
							if (x > _this4.maxx) {
								_this4.maxx = x;
							}
							if (y < _this4.miny) {
								_this4.miny = y;
							}
							if (y > _this4.maxy) {
								_this4.maxy = y;
							}
						}
					}).apply(undefined, args);
				case 1:
					if (args[0] instanceof _comVividsolutionsJtsGeomCoordinate2['default']) {
						return (function () {
							for (var _len17 = arguments.length, args = Array(_len17), _key17 = 0; _key17 < _len17; _key17++) {
								args[_key17] = arguments[_key17];
							}

							var p = args[0];

							_this4.expandToInclude(p.x, p.y);
						}).apply(undefined, args);
					} else if (args[0] instanceof Envelope) {
						return (function () {
							for (var _len18 = arguments.length, args = Array(_len18), _key18 = 0; _key18 < _len18; _key18++) {
								args[_key18] = arguments[_key18];
							}

							var other = args[0];

							if (other.isNull()) {
								return null;
							}
							if (_this4.isNull()) {
								_this4.minx = other.getMinX();
								_this4.maxx = other.getMaxX();
								_this4.miny = other.getMinY();
								_this4.maxy = other.getMaxY();
							} else {
								if (other.minx < _this4.minx) {
									_this4.minx = other.minx;
								}
								if (other.maxx > _this4.maxx) {
									_this4.maxx = other.maxx;
								}
								if (other.miny < _this4.miny) {
									_this4.miny = other.miny;
								}
								if (other.maxy > _this4.maxy) {
									_this4.maxy = other.maxy;
								}
							}
						}).apply(undefined, args);
					}
			}
		}
	}, {
		key: 'minExtent',
		value: function minExtent() {
			if (this.isNull()) return 0.0;
			var w = this.getWidth();
			var h = this.getHeight();
			if (w < h) return w;
			return h;
		}
	}, {
		key: 'getWidth',
		value: function getWidth() {
			if (this.isNull()) {
				return 0;
			}
			return this.maxx - this.minx;
		}
	}, {
		key: 'compareTo',
		value: function compareTo(o) {
			var env = o;
			if (this.isNull()) {
				if (env.isNull()) return 0;
				return -1;
			} else {
				if (env.isNull()) return 1;
			}
			if (this.minx < env.minx) return -1;
			if (this.minx > env.minx) return 1;
			if (this.miny < env.miny) return -1;
			if (this.miny > env.miny) return 1;
			if (this.maxx < env.maxx) return -1;
			if (this.maxx > env.maxx) return 1;
			if (this.maxy < env.maxy) return -1;
			if (this.maxy > env.maxy) return 1;
			return 0;
		}
	}, {
		key: 'overlaps',
		value: function overlaps() {
			var _this5 = this;

			for (var _len19 = arguments.length, args = Array(_len19), _key19 = 0; _key19 < _len19; _key19++) {
				args[_key19] = arguments[_key19];
			}

			switch (args.length) {
				case 2:
					return (function () {
						for (var _len20 = arguments.length, args = Array(_len20), _key20 = 0; _key20 < _len20; _key20++) {
							args[_key20] = arguments[_key20];
						}

						var x = args[0];
						var y = args[1];

						return _this5.intersects(x, y);
					}).apply(undefined, args);
				case 1:
					if (args[0] instanceof Envelope) {
						return (function () {
							for (var _len21 = arguments.length, args = Array(_len21), _key21 = 0; _key21 < _len21; _key21++) {
								args[_key21] = arguments[_key21];
							}

							var other = args[0];

							return _this5.intersects(other);
						}).apply(undefined, args);
					} else if (args[0] instanceof _comVividsolutionsJtsGeomCoordinate2['default']) {
						return (function () {
							for (var _len22 = arguments.length, args = Array(_len22), _key22 = 0; _key22 < _len22; _key22++) {
								args[_key22] = arguments[_key22];
							}

							var p = args[0];

							return _this5.intersects(p);
						}).apply(undefined, args);
					}
			}
		}
	}, {
		key: 'translate',
		value: function translate(transX, transY) {
			if (this.isNull()) {
				return null;
			}
			this.init(this.getMinX() + transX, this.getMaxX() + transX, this.getMinY() + transY, this.getMaxY() + transY);
		}
	}, {
		key: 'toString',
		value: function toString() {
			return "Env[" + (this.minx + (" : " + (this.maxx + (", " + (this.miny + (" : " + (this.maxy + "]")))))));
		}
	}, {
		key: 'setToNull',
		value: function setToNull() {
			this.minx = 0;
			this.maxx = -1;
			this.miny = 0;
			this.maxy = -1;
		}
	}, {
		key: 'getHeight',
		value: function getHeight() {
			if (this.isNull()) {
				return 0;
			}
			return this.maxy - this.miny;
		}
	}, {
		key: 'maxExtent',
		value: function maxExtent() {
			if (this.isNull()) return 0.0;
			var w = this.getWidth();
			var h = this.getHeight();
			if (w > h) return w;
			return h;
		}
	}, {
		key: 'expandBy',
		value: function expandBy() {
			var _this6 = this;

			for (var _len23 = arguments.length, args = Array(_len23), _key23 = 0; _key23 < _len23; _key23++) {
				args[_key23] = arguments[_key23];
			}

			switch (args.length) {
				case 2:
					return (function () {
						for (var _len24 = arguments.length, args = Array(_len24), _key24 = 0; _key24 < _len24; _key24++) {
							args[_key24] = arguments[_key24];
						}

						var deltaX = args[0];
						var deltaY = args[1];

						if (_this6.isNull()) return null;
						_this6.minx -= deltaX;
						_this6.maxx += deltaX;
						_this6.miny -= deltaY;
						_this6.maxy += deltaY;
						if (_this6.minx > _this6.maxx || _this6.miny > _this6.maxy) _this6.setToNull();
					}).apply(undefined, args);
				case 1:
					return (function () {
						for (var _len25 = arguments.length, args = Array(_len25), _key25 = 0; _key25 < _len25; _key25++) {
							args[_key25] = arguments[_key25];
						}

						var distance = args[0];

						_this6.expandBy(distance, distance);
					}).apply(undefined, args);
			}
		}
	}, {
		key: 'contains',
		value: function contains() {
			var _this7 = this;

			for (var _len26 = arguments.length, args = Array(_len26), _key26 = 0; _key26 < _len26; _key26++) {
				args[_key26] = arguments[_key26];
			}

			switch (args.length) {
				case 2:
					return (function () {
						for (var _len27 = arguments.length, args = Array(_len27), _key27 = 0; _key27 < _len27; _key27++) {
							args[_key27] = arguments[_key27];
						}

						var x = args[0];
						var y = args[1];

						return _this7.covers(x, y);
					}).apply(undefined, args);
				case 1:
					if (args[0] instanceof Envelope) {
						return (function () {
							for (var _len28 = arguments.length, args = Array(_len28), _key28 = 0; _key28 < _len28; _key28++) {
								args[_key28] = arguments[_key28];
							}

							var other = args[0];

							return _this7.covers(other);
						}).apply(undefined, args);
					} else if (args[0] instanceof _comVividsolutionsJtsGeomCoordinate2['default']) {
						return (function () {
							for (var _len29 = arguments.length, args = Array(_len29), _key29 = 0; _key29 < _len29; _key29++) {
								args[_key29] = arguments[_key29];
							}

							var p = args[0];

							return _this7.covers(p);
						}).apply(undefined, args);
					}
			}
		}
	}, {
		key: 'centre',
		value: function centre() {
			if (this.isNull()) return null;
			return new _comVividsolutionsJtsGeomCoordinate2['default']((this.getMinX() + this.getMaxX()) / 2.0, (this.getMinY() + this.getMaxY()) / 2.0);
		}
	}, {
		key: 'init',
		value: function init() {
			var _this8 = this;

			for (var _len30 = arguments.length, args = Array(_len30), _key30 = 0; _key30 < _len30; _key30++) {
				args[_key30] = arguments[_key30];
			}

			switch (args.length) {
				case 2:
					return (function () {
						for (var _len31 = arguments.length, args = Array(_len31), _key31 = 0; _key31 < _len31; _key31++) {
							args[_key31] = arguments[_key31];
						}

						var p1 = args[0];
						var p2 = args[1];

						_this8.init(p1.x, p2.x, p1.y, p2.y);
					}).apply(undefined, args);
				case 4:
					return (function () {
						for (var _len32 = arguments.length, args = Array(_len32), _key32 = 0; _key32 < _len32; _key32++) {
							args[_key32] = arguments[_key32];
						}

						var x1 = args[0];
						var x2 = args[1];
						var y1 = args[2];
						var y2 = args[3];

						if (x1 < x2) {
							_this8.minx = x1;
							_this8.maxx = x2;
						} else {
							_this8.minx = x2;
							_this8.maxx = x1;
						}
						if (y1 < y2) {
							_this8.miny = y1;
							_this8.maxy = y2;
						} else {
							_this8.miny = y2;
							_this8.maxy = y1;
						}
					}).apply(undefined, args);
				case 1:
					if (args[0] instanceof _comVividsolutionsJtsGeomCoordinate2['default']) {
						return (function () {
							for (var _len33 = arguments.length, args = Array(_len33), _key33 = 0; _key33 < _len33; _key33++) {
								args[_key33] = arguments[_key33];
							}

							var p = args[0];

							_this8.init(p.x, p.x, p.y, p.y);
						}).apply(undefined, args);
					} else if (args[0] instanceof Envelope) {
						return (function () {
							for (var _len34 = arguments.length, args = Array(_len34), _key34 = 0; _key34 < _len34; _key34++) {
								args[_key34] = arguments[_key34];
							}

							var env = args[0];

							_this8.minx = env.minx;
							_this8.maxx = env.maxx;
							_this8.miny = env.miny;
							_this8.maxy = env.maxy;
						}).apply(undefined, args);
					}
				case 0:
					return (function () {
						for (var _len35 = arguments.length, args = Array(_len35), _key35 = 0; _key35 < _len35; _key35++) {
							args[_key35] = arguments[_key35];
						}

						_this8.setToNull();
					}).apply(undefined, args);
			}
		}
	}, {
		key: 'getMaxY',
		value: function getMaxY() {
			return this.maxy;
		}
	}, {
		key: 'distance',
		value: function distance(env) {
			if (this.intersects(env)) return 0;
			var dx = 0.0;
			if (this.maxx < env.minx) dx = env.minx - this.maxx;else if (this.minx > env.maxx) dx = this.minx - env.maxx;
			var dy = 0.0;
			if (this.maxy < env.miny) dy = env.miny - this.maxy;else if (this.miny > env.maxy) dy = this.miny - env.maxy;
			if (dx === 0.0) return dy;
			if (dy === 0.0) return dx;
			return Math.sqrt(dx * dx + dy * dy);
		}
	}, {
		key: 'hashCode',
		value: function hashCode() {
			var result = 17;
			result = 37 * result + _comVividsolutionsJtsGeomCoordinate2['default'].hashCode(this.minx);
			result = 37 * result + _comVividsolutionsJtsGeomCoordinate2['default'].hashCode(this.maxx);
			result = 37 * result + _comVividsolutionsJtsGeomCoordinate2['default'].hashCode(this.miny);
			result = 37 * result + _comVividsolutionsJtsGeomCoordinate2['default'].hashCode(this.maxy);
			return result;
		}
	}, {
		key: 'interfaces_',
		get: function get() {
			return [_javaLangComparable2['default'], _javaIoSerializable2['default']];
		}
	}], [{
		key: 'intersects',
		value: function intersects() {
			for (var _len36 = arguments.length, args = Array(_len36), _key36 = 0; _key36 < _len36; _key36++) {
				args[_key36] = arguments[_key36];
			}

			switch (args.length) {
				case 4:
					return (function () {
						for (var _len37 = arguments.length, args = Array(_len37), _key37 = 0; _key37 < _len37; _key37++) {
							args[_key37] = arguments[_key37];
						}

						var p1 = args[0];
						var p2 = args[1];
						var q1 = args[2];
						var q2 = args[3];

						var minq = Math.min(q1.x, q2.x);
						var maxq = Math.max(q1.x, q2.x);
						var minp = Math.min(p1.x, p2.x);
						var maxp = Math.max(p1.x, p2.x);
						if (minp > maxq) return false;
						if (maxp < minq) return false;
						minq = Math.min(q1.y, q2.y);
						maxq = Math.max(q1.y, q2.y);
						minp = Math.min(p1.y, p2.y);
						maxp = Math.max(p1.y, p2.y);
						if (minp > maxq) return false;
						if (maxp < minq) return false;
						return true;
					}).apply(undefined, args);
				case 3:
					return (function () {
						for (var _len38 = arguments.length, args = Array(_len38), _key38 = 0; _key38 < _len38; _key38++) {
							args[_key38] = arguments[_key38];
						}

						var p1 = args[0];
						var p2 = args[1];
						var q = args[2];

						if (q.x >= (p1.x < p2.x ? p1.x : p2.x) && q.x <= (p1.x > p2.x ? p1.x : p2.x) && (q.y >= (p1.y < p2.y ? p1.y : p2.y) && q.y <= (p1.y > p2.y ? p1.y : p2.y))) {
							return true;
						}
						return false;
					}).apply(undefined, args);
			}
		}
	}]);

	return Envelope;
})();

exports['default'] = Envelope;

Envelope.serialVersionUID = 5873921885273102420;
module.exports = exports['default'];

},{"com/vividsolutions/jts/geom/Coordinate":15,"java/io/Serializable":101,"java/lang/Comparable":105}],25:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _javaLangCloneable = require('java/lang/Cloneable');

var _javaLangCloneable2 = _interopRequireDefault(_javaLangCloneable);

var _javaIoSerializable = require('java/io/Serializable');

var _javaIoSerializable2 = _interopRequireDefault(_javaIoSerializable);

var _comVividsolutionsJtsGeomEnvelope = require('com/vividsolutions/jts/geom/Envelope');

var _comVividsolutionsJtsGeomEnvelope2 = _interopRequireDefault(_comVividsolutionsJtsGeomEnvelope);

var _comVividsolutionsJtsUtilAssert = require('com/vividsolutions/jts/util/Assert');

var _comVividsolutionsJtsUtilAssert2 = _interopRequireDefault(_comVividsolutionsJtsUtilAssert);

var Geometry = (function () {
	function Geometry() {
		_classCallCheck(this, Geometry);

		this.init_.apply(this, arguments);
	}

	_createClass(Geometry, [{
		key: 'init_',
		value: function init_() {
			var _this = this;

			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			this.envelope = null;
			this.factory = null;
			this.SRID = null;
			this.userData = null;
			switch (args.length) {
				case 1:
					return (function () {
						for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
							args[_key2] = arguments[_key2];
						}

						var factory = args[0];

						_this.factory = factory;
						_this.SRID = factory.getSRID();
					}).apply(undefined, args);
			}
		}
	}, {
		key: 'getFactory',
		value: function getFactory() {
			return this.factory;
		}
	}, {
		key: 'getGeometryN',
		value: function getGeometryN(n) {
			return this;
		}
	}, {
		key: 'getArea',
		value: function getArea() {
			return 0.0;
		}
	}, {
		key: 'isRectangle',
		value: function isRectangle() {
			return false;
		}
	}, {
		key: 'equals',
		value: function equals(o) {
			if (!(o instanceof Geometry)) return false;
			var g = o;
			return this.equalsExact(g);
		}
	}, {
		key: 'equalsExact',
		value: function equalsExact(other) {
			return this === other || this.equalsExact(other, 0);
		}
	}, {
		key: 'getLength',
		value: function getLength() {
			return 0.0;
		}
	}, {
		key: 'getNumGeometries',
		value: function getNumGeometries() {
			return 1;
		}
	}, {
		key: 'getUserData',
		value: function getUserData() {
			return this.userData;
		}
	}, {
		key: 'getSRID',
		value: function getSRID() {
			return this.SRID;
		}
	}, {
		key: 'getEnvelope',
		value: function getEnvelope() {
			return this.getFactory().toGeometry(this.getEnvelopeInternal());
		}
	}, {
		key: 'equal',
		value: function equal(a, b, tolerance) {
			if (tolerance === 0) {
				return a.equals(b);
			}
			return a.distance(b) <= tolerance;
		}
	}, {
		key: 'getPrecisionModel',
		value: function getPrecisionModel() {
			return this.factory.getPrecisionModel();
		}
	}, {
		key: 'getEnvelopeInternal',
		value: function getEnvelopeInternal() {
			if (this.envelope === null) {
				this.envelope = this.computeEnvelopeInternal();
			}
			return new _comVividsolutionsJtsGeomEnvelope2['default'](this.envelope);
		}
	}, {
		key: 'clone',
		value: function clone() {
			try {
				var clone = _get(Object.getPrototypeOf(Geometry.prototype), 'clone', this).call(this);
				if (clone.envelope !== null) {
					clone.envelope = new _comVividsolutionsJtsGeomEnvelope2['default'](clone.envelope);
				}
				return clone;
			} catch (e) {
				if (e instanceof CloneNotSupportedException) {
					_comVividsolutionsJtsUtilAssert2['default'].shouldNeverReachHere();
					return null;
				}
			} finally {}
		}
	}, {
		key: 'setSRID',
		value: function setSRID(SRID) {
			this.SRID = SRID;
		}
	}, {
		key: 'setUserData',
		value: function setUserData(userData) {
			this.userData = userData;
		}
	}, {
		key: 'hashCode',
		value: function hashCode() {
			return this.getEnvelopeInternal().hashCode();
		}
	}, {
		key: 'interfaces_',
		get: function get() {
			return [_javaLangCloneable2['default'], _javaIoSerializable2['default']];
		}
	}], [{
		key: 'hasNonEmptyElements',
		value: function hasNonEmptyElements(geometries) {
			for (var i = 0; i < geometries.length; i++) {
				if (!geometries[i].isEmpty()) {
					return true;
				}
			}
			return false;
		}
	}, {
		key: 'hasNullElements',
		value: function hasNullElements(array) {
			for (var i = 0; i < array.length; i++) {
				if (array[i] === null) {
					return true;
				}
			}
			return false;
		}
	}]);

	return Geometry;
})();

exports['default'] = Geometry;

Geometry.serialVersionUID = 8763622679187376702;
module.exports = exports['default'];

},{"com/vividsolutions/jts/geom/Envelope":24,"com/vividsolutions/jts/util/Assert":97,"java/io/Serializable":101,"java/lang/Cloneable":104}],26:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _comVividsolutionsJtsGeomGeometry = require('com/vividsolutions/jts/geom/Geometry');

var _comVividsolutionsJtsGeomGeometry2 = _interopRequireDefault(_comVividsolutionsJtsGeomGeometry);

var _comVividsolutionsJtsGeomCoordinateFilter = require('com/vividsolutions/jts/geom/CoordinateFilter');

var _comVividsolutionsJtsGeomCoordinateFilter2 = _interopRequireDefault(_comVividsolutionsJtsGeomCoordinateFilter);

var _comVividsolutionsJtsGeomGeometryFactory = require('com/vividsolutions/jts/geom/GeometryFactory');

var _comVividsolutionsJtsGeomGeometryFactory2 = _interopRequireDefault(_comVividsolutionsJtsGeomGeometryFactory);

var _comVividsolutionsJtsGeomGeometryComponentFilter = require('com/vividsolutions/jts/geom/GeometryComponentFilter');

var _comVividsolutionsJtsGeomGeometryComponentFilter2 = _interopRequireDefault(_comVividsolutionsJtsGeomGeometryComponentFilter);

var _comVividsolutionsJtsGeomDimension = require('com/vividsolutions/jts/geom/Dimension');

var _comVividsolutionsJtsGeomDimension2 = _interopRequireDefault(_comVividsolutionsJtsGeomDimension);

var _comVividsolutionsJtsGeomGeometryFilter = require('com/vividsolutions/jts/geom/GeometryFilter');

var _comVividsolutionsJtsGeomGeometryFilter2 = _interopRequireDefault(_comVividsolutionsJtsGeomGeometryFilter);

var _comVividsolutionsJtsGeomCoordinateSequenceFilter = require('com/vividsolutions/jts/geom/CoordinateSequenceFilter');

var _comVividsolutionsJtsGeomCoordinateSequenceFilter2 = _interopRequireDefault(_comVividsolutionsJtsGeomCoordinateSequenceFilter);

var _comVividsolutionsJtsGeomEnvelope = require('com/vividsolutions/jts/geom/Envelope');

var _comVividsolutionsJtsGeomEnvelope2 = _interopRequireDefault(_comVividsolutionsJtsGeomEnvelope);

var GeometryCollection = (function (_Geometry) {
	_inherits(GeometryCollection, _Geometry);

	function GeometryCollection() {
		_classCallCheck(this, GeometryCollection);

		_get(Object.getPrototypeOf(GeometryCollection.prototype), 'constructor', this).call(this);
		this.init_.apply(this, arguments);
	}

	_createClass(GeometryCollection, [{
		key: 'init_',
		value: function init_() {
			var _this = this;

			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			_get(Object.getPrototypeOf(GeometryCollection.prototype), 'init_', this).call(this);
			this.geometries = null;
			switch (args.length) {
				case 2:
					return (function () {
						for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
							args[_key2] = arguments[_key2];
						}

						var geometries = args[0];
						var factory = args[1];

						_get(Object.getPrototypeOf(GeometryCollection.prototype), 'init_', _this).call(_this, factory);
						if (geometries === null) {
							geometries = [];
						}
						if (GeometryCollection.hasNullElements(geometries)) {
							throw new IllegalArgumentException("geometries must not contain null elements");
						}
						_this.geometries = geometries;
					}).apply(undefined, args);
				case 3:
					return (function () {
						for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
							args[_key3] = arguments[_key3];
						}

						var geometries = args[0];
						var precisionModel = args[1];
						var SRID = args[2];

						_this.init_(geometries, new _comVividsolutionsJtsGeomGeometryFactory2['default'](precisionModel, SRID));
					}).apply(undefined, args);
			}
		}
	}, {
		key: 'computeEnvelopeInternal',
		value: function computeEnvelopeInternal() {
			var envelope = new _comVividsolutionsJtsGeomEnvelope2['default']();
			for (var i = 0; i < this.geometries.length; i++) {
				envelope.expandToInclude(this.geometries[i].getEnvelopeInternal());
			}
			return envelope;
		}
	}, {
		key: 'getGeometryN',
		value: function getGeometryN(n) {
			return this.geometries[n];
		}
	}, {
		key: 'getCoordinates',
		value: function getCoordinates() {
			var coordinates = [];
			var k = -1;
			for (var i = 0; i < this.geometries.length; i++) {
				var childCoordinates = this.geometries[i].getCoordinates();
				for (var j = 0; j < childCoordinates.length; j++) {
					k++;
					coordinates[k] = childCoordinates[j];
				}
			}
			return coordinates;
		}
	}, {
		key: 'getArea',
		value: function getArea() {
			var area = 0.0;
			for (var i = 0; i < this.geometries.length; i++) {
				area += this.geometries[i].getArea();
			}
			return area;
		}
	}, {
		key: 'equalsExact',
		value: function equalsExact(other, tolerance) {
			var otherCollection = other;
			if (this.geometries.length !== otherCollection.geometries.length) {
				return false;
			}
			for (var i = 0; i < this.geometries.length; i++) {
				if (!this.geometries[i].equalsExact(otherCollection.geometries[i], tolerance)) {
					return false;
				}
			}
			return true;
		}
	}, {
		key: 'getCoordinate',
		value: function getCoordinate() {
			if (this.isEmpty()) return null;
			return this.geometries[0].getCoordinate();
		}
	}, {
		key: 'getBoundaryDimension',
		value: function getBoundaryDimension() {
			var dimension = _comVividsolutionsJtsGeomDimension2['default'].FALSE;
			for (var i = 0; i < this.geometries.length; i++) {
				dimension = Math.max(dimension, this.geometries[i].getBoundaryDimension());
			}
			return dimension;
		}
	}, {
		key: 'getDimension',
		value: function getDimension() {
			var dimension = _comVividsolutionsJtsGeomDimension2['default'].FALSE;
			for (var i = 0; i < this.geometries.length; i++) {
				dimension = Math.max(dimension, this.geometries[i].getDimension());
			}
			return dimension;
		}
	}, {
		key: 'getLength',
		value: function getLength() {
			var sum = 0.0;
			for (var i = 0; i < this.geometries.length; i++) {
				sum += this.geometries[i].getLength();
			}
			return sum;
		}
	}, {
		key: 'getNumPoints',
		value: function getNumPoints() {
			var numPoints = 0;
			for (var i = 0; i < this.geometries.length; i++) {
				numPoints += this.geometries[i].getNumPoints();
			}
			return numPoints;
		}
	}, {
		key: 'getNumGeometries',
		value: function getNumGeometries() {
			return this.geometries.length;
		}
	}, {
		key: 'apply',
		value: function apply() {
			var _this2 = this;

			for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
				args[_key4] = arguments[_key4];
			}

			switch (args.length) {
				case 1:
					if (args[0].interfaces_ && args[0].interfaces_.indexOf(_comVividsolutionsJtsGeomCoordinateFilter2['default']) > -1) {
						return (function () {
							for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
								args[_key5] = arguments[_key5];
							}

							var filter = args[0];

							for (var i = 0; i < _this2.geometries.length; i++) {
								_this2.geometries[i].apply(filter);
							}
						}).apply(undefined, args);
					} else if (args[0].interfaces_ && args[0].interfaces_.indexOf(_comVividsolutionsJtsGeomCoordinateSequenceFilter2['default']) > -1) {
						return (function () {
							for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
								args[_key6] = arguments[_key6];
							}

							var filter = args[0];

							if (_this2.geometries.length === 0) return null;
							for (var i = 0; i < _this2.geometries.length; i++) {
								_this2.geometries[i].apply(filter);
								if (filter.isDone()) {
									break;
								}
							}
						}).apply(undefined, args);
					} else if (args[0].interfaces_ && args[0].interfaces_.indexOf(_comVividsolutionsJtsGeomGeometryFilter2['default']) > -1) {
						return (function () {
							for (var _len7 = arguments.length, args = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
								args[_key7] = arguments[_key7];
							}

							var filter = args[0];

							filter.filter(_this2);
							for (var i = 0; i < _this2.geometries.length; i++) {
								_this2.geometries[i].apply(filter);
							}
						}).apply(undefined, args);
					} else if (args[0].interfaces_ && args[0].interfaces_.indexOf(_comVividsolutionsJtsGeomGeometryComponentFilter2['default']) > -1) {
						return (function () {
							for (var _len8 = arguments.length, args = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
								args[_key8] = arguments[_key8];
							}

							var filter = args[0];

							filter.filter(_this2);
							for (var i = 0; i < _this2.geometries.length; i++) {
								_this2.geometries[i].apply(filter);
							}
						}).apply(undefined, args);
					}
			}
		}
	}, {
		key: 'getBoundary',
		value: function getBoundary() {
			return null;
		}
	}, {
		key: 'clone',
		value: function clone() {
			var gc = _get(Object.getPrototypeOf(GeometryCollection.prototype), 'clone', this).call(this);
			gc.geometries = [];
			for (var i = 0; i < this.geometries.length; i++) {
				gc.geometries[i] = this.geometries[i].clone();
			}
			return gc;
		}
	}, {
		key: 'getGeometryType',
		value: function getGeometryType() {
			return "GeometryCollection";
		}
	}, {
		key: 'isEmpty',
		value: function isEmpty() {
			for (var i = 0; i < this.geometries.length; i++) {
				if (!this.geometries[i].isEmpty()) {
					return false;
				}
			}
			return true;
		}
	}, {
		key: 'interfaces_',
		get: function get() {
			return [];
		}
	}]);

	return GeometryCollection;
})(_comVividsolutionsJtsGeomGeometry2['default']);

exports['default'] = GeometryCollection;

GeometryCollection.serialVersionUID = -5694727726395021467;
module.exports = exports['default'];

},{"com/vividsolutions/jts/geom/CoordinateFilter":17,"com/vividsolutions/jts/geom/CoordinateSequenceFilter":21,"com/vividsolutions/jts/geom/Dimension":23,"com/vividsolutions/jts/geom/Envelope":24,"com/vividsolutions/jts/geom/Geometry":25,"com/vividsolutions/jts/geom/GeometryComponentFilter":28,"com/vividsolutions/jts/geom/GeometryFactory":29,"com/vividsolutions/jts/geom/GeometryFilter":30}],27:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _javaUtilIterator = require('java/util/Iterator');

var _javaUtilIterator2 = _interopRequireDefault(_javaUtilIterator);

var _javaUtilNoSuchElementException = require('java/util/NoSuchElementException');

var _javaUtilNoSuchElementException2 = _interopRequireDefault(_javaUtilNoSuchElementException);

var _comVividsolutionsJtsGeomGeometryCollection = require('com/vividsolutions/jts/geom/GeometryCollection');

var _comVividsolutionsJtsGeomGeometryCollection2 = _interopRequireDefault(_comVividsolutionsJtsGeomGeometryCollection);

var GeometryCollectionIterator = (function () {
	function GeometryCollectionIterator() {
		_classCallCheck(this, GeometryCollectionIterator);

		this.init_.apply(this, arguments);
	}

	_createClass(GeometryCollectionIterator, [{
		key: 'init_',
		value: function init_() {
			var _this = this;

			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			this.parent = null;
			this.atStart = null;
			this.max = null;
			this.index = null;
			this.subcollectionIterator = null;
			switch (args.length) {
				case 1:
					return (function () {
						for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
							args[_key2] = arguments[_key2];
						}

						var parent = args[0];

						_this.parent = parent;
						_this.atStart = true;
						_this.index = 0;
						_this.max = parent.getNumGeometries();
					}).apply(undefined, args);
			}
		}
	}, {
		key: 'next',
		value: function next() {
			if (this.atStart) {
				this.atStart = false;
				if (GeometryCollectionIterator.isAtomic(this.parent)) this.index++;
				return this.parent;
			}
			if (this.subcollectionIterator !== null) {
				if (this.subcollectionIterator.hasNext()) {
					return this.subcollectionIterator.next();
				} else {
					this.subcollectionIterator = null;
				}
			}
			if (this.index >= this.max) {
				throw new _javaUtilNoSuchElementException2['default']();
			}
			var obj = this.parent.getGeometryN(this.index++);
			if (obj instanceof _comVividsolutionsJtsGeomGeometryCollection2['default']) {
				this.subcollectionIterator = new GeometryCollectionIterator(obj);
				return this.subcollectionIterator.next();
			}
			return obj;
		}
	}, {
		key: 'remove',
		value: function remove() {
			throw new UnsupportedOperationException(this.getClass().getName());
		}
	}, {
		key: 'hasNext',
		value: function hasNext() {
			if (this.atStart) {
				return true;
			}
			if (this.subcollectionIterator !== null) {
				if (this.subcollectionIterator.hasNext()) {
					return true;
				}
				this.subcollectionIterator = null;
			}
			if (this.index >= this.max) {
				return false;
			}
			return true;
		}
	}, {
		key: 'interfaces_',
		get: function get() {
			return [_javaUtilIterator2['default']];
		}
	}], [{
		key: 'isAtomic',
		value: function isAtomic(geom) {
			return !(geom instanceof _comVividsolutionsJtsGeomGeometryCollection2['default']);
		}
	}]);

	return GeometryCollectionIterator;
})();

exports['default'] = GeometryCollectionIterator;
module.exports = exports['default'];

},{"com/vividsolutions/jts/geom/GeometryCollection":26,"java/util/Iterator":118,"java/util/NoSuchElementException":121}],28:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GeometryComponentFilter = (function () {
	function GeometryComponentFilter() {
		_classCallCheck(this, GeometryComponentFilter);

		this.init_.apply(this, arguments);
	}

	_createClass(GeometryComponentFilter, [{
		key: "init_",
		value: function init_() {
			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			switch (args.length) {}
		}
	}, {
		key: "filter",
		value: function filter(geom) {}
	}, {
		key: "interfaces_",
		get: function get() {
			return [];
		}
	}]);

	return GeometryComponentFilter;
})();

exports["default"] = GeometryComponentFilter;
module.exports = exports["default"];

},{}],29:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _comVividsolutionsJtsGeomCoordinateSequenceFactory = require('com/vividsolutions/jts/geom/CoordinateSequenceFactory');

var _comVividsolutionsJtsGeomCoordinateSequenceFactory2 = _interopRequireDefault(_comVividsolutionsJtsGeomCoordinateSequenceFactory);

var _comVividsolutionsJtsGeomLineString = require('com/vividsolutions/jts/geom/LineString');

var _comVividsolutionsJtsGeomLineString2 = _interopRequireDefault(_comVividsolutionsJtsGeomLineString);

var _comVividsolutionsJtsGeomCoordinate = require('com/vividsolutions/jts/geom/Coordinate');

var _comVividsolutionsJtsGeomCoordinate2 = _interopRequireDefault(_comVividsolutionsJtsGeomCoordinate);

var _comVividsolutionsJtsGeomPoint = require('com/vividsolutions/jts/geom/Point');

var _comVividsolutionsJtsGeomPoint2 = _interopRequireDefault(_comVividsolutionsJtsGeomPoint);

var _comVividsolutionsJtsGeomPolygon = require('com/vividsolutions/jts/geom/Polygon');

var _comVividsolutionsJtsGeomPolygon2 = _interopRequireDefault(_comVividsolutionsJtsGeomPolygon);

var _comVividsolutionsJtsGeomMultiPoint = require('com/vividsolutions/jts/geom/MultiPoint');

var _comVividsolutionsJtsGeomMultiPoint2 = _interopRequireDefault(_comVividsolutionsJtsGeomMultiPoint);

var _comVividsolutionsJtsGeomUtilGeometryEditor = require('com/vividsolutions/jts/geom/util/GeometryEditor');

var _comVividsolutionsJtsGeomUtilGeometryEditor2 = _interopRequireDefault(_comVividsolutionsJtsGeomUtilGeometryEditor);

var _comVividsolutionsJtsGeomLinearRing = require('com/vividsolutions/jts/geom/LinearRing');

var _comVividsolutionsJtsGeomLinearRing2 = _interopRequireDefault(_comVividsolutionsJtsGeomLinearRing);

var _comVividsolutionsJtsGeomImplCoordinateArraySequenceFactory = require('com/vividsolutions/jts/geom/impl/CoordinateArraySequenceFactory');

var _comVividsolutionsJtsGeomImplCoordinateArraySequenceFactory2 = _interopRequireDefault(_comVividsolutionsJtsGeomImplCoordinateArraySequenceFactory);

var _comVividsolutionsJtsGeomMultiPolygon = require('com/vividsolutions/jts/geom/MultiPolygon');

var _comVividsolutionsJtsGeomMultiPolygon2 = _interopRequireDefault(_comVividsolutionsJtsGeomMultiPolygon);

var _comVividsolutionsJtsGeomCoordinateSequences = require('com/vividsolutions/jts/geom/CoordinateSequences');

var _comVividsolutionsJtsGeomCoordinateSequences2 = _interopRequireDefault(_comVividsolutionsJtsGeomCoordinateSequences);

var _comVividsolutionsJtsGeomCoordinateSequence = require('com/vividsolutions/jts/geom/CoordinateSequence');

var _comVividsolutionsJtsGeomCoordinateSequence2 = _interopRequireDefault(_comVividsolutionsJtsGeomCoordinateSequence);

var _comVividsolutionsJtsGeomGeometryCollection = require('com/vividsolutions/jts/geom/GeometryCollection');

var _comVividsolutionsJtsGeomGeometryCollection2 = _interopRequireDefault(_comVividsolutionsJtsGeomGeometryCollection);

var _comVividsolutionsJtsGeomPrecisionModel = require('com/vividsolutions/jts/geom/PrecisionModel');

var _comVividsolutionsJtsGeomPrecisionModel2 = _interopRequireDefault(_comVividsolutionsJtsGeomPrecisionModel);

var _javaIoSerializable = require('java/io/Serializable');

var _javaIoSerializable2 = _interopRequireDefault(_javaIoSerializable);

var _comVividsolutionsJtsUtilAssert = require('com/vividsolutions/jts/util/Assert');

var _comVividsolutionsJtsUtilAssert2 = _interopRequireDefault(_comVividsolutionsJtsUtilAssert);

var _comVividsolutionsJtsGeomMultiLineString = require('com/vividsolutions/jts/geom/MultiLineString');

var _comVividsolutionsJtsGeomMultiLineString2 = _interopRequireDefault(_comVividsolutionsJtsGeomMultiLineString);

var GeometryFactory = (function () {
	function GeometryFactory() {
		_classCallCheck(this, GeometryFactory);

		this.init_.apply(this, arguments);
	}

	_createClass(GeometryFactory, [{
		key: 'init_',
		value: function init_() {
			var _this = this;

			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			this.precisionModel = null;
			this.coordinateSequenceFactory = null;
			this.SRID = null;
			switch (args.length) {
				case 2:
					return (function () {
						for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
							args[_key2] = arguments[_key2];
						}

						var precisionModel = args[0];
						var SRID = args[1];

						_this.init_(precisionModel, SRID, GeometryFactory.getDefaultCoordinateSequenceFactory());
					}).apply(undefined, args);
				case 1:
					if (args[0].interfaces_ && args[0].interfaces_.indexOf(_comVividsolutionsJtsGeomCoordinateSequenceFactory2['default']) > -1) {
						return (function () {
							for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
								args[_key3] = arguments[_key3];
							}

							var coordinateSequenceFactory = args[0];

							_this.init_(new _comVividsolutionsJtsGeomPrecisionModel2['default'](), 0, coordinateSequenceFactory);
						}).apply(undefined, args);
					} else if (args[0] instanceof _comVividsolutionsJtsGeomPrecisionModel2['default']) {
						return (function () {
							for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
								args[_key4] = arguments[_key4];
							}

							var precisionModel = args[0];

							_this.init_(precisionModel, 0, GeometryFactory.getDefaultCoordinateSequenceFactory());
						}).apply(undefined, args);
					}
				case 3:
					return (function () {
						for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
							args[_key5] = arguments[_key5];
						}

						var precisionModel = args[0];
						var SRID = args[1];
						var coordinateSequenceFactory = args[2];

						_this.precisionModel = precisionModel;
						_this.coordinateSequenceFactory = coordinateSequenceFactory;
						_this.SRID = SRID;
					}).apply(undefined, args);
				case 0:
					return (function () {
						for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
							args[_key6] = arguments[_key6];
						}

						_this.init_(new _comVividsolutionsJtsGeomPrecisionModel2['default'](), 0);
					}).apply(undefined, args);
			}
		}
	}, {
		key: 'toGeometry',
		value: function toGeometry(envelope) {
			if (envelope.isNull()) {
				return this.createPoint(null);
			}
			if (envelope.getMinX() === envelope.getMaxX() && envelope.getMinY() === envelope.getMaxY()) {
				return this.createPoint(new _comVividsolutionsJtsGeomCoordinate2['default'](envelope.getMinX(), envelope.getMinY()));
			}
			if (envelope.getMinX() === envelope.getMaxX() || envelope.getMinY() === envelope.getMaxY()) {
				return this.createLineString([new _comVividsolutionsJtsGeomCoordinate2['default'](envelope.getMinX(), envelope.getMinY()), new _comVividsolutionsJtsGeomCoordinate2['default'](envelope.getMaxX(), envelope.getMaxY())]);
			}
			return this.createPolygon(this.createLinearRing([new _comVividsolutionsJtsGeomCoordinate2['default'](envelope.getMinX(), envelope.getMinY()), new _comVividsolutionsJtsGeomCoordinate2['default'](envelope.getMinX(), envelope.getMaxY()), new _comVividsolutionsJtsGeomCoordinate2['default'](envelope.getMaxX(), envelope.getMaxY()), new _comVividsolutionsJtsGeomCoordinate2['default'](envelope.getMaxX(), envelope.getMinY()), new _comVividsolutionsJtsGeomCoordinate2['default'](envelope.getMinX(), envelope.getMinY())]), null);
		}
	}, {
		key: 'createLineString',
		value: function createLineString() {
			var _this2 = this;

			for (var _len7 = arguments.length, args = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
				args[_key7] = arguments[_key7];
			}

			switch (args.length) {
				case 1:
					if (args[0] instanceof Array) {
						return (function () {
							for (var _len8 = arguments.length, args = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
								args[_key8] = arguments[_key8];
							}

							var coordinates = args[0];

							return _this2.createLineString(coordinates !== null ? _this2.getCoordinateSequenceFactory().create(coordinates) : null);
						}).apply(undefined, args);
					} else if (args[0].interfaces_ && args[0].interfaces_.indexOf(_comVividsolutionsJtsGeomCoordinateSequence2['default']) > -1) {
						return (function () {
							for (var _len9 = arguments.length, args = Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
								args[_key9] = arguments[_key9];
							}

							var coordinates = args[0];

							return new _comVividsolutionsJtsGeomLineString2['default'](coordinates, _this2);
						}).apply(undefined, args);
					}
			}
		}
	}, {
		key: 'createMultiLineString',
		value: function createMultiLineString(lineStrings) {
			return new _comVividsolutionsJtsGeomMultiLineString2['default'](lineStrings, this);
		}
	}, {
		key: 'buildGeometry',
		value: function buildGeometry(geomList) {
			var geomClass = null;
			var isHeterogeneous = false;
			var hasGeometryCollection = false;
			for (var i = geomList.iterator(); i.hasNext();) {
				var geom = i.next();
				var partClass = geom.getClass();
				if (geomClass === null) {
					geomClass = partClass;
				}
				if (partClass !== geomClass) {
					isHeterogeneous = true;
				}
				if (geom instanceof _comVividsolutionsJtsGeomGeometryCollection2['default']) hasGeometryCollection = true;
			}
			if (geomClass === null) {
				return this.createGeometryCollection(null);
			}
			if (isHeterogeneous || hasGeometryCollection) {
				return this.createGeometryCollection(GeometryFactory.toGeometryArray(geomList));
			}
			var geom0 = geomList.iterator().next();
			var isCollection = geomList.size() > 1;
			if (isCollection) {
				if (geom0 instanceof _comVividsolutionsJtsGeomPolygon2['default']) {
					return this.createMultiPolygon(GeometryFactory.toPolygonArray(geomList));
				} else if (geom0 instanceof _comVividsolutionsJtsGeomLineString2['default']) {
					return this.createMultiLineString(GeometryFactory.toLineStringArray(geomList));
				} else if (geom0 instanceof _comVividsolutionsJtsGeomPoint2['default']) {
					return this.createMultiPoint(GeometryFactory.toPointArray(geomList));
				}
				_comVividsolutionsJtsUtilAssert2['default'].shouldNeverReachHere("Unhandled class: " + geom0.getClass().getName());
			}
			return geom0;
		}
	}, {
		key: 'createPoint',
		value: function createPoint() {
			var _this3 = this;

			for (var _len10 = arguments.length, args = Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
				args[_key10] = arguments[_key10];
			}

			switch (args.length) {
				case 1:
					if (args[0] instanceof _comVividsolutionsJtsGeomCoordinate2['default']) {
						return (function () {
							for (var _len11 = arguments.length, args = Array(_len11), _key11 = 0; _key11 < _len11; _key11++) {
								args[_key11] = arguments[_key11];
							}

							var coordinate = args[0];

							return _this3.createPoint(coordinate !== null ? _this3.getCoordinateSequenceFactory().create([coordinate]) : null);
						}).apply(undefined, args);
					} else if (args[0].interfaces_ && args[0].interfaces_.indexOf(_comVividsolutionsJtsGeomCoordinateSequence2['default']) > -1) {
						return (function () {
							for (var _len12 = arguments.length, args = Array(_len12), _key12 = 0; _key12 < _len12; _key12++) {
								args[_key12] = arguments[_key12];
							}

							var coordinates = args[0];

							return new _comVividsolutionsJtsGeomPoint2['default'](coordinates, _this3);
						}).apply(undefined, args);
					}
			}
		}
	}, {
		key: 'getCoordinateSequenceFactory',
		value: function getCoordinateSequenceFactory() {
			return this.coordinateSequenceFactory;
		}
	}, {
		key: 'createPolygon',
		value: function createPolygon() {
			var _this4 = this;

			for (var _len13 = arguments.length, args = Array(_len13), _key13 = 0; _key13 < _len13; _key13++) {
				args[_key13] = arguments[_key13];
			}

			switch (args.length) {
				case 2:
					return (function () {
						for (var _len14 = arguments.length, args = Array(_len14), _key14 = 0; _key14 < _len14; _key14++) {
							args[_key14] = arguments[_key14];
						}

						var shell = args[0];
						var holes = args[1];

						return new _comVividsolutionsJtsGeomPolygon2['default'](shell, holes, _this4);
					}).apply(undefined, args);
				case 1:
					if (args[0].interfaces_ && args[0].interfaces_.indexOf(_comVividsolutionsJtsGeomCoordinateSequence2['default']) > -1) {
						return (function () {
							for (var _len15 = arguments.length, args = Array(_len15), _key15 = 0; _key15 < _len15; _key15++) {
								args[_key15] = arguments[_key15];
							}

							var coordinates = args[0];

							return _this4.createPolygon(_this4.createLinearRing(coordinates));
						}).apply(undefined, args);
					} else if (args[0] instanceof Array) {
						return (function () {
							for (var _len16 = arguments.length, args = Array(_len16), _key16 = 0; _key16 < _len16; _key16++) {
								args[_key16] = arguments[_key16];
							}

							var coordinates = args[0];

							return _this4.createPolygon(_this4.createLinearRing(coordinates));
						}).apply(undefined, args);
					} else if (args[0] instanceof _comVividsolutionsJtsGeomLinearRing2['default']) {
						return (function () {
							for (var _len17 = arguments.length, args = Array(_len17), _key17 = 0; _key17 < _len17; _key17++) {
								args[_key17] = arguments[_key17];
							}

							var shell = args[0];

							return _this4.createPolygon(shell, null);
						}).apply(undefined, args);
					}
			}
		}
	}, {
		key: 'getSRID',
		value: function getSRID() {
			return this.SRID;
		}
	}, {
		key: 'createGeometryCollection',
		value: function createGeometryCollection(geometries) {
			return new _comVividsolutionsJtsGeomGeometryCollection2['default'](geometries, this);
		}
	}, {
		key: 'createGeometry',
		value: function createGeometry(g) {
			var editor = new _comVividsolutionsJtsGeomUtilGeometryEditor2['default'](this);
			return editor.edit(g, new _comVividsolutionsJtsGeomUtilGeometryEditor2['default'].CoordinateSequenceOperation());
		}
	}, {
		key: 'getPrecisionModel',
		value: function getPrecisionModel() {
			return this.precisionModel;
		}
	}, {
		key: 'createLinearRing',
		value: function createLinearRing() {
			var _this5 = this;

			for (var _len18 = arguments.length, args = Array(_len18), _key18 = 0; _key18 < _len18; _key18++) {
				args[_key18] = arguments[_key18];
			}

			switch (args.length) {
				case 1:
					if (args[0] instanceof Array) {
						return (function () {
							for (var _len19 = arguments.length, args = Array(_len19), _key19 = 0; _key19 < _len19; _key19++) {
								args[_key19] = arguments[_key19];
							}

							var coordinates = args[0];

							return _this5.createLinearRing(coordinates !== null ? _this5.getCoordinateSequenceFactory().create(coordinates) : null);
						}).apply(undefined, args);
					} else if (args[0].interfaces_ && args[0].interfaces_.indexOf(_comVividsolutionsJtsGeomCoordinateSequence2['default']) > -1) {
						return (function () {
							for (var _len20 = arguments.length, args = Array(_len20), _key20 = 0; _key20 < _len20; _key20++) {
								args[_key20] = arguments[_key20];
							}

							var coordinates = args[0];

							return new _comVividsolutionsJtsGeomLinearRing2['default'](coordinates, _this5);
						}).apply(undefined, args);
					}
			}
		}
	}, {
		key: 'createMultiPolygon',
		value: function createMultiPolygon(polygons) {
			return new _comVividsolutionsJtsGeomMultiPolygon2['default'](polygons, this);
		}
	}, {
		key: 'createMultiPoint',
		value: function createMultiPoint() {
			var _this6 = this;

			for (var _len21 = arguments.length, args = Array(_len21), _key21 = 0; _key21 < _len21; _key21++) {
				args[_key21] = arguments[_key21];
			}

			switch (args.length) {
				case 1:
					if (args[0] instanceof Array) {
						return (function () {
							for (var _len22 = arguments.length, args = Array(_len22), _key22 = 0; _key22 < _len22; _key22++) {
								args[_key22] = arguments[_key22];
							}

							var point = args[0];

							return new _comVividsolutionsJtsGeomMultiPoint2['default'](point, _this6);
						}).apply(undefined, args);
					} else if (args[0] instanceof Array) {
						return (function () {
							for (var _len23 = arguments.length, args = Array(_len23), _key23 = 0; _key23 < _len23; _key23++) {
								args[_key23] = arguments[_key23];
							}

							var coordinates = args[0];

							return _this6.createMultiPoint(coordinates !== null ? _this6.getCoordinateSequenceFactory().create(coordinates) : null);
						}).apply(undefined, args);
					} else if (args[0].interfaces_ && args[0].interfaces_.indexOf(_comVividsolutionsJtsGeomCoordinateSequence2['default']) > -1) {
						return (function () {
							for (var _len24 = arguments.length, args = Array(_len24), _key24 = 0; _key24 < _len24; _key24++) {
								args[_key24] = arguments[_key24];
							}

							var coordinates = args[0];

							if (coordinates === null) {
								return _this6.createMultiPoint([]);
							}
							var points = [];
							for (var i = 0; i < coordinates.size(); i++) {
								var ptSeq = _this6.getCoordinateSequenceFactory().create(1, coordinates.getDimension());
								_comVividsolutionsJtsGeomCoordinateSequences2['default'].copy(coordinates, i, ptSeq, 0, 1);
								points[i] = _this6.createPoint(ptSeq);
							}
							return _this6.createMultiPoint(points);
						}).apply(undefined, args);
					}
			}
		}
	}, {
		key: 'interfaces_',
		get: function get() {
			return [_javaIoSerializable2['default']];
		}
	}], [{
		key: 'toMultiPolygonArray',
		value: function toMultiPolygonArray(multiPolygons) {
			var multiPolygonArray = [];
			return multiPolygons.toArray(multiPolygonArray);
		}
	}, {
		key: 'toGeometryArray',
		value: function toGeometryArray(geometries) {
			if (geometries === null) return null;
			var geometryArray = [];
			return geometries.toArray(geometryArray);
		}
	}, {
		key: 'getDefaultCoordinateSequenceFactory',
		value: function getDefaultCoordinateSequenceFactory() {
			return _comVividsolutionsJtsGeomImplCoordinateArraySequenceFactory2['default'].instance();
		}
	}, {
		key: 'toMultiLineStringArray',
		value: function toMultiLineStringArray(multiLineStrings) {
			var multiLineStringArray = [];
			return multiLineStrings.toArray(multiLineStringArray);
		}
	}, {
		key: 'toLineStringArray',
		value: function toLineStringArray(lineStrings) {
			var lineStringArray = [];
			return lineStrings.toArray(lineStringArray);
		}
	}, {
		key: 'toMultiPointArray',
		value: function toMultiPointArray(multiPoints) {
			var multiPointArray = [];
			return multiPoints.toArray(multiPointArray);
		}
	}, {
		key: 'toLinearRingArray',
		value: function toLinearRingArray(linearRings) {
			var linearRingArray = [];
			return linearRings.toArray(linearRingArray);
		}
	}, {
		key: 'toPointArray',
		value: function toPointArray(points) {
			var pointArray = [];
			return points.toArray(pointArray);
		}
	}, {
		key: 'toPolygonArray',
		value: function toPolygonArray(polygons) {
			var polygonArray = [];
			return polygons.toArray(polygonArray);
		}
	}, {
		key: 'createPointFromInternalCoord',
		value: function createPointFromInternalCoord(coord, exemplar) {
			exemplar.getPrecisionModel().makePrecise(coord);
			return exemplar.getFactory().createPoint(coord);
		}
	}]);

	return GeometryFactory;
})();

exports['default'] = GeometryFactory;

GeometryFactory.serialVersionUID = -6820524753094095635;
module.exports = exports['default'];

},{"com/vividsolutions/jts/geom/Coordinate":15,"com/vividsolutions/jts/geom/CoordinateSequence":19,"com/vividsolutions/jts/geom/CoordinateSequenceFactory":20,"com/vividsolutions/jts/geom/CoordinateSequences":22,"com/vividsolutions/jts/geom/GeometryCollection":26,"com/vividsolutions/jts/geom/LineString":33,"com/vividsolutions/jts/geom/LinearRing":35,"com/vividsolutions/jts/geom/MultiLineString":37,"com/vividsolutions/jts/geom/MultiPoint":38,"com/vividsolutions/jts/geom/MultiPolygon":39,"com/vividsolutions/jts/geom/Point":40,"com/vividsolutions/jts/geom/Polygon":41,"com/vividsolutions/jts/geom/PrecisionModel":43,"com/vividsolutions/jts/geom/impl/CoordinateArraySequenceFactory":47,"com/vividsolutions/jts/geom/util/GeometryEditor":48,"com/vividsolutions/jts/util/Assert":97,"java/io/Serializable":101}],30:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GeometryFilter = (function () {
	function GeometryFilter() {
		_classCallCheck(this, GeometryFilter);

		this.init_.apply(this, arguments);
	}

	_createClass(GeometryFilter, [{
		key: "init_",
		value: function init_() {
			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			switch (args.length) {}
		}
	}, {
		key: "filter",
		value: function filter(geom) {}
	}, {
		key: "interfaces_",
		get: function get() {
			return [];
		}
	}]);

	return GeometryFilter;
})();

exports["default"] = GeometryFilter;
module.exports = exports["default"];

},{}],31:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _comVividsolutionsJtsGeomLocation = require('com/vividsolutions/jts/geom/Location');

var _comVividsolutionsJtsGeomLocation2 = _interopRequireDefault(_comVividsolutionsJtsGeomLocation);

var _comVividsolutionsJtsGeomDimension = require('com/vividsolutions/jts/geom/Dimension');

var _comVividsolutionsJtsGeomDimension2 = _interopRequireDefault(_comVividsolutionsJtsGeomDimension);

var _javaLangCloneable = require('java/lang/Cloneable');

var _javaLangCloneable2 = _interopRequireDefault(_javaLangCloneable);

var IntersectionMatrix = (function () {
	function IntersectionMatrix() {
		_classCallCheck(this, IntersectionMatrix);

		this.init_.apply(this, arguments);
	}

	_createClass(IntersectionMatrix, [{
		key: 'init_',
		value: function init_() {
			var _this = this;

			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			this.matrix = null;
			switch (args.length) {
				case 1:
					if (typeof args[0] === "string") {
						return (function () {
							for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
								args[_key2] = arguments[_key2];
							}

							var elements = args[0];

							_this.init_();
							_this.set(elements);
						}).apply(undefined, args);
					} else if (args[0] instanceof IntersectionMatrix) {
						return (function () {
							for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
								args[_key3] = arguments[_key3];
							}

							var other = args[0];

							_this.init_();
							_this.matrix[_comVividsolutionsJtsGeomLocation2['default'].INTERIOR][_comVividsolutionsJtsGeomLocation2['default'].INTERIOR] = other.matrix[_comVividsolutionsJtsGeomLocation2['default'].INTERIOR][_comVividsolutionsJtsGeomLocation2['default'].INTERIOR];
							_this.matrix[_comVividsolutionsJtsGeomLocation2['default'].INTERIOR][_comVividsolutionsJtsGeomLocation2['default'].BOUNDARY] = other.matrix[_comVividsolutionsJtsGeomLocation2['default'].INTERIOR][_comVividsolutionsJtsGeomLocation2['default'].BOUNDARY];
							_this.matrix[_comVividsolutionsJtsGeomLocation2['default'].INTERIOR][_comVividsolutionsJtsGeomLocation2['default'].EXTERIOR] = other.matrix[_comVividsolutionsJtsGeomLocation2['default'].INTERIOR][_comVividsolutionsJtsGeomLocation2['default'].EXTERIOR];
							_this.matrix[_comVividsolutionsJtsGeomLocation2['default'].BOUNDARY][_comVividsolutionsJtsGeomLocation2['default'].INTERIOR] = other.matrix[_comVividsolutionsJtsGeomLocation2['default'].BOUNDARY][_comVividsolutionsJtsGeomLocation2['default'].INTERIOR];
							_this.matrix[_comVividsolutionsJtsGeomLocation2['default'].BOUNDARY][_comVividsolutionsJtsGeomLocation2['default'].BOUNDARY] = other.matrix[_comVividsolutionsJtsGeomLocation2['default'].BOUNDARY][_comVividsolutionsJtsGeomLocation2['default'].BOUNDARY];
							_this.matrix[_comVividsolutionsJtsGeomLocation2['default'].BOUNDARY][_comVividsolutionsJtsGeomLocation2['default'].EXTERIOR] = other.matrix[_comVividsolutionsJtsGeomLocation2['default'].BOUNDARY][_comVividsolutionsJtsGeomLocation2['default'].EXTERIOR];
							_this.matrix[_comVividsolutionsJtsGeomLocation2['default'].EXTERIOR][_comVividsolutionsJtsGeomLocation2['default'].INTERIOR] = other.matrix[_comVividsolutionsJtsGeomLocation2['default'].EXTERIOR][_comVividsolutionsJtsGeomLocation2['default'].INTERIOR];
							_this.matrix[_comVividsolutionsJtsGeomLocation2['default'].EXTERIOR][_comVividsolutionsJtsGeomLocation2['default'].BOUNDARY] = other.matrix[_comVividsolutionsJtsGeomLocation2['default'].EXTERIOR][_comVividsolutionsJtsGeomLocation2['default'].BOUNDARY];
							_this.matrix[_comVividsolutionsJtsGeomLocation2['default'].EXTERIOR][_comVividsolutionsJtsGeomLocation2['default'].EXTERIOR] = other.matrix[_comVividsolutionsJtsGeomLocation2['default'].EXTERIOR][_comVividsolutionsJtsGeomLocation2['default'].EXTERIOR];
						}).apply(undefined, args);
					}
				case 0:
					return (function () {
						for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
							args[_key4] = arguments[_key4];
						}

						_this.matrix = [[], [], []];
						_this.setAll(_comVividsolutionsJtsGeomDimension2['default'].FALSE);
					}).apply(undefined, args);
			}
		}
	}, {
		key: 'isIntersects',
		value: function isIntersects() {
			return !this.isDisjoint();
		}
	}, {
		key: 'isCovers',
		value: function isCovers() {
			var hasPointInCommon = IntersectionMatrix.isTrue(this.matrix[_comVividsolutionsJtsGeomLocation2['default'].INTERIOR][_comVividsolutionsJtsGeomLocation2['default'].INTERIOR]) || (IntersectionMatrix.isTrue(this.matrix[_comVividsolutionsJtsGeomLocation2['default'].INTERIOR][_comVividsolutionsJtsGeomLocation2['default'].BOUNDARY]) || (IntersectionMatrix.isTrue(this.matrix[_comVividsolutionsJtsGeomLocation2['default'].BOUNDARY][_comVividsolutionsJtsGeomLocation2['default'].INTERIOR]) || IntersectionMatrix.isTrue(this.matrix[_comVividsolutionsJtsGeomLocation2['default'].BOUNDARY][_comVividsolutionsJtsGeomLocation2['default'].BOUNDARY])));
			return hasPointInCommon && this.matrix[_comVividsolutionsJtsGeomLocation2['default'].EXTERIOR][_comVividsolutionsJtsGeomLocation2['default'].INTERIOR] === _comVividsolutionsJtsGeomDimension2['default'].FALSE && this.matrix[_comVividsolutionsJtsGeomLocation2['default'].EXTERIOR][_comVividsolutionsJtsGeomLocation2['default'].BOUNDARY] === _comVividsolutionsJtsGeomDimension2['default'].FALSE;
		}
	}, {
		key: 'isCoveredBy',
		value: function isCoveredBy() {
			var hasPointInCommon = IntersectionMatrix.isTrue(this.matrix[_comVividsolutionsJtsGeomLocation2['default'].INTERIOR][_comVividsolutionsJtsGeomLocation2['default'].INTERIOR]) || (IntersectionMatrix.isTrue(this.matrix[_comVividsolutionsJtsGeomLocation2['default'].INTERIOR][_comVividsolutionsJtsGeomLocation2['default'].BOUNDARY]) || (IntersectionMatrix.isTrue(this.matrix[_comVividsolutionsJtsGeomLocation2['default'].BOUNDARY][_comVividsolutionsJtsGeomLocation2['default'].INTERIOR]) || IntersectionMatrix.isTrue(this.matrix[_comVividsolutionsJtsGeomLocation2['default'].BOUNDARY][_comVividsolutionsJtsGeomLocation2['default'].BOUNDARY])));
			return hasPointInCommon && this.matrix[_comVividsolutionsJtsGeomLocation2['default'].INTERIOR][_comVividsolutionsJtsGeomLocation2['default'].EXTERIOR] === _comVividsolutionsJtsGeomDimension2['default'].FALSE && this.matrix[_comVividsolutionsJtsGeomLocation2['default'].BOUNDARY][_comVividsolutionsJtsGeomLocation2['default'].EXTERIOR] === _comVividsolutionsJtsGeomDimension2['default'].FALSE;
		}
	}, {
		key: 'set',
		value: function set() {
			var _this2 = this;

			for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
				args[_key5] = arguments[_key5];
			}

			switch (args.length) {
				case 1:
					return (function () {
						for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
							args[_key6] = arguments[_key6];
						}

						var dimensionSymbols = args[0];

						for (var i = 0; i < dimensionSymbols.length(); i++) {
							var row = i / 3;
							var col = i % 3;
							_this2.matrix[row][col] = _comVividsolutionsJtsGeomDimension2['default'].toDimensionValue(dimensionSymbols.charAt(i));
						}
					}).apply(undefined, args);
				case 3:
					return (function () {
						for (var _len7 = arguments.length, args = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
							args[_key7] = arguments[_key7];
						}

						var row = args[0];
						var column = args[1];
						var dimensionValue = args[2];

						_this2.matrix[row][column] = dimensionValue;
					}).apply(undefined, args);
			}
		}
	}, {
		key: 'isContains',
		value: function isContains() {
			return IntersectionMatrix.isTrue(this.matrix[_comVividsolutionsJtsGeomLocation2['default'].INTERIOR][_comVividsolutionsJtsGeomLocation2['default'].INTERIOR]) && this.matrix[_comVividsolutionsJtsGeomLocation2['default'].EXTERIOR][_comVividsolutionsJtsGeomLocation2['default'].INTERIOR] === _comVividsolutionsJtsGeomDimension2['default'].FALSE && this.matrix[_comVividsolutionsJtsGeomLocation2['default'].EXTERIOR][_comVividsolutionsJtsGeomLocation2['default'].BOUNDARY] === _comVividsolutionsJtsGeomDimension2['default'].FALSE;
		}
	}, {
		key: 'setAtLeast',
		value: function setAtLeast() {
			var _this3 = this;

			for (var _len8 = arguments.length, args = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
				args[_key8] = arguments[_key8];
			}

			switch (args.length) {
				case 1:
					return (function () {
						for (var _len9 = arguments.length, args = Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
							args[_key9] = arguments[_key9];
						}

						var minimumDimensionSymbols = args[0];

						for (var i = 0; i < minimumDimensionSymbols.length(); i++) {
							var row = i / 3;
							var col = i % 3;
							_this3.setAtLeast(row, col, _comVividsolutionsJtsGeomDimension2['default'].toDimensionValue(minimumDimensionSymbols.charAt(i)));
						}
					}).apply(undefined, args);
				case 3:
					return (function () {
						for (var _len10 = arguments.length, args = Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
							args[_key10] = arguments[_key10];
						}

						var row = args[0];
						var column = args[1];
						var minimumDimensionValue = args[2];

						if (_this3.matrix[row][column] < minimumDimensionValue) {
							_this3.matrix[row][column] = minimumDimensionValue;
						}
					}).apply(undefined, args);
			}
		}
	}, {
		key: 'setAtLeastIfValid',
		value: function setAtLeastIfValid(row, column, minimumDimensionValue) {
			if (row >= 0 && column >= 0) {
				this.setAtLeast(row, column, minimumDimensionValue);
			}
		}
	}, {
		key: 'isWithin',
		value: function isWithin() {
			return IntersectionMatrix.isTrue(this.matrix[_comVividsolutionsJtsGeomLocation2['default'].INTERIOR][_comVividsolutionsJtsGeomLocation2['default'].INTERIOR]) && this.matrix[_comVividsolutionsJtsGeomLocation2['default'].INTERIOR][_comVividsolutionsJtsGeomLocation2['default'].EXTERIOR] === _comVividsolutionsJtsGeomDimension2['default'].FALSE && this.matrix[_comVividsolutionsJtsGeomLocation2['default'].BOUNDARY][_comVividsolutionsJtsGeomLocation2['default'].EXTERIOR] === _comVividsolutionsJtsGeomDimension2['default'].FALSE;
		}
	}, {
		key: 'isTouches',
		value: function isTouches(dimensionOfGeometryA, dimensionOfGeometryB) {
			if (dimensionOfGeometryA > dimensionOfGeometryB) {
				return this.isTouches(dimensionOfGeometryB, dimensionOfGeometryA);
			}
			if (dimensionOfGeometryA === _comVividsolutionsJtsGeomDimension2['default'].A && dimensionOfGeometryB === _comVividsolutionsJtsGeomDimension2['default'].A || (dimensionOfGeometryA === _comVividsolutionsJtsGeomDimension2['default'].L && dimensionOfGeometryB === _comVividsolutionsJtsGeomDimension2['default'].L || (dimensionOfGeometryA === _comVividsolutionsJtsGeomDimension2['default'].L && dimensionOfGeometryB === _comVividsolutionsJtsGeomDimension2['default'].A || (dimensionOfGeometryA === _comVividsolutionsJtsGeomDimension2['default'].P && dimensionOfGeometryB === _comVividsolutionsJtsGeomDimension2['default'].A || dimensionOfGeometryA === _comVividsolutionsJtsGeomDimension2['default'].P && dimensionOfGeometryB === _comVividsolutionsJtsGeomDimension2['default'].L)))) {
				return this.matrix[_comVividsolutionsJtsGeomLocation2['default'].INTERIOR][_comVividsolutionsJtsGeomLocation2['default'].INTERIOR] === _comVividsolutionsJtsGeomDimension2['default'].FALSE && (IntersectionMatrix.isTrue(this.matrix[_comVividsolutionsJtsGeomLocation2['default'].INTERIOR][_comVividsolutionsJtsGeomLocation2['default'].BOUNDARY]) || (IntersectionMatrix.isTrue(this.matrix[_comVividsolutionsJtsGeomLocation2['default'].BOUNDARY][_comVividsolutionsJtsGeomLocation2['default'].INTERIOR]) || IntersectionMatrix.isTrue(this.matrix[_comVividsolutionsJtsGeomLocation2['default'].BOUNDARY][_comVividsolutionsJtsGeomLocation2['default'].BOUNDARY])));
			}
			return false;
		}
	}, {
		key: 'isOverlaps',
		value: function isOverlaps(dimensionOfGeometryA, dimensionOfGeometryB) {
			if (dimensionOfGeometryA === _comVividsolutionsJtsGeomDimension2['default'].P && dimensionOfGeometryB === _comVividsolutionsJtsGeomDimension2['default'].P || dimensionOfGeometryA === _comVividsolutionsJtsGeomDimension2['default'].A && dimensionOfGeometryB === _comVividsolutionsJtsGeomDimension2['default'].A) {
				return IntersectionMatrix.isTrue(this.matrix[_comVividsolutionsJtsGeomLocation2['default'].INTERIOR][_comVividsolutionsJtsGeomLocation2['default'].INTERIOR]) && (IntersectionMatrix.isTrue(this.matrix[_comVividsolutionsJtsGeomLocation2['default'].INTERIOR][_comVividsolutionsJtsGeomLocation2['default'].EXTERIOR]) && IntersectionMatrix.isTrue(this.matrix[_comVividsolutionsJtsGeomLocation2['default'].EXTERIOR][_comVividsolutionsJtsGeomLocation2['default'].INTERIOR]));
			}
			if (dimensionOfGeometryA === _comVividsolutionsJtsGeomDimension2['default'].L && dimensionOfGeometryB === _comVividsolutionsJtsGeomDimension2['default'].L) {
				return this.matrix[_comVividsolutionsJtsGeomLocation2['default'].INTERIOR][_comVividsolutionsJtsGeomLocation2['default'].INTERIOR] === 1 && IntersectionMatrix.isTrue(this.matrix[_comVividsolutionsJtsGeomLocation2['default'].INTERIOR][_comVividsolutionsJtsGeomLocation2['default'].EXTERIOR]) && IntersectionMatrix.isTrue(this.matrix[_comVividsolutionsJtsGeomLocation2['default'].EXTERIOR][_comVividsolutionsJtsGeomLocation2['default'].INTERIOR]);
			}
			return false;
		}
	}, {
		key: 'isEquals',
		value: function isEquals(dimensionOfGeometryA, dimensionOfGeometryB) {
			if (dimensionOfGeometryA !== dimensionOfGeometryB) {
				return false;
			}
			return IntersectionMatrix.isTrue(this.matrix[_comVividsolutionsJtsGeomLocation2['default'].INTERIOR][_comVividsolutionsJtsGeomLocation2['default'].INTERIOR]) && this.matrix[_comVividsolutionsJtsGeomLocation2['default'].INTERIOR][_comVividsolutionsJtsGeomLocation2['default'].EXTERIOR] === _comVividsolutionsJtsGeomDimension2['default'].FALSE && this.matrix[_comVividsolutionsJtsGeomLocation2['default'].BOUNDARY][_comVividsolutionsJtsGeomLocation2['default'].EXTERIOR] === _comVividsolutionsJtsGeomDimension2['default'].FALSE && this.matrix[_comVividsolutionsJtsGeomLocation2['default'].EXTERIOR][_comVividsolutionsJtsGeomLocation2['default'].INTERIOR] === _comVividsolutionsJtsGeomDimension2['default'].FALSE && this.matrix[_comVividsolutionsJtsGeomLocation2['default'].EXTERIOR][_comVividsolutionsJtsGeomLocation2['default'].BOUNDARY] === _comVividsolutionsJtsGeomDimension2['default'].FALSE;
		}
	}, {
		key: 'toString',
		value: function toString() {
			var buf = new StringBuffer("123456789");
			for (var ai = 0; ai < 3; ai++) {
				for (var bi = 0; bi < 3; bi++) {
					buf.setCharAt(3 * ai + bi, _comVividsolutionsJtsGeomDimension2['default'].toDimensionSymbol(this.matrix[ai][bi]));
				}
			}
			return buf.toString();
		}
	}, {
		key: 'setAll',
		value: function setAll(dimensionValue) {
			for (var ai = 0; ai < 3; ai++) {
				for (var bi = 0; bi < 3; bi++) {
					this.matrix[ai][bi] = dimensionValue;
				}
			}
		}
	}, {
		key: 'get',
		value: function get(row, column) {
			return this.matrix[row][column];
		}
	}, {
		key: 'transpose',
		value: function transpose() {
			var temp = this.matrix[1][0];
			this.matrix[1][0] = this.matrix[0][1];
			this.matrix[0][1] = temp;
			temp = this.matrix[2][0];
			this.matrix[2][0] = this.matrix[0][2];
			this.matrix[0][2] = temp;
			temp = this.matrix[2][1];
			this.matrix[2][1] = this.matrix[1][2];
			this.matrix[1][2] = temp;
			return this;
		}
	}, {
		key: 'matches',
		value: function matches(requiredDimensionSymbols) {
			if (requiredDimensionSymbols.length() !== 9) {
				throw new IllegalArgumentException("Should be length 9: " + requiredDimensionSymbols);
			}
			for (var ai = 0; ai < 3; ai++) {
				for (var bi = 0; bi < 3; bi++) {
					if (!IntersectionMatrix.matches(this.matrix[ai][bi], requiredDimensionSymbols.charAt(3 * ai + bi))) {
						return false;
					}
				}
			}
			return true;
		}
	}, {
		key: 'add',
		value: function add(im) {
			for (var i = 0; i < 3; i++) {
				for (var j = 0; j < 3; j++) {
					this.setAtLeast(i, j, im.get(i, j));
				}
			}
		}
	}, {
		key: 'isDisjoint',
		value: function isDisjoint() {
			return this.matrix[_comVividsolutionsJtsGeomLocation2['default'].INTERIOR][_comVividsolutionsJtsGeomLocation2['default'].INTERIOR] === _comVividsolutionsJtsGeomDimension2['default'].FALSE && this.matrix[_comVividsolutionsJtsGeomLocation2['default'].INTERIOR][_comVividsolutionsJtsGeomLocation2['default'].BOUNDARY] === _comVividsolutionsJtsGeomDimension2['default'].FALSE && this.matrix[_comVividsolutionsJtsGeomLocation2['default'].BOUNDARY][_comVividsolutionsJtsGeomLocation2['default'].INTERIOR] === _comVividsolutionsJtsGeomDimension2['default'].FALSE && this.matrix[_comVividsolutionsJtsGeomLocation2['default'].BOUNDARY][_comVividsolutionsJtsGeomLocation2['default'].BOUNDARY] === _comVividsolutionsJtsGeomDimension2['default'].FALSE;
		}
	}, {
		key: 'isCrosses',
		value: function isCrosses(dimensionOfGeometryA, dimensionOfGeometryB) {
			if (dimensionOfGeometryA === _comVividsolutionsJtsGeomDimension2['default'].P && dimensionOfGeometryB === _comVividsolutionsJtsGeomDimension2['default'].L || (dimensionOfGeometryA === _comVividsolutionsJtsGeomDimension2['default'].P && dimensionOfGeometryB === _comVividsolutionsJtsGeomDimension2['default'].A || dimensionOfGeometryA === _comVividsolutionsJtsGeomDimension2['default'].L && dimensionOfGeometryB === _comVividsolutionsJtsGeomDimension2['default'].A)) {
				return IntersectionMatrix.isTrue(this.matrix[_comVividsolutionsJtsGeomLocation2['default'].INTERIOR][_comVividsolutionsJtsGeomLocation2['default'].INTERIOR]) && IntersectionMatrix.isTrue(this.matrix[_comVividsolutionsJtsGeomLocation2['default'].INTERIOR][_comVividsolutionsJtsGeomLocation2['default'].EXTERIOR]);
			}
			if (dimensionOfGeometryA === _comVividsolutionsJtsGeomDimension2['default'].L && dimensionOfGeometryB === _comVividsolutionsJtsGeomDimension2['default'].P || (dimensionOfGeometryA === _comVividsolutionsJtsGeomDimension2['default'].A && dimensionOfGeometryB === _comVividsolutionsJtsGeomDimension2['default'].P || dimensionOfGeometryA === _comVividsolutionsJtsGeomDimension2['default'].A && dimensionOfGeometryB === _comVividsolutionsJtsGeomDimension2['default'].L)) {
				return IntersectionMatrix.isTrue(this.matrix[_comVividsolutionsJtsGeomLocation2['default'].INTERIOR][_comVividsolutionsJtsGeomLocation2['default'].INTERIOR]) && IntersectionMatrix.isTrue(this.matrix[_comVividsolutionsJtsGeomLocation2['default'].EXTERIOR][_comVividsolutionsJtsGeomLocation2['default'].INTERIOR]);
			}
			if (dimensionOfGeometryA === _comVividsolutionsJtsGeomDimension2['default'].L && dimensionOfGeometryB === _comVividsolutionsJtsGeomDimension2['default'].L) {
				return this.matrix[_comVividsolutionsJtsGeomLocation2['default'].INTERIOR][_comVividsolutionsJtsGeomLocation2['default'].INTERIOR] === 0;
			}
			return false;
		}
	}, {
		key: 'interfaces_',
		get: function get() {
			return [_javaLangCloneable2['default']];
		}
	}], [{
		key: 'matches',
		value: function matches() {
			for (var _len11 = arguments.length, args = Array(_len11), _key11 = 0; _key11 < _len11; _key11++) {
				args[_key11] = arguments[_key11];
			}

			switch (args.length) {
				case 2:
					if (Number.isInteger(args[0]) && args[1] instanceof char) {
						return (function () {
							for (var _len12 = arguments.length, args = Array(_len12), _key12 = 0; _key12 < _len12; _key12++) {
								args[_key12] = arguments[_key12];
							}

							var actualDimensionValue = args[0];
							var requiredDimensionSymbol = args[1];

							if (requiredDimensionSymbol === _comVividsolutionsJtsGeomDimension2['default'].SYM_DONTCARE) {
								return true;
							}
							if (requiredDimensionSymbol === _comVividsolutionsJtsGeomDimension2['default'].SYM_TRUE && (actualDimensionValue >= 0 || actualDimensionValue === _comVividsolutionsJtsGeomDimension2['default'].TRUE)) {
								return true;
							}
							if (requiredDimensionSymbol === _comVividsolutionsJtsGeomDimension2['default'].SYM_FALSE && actualDimensionValue === _comVividsolutionsJtsGeomDimension2['default'].FALSE) {
								return true;
							}
							if (requiredDimensionSymbol === _comVividsolutionsJtsGeomDimension2['default'].SYM_P && actualDimensionValue === _comVividsolutionsJtsGeomDimension2['default'].P) {
								return true;
							}
							if (requiredDimensionSymbol === _comVividsolutionsJtsGeomDimension2['default'].SYM_L && actualDimensionValue === _comVividsolutionsJtsGeomDimension2['default'].L) {
								return true;
							}
							if (requiredDimensionSymbol === _comVividsolutionsJtsGeomDimension2['default'].SYM_A && actualDimensionValue === _comVividsolutionsJtsGeomDimension2['default'].A) {
								return true;
							}
							return false;
						}).apply(undefined, args);
					} else if (typeof args[0] === "string" && typeof args[1] === "string") {
						return (function () {
							for (var _len13 = arguments.length, args = Array(_len13), _key13 = 0; _key13 < _len13; _key13++) {
								args[_key13] = arguments[_key13];
							}

							var actualDimensionSymbols = args[0];
							var requiredDimensionSymbols = args[1];

							var m = new IntersectionMatrix(actualDimensionSymbols);
							return m.matches(requiredDimensionSymbols);
						}).apply(undefined, args);
					}
			}
		}
	}, {
		key: 'isTrue',
		value: function isTrue(actualDimensionValue) {
			if (actualDimensionValue >= 0 || actualDimensionValue === _comVividsolutionsJtsGeomDimension2['default'].TRUE) {
				return true;
			}
			return false;
		}
	}]);

	return IntersectionMatrix;
})();

exports['default'] = IntersectionMatrix;
module.exports = exports['default'];

},{"com/vividsolutions/jts/geom/Dimension":23,"com/vividsolutions/jts/geom/Location":36,"java/lang/Cloneable":104}],32:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _comVividsolutionsJtsAlgorithmNotRepresentableException = require('com/vividsolutions/jts/algorithm/NotRepresentableException');

var _comVividsolutionsJtsAlgorithmNotRepresentableException2 = _interopRequireDefault(_comVividsolutionsJtsAlgorithmNotRepresentableException);

var _comVividsolutionsJtsAlgorithmCGAlgorithms = require('com/vividsolutions/jts/algorithm/CGAlgorithms');

var _comVividsolutionsJtsAlgorithmCGAlgorithms2 = _interopRequireDefault(_comVividsolutionsJtsAlgorithmCGAlgorithms);

var _comVividsolutionsJtsGeomCoordinate = require('com/vividsolutions/jts/geom/Coordinate');

var _comVividsolutionsJtsGeomCoordinate2 = _interopRequireDefault(_comVividsolutionsJtsGeomCoordinate);

var _javaLangDouble = require('java/lang/Double');

var _javaLangDouble2 = _interopRequireDefault(_javaLangDouble);

var _javaLangComparable = require('java/lang/Comparable');

var _javaLangComparable2 = _interopRequireDefault(_javaLangComparable);

var _comVividsolutionsJtsAlgorithmRobustLineIntersector = require('com/vividsolutions/jts/algorithm/RobustLineIntersector');

var _comVividsolutionsJtsAlgorithmRobustLineIntersector2 = _interopRequireDefault(_comVividsolutionsJtsAlgorithmRobustLineIntersector);

var _comVividsolutionsJtsAlgorithmHCoordinate = require('com/vividsolutions/jts/algorithm/HCoordinate');

var _comVividsolutionsJtsAlgorithmHCoordinate2 = _interopRequireDefault(_comVividsolutionsJtsAlgorithmHCoordinate);

var _javaIoSerializable = require('java/io/Serializable');

var _javaIoSerializable2 = _interopRequireDefault(_javaIoSerializable);

var LineSegment = (function () {
	function LineSegment() {
		_classCallCheck(this, LineSegment);

		this.init_.apply(this, arguments);
	}

	_createClass(LineSegment, [{
		key: 'init_',
		value: function init_() {
			var _this = this;

			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			this.p0 = null;
			this.p1 = null;
			switch (args.length) {
				case 2:
					return (function () {
						for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
							args[_key2] = arguments[_key2];
						}

						var p0 = args[0];
						var p1 = args[1];

						_this.p0 = p0;
						_this.p1 = p1;
					}).apply(undefined, args);
				case 4:
					return (function () {
						for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
							args[_key3] = arguments[_key3];
						}

						var x0 = args[0];
						var y0 = args[1];
						var x1 = args[2];
						var y1 = args[3];

						_this.init_(new _comVividsolutionsJtsGeomCoordinate2['default'](x0, y0), new _comVividsolutionsJtsGeomCoordinate2['default'](x1, y1));
					}).apply(undefined, args);
				case 1:
					return (function () {
						for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
							args[_key4] = arguments[_key4];
						}

						var ls = args[0];

						_this.init_(ls.p0, ls.p1);
					}).apply(undefined, args);
				case 0:
					return (function () {
						for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
							args[_key5] = arguments[_key5];
						}

						_this.init_(new _comVividsolutionsJtsGeomCoordinate2['default'](), new _comVividsolutionsJtsGeomCoordinate2['default']());
					}).apply(undefined, args);
			}
		}
	}, {
		key: 'minX',
		value: function minX() {
			return Math.min(this.p0.x, this.p1.x);
		}
	}, {
		key: 'orientationIndex',
		value: function orientationIndex() {
			var _this2 = this;

			for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
				args[_key6] = arguments[_key6];
			}

			switch (args.length) {
				case 1:
					if (args[0] instanceof LineSegment) {
						return (function () {
							for (var _len7 = arguments.length, args = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
								args[_key7] = arguments[_key7];
							}

							var seg = args[0];

							var orient0 = _comVividsolutionsJtsAlgorithmCGAlgorithms2['default'].orientationIndex(_this2.p0, _this2.p1, seg.p0);
							var orient1 = _comVividsolutionsJtsAlgorithmCGAlgorithms2['default'].orientationIndex(_this2.p0, _this2.p1, seg.p1);
							if (orient0 >= 0 && orient1 >= 0) return Math.max(orient0, orient1);
							if (orient0 <= 0 && orient1 <= 0) return Math.max(orient0, orient1);
							return 0;
						}).apply(undefined, args);
					} else if (args[0] instanceof _comVividsolutionsJtsGeomCoordinate2['default']) {
						return (function () {
							for (var _len8 = arguments.length, args = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
								args[_key8] = arguments[_key8];
							}

							var p = args[0];

							return _comVividsolutionsJtsAlgorithmCGAlgorithms2['default'].orientationIndex(_this2.p0, _this2.p1, p);
						}).apply(undefined, args);
					}
			}
		}
	}, {
		key: 'toGeometry',
		value: function toGeometry(geomFactory) {
			return geomFactory.createLineString([this.p0, this.p1]);
		}
	}, {
		key: 'isVertical',
		value: function isVertical() {
			return this.p0.x === this.p1.x;
		}
	}, {
		key: 'equals',
		value: function equals(o) {
			if (!(o instanceof LineSegment)) {
				return false;
			}
			var other = o;
			return this.p0.equals(other.p0) && this.p1.equals(other.p1);
		}
	}, {
		key: 'intersection',
		value: function intersection(line) {
			var li = new _comVividsolutionsJtsAlgorithmRobustLineIntersector2['default']();
			li.computeIntersection(this.p0, this.p1, line.p0, line.p1);
			if (li.hasIntersection()) return li.getIntersection(0);
			return null;
		}
	}, {
		key: 'project',
		value: function project() {
			var _this3 = this;

			for (var _len9 = arguments.length, args = Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
				args[_key9] = arguments[_key9];
			}

			switch (args.length) {
				case 1:
					if (args[0] instanceof _comVividsolutionsJtsGeomCoordinate2['default']) {
						return (function () {
							for (var _len10 = arguments.length, args = Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
								args[_key10] = arguments[_key10];
							}

							var p = args[0];

							if (p.equals(_this3.p0) || p.equals(_this3.p1)) return new _comVividsolutionsJtsGeomCoordinate2['default'](p);
							var r = _this3.projectionFactor(p);
							var coord = new _comVividsolutionsJtsGeomCoordinate2['default']();
							coord.x = _this3.p0.x + r * (_this3.p1.x - _this3.p0.x);
							coord.y = _this3.p0.y + r * (_this3.p1.y - _this3.p0.y);
							return coord;
						}).apply(undefined, args);
					} else if (args[0] instanceof LineSegment) {
						return (function () {
							for (var _len11 = arguments.length, args = Array(_len11), _key11 = 0; _key11 < _len11; _key11++) {
								args[_key11] = arguments[_key11];
							}

							var seg = args[0];

							var pf0 = _this3.projectionFactor(seg.p0);
							var pf1 = _this3.projectionFactor(seg.p1);
							if (pf0 >= 1.0 && pf1 >= 1.0) return null;
							if (pf0 <= 0.0 && pf1 <= 0.0) return null;
							var newp0 = _this3.project(seg.p0);
							if (pf0 < 0.0) newp0 = _this3.p0;
							if (pf0 > 1.0) newp0 = _this3.p1;
							var newp1 = _this3.project(seg.p1);
							if (pf1 < 0.0) newp1 = _this3.p0;
							if (pf1 > 1.0) newp1 = _this3.p1;
							return new LineSegment(newp0, newp1);
						}).apply(undefined, args);
					}
			}
		}
	}, {
		key: 'normalize',
		value: function normalize() {
			if (this.p1.compareTo(this.p0) < 0) this.reverse();
		}
	}, {
		key: 'angle',
		value: function angle() {
			return Math.atan2(this.p1.y - this.p0.y, this.p1.x - this.p0.x);
		}
	}, {
		key: 'getCoordinate',
		value: function getCoordinate(i) {
			if (i === 0) return this.p0;
			return this.p1;
		}
	}, {
		key: 'distancePerpendicular',
		value: function distancePerpendicular(p) {
			return _comVividsolutionsJtsAlgorithmCGAlgorithms2['default'].distancePointLinePerpendicular(p, this.p0, this.p1);
		}
	}, {
		key: 'minY',
		value: function minY() {
			return Math.min(this.p0.y, this.p1.y);
		}
	}, {
		key: 'midPoint',
		value: function midPoint() {
			return LineSegment.midPoint(this.p0, this.p1);
		}
	}, {
		key: 'projectionFactor',
		value: function projectionFactor(p) {
			if (p.equals(this.p0)) return 0.0;
			if (p.equals(this.p1)) return 1.0;
			var dx = this.p1.x - this.p0.x;
			var dy = this.p1.y - this.p0.y;
			var len = dx * dx + dy * dy;
			if (len <= 0.0) return _javaLangDouble2['default'].NaN;
			var r = ((p.x - this.p0.x) * dx + (p.y - this.p0.y) * dy) / len;
			return r;
		}
	}, {
		key: 'closestPoints',
		value: function closestPoints(line) {
			var intPt = this.intersection(line);
			if (intPt !== null) {
				return [intPt, intPt];
			}
			var closestPt = [];
			var minDistance = _javaLangDouble2['default'].MAX_VALUE;
			var dist = null;
			var close00 = this.closestPoint(line.p0);
			minDistance = close00.distance(line.p0);
			closestPt[0] = close00;
			closestPt[1] = line.p0;
			var close01 = this.closestPoint(line.p1);
			dist = close01.distance(line.p1);
			if (dist < minDistance) {
				minDistance = dist;
				closestPt[0] = close01;
				closestPt[1] = line.p1;
			}
			var close10 = line.closestPoint(this.p0);
			dist = close10.distance(this.p0);
			if (dist < minDistance) {
				minDistance = dist;
				closestPt[0] = this.p0;
				closestPt[1] = close10;
			}
			var close11 = line.closestPoint(this.p1);
			dist = close11.distance(this.p1);
			if (dist < minDistance) {
				minDistance = dist;
				closestPt[0] = this.p1;
				closestPt[1] = close11;
			}
			return closestPt;
		}
	}, {
		key: 'closestPoint',
		value: function closestPoint(p) {
			var factor = this.projectionFactor(p);
			if (factor > 0 && factor < 1) {
				return this.project(p);
			}
			var dist0 = this.p0.distance(p);
			var dist1 = this.p1.distance(p);
			if (dist0 < dist1) return this.p0;
			return this.p1;
		}
	}, {
		key: 'maxX',
		value: function maxX() {
			return Math.max(this.p0.x, this.p1.x);
		}
	}, {
		key: 'getLength',
		value: function getLength() {
			return this.p0.distance(this.p1);
		}
	}, {
		key: 'compareTo',
		value: function compareTo(o) {
			var other = o;
			var comp0 = this.p0.compareTo(other.p0);
			if (comp0 !== 0) return comp0;
			return this.p1.compareTo(other.p1);
		}
	}, {
		key: 'reverse',
		value: function reverse() {
			var temp = this.p0;
			this.p0 = this.p1;
			this.p1 = temp;
		}
	}, {
		key: 'equalsTopo',
		value: function equalsTopo(other) {
			return this.p0.equals(other.p0) && this.p1.equals(other.p1) || this.p0.equals(other.p1) && this.p1.equals(other.p0);
		}
	}, {
		key: 'lineIntersection',
		value: function lineIntersection(line) {
			try {
				var intPt = _comVividsolutionsJtsAlgorithmHCoordinate2['default'].intersection(this.p0, this.p1, line.p0, line.p1);
				return intPt;
			} catch (e) {
				if (e instanceof _comVividsolutionsJtsAlgorithmNotRepresentableException2['default']) {}
			} finally {}
			return null;
		}
	}, {
		key: 'maxY',
		value: function maxY() {
			return Math.max(this.p0.y, this.p1.y);
		}
	}, {
		key: 'pointAlongOffset',
		value: function pointAlongOffset(segmentLengthFraction, offsetDistance) {
			var segx = this.p0.x + segmentLengthFraction * (this.p1.x - this.p0.x);
			var segy = this.p0.y + segmentLengthFraction * (this.p1.y - this.p0.y);
			var dx = this.p1.x - this.p0.x;
			var dy = this.p1.y - this.p0.y;
			var len = Math.sqrt(dx * dx + dy * dy);
			var ux = 0.0;
			var uy = 0.0;
			if (offsetDistance !== 0.0) {
				if (len <= 0.0) throw new IllegalStateException("Cannot compute offset from zero-length line segment");
				ux = offsetDistance * dx / len;
				uy = offsetDistance * dy / len;
			}
			var offsetx = segx - uy;
			var offsety = segy + ux;
			var coord = new _comVividsolutionsJtsGeomCoordinate2['default'](offsetx, offsety);
			return coord;
		}
	}, {
		key: 'setCoordinates',
		value: function setCoordinates() {
			var _this4 = this;

			for (var _len12 = arguments.length, args = Array(_len12), _key12 = 0; _key12 < _len12; _key12++) {
				args[_key12] = arguments[_key12];
			}

			switch (args.length) {
				case 2:
					return (function () {
						for (var _len13 = arguments.length, args = Array(_len13), _key13 = 0; _key13 < _len13; _key13++) {
							args[_key13] = arguments[_key13];
						}

						var p0 = args[0];
						var p1 = args[1];

						_this4.x = p0.x;
						_this4.y = p0.y;
						_this4.x = p1.x;
						_this4.y = p1.y;
					}).apply(undefined, args);
				case 1:
					return (function () {
						for (var _len14 = arguments.length, args = Array(_len14), _key14 = 0; _key14 < _len14; _key14++) {
							args[_key14] = arguments[_key14];
						}

						var ls = args[0];

						_this4.setCoordinates(ls.p0, ls.p1);
					}).apply(undefined, args);
			}
		}
	}, {
		key: 'segmentFraction',
		value: function segmentFraction(inputPt) {
			var segFrac = this.projectionFactor(inputPt);
			if (segFrac < 0.0) segFrac = 0.0;else if (segFrac > 1.0 || _javaLangDouble2['default'].isNaN(segFrac)) segFrac = 1.0;
			return segFrac;
		}
	}, {
		key: 'toString',
		value: function toString() {
			return "LINESTRING( " + (this.p0.x + (" " + (this.p0.y + (", " + (this.p1.x + (" " + (this.p1.y + ")")))))));
		}
	}, {
		key: 'isHorizontal',
		value: function isHorizontal() {
			return this.p0.y === this.p1.y;
		}
	}, {
		key: 'distance',
		value: function distance() {
			var _this5 = this;

			for (var _len15 = arguments.length, args = Array(_len15), _key15 = 0; _key15 < _len15; _key15++) {
				args[_key15] = arguments[_key15];
			}

			switch (args.length) {
				case 1:
					if (args[0] instanceof LineSegment) {
						return (function () {
							for (var _len16 = arguments.length, args = Array(_len16), _key16 = 0; _key16 < _len16; _key16++) {
								args[_key16] = arguments[_key16];
							}

							var ls = args[0];

							return _comVividsolutionsJtsAlgorithmCGAlgorithms2['default'].distanceLineLine(_this5.p0, _this5.p1, ls.p0, ls.p1);
						}).apply(undefined, args);
					} else if (args[0] instanceof _comVividsolutionsJtsGeomCoordinate2['default']) {
						return (function () {
							for (var _len17 = arguments.length, args = Array(_len17), _key17 = 0; _key17 < _len17; _key17++) {
								args[_key17] = arguments[_key17];
							}

							var p = args[0];

							return _comVividsolutionsJtsAlgorithmCGAlgorithms2['default'].distancePointLine(p, _this5.p0, _this5.p1);
						}).apply(undefined, args);
					}
			}
		}
	}, {
		key: 'pointAlong',
		value: function pointAlong(segmentLengthFraction) {
			var coord = new _comVividsolutionsJtsGeomCoordinate2['default']();
			coord.x = this.p0.x + segmentLengthFraction * (this.p1.x - this.p0.x);
			coord.y = this.p0.y + segmentLengthFraction * (this.p1.y - this.p0.y);
			return coord;
		}
	}, {
		key: 'hashCode',
		value: function hashCode() {
			var bits0 = java.lang.Double.doubleToLongBits(this.p0.x);
			bits0 ^= java.lang.Double.doubleToLongBits(this.p0.y) * 31;
			var hash0 = bits0 ^ bits0 >> 32;
			var bits1 = java.lang.Double.doubleToLongBits(this.p1.x);
			bits1 ^= java.lang.Double.doubleToLongBits(this.p1.y) * 31;
			var hash1 = bits1 ^ bits1 >> 32;
			return hash0 ^ hash1;
		}
	}, {
		key: 'interfaces_',
		get: function get() {
			return [_javaLangComparable2['default'], _javaIoSerializable2['default']];
		}
	}], [{
		key: 'midPoint',
		value: function midPoint(p0, p1) {
			return new _comVividsolutionsJtsGeomCoordinate2['default']((p0.x + p1.x) / 2, (p0.y + p1.y) / 2);
		}
	}]);

	return LineSegment;
})();

exports['default'] = LineSegment;

LineSegment.serialVersionUID = 3252005833466256227;
module.exports = exports['default'];

},{"com/vividsolutions/jts/algorithm/CGAlgorithms":2,"com/vividsolutions/jts/algorithm/HCoordinate":4,"com/vividsolutions/jts/algorithm/NotRepresentableException":6,"com/vividsolutions/jts/algorithm/RobustLineIntersector":11,"com/vividsolutions/jts/geom/Coordinate":15,"java/io/Serializable":101,"java/lang/Comparable":105,"java/lang/Double":106}],33:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _comVividsolutionsJtsAlgorithmCGAlgorithms = require('com/vividsolutions/jts/algorithm/CGAlgorithms');

var _comVividsolutionsJtsAlgorithmCGAlgorithms2 = _interopRequireDefault(_comVividsolutionsJtsAlgorithmCGAlgorithms);

var _comVividsolutionsJtsGeomGeometry = require('com/vividsolutions/jts/geom/Geometry');

var _comVividsolutionsJtsGeomGeometry2 = _interopRequireDefault(_comVividsolutionsJtsGeomGeometry);

var _comVividsolutionsJtsGeomCoordinateFilter = require('com/vividsolutions/jts/geom/CoordinateFilter');

var _comVividsolutionsJtsGeomCoordinateFilter2 = _interopRequireDefault(_comVividsolutionsJtsGeomCoordinateFilter);

var _comVividsolutionsJtsGeomGeometryFactory = require('com/vividsolutions/jts/geom/GeometryFactory');

var _comVividsolutionsJtsGeomGeometryFactory2 = _interopRequireDefault(_comVividsolutionsJtsGeomGeometryFactory);

var _comVividsolutionsJtsGeomLineal = require('com/vividsolutions/jts/geom/Lineal');

var _comVividsolutionsJtsGeomLineal2 = _interopRequireDefault(_comVividsolutionsJtsGeomLineal);

var _comVividsolutionsJtsGeomCoordinateSequences = require('com/vividsolutions/jts/geom/CoordinateSequences');

var _comVividsolutionsJtsGeomCoordinateSequences2 = _interopRequireDefault(_comVividsolutionsJtsGeomCoordinateSequences);

var _comVividsolutionsJtsGeomGeometryComponentFilter = require('com/vividsolutions/jts/geom/GeometryComponentFilter');

var _comVividsolutionsJtsGeomGeometryComponentFilter2 = _interopRequireDefault(_comVividsolutionsJtsGeomGeometryComponentFilter);

var _comVividsolutionsJtsGeomDimension = require('com/vividsolutions/jts/geom/Dimension');

var _comVividsolutionsJtsGeomDimension2 = _interopRequireDefault(_comVividsolutionsJtsGeomDimension);

var _comVividsolutionsJtsGeomGeometryFilter = require('com/vividsolutions/jts/geom/GeometryFilter');

var _comVividsolutionsJtsGeomGeometryFilter2 = _interopRequireDefault(_comVividsolutionsJtsGeomGeometryFilter);

var _comVividsolutionsJtsGeomCoordinateSequenceFilter = require('com/vividsolutions/jts/geom/CoordinateSequenceFilter');

var _comVividsolutionsJtsGeomCoordinateSequenceFilter2 = _interopRequireDefault(_comVividsolutionsJtsGeomCoordinateSequenceFilter);

var _comVividsolutionsJtsGeomEnvelope = require('com/vividsolutions/jts/geom/Envelope');

var _comVividsolutionsJtsGeomEnvelope2 = _interopRequireDefault(_comVividsolutionsJtsGeomEnvelope);

var LineString = (function (_Geometry) {
	_inherits(LineString, _Geometry);

	function LineString() {
		_classCallCheck(this, LineString);

		_get(Object.getPrototypeOf(LineString.prototype), 'constructor', this).call(this);
		this.init_.apply(this, arguments);
	}

	_createClass(LineString, [{
		key: 'init_',
		value: function init_() {
			var _this = this;

			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			_get(Object.getPrototypeOf(LineString.prototype), 'init_', this).call(this);
			this.points = null;
			switch (args.length) {
				case 2:
					return (function () {
						for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
							args[_key2] = arguments[_key2];
						}

						var points = args[0];
						var factory = args[1];

						_get(Object.getPrototypeOf(LineString.prototype), 'init_', _this).call(_this, factory);
						_this.init(points);
					}).apply(undefined, args);
				case 3:
					return (function () {
						for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
							args[_key3] = arguments[_key3];
						}

						var points = args[0];
						var precisionModel = args[1];
						var SRID = args[2];

						_get(Object.getPrototypeOf(LineString.prototype), 'init_', _this).call(_this, new _comVividsolutionsJtsGeomGeometryFactory2['default'](precisionModel, SRID));
						_this.init(_this.getFactory().getCoordinateSequenceFactory().create(points));
					}).apply(undefined, args);
			}
		}
	}, {
		key: 'computeEnvelopeInternal',
		value: function computeEnvelopeInternal() {
			if (this.isEmpty()) {
				return new _comVividsolutionsJtsGeomEnvelope2['default']();
			}
			return this.points.expandEnvelope(new _comVividsolutionsJtsGeomEnvelope2['default']());
		}
	}, {
		key: 'getCoordinates',
		value: function getCoordinates() {
			return this.points.toCoordinateArray();
		}
	}, {
		key: 'equalsExact',
		value: function equalsExact(other, tolerance) {
			if (!this.isEquivalentClass(other)) {
				return false;
			}
			var otherLineString = other;
			if (this.points.size() !== otherLineString.points.size()) {
				return false;
			}
			for (var i = 0; i < this.points.size(); i++) {
				if (!this.equal(this.points.getCoordinate(i), otherLineString.points.getCoordinate(i), tolerance)) {
					return false;
				}
			}
			return true;
		}
	}, {
		key: 'normalize',
		value: function normalize() {
			for (var i = 0; i < this.points.size() / 2; i++) {
				var j = this.points.size() - (1 - i);
				if (!this.points.getCoordinate(i).equals(this.points.getCoordinate(j))) {
					if (this.points.getCoordinate(i).compareTo(this.points.getCoordinate(j)) > 0) {
						_comVividsolutionsJtsGeomCoordinateSequences2['default'].reverse(this.points);
					}
					return null;
				}
			}
		}
	}, {
		key: 'getCoordinate',
		value: function getCoordinate() {
			if (this.isEmpty()) return null;
			return this.points.getCoordinate(0);
		}
	}, {
		key: 'getBoundaryDimension',
		value: function getBoundaryDimension() {
			if (this.isClosed()) {
				return _comVividsolutionsJtsGeomDimension2['default'].FALSE;
			}
			return 0;
		}
	}, {
		key: 'isClosed',
		value: function isClosed() {
			if (this.isEmpty()) {
				return false;
			}
			return this.getCoordinateN(0).equals2D(this.getCoordinateN(this.getNumPoints() - 1));
		}
	}, {
		key: 'getEndPoint',
		value: function getEndPoint() {
			if (this.isEmpty()) {
				return null;
			}
			return this.getPointN(this.getNumPoints() - 1);
		}
	}, {
		key: 'getDimension',
		value: function getDimension() {
			return 1;
		}
	}, {
		key: 'getLength',
		value: function getLength() {
			return _comVividsolutionsJtsAlgorithmCGAlgorithms2['default'].distance(this.points);
		}
	}, {
		key: 'getNumPoints',
		value: function getNumPoints() {
			return this.points.size();
		}
	}, {
		key: 'reverse',
		value: function reverse() {
			var seq = this.points.clone();
			_comVividsolutionsJtsGeomCoordinateSequences2['default'].reverse(seq);
			var revLine = this.getFactory().createLineString(seq);
			return revLine;
		}
	}, {
		key: 'compareToSameClass',
		value: function compareToSameClass() {
			var _this2 = this;

			for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
				args[_key4] = arguments[_key4];
			}

			switch (args.length) {
				case 2:
					return (function () {
						for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
							args[_key5] = arguments[_key5];
						}

						var o = args[0];
						var comp = args[1];

						var line = o;
						return comp.compare(_this2.points, line.points);
					}).apply(undefined, args);
				case 1:
					return (function () {
						for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
							args[_key6] = arguments[_key6];
						}

						var o = args[0];

						var line = o;
						var i = 0;
						var j = 0;
						while (i < _this2.points.size() && j < line.points.size()) {
							var comparison = _this2.points.getCoordinate(i).compareTo(line.points.getCoordinate(j));
							if (comparison !== 0) {
								return comparison;
							}
							i++;
							j++;
						}
						if (i < _this2.points.size()) {
							return 1;
						}
						if (j < line.points.size()) {
							return -1;
						}
						return 0;
					}).apply(undefined, args);
			}
		}
	}, {
		key: 'apply',
		value: function apply() {
			var _this3 = this;

			for (var _len7 = arguments.length, args = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
				args[_key7] = arguments[_key7];
			}

			switch (args.length) {
				case 1:
					if (args[0].interfaces_ && args[0].interfaces_.indexOf(_comVividsolutionsJtsGeomCoordinateFilter2['default']) > -1) {
						return (function () {
							for (var _len8 = arguments.length, args = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
								args[_key8] = arguments[_key8];
							}

							var filter = args[0];

							for (var i = 0; i < _this3.points.size(); i++) {
								filter.filter(_this3.points.getCoordinate(i));
							}
						}).apply(undefined, args);
					} else if (args[0].interfaces_ && args[0].interfaces_.indexOf(_comVividsolutionsJtsGeomCoordinateSequenceFilter2['default']) > -1) {
						return (function () {
							for (var _len9 = arguments.length, args = Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
								args[_key9] = arguments[_key9];
							}

							var filter = args[0];

							if (_this3.points.size() === 0) return null;
							for (var i = 0; i < _this3.points.size(); i++) {
								filter.filter(_this3.points, i);
								if (filter.isDone()) break;
							}
						}).apply(undefined, args);
					} else if (args[0].interfaces_ && args[0].interfaces_.indexOf(_comVividsolutionsJtsGeomGeometryFilter2['default']) > -1) {
						return (function () {
							for (var _len10 = arguments.length, args = Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
								args[_key10] = arguments[_key10];
							}

							var filter = args[0];

							filter.filter(_this3);
						}).apply(undefined, args);
					} else if (args[0].interfaces_ && args[0].interfaces_.indexOf(_comVividsolutionsJtsGeomGeometryComponentFilter2['default']) > -1) {
						return (function () {
							for (var _len11 = arguments.length, args = Array(_len11), _key11 = 0; _key11 < _len11; _key11++) {
								args[_key11] = arguments[_key11];
							}

							var filter = args[0];

							filter.filter(_this3);
						}).apply(undefined, args);
					}
			}
		}
	}, {
		key: 'getBoundary',
		value: function getBoundary() {
			return null;
		}
	}, {
		key: 'isEquivalentClass',
		value: function isEquivalentClass(other) {
			return other instanceof LineString;
		}
	}, {
		key: 'clone',
		value: function clone() {
			var ls = _get(Object.getPrototypeOf(LineString.prototype), 'clone', this).call(this);
			ls.points = this.points.clone();
			return ls;
		}
	}, {
		key: 'getCoordinateN',
		value: function getCoordinateN(n) {
			return this.points.getCoordinate(n);
		}
	}, {
		key: 'getGeometryType',
		value: function getGeometryType() {
			return "LineString";
		}
	}, {
		key: 'getCoordinateSequence',
		value: function getCoordinateSequence() {
			return this.points;
		}
	}, {
		key: 'isEmpty',
		value: function isEmpty() {
			return this.points.size() === 0;
		}
	}, {
		key: 'init',
		value: function init(points) {
			if (points === null) {
				points = this.getFactory().getCoordinateSequenceFactory().create([]);
			}
			if (points.size() === 1) {
				throw new IllegalArgumentException("Invalid number of points in LineString (found " + (points.size() + " - must be 0 or >= 2)"));
			}
			this.points = points;
		}
	}, {
		key: 'isCoordinate',
		value: function isCoordinate(pt) {
			for (var i = 0; i < this.points.size(); i++) {
				if (this.points.getCoordinate(i).equals(pt)) {
					return true;
				}
			}
			return false;
		}
	}, {
		key: 'getStartPoint',
		value: function getStartPoint() {
			if (this.isEmpty()) {
				return null;
			}
			return this.getPointN(0);
		}
	}, {
		key: 'getPointN',
		value: function getPointN(n) {
			return this.getFactory().createPoint(this.points.getCoordinate(n));
		}
	}, {
		key: 'interfaces_',
		get: function get() {
			return [_comVividsolutionsJtsGeomLineal2['default']];
		}
	}]);

	return LineString;
})(_comVividsolutionsJtsGeomGeometry2['default']);

exports['default'] = LineString;

LineString.serialVersionUID = 3110669828065365560;
module.exports = exports['default'];

},{"com/vividsolutions/jts/algorithm/CGAlgorithms":2,"com/vividsolutions/jts/geom/CoordinateFilter":17,"com/vividsolutions/jts/geom/CoordinateSequenceFilter":21,"com/vividsolutions/jts/geom/CoordinateSequences":22,"com/vividsolutions/jts/geom/Dimension":23,"com/vividsolutions/jts/geom/Envelope":24,"com/vividsolutions/jts/geom/Geometry":25,"com/vividsolutions/jts/geom/GeometryComponentFilter":28,"com/vividsolutions/jts/geom/GeometryFactory":29,"com/vividsolutions/jts/geom/GeometryFilter":30,"com/vividsolutions/jts/geom/Lineal":34}],34:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Lineal = (function () {
	function Lineal() {
		_classCallCheck(this, Lineal);

		this.init_.apply(this, arguments);
	}

	_createClass(Lineal, [{
		key: "init_",
		value: function init_() {
			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			switch (args.length) {}
		}
	}, {
		key: "interfaces_",
		get: function get() {
			return [];
		}
	}]);

	return Lineal;
})();

exports["default"] = Lineal;
module.exports = exports["default"];

},{}],35:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _comVividsolutionsJtsGeomLineString = require('com/vividsolutions/jts/geom/LineString');

var _comVividsolutionsJtsGeomLineString2 = _interopRequireDefault(_comVividsolutionsJtsGeomLineString);

var _comVividsolutionsJtsGeomGeometryFactory = require('com/vividsolutions/jts/geom/GeometryFactory');

var _comVividsolutionsJtsGeomGeometryFactory2 = _interopRequireDefault(_comVividsolutionsJtsGeomGeometryFactory);

var _comVividsolutionsJtsGeomCoordinate = require('com/vividsolutions/jts/geom/Coordinate');

var _comVividsolutionsJtsGeomCoordinate2 = _interopRequireDefault(_comVividsolutionsJtsGeomCoordinate);

var _comVividsolutionsJtsGeomCoordinateSequences = require('com/vividsolutions/jts/geom/CoordinateSequences');

var _comVividsolutionsJtsGeomCoordinateSequences2 = _interopRequireDefault(_comVividsolutionsJtsGeomCoordinateSequences);

var _comVividsolutionsJtsGeomCoordinateSequence = require('com/vividsolutions/jts/geom/CoordinateSequence');

var _comVividsolutionsJtsGeomCoordinateSequence2 = _interopRequireDefault(_comVividsolutionsJtsGeomCoordinateSequence);

var _comVividsolutionsJtsGeomDimension = require('com/vividsolutions/jts/geom/Dimension');

var _comVividsolutionsJtsGeomDimension2 = _interopRequireDefault(_comVividsolutionsJtsGeomDimension);

var LinearRing = (function (_LineString) {
	_inherits(LinearRing, _LineString);

	function LinearRing() {
		_classCallCheck(this, LinearRing);

		_get(Object.getPrototypeOf(LinearRing.prototype), 'constructor', this).call(this);
		this.init_.apply(this, arguments);
	}

	_createClass(LinearRing, [{
		key: 'init_',
		value: function init_() {
			var _this = this;

			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			_get(Object.getPrototypeOf(LinearRing.prototype), 'init_', this).call(this);
			switch (args.length) {
				case 2:
					if (args[0] instanceof _comVividsolutionsJtsGeomCoordinate2['default'] && args[1] instanceof _comVividsolutionsJtsGeomGeometryFactory2['default']) {
						return (function () {
							for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
								args[_key2] = arguments[_key2];
							}

							var points = args[0];
							var factory = args[1];

							_this.init_(factory.getCoordinateSequenceFactory().create(points), factory);
						}).apply(undefined, args);
					} else if (args[0].interfaces_ && args[0].interfaces_.indexOf(_comVividsolutionsJtsGeomCoordinateSequence2['default']) > -1 && args[1] instanceof _comVividsolutionsJtsGeomGeometryFactory2['default']) {
						return (function () {
							for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
								args[_key3] = arguments[_key3];
							}

							var points = args[0];
							var factory = args[1];

							_get(Object.getPrototypeOf(LinearRing.prototype), 'init_', _this).call(_this, points, factory);
							_this.validateConstruction();
						}).apply(undefined, args);
					}
				case 3:
					return (function () {
						for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
							args[_key4] = arguments[_key4];
						}

						var points = args[0];
						var precisionModel = args[1];
						var SRID = args[2];

						_this.init_(points, new _comVividsolutionsJtsGeomGeometryFactory2['default'](precisionModel, SRID));
						_this.validateConstruction();
					}).apply(undefined, args);
			}
		}
	}, {
		key: 'getBoundaryDimension',
		value: function getBoundaryDimension() {
			return _comVividsolutionsJtsGeomDimension2['default'].FALSE;
		}
	}, {
		key: 'isClosed',
		value: function isClosed() {
			if (this.isEmpty()) {
				return true;
			}
			return _get(Object.getPrototypeOf(LinearRing.prototype), 'isClosed', this).call(this);
		}
	}, {
		key: 'reverse',
		value: function reverse() {
			var seq = this.points.clone();
			_comVividsolutionsJtsGeomCoordinateSequences2['default'].reverse(seq);
			var rev = this.getFactory().createLinearRing(seq);
			return rev;
		}
	}, {
		key: 'validateConstruction',
		value: function validateConstruction() {
			if (!this.isEmpty() && !_get(Object.getPrototypeOf(LinearRing.prototype), 'isClosed', this).call(this)) {
				throw new IllegalArgumentException("Points of LinearRing do not form a closed linestring");
			}
			if (this.getCoordinateSequence().size() >= 1 && this.getCoordinateSequence().size() < LinearRing.MINIMUM_VALID_SIZE) {
				throw new IllegalArgumentException("Invalid number of points in LinearRing (found " + (this.getCoordinateSequence().size() + " - must be 0 or >= 4)"));
			}
		}
	}, {
		key: 'getGeometryType',
		value: function getGeometryType() {
			return "LinearRing";
		}
	}, {
		key: 'interfaces_',
		get: function get() {
			return [];
		}
	}]);

	return LinearRing;
})(_comVividsolutionsJtsGeomLineString2['default']);

exports['default'] = LinearRing;

LinearRing.MINIMUM_VALID_SIZE = 4;
LinearRing.serialVersionUID = -4261142084085851829;
module.exports = exports['default'];

},{"com/vividsolutions/jts/geom/Coordinate":15,"com/vividsolutions/jts/geom/CoordinateSequence":19,"com/vividsolutions/jts/geom/CoordinateSequences":22,"com/vividsolutions/jts/geom/Dimension":23,"com/vividsolutions/jts/geom/GeometryFactory":29,"com/vividsolutions/jts/geom/LineString":33}],36:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Location = (function () {
	function Location() {
		_classCallCheck(this, Location);

		this.init_.apply(this, arguments);
	}

	_createClass(Location, [{
		key: 'init_',
		value: function init_() {
			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			switch (args.length) {}
		}
	}, {
		key: 'interfaces_',
		get: function get() {
			return [];
		}
	}], [{
		key: 'toLocationSymbol',
		value: function toLocationSymbol(locationValue) {
			switch (locationValue) {
				case Location.EXTERIOR:
					return 'e';
				case Location.BOUNDARY:
					return 'b';
				case Location.INTERIOR:
					return 'i';
				case Location.NONE:
					return '-';
			}
			throw new IllegalArgumentException("Unknown location value: " + locationValue);
		}
	}]);

	return Location;
})();

exports['default'] = Location;

Location.INTERIOR = 0;
Location.BOUNDARY = 1;
Location.EXTERIOR = 2;
Location.NONE = -1;
module.exports = exports['default'];

},{}],37:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _comVividsolutionsJtsGeomLineal = require('com/vividsolutions/jts/geom/Lineal');

var _comVividsolutionsJtsGeomLineal2 = _interopRequireDefault(_comVividsolutionsJtsGeomLineal);

var _comVividsolutionsJtsGeomGeometryCollection = require('com/vividsolutions/jts/geom/GeometryCollection');

var _comVividsolutionsJtsGeomGeometryCollection2 = _interopRequireDefault(_comVividsolutionsJtsGeomGeometryCollection);

var _comVividsolutionsJtsGeomDimension = require('com/vividsolutions/jts/geom/Dimension');

var _comVividsolutionsJtsGeomDimension2 = _interopRequireDefault(_comVividsolutionsJtsGeomDimension);

var MultiLineString = (function (_GeometryCollection) {
	_inherits(MultiLineString, _GeometryCollection);

	function MultiLineString() {
		_classCallCheck(this, MultiLineString);

		_get(Object.getPrototypeOf(MultiLineString.prototype), 'constructor', this).call(this);
		this.init_.apply(this, arguments);
	}

	_createClass(MultiLineString, [{
		key: 'init_',
		value: function init_() {
			var _this = this;

			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			_get(Object.getPrototypeOf(MultiLineString.prototype), 'init_', this).call(this);
			switch (args.length) {
				case 2:
					return (function () {
						for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
							args[_key2] = arguments[_key2];
						}

						var lineStrings = args[0];
						var factory = args[1];

						_get(Object.getPrototypeOf(MultiLineString.prototype), 'init_', _this).call(_this, lineStrings, factory);
					}).apply(undefined, args);
			}
		}
	}, {
		key: 'equalsExact',
		value: function equalsExact(other, tolerance) {
			return _get(Object.getPrototypeOf(MultiLineString.prototype), 'equalsExact', this).call(this, other, tolerance);
		}
	}, {
		key: 'getBoundaryDimension',
		value: function getBoundaryDimension() {
			if (this.isClosed()) {
				return _comVividsolutionsJtsGeomDimension2['default'].FALSE;
			}
			return 0;
		}
	}, {
		key: 'isClosed',
		value: function isClosed() {
			if (this.isEmpty()) {
				return false;
			}
			for (var i = 0; i < this.geometries.length; i++) {
				if (!this.geometries[i].isClosed()) {
					return false;
				}
			}
			return true;
		}
	}, {
		key: 'getDimension',
		value: function getDimension() {
			return 1;
		}
	}, {
		key: 'getBoundary',
		value: function getBoundary() {
			return null;
		}
	}, {
		key: 'getGeometryType',
		value: function getGeometryType() {
			return "MultiLineString";
		}
	}, {
		key: 'interfaces_',
		get: function get() {
			return [_comVividsolutionsJtsGeomLineal2['default']];
		}
	}]);

	return MultiLineString;
})(_comVividsolutionsJtsGeomGeometryCollection2['default']);

exports['default'] = MultiLineString;

MultiLineString.serialVersionUID = 8166665132445433741;
module.exports = exports['default'];

},{"com/vividsolutions/jts/geom/Dimension":23,"com/vividsolutions/jts/geom/GeometryCollection":26,"com/vividsolutions/jts/geom/Lineal":34}],38:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _comVividsolutionsJtsGeomGeometryCollection = require('com/vividsolutions/jts/geom/GeometryCollection');

var _comVividsolutionsJtsGeomGeometryCollection2 = _interopRequireDefault(_comVividsolutionsJtsGeomGeometryCollection);

var _comVividsolutionsJtsGeomDimension = require('com/vividsolutions/jts/geom/Dimension');

var _comVividsolutionsJtsGeomDimension2 = _interopRequireDefault(_comVividsolutionsJtsGeomDimension);

var _comVividsolutionsJtsGeomPuntal = require('com/vividsolutions/jts/geom/Puntal');

var _comVividsolutionsJtsGeomPuntal2 = _interopRequireDefault(_comVividsolutionsJtsGeomPuntal);

var MultiPoint = (function (_GeometryCollection) {
	_inherits(MultiPoint, _GeometryCollection);

	function MultiPoint() {
		_classCallCheck(this, MultiPoint);

		_get(Object.getPrototypeOf(MultiPoint.prototype), 'constructor', this).call(this);
		this.init_.apply(this, arguments);
	}

	_createClass(MultiPoint, [{
		key: 'init_',
		value: function init_() {
			var _this = this;

			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			_get(Object.getPrototypeOf(MultiPoint.prototype), 'init_', this).call(this);
			switch (args.length) {
				case 2:
					return (function () {
						for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
							args[_key2] = arguments[_key2];
						}

						var points = args[0];
						var factory = args[1];

						_get(Object.getPrototypeOf(MultiPoint.prototype), 'init_', _this).call(_this, points, factory);
					}).apply(undefined, args);
			}
		}
	}, {
		key: 'isValid',
		value: function isValid() {
			return true;
		}
	}, {
		key: 'equalsExact',
		value: function equalsExact(other, tolerance) {
			return _get(Object.getPrototypeOf(MultiPoint.prototype), 'equalsExact', this).call(this, other, tolerance);
		}
	}, {
		key: 'getCoordinate',
		value: function getCoordinate(n) {
			return this.geometries[n].getCoordinate();
		}
	}, {
		key: 'getBoundaryDimension',
		value: function getBoundaryDimension() {
			return _comVividsolutionsJtsGeomDimension2['default'].FALSE;
		}
	}, {
		key: 'getDimension',
		value: function getDimension() {
			return 0;
		}
	}, {
		key: 'getBoundary',
		value: function getBoundary() {
			return this.getFactory().createGeometryCollection(null);
		}
	}, {
		key: 'getGeometryType',
		value: function getGeometryType() {
			return "MultiPoint";
		}
	}, {
		key: 'interfaces_',
		get: function get() {
			return [_comVividsolutionsJtsGeomPuntal2['default']];
		}
	}]);

	return MultiPoint;
})(_comVividsolutionsJtsGeomGeometryCollection2['default']);

exports['default'] = MultiPoint;

MultiPoint.serialVersionUID = -8048474874175355449;
module.exports = exports['default'];

},{"com/vividsolutions/jts/geom/Dimension":23,"com/vividsolutions/jts/geom/GeometryCollection":26,"com/vividsolutions/jts/geom/Puntal":44}],39:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _comVividsolutionsJtsGeomGeometryCollection = require('com/vividsolutions/jts/geom/GeometryCollection');

var _comVividsolutionsJtsGeomGeometryCollection2 = _interopRequireDefault(_comVividsolutionsJtsGeomGeometryCollection);

var _comVividsolutionsJtsGeomPolygonal = require('com/vividsolutions/jts/geom/Polygonal');

var _comVividsolutionsJtsGeomPolygonal2 = _interopRequireDefault(_comVividsolutionsJtsGeomPolygonal);

var _javaUtilArrayList = require('java/util/ArrayList');

var _javaUtilArrayList2 = _interopRequireDefault(_javaUtilArrayList);

var MultiPolygon = (function (_GeometryCollection) {
	_inherits(MultiPolygon, _GeometryCollection);

	function MultiPolygon() {
		_classCallCheck(this, MultiPolygon);

		_get(Object.getPrototypeOf(MultiPolygon.prototype), 'constructor', this).call(this);
		this.init_.apply(this, arguments);
	}

	_createClass(MultiPolygon, [{
		key: 'init_',
		value: function init_() {
			var _this = this;

			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			_get(Object.getPrototypeOf(MultiPolygon.prototype), 'init_', this).call(this);
			switch (args.length) {
				case 2:
					return (function () {
						for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
							args[_key2] = arguments[_key2];
						}

						var polygons = args[0];
						var factory = args[1];

						_get(Object.getPrototypeOf(MultiPolygon.prototype), 'init_', _this).call(_this, polygons, factory);
					}).apply(undefined, args);
			}
		}
	}, {
		key: 'equalsExact',
		value: function equalsExact(other, tolerance) {
			return _get(Object.getPrototypeOf(MultiPolygon.prototype), 'equalsExact', this).call(this, other, tolerance);
		}
	}, {
		key: 'getBoundaryDimension',
		value: function getBoundaryDimension() {
			return 1;
		}
	}, {
		key: 'getDimension',
		value: function getDimension() {
			return 2;
		}
	}, {
		key: 'getBoundary',
		value: function getBoundary() {
			if (this.isEmpty()) {
				return this.getFactory().createMultiLineString(null);
			}
			var allRings = new _javaUtilArrayList2['default']();
			for (var i = 0; i < this.geometries.length; i++) {
				var polygon = this.geometries[i];
				var rings = polygon.getBoundary();
				for (var j = 0; j < rings.getNumGeometries(); j++) {
					allRings.add(rings.getGeometryN(j));
				}
			}
			var allRingsArray = [];
			return this.getFactory().createMultiLineString(allRings.toArray(allRingsArray));
		}
	}, {
		key: 'getGeometryType',
		value: function getGeometryType() {
			return "MultiPolygon";
		}
	}, {
		key: 'interfaces_',
		get: function get() {
			return [_comVividsolutionsJtsGeomPolygonal2['default']];
		}
	}]);

	return MultiPolygon;
})(_comVividsolutionsJtsGeomGeometryCollection2['default']);

exports['default'] = MultiPolygon;

MultiPolygon.serialVersionUID = -551033529766975875;
module.exports = exports['default'];

},{"com/vividsolutions/jts/geom/GeometryCollection":26,"com/vividsolutions/jts/geom/Polygonal":42,"java/util/ArrayList":111}],40:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _comVividsolutionsJtsGeomGeometry = require('com/vividsolutions/jts/geom/Geometry');

var _comVividsolutionsJtsGeomGeometry2 = _interopRequireDefault(_comVividsolutionsJtsGeomGeometry);

var _comVividsolutionsJtsGeomCoordinateFilter = require('com/vividsolutions/jts/geom/CoordinateFilter');

var _comVividsolutionsJtsGeomCoordinateFilter2 = _interopRequireDefault(_comVividsolutionsJtsGeomCoordinateFilter);

var _comVividsolutionsJtsGeomGeometryComponentFilter = require('com/vividsolutions/jts/geom/GeometryComponentFilter');

var _comVividsolutionsJtsGeomGeometryComponentFilter2 = _interopRequireDefault(_comVividsolutionsJtsGeomGeometryComponentFilter);

var _comVividsolutionsJtsGeomDimension = require('com/vividsolutions/jts/geom/Dimension');

var _comVividsolutionsJtsGeomDimension2 = _interopRequireDefault(_comVividsolutionsJtsGeomDimension);

var _comVividsolutionsJtsGeomGeometryFilter = require('com/vividsolutions/jts/geom/GeometryFilter');

var _comVividsolutionsJtsGeomGeometryFilter2 = _interopRequireDefault(_comVividsolutionsJtsGeomGeometryFilter);

var _comVividsolutionsJtsGeomCoordinateSequenceFilter = require('com/vividsolutions/jts/geom/CoordinateSequenceFilter');

var _comVividsolutionsJtsGeomCoordinateSequenceFilter2 = _interopRequireDefault(_comVividsolutionsJtsGeomCoordinateSequenceFilter);

var _comVividsolutionsJtsGeomPuntal = require('com/vividsolutions/jts/geom/Puntal');

var _comVividsolutionsJtsGeomPuntal2 = _interopRequireDefault(_comVividsolutionsJtsGeomPuntal);

var _comVividsolutionsJtsGeomEnvelope = require('com/vividsolutions/jts/geom/Envelope');

var _comVividsolutionsJtsGeomEnvelope2 = _interopRequireDefault(_comVividsolutionsJtsGeomEnvelope);

var _comVividsolutionsJtsUtilAssert = require('com/vividsolutions/jts/util/Assert');

var _comVividsolutionsJtsUtilAssert2 = _interopRequireDefault(_comVividsolutionsJtsUtilAssert);

var Point = (function (_Geometry) {
	_inherits(Point, _Geometry);

	function Point() {
		_classCallCheck(this, Point);

		_get(Object.getPrototypeOf(Point.prototype), 'constructor', this).call(this);
		this.init_.apply(this, arguments);
	}

	_createClass(Point, [{
		key: 'init_',
		value: function init_() {
			var _this = this;

			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			_get(Object.getPrototypeOf(Point.prototype), 'init_', this).call(this);
			this.coordinates = null;
			switch (args.length) {
				case 2:
					return (function () {
						for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
							args[_key2] = arguments[_key2];
						}

						var coordinates = args[0];
						var factory = args[1];

						_get(Object.getPrototypeOf(Point.prototype), 'init_', _this).call(_this, factory);
						_this.init(coordinates);
					}).apply(undefined, args);
			}
		}
	}, {
		key: 'computeEnvelopeInternal',
		value: function computeEnvelopeInternal() {
			if (this.isEmpty()) {
				return new _comVividsolutionsJtsGeomEnvelope2['default']();
			}
			var env = new _comVividsolutionsJtsGeomEnvelope2['default']();
			env.expandToInclude(this.coordinates.getX(0), this.coordinates.getY(0));
			return env;
		}
	}, {
		key: 'getCoordinates',
		value: function getCoordinates() {
			return this.isEmpty() ? [] : [this.getCoordinate()];
		}
	}, {
		key: 'equalsExact',
		value: function equalsExact(other, tolerance) {
			if (this.isEmpty() && other.isEmpty()) {
				return true;
			}
			if (this.isEmpty() !== other.isEmpty()) {
				return false;
			}
			return this.equal(other.getCoordinate(), this.getCoordinate(), tolerance);
		}
	}, {
		key: 'normalize',
		value: function normalize() {}
	}, {
		key: 'getCoordinate',
		value: function getCoordinate() {
			return this.coordinates.size() !== 0 ? this.coordinates.getCoordinate(0) : null;
		}
	}, {
		key: 'getBoundaryDimension',
		value: function getBoundaryDimension() {
			return _comVividsolutionsJtsGeomDimension2['default'].FALSE;
		}
	}, {
		key: 'getDimension',
		value: function getDimension() {
			return 0;
		}
	}, {
		key: 'getNumPoints',
		value: function getNumPoints() {
			return this.isEmpty() ? 0 : 1;
		}
	}, {
		key: 'reverse',
		value: function reverse() {
			return this.clone();
		}
	}, {
		key: 'getX',
		value: function getX() {
			if (this.getCoordinate() === null) {
				throw new IllegalStateException("getX called on empty Point");
			}
			return this.x;
		}
	}, {
		key: 'compareToSameClass',
		value: function compareToSameClass() {
			var _this2 = this;

			for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
				args[_key3] = arguments[_key3];
			}

			switch (args.length) {
				case 2:
					return (function () {
						for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
							args[_key4] = arguments[_key4];
						}

						var other = args[0];
						var comp = args[1];

						var point = other;
						return comp.compare(_this2.coordinates, point.coordinates);
					}).apply(undefined, args);
				case 1:
					return (function () {
						for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
							args[_key5] = arguments[_key5];
						}

						var other = args[0];

						var point = other;
						return _this2.getCoordinate().compareTo(point.getCoordinate());
					}).apply(undefined, args);
			}
		}
	}, {
		key: 'apply',
		value: function apply() {
			var _this3 = this;

			for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
				args[_key6] = arguments[_key6];
			}

			switch (args.length) {
				case 1:
					if (args[0].interfaces_ && args[0].interfaces_.indexOf(_comVividsolutionsJtsGeomCoordinateFilter2['default']) > -1) {
						return (function () {
							for (var _len7 = arguments.length, args = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
								args[_key7] = arguments[_key7];
							}

							var filter = args[0];

							if (_this3.isEmpty()) {
								return null;
							}
							filter.filter(_this3.getCoordinate());
						}).apply(undefined, args);
					} else if (args[0].interfaces_ && args[0].interfaces_.indexOf(_comVividsolutionsJtsGeomCoordinateSequenceFilter2['default']) > -1) {
						return (function () {
							for (var _len8 = arguments.length, args = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
								args[_key8] = arguments[_key8];
							}

							var filter = args[0];

							if (_this3.isEmpty()) return null;
							filter.filter(_this3.coordinates, 0);
						}).apply(undefined, args);
					} else if (args[0].interfaces_ && args[0].interfaces_.indexOf(_comVividsolutionsJtsGeomGeometryFilter2['default']) > -1) {
						return (function () {
							for (var _len9 = arguments.length, args = Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
								args[_key9] = arguments[_key9];
							}

							var filter = args[0];

							filter.filter(_this3);
						}).apply(undefined, args);
					} else if (args[0].interfaces_ && args[0].interfaces_.indexOf(_comVividsolutionsJtsGeomGeometryComponentFilter2['default']) > -1) {
						return (function () {
							for (var _len10 = arguments.length, args = Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
								args[_key10] = arguments[_key10];
							}

							var filter = args[0];

							filter.filter(_this3);
						}).apply(undefined, args);
					}
			}
		}
	}, {
		key: 'getBoundary',
		value: function getBoundary() {
			return this.getFactory().createGeometryCollection(null);
		}
	}, {
		key: 'clone',
		value: function clone() {
			var p = _get(Object.getPrototypeOf(Point.prototype), 'clone', this).call(this);
			p.coordinates = this.coordinates.clone();
			return p;
		}
	}, {
		key: 'getGeometryType',
		value: function getGeometryType() {
			return "Point";
		}
	}, {
		key: 'getCoordinateSequence',
		value: function getCoordinateSequence() {
			return this.coordinates;
		}
	}, {
		key: 'getY',
		value: function getY() {
			if (this.getCoordinate() === null) {
				throw new IllegalStateException("getY called on empty Point");
			}
			return this.y;
		}
	}, {
		key: 'isEmpty',
		value: function isEmpty() {
			return this.coordinates.size() === 0;
		}
	}, {
		key: 'init',
		value: function init(coordinates) {
			if (coordinates === null) {
				coordinates = this.getFactory().getCoordinateSequenceFactory().create([]);
			}
			_comVividsolutionsJtsUtilAssert2['default'].isTrue(coordinates.size() <= 1);
			this.coordinates = coordinates;
		}
	}, {
		key: 'isSimple',
		value: function isSimple() {
			return true;
		}
	}, {
		key: 'interfaces_',
		get: function get() {
			return [_comVividsolutionsJtsGeomPuntal2['default']];
		}
	}]);

	return Point;
})(_comVividsolutionsJtsGeomGeometry2['default']);

exports['default'] = Point;

Point.serialVersionUID = 4902022702746614570;
module.exports = exports['default'];

},{"com/vividsolutions/jts/geom/CoordinateFilter":17,"com/vividsolutions/jts/geom/CoordinateSequenceFilter":21,"com/vividsolutions/jts/geom/Dimension":23,"com/vividsolutions/jts/geom/Envelope":24,"com/vividsolutions/jts/geom/Geometry":25,"com/vividsolutions/jts/geom/GeometryComponentFilter":28,"com/vividsolutions/jts/geom/GeometryFilter":30,"com/vividsolutions/jts/geom/Puntal":44,"com/vividsolutions/jts/util/Assert":97}],41:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _comVividsolutionsJtsAlgorithmCGAlgorithms = require('com/vividsolutions/jts/algorithm/CGAlgorithms');

var _comVividsolutionsJtsAlgorithmCGAlgorithms2 = _interopRequireDefault(_comVividsolutionsJtsAlgorithmCGAlgorithms);

var _comVividsolutionsJtsGeomGeometry = require('com/vividsolutions/jts/geom/Geometry');

var _comVividsolutionsJtsGeomGeometry2 = _interopRequireDefault(_comVividsolutionsJtsGeomGeometry);

var _javaUtilArrays = require('java/util/Arrays');

var _javaUtilArrays2 = _interopRequireDefault(_javaUtilArrays);

var _comVividsolutionsJtsGeomCoordinateFilter = require('com/vividsolutions/jts/geom/CoordinateFilter');

var _comVividsolutionsJtsGeomCoordinateFilter2 = _interopRequireDefault(_comVividsolutionsJtsGeomCoordinateFilter);

var _comVividsolutionsJtsGeomGeometryFactory = require('com/vividsolutions/jts/geom/GeometryFactory');

var _comVividsolutionsJtsGeomGeometryFactory2 = _interopRequireDefault(_comVividsolutionsJtsGeomGeometryFactory);

var _comVividsolutionsJtsGeomLinearRing = require('com/vividsolutions/jts/geom/LinearRing');

var _comVividsolutionsJtsGeomLinearRing2 = _interopRequireDefault(_comVividsolutionsJtsGeomLinearRing);

var _comVividsolutionsJtsGeomGeometryComponentFilter = require('com/vividsolutions/jts/geom/GeometryComponentFilter');

var _comVividsolutionsJtsGeomGeometryComponentFilter2 = _interopRequireDefault(_comVividsolutionsJtsGeomGeometryComponentFilter);

var _comVividsolutionsJtsGeomCoordinateArrays = require('com/vividsolutions/jts/geom/CoordinateArrays');

var _comVividsolutionsJtsGeomCoordinateArrays2 = _interopRequireDefault(_comVividsolutionsJtsGeomCoordinateArrays);

var _comVividsolutionsJtsGeomPrecisionModel = require('com/vividsolutions/jts/geom/PrecisionModel');

var _comVividsolutionsJtsGeomPrecisionModel2 = _interopRequireDefault(_comVividsolutionsJtsGeomPrecisionModel);

var _comVividsolutionsJtsGeomPolygonal = require('com/vividsolutions/jts/geom/Polygonal');

var _comVividsolutionsJtsGeomPolygonal2 = _interopRequireDefault(_comVividsolutionsJtsGeomPolygonal);

var _comVividsolutionsJtsGeomGeometryFilter = require('com/vividsolutions/jts/geom/GeometryFilter');

var _comVividsolutionsJtsGeomGeometryFilter2 = _interopRequireDefault(_comVividsolutionsJtsGeomGeometryFilter);

var _comVividsolutionsJtsGeomCoordinateSequenceFilter = require('com/vividsolutions/jts/geom/CoordinateSequenceFilter');

var _comVividsolutionsJtsGeomCoordinateSequenceFilter2 = _interopRequireDefault(_comVividsolutionsJtsGeomCoordinateSequenceFilter);

var Polygon = (function (_Geometry) {
	_inherits(Polygon, _Geometry);

	function Polygon() {
		_classCallCheck(this, Polygon);

		_get(Object.getPrototypeOf(Polygon.prototype), 'constructor', this).call(this);
		this.init_.apply(this, arguments);
	}

	_createClass(Polygon, [{
		key: 'init_',
		value: function init_() {
			var _this = this;

			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			_get(Object.getPrototypeOf(Polygon.prototype), 'init_', this).call(this);
			this.shell = null;
			this.holes = null;
			switch (args.length) {
				case 4:
					return (function () {
						for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
							args[_key2] = arguments[_key2];
						}

						var shell = args[0];
						var holes = args[1];
						var precisionModel = args[2];
						var SRID = args[3];

						_this.init_(shell, holes, new _comVividsolutionsJtsGeomGeometryFactory2['default'](precisionModel, SRID));
					}).apply(undefined, args);
				case 3:
					if (Number.isInteger(args[2]) && (args[0] instanceof _comVividsolutionsJtsGeomLinearRing2['default'] && args[1] instanceof _comVividsolutionsJtsGeomPrecisionModel2['default'])) {
						return (function () {
							for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
								args[_key3] = arguments[_key3];
							}

							var shell = args[0];
							var precisionModel = args[1];
							var SRID = args[2];

							_this.init_(shell, [], new _comVividsolutionsJtsGeomGeometryFactory2['default'](precisionModel, SRID));
						}).apply(undefined, args);
					} else if (args[2] instanceof _comVividsolutionsJtsGeomGeometryFactory2['default'] && (args[0] instanceof _comVividsolutionsJtsGeomLinearRing2['default'] && args[1] instanceof Array)) {
						return (function () {
							for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
								args[_key4] = arguments[_key4];
							}

							var shell = args[0];
							var holes = args[1];
							var factory = args[2];

							_get(Object.getPrototypeOf(Polygon.prototype), 'init_', _this).call(_this, factory);
							if (shell === null) {
								shell = _this.getFactory().createLinearRing(null);
							}
							if (holes === null) {
								holes = [];
							}
							if (Polygon.hasNullElements(holes)) {
								throw new IllegalArgumentException("holes must not contain null elements");
							}
							if (shell.isEmpty() && Polygon.hasNonEmptyElements(holes)) {
								throw new IllegalArgumentException("shell is empty but holes are not");
							}
							_this.shell = shell;
							_this.holes = holes;
						}).apply(undefined, args);
					}
			}
		}
	}, {
		key: 'computeEnvelopeInternal',
		value: function computeEnvelopeInternal() {
			return this.shell.getEnvelopeInternal();
		}
	}, {
		key: 'getCoordinates',
		value: function getCoordinates() {
			if (this.isEmpty()) {
				return [];
			}
			var coordinates = [];
			var k = -1;
			var shellCoordinates = this.shell.getCoordinates();
			for (var x = 0; x < shellCoordinates.length; x++) {
				k++;
				coordinates[k] = shellCoordinates[x];
			}
			for (var i = 0; i < this.holes.length; i++) {
				var childCoordinates = this.holes[i].getCoordinates();
				for (var j = 0; j < childCoordinates.length; j++) {
					k++;
					coordinates[k] = childCoordinates[j];
				}
			}
			return coordinates;
		}
	}, {
		key: 'getArea',
		value: function getArea() {
			var area = 0.0;
			area += Math.abs(_comVividsolutionsJtsAlgorithmCGAlgorithms2['default'].signedArea(this.shell.getCoordinateSequence()));
			for (var i = 0; i < this.holes.length; i++) {
				area -= Math.abs(_comVividsolutionsJtsAlgorithmCGAlgorithms2['default'].signedArea(this.holes[i].getCoordinateSequence()));
			}
			return area;
		}
	}, {
		key: 'isRectangle',
		value: function isRectangle() {
			if (this.getNumInteriorRing() !== 0) return false;
			if (this.shell === null) return false;
			if (this.shell.getNumPoints() !== 5) return false;
			var seq = this.shell.getCoordinateSequence();
			var env = this.getEnvelopeInternal();
			for (var i = 0; i < 5; i++) {
				var x = seq.getX(i);
				if (!(x === env.getMinX() || x === env.getMaxX())) return false;
				var y = seq.getY(i);
				if (!(y === env.getMinY() || y === env.getMaxY())) return false;
			}
			var prevX = seq.getX(0);
			var prevY = seq.getY(0);
			for (var i = 1; i <= 4; i++) {
				var x = seq.getX(i);
				var y = seq.getY(i);
				var xChanged = x !== prevX;
				var yChanged = y !== prevY;
				if (xChanged === yChanged) return false;
				prevX = x;
				prevY = y;
			}
			return true;
		}
	}, {
		key: 'equalsExact',
		value: function equalsExact(other, tolerance) {
			var otherPolygon = other;
			var thisShell = this.shell;
			var otherPolygonShell = otherPolygon.shell;
			if (!thisShell.equalsExact(otherPolygonShell, tolerance)) {
				return false;
			}
			if (this.holes.length !== otherPolygon.holes.length) {
				return false;
			}
			for (var i = 0; i < this.holes.length; i++) {
				if (!this.holes[i].equalsExact(otherPolygon.holes[i], tolerance)) {
					return false;
				}
			}
			return true;
		}
	}, {
		key: 'normalize',
		value: function normalize() {
			var _this2 = this;

			for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
				args[_key5] = arguments[_key5];
			}

			switch (args.length) {
				case 2:
					return (function () {
						for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
							args[_key6] = arguments[_key6];
						}

						var ring = args[0];
						var clockwise = args[1];

						if (ring.isEmpty()) {
							return null;
						}
						var uniqueCoordinates = [];
						System.arraycopy(ring.getCoordinates(), 0, uniqueCoordinates, 0, uniqueCoordinates.length);
						var minCoordinate = _comVividsolutionsJtsGeomCoordinateArrays2['default'].minCoordinate(ring.getCoordinates());
						_comVividsolutionsJtsGeomCoordinateArrays2['default'].scroll(uniqueCoordinates, minCoordinate);
						System.arraycopy(uniqueCoordinates, 0, ring.getCoordinates(), 0, uniqueCoordinates.length);
						ring.getCoordinates()[uniqueCoordinates.length] = uniqueCoordinates[0];
						if (_comVividsolutionsJtsAlgorithmCGAlgorithms2['default'].isCCW(ring.getCoordinates()) === clockwise) {
							_comVividsolutionsJtsGeomCoordinateArrays2['default'].reverse(ring.getCoordinates());
						}
					}).apply(undefined, args);
				case 0:
					return (function () {
						for (var _len7 = arguments.length, args = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
							args[_key7] = arguments[_key7];
						}

						_this2.normalize(_this2.shell, true);
						for (var i = 0; i < _this2.holes.length; i++) {
							_this2.normalize(_this2.holes[i], false);
						}
						_javaUtilArrays2['default'].sort(_this2.holes);
					}).apply(undefined, args);
			}
		}
	}, {
		key: 'getCoordinate',
		value: function getCoordinate() {
			return this.shell.getCoordinate();
		}
	}, {
		key: 'getNumInteriorRing',
		value: function getNumInteriorRing() {
			return this.holes.length;
		}
	}, {
		key: 'getBoundaryDimension',
		value: function getBoundaryDimension() {
			return 1;
		}
	}, {
		key: 'getDimension',
		value: function getDimension() {
			return 2;
		}
	}, {
		key: 'getLength',
		value: function getLength() {
			var len = 0.0;
			len += this.shell.getLength();
			for (var i = 0; i < this.holes.length; i++) {
				len += this.holes[i].getLength();
			}
			return len;
		}
	}, {
		key: 'getNumPoints',
		value: function getNumPoints() {
			var numPoints = this.shell.getNumPoints();
			for (var i = 0; i < this.holes.length; i++) {
				numPoints += this.holes[i].getNumPoints();
			}
			return numPoints;
		}
	}, {
		key: 'compareToSameClass',
		value: function compareToSameClass() {
			var _this3 = this;

			for (var _len8 = arguments.length, args = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
				args[_key8] = arguments[_key8];
			}

			switch (args.length) {
				case 2:
					return (function () {
						for (var _len9 = arguments.length, args = Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
							args[_key9] = arguments[_key9];
						}

						var o = args[0];
						var comp = args[1];

						var poly = o;
						var thisShell = _this3.shell;
						var otherShell = poly.shell;
						var shellComp = thisShell.compareToSameClass(otherShell, comp);
						if (shellComp !== 0) return shellComp;
						var nHole1 = _this3.getNumInteriorRing();
						var nHole2 = poly.getNumInteriorRing();
						var i = 0;
						while (i < nHole1 && i < nHole2) {
							var thisHole = _this3.getInteriorRingN(i);
							var otherHole = poly.getInteriorRingN(i);
							var holeComp = thisHole.compareToSameClass(otherHole, comp);
							if (holeComp !== 0) return holeComp;
							i++;
						}
						if (i < nHole1) return 1;
						if (i < nHole2) return -1;
						return 0;
					}).apply(undefined, args);
				case 1:
					return (function () {
						for (var _len10 = arguments.length, args = Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
							args[_key10] = arguments[_key10];
						}

						var o = args[0];

						var thisShell = _this3.shell;
						var otherShell = _this3.shell;
						return thisShell.compareToSameClass(otherShell);
					}).apply(undefined, args);
			}
		}
	}, {
		key: 'apply',
		value: function apply() {
			var _this4 = this;

			for (var _len11 = arguments.length, args = Array(_len11), _key11 = 0; _key11 < _len11; _key11++) {
				args[_key11] = arguments[_key11];
			}

			switch (args.length) {
				case 1:
					if (args[0].interfaces_ && args[0].interfaces_.indexOf(_comVividsolutionsJtsGeomCoordinateFilter2['default']) > -1) {
						return (function () {
							for (var _len12 = arguments.length, args = Array(_len12), _key12 = 0; _key12 < _len12; _key12++) {
								args[_key12] = arguments[_key12];
							}

							var filter = args[0];

							_this4.shell.apply(filter);
							for (var i = 0; i < _this4.holes.length; i++) {
								_this4.holes[i].apply(filter);
							}
						}).apply(undefined, args);
					} else if (args[0].interfaces_ && args[0].interfaces_.indexOf(_comVividsolutionsJtsGeomCoordinateSequenceFilter2['default']) > -1) {
						return (function () {
							for (var _len13 = arguments.length, args = Array(_len13), _key13 = 0; _key13 < _len13; _key13++) {
								args[_key13] = arguments[_key13];
							}

							var filter = args[0];

							_this4.shell.apply(filter);
							if (!filter.isDone()) {
								for (var i = 0; i < _this4.holes.length; i++) {
									_this4.holes[i].apply(filter);
									if (filter.isDone()) break;
								}
							}
						}).apply(undefined, args);
					} else if (args[0].interfaces_ && args[0].interfaces_.indexOf(_comVividsolutionsJtsGeomGeometryFilter2['default']) > -1) {
						return (function () {
							for (var _len14 = arguments.length, args = Array(_len14), _key14 = 0; _key14 < _len14; _key14++) {
								args[_key14] = arguments[_key14];
							}

							var filter = args[0];

							filter.filter(_this4);
						}).apply(undefined, args);
					} else if (args[0].interfaces_ && args[0].interfaces_.indexOf(_comVividsolutionsJtsGeomGeometryComponentFilter2['default']) > -1) {
						return (function () {
							for (var _len15 = arguments.length, args = Array(_len15), _key15 = 0; _key15 < _len15; _key15++) {
								args[_key15] = arguments[_key15];
							}

							var filter = args[0];

							filter.filter(_this4);
							_this4.shell.apply(filter);
							for (var i = 0; i < _this4.holes.length; i++) {
								_this4.holes[i].apply(filter);
							}
						}).apply(undefined, args);
					}
			}
		}
	}, {
		key: 'getBoundary',
		value: function getBoundary() {
			if (this.isEmpty()) {
				return this.getFactory().createMultiLineString(null);
			}
			var rings = [];
			rings[0] = this.shell;
			for (var i = 0; i < this.holes.length; i++) {
				rings[i + 1] = this.holes[i];
			}
			if (rings.length <= 1) return this.getFactory().createLinearRing(rings[0].getCoordinateSequence());
			return this.getFactory().createMultiLineString(rings);
		}
	}, {
		key: 'clone',
		value: function clone() {
			var poly = _get(Object.getPrototypeOf(Polygon.prototype), 'clone', this).call(this);
			poly.shell = this.shell.clone();
			poly.holes = [];
			for (var i = 0; i < this.holes.length; i++) {
				poly.holes[i] = this.holes[i].clone();
			}
			return poly;
		}
	}, {
		key: 'getGeometryType',
		value: function getGeometryType() {
			return "Polygon";
		}
	}, {
		key: 'getExteriorRing',
		value: function getExteriorRing() {
			return this.shell;
		}
	}, {
		key: 'isEmpty',
		value: function isEmpty() {
			return this.shell.isEmpty();
		}
	}, {
		key: 'getInteriorRingN',
		value: function getInteriorRingN(n) {
			return this.holes[n];
		}
	}, {
		key: 'interfaces_',
		get: function get() {
			return [_comVividsolutionsJtsGeomPolygonal2['default']];
		}
	}]);

	return Polygon;
})(_comVividsolutionsJtsGeomGeometry2['default']);

exports['default'] = Polygon;

Polygon.serialVersionUID = -3494792200821764533;
module.exports = exports['default'];

},{"com/vividsolutions/jts/algorithm/CGAlgorithms":2,"com/vividsolutions/jts/geom/CoordinateArrays":16,"com/vividsolutions/jts/geom/CoordinateFilter":17,"com/vividsolutions/jts/geom/CoordinateSequenceFilter":21,"com/vividsolutions/jts/geom/Geometry":25,"com/vividsolutions/jts/geom/GeometryComponentFilter":28,"com/vividsolutions/jts/geom/GeometryFactory":29,"com/vividsolutions/jts/geom/GeometryFilter":30,"com/vividsolutions/jts/geom/LinearRing":35,"com/vividsolutions/jts/geom/Polygonal":42,"com/vividsolutions/jts/geom/PrecisionModel":43,"java/util/Arrays":112}],42:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Polygonal = (function () {
	function Polygonal() {
		_classCallCheck(this, Polygonal);

		this.init_.apply(this, arguments);
	}

	_createClass(Polygonal, [{
		key: "init_",
		value: function init_() {
			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			switch (args.length) {}
		}
	}, {
		key: "interfaces_",
		get: function get() {
			return [];
		}
	}]);

	return Polygonal;
})();

exports["default"] = Polygonal;
module.exports = exports["default"];

},{}],43:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _javaUtilHashMap = require('java/util/HashMap');

var _javaUtilHashMap2 = _interopRequireDefault(_javaUtilHashMap);

var _comVividsolutionsJtsGeomCoordinate = require('com/vividsolutions/jts/geom/Coordinate');

var _comVividsolutionsJtsGeomCoordinate2 = _interopRequireDefault(_comVividsolutionsJtsGeomCoordinate);

var _javaLangDouble = require('java/lang/Double');

var _javaLangDouble2 = _interopRequireDefault(_javaLangDouble);

var _javaLangComparable = require('java/lang/Comparable');

var _javaLangComparable2 = _interopRequireDefault(_javaLangComparable);

var _javaIoSerializable = require('java/io/Serializable');

var _javaIoSerializable2 = _interopRequireDefault(_javaIoSerializable);

var PrecisionModel = (function () {
	function PrecisionModel() {
		_classCallCheck(this, PrecisionModel);

		this.init_.apply(this, arguments);
	}

	_createClass(PrecisionModel, [{
		key: 'init_',
		value: function init_() {
			var _this = this;

			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			this.modelType = null;
			this.scale = null;
			switch (args.length) {
				case 1:
					if (args[0] instanceof Type) {
						return (function () {
							for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
								args[_key2] = arguments[_key2];
							}

							var modelType = args[0];

							_this.modelType = modelType;
							if (modelType === PrecisionModel.FIXED) {
								_this.setScale(1.0);
							}
						}).apply(undefined, args);
					} else if (!Number.isInteger(args[0])) {
						return (function () {
							for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
								args[_key3] = arguments[_key3];
							}

							var scale = args[0];

							_this.modelType = PrecisionModel.FIXED;
							_this.setScale(scale);
						}).apply(undefined, args);
					} else if (args[0] instanceof PrecisionModel) {
						return (function () {
							for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
								args[_key4] = arguments[_key4];
							}

							var pm = args[0];

							_this.modelType = pm.modelType;
							_this.scale = pm.scale;
						}).apply(undefined, args);
					}
				case 0:
					return (function () {
						for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
							args[_key5] = arguments[_key5];
						}

						_this.modelType = PrecisionModel.FLOATING;
					}).apply(undefined, args);
			}
		}
	}, {
		key: 'equals',
		value: function equals(other) {
			if (!(other instanceof PrecisionModel)) {
				return false;
			}
			var otherPrecisionModel = other;
			return this.modelType === otherPrecisionModel.modelType && this.scale === otherPrecisionModel.scale;
		}
	}, {
		key: 'compareTo',
		value: function compareTo(o) {
			var other = o;
			var sigDigits = this.getMaximumSignificantDigits();
			var otherSigDigits = other.getMaximumSignificantDigits();
			if (sigDigits < otherSigDigits) return -1;
			if (sigDigits > otherSigDigits) return 1;
			return 0;
		}
	}, {
		key: 'getScale',
		value: function getScale() {
			return this.scale;
		}
	}, {
		key: 'isFloating',
		value: function isFloating() {
			return this.modelType === PrecisionModel.FLOATING || this.modelType === PrecisionModel.FLOATING_SINGLE;
		}
	}, {
		key: 'getType',
		value: function getType() {
			return this.modelType;
		}
	}, {
		key: 'toString',
		value: function toString() {
			var description = "UNKNOWN";
			if (this.modelType === PrecisionModel.FLOATING) {
				description = "Floating";
			} else if (this.modelType === PrecisionModel.FLOATING_SINGLE) {
				description = "Floating-Single";
			} else if (this.modelType === PrecisionModel.FIXED) {
				description = "Fixed (Scale=" + (this.getScale() + ")");
			}
			return description;
		}
	}, {
		key: 'makePrecise',
		value: function makePrecise() {
			var _this2 = this;

			for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
				args[_key6] = arguments[_key6];
			}

			switch (args.length) {
				case 1:
					if (!Number.isInteger(args[0])) {
						return (function () {
							for (var _len7 = arguments.length, args = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
								args[_key7] = arguments[_key7];
							}

							var val = args[0];

							if (_javaLangDouble2['default'].isNaN(val)) return val;
							if (_this2.modelType === PrecisionModel.FLOATING_SINGLE) {
								var floatSingleVal = val;
								return floatSingleVal;
							}
							if (_this2.modelType === PrecisionModel.FIXED) {
								return Math.round(val * _this2.scale) / _this2.scale;
							}
							return val;
						}).apply(undefined, args);
					} else if (args[0] instanceof _comVividsolutionsJtsGeomCoordinate2['default']) {
						return (function () {
							for (var _len8 = arguments.length, args = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
								args[_key8] = arguments[_key8];
							}

							var coord = args[0];

							if (_this2.modelType === PrecisionModel.FLOATING) return null;
							coord.x = _this2.makePrecise(coord.x);
							coord.y = _this2.makePrecise(coord.y);
						}).apply(undefined, args);
					}
			}
		}
	}, {
		key: 'getMaximumSignificantDigits',
		value: function getMaximumSignificantDigits() {
			var maxSigDigits = 16;
			if (this.modelType === PrecisionModel.FLOATING) {
				maxSigDigits = 16;
			} else if (this.modelType === PrecisionModel.FLOATING_SINGLE) {
				maxSigDigits = 6;
			} else if (this.modelType === PrecisionModel.FIXED) {
				maxSigDigits = 1 + Math.ceil(Math.log(this.getScale()) / Math.log(10));
			}
			return maxSigDigits;
		}
	}, {
		key: 'setScale',
		value: function setScale(scale) {
			this.scale = Math.abs(scale);
		}
	}, {
		key: 'interfaces_',
		get: function get() {
			return [_javaIoSerializable2['default'], _javaLangComparable2['default']];
		}
	}], [{
		key: 'mostPrecise',
		value: function mostPrecise(pm1, pm2) {
			if (pm1.compareTo(pm2) >= 0) return pm1;
			return pm2;
		}
	}]);

	return PrecisionModel;
})();

exports['default'] = PrecisionModel;

var Type = (function () {
	function Type() {
		_classCallCheck(this, Type);

		this.init_.apply(this, arguments);
	}

	_createClass(Type, [{
		key: 'init_',
		value: function init_() {
			var _this3 = this;

			for (var _len9 = arguments.length, args = Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
				args[_key9] = arguments[_key9];
			}

			this.name = null;
			switch (args.length) {
				case 1:
					return (function () {
						for (var _len10 = arguments.length, args = Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
							args[_key10] = arguments[_key10];
						}

						var name = args[0];

						_this3.name = name;
						Type.nameToTypeMap.put(name, _this3);
					}).apply(undefined, args);
			}
		}
	}, {
		key: 'readResolve',
		value: function readResolve() {
			return Type.nameToTypeMap.get(this.name);
		}
	}, {
		key: 'toString',
		value: function toString() {
			return this.name;
		}
	}, {
		key: 'interfaces_',
		get: function get() {
			return [_javaIoSerializable2['default']];
		}
	}]);

	return Type;
})();

Type.serialVersionUID = -5528602631731589822;
Type.nameToTypeMap = new _javaUtilHashMap2['default']();
PrecisionModel.Type = Type;
PrecisionModel.serialVersionUID = 7777263578777803835;
PrecisionModel.FIXED = new Type("FIXED");
PrecisionModel.FLOATING = new Type("FLOATING");
PrecisionModel.FLOATING_SINGLE = new Type("FLOATING SINGLE");
PrecisionModel.maximumPreciseValue = 9007199254740992.0;
module.exports = exports['default'];

},{"com/vividsolutions/jts/geom/Coordinate":15,"java/io/Serializable":101,"java/lang/Comparable":105,"java/lang/Double":106,"java/util/HashMap":116}],44:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Puntal = (function () {
	function Puntal() {
		_classCallCheck(this, Puntal);

		this.init_.apply(this, arguments);
	}

	_createClass(Puntal, [{
		key: "init_",
		value: function init_() {
			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			switch (args.length) {}
		}
	}, {
		key: "interfaces_",
		get: function get() {
			return [];
		}
	}]);

	return Puntal;
})();

exports["default"] = Puntal;
module.exports = exports["default"];

},{}],45:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _comVividsolutionsJtsGeomCoordinate = require('com/vividsolutions/jts/geom/Coordinate');

var _comVividsolutionsJtsGeomCoordinate2 = _interopRequireDefault(_comVividsolutionsJtsGeomCoordinate);

var _javaLangRuntimeException = require('java/lang/RuntimeException');

var _javaLangRuntimeException2 = _interopRequireDefault(_javaLangRuntimeException);

var TopologyException = (function (_RuntimeException) {
	_inherits(TopologyException, _RuntimeException);

	function TopologyException() {
		_classCallCheck(this, TopologyException);

		_get(Object.getPrototypeOf(TopologyException.prototype), 'constructor', this).call(this);
		this.init_.apply(this, arguments);
	}

	_createClass(TopologyException, [{
		key: 'init_',
		value: function init_() {
			var _this = this;

			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			_get(Object.getPrototypeOf(TopologyException.prototype), 'init_', this).call(this);
			this.pt = null;
			switch (args.length) {
				case 2:
					return (function () {
						for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
							args[_key2] = arguments[_key2];
						}

						var msg = args[0];
						var pt = args[1];

						_get(Object.getPrototypeOf(TopologyException.prototype), 'init_', _this).call(_this, TopologyException.msgWithCoord(msg, pt));
						_this.pt = new _comVividsolutionsJtsGeomCoordinate2['default'](pt);
					}).apply(undefined, args);
				case 1:
					return (function () {
						for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
							args[_key3] = arguments[_key3];
						}

						var msg = args[0];

						_get(Object.getPrototypeOf(TopologyException.prototype), 'init_', _this).call(_this, msg);
					}).apply(undefined, args);
			}
		}
	}, {
		key: 'getCoordinate',
		value: function getCoordinate() {
			return this.pt;
		}
	}, {
		key: 'interfaces_',
		get: function get() {
			return [];
		}
	}], [{
		key: 'msgWithCoord',
		value: function msgWithCoord(msg, pt) {
			if (pt !== null) return msg + (" [ " + (pt + " ]"));
			return msg;
		}
	}]);

	return TopologyException;
})(_javaLangRuntimeException2['default']);

exports['default'] = TopologyException;
module.exports = exports['default'];

},{"com/vividsolutions/jts/geom/Coordinate":15,"java/lang/RuntimeException":108}],46:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _comVividsolutionsJtsGeomCoordinate = require('com/vividsolutions/jts/geom/Coordinate');

var _comVividsolutionsJtsGeomCoordinate2 = _interopRequireDefault(_comVividsolutionsJtsGeomCoordinate);

var _javaLangDouble = require('java/lang/Double');

var _javaLangDouble2 = _interopRequireDefault(_javaLangDouble);

var _comVividsolutionsJtsGeomCoordinateSequence = require('com/vividsolutions/jts/geom/CoordinateSequence');

var _comVividsolutionsJtsGeomCoordinateSequence2 = _interopRequireDefault(_comVividsolutionsJtsGeomCoordinateSequence);

var _javaIoSerializable = require('java/io/Serializable');

var _javaIoSerializable2 = _interopRequireDefault(_javaIoSerializable);

var CoordinateArraySequence = (function () {
	function CoordinateArraySequence() {
		_classCallCheck(this, CoordinateArraySequence);

		this.init_.apply(this, arguments);
	}

	_createClass(CoordinateArraySequence, [{
		key: 'init_',
		value: function init_() {
			var _this = this;

			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			this.dimension = 3;
			this.coordinates = null;
			switch (args.length) {
				case 2:
					if (args[0] instanceof Array && Number.isInteger(args[1])) {
						return (function () {
							for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
								args[_key2] = arguments[_key2];
							}

							var coordinates = args[0];
							var dimension = args[1];

							_this.coordinates = coordinates;
							_this.dimension = dimension;
							if (coordinates === null) _this.coordinates = [];
						}).apply(undefined, args);
					} else if (Number.isInteger(args[0]) && Number.isInteger(args[1])) {
						return (function () {
							for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
								args[_key3] = arguments[_key3];
							}

							var size = args[0];
							var dimension = args[1];

							_this.coordinates = [];
							_this.dimension = dimension;
							for (var i = 0; i < size; i++) {
								_this.coordinates[i] = new _comVividsolutionsJtsGeomCoordinate2['default']();
							}
						}).apply(undefined, args);
					}
				case 1:
					if (args[0] instanceof Array) {
						return (function () {
							for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
								args[_key4] = arguments[_key4];
							}

							var coordinates = args[0];

							_this.init_(coordinates, 3);
						}).apply(undefined, args);
					} else if (Number.isInteger(args[0])) {
						return (function () {
							for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
								args[_key5] = arguments[_key5];
							}

							var size = args[0];

							_this.coordinates = [];
							for (var i = 0; i < size; i++) {
								_this.coordinates[i] = new _comVividsolutionsJtsGeomCoordinate2['default']();
							}
						}).apply(undefined, args);
					} else if (args[0].interfaces_ && args[0].interfaces_.indexOf(_comVividsolutionsJtsGeomCoordinateSequence2['default']) > -1) {
						return (function () {
							for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
								args[_key6] = arguments[_key6];
							}

							var coordSeq = args[0];

							if (coordSeq === null) {
								_this.coordinates = [];
								return null;
							}
							_this.dimension = coordSeq.getDimension();
							_this.coordinates = [];
							for (var i = 0; i < _this.coordinates.length; i++) {
								_this.coordinates[i] = coordSeq.getCoordinateCopy(i);
							}
						}).apply(undefined, args);
					}
			}
		}
	}, {
		key: 'setOrdinate',
		value: function setOrdinate(index, ordinateIndex, value) {
			switch (ordinateIndex) {
				case _comVividsolutionsJtsGeomCoordinateSequence2['default'].X:
					this.x = value;
					break;
				case _comVividsolutionsJtsGeomCoordinateSequence2['default'].Y:
					this.y = value;
					break;
				case _comVividsolutionsJtsGeomCoordinateSequence2['default'].Z:
					this.z = value;
					break;
				default:
					throw new IllegalArgumentException("invalid ordinateIndex");
			}
		}
	}, {
		key: 'size',
		value: function size() {
			return this.coordinates.length;
		}
	}, {
		key: 'getOrdinate',
		value: function getOrdinate(index, ordinateIndex) {
			switch (ordinateIndex) {
				case _comVividsolutionsJtsGeomCoordinateSequence2['default'].X:
					return this.x;
				case _comVividsolutionsJtsGeomCoordinateSequence2['default'].Y:
					return this.y;
				case _comVividsolutionsJtsGeomCoordinateSequence2['default'].Z:
					return this.z;
			}
			return _javaLangDouble2['default'].NaN;
		}
	}, {
		key: 'getCoordinate',
		value: function getCoordinate() {
			var _this2 = this;

			for (var _len7 = arguments.length, args = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
				args[_key7] = arguments[_key7];
			}

			switch (args.length) {
				case 2:
					return (function () {
						for (var _len8 = arguments.length, args = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
							args[_key8] = arguments[_key8];
						}

						var index = args[0];
						var coord = args[1];

						coord.x = _this2.x;
						coord.y = _this2.y;
						coord.z = _this2.z;
					}).apply(undefined, args);
				case 1:
					return (function () {
						for (var _len9 = arguments.length, args = Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
							args[_key9] = arguments[_key9];
						}

						var i = args[0];

						return _this2.coordinates[i];
					}).apply(undefined, args);
			}
		}
	}, {
		key: 'getCoordinateCopy',
		value: function getCoordinateCopy(i) {
			return new _comVividsolutionsJtsGeomCoordinate2['default'](this.coordinates[i]);
		}
	}, {
		key: 'getDimension',
		value: function getDimension() {
			return this.dimension;
		}
	}, {
		key: 'getX',
		value: function getX(index) {
			return this.x;
		}
	}, {
		key: 'clone',
		value: function clone() {
			var cloneCoordinates = [];
			for (var i = 0; i < this.coordinates.length; i++) {
				cloneCoordinates[i] = this.coordinates[i].clone();
			}
			return new CoordinateArraySequence(cloneCoordinates);
		}
	}, {
		key: 'expandEnvelope',
		value: function expandEnvelope(env) {
			for (var i = 0; i < this.coordinates.length; i++) {
				env.expandToInclude(this.coordinates[i]);
			}
			return env;
		}
	}, {
		key: 'toString',
		value: function toString() {
			if (this.coordinates.length > 0) {
				var strBuf = new StringBuffer(17 * this.coordinates.length);
				strBuf.append('(');
				strBuf.append(this.coordinates[0]);
				for (var i = 1; i < this.coordinates.length; i++) {
					strBuf.append(", ");
					strBuf.append(this.coordinates[i]);
				}
				strBuf.append(')');
				return strBuf.toString();
			} else {
				return "()";
			}
		}
	}, {
		key: 'getY',
		value: function getY(index) {
			return this.y;
		}
	}, {
		key: 'toCoordinateArray',
		value: function toCoordinateArray() {
			return this.coordinates;
		}
	}, {
		key: 'interfaces_',
		get: function get() {
			return [_comVividsolutionsJtsGeomCoordinateSequence2['default'], _javaIoSerializable2['default']];
		}
	}]);

	return CoordinateArraySequence;
})();

exports['default'] = CoordinateArraySequence;

CoordinateArraySequence.serialVersionUID = -915438501601840650;
module.exports = exports['default'];

},{"com/vividsolutions/jts/geom/Coordinate":15,"com/vividsolutions/jts/geom/CoordinateSequence":19,"java/io/Serializable":101,"java/lang/Double":106}],47:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _comVividsolutionsJtsGeomCoordinateSequenceFactory = require('com/vividsolutions/jts/geom/CoordinateSequenceFactory');

var _comVividsolutionsJtsGeomCoordinateSequenceFactory2 = _interopRequireDefault(_comVividsolutionsJtsGeomCoordinateSequenceFactory);

var _comVividsolutionsJtsGeomImplCoordinateArraySequence = require('com/vividsolutions/jts/geom/impl/CoordinateArraySequence');

var _comVividsolutionsJtsGeomImplCoordinateArraySequence2 = _interopRequireDefault(_comVividsolutionsJtsGeomImplCoordinateArraySequence);

var _comVividsolutionsJtsGeomCoordinateSequence = require('com/vividsolutions/jts/geom/CoordinateSequence');

var _comVividsolutionsJtsGeomCoordinateSequence2 = _interopRequireDefault(_comVividsolutionsJtsGeomCoordinateSequence);

var _javaIoSerializable = require('java/io/Serializable');

var _javaIoSerializable2 = _interopRequireDefault(_javaIoSerializable);

var CoordinateArraySequenceFactory = (function () {
	function CoordinateArraySequenceFactory() {
		_classCallCheck(this, CoordinateArraySequenceFactory);

		this.init_.apply(this, arguments);
	}

	_createClass(CoordinateArraySequenceFactory, [{
		key: 'init_',
		value: function init_() {
			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			switch (args.length) {
				case 0:
					return (function () {
						for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
							args[_key2] = arguments[_key2];
						}
					}).apply(undefined, args);
			}
		}
	}, {
		key: 'readResolve',
		value: function readResolve() {
			return CoordinateArraySequenceFactory.instance();
		}
	}, {
		key: 'create',
		value: function create() {
			for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
				args[_key3] = arguments[_key3];
			}

			switch (args.length) {
				case 2:
					return (function () {
						for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
							args[_key4] = arguments[_key4];
						}

						var size = args[0];
						var dimension = args[1];

						if (dimension > 3) dimension = 3;
						if (dimension < 2) return new _comVividsolutionsJtsGeomImplCoordinateArraySequence2['default'](size);
						return new _comVividsolutionsJtsGeomImplCoordinateArraySequence2['default'](size, dimension);
					}).apply(undefined, args);
				case 1:
					if (args[0] instanceof Array) {
						return (function () {
							for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
								args[_key5] = arguments[_key5];
							}

							var coordinates = args[0];

							return new _comVividsolutionsJtsGeomImplCoordinateArraySequence2['default'](coordinates);
						}).apply(undefined, args);
					} else if (args[0].interfaces_ && args[0].interfaces_.indexOf(_comVividsolutionsJtsGeomCoordinateSequence2['default']) > -1) {
						return (function () {
							for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
								args[_key6] = arguments[_key6];
							}

							var coordSeq = args[0];

							return new _comVividsolutionsJtsGeomImplCoordinateArraySequence2['default'](coordSeq);
						}).apply(undefined, args);
					}
			}
		}
	}, {
		key: 'interfaces_',
		get: function get() {
			return [_comVividsolutionsJtsGeomCoordinateSequenceFactory2['default'], _javaIoSerializable2['default']];
		}
	}], [{
		key: 'instance',
		value: function instance() {
			return CoordinateArraySequenceFactory.instanceObject;
		}
	}]);

	return CoordinateArraySequenceFactory;
})();

exports['default'] = CoordinateArraySequenceFactory;

CoordinateArraySequenceFactory.serialVersionUID = -4099577099607551657;
CoordinateArraySequenceFactory.instanceObject = new CoordinateArraySequenceFactory();
module.exports = exports['default'];

},{"com/vividsolutions/jts/geom/CoordinateSequence":19,"com/vividsolutions/jts/geom/CoordinateSequenceFactory":20,"com/vividsolutions/jts/geom/impl/CoordinateArraySequence":46,"java/io/Serializable":101}],48:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _comVividsolutionsJtsGeomLineString = require('com/vividsolutions/jts/geom/LineString');

var _comVividsolutionsJtsGeomLineString2 = _interopRequireDefault(_comVividsolutionsJtsGeomLineString);

var _comVividsolutionsJtsGeomPoint = require('com/vividsolutions/jts/geom/Point');

var _comVividsolutionsJtsGeomPoint2 = _interopRequireDefault(_comVividsolutionsJtsGeomPoint);

var _comVividsolutionsJtsGeomPolygon = require('com/vividsolutions/jts/geom/Polygon');

var _comVividsolutionsJtsGeomPolygon2 = _interopRequireDefault(_comVividsolutionsJtsGeomPolygon);

var _comVividsolutionsJtsGeomMultiPoint = require('com/vividsolutions/jts/geom/MultiPoint');

var _comVividsolutionsJtsGeomMultiPoint2 = _interopRequireDefault(_comVividsolutionsJtsGeomMultiPoint);

var _comVividsolutionsJtsGeomLinearRing = require('com/vividsolutions/jts/geom/LinearRing');

var _comVividsolutionsJtsGeomLinearRing2 = _interopRequireDefault(_comVividsolutionsJtsGeomLinearRing);

var _comVividsolutionsJtsGeomMultiPolygon = require('com/vividsolutions/jts/geom/MultiPolygon');

var _comVividsolutionsJtsGeomMultiPolygon2 = _interopRequireDefault(_comVividsolutionsJtsGeomMultiPolygon);

var _comVividsolutionsJtsGeomGeometryCollection = require('com/vividsolutions/jts/geom/GeometryCollection');

var _comVividsolutionsJtsGeomGeometryCollection2 = _interopRequireDefault(_comVividsolutionsJtsGeomGeometryCollection);

var _javaUtilArrayList = require('java/util/ArrayList');

var _javaUtilArrayList2 = _interopRequireDefault(_javaUtilArrayList);

var _comVividsolutionsJtsUtilAssert = require('com/vividsolutions/jts/util/Assert');

var _comVividsolutionsJtsUtilAssert2 = _interopRequireDefault(_comVividsolutionsJtsUtilAssert);

var _comVividsolutionsJtsGeomMultiLineString = require('com/vividsolutions/jts/geom/MultiLineString');

var _comVividsolutionsJtsGeomMultiLineString2 = _interopRequireDefault(_comVividsolutionsJtsGeomMultiLineString);

var GeometryEditor = (function () {
	function GeometryEditor() {
		_classCallCheck(this, GeometryEditor);

		this.init_.apply(this, arguments);
	}

	_createClass(GeometryEditor, [{
		key: 'init_',
		value: function init_() {
			var _this = this;

			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			this.factory = null;
			this.isUserDataCopied = false;
			switch (args.length) {
				case 1:
					return (function () {
						for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
							args[_key2] = arguments[_key2];
						}

						var factory = args[0];

						_this.factory = factory;
					}).apply(undefined, args);
				case 0:
					return (function () {
						for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
							args[_key3] = arguments[_key3];
						}
					}).apply(undefined, args);
			}
		}
	}, {
		key: 'setCopyUserData',
		value: function setCopyUserData(isUserDataCopied) {
			this.isUserDataCopied = isUserDataCopied;
		}
	}, {
		key: 'edit',
		value: function edit(geometry, operation) {
			if (geometry === null) return null;
			var result = this.editInternal(geometry, operation);
			if (this.isUserDataCopied) {
				result.setUserData(geometry.getUserData());
			}
			return result;
		}
	}, {
		key: 'editInternal',
		value: function editInternal(geometry, operation) {
			if (this.factory === null) this.factory = geometry.getFactory();
			if (geometry instanceof _comVividsolutionsJtsGeomGeometryCollection2['default']) {
				return this.editGeometryCollection(geometry, operation);
			}
			if (geometry instanceof _comVividsolutionsJtsGeomPolygon2['default']) {
				return this.editPolygon(geometry, operation);
			}
			if (geometry instanceof _comVividsolutionsJtsGeomPoint2['default']) {
				return operation.edit(geometry, this.factory);
			}
			if (geometry instanceof _comVividsolutionsJtsGeomLineString2['default']) {
				return operation.edit(geometry, this.factory);
			}
			_comVividsolutionsJtsUtilAssert2['default'].shouldNeverReachHere("Unsupported Geometry class: " + geometry.getClass().getName());
			return null;
		}
	}, {
		key: 'editGeometryCollection',
		value: function editGeometryCollection(collection, operation) {
			var collectionForType = operation.edit(collection, this.factory);
			var geometries = new _javaUtilArrayList2['default']();
			for (var i = 0; i < collectionForType.getNumGeometries(); i++) {
				var geometry = this.edit(collectionForType.getGeometryN(i), operation);
				if (geometry === null || geometry.isEmpty()) {
					continue;
				}
				geometries.add(geometry);
			}
			if (collectionForType.getClass() === _comVividsolutionsJtsGeomMultiPoint2['default']) {
				return this.factory.createMultiPoint(geometries.toArray([]));
			}
			if (collectionForType.getClass() === _comVividsolutionsJtsGeomMultiLineString2['default']) {
				return this.factory.createMultiLineString(geometries.toArray([]));
			}
			if (collectionForType.getClass() === _comVividsolutionsJtsGeomMultiPolygon2['default']) {
				return this.factory.createMultiPolygon(geometries.toArray([]));
			}
			return this.factory.createGeometryCollection(geometries.toArray([]));
		}
	}, {
		key: 'editPolygon',
		value: function editPolygon(polygon, operation) {
			var newPolygon = operation.edit(polygon, this.factory);
			if (newPolygon === null) newPolygon = this.factory.createPolygon(null);
			if (newPolygon.isEmpty()) {
				return newPolygon;
			}
			var shell = this.edit(newPolygon.getExteriorRing(), operation);
			if (shell === null || shell.isEmpty()) {
				return this.factory.createPolygon(null, null);
			}
			var holes = new _javaUtilArrayList2['default']();
			for (var i = 0; i < newPolygon.getNumInteriorRing(); i++) {
				var hole = this.edit(newPolygon.getInteriorRingN(i), operation);
				if (hole === null || hole.isEmpty()) {
					continue;
				}
				holes.add(hole);
			}
			return this.factory.createPolygon(shell, holes.toArray([]));
		}
	}, {
		key: 'interfaces_',
		get: function get() {
			return [];
		}
	}]);

	return GeometryEditor;
})();

exports['default'] = GeometryEditor;

var NoOpGeometryOperation = (function () {
	function NoOpGeometryOperation() {
		_classCallCheck(this, NoOpGeometryOperation);

		this.init_.apply(this, arguments);
	}

	_createClass(NoOpGeometryOperation, [{
		key: 'init_',
		value: function init_() {
			for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
				args[_key4] = arguments[_key4];
			}

			switch (args.length) {}
		}
	}, {
		key: 'edit',
		value: function edit(geometry, factory) {
			return geometry;
		}
	}, {
		key: 'interfaces_',
		get: function get() {
			return [GeometryEditorOperation];
		}
	}]);

	return NoOpGeometryOperation;
})();

GeometryEditor.NoOpGeometryOperation = NoOpGeometryOperation;

var CoordinateOperation = (function () {
	function CoordinateOperation() {
		_classCallCheck(this, CoordinateOperation);

		this.init_.apply(this, arguments);
	}

	_createClass(CoordinateOperation, [{
		key: 'init_',
		value: function init_() {
			for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
				args[_key5] = arguments[_key5];
			}

			switch (args.length) {}
		}
	}, {
		key: 'edit',
		value: function edit(geometry, factory) {
			if (geometry instanceof _comVividsolutionsJtsGeomLinearRing2['default']) {
				return factory.createLinearRing(this.edit(geometry.getCoordinates(), geometry));
			}
			if (geometry instanceof _comVividsolutionsJtsGeomLineString2['default']) {
				return factory.createLineString(this.edit(geometry.getCoordinates(), geometry));
			}
			if (geometry instanceof _comVividsolutionsJtsGeomPoint2['default']) {
				var newCoordinates = this.edit(geometry.getCoordinates(), geometry);
				return factory.createPoint(newCoordinates.length > 0 ? newCoordinates[0] : null);
			}
			return geometry;
		}
	}, {
		key: 'interfaces_',
		get: function get() {
			return [GeometryEditorOperation];
		}
	}]);

	return CoordinateOperation;
})();

GeometryEditor.CoordinateOperation = CoordinateOperation;

var CoordinateSequenceOperation = (function () {
	function CoordinateSequenceOperation() {
		_classCallCheck(this, CoordinateSequenceOperation);

		this.init_.apply(this, arguments);
	}

	_createClass(CoordinateSequenceOperation, [{
		key: 'init_',
		value: function init_() {
			for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
				args[_key6] = arguments[_key6];
			}

			switch (args.length) {}
		}
	}, {
		key: 'edit',
		value: function edit(geometry, factory) {
			if (geometry instanceof _comVividsolutionsJtsGeomLinearRing2['default']) {
				return factory.createLinearRing(this.edit(geometry.getCoordinateSequence(), geometry));
			}
			if (geometry instanceof _comVividsolutionsJtsGeomLineString2['default']) {
				return factory.createLineString(this.edit(geometry.getCoordinateSequence(), geometry));
			}
			if (geometry instanceof _comVividsolutionsJtsGeomPoint2['default']) {
				return factory.createPoint(this.edit(geometry.getCoordinateSequence(), geometry));
			}
			return geometry;
		}
	}, {
		key: 'interfaces_',
		get: function get() {
			return [GeometryEditorOperation];
		}
	}]);

	return CoordinateSequenceOperation;
})();

GeometryEditor.CoordinateSequenceOperation = CoordinateSequenceOperation;
module.exports = exports['default'];

},{"com/vividsolutions/jts/geom/GeometryCollection":26,"com/vividsolutions/jts/geom/LineString":33,"com/vividsolutions/jts/geom/LinearRing":35,"com/vividsolutions/jts/geom/MultiLineString":37,"com/vividsolutions/jts/geom/MultiPoint":38,"com/vividsolutions/jts/geom/MultiPolygon":39,"com/vividsolutions/jts/geom/Point":40,"com/vividsolutions/jts/geom/Polygon":41,"com/vividsolutions/jts/util/Assert":97,"java/util/ArrayList":111}],49:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _comVividsolutionsJtsGeomLineString = require('com/vividsolutions/jts/geom/LineString');

var _comVividsolutionsJtsGeomLineString2 = _interopRequireDefault(_comVividsolutionsJtsGeomLineString);

var _comVividsolutionsJtsGeomGeometry = require('com/vividsolutions/jts/geom/Geometry');

var _comVividsolutionsJtsGeomGeometry2 = _interopRequireDefault(_comVividsolutionsJtsGeomGeometry);

var _javaUtilCollection = require('java/util/Collection');

var _javaUtilCollection2 = _interopRequireDefault(_javaUtilCollection);

var _comVividsolutionsJtsGeomLinearRing = require('com/vividsolutions/jts/geom/LinearRing');

var _comVividsolutionsJtsGeomLinearRing2 = _interopRequireDefault(_comVividsolutionsJtsGeomLinearRing);

var _comVividsolutionsJtsGeomGeometryComponentFilter = require('com/vividsolutions/jts/geom/GeometryComponentFilter');

var _comVividsolutionsJtsGeomGeometryComponentFilter2 = _interopRequireDefault(_comVividsolutionsJtsGeomGeometryComponentFilter);

var _javaUtilArrayList = require('java/util/ArrayList');

var _javaUtilArrayList2 = _interopRequireDefault(_javaUtilArrayList);

var LinearComponentExtracter = (function () {
	function LinearComponentExtracter() {
		_classCallCheck(this, LinearComponentExtracter);

		this.init_.apply(this, arguments);
	}

	_createClass(LinearComponentExtracter, [{
		key: 'init_',
		value: function init_() {
			var _this = this;

			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			this.lines = null;
			this.isForcedToLineString = false;
			switch (args.length) {
				case 2:
					return (function () {
						for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
							args[_key2] = arguments[_key2];
						}

						var lines = args[0];
						var isForcedToLineString = args[1];

						_this.lines = lines;
						_this.isForcedToLineString = isForcedToLineString;
					}).apply(undefined, args);
				case 1:
					return (function () {
						for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
							args[_key3] = arguments[_key3];
						}

						var lines = args[0];

						_this.lines = lines;
					}).apply(undefined, args);
			}
		}
	}, {
		key: 'filter',
		value: function filter(geom) {
			if (this.isForcedToLineString && geom instanceof _comVividsolutionsJtsGeomLinearRing2['default']) {
				var line = geom.getFactory().createLineString(geom.getCoordinateSequence());
				this.lines.add(line);
				return null;
			}
			if (geom instanceof _comVividsolutionsJtsGeomLineString2['default']) this.lines.add(geom);
		}
	}, {
		key: 'setForceToLineString',
		value: function setForceToLineString(isForcedToLineString) {
			this.isForcedToLineString = isForcedToLineString;
		}
	}, {
		key: 'interfaces_',
		get: function get() {
			return [_comVividsolutionsJtsGeomGeometryComponentFilter2['default']];
		}
	}], [{
		key: 'getGeometry',
		value: function getGeometry() {
			for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
				args[_key4] = arguments[_key4];
			}

			switch (args.length) {
				case 2:
					return (function () {
						for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
							args[_key5] = arguments[_key5];
						}

						var geom = args[0];
						var forceToLineString = args[1];

						return geom.getFactory().buildGeometry(LinearComponentExtracter.getLines(geom, forceToLineString));
					}).apply(undefined, args);
				case 1:
					return (function () {
						for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
							args[_key6] = arguments[_key6];
						}

						var geom = args[0];

						return geom.getFactory().buildGeometry(LinearComponentExtracter.getLines(geom));
					}).apply(undefined, args);
			}
		}
	}, {
		key: 'getLines',
		value: function getLines() {
			for (var _len7 = arguments.length, args = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
				args[_key7] = arguments[_key7];
			}

			switch (args.length) {
				case 2:
					if (args[0].interfaces_ && args[0].interfaces_.indexOf(_javaUtilCollection2['default']) > -1 && (args[1].interfaces_ && args[1].interfaces_.indexOf(_javaUtilCollection2['default']) > -1)) {
						return (function () {
							for (var _len8 = arguments.length, args = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
								args[_key8] = arguments[_key8];
							}

							var geoms = args[0];
							var lines = args[1];

							for (var i = geoms.iterator(); i.hasNext();) {
								var g = i.next();
								LinearComponentExtracter.getLines(g, lines);
							}
							return lines;
						}).apply(undefined, args);
					} else if (args[0] instanceof _comVividsolutionsJtsGeomGeometry2['default'] && (args[1].interfaces_ && args[1].interfaces_.indexOf(_javaUtilCollection2['default']) > -1)) {
						return (function () {
							for (var _len9 = arguments.length, args = Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
								args[_key9] = arguments[_key9];
							}

							var geom = args[0];
							var lines = args[1];

							if (geom instanceof _comVividsolutionsJtsGeomLineString2['default']) {
								lines.add(geom);
							} else {
								geom.apply(new LinearComponentExtracter(lines));
							}
							return lines;
						}).apply(undefined, args);
					} else if (args[0] instanceof _comVividsolutionsJtsGeomGeometry2['default'] && typeof args[1] === "boolean") {
						return (function () {
							for (var _len10 = arguments.length, args = Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
								args[_key10] = arguments[_key10];
							}

							var geom = args[0];
							var forceToLineString = args[1];

							var lines = new _javaUtilArrayList2['default']();
							geom.apply(new LinearComponentExtracter(lines, forceToLineString));
							return lines;
						}).apply(undefined, args);
					}
				case 1:
					return (function () {
						for (var _len11 = arguments.length, args = Array(_len11), _key11 = 0; _key11 < _len11; _key11++) {
							args[_key11] = arguments[_key11];
						}

						var geom = args[0];

						return LinearComponentExtracter.getLines(geom, false);
					}).apply(undefined, args);
				case 3:
					if (typeof args[2] === "boolean" && (args[0].interfaces_ && args[0].interfaces_.indexOf(_javaUtilCollection2['default']) > -1 && (args[1].interfaces_ && args[1].interfaces_.indexOf(_javaUtilCollection2['default']) > -1))) {
						return (function () {
							for (var _len12 = arguments.length, args = Array(_len12), _key12 = 0; _key12 < _len12; _key12++) {
								args[_key12] = arguments[_key12];
							}

							var geoms = args[0];
							var lines = args[1];
							var forceToLineString = args[2];

							for (var i = geoms.iterator(); i.hasNext();) {
								var g = i.next();
								LinearComponentExtracter.getLines(g, lines, forceToLineString);
							}
							return lines;
						}).apply(undefined, args);
					} else if (typeof args[2] === "boolean" && (args[0] instanceof _comVividsolutionsJtsGeomGeometry2['default'] && (args[1].interfaces_ && args[1].interfaces_.indexOf(_javaUtilCollection2['default']) > -1))) {
						return (function () {
							for (var _len13 = arguments.length, args = Array(_len13), _key13 = 0; _key13 < _len13; _key13++) {
								args[_key13] = arguments[_key13];
							}

							var geom = args[0];
							var lines = args[1];
							var forceToLineString = args[2];

							geom.apply(new LinearComponentExtracter(lines, forceToLineString));
							return lines;
						}).apply(undefined, args);
					}
			}
		}
	}]);

	return LinearComponentExtracter;
})();

exports['default'] = LinearComponentExtracter;
module.exports = exports['default'];

},{"com/vividsolutions/jts/geom/Geometry":25,"com/vividsolutions/jts/geom/GeometryComponentFilter":28,"com/vividsolutions/jts/geom/LineString":33,"com/vividsolutions/jts/geom/LinearRing":35,"java/util/ArrayList":111,"java/util/Collection":113}],50:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _comVividsolutionsJtsGeomGeometryCollection = require('com/vividsolutions/jts/geom/GeometryCollection');

var _comVividsolutionsJtsGeomGeometryCollection2 = _interopRequireDefault(_comVividsolutionsJtsGeomGeometryCollection);

var ShortCircuitedGeometryVisitor = (function () {
	function ShortCircuitedGeometryVisitor() {
		_classCallCheck(this, ShortCircuitedGeometryVisitor);

		this.init_.apply(this, arguments);
	}

	_createClass(ShortCircuitedGeometryVisitor, [{
		key: 'init_',
		value: function init_() {
			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			this.isDone = false;
			switch (args.length) {
				case 0:
					return (function () {
						for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
							args[_key2] = arguments[_key2];
						}
					}).apply(undefined, args);
			}
		}
	}, {
		key: 'applyTo',
		value: function applyTo(geom) {
			for (var i = 0; i < geom.getNumGeometries() && !this.isDone; i++) {
				var element = geom.getGeometryN(i);
				if (!(element instanceof _comVividsolutionsJtsGeomGeometryCollection2['default'])) {
					this.visit(element);
					if (this.isDone()) {
						this.isDone = true;
						return null;
					}
				} else this.applyTo(element);
			}
		}
	}, {
		key: 'interfaces_',
		get: function get() {
			return [];
		}
	}]);

	return ShortCircuitedGeometryVisitor;
})();

exports['default'] = ShortCircuitedGeometryVisitor;
module.exports = exports['default'];

},{"com/vividsolutions/jts/geom/GeometryCollection":26}],51:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _comVividsolutionsJtsGeomLocation = require('com/vividsolutions/jts/geom/Location');

var _comVividsolutionsJtsGeomLocation2 = _interopRequireDefault(_comVividsolutionsJtsGeomLocation);

var _comVividsolutionsJtsGeomgraphPosition = require('com/vividsolutions/jts/geomgraph/Position');

var _comVividsolutionsJtsGeomgraphPosition2 = _interopRequireDefault(_comVividsolutionsJtsGeomgraphPosition);

var Depth = (function () {
	function Depth() {
		_classCallCheck(this, Depth);

		this.init_.apply(this, arguments);
	}

	_createClass(Depth, [{
		key: 'init_',
		value: function init_() {
			var _this = this;

			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			this.depth = [[], []];
			switch (args.length) {
				case 0:
					return (function () {
						for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
							args[_key2] = arguments[_key2];
						}

						for (var i = 0; i < 2; i++) {
							for (var j = 0; j < 3; j++) {
								_this.depth[i][j] = Depth.NULL_VALUE;
							}
						}
					}).apply(undefined, args);
			}
		}
	}, {
		key: 'getDepth',
		value: function getDepth(geomIndex, posIndex) {
			return this.depth[geomIndex][posIndex];
		}
	}, {
		key: 'setDepth',
		value: function setDepth(geomIndex, posIndex, depthValue) {
			this.depth[geomIndex][posIndex] = depthValue;
		}
	}, {
		key: 'isNull',
		value: function isNull() {
			var _this2 = this;

			for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
				args[_key3] = arguments[_key3];
			}

			switch (args.length) {
				case 2:
					return (function () {
						for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
							args[_key4] = arguments[_key4];
						}

						var geomIndex = args[0];
						var posIndex = args[1];

						return _this2.depth[geomIndex][posIndex] === Depth.NULL_VALUE;
					}).apply(undefined, args);
				case 1:
					return (function () {
						for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
							args[_key5] = arguments[_key5];
						}

						var geomIndex = args[0];

						return _this2.depth[geomIndex][1] === Depth.NULL_VALUE;
					}).apply(undefined, args);
				case 0:
					return (function () {
						for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
							args[_key6] = arguments[_key6];
						}

						for (var i = 0; i < 2; i++) {
							for (var j = 0; j < 3; j++) {
								if (_this2.depth[i][j] !== Depth.NULL_VALUE) return false;
							}
						}
						return true;
					}).apply(undefined, args);
			}
		}
	}, {
		key: 'normalize',
		value: function normalize() {
			for (var i = 0; i < 2; i++) {
				if (!this.isNull(i)) {
					var minDepth = this.depth[i][1];
					if (this.depth[i][2] < minDepth) minDepth = this.depth[i][2];
					if (minDepth < 0) minDepth = 0;
					for (var j = 1; j < 3; j++) {
						var newValue = 0;
						if (this.depth[i][j] > minDepth) newValue = 1;
						this.depth[i][j] = newValue;
					}
				}
			}
		}
	}, {
		key: 'getDelta',
		value: function getDelta(geomIndex) {
			return this.depth[geomIndex][_comVividsolutionsJtsGeomgraphPosition2['default'].RIGHT] - this.depth[geomIndex][_comVividsolutionsJtsGeomgraphPosition2['default'].LEFT];
		}
	}, {
		key: 'getLocation',
		value: function getLocation(geomIndex, posIndex) {
			if (this.depth[geomIndex][posIndex] <= 0) return _comVividsolutionsJtsGeomLocation2['default'].EXTERIOR;
			return _comVividsolutionsJtsGeomLocation2['default'].INTERIOR;
		}
	}, {
		key: 'toString',
		value: function toString() {
			return "A: " + (this.depth[0][1] + ("," + (this.depth[0][2] + (" B: " + (this.depth[1][1] + ("," + this.depth[1][2]))))));
		}
	}, {
		key: 'add',
		value: function add() {
			var _this3 = this;

			for (var _len7 = arguments.length, args = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
				args[_key7] = arguments[_key7];
			}

			switch (args.length) {
				case 1:
					return (function () {
						for (var _len8 = arguments.length, args = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
							args[_key8] = arguments[_key8];
						}

						var lbl = args[0];

						for (var i = 0; i < 2; i++) {
							for (var j = 1; j < 3; j++) {
								var loc = lbl.getLocation(i, j);
								if (loc === _comVividsolutionsJtsGeomLocation2['default'].EXTERIOR || loc === _comVividsolutionsJtsGeomLocation2['default'].INTERIOR) {
									if (_this3.isNull(i, j)) {
										_this3.depth[i][j] = Depth.depthAtLocation(loc);
									} else _this3.depth[i][j] += Depth.depthAtLocation(loc);
								}
							}
						}
					}).apply(undefined, args);
				case 3:
					return (function () {
						for (var _len9 = arguments.length, args = Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
							args[_key9] = arguments[_key9];
						}

						var geomIndex = args[0];
						var posIndex = args[1];
						var location = args[2];

						if (location === _comVividsolutionsJtsGeomLocation2['default'].INTERIOR) _this3.depth[geomIndex][posIndex]++;
					}).apply(undefined, args);
			}
		}
	}, {
		key: 'interfaces_',
		get: function get() {
			return [];
		}
	}], [{
		key: 'depthAtLocation',
		value: function depthAtLocation(location) {
			if (location === _comVividsolutionsJtsGeomLocation2['default'].EXTERIOR) return 0;
			if (location === _comVividsolutionsJtsGeomLocation2['default'].INTERIOR) return 1;
			return Depth.NULL_VALUE;
		}
	}]);

	return Depth;
})();

exports['default'] = Depth;

Depth.NULL_VALUE = -1;
module.exports = exports['default'];

},{"com/vividsolutions/jts/geom/Location":36,"com/vividsolutions/jts/geomgraph/Position":65}],52:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _comVividsolutionsJtsGeomLocation = require('com/vividsolutions/jts/geom/Location');

var _comVividsolutionsJtsGeomLocation2 = _interopRequireDefault(_comVividsolutionsJtsGeomLocation);

var _comVividsolutionsJtsGeomgraphEdgeEnd = require('com/vividsolutions/jts/geomgraph/EdgeEnd');

var _comVividsolutionsJtsGeomgraphEdgeEnd2 = _interopRequireDefault(_comVividsolutionsJtsGeomgraphEdgeEnd);

var _comVividsolutionsJtsGeomgraphPosition = require('com/vividsolutions/jts/geomgraph/Position');

var _comVividsolutionsJtsGeomgraphPosition2 = _interopRequireDefault(_comVividsolutionsJtsGeomgraphPosition);

var _comVividsolutionsJtsGeomTopologyException = require('com/vividsolutions/jts/geom/TopologyException');

var _comVividsolutionsJtsGeomTopologyException2 = _interopRequireDefault(_comVividsolutionsJtsGeomTopologyException);

var _comVividsolutionsJtsGeomgraphLabel = require('com/vividsolutions/jts/geomgraph/Label');

var _comVividsolutionsJtsGeomgraphLabel2 = _interopRequireDefault(_comVividsolutionsJtsGeomgraphLabel);

var DirectedEdge = (function (_EdgeEnd) {
	_inherits(DirectedEdge, _EdgeEnd);

	function DirectedEdge() {
		_classCallCheck(this, DirectedEdge);

		_get(Object.getPrototypeOf(DirectedEdge.prototype), 'constructor', this).call(this);
		this.init_.apply(this, arguments);
	}

	_createClass(DirectedEdge, [{
		key: 'init_',
		value: function init_() {
			var _this = this;

			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			_get(Object.getPrototypeOf(DirectedEdge.prototype), 'init_', this).call(this);
			this.isForward = null;
			this.isInResult = false;
			this.isVisited = false;
			this.sym = null;
			this.next = null;
			this.nextMin = null;
			this.edgeRing = null;
			this.minEdgeRing = null;
			this.depth = [0, -999, -999];
			switch (args.length) {
				case 2:
					return (function () {
						for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
							args[_key2] = arguments[_key2];
						}

						var edge = args[0];
						var isForward = args[1];

						_get(Object.getPrototypeOf(DirectedEdge.prototype), 'init_', _this).call(_this, edge);
						_this.isForward = isForward;
						if (isForward) {
							_this.init(edge.getCoordinate(0), edge.getCoordinate(1));
						} else {
							var n = edge.getNumPoints() - 1;
							_this.init(edge.getCoordinate(n), edge.getCoordinate(n - 1));
						}
						_this.computeDirectedLabel();
					}).apply(undefined, args);
			}
		}
	}, {
		key: 'getNextMin',
		value: function getNextMin() {
			return this.nextMin;
		}
	}, {
		key: 'getDepth',
		value: function getDepth(position) {
			return this.depth[position];
		}
	}, {
		key: 'setVisited',
		value: function setVisited(isVisited) {
			this.isVisited = isVisited;
		}
	}, {
		key: 'computeDirectedLabel',
		value: function computeDirectedLabel() {
			this.label = new _comVividsolutionsJtsGeomgraphLabel2['default'](this.edge.getLabel());
			if (!this.isForward) this.label.flip();
		}
	}, {
		key: 'getNext',
		value: function getNext() {
			return this.next;
		}
	}, {
		key: 'setDepth',
		value: function setDepth(position, depthVal) {
			if (this.depth[position] !== -999) {
				if (this.depth[position] !== depthVal) throw new _comVividsolutionsJtsGeomTopologyException2['default']("assigned depths do not match", this.getCoordinate());
			}
			this.depth[position] = depthVal;
		}
	}, {
		key: 'isInteriorAreaEdge',
		value: function isInteriorAreaEdge() {
			var isInteriorAreaEdge = true;
			for (var i = 0; i < 2; i++) {
				if (!(this.label.isArea(i) && this.label.getLocation(i, _comVividsolutionsJtsGeomgraphPosition2['default'].LEFT) === _comVividsolutionsJtsGeomLocation2['default'].INTERIOR && this.label.getLocation(i, _comVividsolutionsJtsGeomgraphPosition2['default'].RIGHT) === _comVividsolutionsJtsGeomLocation2['default'].INTERIOR)) {
					isInteriorAreaEdge = false;
				}
			}
			return isInteriorAreaEdge;
		}
	}, {
		key: 'setNextMin',
		value: function setNextMin(nextMin) {
			this.nextMin = nextMin;
		}
	}, {
		key: 'print',
		value: function print(out) {
			_get(Object.getPrototypeOf(DirectedEdge.prototype), 'print', this).call(this, out);
			out.print(" " + (this.depth[_comVividsolutionsJtsGeomgraphPosition2['default'].LEFT] + ("/" + this.depth[_comVividsolutionsJtsGeomgraphPosition2['default'].RIGHT])));
			out.print(" (" + (this.getDepthDelta() + ")"));
			if (this.isInResult) out.print(" inResult");
		}
	}, {
		key: 'setMinEdgeRing',
		value: function setMinEdgeRing(minEdgeRing) {
			this.minEdgeRing = minEdgeRing;
		}
	}, {
		key: 'isLineEdge',
		value: function isLineEdge() {
			var isLine = this.label.isLine(0) || this.label.isLine(1);
			var isExteriorIfArea0 = !this.label.isArea(0) || this.label.allPositionsEqual(0, _comVividsolutionsJtsGeomLocation2['default'].EXTERIOR);
			var isExteriorIfArea1 = !this.label.isArea(1) || this.label.allPositionsEqual(1, _comVividsolutionsJtsGeomLocation2['default'].EXTERIOR);
			return isLine && (isExteriorIfArea0 && isExteriorIfArea1);
		}
	}, {
		key: 'setEdgeRing',
		value: function setEdgeRing(edgeRing) {
			this.edgeRing = edgeRing;
		}
	}, {
		key: 'getMinEdgeRing',
		value: function getMinEdgeRing() {
			return this.minEdgeRing;
		}
	}, {
		key: 'getDepthDelta',
		value: function getDepthDelta() {
			var depthDelta = this.edge.getDepthDelta();
			if (!this.isForward) depthDelta = -depthDelta;
			return depthDelta;
		}
	}, {
		key: 'setInResult',
		value: function setInResult(isInResult) {
			this.isInResult = isInResult;
		}
	}, {
		key: 'getSym',
		value: function getSym() {
			return this.sym;
		}
	}, {
		key: 'isForward',
		value: function isForward() {
			return this.isForward;
		}
	}, {
		key: 'getEdge',
		value: function getEdge() {
			return this.edge;
		}
	}, {
		key: 'printEdge',
		value: function printEdge(out) {
			this.print(out);
			out.print(" ");
			if (this.isForward) this.edge.print(out);else this.edge.printReverse(out);
		}
	}, {
		key: 'setSym',
		value: function setSym(de) {
			this.sym = de;
		}
	}, {
		key: 'setVisitedEdge',
		value: function setVisitedEdge(isVisited) {
			this.setVisited(isVisited);
			this.sym.setVisited(isVisited);
		}
	}, {
		key: 'setEdgeDepths',
		value: function setEdgeDepths(position, depth) {
			var depthDelta = this.getEdge().getDepthDelta();
			if (!this.isForward) depthDelta = -depthDelta;
			var directionFactor = 1;
			if (position === _comVividsolutionsJtsGeomgraphPosition2['default'].LEFT) directionFactor = -1;
			var oppositePos = _comVividsolutionsJtsGeomgraphPosition2['default'].opposite(position);
			var delta = depthDelta * directionFactor;
			var oppositeDepth = depth + delta;
			this.setDepth(position, depth);
			this.setDepth(oppositePos, oppositeDepth);
		}
	}, {
		key: 'getEdgeRing',
		value: function getEdgeRing() {
			return this.edgeRing;
		}
	}, {
		key: 'isInResult',
		value: function isInResult() {
			return this.isInResult;
		}
	}, {
		key: 'setNext',
		value: function setNext(next) {
			this.next = next;
		}
	}, {
		key: 'isVisited',
		value: function isVisited() {
			return this.isVisited;
		}
	}, {
		key: 'interfaces_',
		get: function get() {
			return [];
		}
	}], [{
		key: 'depthFactor',
		value: function depthFactor(currLocation, nextLocation) {
			if (currLocation === _comVividsolutionsJtsGeomLocation2['default'].EXTERIOR && nextLocation === _comVividsolutionsJtsGeomLocation2['default'].INTERIOR) return 1;else if (currLocation === _comVividsolutionsJtsGeomLocation2['default'].INTERIOR && nextLocation === _comVividsolutionsJtsGeomLocation2['default'].EXTERIOR) return -1;
			return 0;
		}
	}]);

	return DirectedEdge;
})(_comVividsolutionsJtsGeomgraphEdgeEnd2['default']);

exports['default'] = DirectedEdge;
module.exports = exports['default'];

},{"com/vividsolutions/jts/geom/Location":36,"com/vividsolutions/jts/geom/TopologyException":45,"com/vividsolutions/jts/geomgraph/EdgeEnd":54,"com/vividsolutions/jts/geomgraph/Label":60,"com/vividsolutions/jts/geomgraph/Position":65}],53:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _comVividsolutionsJtsGeomgraphEdgeIntersectionList = require('com/vividsolutions/jts/geomgraph/EdgeIntersectionList');

var _comVividsolutionsJtsGeomgraphEdgeIntersectionList2 = _interopRequireDefault(_comVividsolutionsJtsGeomgraphEdgeIntersectionList);

var _comVividsolutionsJtsGeomgraphIndexMonotoneChainEdge = require('com/vividsolutions/jts/geomgraph/index/MonotoneChainEdge');

var _comVividsolutionsJtsGeomgraphIndexMonotoneChainEdge2 = _interopRequireDefault(_comVividsolutionsJtsGeomgraphIndexMonotoneChainEdge);

var _comVividsolutionsJtsGeomgraphPosition = require('com/vividsolutions/jts/geomgraph/Position');

var _comVividsolutionsJtsGeomgraphPosition2 = _interopRequireDefault(_comVividsolutionsJtsGeomgraphPosition);

var _comVividsolutionsJtsGeomCoordinate = require('com/vividsolutions/jts/geom/Coordinate');

var _comVividsolutionsJtsGeomCoordinate2 = _interopRequireDefault(_comVividsolutionsJtsGeomCoordinate);

var _comVividsolutionsJtsGeomgraphLabel = require('com/vividsolutions/jts/geomgraph/Label');

var _comVividsolutionsJtsGeomgraphLabel2 = _interopRequireDefault(_comVividsolutionsJtsGeomgraphLabel);

var _comVividsolutionsJtsGeomEnvelope = require('com/vividsolutions/jts/geom/Envelope');

var _comVividsolutionsJtsGeomEnvelope2 = _interopRequireDefault(_comVividsolutionsJtsGeomEnvelope);

var _comVividsolutionsJtsGeomgraphDepth = require('com/vividsolutions/jts/geomgraph/Depth');

var _comVividsolutionsJtsGeomgraphDepth2 = _interopRequireDefault(_comVividsolutionsJtsGeomgraphDepth);

var _comVividsolutionsJtsGeomgraphGraphComponent = require('com/vividsolutions/jts/geomgraph/GraphComponent');

var _comVividsolutionsJtsGeomgraphGraphComponent2 = _interopRequireDefault(_comVividsolutionsJtsGeomgraphGraphComponent);

var Edge = (function (_GraphComponent) {
	_inherits(Edge, _GraphComponent);

	function Edge() {
		_classCallCheck(this, Edge);

		_get(Object.getPrototypeOf(Edge.prototype), 'constructor', this).call(this);
		this.init_.apply(this, arguments);
	}

	_createClass(Edge, [{
		key: 'init_',
		value: function init_() {
			var _this = this;

			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			_get(Object.getPrototypeOf(Edge.prototype), 'init_', this).call(this);
			this.pts = null;
			this.env = null;
			this.eiList = new _comVividsolutionsJtsGeomgraphEdgeIntersectionList2['default'](this);
			this.name = null;
			this.mce = null;
			this.isIsolated = true;
			this.depth = new _comVividsolutionsJtsGeomgraphDepth2['default']();
			this.depthDelta = 0;
			switch (args.length) {
				case 2:
					return (function () {
						for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
							args[_key2] = arguments[_key2];
						}

						var pts = args[0];
						var label = args[1];

						_this.pts = pts;
						_this.label = label;
					}).apply(undefined, args);
				case 1:
					return (function () {
						for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
							args[_key3] = arguments[_key3];
						}

						var pts = args[0];

						_this.init_(pts, null);
					}).apply(undefined, args);
			}
		}
	}, {
		key: 'getDepth',
		value: function getDepth() {
			return this.depth;
		}
	}, {
		key: 'getCollapsedEdge',
		value: function getCollapsedEdge() {
			var newPts = [];
			newPts[0] = this.pts[0];
			newPts[1] = this.pts[1];
			var newe = new Edge(newPts, _comVividsolutionsJtsGeomgraphLabel2['default'].toLineLabel(this.label));
			return newe;
		}
	}, {
		key: 'isIsolated',
		value: function isIsolated() {
			return this.isIsolated;
		}
	}, {
		key: 'getCoordinates',
		value: function getCoordinates() {
			return this.pts;
		}
	}, {
		key: 'setIsolated',
		value: function setIsolated(isIsolated) {
			this.isIsolated = isIsolated;
		}
	}, {
		key: 'setName',
		value: function setName(name) {
			this.name = name;
		}
	}, {
		key: 'equals',
		value: function equals(o) {
			if (!(o instanceof Edge)) return false;
			var e = o;
			if (this.pts.length !== e.pts.length) return false;
			var isEqualForward = true;
			var isEqualReverse = true;
			var iRev = this.pts.length;
			for (var i = 0; i < this.pts.length; i++) {
				if (!this.pts[i].equals2D(e.pts[i])) {
					isEqualForward = false;
				}
				if (!this.pts[i].equals2D(e.pts[--iRev])) {
					isEqualReverse = false;
				}
				if (!isEqualForward && !isEqualReverse) return false;
			}
			return true;
		}
	}, {
		key: 'getCoordinate',
		value: function getCoordinate() {
			var _this2 = this;

			for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
				args[_key4] = arguments[_key4];
			}

			switch (args.length) {
				case 1:
					return (function () {
						for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
							args[_key5] = arguments[_key5];
						}

						var i = args[0];

						return _this2.pts[i];
					}).apply(undefined, args);
				case 0:
					return (function () {
						for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
							args[_key6] = arguments[_key6];
						}

						if (_this2.pts.length > 0) return _this2.pts[0];
						return null;
					}).apply(undefined, args);
			}
		}
	}, {
		key: 'print',
		value: function print(out) {
			out.print("edge " + (this.name + ": "));
			out.print("LINESTRING (");
			for (var i = 0; i < this.pts.length; i++) {
				if (i > 0) out.print(",");
				out.print(this.x + (" " + this.y));
			}
			out.print(")  " + (this.label + (" " + this.depthDelta)));
		}
	}, {
		key: 'computeIM',
		value: function computeIM(im) {
			Edge.updateIM(this.label, im);
		}
	}, {
		key: 'isCollapsed',
		value: function isCollapsed() {
			if (!this.label.isArea()) return false;
			if (this.pts.length !== 3) return false;
			if (this.pts[0].equals(this.pts[2])) return true;
			return false;
		}
	}, {
		key: 'isClosed',
		value: function isClosed() {
			return this.pts[0].equals(this.pts[this.pts.length - 1]);
		}
	}, {
		key: 'getMaximumSegmentIndex',
		value: function getMaximumSegmentIndex() {
			return this.pts.length - 1;
		}
	}, {
		key: 'getDepthDelta',
		value: function getDepthDelta() {
			return this.depthDelta;
		}
	}, {
		key: 'getNumPoints',
		value: function getNumPoints() {
			return this.pts.length;
		}
	}, {
		key: 'printReverse',
		value: function printReverse(out) {
			out.print("edge " + (this.name + ": "));
			for (var i = this.pts.length - 1; i >= 0; i--) {
				out.print(this.pts[i] + " ");
			}
			out.println("");
		}
	}, {
		key: 'getMonotoneChainEdge',
		value: function getMonotoneChainEdge() {
			if (this.mce === null) this.mce = new _comVividsolutionsJtsGeomgraphIndexMonotoneChainEdge2['default'](this);
			return this.mce;
		}
	}, {
		key: 'getEnvelope',
		value: function getEnvelope() {
			if (this.env === null) {
				this.env = new _comVividsolutionsJtsGeomEnvelope2['default']();
				for (var i = 0; i < this.pts.length; i++) {
					this.env.expandToInclude(this.pts[i]);
				}
			}
			return this.env;
		}
	}, {
		key: 'addIntersection',
		value: function addIntersection(li, segmentIndex, geomIndex, intIndex) {
			var intPt = new _comVividsolutionsJtsGeomCoordinate2['default'](li.getIntersection(intIndex));
			var normalizedSegmentIndex = segmentIndex;
			var dist = li.getEdgeDistance(geomIndex, intIndex);
			var nextSegIndex = normalizedSegmentIndex + 1;
			if (nextSegIndex < this.pts.length) {
				var nextPt = this.pts[nextSegIndex];
				if (intPt.equals2D(nextPt)) {
					normalizedSegmentIndex = nextSegIndex;
					dist = 0.0;
				}
			}
			var ei = this.eiList.add(intPt, normalizedSegmentIndex, dist);
		}
	}, {
		key: 'toString',
		value: function toString() {
			var buf = new StringBuffer();
			buf.append("edge " + (this.name + ": "));
			buf.append("LINESTRING (");
			for (var i = 0; i < this.pts.length; i++) {
				if (i > 0) buf.append(",");
				buf.append(this.x + (" " + this.y));
			}
			buf.append(")  " + (this.label + (" " + this.depthDelta)));
			return buf.toString();
		}
	}, {
		key: 'isPointwiseEqual',
		value: function isPointwiseEqual(e) {
			if (this.pts.length !== e.pts.length) return false;
			for (var i = 0; i < this.pts.length; i++) {
				if (!this.pts[i].equals2D(e.pts[i])) {
					return false;
				}
			}
			return true;
		}
	}, {
		key: 'setDepthDelta',
		value: function setDepthDelta(depthDelta) {
			this.depthDelta = depthDelta;
		}
	}, {
		key: 'getEdgeIntersectionList',
		value: function getEdgeIntersectionList() {
			return this.eiList;
		}
	}, {
		key: 'addIntersections',
		value: function addIntersections(li, segmentIndex, geomIndex) {
			for (var i = 0; i < li.getIntersectionNum(); i++) {
				this.addIntersection(li, segmentIndex, geomIndex, i);
			}
		}
	}, {
		key: 'interfaces_',
		get: function get() {
			return [];
		}
	}], [{
		key: 'updateIM',
		value: function updateIM(label, im) {
			im.setAtLeastIfValid(label.getLocation(0, _comVividsolutionsJtsGeomgraphPosition2['default'].ON), label.getLocation(1, _comVividsolutionsJtsGeomgraphPosition2['default'].ON), 1);
			if (label.isArea()) {
				im.setAtLeastIfValid(label.getLocation(0, _comVividsolutionsJtsGeomgraphPosition2['default'].LEFT), label.getLocation(1, _comVividsolutionsJtsGeomgraphPosition2['default'].LEFT), 2);
				im.setAtLeastIfValid(label.getLocation(0, _comVividsolutionsJtsGeomgraphPosition2['default'].RIGHT), label.getLocation(1, _comVividsolutionsJtsGeomgraphPosition2['default'].RIGHT), 2);
			}
		}
	}]);

	return Edge;
})(_comVividsolutionsJtsGeomgraphGraphComponent2['default']);

exports['default'] = Edge;
module.exports = exports['default'];

},{"com/vividsolutions/jts/geom/Coordinate":15,"com/vividsolutions/jts/geom/Envelope":24,"com/vividsolutions/jts/geomgraph/Depth":51,"com/vividsolutions/jts/geomgraph/EdgeIntersectionList":57,"com/vividsolutions/jts/geomgraph/GraphComponent":59,"com/vividsolutions/jts/geomgraph/Label":60,"com/vividsolutions/jts/geomgraph/Position":65,"com/vividsolutions/jts/geomgraph/index/MonotoneChainEdge":70}],54:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _comVividsolutionsJtsAlgorithmCGAlgorithms = require('com/vividsolutions/jts/algorithm/CGAlgorithms');

var _comVividsolutionsJtsAlgorithmCGAlgorithms2 = _interopRequireDefault(_comVividsolutionsJtsAlgorithmCGAlgorithms);

var _javaLangComparable = require('java/lang/Comparable');

var _javaLangComparable2 = _interopRequireDefault(_javaLangComparable);

var _comVividsolutionsJtsGeomgraphQuadrant = require('com/vividsolutions/jts/geomgraph/Quadrant');

var _comVividsolutionsJtsGeomgraphQuadrant2 = _interopRequireDefault(_comVividsolutionsJtsGeomgraphQuadrant);

var _comVividsolutionsJtsUtilAssert = require('com/vividsolutions/jts/util/Assert');

var _comVividsolutionsJtsUtilAssert2 = _interopRequireDefault(_comVividsolutionsJtsUtilAssert);

var EdgeEnd = (function () {
	function EdgeEnd() {
		_classCallCheck(this, EdgeEnd);

		this.init_.apply(this, arguments);
	}

	_createClass(EdgeEnd, [{
		key: 'init_',
		value: function init_() {
			var _this = this;

			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			this.edge = null;
			this.label = null;
			this.node = null;
			this.p0 = null;
			this.p1 = null;
			this.dx = null;
			this.dy = null;
			this.quadrant = null;
			switch (args.length) {
				case 4:
					return (function () {
						for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
							args[_key2] = arguments[_key2];
						}

						var edge = args[0];
						var p0 = args[1];
						var p1 = args[2];
						var label = args[3];

						_this.init_(edge);
						_this.init(p0, p1);
						_this.label = label;
					}).apply(undefined, args);
				case 1:
					return (function () {
						for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
							args[_key3] = arguments[_key3];
						}

						var edge = args[0];

						_this.edge = edge;
					}).apply(undefined, args);
				case 3:
					return (function () {
						for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
							args[_key4] = arguments[_key4];
						}

						var edge = args[0];
						var p0 = args[1];
						var p1 = args[2];

						_this.init_(edge, p0, p1, null);
					}).apply(undefined, args);
			}
		}
	}, {
		key: 'compareDirection',
		value: function compareDirection(e) {
			if (this.dx === e.dx && this.dy === e.dy) return 0;
			if (this.quadrant > e.quadrant) return 1;
			if (this.quadrant < e.quadrant) return -1;
			return _comVividsolutionsJtsAlgorithmCGAlgorithms2['default'].computeOrientation(e.p0, e.p1, this.p1);
		}
	}, {
		key: 'getDy',
		value: function getDy() {
			return this.dy;
		}
	}, {
		key: 'getCoordinate',
		value: function getCoordinate() {
			return this.p0;
		}
	}, {
		key: 'setNode',
		value: function setNode(node) {
			this.node = node;
		}
	}, {
		key: 'print',
		value: function print(out) {
			var angle = Math.atan2(this.dy, this.dx);
			var className = this.getClass().getName();
			var lastDotPos = className.lastIndexOf('.');
			var name = className.substring(lastDotPos + 1);
			out.print("  " + (name + (": " + (this.p0 + (" - " + (this.p1 + (" " + (this.quadrant + (":" + (angle + ("   " + this.label)))))))))));
		}
	}, {
		key: 'compareTo',
		value: function compareTo(obj) {
			var e = obj;
			return this.compareDirection(e);
		}
	}, {
		key: 'getDirectedCoordinate',
		value: function getDirectedCoordinate() {
			return this.p1;
		}
	}, {
		key: 'getDx',
		value: function getDx() {
			return this.dx;
		}
	}, {
		key: 'getLabel',
		value: function getLabel() {
			return this.label;
		}
	}, {
		key: 'getEdge',
		value: function getEdge() {
			return this.edge;
		}
	}, {
		key: 'getQuadrant',
		value: function getQuadrant() {
			return this.quadrant;
		}
	}, {
		key: 'getNode',
		value: function getNode() {
			return this.node;
		}
	}, {
		key: 'toString',
		value: function toString() {
			var angle = Math.atan2(this.dy, this.dx);
			var className = this.getClass().getName();
			var lastDotPos = className.lastIndexOf('.');
			var name = className.substring(lastDotPos + 1);
			return "  " + (name + (": " + (this.p0 + (" - " + (this.p1 + (" " + (this.quadrant + (":" + (angle + ("   " + this.label))))))))));
		}
	}, {
		key: 'computeLabel',
		value: function computeLabel(boundaryNodeRule) {}
	}, {
		key: 'init',
		value: function init(p0, p1) {
			this.p0 = p0;
			this.p1 = p1;
			this.dx = p1.x - p0.x;
			this.dy = p1.y - p0.y;
			this.quadrant = _comVividsolutionsJtsGeomgraphQuadrant2['default'].quadrant(this.dx, this.dy);
			_comVividsolutionsJtsUtilAssert2['default'].isTrue(!(this.dx === 0 && this.dy === 0), "EdgeEnd with identical endpoints found");
		}
	}, {
		key: 'interfaces_',
		get: function get() {
			return [_javaLangComparable2['default']];
		}
	}]);

	return EdgeEnd;
})();

exports['default'] = EdgeEnd;
module.exports = exports['default'];

},{"com/vividsolutions/jts/algorithm/CGAlgorithms":2,"com/vividsolutions/jts/geomgraph/Quadrant":66,"com/vividsolutions/jts/util/Assert":97,"java/lang/Comparable":105}],55:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _comVividsolutionsJtsGeomLocation = require('com/vividsolutions/jts/geom/Location');

var _comVividsolutionsJtsGeomLocation2 = _interopRequireDefault(_comVividsolutionsJtsGeomLocation);

var _comVividsolutionsJtsGeomgraphPosition = require('com/vividsolutions/jts/geomgraph/Position');

var _comVividsolutionsJtsGeomgraphPosition2 = _interopRequireDefault(_comVividsolutionsJtsGeomgraphPosition);

var _comVividsolutionsJtsGeomTopologyException = require('com/vividsolutions/jts/geom/TopologyException');

var _comVividsolutionsJtsGeomTopologyException2 = _interopRequireDefault(_comVividsolutionsJtsGeomTopologyException);

var _comVividsolutionsJtsAlgorithmLocateSimplePointInAreaLocator = require('com/vividsolutions/jts/algorithm/locate/SimplePointInAreaLocator');

var _comVividsolutionsJtsAlgorithmLocateSimplePointInAreaLocator2 = _interopRequireDefault(_comVividsolutionsJtsAlgorithmLocateSimplePointInAreaLocator);

var _javaUtilArrayList = require('java/util/ArrayList');

var _javaUtilArrayList2 = _interopRequireDefault(_javaUtilArrayList);

var _comVividsolutionsJtsUtilAssert = require('com/vividsolutions/jts/util/Assert');

var _comVividsolutionsJtsUtilAssert2 = _interopRequireDefault(_comVividsolutionsJtsUtilAssert);

var _javaUtilTreeMap = require('java/util/TreeMap');

var _javaUtilTreeMap2 = _interopRequireDefault(_javaUtilTreeMap);

var EdgeEndStar = (function () {
	function EdgeEndStar() {
		_classCallCheck(this, EdgeEndStar);

		this.init_.apply(this, arguments);
	}

	_createClass(EdgeEndStar, [{
		key: 'init_',
		value: function init_() {
			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			this.edgeMap = new _javaUtilTreeMap2['default']();
			this.edgeList = null;
			this.ptInAreaLocation = [_comVividsolutionsJtsGeomLocation2['default'].NONE, _comVividsolutionsJtsGeomLocation2['default'].NONE];
			switch (args.length) {
				case 0:
					return (function () {
						for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
							args[_key2] = arguments[_key2];
						}
					}).apply(undefined, args);
			}
		}
	}, {
		key: 'getNextCW',
		value: function getNextCW(ee) {
			this.getEdges();
			var i = this.edgeList.indexOf(ee);
			var iNextCW = i - 1;
			if (i === 0) iNextCW = this.edgeList.size() - 1;
			return this.edgeList.get(iNextCW);
		}
	}, {
		key: 'propagateSideLabels',
		value: function propagateSideLabels(geomIndex) {
			var startLoc = _comVividsolutionsJtsGeomLocation2['default'].NONE;
			for (var it = this.iterator(); it.hasNext();) {
				var e = it.next();
				var label = e.getLabel();
				if (label.isArea(geomIndex) && label.getLocation(geomIndex, _comVividsolutionsJtsGeomgraphPosition2['default'].LEFT) !== _comVividsolutionsJtsGeomLocation2['default'].NONE) startLoc = label.getLocation(geomIndex, _comVividsolutionsJtsGeomgraphPosition2['default'].LEFT);
			}
			if (startLoc === _comVividsolutionsJtsGeomLocation2['default'].NONE) return null;
			var currLoc = startLoc;
			for (var it = this.iterator(); it.hasNext();) {
				var e = it.next();
				var label = e.getLabel();
				if (label.getLocation(geomIndex, _comVividsolutionsJtsGeomgraphPosition2['default'].ON) === _comVividsolutionsJtsGeomLocation2['default'].NONE) label.setLocation(geomIndex, _comVividsolutionsJtsGeomgraphPosition2['default'].ON, currLoc);
				if (label.isArea(geomIndex)) {
					var leftLoc = label.getLocation(geomIndex, _comVividsolutionsJtsGeomgraphPosition2['default'].LEFT);
					var rightLoc = label.getLocation(geomIndex, _comVividsolutionsJtsGeomgraphPosition2['default'].RIGHT);
					if (rightLoc !== _comVividsolutionsJtsGeomLocation2['default'].NONE) {
						if (rightLoc !== currLoc) throw new _comVividsolutionsJtsGeomTopologyException2['default']("side location conflict", e.getCoordinate());
						if (leftLoc === _comVividsolutionsJtsGeomLocation2['default'].NONE) {
							_comVividsolutionsJtsUtilAssert2['default'].shouldNeverReachHere("found single null side (at " + (e.getCoordinate() + ")"));
						}
						currLoc = leftLoc;
					} else {
						_comVividsolutionsJtsUtilAssert2['default'].isTrue(label.getLocation(geomIndex, _comVividsolutionsJtsGeomgraphPosition2['default'].LEFT) === _comVividsolutionsJtsGeomLocation2['default'].NONE, "found single null side");
						label.setLocation(geomIndex, _comVividsolutionsJtsGeomgraphPosition2['default'].RIGHT, currLoc);
						label.setLocation(geomIndex, _comVividsolutionsJtsGeomgraphPosition2['default'].LEFT, currLoc);
					}
				}
			}
		}
	}, {
		key: 'getCoordinate',
		value: function getCoordinate() {
			var it = this.iterator();
			if (!it.hasNext()) return null;
			var e = it.next();
			return e.getCoordinate();
		}
	}, {
		key: 'print',
		value: function print(out) {
			System.out.println("EdgeEndStar:   " + this.getCoordinate());
			for (var it = this.iterator(); it.hasNext();) {
				var e = it.next();
				e.print(out);
			}
		}
	}, {
		key: 'isAreaLabelsConsistent',
		value: function isAreaLabelsConsistent(geomGraph) {
			this.computeEdgeEndLabels(geomGraph.getBoundaryNodeRule());
			return this.checkAreaLabelsConsistent(0);
		}
	}, {
		key: 'checkAreaLabelsConsistent',
		value: function checkAreaLabelsConsistent(geomIndex) {
			var edges = this.getEdges();
			if (edges.size() <= 0) return true;
			var lastEdgeIndex = edges.size() - 1;
			var startLabel = edges.get(lastEdgeIndex).getLabel();
			var startLoc = startLabel.getLocation(geomIndex, _comVividsolutionsJtsGeomgraphPosition2['default'].LEFT);
			_comVividsolutionsJtsUtilAssert2['default'].isTrue(startLoc !== _comVividsolutionsJtsGeomLocation2['default'].NONE, "Found unlabelled area edge");
			var currLoc = startLoc;
			for (var it = this.iterator(); it.hasNext();) {
				var e = it.next();
				var label = e.getLabel();
				_comVividsolutionsJtsUtilAssert2['default'].isTrue(label.isArea(geomIndex), "Found non-area edge");
				var leftLoc = label.getLocation(geomIndex, _comVividsolutionsJtsGeomgraphPosition2['default'].LEFT);
				var rightLoc = label.getLocation(geomIndex, _comVividsolutionsJtsGeomgraphPosition2['default'].RIGHT);
				if (leftLoc === rightLoc) {
					return false;
				}
				if (rightLoc !== currLoc) {
					return false;
				}
				currLoc = leftLoc;
			}
			return true;
		}
	}, {
		key: 'findIndex',
		value: function findIndex(eSearch) {
			this.iterator();
			for (var i = 0; i < this.edgeList.size(); i++) {
				var e = this.edgeList.get(i);
				if (e === eSearch) return i;
			}
			return -1;
		}
	}, {
		key: 'iterator',
		value: function iterator() {
			return this.getEdges().iterator();
		}
	}, {
		key: 'getEdges',
		value: function getEdges() {
			if (this.edgeList === null) {
				this.edgeList = new _javaUtilArrayList2['default'](this.edgeMap.values());
			}
			return this.edgeList;
		}
	}, {
		key: 'getLocation',
		value: function getLocation(geomIndex, p, geom) {
			if (this.ptInAreaLocation[geomIndex] === _comVividsolutionsJtsGeomLocation2['default'].NONE) {
				this.ptInAreaLocation[geomIndex] = _comVividsolutionsJtsAlgorithmLocateSimplePointInAreaLocator2['default'].locate(p, geom[geomIndex].getGeometry());
			}
			return this.ptInAreaLocation[geomIndex];
		}
	}, {
		key: 'toString',
		value: function toString() {
			var buf = new StringBuffer();
			buf.append("EdgeEndStar:   " + this.getCoordinate());
			buf.append("\n");
			for (var it = this.iterator(); it.hasNext();) {
				var e = it.next();
				buf.append(e);
				buf.append("\n");
			}
			return buf.toString();
		}
	}, {
		key: 'computeEdgeEndLabels',
		value: function computeEdgeEndLabels(boundaryNodeRule) {
			for (var it = this.iterator(); it.hasNext();) {
				var ee = it.next();
				ee.computeLabel(boundaryNodeRule);
			}
		}
	}, {
		key: 'computeLabelling',
		value: function computeLabelling(geomGraph) {
			this.computeEdgeEndLabels(geomGraph[0].getBoundaryNodeRule());
			this.propagateSideLabels(0);
			this.propagateSideLabels(1);
			var hasDimensionalCollapseEdge = [false, false];
			for (var it = this.iterator(); it.hasNext();) {
				var e = it.next();
				var label = e.getLabel();
				for (var geomi = 0; geomi < 2; geomi++) {
					if (label.isLine(geomi) && label.getLocation(geomi) === _comVividsolutionsJtsGeomLocation2['default'].BOUNDARY) hasDimensionalCollapseEdge[geomi] = true;
				}
			}
			for (var it = this.iterator(); it.hasNext();) {
				var e = it.next();
				var label = e.getLabel();
				for (var geomi = 0; geomi < 2; geomi++) {
					if (label.isAnyNull(geomi)) {
						var loc = _comVividsolutionsJtsGeomLocation2['default'].NONE;
						if (hasDimensionalCollapseEdge[geomi]) {
							loc = _comVividsolutionsJtsGeomLocation2['default'].EXTERIOR;
						} else {
							var p = e.getCoordinate();
							loc = this.getLocation(geomi, p, geomGraph);
						}
						label.setAllLocationsIfNull(geomi, loc);
					}
				}
			}
		}
	}, {
		key: 'getDegree',
		value: function getDegree() {
			return this.edgeMap.size();
		}
	}, {
		key: 'insertEdgeEnd',
		value: function insertEdgeEnd(e, obj) {
			this.edgeMap.put(e, obj);
			this.edgeList = null;
		}
	}, {
		key: 'interfaces_',
		get: function get() {
			return [];
		}
	}]);

	return EdgeEndStar;
})();

exports['default'] = EdgeEndStar;
module.exports = exports['default'];

},{"com/vividsolutions/jts/algorithm/locate/SimplePointInAreaLocator":14,"com/vividsolutions/jts/geom/Location":36,"com/vividsolutions/jts/geom/TopologyException":45,"com/vividsolutions/jts/geomgraph/Position":65,"com/vividsolutions/jts/util/Assert":97,"java/util/ArrayList":111,"java/util/TreeMap":124}],56:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _comVividsolutionsJtsGeomCoordinate = require('com/vividsolutions/jts/geom/Coordinate');

var _comVividsolutionsJtsGeomCoordinate2 = _interopRequireDefault(_comVividsolutionsJtsGeomCoordinate);

var _javaLangComparable = require('java/lang/Comparable');

var _javaLangComparable2 = _interopRequireDefault(_javaLangComparable);

var EdgeIntersection = (function () {
	function EdgeIntersection() {
		_classCallCheck(this, EdgeIntersection);

		this.init_.apply(this, arguments);
	}

	_createClass(EdgeIntersection, [{
		key: 'init_',
		value: function init_() {
			var _this = this;

			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			this.coord = null;
			this.segmentIndex = null;
			this.dist = null;
			switch (args.length) {
				case 3:
					return (function () {
						for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
							args[_key2] = arguments[_key2];
						}

						var coord = args[0];
						var segmentIndex = args[1];
						var dist = args[2];

						_this.coord = new _comVividsolutionsJtsGeomCoordinate2['default'](coord);
						_this.segmentIndex = segmentIndex;
						_this.dist = dist;
					}).apply(undefined, args);
			}
		}
	}, {
		key: 'getSegmentIndex',
		value: function getSegmentIndex() {
			return this.segmentIndex;
		}
	}, {
		key: 'getCoordinate',
		value: function getCoordinate() {
			return this.coord;
		}
	}, {
		key: 'print',
		value: function print(out) {
			out.print(this.coord);
			out.print(" seg # = " + this.segmentIndex);
			out.println(" dist = " + this.dist);
		}
	}, {
		key: 'compareTo',
		value: function compareTo(obj) {
			var other = obj;
			return this.compare(other.segmentIndex, other.dist);
		}
	}, {
		key: 'isEndPoint',
		value: function isEndPoint(maxSegmentIndex) {
			if (this.segmentIndex === 0 && this.dist === 0.0) return true;
			if (this.segmentIndex === maxSegmentIndex) return true;
			return false;
		}
	}, {
		key: 'toString',
		value: function toString() {
			return this.coord + (" seg # = " + (this.segmentIndex + (" dist = " + this.dist)));
		}
	}, {
		key: 'getDistance',
		value: function getDistance() {
			return this.dist;
		}
	}, {
		key: 'compare',
		value: function compare(segmentIndex, dist) {
			if (this.segmentIndex < segmentIndex) return -1;
			if (this.segmentIndex > segmentIndex) return 1;
			if (this.dist < dist) return -1;
			if (this.dist > dist) return 1;
			return 0;
		}
	}, {
		key: 'interfaces_',
		get: function get() {
			return [_javaLangComparable2['default']];
		}
	}]);

	return EdgeIntersection;
})();

exports['default'] = EdgeIntersection;
module.exports = exports['default'];

},{"com/vividsolutions/jts/geom/Coordinate":15,"java/lang/Comparable":105}],57:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _comVividsolutionsJtsGeomgraphEdgeIntersection = require('com/vividsolutions/jts/geomgraph/EdgeIntersection');

var _comVividsolutionsJtsGeomgraphEdgeIntersection2 = _interopRequireDefault(_comVividsolutionsJtsGeomgraphEdgeIntersection);

var _comVividsolutionsJtsGeomCoordinate = require('com/vividsolutions/jts/geom/Coordinate');

var _comVividsolutionsJtsGeomCoordinate2 = _interopRequireDefault(_comVividsolutionsJtsGeomCoordinate);

var _comVividsolutionsJtsGeomgraphLabel = require('com/vividsolutions/jts/geomgraph/Label');

var _comVividsolutionsJtsGeomgraphLabel2 = _interopRequireDefault(_comVividsolutionsJtsGeomgraphLabel);

var _comVividsolutionsJtsGeomgraphEdge = require('com/vividsolutions/jts/geomgraph/Edge');

var _comVividsolutionsJtsGeomgraphEdge2 = _interopRequireDefault(_comVividsolutionsJtsGeomgraphEdge);

var _javaUtilTreeMap = require('java/util/TreeMap');

var _javaUtilTreeMap2 = _interopRequireDefault(_javaUtilTreeMap);

var EdgeIntersectionList = (function () {
	function EdgeIntersectionList() {
		_classCallCheck(this, EdgeIntersectionList);

		this.init_.apply(this, arguments);
	}

	_createClass(EdgeIntersectionList, [{
		key: 'init_',
		value: function init_() {
			var _this = this;

			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			this.nodeMap = new _javaUtilTreeMap2['default']();
			this.edge = null;
			switch (args.length) {
				case 1:
					return (function () {
						for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
							args[_key2] = arguments[_key2];
						}

						var edge = args[0];

						_this.edge = edge;
					}).apply(undefined, args);
			}
		}
	}, {
		key: 'print',
		value: function print(out) {
			out.println("Intersections:");
			for (var it = this.iterator(); it.hasNext();) {
				var ei = it.next();
				ei.print(out);
			}
		}
	}, {
		key: 'iterator',
		value: function iterator() {
			return this.nodeMap.values().iterator();
		}
	}, {
		key: 'addSplitEdges',
		value: function addSplitEdges(edgeList) {
			this.addEndpoints();
			var it = this.iterator();
			var eiPrev = it.next();
			while (it.hasNext()) {
				var ei = it.next();
				var newEdge = this.createSplitEdge(eiPrev, ei);
				edgeList.add(newEdge);
				eiPrev = ei;
			}
		}
	}, {
		key: 'addEndpoints',
		value: function addEndpoints() {
			var maxSegIndex = this.edge.pts.length - 1;
			this.add(this.edge.pts[0], 0, 0.0);
			this.add(this.edge.pts[maxSegIndex], maxSegIndex, 0.0);
		}
	}, {
		key: 'createSplitEdge',
		value: function createSplitEdge(ei0, ei1) {
			var npts = ei1.segmentIndex - ei0.segmentIndex + 2;
			var lastSegStartPt = this.edge.pts[ei1.segmentIndex];
			var useIntPt1 = ei1.dist > 0.0 || !ei1.coord.equals2D(lastSegStartPt);
			if (!useIntPt1) {
				npts--;
			}
			var pts = [];
			var ipt = 0;
			pts[ipt++] = new _comVividsolutionsJtsGeomCoordinate2['default'](ei0.coord);
			for (var i = ei0.segmentIndex + 1; i <= ei1.segmentIndex; i++) {
				pts[ipt++] = this.edge.pts[i];
			}
			if (useIntPt1) pts[ipt] = ei1.coord;
			return new _comVividsolutionsJtsGeomgraphEdge2['default'](pts, new _comVividsolutionsJtsGeomgraphLabel2['default'](this.edge.label));
		}
	}, {
		key: 'add',
		value: function add(intPt, segmentIndex, dist) {
			var eiNew = new _comVividsolutionsJtsGeomgraphEdgeIntersection2['default'](intPt, segmentIndex, dist);
			var ei = this.nodeMap.get(eiNew);
			if (ei !== null) {
				return ei;
			}
			this.nodeMap.put(eiNew, eiNew);
			return eiNew;
		}
	}, {
		key: 'isIntersection',
		value: function isIntersection(pt) {
			for (var it = this.iterator(); it.hasNext();) {
				var ei = it.next();
				if (ei.coord.equals(pt)) return true;
			}
			return false;
		}
	}, {
		key: 'interfaces_',
		get: function get() {
			return [];
		}
	}]);

	return EdgeIntersectionList;
})();

exports['default'] = EdgeIntersectionList;
module.exports = exports['default'];

},{"com/vividsolutions/jts/geom/Coordinate":15,"com/vividsolutions/jts/geomgraph/Edge":53,"com/vividsolutions/jts/geomgraph/EdgeIntersection":56,"com/vividsolutions/jts/geomgraph/Label":60,"java/util/TreeMap":124}],58:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _comVividsolutionsJtsAlgorithmPointLocator = require('com/vividsolutions/jts/algorithm/PointLocator');

var _comVividsolutionsJtsAlgorithmPointLocator2 = _interopRequireDefault(_comVividsolutionsJtsAlgorithmPointLocator);

var _comVividsolutionsJtsGeomLocation = require('com/vividsolutions/jts/geom/Location');

var _comVividsolutionsJtsGeomLocation2 = _interopRequireDefault(_comVividsolutionsJtsGeomLocation);

var _comVividsolutionsJtsGeomLineString = require('com/vividsolutions/jts/geom/LineString');

var _comVividsolutionsJtsGeomLineString2 = _interopRequireDefault(_comVividsolutionsJtsGeomLineString);

var _javaUtilHashMap = require('java/util/HashMap');

var _javaUtilHashMap2 = _interopRequireDefault(_javaUtilHashMap);

var _comVividsolutionsJtsAlgorithmCGAlgorithms = require('com/vividsolutions/jts/algorithm/CGAlgorithms');

var _comVividsolutionsJtsAlgorithmCGAlgorithms2 = _interopRequireDefault(_comVividsolutionsJtsAlgorithmCGAlgorithms);

var _comVividsolutionsJtsGeomgraphPosition = require('com/vividsolutions/jts/geomgraph/Position');

var _comVividsolutionsJtsGeomgraphPosition2 = _interopRequireDefault(_comVividsolutionsJtsGeomgraphPosition);

var _comVividsolutionsJtsGeomCoordinate = require('com/vividsolutions/jts/geom/Coordinate');

var _comVividsolutionsJtsGeomCoordinate2 = _interopRequireDefault(_comVividsolutionsJtsGeomCoordinate);

var _comVividsolutionsJtsGeomPoint = require('com/vividsolutions/jts/geom/Point');

var _comVividsolutionsJtsGeomPoint2 = _interopRequireDefault(_comVividsolutionsJtsGeomPoint);

var _comVividsolutionsJtsGeomPolygon = require('com/vividsolutions/jts/geom/Polygon');

var _comVividsolutionsJtsGeomPolygon2 = _interopRequireDefault(_comVividsolutionsJtsGeomPolygon);

var _comVividsolutionsJtsGeomMultiPoint = require('com/vividsolutions/jts/geom/MultiPoint');

var _comVividsolutionsJtsGeomMultiPoint2 = _interopRequireDefault(_comVividsolutionsJtsGeomMultiPoint);

var _comVividsolutionsJtsGeomgraphIndexSimpleMCSweepLineIntersector = require('com/vividsolutions/jts/geomgraph/index/SimpleMCSweepLineIntersector');

var _comVividsolutionsJtsGeomgraphIndexSimpleMCSweepLineIntersector2 = _interopRequireDefault(_comVividsolutionsJtsGeomgraphIndexSimpleMCSweepLineIntersector);

var _comVividsolutionsJtsGeomLinearRing = require('com/vividsolutions/jts/geom/LinearRing');

var _comVividsolutionsJtsGeomLinearRing2 = _interopRequireDefault(_comVividsolutionsJtsGeomLinearRing);

var _comVividsolutionsJtsAlgorithmBoundaryNodeRule = require('com/vividsolutions/jts/algorithm/BoundaryNodeRule');

var _comVividsolutionsJtsAlgorithmBoundaryNodeRule2 = _interopRequireDefault(_comVividsolutionsJtsAlgorithmBoundaryNodeRule);

var _comVividsolutionsJtsGeomgraphIndexSegmentIntersector = require('com/vividsolutions/jts/geomgraph/index/SegmentIntersector');

var _comVividsolutionsJtsGeomgraphIndexSegmentIntersector2 = _interopRequireDefault(_comVividsolutionsJtsGeomgraphIndexSegmentIntersector);

var _comVividsolutionsJtsGeomMultiPolygon = require('com/vividsolutions/jts/geom/MultiPolygon');

var _comVividsolutionsJtsGeomMultiPolygon2 = _interopRequireDefault(_comVividsolutionsJtsGeomMultiPolygon);

var _comVividsolutionsJtsGeomgraphLabel = require('com/vividsolutions/jts/geomgraph/Label');

var _comVividsolutionsJtsGeomgraphLabel2 = _interopRequireDefault(_comVividsolutionsJtsGeomgraphLabel);

var _comVividsolutionsJtsGeomGeometryCollection = require('com/vividsolutions/jts/geom/GeometryCollection');

var _comVividsolutionsJtsGeomGeometryCollection2 = _interopRequireDefault(_comVividsolutionsJtsGeomGeometryCollection);

var _comVividsolutionsJtsGeomCoordinateArrays = require('com/vividsolutions/jts/geom/CoordinateArrays');

var _comVividsolutionsJtsGeomCoordinateArrays2 = _interopRequireDefault(_comVividsolutionsJtsGeomCoordinateArrays);

var _comVividsolutionsJtsGeomPolygonal = require('com/vividsolutions/jts/geom/Polygonal');

var _comVividsolutionsJtsGeomPolygonal2 = _interopRequireDefault(_comVividsolutionsJtsGeomPolygonal);

var _comVividsolutionsJtsAlgorithmLocateIndexedPointInAreaLocator = require('com/vividsolutions/jts/algorithm/locate/IndexedPointInAreaLocator');

var _comVividsolutionsJtsAlgorithmLocateIndexedPointInAreaLocator2 = _interopRequireDefault(_comVividsolutionsJtsAlgorithmLocateIndexedPointInAreaLocator);

var _comVividsolutionsJtsUtilAssert = require('com/vividsolutions/jts/util/Assert');

var _comVividsolutionsJtsUtilAssert2 = _interopRequireDefault(_comVividsolutionsJtsUtilAssert);

var _comVividsolutionsJtsGeomgraphEdge = require('com/vividsolutions/jts/geomgraph/Edge');

var _comVividsolutionsJtsGeomgraphEdge2 = _interopRequireDefault(_comVividsolutionsJtsGeomgraphEdge);

var _comVividsolutionsJtsGeomMultiLineString = require('com/vividsolutions/jts/geom/MultiLineString');

var _comVividsolutionsJtsGeomMultiLineString2 = _interopRequireDefault(_comVividsolutionsJtsGeomMultiLineString);

var _comVividsolutionsJtsGeomgraphPlanarGraph = require('com/vividsolutions/jts/geomgraph/PlanarGraph');

var _comVividsolutionsJtsGeomgraphPlanarGraph2 = _interopRequireDefault(_comVividsolutionsJtsGeomgraphPlanarGraph);

var GeometryGraph = (function (_PlanarGraph) {
	_inherits(GeometryGraph, _PlanarGraph);

	function GeometryGraph() {
		_classCallCheck(this, GeometryGraph);

		_get(Object.getPrototypeOf(GeometryGraph.prototype), 'constructor', this).call(this);
		this.init_.apply(this, arguments);
	}

	_createClass(GeometryGraph, [{
		key: 'init_',
		value: function init_() {
			var _this = this;

			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			_get(Object.getPrototypeOf(GeometryGraph.prototype), 'init_', this).call(this);
			this.parentGeom = null;
			this.lineEdgeMap = new _javaUtilHashMap2['default']();
			this.boundaryNodeRule = null;
			this.useBoundaryDeterminationRule = true;
			this.argIndex = null;
			this.boundaryNodes = null;
			this.hasTooFewPoints = false;
			this.invalidPoint = null;
			this.areaPtLocator = null;
			this.ptLocator = new _comVividsolutionsJtsAlgorithmPointLocator2['default']();
			switch (args.length) {
				case 2:
					return (function () {
						for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
							args[_key2] = arguments[_key2];
						}

						var argIndex = args[0];
						var parentGeom = args[1];

						_this.init_(argIndex, parentGeom, _comVividsolutionsJtsAlgorithmBoundaryNodeRule2['default'].OGC_SFS_BOUNDARY_RULE);
					}).apply(undefined, args);
				case 3:
					return (function () {
						for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
							args[_key3] = arguments[_key3];
						}

						var argIndex = args[0];
						var parentGeom = args[1];
						var boundaryNodeRule = args[2];

						_this.argIndex = argIndex;
						_this.parentGeom = parentGeom;
						_this.boundaryNodeRule = boundaryNodeRule;
						if (parentGeom !== null) {
							_this.add(parentGeom);
						}
					}).apply(undefined, args);
			}
		}
	}, {
		key: 'insertBoundaryPoint',
		value: function insertBoundaryPoint(argIndex, coord) {
			var n = this.nodes.addNode(coord);
			var lbl = n.getLabel();
			var boundaryCount = 1;
			var loc = _comVividsolutionsJtsGeomLocation2['default'].NONE;
			loc = lbl.getLocation(argIndex, _comVividsolutionsJtsGeomgraphPosition2['default'].ON);
			if (loc === _comVividsolutionsJtsGeomLocation2['default'].BOUNDARY) boundaryCount++;
			var newLoc = GeometryGraph.determineBoundary(this.boundaryNodeRule, boundaryCount);
			lbl.setLocation(argIndex, newLoc);
		}
	}, {
		key: 'computeSelfNodes',
		value: function computeSelfNodes(li, computeRingSelfNodes) {
			var si = new _comVividsolutionsJtsGeomgraphIndexSegmentIntersector2['default'](li, true, false);
			var esi = this.createEdgeSetIntersector();
			if (!computeRingSelfNodes && (this.parentGeom instanceof _comVividsolutionsJtsGeomLinearRing2['default'] || (this.parentGeom instanceof _comVividsolutionsJtsGeomPolygon2['default'] || this.parentGeom instanceof _comVividsolutionsJtsGeomMultiPolygon2['default']))) {
				esi.computeIntersections(this.edges, si, false);
			} else {
				esi.computeIntersections(this.edges, si, true);
			}
			this.addSelfIntersectionNodes(this.argIndex);
			return si;
		}
	}, {
		key: 'computeSplitEdges',
		value: function computeSplitEdges(edgelist) {
			for (var i = this.edges.iterator(); i.hasNext();) {
				var e = i.next();
				e.eiList.addSplitEdges(edgelist);
			}
		}
	}, {
		key: 'computeEdgeIntersections',
		value: function computeEdgeIntersections(g, li, includeProper) {
			var si = new _comVividsolutionsJtsGeomgraphIndexSegmentIntersector2['default'](li, includeProper, true);
			si.setBoundaryNodes(this.getBoundaryNodes(), g.getBoundaryNodes());
			var esi = this.createEdgeSetIntersector();
			esi.computeIntersections(this.edges, g.edges, si);
			return si;
		}
	}, {
		key: 'getGeometry',
		value: function getGeometry() {
			return this.parentGeom;
		}
	}, {
		key: 'getBoundaryNodeRule',
		value: function getBoundaryNodeRule() {
			return this.boundaryNodeRule;
		}
	}, {
		key: 'hasTooFewPoints',
		value: function hasTooFewPoints() {
			return this.hasTooFewPoints;
		}
	}, {
		key: 'addPoint',
		value: function addPoint() {
			var _this2 = this;

			for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
				args[_key4] = arguments[_key4];
			}

			switch (args.length) {
				case 1:
					if (args[0] instanceof _comVividsolutionsJtsGeomPoint2['default']) {
						return (function () {
							for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
								args[_key5] = arguments[_key5];
							}

							var p = args[0];

							var coord = p.getCoordinate();
							_this2.insertPoint(_this2.argIndex, coord, _comVividsolutionsJtsGeomLocation2['default'].INTERIOR);
						}).apply(undefined, args);
					} else if (args[0] instanceof _comVividsolutionsJtsGeomCoordinate2['default']) {
						return (function () {
							for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
								args[_key6] = arguments[_key6];
							}

							var pt = args[0];

							_this2.insertPoint(_this2.argIndex, pt, _comVividsolutionsJtsGeomLocation2['default'].INTERIOR);
						}).apply(undefined, args);
					}
			}
		}
	}, {
		key: 'addPolygon',
		value: function addPolygon(p) {
			this.addPolygonRing(p.getExteriorRing(), _comVividsolutionsJtsGeomLocation2['default'].EXTERIOR, _comVividsolutionsJtsGeomLocation2['default'].INTERIOR);
			for (var i = 0; i < p.getNumInteriorRing(); i++) {
				var hole = p.getInteriorRingN(i);
				this.addPolygonRing(hole, _comVividsolutionsJtsGeomLocation2['default'].INTERIOR, _comVividsolutionsJtsGeomLocation2['default'].EXTERIOR);
			}
		}
	}, {
		key: 'addEdge',
		value: function addEdge(e) {
			this.insertEdge(e);
			var coord = e.getCoordinates();
			this.insertPoint(this.argIndex, coord[0], _comVividsolutionsJtsGeomLocation2['default'].BOUNDARY);
			this.insertPoint(this.argIndex, coord[coord.length - 1], _comVividsolutionsJtsGeomLocation2['default'].BOUNDARY);
		}
	}, {
		key: 'addLineString',
		value: function addLineString(line) {
			var coord = _comVividsolutionsJtsGeomCoordinateArrays2['default'].removeRepeatedPoints(line.getCoordinates());
			if (coord.length < 2) {
				this.hasTooFewPoints = true;
				this.invalidPoint = coord[0];
				return null;
			}
			var e = new _comVividsolutionsJtsGeomgraphEdge2['default'](coord, new _comVividsolutionsJtsGeomgraphLabel2['default'](this.argIndex, _comVividsolutionsJtsGeomLocation2['default'].INTERIOR));
			this.lineEdgeMap.put(line, e);
			this.insertEdge(e);
			_comVividsolutionsJtsUtilAssert2['default'].isTrue(coord.length >= 2, "found LineString with single point");
			this.insertBoundaryPoint(this.argIndex, coord[0]);
			this.insertBoundaryPoint(this.argIndex, coord[coord.length - 1]);
		}
	}, {
		key: 'getInvalidPoint',
		value: function getInvalidPoint() {
			return this.invalidPoint;
		}
	}, {
		key: 'getBoundaryPoints',
		value: function getBoundaryPoints() {
			var coll = this.getBoundaryNodes();
			var pts = [];
			var i = 0;
			for (var it = coll.iterator(); it.hasNext();) {
				var node = it.next();
				pts[i++] = node.getCoordinate().clone();
			}
			return pts;
		}
	}, {
		key: 'getBoundaryNodes',
		value: function getBoundaryNodes() {
			if (this.boundaryNodes === null) this.boundaryNodes = this.nodes.getBoundaryNodes(this.argIndex);
			return this.boundaryNodes;
		}
	}, {
		key: 'addSelfIntersectionNode',
		value: function addSelfIntersectionNode(argIndex, coord, loc) {
			if (this.isBoundaryNode(argIndex, coord)) return null;
			if (loc === _comVividsolutionsJtsGeomLocation2['default'].BOUNDARY && this.useBoundaryDeterminationRule) this.insertBoundaryPoint(argIndex, coord);else this.insertPoint(argIndex, coord, loc);
		}
	}, {
		key: 'addPolygonRing',
		value: function addPolygonRing(lr, cwLeft, cwRight) {
			if (lr.isEmpty()) return null;
			var coord = _comVividsolutionsJtsGeomCoordinateArrays2['default'].removeRepeatedPoints(lr.getCoordinates());
			if (coord.length < 4) {
				this.hasTooFewPoints = true;
				this.invalidPoint = coord[0];
				return null;
			}
			var left = cwLeft;
			var right = cwRight;
			if (_comVividsolutionsJtsAlgorithmCGAlgorithms2['default'].isCCW(coord)) {
				left = cwRight;
				right = cwLeft;
			}
			var e = new _comVividsolutionsJtsGeomgraphEdge2['default'](coord, new _comVividsolutionsJtsGeomgraphLabel2['default'](this.argIndex, _comVividsolutionsJtsGeomLocation2['default'].BOUNDARY, left, right));
			this.lineEdgeMap.put(lr, e);
			this.insertEdge(e);
			this.insertPoint(this.argIndex, coord[0], _comVividsolutionsJtsGeomLocation2['default'].BOUNDARY);
		}
	}, {
		key: 'insertPoint',
		value: function insertPoint(argIndex, coord, onLocation) {
			var n = this.nodes.addNode(coord);
			var lbl = n.getLabel();
			if (lbl === null) {
				n.label = new _comVividsolutionsJtsGeomgraphLabel2['default'](argIndex, onLocation);
			} else lbl.setLocation(argIndex, onLocation);
		}
	}, {
		key: 'createEdgeSetIntersector',
		value: function createEdgeSetIntersector() {
			return new _comVividsolutionsJtsGeomgraphIndexSimpleMCSweepLineIntersector2['default']();
		}
	}, {
		key: 'addSelfIntersectionNodes',
		value: function addSelfIntersectionNodes(argIndex) {
			for (var i = this.edges.iterator(); i.hasNext();) {
				var e = i.next();
				var eLoc = e.getLabel().getLocation(argIndex);
				for (var eiIt = e.eiList.iterator(); eiIt.hasNext();) {
					var ei = eiIt.next();
					this.addSelfIntersectionNode(argIndex, ei.coord, eLoc);
				}
			}
		}
	}, {
		key: 'add',
		value: function add(g) {
			if (g.isEmpty()) return null;
			if (g instanceof _comVividsolutionsJtsGeomMultiPolygon2['default']) this.useBoundaryDeterminationRule = false;
			if (g instanceof _comVividsolutionsJtsGeomPolygon2['default']) this.addPolygon(g);else if (g instanceof _comVividsolutionsJtsGeomLineString2['default']) this.addLineString(g);else if (g instanceof _comVividsolutionsJtsGeomPoint2['default']) this.addPoint(g);else if (g instanceof _comVividsolutionsJtsGeomMultiPoint2['default']) this.addCollection(g);else if (g instanceof _comVividsolutionsJtsGeomMultiLineString2['default']) this.addCollection(g);else if (g instanceof _comVividsolutionsJtsGeomMultiPolygon2['default']) this.addCollection(g);else if (g instanceof _comVividsolutionsJtsGeomGeometryCollection2['default']) this.addCollection(g);else throw new UnsupportedOperationException(g.getClass().getName());
		}
	}, {
		key: 'addCollection',
		value: function addCollection(gc) {
			for (var i = 0; i < gc.getNumGeometries(); i++) {
				var g = gc.getGeometryN(i);
				this.add(g);
			}
		}
	}, {
		key: 'locate',
		value: function locate(pt) {
			if (this.parentGeom instanceof _comVividsolutionsJtsGeomPolygonal2['default'] && this.parentGeom.getNumGeometries() > 50) {
				if (this.areaPtLocator === null) {
					this.areaPtLocator = new _comVividsolutionsJtsAlgorithmLocateIndexedPointInAreaLocator2['default'](this.parentGeom);
				}
				return this.areaPtLocator.locate(pt);
			}
			return this.ptLocator.locate(pt, this.parentGeom);
		}
	}, {
		key: 'findEdge',
		value: function findEdge(line) {
			return this.lineEdgeMap.get(line);
		}
	}, {
		key: 'interfaces_',
		get: function get() {
			return [];
		}
	}], [{
		key: 'determineBoundary',
		value: function determineBoundary(boundaryNodeRule, boundaryCount) {
			return boundaryNodeRule.isInBoundary(boundaryCount) ? _comVividsolutionsJtsGeomLocation2['default'].BOUNDARY : _comVividsolutionsJtsGeomLocation2['default'].INTERIOR;
		}
	}]);

	return GeometryGraph;
})(_comVividsolutionsJtsGeomgraphPlanarGraph2['default']);

exports['default'] = GeometryGraph;
module.exports = exports['default'];

},{"com/vividsolutions/jts/algorithm/BoundaryNodeRule":1,"com/vividsolutions/jts/algorithm/CGAlgorithms":2,"com/vividsolutions/jts/algorithm/PointLocator":7,"com/vividsolutions/jts/algorithm/locate/IndexedPointInAreaLocator":12,"com/vividsolutions/jts/geom/Coordinate":15,"com/vividsolutions/jts/geom/CoordinateArrays":16,"com/vividsolutions/jts/geom/GeometryCollection":26,"com/vividsolutions/jts/geom/LineString":33,"com/vividsolutions/jts/geom/LinearRing":35,"com/vividsolutions/jts/geom/Location":36,"com/vividsolutions/jts/geom/MultiLineString":37,"com/vividsolutions/jts/geom/MultiPoint":38,"com/vividsolutions/jts/geom/MultiPolygon":39,"com/vividsolutions/jts/geom/Point":40,"com/vividsolutions/jts/geom/Polygon":41,"com/vividsolutions/jts/geom/Polygonal":42,"com/vividsolutions/jts/geomgraph/Edge":53,"com/vividsolutions/jts/geomgraph/Label":60,"com/vividsolutions/jts/geomgraph/PlanarGraph":64,"com/vividsolutions/jts/geomgraph/Position":65,"com/vividsolutions/jts/geomgraph/index/SegmentIntersector":72,"com/vividsolutions/jts/geomgraph/index/SimpleMCSweepLineIntersector":73,"com/vividsolutions/jts/util/Assert":97,"java/util/HashMap":116}],59:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _comVividsolutionsJtsUtilAssert = require('com/vividsolutions/jts/util/Assert');

var _comVividsolutionsJtsUtilAssert2 = _interopRequireDefault(_comVividsolutionsJtsUtilAssert);

var GraphComponent = (function () {
	function GraphComponent() {
		_classCallCheck(this, GraphComponent);

		this.init_.apply(this, arguments);
	}

	_createClass(GraphComponent, [{
		key: "init_",
		value: function init_() {
			var _this = this;

			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			this.label = null;
			this.isInResult = false;
			this.isCovered = false;
			this.isCoveredSet = false;
			this.isVisited = false;
			switch (args.length) {
				case 1:
					return (function () {
						for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
							args[_key2] = arguments[_key2];
						}

						var label = args[0];

						_this.label = label;
					}).apply(undefined, args);
				case 0:
					return (function () {
						for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
							args[_key3] = arguments[_key3];
						}
					}).apply(undefined, args);
			}
		}
	}, {
		key: "setVisited",
		value: function setVisited(isVisited) {
			this.isVisited = isVisited;
		}
	}, {
		key: "setInResult",
		value: function setInResult(isInResult) {
			this.isInResult = isInResult;
		}
	}, {
		key: "isCovered",
		value: function isCovered() {
			return this.isCovered;
		}
	}, {
		key: "isCoveredSet",
		value: function isCoveredSet() {
			return this.isCoveredSet;
		}
	}, {
		key: "setLabel",
		value: function setLabel(label) {
			this.label = label;
		}
	}, {
		key: "getLabel",
		value: function getLabel() {
			return this.label;
		}
	}, {
		key: "setCovered",
		value: function setCovered(isCovered) {
			this.isCovered = isCovered;
			this.isCoveredSet = true;
		}
	}, {
		key: "updateIM",
		value: function updateIM(im) {
			_comVividsolutionsJtsUtilAssert2["default"].isTrue(this.label.getGeometryCount() >= 2, "found partial label");
			this.computeIM(im);
		}
	}, {
		key: "isInResult",
		value: function isInResult() {
			return this.isInResult;
		}
	}, {
		key: "isVisited",
		value: function isVisited() {
			return this.isVisited;
		}
	}, {
		key: "interfaces_",
		get: function get() {
			return [];
		}
	}]);

	return GraphComponent;
})();

exports["default"] = GraphComponent;
module.exports = exports["default"];

},{"com/vividsolutions/jts/util/Assert":97}],60:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _comVividsolutionsJtsGeomLocation = require('com/vividsolutions/jts/geom/Location');

var _comVividsolutionsJtsGeomLocation2 = _interopRequireDefault(_comVividsolutionsJtsGeomLocation);

var _comVividsolutionsJtsGeomgraphPosition = require('com/vividsolutions/jts/geomgraph/Position');

var _comVividsolutionsJtsGeomgraphPosition2 = _interopRequireDefault(_comVividsolutionsJtsGeomgraphPosition);

var _comVividsolutionsJtsGeomgraphTopologyLocation = require('com/vividsolutions/jts/geomgraph/TopologyLocation');

var _comVividsolutionsJtsGeomgraphTopologyLocation2 = _interopRequireDefault(_comVividsolutionsJtsGeomgraphTopologyLocation);

var Label = (function () {
	function Label() {
		_classCallCheck(this, Label);

		this.init_.apply(this, arguments);
	}

	_createClass(Label, [{
		key: 'init_',
		value: function init_() {
			var _this = this;

			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			this.elt = [];
			switch (args.length) {
				case 2:
					return (function () {
						for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
							args[_key2] = arguments[_key2];
						}

						var geomIndex = args[0];
						var onLoc = args[1];

						_this.elt[0] = new _comVividsolutionsJtsGeomgraphTopologyLocation2['default'](_comVividsolutionsJtsGeomLocation2['default'].NONE);
						_this.elt[1] = new _comVividsolutionsJtsGeomgraphTopologyLocation2['default'](_comVividsolutionsJtsGeomLocation2['default'].NONE);
						_this.elt[geomIndex].setLocation(onLoc);
					}).apply(undefined, args);
				case 4:
					return (function () {
						for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
							args[_key3] = arguments[_key3];
						}

						var geomIndex = args[0];
						var onLoc = args[1];
						var leftLoc = args[2];
						var rightLoc = args[3];

						_this.elt[0] = new _comVividsolutionsJtsGeomgraphTopologyLocation2['default'](_comVividsolutionsJtsGeomLocation2['default'].NONE, _comVividsolutionsJtsGeomLocation2['default'].NONE, _comVividsolutionsJtsGeomLocation2['default'].NONE);
						_this.elt[1] = new _comVividsolutionsJtsGeomgraphTopologyLocation2['default'](_comVividsolutionsJtsGeomLocation2['default'].NONE, _comVividsolutionsJtsGeomLocation2['default'].NONE, _comVividsolutionsJtsGeomLocation2['default'].NONE);
						_this.elt[geomIndex].setLocations(onLoc, leftLoc, rightLoc);
					}).apply(undefined, args);
				case 1:
					if (Number.isInteger(args[0])) {
						return (function () {
							for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
								args[_key4] = arguments[_key4];
							}

							var onLoc = args[0];

							_this.elt[0] = new _comVividsolutionsJtsGeomgraphTopologyLocation2['default'](onLoc);
							_this.elt[1] = new _comVividsolutionsJtsGeomgraphTopologyLocation2['default'](onLoc);
						}).apply(undefined, args);
					} else if (args[0] instanceof Label) {
						return (function () {
							for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
								args[_key5] = arguments[_key5];
							}

							var lbl = args[0];

							_this.elt[0] = new _comVividsolutionsJtsGeomgraphTopologyLocation2['default'](lbl.elt[0]);
							_this.elt[1] = new _comVividsolutionsJtsGeomgraphTopologyLocation2['default'](lbl.elt[1]);
						}).apply(undefined, args);
					}
				case 3:
					return (function () {
						for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
							args[_key6] = arguments[_key6];
						}

						var onLoc = args[0];
						var leftLoc = args[1];
						var rightLoc = args[2];

						_this.elt[0] = new _comVividsolutionsJtsGeomgraphTopologyLocation2['default'](onLoc, leftLoc, rightLoc);
						_this.elt[1] = new _comVividsolutionsJtsGeomgraphTopologyLocation2['default'](onLoc, leftLoc, rightLoc);
					}).apply(undefined, args);
			}
		}
	}, {
		key: 'getGeometryCount',
		value: function getGeometryCount() {
			var count = 0;
			if (!this.elt[0].isNull()) count++;
			if (!this.elt[1].isNull()) count++;
			return count;
		}
	}, {
		key: 'setAllLocations',
		value: function setAllLocations(geomIndex, location) {
			this.elt[geomIndex].setAllLocations(location);
		}
	}, {
		key: 'isNull',
		value: function isNull(geomIndex) {
			return this.elt[geomIndex].isNull();
		}
	}, {
		key: 'setAllLocationsIfNull',
		value: function setAllLocationsIfNull() {
			var _this2 = this;

			for (var _len7 = arguments.length, args = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
				args[_key7] = arguments[_key7];
			}

			switch (args.length) {
				case 2:
					return (function () {
						for (var _len8 = arguments.length, args = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
							args[_key8] = arguments[_key8];
						}

						var geomIndex = args[0];
						var location = args[1];

						_this2.elt[geomIndex].setAllLocationsIfNull(location);
					}).apply(undefined, args);
				case 1:
					return (function () {
						for (var _len9 = arguments.length, args = Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
							args[_key9] = arguments[_key9];
						}

						var location = args[0];

						_this2.setAllLocationsIfNull(0, location);
						_this2.setAllLocationsIfNull(1, location);
					}).apply(undefined, args);
			}
		}
	}, {
		key: 'isLine',
		value: function isLine(geomIndex) {
			return this.elt[geomIndex].isLine();
		}
	}, {
		key: 'merge',
		value: function merge(lbl) {
			for (var i = 0; i < 2; i++) {
				if (this.elt[i] === null && lbl.elt[i] !== null) {
					this.elt[i] = new _comVividsolutionsJtsGeomgraphTopologyLocation2['default'](lbl.elt[i]);
				} else {
					this.elt[i].merge(lbl.elt[i]);
				}
			}
		}
	}, {
		key: 'flip',
		value: function flip() {
			this.elt[0].flip();
			this.elt[1].flip();
		}
	}, {
		key: 'getLocation',
		value: function getLocation() {
			var _this3 = this;

			for (var _len10 = arguments.length, args = Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
				args[_key10] = arguments[_key10];
			}

			switch (args.length) {
				case 2:
					return (function () {
						for (var _len11 = arguments.length, args = Array(_len11), _key11 = 0; _key11 < _len11; _key11++) {
							args[_key11] = arguments[_key11];
						}

						var geomIndex = args[0];
						var posIndex = args[1];

						return _this3.elt[geomIndex].get(posIndex);
					}).apply(undefined, args);
				case 1:
					return (function () {
						for (var _len12 = arguments.length, args = Array(_len12), _key12 = 0; _key12 < _len12; _key12++) {
							args[_key12] = arguments[_key12];
						}

						var geomIndex = args[0];

						return _this3.elt[geomIndex].get(_comVividsolutionsJtsGeomgraphPosition2['default'].ON);
					}).apply(undefined, args);
			}
		}
	}, {
		key: 'toString',
		value: function toString() {
			var buf = new StringBuffer();
			if (this.elt[0] !== null) {
				buf.append("A:");
				buf.append(this.elt[0].toString());
			}
			if (this.elt[1] !== null) {
				buf.append(" B:");
				buf.append(this.elt[1].toString());
			}
			return buf.toString();
		}
	}, {
		key: 'isArea',
		value: function isArea() {
			var _this4 = this;

			for (var _len13 = arguments.length, args = Array(_len13), _key13 = 0; _key13 < _len13; _key13++) {
				args[_key13] = arguments[_key13];
			}

			switch (args.length) {
				case 1:
					return (function () {
						for (var _len14 = arguments.length, args = Array(_len14), _key14 = 0; _key14 < _len14; _key14++) {
							args[_key14] = arguments[_key14];
						}

						var geomIndex = args[0];

						return _this4.elt[geomIndex].isArea();
					}).apply(undefined, args);
				case 0:
					return (function () {
						for (var _len15 = arguments.length, args = Array(_len15), _key15 = 0; _key15 < _len15; _key15++) {
							args[_key15] = arguments[_key15];
						}

						return _this4.elt[0].isArea() || _this4.elt[1].isArea();
					}).apply(undefined, args);
			}
		}
	}, {
		key: 'isAnyNull',
		value: function isAnyNull(geomIndex) {
			return this.elt[geomIndex].isAnyNull();
		}
	}, {
		key: 'setLocation',
		value: function setLocation() {
			var _this5 = this;

			for (var _len16 = arguments.length, args = Array(_len16), _key16 = 0; _key16 < _len16; _key16++) {
				args[_key16] = arguments[_key16];
			}

			switch (args.length) {
				case 2:
					return (function () {
						for (var _len17 = arguments.length, args = Array(_len17), _key17 = 0; _key17 < _len17; _key17++) {
							args[_key17] = arguments[_key17];
						}

						var geomIndex = args[0];
						var location = args[1];

						_this5.elt[geomIndex].setLocation(_comVividsolutionsJtsGeomgraphPosition2['default'].ON, location);
					}).apply(undefined, args);
				case 3:
					return (function () {
						for (var _len18 = arguments.length, args = Array(_len18), _key18 = 0; _key18 < _len18; _key18++) {
							args[_key18] = arguments[_key18];
						}

						var geomIndex = args[0];
						var posIndex = args[1];
						var location = args[2];

						_this5.elt[geomIndex].setLocation(posIndex, location);
					}).apply(undefined, args);
			}
		}
	}, {
		key: 'isEqualOnSide',
		value: function isEqualOnSide(lbl, side) {
			return this.elt[0].isEqualOnSide(lbl.elt[0], side) && this.elt[1].isEqualOnSide(lbl.elt[1], side);
		}
	}, {
		key: 'allPositionsEqual',
		value: function allPositionsEqual(geomIndex, loc) {
			return this.elt[geomIndex].allPositionsEqual(loc);
		}
	}, {
		key: 'toLine',
		value: function toLine(geomIndex) {
			if (this.elt[geomIndex].isArea()) this.elt[geomIndex] = new _comVividsolutionsJtsGeomgraphTopologyLocation2['default'](this.location[0]);
		}
	}, {
		key: 'interfaces_',
		get: function get() {
			return [];
		}
	}], [{
		key: 'toLineLabel',
		value: function toLineLabel(label) {
			var lineLabel = new Label(_comVividsolutionsJtsGeomLocation2['default'].NONE);
			for (var i = 0; i < 2; i++) {
				lineLabel.setLocation(i, label.getLocation(i));
			}
			return lineLabel;
		}
	}]);

	return Label;
})();

exports['default'] = Label;
module.exports = exports['default'];

},{"com/vividsolutions/jts/geom/Location":36,"com/vividsolutions/jts/geomgraph/Position":65,"com/vividsolutions/jts/geomgraph/TopologyLocation":67}],61:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _comVividsolutionsJtsGeomLocation = require('com/vividsolutions/jts/geom/Location');

var _comVividsolutionsJtsGeomLocation2 = _interopRequireDefault(_comVividsolutionsJtsGeomLocation);

var _comVividsolutionsJtsGeomgraphLabel = require('com/vividsolutions/jts/geomgraph/Label');

var _comVividsolutionsJtsGeomgraphLabel2 = _interopRequireDefault(_comVividsolutionsJtsGeomgraphLabel);

var _comVividsolutionsJtsGeomgraphGraphComponent = require('com/vividsolutions/jts/geomgraph/GraphComponent');

var _comVividsolutionsJtsGeomgraphGraphComponent2 = _interopRequireDefault(_comVividsolutionsJtsGeomgraphGraphComponent);

var Node = (function (_GraphComponent) {
	_inherits(Node, _GraphComponent);

	function Node() {
		_classCallCheck(this, Node);

		_get(Object.getPrototypeOf(Node.prototype), 'constructor', this).call(this);
		this.init_.apply(this, arguments);
	}

	_createClass(Node, [{
		key: 'init_',
		value: function init_() {
			var _this = this;

			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			_get(Object.getPrototypeOf(Node.prototype), 'init_', this).call(this);
			this.coord = null;
			this.edges = null;
			switch (args.length) {
				case 2:
					return (function () {
						for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
							args[_key2] = arguments[_key2];
						}

						var coord = args[0];
						var edges = args[1];

						_this.coord = coord;
						_this.edges = edges;
						_this.label = new _comVividsolutionsJtsGeomgraphLabel2['default'](0, _comVividsolutionsJtsGeomLocation2['default'].NONE);
					}).apply(undefined, args);
			}
		}
	}, {
		key: 'isIncidentEdgeInResult',
		value: function isIncidentEdgeInResult() {
			for (var it = this.getEdges().getEdges().iterator(); it.hasNext();) {
				var de = it.next();
				if (de.getEdge().isInResult()) return true;
			}
			return false;
		}
	}, {
		key: 'isIsolated',
		value: function isIsolated() {
			return this.label.getGeometryCount() === 1;
		}
	}, {
		key: 'getCoordinate',
		value: function getCoordinate() {
			return this.coord;
		}
	}, {
		key: 'print',
		value: function print(out) {
			out.println("node " + (this.coord + (" lbl: " + this.label)));
		}
	}, {
		key: 'computeIM',
		value: function computeIM(im) {}
	}, {
		key: 'computeMergedLocation',
		value: function computeMergedLocation(label2, eltIndex) {
			var loc = _comVividsolutionsJtsGeomLocation2['default'].NONE;
			loc = this.label.getLocation(eltIndex);
			if (!label2.isNull(eltIndex)) {
				var nLoc = label2.getLocation(eltIndex);
				if (loc !== _comVividsolutionsJtsGeomLocation2['default'].BOUNDARY) loc = nLoc;
			}
			return loc;
		}
	}, {
		key: 'setLabel',
		value: function setLabel(argIndex, onLocation) {
			if (this.label === null) {
				this.label = new _comVividsolutionsJtsGeomgraphLabel2['default'](argIndex, onLocation);
			} else this.label.setLocation(argIndex, onLocation);
		}
	}, {
		key: 'getEdges',
		value: function getEdges() {
			return this.edges;
		}
	}, {
		key: 'mergeLabel',
		value: function mergeLabel() {
			var _this2 = this;

			for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
				args[_key3] = arguments[_key3];
			}

			switch (args.length) {
				case 1:
					if (args[0] instanceof Node) {
						return (function () {
							for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
								args[_key4] = arguments[_key4];
							}

							var n = args[0];

							_this2.mergeLabel(n.label);
						}).apply(undefined, args);
					} else if (args[0] instanceof _comVividsolutionsJtsGeomgraphLabel2['default']) {
						return (function () {
							for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
								args[_key5] = arguments[_key5];
							}

							var label2 = args[0];

							for (var i = 0; i < 2; i++) {
								var loc = _this2.computeMergedLocation(label2, i);
								var thisLoc = _this2.label.getLocation(i);
								if (thisLoc === _comVividsolutionsJtsGeomLocation2['default'].NONE) _this2.label.setLocation(i, loc);
							}
						}).apply(undefined, args);
					}
			}
		}
	}, {
		key: 'add',
		value: function add(e) {
			this.edges.insert(e);
			e.setNode(this);
		}
	}, {
		key: 'setLabelBoundary',
		value: function setLabelBoundary(argIndex) {
			if (this.label === null) return null;
			var loc = _comVividsolutionsJtsGeomLocation2['default'].NONE;
			if (this.label !== null) loc = this.label.getLocation(argIndex);
			var newLoc = null;
			switch (loc) {
				case _comVividsolutionsJtsGeomLocation2['default'].BOUNDARY:
					newLoc = _comVividsolutionsJtsGeomLocation2['default'].INTERIOR;
					break;
				case _comVividsolutionsJtsGeomLocation2['default'].INTERIOR:
					newLoc = _comVividsolutionsJtsGeomLocation2['default'].BOUNDARY;
					break;
				default:
					newLoc = _comVividsolutionsJtsGeomLocation2['default'].BOUNDARY;
					break;
			}
			this.label.setLocation(argIndex, newLoc);
		}
	}, {
		key: 'interfaces_',
		get: function get() {
			return [];
		}
	}]);

	return Node;
})(_comVividsolutionsJtsGeomgraphGraphComponent2['default']);

exports['default'] = Node;
module.exports = exports['default'];

},{"com/vividsolutions/jts/geom/Location":36,"com/vividsolutions/jts/geomgraph/GraphComponent":59,"com/vividsolutions/jts/geomgraph/Label":60}],62:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _comVividsolutionsJtsGeomgraphNode = require('com/vividsolutions/jts/geomgraph/Node');

var _comVividsolutionsJtsGeomgraphNode2 = _interopRequireDefault(_comVividsolutionsJtsGeomgraphNode);

var NodeFactory = (function () {
	function NodeFactory() {
		_classCallCheck(this, NodeFactory);

		this.init_.apply(this, arguments);
	}

	_createClass(NodeFactory, [{
		key: 'init_',
		value: function init_() {
			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			switch (args.length) {}
		}
	}, {
		key: 'createNode',
		value: function createNode(coord) {
			return new _comVividsolutionsJtsGeomgraphNode2['default'](coord, null);
		}
	}, {
		key: 'interfaces_',
		get: function get() {
			return [];
		}
	}]);

	return NodeFactory;
})();

exports['default'] = NodeFactory;
module.exports = exports['default'];

},{"com/vividsolutions/jts/geomgraph/Node":61}],63:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _comVividsolutionsJtsGeomLocation = require('com/vividsolutions/jts/geom/Location');

var _comVividsolutionsJtsGeomLocation2 = _interopRequireDefault(_comVividsolutionsJtsGeomLocation);

var _comVividsolutionsJtsGeomCoordinate = require('com/vividsolutions/jts/geom/Coordinate');

var _comVividsolutionsJtsGeomCoordinate2 = _interopRequireDefault(_comVividsolutionsJtsGeomCoordinate);

var _comVividsolutionsJtsGeomgraphNode = require('com/vividsolutions/jts/geomgraph/Node');

var _comVividsolutionsJtsGeomgraphNode2 = _interopRequireDefault(_comVividsolutionsJtsGeomgraphNode);

var _javaUtilArrayList = require('java/util/ArrayList');

var _javaUtilArrayList2 = _interopRequireDefault(_javaUtilArrayList);

var _javaUtilTreeMap = require('java/util/TreeMap');

var _javaUtilTreeMap2 = _interopRequireDefault(_javaUtilTreeMap);

var NodeMap = (function () {
	function NodeMap() {
		_classCallCheck(this, NodeMap);

		this.init_.apply(this, arguments);
	}

	_createClass(NodeMap, [{
		key: 'init_',
		value: function init_() {
			var _this = this;

			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			this.nodeMap = new _javaUtilTreeMap2['default']();
			this.nodeFact = null;
			switch (args.length) {
				case 1:
					return (function () {
						for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
							args[_key2] = arguments[_key2];
						}

						var nodeFact = args[0];

						_this.nodeFact = nodeFact;
					}).apply(undefined, args);
			}
		}
	}, {
		key: 'find',
		value: function find(coord) {
			return this.nodeMap.get(coord);
		}
	}, {
		key: 'addNode',
		value: function addNode() {
			var _this2 = this;

			for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
				args[_key3] = arguments[_key3];
			}

			switch (args.length) {
				case 1:
					if (args[0] instanceof _comVividsolutionsJtsGeomCoordinate2['default']) {
						return (function () {
							for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
								args[_key4] = arguments[_key4];
							}

							var coord = args[0];

							var node = _this2.nodeMap.get(coord);
							if (node === null) {
								node = _this2.nodeFact.createNode(coord);
								_this2.nodeMap.put(coord, node);
							}
							return node;
						}).apply(undefined, args);
					} else if (args[0] instanceof _comVividsolutionsJtsGeomgraphNode2['default']) {
						return (function () {
							for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
								args[_key5] = arguments[_key5];
							}

							var n = args[0];

							var node = _this2.nodeMap.get(n.getCoordinate());
							if (node === null) {
								_this2.nodeMap.put(n.getCoordinate(), n);
								return n;
							}
							node.mergeLabel(n);
							return node;
						}).apply(undefined, args);
					}
			}
		}
	}, {
		key: 'print',
		value: function print(out) {
			for (var it = this.iterator(); it.hasNext();) {
				var n = it.next();
				n.print(out);
			}
		}
	}, {
		key: 'iterator',
		value: function iterator() {
			return this.nodeMap.values().iterator();
		}
	}, {
		key: 'values',
		value: function values() {
			return this.nodeMap.values();
		}
	}, {
		key: 'getBoundaryNodes',
		value: function getBoundaryNodes(geomIndex) {
			var bdyNodes = new _javaUtilArrayList2['default']();
			for (var i = this.iterator(); i.hasNext();) {
				var node = i.next();
				if (node.getLabel().getLocation(geomIndex) === _comVividsolutionsJtsGeomLocation2['default'].BOUNDARY) bdyNodes.add(node);
			}
			return bdyNodes;
		}
	}, {
		key: 'add',
		value: function add(e) {
			var p = e.getCoordinate();
			var n = this.addNode(p);
			n.add(e);
		}
	}, {
		key: 'interfaces_',
		get: function get() {
			return [];
		}
	}]);

	return NodeMap;
})();

exports['default'] = NodeMap;
module.exports = exports['default'];

},{"com/vividsolutions/jts/geom/Coordinate":15,"com/vividsolutions/jts/geom/Location":36,"com/vividsolutions/jts/geomgraph/Node":61,"java/util/ArrayList":111,"java/util/TreeMap":124}],64:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _comVividsolutionsJtsGeomLocation = require('com/vividsolutions/jts/geom/Location');

var _comVividsolutionsJtsGeomLocation2 = _interopRequireDefault(_comVividsolutionsJtsGeomLocation);

var _comVividsolutionsJtsAlgorithmCGAlgorithms = require('com/vividsolutions/jts/algorithm/CGAlgorithms');

var _comVividsolutionsJtsAlgorithmCGAlgorithms2 = _interopRequireDefault(_comVividsolutionsJtsAlgorithmCGAlgorithms);

var _comVividsolutionsJtsGeomCoordinate = require('com/vividsolutions/jts/geom/Coordinate');

var _comVividsolutionsJtsGeomCoordinate2 = _interopRequireDefault(_comVividsolutionsJtsGeomCoordinate);

var _comVividsolutionsJtsGeomgraphNode = require('com/vividsolutions/jts/geomgraph/Node');

var _comVividsolutionsJtsGeomgraphNode2 = _interopRequireDefault(_comVividsolutionsJtsGeomgraphNode);

var _comVividsolutionsJtsGeomgraphNodeMap = require('com/vividsolutions/jts/geomgraph/NodeMap');

var _comVividsolutionsJtsGeomgraphNodeMap2 = _interopRequireDefault(_comVividsolutionsJtsGeomgraphNodeMap);

var _comVividsolutionsJtsGeomgraphDirectedEdge = require('com/vividsolutions/jts/geomgraph/DirectedEdge');

var _comVividsolutionsJtsGeomgraphDirectedEdge2 = _interopRequireDefault(_comVividsolutionsJtsGeomgraphDirectedEdge);

var _javaUtilArrayList = require('java/util/ArrayList');

var _javaUtilArrayList2 = _interopRequireDefault(_javaUtilArrayList);

var _comVividsolutionsJtsGeomgraphQuadrant = require('com/vividsolutions/jts/geomgraph/Quadrant');

var _comVividsolutionsJtsGeomgraphQuadrant2 = _interopRequireDefault(_comVividsolutionsJtsGeomgraphQuadrant);

var _comVividsolutionsJtsGeomgraphNodeFactory = require('com/vividsolutions/jts/geomgraph/NodeFactory');

var _comVividsolutionsJtsGeomgraphNodeFactory2 = _interopRequireDefault(_comVividsolutionsJtsGeomgraphNodeFactory);

var PlanarGraph = (function () {
	function PlanarGraph() {
		_classCallCheck(this, PlanarGraph);

		this.init_.apply(this, arguments);
	}

	_createClass(PlanarGraph, [{
		key: 'init_',
		value: function init_() {
			var _this = this;

			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			this.edges = new _javaUtilArrayList2['default']();
			this.nodes = null;
			this.edgeEndList = new _javaUtilArrayList2['default']();
			switch (args.length) {
				case 1:
					return (function () {
						for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
							args[_key2] = arguments[_key2];
						}

						var nodeFact = args[0];

						_this.nodes = new _comVividsolutionsJtsGeomgraphNodeMap2['default'](nodeFact);
					}).apply(undefined, args);
				case 0:
					return (function () {
						for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
							args[_key3] = arguments[_key3];
						}

						_this.nodes = new _comVividsolutionsJtsGeomgraphNodeMap2['default'](new _comVividsolutionsJtsGeomgraphNodeFactory2['default']());
					}).apply(undefined, args);
			}
		}
	}, {
		key: 'printEdges',
		value: function printEdges(out) {
			out.println("Edges:");
			for (var i = 0; i < this.edges.size(); i++) {
				out.println("edge " + (i + ":"));
				var e = this.edges.get(i);
				e.print(out);
				e.eiList.print(out);
			}
		}
	}, {
		key: 'find',
		value: function find(coord) {
			return this.nodes.find(coord);
		}
	}, {
		key: 'addNode',
		value: function addNode() {
			var _this2 = this;

			for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
				args[_key4] = arguments[_key4];
			}

			switch (args.length) {
				case 1:
					if (args[0] instanceof _comVividsolutionsJtsGeomgraphNode2['default']) {
						return (function () {
							for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
								args[_key5] = arguments[_key5];
							}

							var node = args[0];

							return _this2.nodes.addNode(node);
						}).apply(undefined, args);
					} else if (args[0] instanceof _comVividsolutionsJtsGeomCoordinate2['default']) {
						return (function () {
							for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
								args[_key6] = arguments[_key6];
							}

							var coord = args[0];

							return _this2.nodes.addNode(coord);
						}).apply(undefined, args);
					}
			}
		}
	}, {
		key: 'getNodeIterator',
		value: function getNodeIterator() {
			return this.nodes.iterator();
		}
	}, {
		key: 'linkResultDirectedEdges',
		value: function linkResultDirectedEdges() {
			for (var nodeit = this.nodes.iterator(); nodeit.hasNext();) {
				var node = nodeit.next();
				node.getEdges().linkResultDirectedEdges();
			}
		}
	}, {
		key: 'debugPrintln',
		value: function debugPrintln(o) {
			System.out.println(o);
		}
	}, {
		key: 'isBoundaryNode',
		value: function isBoundaryNode(geomIndex, coord) {
			var node = this.nodes.find(coord);
			if (node === null) return false;
			var label = node.getLabel();
			if (label !== null && label.getLocation(geomIndex) === _comVividsolutionsJtsGeomLocation2['default'].BOUNDARY) return true;
			return false;
		}
	}, {
		key: 'linkAllDirectedEdges',
		value: function linkAllDirectedEdges() {
			for (var nodeit = this.nodes.iterator(); nodeit.hasNext();) {
				var node = nodeit.next();
				node.getEdges().linkAllDirectedEdges();
			}
		}
	}, {
		key: 'matchInSameDirection',
		value: function matchInSameDirection(p0, p1, ep0, ep1) {
			if (!p0.equals(ep0)) return false;
			if (_comVividsolutionsJtsAlgorithmCGAlgorithms2['default'].computeOrientation(p0, p1, ep1) === _comVividsolutionsJtsAlgorithmCGAlgorithms2['default'].COLLINEAR && _comVividsolutionsJtsGeomgraphQuadrant2['default'].quadrant(p0, p1) === _comVividsolutionsJtsGeomgraphQuadrant2['default'].quadrant(ep0, ep1)) return true;
			return false;
		}
	}, {
		key: 'getEdgeEnds',
		value: function getEdgeEnds() {
			return this.edgeEndList;
		}
	}, {
		key: 'debugPrint',
		value: function debugPrint(o) {
			System.out.print(o);
		}
	}, {
		key: 'getEdgeIterator',
		value: function getEdgeIterator() {
			return this.edges.iterator();
		}
	}, {
		key: 'findEdgeInSameDirection',
		value: function findEdgeInSameDirection(p0, p1) {
			for (var i = 0; i < this.edges.size(); i++) {
				var e = this.edges.get(i);
				var eCoord = e.getCoordinates();
				if (this.matchInSameDirection(p0, p1, eCoord[0], eCoord[1])) return e;
				if (this.matchInSameDirection(p0, p1, eCoord[eCoord.length - 1], eCoord[eCoord.length - 2])) return e;
			}
			return null;
		}
	}, {
		key: 'insertEdge',
		value: function insertEdge(e) {
			this.edges.add(e);
		}
	}, {
		key: 'findEdgeEnd',
		value: function findEdgeEnd(e) {
			for (var i = this.getEdgeEnds().iterator(); i.hasNext();) {
				var ee = i.next();
				if (ee.getEdge() === e) return ee;
			}
			return null;
		}
	}, {
		key: 'addEdges',
		value: function addEdges(edgesToAdd) {
			for (var it = edgesToAdd.iterator(); it.hasNext();) {
				var e = it.next();
				this.edges.add(e);
				var de1 = new _comVividsolutionsJtsGeomgraphDirectedEdge2['default'](e, true);
				var de2 = new _comVividsolutionsJtsGeomgraphDirectedEdge2['default'](e, false);
				de1.setSym(de2);
				de2.setSym(de1);
				this.add(de1);
				this.add(de2);
			}
		}
	}, {
		key: 'add',
		value: function add(e) {
			this.nodes.add(e);
			this.edgeEndList.add(e);
		}
	}, {
		key: 'getNodes',
		value: function getNodes() {
			return this.nodes.values();
		}
	}, {
		key: 'findEdge',
		value: function findEdge(p0, p1) {
			for (var i = 0; i < this.edges.size(); i++) {
				var e = this.edges.get(i);
				var eCoord = e.getCoordinates();
				if (p0.equals(eCoord[0]) && p1.equals(eCoord[1])) return e;
			}
			return null;
		}
	}, {
		key: 'interfaces_',
		get: function get() {
			return [];
		}
	}], [{
		key: 'linkResultDirectedEdges',
		value: function linkResultDirectedEdges(nodes) {
			for (var nodeit = nodes.iterator(); nodeit.hasNext();) {
				var node = nodeit.next();
				node.getEdges().linkResultDirectedEdges();
			}
		}
	}]);

	return PlanarGraph;
})();

exports['default'] = PlanarGraph;
module.exports = exports['default'];

},{"com/vividsolutions/jts/algorithm/CGAlgorithms":2,"com/vividsolutions/jts/geom/Coordinate":15,"com/vividsolutions/jts/geom/Location":36,"com/vividsolutions/jts/geomgraph/DirectedEdge":52,"com/vividsolutions/jts/geomgraph/Node":61,"com/vividsolutions/jts/geomgraph/NodeFactory":62,"com/vividsolutions/jts/geomgraph/NodeMap":63,"com/vividsolutions/jts/geomgraph/Quadrant":66,"java/util/ArrayList":111}],65:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Position = (function () {
	function Position() {
		_classCallCheck(this, Position);

		this.init_.apply(this, arguments);
	}

	_createClass(Position, [{
		key: "init_",
		value: function init_() {
			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			switch (args.length) {}
		}
	}, {
		key: "interfaces_",
		get: function get() {
			return [];
		}
	}], [{
		key: "opposite",
		value: function opposite(position) {
			if (position === Position.LEFT) return Position.RIGHT;
			if (position === Position.RIGHT) return Position.LEFT;
			return position;
		}
	}]);

	return Position;
})();

exports["default"] = Position;

Position.ON = 0;
Position.LEFT = 1;
Position.RIGHT = 2;
module.exports = exports["default"];

},{}],66:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _comVividsolutionsJtsGeomCoordinate = require('com/vividsolutions/jts/geom/Coordinate');

var _comVividsolutionsJtsGeomCoordinate2 = _interopRequireDefault(_comVividsolutionsJtsGeomCoordinate);

var Quadrant = (function () {
	function Quadrant() {
		_classCallCheck(this, Quadrant);

		this.init_.apply(this, arguments);
	}

	_createClass(Quadrant, [{
		key: "init_",
		value: function init_() {
			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			switch (args.length) {}
		}
	}, {
		key: "interfaces_",
		get: function get() {
			return [];
		}
	}], [{
		key: "isNorthern",
		value: function isNorthern(quad) {
			return quad === Quadrant.NE || quad === Quadrant.NW;
		}
	}, {
		key: "isOpposite",
		value: function isOpposite(quad1, quad2) {
			if (quad1 === quad2) return false;
			var diff = (quad1 - quad2 + 4) % 4;
			if (diff === 2) return true;
			return false;
		}
	}, {
		key: "commonHalfPlane",
		value: function commonHalfPlane(quad1, quad2) {
			if (quad1 === quad2) return quad1;
			var diff = (quad1 - quad2 + 4) % 4;
			if (diff === 2) return -1;
			var min = quad1 < quad2 ? quad1 : quad2;
			var max = quad1 > quad2 ? quad1 : quad2;
			if (min === 0 && max === 3) return 3;
			return min;
		}
	}, {
		key: "isInHalfPlane",
		value: function isInHalfPlane(quad, halfPlane) {
			if (halfPlane === Quadrant.SE) {
				return quad === Quadrant.SE || quad === Quadrant.SW;
			}
			return quad === halfPlane || quad === halfPlane + 1;
		}
	}, {
		key: "quadrant",
		value: function quadrant() {
			for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
				args[_key2] = arguments[_key2];
			}

			switch (args.length) {
				case 2:
					if (!Number.isInteger(args[0]) && !Number.isInteger(args[1])) {
						return (function () {
							for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
								args[_key3] = arguments[_key3];
							}

							var dx = args[0];
							var dy = args[1];

							if (dx === 0.0 && dy === 0.0) throw new IllegalArgumentException("Cannot compute the quadrant for point ( " + (dx + (", " + (dy + " )"))));
							if (dx >= 0.0) {
								if (dy >= 0.0) return Quadrant.NE;else return Quadrant.SE;
							} else {
								if (dy >= 0.0) return Quadrant.NW;else return Quadrant.SW;
							}
						}).apply(undefined, args);
					} else if (args[0] instanceof _comVividsolutionsJtsGeomCoordinate2["default"] && args[1] instanceof _comVividsolutionsJtsGeomCoordinate2["default"]) {
						return (function () {
							for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
								args[_key4] = arguments[_key4];
							}

							var p0 = args[0];
							var p1 = args[1];

							if (p1.x === p0.x && p1.y === p0.y) throw new IllegalArgumentException("Cannot compute the quadrant for two identical points " + p0);
							if (p1.x >= p0.x) {
								if (p1.y >= p0.y) return Quadrant.NE;else return Quadrant.SE;
							} else {
								if (p1.y >= p0.y) return Quadrant.NW;else return Quadrant.SW;
							}
						}).apply(undefined, args);
					}
			}
		}
	}]);

	return Quadrant;
})();

exports["default"] = Quadrant;

Quadrant.NE = 0;
Quadrant.NW = 1;
Quadrant.SW = 2;
Quadrant.SE = 3;
module.exports = exports["default"];

},{"com/vividsolutions/jts/geom/Coordinate":15}],67:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _comVividsolutionsJtsGeomLocation = require('com/vividsolutions/jts/geom/Location');

var _comVividsolutionsJtsGeomLocation2 = _interopRequireDefault(_comVividsolutionsJtsGeomLocation);

var _comVividsolutionsJtsGeomgraphPosition = require('com/vividsolutions/jts/geomgraph/Position');

var _comVividsolutionsJtsGeomgraphPosition2 = _interopRequireDefault(_comVividsolutionsJtsGeomgraphPosition);

var TopologyLocation = (function () {
	function TopologyLocation() {
		_classCallCheck(this, TopologyLocation);

		this.init_.apply(this, arguments);
	}

	_createClass(TopologyLocation, [{
		key: 'init_',
		value: function init_() {
			var _this = this;

			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			this.location = null;
			switch (args.length) {
				case 1:
					if (args[0] instanceof Array) {
						return (function () {
							for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
								args[_key2] = arguments[_key2];
							}

							var location = args[0];

							_this.init(location.length);
						}).apply(undefined, args);
					} else if (Number.isInteger(args[0])) {
						return (function () {
							for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
								args[_key3] = arguments[_key3];
							}

							var on = args[0];

							_this.init(1);
							_this.location[_comVividsolutionsJtsGeomgraphPosition2['default'].ON] = on;
						}).apply(undefined, args);
					} else if (args[0] instanceof TopologyLocation) {
						return (function () {
							for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
								args[_key4] = arguments[_key4];
							}

							var gl = args[0];

							_this.init(gl.location.length);
							if (gl !== null) {
								for (var i = 0; i < _this.location.length; i++) {
									_this.location[i] = gl.location[i];
								}
							}
						}).apply(undefined, args);
					}
				case 3:
					return (function () {
						for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
							args[_key5] = arguments[_key5];
						}

						var on = args[0];
						var left = args[1];
						var right = args[2];

						_this.init(3);
						_this.location[_comVividsolutionsJtsGeomgraphPosition2['default'].ON] = on;
						_this.location[_comVividsolutionsJtsGeomgraphPosition2['default'].LEFT] = left;
						_this.location[_comVividsolutionsJtsGeomgraphPosition2['default'].RIGHT] = right;
					}).apply(undefined, args);
			}
		}
	}, {
		key: 'setAllLocations',
		value: function setAllLocations(locValue) {
			for (var i = 0; i < this.location.length; i++) {
				this.location[i] = locValue;
			}
		}
	}, {
		key: 'isNull',
		value: function isNull() {
			for (var i = 0; i < this.location.length; i++) {
				if (this.location[i] !== _comVividsolutionsJtsGeomLocation2['default'].NONE) return false;
			}
			return true;
		}
	}, {
		key: 'setAllLocationsIfNull',
		value: function setAllLocationsIfNull(locValue) {
			for (var i = 0; i < this.location.length; i++) {
				if (this.location[i] === _comVividsolutionsJtsGeomLocation2['default'].NONE) this.location[i] = locValue;
			}
		}
	}, {
		key: 'isLine',
		value: function isLine() {
			return this.location.length === 1;
		}
	}, {
		key: 'merge',
		value: function merge(gl) {
			if (gl.location.length > this.location.length) {
				var newLoc = [];
				newLoc[_comVividsolutionsJtsGeomgraphPosition2['default'].ON] = this.location[_comVividsolutionsJtsGeomgraphPosition2['default'].ON];
				newLoc[_comVividsolutionsJtsGeomgraphPosition2['default'].LEFT] = _comVividsolutionsJtsGeomLocation2['default'].NONE;
				newLoc[_comVividsolutionsJtsGeomgraphPosition2['default'].RIGHT] = _comVividsolutionsJtsGeomLocation2['default'].NONE;
				this.location = newLoc;
			}
			for (var i = 0; i < this.location.length; i++) {
				if (this.location[i] === _comVividsolutionsJtsGeomLocation2['default'].NONE && i < gl.location.length) this.location[i] = gl.location[i];
			}
		}
	}, {
		key: 'getLocations',
		value: function getLocations() {
			return this.location;
		}
	}, {
		key: 'flip',
		value: function flip() {
			if (this.location.length <= 1) return null;
			var temp = this.location[_comVividsolutionsJtsGeomgraphPosition2['default'].LEFT];
			this.location[_comVividsolutionsJtsGeomgraphPosition2['default'].LEFT] = this.location[_comVividsolutionsJtsGeomgraphPosition2['default'].RIGHT];
			this.location[_comVividsolutionsJtsGeomgraphPosition2['default'].RIGHT] = temp;
		}
	}, {
		key: 'toString',
		value: function toString() {
			var buf = new StringBuffer();
			if (this.location.length > 1) buf.append(_comVividsolutionsJtsGeomLocation2['default'].toLocationSymbol(this.location[_comVividsolutionsJtsGeomgraphPosition2['default'].LEFT]));
			buf.append(_comVividsolutionsJtsGeomLocation2['default'].toLocationSymbol(this.location[_comVividsolutionsJtsGeomgraphPosition2['default'].ON]));
			if (this.location.length > 1) buf.append(_comVividsolutionsJtsGeomLocation2['default'].toLocationSymbol(this.location[_comVividsolutionsJtsGeomgraphPosition2['default'].RIGHT]));
			return buf.toString();
		}
	}, {
		key: 'setLocations',
		value: function setLocations(on, left, right) {
			this.location[_comVividsolutionsJtsGeomgraphPosition2['default'].ON] = on;
			this.location[_comVividsolutionsJtsGeomgraphPosition2['default'].LEFT] = left;
			this.location[_comVividsolutionsJtsGeomgraphPosition2['default'].RIGHT] = right;
		}
	}, {
		key: 'get',
		value: function get(posIndex) {
			if (posIndex < this.location.length) return this.location[posIndex];
			return _comVividsolutionsJtsGeomLocation2['default'].NONE;
		}
	}, {
		key: 'isArea',
		value: function isArea() {
			return this.location.length > 1;
		}
	}, {
		key: 'isAnyNull',
		value: function isAnyNull() {
			for (var i = 0; i < this.location.length; i++) {
				if (this.location[i] === _comVividsolutionsJtsGeomLocation2['default'].NONE) return true;
			}
			return false;
		}
	}, {
		key: 'setLocation',
		value: function setLocation() {
			var _this2 = this;

			for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
				args[_key6] = arguments[_key6];
			}

			switch (args.length) {
				case 2:
					return (function () {
						for (var _len7 = arguments.length, args = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
							args[_key7] = arguments[_key7];
						}

						var locIndex = args[0];
						var locValue = args[1];

						_this2.location[locIndex] = locValue;
					}).apply(undefined, args);
				case 1:
					return (function () {
						for (var _len8 = arguments.length, args = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
							args[_key8] = arguments[_key8];
						}

						var locValue = args[0];

						_this2.setLocation(_comVividsolutionsJtsGeomgraphPosition2['default'].ON, locValue);
					}).apply(undefined, args);
			}
		}
	}, {
		key: 'init',
		value: function init(size) {
			this.location = [];
			this.setAllLocations(_comVividsolutionsJtsGeomLocation2['default'].NONE);
		}
	}, {
		key: 'isEqualOnSide',
		value: function isEqualOnSide(le, locIndex) {
			return this.location[locIndex] === le.location[locIndex];
		}
	}, {
		key: 'allPositionsEqual',
		value: function allPositionsEqual(loc) {
			for (var i = 0; i < this.location.length; i++) {
				if (this.location[i] !== loc) return false;
			}
			return true;
		}
	}, {
		key: 'interfaces_',
		get: function get() {
			return [];
		}
	}]);

	return TopologyLocation;
})();

exports['default'] = TopologyLocation;
module.exports = exports['default'];

},{"com/vividsolutions/jts/geom/Location":36,"com/vividsolutions/jts/geomgraph/Position":65}],68:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EdgeSetIntersector = (function () {
	function EdgeSetIntersector() {
		_classCallCheck(this, EdgeSetIntersector);

		this.init_.apply(this, arguments);
	}

	_createClass(EdgeSetIntersector, [{
		key: "init_",
		value: function init_() {
			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			switch (args.length) {
				case 0:
					return (function () {
						for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
							args[_key2] = arguments[_key2];
						}
					}).apply(undefined, args);
			}
		}
	}, {
		key: "interfaces_",
		get: function get() {
			return [];
		}
	}]);

	return EdgeSetIntersector;
})();

exports["default"] = EdgeSetIntersector;
module.exports = exports["default"];

},{}],69:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MonotoneChain = (function () {
	function MonotoneChain() {
		_classCallCheck(this, MonotoneChain);

		this.init_.apply(this, arguments);
	}

	_createClass(MonotoneChain, [{
		key: "init_",
		value: function init_() {
			var _this = this;

			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			this.mce = null;
			this.chainIndex = null;
			switch (args.length) {
				case 2:
					return (function () {
						for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
							args[_key2] = arguments[_key2];
						}

						var mce = args[0];
						var chainIndex = args[1];

						_this.mce = mce;
						_this.chainIndex = chainIndex;
					}).apply(undefined, args);
			}
		}
	}, {
		key: "computeIntersections",
		value: function computeIntersections(mc, si) {
			this.mce.computeIntersectsForChain(this.chainIndex, mc.mce, mc.chainIndex, si);
		}
	}, {
		key: "interfaces_",
		get: function get() {
			return [];
		}
	}]);

	return MonotoneChain;
})();

exports["default"] = MonotoneChain;
module.exports = exports["default"];

},{}],70:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _comVividsolutionsJtsGeomgraphIndexMonotoneChainIndexer = require('com/vividsolutions/jts/geomgraph/index/MonotoneChainIndexer');

var _comVividsolutionsJtsGeomgraphIndexMonotoneChainIndexer2 = _interopRequireDefault(_comVividsolutionsJtsGeomgraphIndexMonotoneChainIndexer);

var _comVividsolutionsJtsGeomEnvelope = require('com/vividsolutions/jts/geom/Envelope');

var _comVividsolutionsJtsGeomEnvelope2 = _interopRequireDefault(_comVividsolutionsJtsGeomEnvelope);

var MonotoneChainEdge = (function () {
	function MonotoneChainEdge() {
		_classCallCheck(this, MonotoneChainEdge);

		this.init_.apply(this, arguments);
	}

	_createClass(MonotoneChainEdge, [{
		key: 'init_',
		value: function init_() {
			var _this = this;

			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			this.e = null;
			this.pts = null;
			this.startIndex = null;
			this.env1 = new _comVividsolutionsJtsGeomEnvelope2['default']();
			this.env2 = new _comVividsolutionsJtsGeomEnvelope2['default']();
			switch (args.length) {
				case 1:
					return (function () {
						for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
							args[_key2] = arguments[_key2];
						}

						var e = args[0];

						_this.e = e;
						_this.pts = e.getCoordinates();
						var mcb = new _comVividsolutionsJtsGeomgraphIndexMonotoneChainIndexer2['default']();
						_this.startIndex = mcb.getChainStartIndices(_this.pts);
					}).apply(undefined, args);
			}
		}
	}, {
		key: 'getCoordinates',
		value: function getCoordinates() {
			return this.pts;
		}
	}, {
		key: 'getMaxX',
		value: function getMaxX(chainIndex) {
			var x1 = this.x;
			var x2 = this.x;
			return x1 > x2 ? x1 : x2;
		}
	}, {
		key: 'getMinX',
		value: function getMinX(chainIndex) {
			var x1 = this.x;
			var x2 = this.x;
			return x1 < x2 ? x1 : x2;
		}
	}, {
		key: 'computeIntersectsForChain',
		value: function computeIntersectsForChain() {
			var _this2 = this;

			for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
				args[_key3] = arguments[_key3];
			}

			switch (args.length) {
				case 4:
					return (function () {
						for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
							args[_key4] = arguments[_key4];
						}

						var chainIndex0 = args[0];
						var mce = args[1];
						var chainIndex1 = args[2];
						var si = args[3];

						_this2.computeIntersectsForChain(_this2.startIndex[chainIndex0], _this2.startIndex[chainIndex0 + 1], mce, mce.startIndex[chainIndex1], mce.startIndex[chainIndex1 + 1], si);
					}).apply(undefined, args);
				case 6:
					return (function () {
						for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
							args[_key5] = arguments[_key5];
						}

						var start0 = args[0];
						var end0 = args[1];
						var mce = args[2];
						var start1 = args[3];
						var end1 = args[4];
						var ei = args[5];

						var p00 = _this2.pts[start0];
						var p01 = _this2.pts[end0];
						var p10 = mce.pts[start1];
						var p11 = mce.pts[end1];
						if (end0 - start0 === 1 && end1 - start1 === 1) {
							ei.addIntersections(_this2.e, start0, mce.e, start1);
							return null;
						}
						_this2.env1.init(p00, p01);
						_this2.env2.init(p10, p11);
						if (!_this2.env1.intersects(_this2.env2)) return null;
						var mid0 = (start0 + end0) / 2;
						var mid1 = (start1 + end1) / 2;
						if (start0 < mid0) {
							if (start1 < mid1) _this2.computeIntersectsForChain(start0, mid0, mce, start1, mid1, ei);
							if (mid1 < end1) _this2.computeIntersectsForChain(start0, mid0, mce, mid1, end1, ei);
						}
						if (mid0 < end0) {
							if (start1 < mid1) _this2.computeIntersectsForChain(mid0, end0, mce, start1, mid1, ei);
							if (mid1 < end1) _this2.computeIntersectsForChain(mid0, end0, mce, mid1, end1, ei);
						}
					}).apply(undefined, args);
			}
		}
	}, {
		key: 'getStartIndexes',
		value: function getStartIndexes() {
			return this.startIndex;
		}
	}, {
		key: 'computeIntersects',
		value: function computeIntersects(mce, si) {
			for (var i = 0; i < this.startIndex.length - 1; i++) {
				for (var j = 0; j < mce.startIndex.length - 1; j++) {
					this.computeIntersectsForChain(i, mce, j, si);
				}
			}
		}
	}, {
		key: 'interfaces_',
		get: function get() {
			return [];
		}
	}]);

	return MonotoneChainEdge;
})();

exports['default'] = MonotoneChainEdge;
module.exports = exports['default'];

},{"com/vividsolutions/jts/geom/Envelope":24,"com/vividsolutions/jts/geomgraph/index/MonotoneChainIndexer":71}],71:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _javaUtilArrayList = require('java/util/ArrayList');

var _javaUtilArrayList2 = _interopRequireDefault(_javaUtilArrayList);

var _comVividsolutionsJtsGeomgraphQuadrant = require('com/vividsolutions/jts/geomgraph/Quadrant');

var _comVividsolutionsJtsGeomgraphQuadrant2 = _interopRequireDefault(_comVividsolutionsJtsGeomgraphQuadrant);

var MonotoneChainIndexer = (function () {
	function MonotoneChainIndexer() {
		_classCallCheck(this, MonotoneChainIndexer);

		this.init_.apply(this, arguments);
	}

	_createClass(MonotoneChainIndexer, [{
		key: 'init_',
		value: function init_() {
			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			switch (args.length) {
				case 0:
					return (function () {
						for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
							args[_key2] = arguments[_key2];
						}
					}).apply(undefined, args);
			}
		}
	}, {
		key: 'getChainStartIndices',
		value: function getChainStartIndices(pts) {
			var start = 0;
			var startIndexList = new _javaUtilArrayList2['default']();
			startIndexList.add(new Integer(start));
			do {
				var last = this.findChainEnd(pts, start);
				startIndexList.add(new Integer(last));
				start = last;
			} while (start < pts.length - 1);
			var startIndex = MonotoneChainIndexer.toIntArray(startIndexList);
			return startIndex;
		}
	}, {
		key: 'findChainEnd',
		value: function findChainEnd(pts, start) {
			var chainQuad = _comVividsolutionsJtsGeomgraphQuadrant2['default'].quadrant(pts[start], pts[start + 1]);
			var last = start + 1;
			while (last < pts.length) {
				var quad = _comVividsolutionsJtsGeomgraphQuadrant2['default'].quadrant(pts[last - 1], pts[last]);
				if (quad !== chainQuad) break;
				last++;
			}
			return last - 1;
		}
	}, {
		key: 'interfaces_',
		get: function get() {
			return [];
		}
	}], [{
		key: 'toIntArray',
		value: function toIntArray(list) {
			var array = [];
			for (var i = 0; i < array.length; i++) {
				array[i] = list.get(i).intValue();
			}
			return array;
		}
	}]);

	return MonotoneChainIndexer;
})();

exports['default'] = MonotoneChainIndexer;
module.exports = exports['default'];

},{"com/vividsolutions/jts/geomgraph/Quadrant":66,"java/util/ArrayList":111}],72:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _javaUtilCollection = require('java/util/Collection');

var _javaUtilCollection2 = _interopRequireDefault(_javaUtilCollection);

var _comVividsolutionsJtsAlgorithmLineIntersector = require('com/vividsolutions/jts/algorithm/LineIntersector');

var _comVividsolutionsJtsAlgorithmLineIntersector2 = _interopRequireDefault(_comVividsolutionsJtsAlgorithmLineIntersector);

var SegmentIntersector = (function () {
	function SegmentIntersector() {
		_classCallCheck(this, SegmentIntersector);

		this.init_.apply(this, arguments);
	}

	_createClass(SegmentIntersector, [{
		key: 'init_',
		value: function init_() {
			var _this = this;

			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			this.hasIntersection = false;
			this.hasProper = false;
			this.hasProperInterior = false;
			this.properIntersectionPoint = null;
			this.li = null;
			this.includeProper = null;
			this.recordIsolated = null;
			this.isSelfIntersection = null;
			this.numIntersections = 0;
			this.numTests = 0;
			this.bdyNodes = null;
			switch (args.length) {
				case 3:
					return (function () {
						for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
							args[_key2] = arguments[_key2];
						}

						var li = args[0];
						var includeProper = args[1];
						var recordIsolated = args[2];

						_this.li = li;
						_this.includeProper = includeProper;
						_this.recordIsolated = recordIsolated;
					}).apply(undefined, args);
			}
		}
	}, {
		key: 'isTrivialIntersection',
		value: function isTrivialIntersection(e0, segIndex0, e1, segIndex1) {
			if (e0 === e1) {
				if (this.li.getIntersectionNum() === 1) {
					if (SegmentIntersector.isAdjacentSegments(segIndex0, segIndex1)) return true;
					if (e0.isClosed()) {
						var maxSegIndex = e0.getNumPoints() - 1;
						if (segIndex0 === 0 && segIndex1 === maxSegIndex || segIndex1 === 0 && segIndex0 === maxSegIndex) {
							return true;
						}
					}
				}
			}
			return false;
		}
	}, {
		key: 'getProperIntersectionPoint',
		value: function getProperIntersectionPoint() {
			return this.properIntersectionPoint;
		}
	}, {
		key: 'hasProperInteriorIntersection',
		value: function hasProperInteriorIntersection() {
			return this.hasProperInterior;
		}
	}, {
		key: 'hasProperIntersection',
		value: function hasProperIntersection() {
			return this.hasProper;
		}
	}, {
		key: 'hasIntersection',
		value: function hasIntersection() {
			return this.hasIntersection;
		}
	}, {
		key: 'isBoundaryPoint',
		value: function isBoundaryPoint() {
			var _this2 = this;

			for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
				args[_key3] = arguments[_key3];
			}

			switch (args.length) {
				case 2:
					if (args[0] instanceof _comVividsolutionsJtsAlgorithmLineIntersector2['default'] && args[1] instanceof Array) {
						return (function () {
							for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
								args[_key4] = arguments[_key4];
							}

							var li = args[0];
							var bdyNodes = args[1];

							if (bdyNodes === null) return false;
							if (_this2.isBoundaryPoint(li, bdyNodes[0])) return true;
							if (_this2.isBoundaryPoint(li, bdyNodes[1])) return true;
							return false;
						}).apply(undefined, args);
					} else if (args[0] instanceof _comVividsolutionsJtsAlgorithmLineIntersector2['default'] && (args[1].interfaces_ && args[1].interfaces_.indexOf(_javaUtilCollection2['default']) > -1)) {
						return (function () {
							for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
								args[_key5] = arguments[_key5];
							}

							var li = args[0];
							var bdyNodes = args[1];

							for (var i = bdyNodes.iterator(); i.hasNext();) {
								var node = i.next();
								var pt = node.getCoordinate();
								if (li.isIntersection(pt)) return true;
							}
							return false;
						}).apply(undefined, args);
					}
			}
		}
	}, {
		key: 'setBoundaryNodes',
		value: function setBoundaryNodes(bdyNodes0, bdyNodes1) {
			this.bdyNodes = [];
			this.bdyNodes[0] = bdyNodes0;
			this.bdyNodes[1] = bdyNodes1;
		}
	}, {
		key: 'addIntersections',
		value: function addIntersections(e0, segIndex0, e1, segIndex1) {
			if (e0 === e1 && segIndex0 === segIndex1) return null;
			this.numTests++;
			var p00 = e0.getCoordinates()[segIndex0];
			var p01 = e0.getCoordinates()[segIndex0 + 1];
			var p10 = e1.getCoordinates()[segIndex1];
			var p11 = e1.getCoordinates()[segIndex1 + 1];
			this.li.computeIntersection(p00, p01, p10, p11);
			if (this.li.hasIntersection()) {
				if (this.recordIsolated) {
					e0.setIsolated(false);
					e1.setIsolated(false);
				}
				this.numIntersections++;
				if (!this.isTrivialIntersection(e0, segIndex0, e1, segIndex1)) {
					this.hasIntersection = true;
					if (this.includeProper || !this.li.isProper()) {
						e0.addIntersections(this.li, segIndex0, 0);
						e1.addIntersections(this.li, segIndex1, 1);
					}
					if (this.li.isProper()) {
						this.properIntersectionPoint = this.li.getIntersection(0).clone();
						this.hasProper = true;
						if (!this.isBoundaryPoint(this.li, this.bdyNodes)) this.hasProperInterior = true;
					}
				}
			}
		}
	}, {
		key: 'interfaces_',
		get: function get() {
			return [];
		}
	}], [{
		key: 'isAdjacentSegments',
		value: function isAdjacentSegments(i1, i2) {
			return Math.abs(i1 - i2) === 1;
		}
	}]);

	return SegmentIntersector;
})();

exports['default'] = SegmentIntersector;
module.exports = exports['default'];

},{"com/vividsolutions/jts/algorithm/LineIntersector":5,"java/util/Collection":113}],73:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _comVividsolutionsJtsGeomgraphIndexMonotoneChain = require('com/vividsolutions/jts/geomgraph/index/MonotoneChain');

var _comVividsolutionsJtsGeomgraphIndexMonotoneChain2 = _interopRequireDefault(_comVividsolutionsJtsGeomgraphIndexMonotoneChain);

var _comVividsolutionsJtsGeomgraphIndexSweepLineEvent = require('com/vividsolutions/jts/geomgraph/index/SweepLineEvent');

var _comVividsolutionsJtsGeomgraphIndexSweepLineEvent2 = _interopRequireDefault(_comVividsolutionsJtsGeomgraphIndexSweepLineEvent);

var _comVividsolutionsJtsGeomgraphIndexEdgeSetIntersector = require('com/vividsolutions/jts/geomgraph/index/EdgeSetIntersector');

var _comVividsolutionsJtsGeomgraphIndexEdgeSetIntersector2 = _interopRequireDefault(_comVividsolutionsJtsGeomgraphIndexEdgeSetIntersector);

var _javaUtilCollections = require('java/util/Collections');

var _javaUtilCollections2 = _interopRequireDefault(_javaUtilCollections);

var _comVividsolutionsJtsGeomgraphIndexSegmentIntersector = require('com/vividsolutions/jts/geomgraph/index/SegmentIntersector');

var _comVividsolutionsJtsGeomgraphIndexSegmentIntersector2 = _interopRequireDefault(_comVividsolutionsJtsGeomgraphIndexSegmentIntersector);

var _javaUtilArrayList = require('java/util/ArrayList');

var _javaUtilArrayList2 = _interopRequireDefault(_javaUtilArrayList);

var _comVividsolutionsJtsGeomgraphEdge = require('com/vividsolutions/jts/geomgraph/Edge');

var _comVividsolutionsJtsGeomgraphEdge2 = _interopRequireDefault(_comVividsolutionsJtsGeomgraphEdge);

var _javaUtilList = require('java/util/List');

var _javaUtilList2 = _interopRequireDefault(_javaUtilList);

var SimpleMCSweepLineIntersector = (function (_EdgeSetIntersector) {
	_inherits(SimpleMCSweepLineIntersector, _EdgeSetIntersector);

	function SimpleMCSweepLineIntersector() {
		_classCallCheck(this, SimpleMCSweepLineIntersector);

		_get(Object.getPrototypeOf(SimpleMCSweepLineIntersector.prototype), 'constructor', this).call(this);
		this.init_.apply(this, arguments);
	}

	_createClass(SimpleMCSweepLineIntersector, [{
		key: 'init_',
		value: function init_() {
			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			_get(Object.getPrototypeOf(SimpleMCSweepLineIntersector.prototype), 'init_', this).call(this);
			this.events = new _javaUtilArrayList2['default']();
			this.nOverlaps = null;
			switch (args.length) {
				case 0:
					return (function () {
						for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
							args[_key2] = arguments[_key2];
						}
					}).apply(undefined, args);
			}
		}
	}, {
		key: 'processOverlaps',
		value: function processOverlaps(start, end, ev0, si) {
			var mc0 = ev0.getObject();
			for (var i = start; i < end; i++) {
				var ev1 = this.events.get(i);
				if (ev1.isInsert()) {
					var mc1 = ev1.getObject();
					if (!ev0.isSameLabel(ev1)) {
						mc0.computeIntersections(mc1, si);
						this.nOverlaps++;
					}
				}
			}
		}
	}, {
		key: 'prepareEvents',
		value: function prepareEvents() {
			_javaUtilCollections2['default'].sort(this.events);
			for (var i = 0; i < this.events.size(); i++) {
				var ev = this.events.get(i);
				if (ev.isDelete()) {
					ev.getInsertEvent().setDeleteEventIndex(i);
				}
			}
		}
	}, {
		key: 'computeIntersections',
		value: function computeIntersections() {
			var _this = this;

			for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
				args[_key3] = arguments[_key3];
			}

			switch (args.length) {
				case 1:
					return (function () {
						for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
							args[_key4] = arguments[_key4];
						}

						var si = args[0];

						_this.nOverlaps = 0;
						_this.prepareEvents();
						for (var i = 0; i < _this.events.size(); i++) {
							var ev = _this.events.get(i);
							if (ev.isInsert()) {
								_this.processOverlaps(i, ev.getDeleteEventIndex(), ev, si);
							}
						}
					}).apply(undefined, args);
				case 3:
					if (typeof args[2] === "boolean" && (args[0].interfaces_ && args[0].interfaces_.indexOf(_javaUtilList2['default']) > -1 && args[1] instanceof _comVividsolutionsJtsGeomgraphIndexSegmentIntersector2['default'])) {
						return (function () {
							for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
								args[_key5] = arguments[_key5];
							}

							var edges = args[0];
							var si = args[1];
							var testAllSegments = args[2];

							if (testAllSegments) _this.add(edges, null);else _this.add(edges);
							_this.computeIntersections(si);
						}).apply(undefined, args);
					} else if (args[2] instanceof _comVividsolutionsJtsGeomgraphIndexSegmentIntersector2['default'] && (args[0].interfaces_ && args[0].interfaces_.indexOf(_javaUtilList2['default']) > -1 && (args[1].interfaces_ && args[1].interfaces_.indexOf(_javaUtilList2['default']) > -1))) {
						return (function () {
							for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
								args[_key6] = arguments[_key6];
							}

							var edges0 = args[0];
							var edges1 = args[1];
							var si = args[2];

							_this.add(edges0, edges0);
							_this.add(edges1, edges1);
							_this.computeIntersections(si);
						}).apply(undefined, args);
					}
			}
		}
	}, {
		key: 'add',
		value: function add() {
			var _this2 = this;

			for (var _len7 = arguments.length, args = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
				args[_key7] = arguments[_key7];
			}

			switch (args.length) {
				case 2:
					if (args[0].interfaces_ && args[0].interfaces_.indexOf(_javaUtilList2['default']) > -1 && args[1] instanceof Object) {
						return (function () {
							for (var _len8 = arguments.length, args = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
								args[_key8] = arguments[_key8];
							}

							var edges = args[0];
							var edgeSet = args[1];

							for (var i = edges.iterator(); i.hasNext();) {
								var edge = i.next();
								_this2.add(edge, edgeSet);
							}
						}).apply(undefined, args);
					} else if (args[0] instanceof _comVividsolutionsJtsGeomgraphEdge2['default'] && args[1] instanceof Object) {
						return (function () {
							for (var _len9 = arguments.length, args = Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
								args[_key9] = arguments[_key9];
							}

							var edge = args[0];
							var edgeSet = args[1];

							var mce = edge.getMonotoneChainEdge();
							var startIndex = mce.getStartIndexes();
							for (var i = 0; i < startIndex.length - 1; i++) {
								var mc = new _comVividsolutionsJtsGeomgraphIndexMonotoneChain2['default'](mce, i);
								var insertEvent = new _comVividsolutionsJtsGeomgraphIndexSweepLineEvent2['default'](edgeSet, mce.getMinX(i), mc);
								_this2.events.add(insertEvent);
								_this2.events.add(new _comVividsolutionsJtsGeomgraphIndexSweepLineEvent2['default'](mce.getMaxX(i), insertEvent));
							}
						}).apply(undefined, args);
					}
				case 1:
					return (function () {
						for (var _len10 = arguments.length, args = Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
							args[_key10] = arguments[_key10];
						}

						var edges = args[0];

						for (var i = edges.iterator(); i.hasNext();) {
							var edge = i.next();
							_this2.add(edge, edge);
						}
					}).apply(undefined, args);
			}
		}
	}, {
		key: 'interfaces_',
		get: function get() {
			return [];
		}
	}]);

	return SimpleMCSweepLineIntersector;
})(_comVividsolutionsJtsGeomgraphIndexEdgeSetIntersector2['default']);

exports['default'] = SimpleMCSweepLineIntersector;
module.exports = exports['default'];

},{"com/vividsolutions/jts/geomgraph/Edge":53,"com/vividsolutions/jts/geomgraph/index/EdgeSetIntersector":68,"com/vividsolutions/jts/geomgraph/index/MonotoneChain":69,"com/vividsolutions/jts/geomgraph/index/SegmentIntersector":72,"com/vividsolutions/jts/geomgraph/index/SweepLineEvent":74,"java/util/ArrayList":111,"java/util/Collections":114,"java/util/List":119}],74:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _javaLangComparable = require('java/lang/Comparable');

var _javaLangComparable2 = _interopRequireDefault(_javaLangComparable);

var SweepLineEvent = (function () {
	function SweepLineEvent() {
		_classCallCheck(this, SweepLineEvent);

		this.init_.apply(this, arguments);
	}

	_createClass(SweepLineEvent, [{
		key: 'init_',
		value: function init_() {
			var _this = this;

			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			this.label = null;
			this.xValue = null;
			this.eventType = null;
			this.insertEvent = null;
			this.deleteEventIndex = null;
			this.obj = null;
			switch (args.length) {
				case 2:
					return (function () {
						for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
							args[_key2] = arguments[_key2];
						}

						var x = args[0];
						var insertEvent = args[1];

						_this.eventType = SweepLineEvent.DELETE;
						_this.xValue = x;
						_this.insertEvent = insertEvent;
					}).apply(undefined, args);
				case 3:
					return (function () {
						for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
							args[_key3] = arguments[_key3];
						}

						var label = args[0];
						var x = args[1];
						var obj = args[2];

						_this.eventType = SweepLineEvent.INSERT;
						_this.label = label;
						_this.xValue = x;
						_this.obj = obj;
					}).apply(undefined, args);
			}
		}
	}, {
		key: 'isDelete',
		value: function isDelete() {
			return this.eventType === SweepLineEvent.DELETE;
		}
	}, {
		key: 'setDeleteEventIndex',
		value: function setDeleteEventIndex(deleteEventIndex) {
			this.deleteEventIndex = deleteEventIndex;
		}
	}, {
		key: 'getObject',
		value: function getObject() {
			return this.obj;
		}
	}, {
		key: 'compareTo',
		value: function compareTo(o) {
			var pe = o;
			if (this.xValue < pe.xValue) return -1;
			if (this.xValue > pe.xValue) return 1;
			if (this.eventType < pe.eventType) return -1;
			if (this.eventType > pe.eventType) return 1;
			return 0;
		}
	}, {
		key: 'getInsertEvent',
		value: function getInsertEvent() {
			return this.insertEvent;
		}
	}, {
		key: 'isInsert',
		value: function isInsert() {
			return this.eventType === SweepLineEvent.INSERT;
		}
	}, {
		key: 'isSameLabel',
		value: function isSameLabel(ev) {
			if (this.label === null) return false;
			return this.label === ev.label;
		}
	}, {
		key: 'getDeleteEventIndex',
		value: function getDeleteEventIndex() {
			return this.deleteEventIndex;
		}
	}, {
		key: 'interfaces_',
		get: function get() {
			return [_javaLangComparable2['default']];
		}
	}]);

	return SweepLineEvent;
})();

exports['default'] = SweepLineEvent;

SweepLineEvent.INSERT = 1;
SweepLineEvent.DELETE = 2;
module.exports = exports['default'];

},{"java/lang/Comparable":105}],75:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _comVividsolutionsJtsIndexItemVisitor = require('com/vividsolutions/jts/index/ItemVisitor');

var _comVividsolutionsJtsIndexItemVisitor2 = _interopRequireDefault(_comVividsolutionsJtsIndexItemVisitor);

var _javaUtilArrayList = require('java/util/ArrayList');

var _javaUtilArrayList2 = _interopRequireDefault(_javaUtilArrayList);

var ArrayListVisitor = (function () {
	function ArrayListVisitor() {
		_classCallCheck(this, ArrayListVisitor);

		this.init_.apply(this, arguments);
	}

	_createClass(ArrayListVisitor, [{
		key: 'init_',
		value: function init_() {
			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			this.items = new _javaUtilArrayList2['default']();
			switch (args.length) {
				case 0:
					return (function () {
						for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
							args[_key2] = arguments[_key2];
						}
					}).apply(undefined, args);
			}
		}
	}, {
		key: 'visitItem',
		value: function visitItem(item) {
			this.items.add(item);
		}
	}, {
		key: 'getItems',
		value: function getItems() {
			return this.items;
		}
	}, {
		key: 'interfaces_',
		get: function get() {
			return [_comVividsolutionsJtsIndexItemVisitor2['default']];
		}
	}]);

	return ArrayListVisitor;
})();

exports['default'] = ArrayListVisitor;
module.exports = exports['default'];

},{"com/vividsolutions/jts/index/ItemVisitor":76,"java/util/ArrayList":111}],76:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ItemVisitor = (function () {
	function ItemVisitor() {
		_classCallCheck(this, ItemVisitor);

		this.init_.apply(this, arguments);
	}

	_createClass(ItemVisitor, [{
		key: "init_",
		value: function init_() {
			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			switch (args.length) {}
		}
	}, {
		key: "visitItem",
		value: function visitItem(item) {}
	}, {
		key: "interfaces_",
		get: function get() {
			return [];
		}
	}]);

	return ItemVisitor;
})();

exports["default"] = ItemVisitor;
module.exports = exports["default"];

},{}],77:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _comVividsolutionsJtsIndexIntervalrtreeIntervalRTreeNode = require('com/vividsolutions/jts/index/intervalrtree/IntervalRTreeNode');

var _comVividsolutionsJtsIndexIntervalrtreeIntervalRTreeNode2 = _interopRequireDefault(_comVividsolutionsJtsIndexIntervalrtreeIntervalRTreeNode);

var IntervalRTreeBranchNode = (function (_IntervalRTreeNode) {
	_inherits(IntervalRTreeBranchNode, _IntervalRTreeNode);

	function IntervalRTreeBranchNode() {
		_classCallCheck(this, IntervalRTreeBranchNode);

		_get(Object.getPrototypeOf(IntervalRTreeBranchNode.prototype), 'constructor', this).call(this);
		this.init_.apply(this, arguments);
	}

	_createClass(IntervalRTreeBranchNode, [{
		key: 'init_',
		value: function init_() {
			var _this = this;

			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			_get(Object.getPrototypeOf(IntervalRTreeBranchNode.prototype), 'init_', this).call(this);
			this.node1 = null;
			this.node2 = null;
			switch (args.length) {
				case 2:
					return (function () {
						for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
							args[_key2] = arguments[_key2];
						}

						var n1 = args[0];
						var n2 = args[1];

						_this.node1 = n1;
						_this.node2 = n2;
						_this.buildExtent(_this.node1, _this.node2);
					}).apply(undefined, args);
			}
		}
	}, {
		key: 'buildExtent',
		value: function buildExtent(n1, n2) {
			this.min = Math.min(n1.min, n2.min);
			this.max = Math.max(n1.max, n2.max);
		}
	}, {
		key: 'query',
		value: function query(queryMin, queryMax, visitor) {
			if (!this.intersects(queryMin, queryMax)) {
				return null;
			}
			if (this.node1 !== null) this.node1.query(queryMin, queryMax, visitor);
			if (this.node2 !== null) this.node2.query(queryMin, queryMax, visitor);
		}
	}, {
		key: 'interfaces_',
		get: function get() {
			return [];
		}
	}]);

	return IntervalRTreeBranchNode;
})(_comVividsolutionsJtsIndexIntervalrtreeIntervalRTreeNode2['default']);

exports['default'] = IntervalRTreeBranchNode;
module.exports = exports['default'];

},{"com/vividsolutions/jts/index/intervalrtree/IntervalRTreeNode":79}],78:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _comVividsolutionsJtsIndexIntervalrtreeIntervalRTreeNode = require('com/vividsolutions/jts/index/intervalrtree/IntervalRTreeNode');

var _comVividsolutionsJtsIndexIntervalrtreeIntervalRTreeNode2 = _interopRequireDefault(_comVividsolutionsJtsIndexIntervalrtreeIntervalRTreeNode);

var IntervalRTreeLeafNode = (function (_IntervalRTreeNode) {
	_inherits(IntervalRTreeLeafNode, _IntervalRTreeNode);

	function IntervalRTreeLeafNode() {
		_classCallCheck(this, IntervalRTreeLeafNode);

		_get(Object.getPrototypeOf(IntervalRTreeLeafNode.prototype), 'constructor', this).call(this);
		this.init_.apply(this, arguments);
	}

	_createClass(IntervalRTreeLeafNode, [{
		key: 'init_',
		value: function init_() {
			var _this = this;

			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			_get(Object.getPrototypeOf(IntervalRTreeLeafNode.prototype), 'init_', this).call(this);
			this.item = null;
			switch (args.length) {
				case 3:
					return (function () {
						for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
							args[_key2] = arguments[_key2];
						}

						var min = args[0];
						var max = args[1];
						var item = args[2];

						_this.min = min;
						_this.max = max;
						_this.item = item;
					}).apply(undefined, args);
			}
		}
	}, {
		key: 'query',
		value: function query(queryMin, queryMax, visitor) {
			if (!this.intersects(queryMin, queryMax)) return null;
			visitor.visitItem(this.item);
		}
	}, {
		key: 'interfaces_',
		get: function get() {
			return [];
		}
	}]);

	return IntervalRTreeLeafNode;
})(_comVividsolutionsJtsIndexIntervalrtreeIntervalRTreeNode2['default']);

exports['default'] = IntervalRTreeLeafNode;
module.exports = exports['default'];

},{"com/vividsolutions/jts/index/intervalrtree/IntervalRTreeNode":79}],79:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _comVividsolutionsJtsIoWKTWriter = require('com/vividsolutions/jts/io/WKTWriter');

var _comVividsolutionsJtsIoWKTWriter2 = _interopRequireDefault(_comVividsolutionsJtsIoWKTWriter);

var _comVividsolutionsJtsGeomCoordinate = require('com/vividsolutions/jts/geom/Coordinate');

var _comVividsolutionsJtsGeomCoordinate2 = _interopRequireDefault(_comVividsolutionsJtsGeomCoordinate);

var _javaLangDouble = require('java/lang/Double');

var _javaLangDouble2 = _interopRequireDefault(_javaLangDouble);

var _javaUtilComparator = require('java/util/Comparator');

var _javaUtilComparator2 = _interopRequireDefault(_javaUtilComparator);

var IntervalRTreeNode = (function () {
	function IntervalRTreeNode() {
		_classCallCheck(this, IntervalRTreeNode);

		this.init_.apply(this, arguments);
	}

	_createClass(IntervalRTreeNode, [{
		key: 'init_',
		value: function init_() {
			this.min = _javaLangDouble2['default'].POSITIVE_INFINITY;
			this.max = _javaLangDouble2['default'].NEGATIVE_INFINITY;

			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			switch (args.length) {}
		}
	}, {
		key: 'getMin',
		value: function getMin() {
			return this.min;
		}
	}, {
		key: 'intersects',
		value: function intersects(queryMin, queryMax) {
			if (this.min > queryMax || this.max < queryMin) return false;
			return true;
		}
	}, {
		key: 'getMax',
		value: function getMax() {
			return this.max;
		}
	}, {
		key: 'toString',
		value: function toString() {
			return _comVividsolutionsJtsIoWKTWriter2['default'].toLineString(new _comVividsolutionsJtsGeomCoordinate2['default'](this.min, 0), new _comVividsolutionsJtsGeomCoordinate2['default'](this.max, 0));
		}
	}, {
		key: 'interfaces_',
		get: function get() {
			return [];
		}
	}]);

	return IntervalRTreeNode;
})();

exports['default'] = IntervalRTreeNode;

var NodeComparator = (function () {
	function NodeComparator() {
		_classCallCheck(this, NodeComparator);

		this.init_.apply(this, arguments);
	}

	_createClass(NodeComparator, [{
		key: 'init_',
		value: function init_() {
			for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
				args[_key2] = arguments[_key2];
			}

			switch (args.length) {}
		}
	}, {
		key: 'compare',
		value: function compare(o1, o2) {
			var n1 = o1;
			var n2 = o2;
			var mid1 = (n1.min + n1.max) / 2;
			var mid2 = (n2.min + n2.max) / 2;
			if (mid1 < mid2) return -1;
			if (mid1 > mid2) return 1;
			return 0;
		}
	}, {
		key: 'interfaces_',
		get: function get() {
			return [_javaUtilComparator2['default']];
		}
	}]);

	return NodeComparator;
})();

IntervalRTreeNode.NodeComparator = NodeComparator;
module.exports = exports['default'];

},{"com/vividsolutions/jts/geom/Coordinate":15,"com/vividsolutions/jts/io/WKTWriter":81,"java/lang/Double":106,"java/util/Comparator":115}],80:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _comVividsolutionsJtsIoWKTWriter = require('com/vividsolutions/jts/io/WKTWriter');

var _comVividsolutionsJtsIoWKTWriter2 = _interopRequireDefault(_comVividsolutionsJtsIoWKTWriter);

var _comVividsolutionsJtsGeomCoordinate = require('com/vividsolutions/jts/geom/Coordinate');

var _comVividsolutionsJtsGeomCoordinate2 = _interopRequireDefault(_comVividsolutionsJtsGeomCoordinate);

var _comVividsolutionsJtsIndexIntervalrtreeIntervalRTreeLeafNode = require('com/vividsolutions/jts/index/intervalrtree/IntervalRTreeLeafNode');

var _comVividsolutionsJtsIndexIntervalrtreeIntervalRTreeLeafNode2 = _interopRequireDefault(_comVividsolutionsJtsIndexIntervalrtreeIntervalRTreeLeafNode);

var _javaUtilCollections = require('java/util/Collections');

var _javaUtilCollections2 = _interopRequireDefault(_javaUtilCollections);

var _javaUtilArrayList = require('java/util/ArrayList');

var _javaUtilArrayList2 = _interopRequireDefault(_javaUtilArrayList);

var _comVividsolutionsJtsIndexIntervalrtreeIntervalRTreeBranchNode = require('com/vividsolutions/jts/index/intervalrtree/IntervalRTreeBranchNode');

var _comVividsolutionsJtsIndexIntervalrtreeIntervalRTreeBranchNode2 = _interopRequireDefault(_comVividsolutionsJtsIndexIntervalrtreeIntervalRTreeBranchNode);

var SortedPackedIntervalRTree = (function () {
	function SortedPackedIntervalRTree() {
		_classCallCheck(this, SortedPackedIntervalRTree);

		this.init_.apply(this, arguments);
	}

	_createClass(SortedPackedIntervalRTree, [{
		key: 'init_',
		value: function init_() {
			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			this.leaves = new _javaUtilArrayList2['default']();
			this.root = null;
			this.level = 0;
			switch (args.length) {
				case 0:
					return (function () {
						for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
							args[_key2] = arguments[_key2];
						}
					}).apply(undefined, args);
			}
		}
	}, {
		key: 'buildTree',
		value: function buildTree() {
			_javaUtilCollections2['default'].sort(this.leaves, new IntervalRTreeNode.NodeComparator());
			var src = this.leaves;
			var temp = null;
			var dest = new _javaUtilArrayList2['default']();
			while (true) {
				this.buildLevel(src, dest);
				if (dest.size() === 1) return dest.get(0);
				temp = src;
				src = dest;
				dest = temp;
			}
		}
	}, {
		key: 'insert',
		value: function insert(min, max, item) {
			if (this.root !== null) throw new IllegalStateException("Index cannot be added to once it has been queried");
			this.leaves.add(new _comVividsolutionsJtsIndexIntervalrtreeIntervalRTreeLeafNode2['default'](min, max, item));
		}
	}, {
		key: 'query',
		value: function query(min, max, visitor) {
			this.init();
			this.root.query(min, max, visitor);
		}
	}, {
		key: 'buildRoot',
		value: function buildRoot() {
			if (this.root !== null) return null;
			this.root = this.buildTree();
		}
	}, {
		key: 'printNode',
		value: function printNode(node) {
			System.out.println(_comVividsolutionsJtsIoWKTWriter2['default'].toLineString(new _comVividsolutionsJtsGeomCoordinate2['default'](node.min, this.level), new _comVividsolutionsJtsGeomCoordinate2['default'](node.max, this.level)));
		}
	}, {
		key: 'init',
		value: function init() {
			if (this.root !== null) return null;
			this.buildRoot();
		}
	}, {
		key: 'buildLevel',
		value: function buildLevel(src, dest) {
			this.level++;
			dest.clear();
			for (var i = 0; i < src.size(); i += 2) {
				var n1 = src.get(i);
				var n2 = i + 1 < src.size() ? src.get(i) : null;
				if (n2 === null) {
					dest.add(n1);
				} else {
					var node = new _comVividsolutionsJtsIndexIntervalrtreeIntervalRTreeBranchNode2['default'](src.get(i), src.get(i + 1));
					dest.add(node);
				}
			}
		}
	}, {
		key: 'interfaces_',
		get: function get() {
			return [];
		}
	}]);

	return SortedPackedIntervalRTree;
})();

exports['default'] = SortedPackedIntervalRTree;
module.exports = exports['default'];

},{"com/vividsolutions/jts/geom/Coordinate":15,"com/vividsolutions/jts/index/intervalrtree/IntervalRTreeBranchNode":77,"com/vividsolutions/jts/index/intervalrtree/IntervalRTreeLeafNode":78,"com/vividsolutions/jts/io/WKTWriter":81,"java/util/ArrayList":111,"java/util/Collections":114}],81:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _comVividsolutionsJtsGeomLineString = require('com/vividsolutions/jts/geom/LineString');

var _comVividsolutionsJtsGeomLineString2 = _interopRequireDefault(_comVividsolutionsJtsGeomLineString);

var _comVividsolutionsJtsGeomPoint = require('com/vividsolutions/jts/geom/Point');

var _comVividsolutionsJtsGeomPoint2 = _interopRequireDefault(_comVividsolutionsJtsGeomPoint);

var _comVividsolutionsJtsGeomPolygon = require('com/vividsolutions/jts/geom/Polygon');

var _comVividsolutionsJtsGeomPolygon2 = _interopRequireDefault(_comVividsolutionsJtsGeomPolygon);

var _javaTextDecimalFormat = require('java/text/DecimalFormat');

var _javaTextDecimalFormat2 = _interopRequireDefault(_javaTextDecimalFormat);

var _comVividsolutionsJtsGeomMultiPoint = require('com/vividsolutions/jts/geom/MultiPoint');

var _comVividsolutionsJtsGeomMultiPoint2 = _interopRequireDefault(_comVividsolutionsJtsGeomMultiPoint);

var _comVividsolutionsJtsGeomLinearRing = require('com/vividsolutions/jts/geom/LinearRing');

var _comVividsolutionsJtsGeomLinearRing2 = _interopRequireDefault(_comVividsolutionsJtsGeomLinearRing);

var _javaLangDouble = require('java/lang/Double');

var _javaLangDouble2 = _interopRequireDefault(_javaLangDouble);

var _javaIoStringWriter = require('java/io/StringWriter');

var _javaIoStringWriter2 = _interopRequireDefault(_javaIoStringWriter);

var _javaTextDecimalFormatSymbols = require('java/text/DecimalFormatSymbols');

var _javaTextDecimalFormatSymbols2 = _interopRequireDefault(_javaTextDecimalFormatSymbols);

var _comVividsolutionsJtsGeomMultiPolygon = require('com/vividsolutions/jts/geom/MultiPolygon');

var _comVividsolutionsJtsGeomMultiPolygon2 = _interopRequireDefault(_comVividsolutionsJtsGeomMultiPolygon);

var _comVividsolutionsJtsGeomGeometryCollection = require('com/vividsolutions/jts/geom/GeometryCollection');

var _comVividsolutionsJtsGeomGeometryCollection2 = _interopRequireDefault(_comVividsolutionsJtsGeomGeometryCollection);

var _comVividsolutionsJtsUtilAssert = require('com/vividsolutions/jts/util/Assert');

var _comVividsolutionsJtsUtilAssert2 = _interopRequireDefault(_comVividsolutionsJtsUtilAssert);

var _javaIoIOException = require('java/io/IOException');

var _javaIoIOException2 = _interopRequireDefault(_javaIoIOException);

var _comVividsolutionsJtsGeomMultiLineString = require('com/vividsolutions/jts/geom/MultiLineString');

var _comVividsolutionsJtsGeomMultiLineString2 = _interopRequireDefault(_comVividsolutionsJtsGeomMultiLineString);

var WKTWriter = (function () {
	function WKTWriter() {
		_classCallCheck(this, WKTWriter);

		this.init_.apply(this, arguments);
	}

	_createClass(WKTWriter, [{
		key: 'init_',
		value: function init_() {
			var _this = this;

			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			this.outputDimension = 2;
			this.formatter = null;
			this.isFormatted = false;
			this.useFormatting = false;
			this.level = 0;
			this.coordsPerLine = -1;
			this.indentTabStr = "  ";
			switch (args.length) {
				case 1:
					return (function () {
						for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
							args[_key2] = arguments[_key2];
						}

						var outputDimension = args[0];

						_this.outputDimension = outputDimension;
						if (outputDimension < 2 || outputDimension > 3) throw new IllegalArgumentException("Invalid output dimension (must be 2 or 3)");
					}).apply(undefined, args);
				case 0:
					return (function () {
						for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
							args[_key3] = arguments[_key3];
						}
					}).apply(undefined, args);
			}
		}
	}, {
		key: 'appendPointText',
		value: function appendPointText(coordinate, level, writer, precisionModel) {
			if (coordinate === null) {
				writer.write("EMPTY");
			} else {
				writer.write("(");
				this.appendCoordinate(coordinate, writer);
				writer.write(")");
			}
		}
	}, {
		key: 'appendLinearRingTaggedText',
		value: function appendLinearRingTaggedText(linearRing, level, writer) {
			writer.write("LINEARRING ");
			this.appendLineStringText(linearRing, level, false, writer);
		}
	}, {
		key: 'appendMultiPointTaggedText',
		value: function appendMultiPointTaggedText(multipoint, level, writer) {
			writer.write("MULTIPOINT ");
			this.appendMultiPointText(multipoint, level, writer);
		}
	}, {
		key: 'appendMultiPolygonText',
		value: function appendMultiPolygonText(multiPolygon, level, writer) {
			if (multiPolygon.isEmpty()) {
				writer.write("EMPTY");
			} else {
				var level2 = level;
				var doIndent = false;
				writer.write("(");
				for (var i = 0; i < multiPolygon.getNumGeometries(); i++) {
					if (i > 0) {
						writer.write(", ");
						level2 = level + 1;
						doIndent = true;
					}
					this.appendPolygonText(multiPolygon.getGeometryN(i), level2, doIndent, writer);
				}
				writer.write(")");
			}
		}
	}, {
		key: 'appendMultiPointText',
		value: function appendMultiPointText(multiPoint, level, writer) {
			if (multiPoint.isEmpty()) {
				writer.write("EMPTY");
			} else {
				writer.write("(");
				for (var i = 0; i < multiPoint.getNumGeometries(); i++) {
					if (i > 0) {
						writer.write(", ");
						this.indentCoords(i, level + 1, writer);
					}
					writer.write("(");
					this.appendCoordinate(multiPoint.getGeometryN(i).getCoordinate(), writer);
					writer.write(")");
				}
				writer.write(")");
			}
		}
	}, {
		key: 'appendMultiLineStringTaggedText',
		value: function appendMultiLineStringTaggedText(multiLineString, level, writer) {
			writer.write("MULTILINESTRING ");
			this.appendMultiLineStringText(multiLineString, level, false, writer);
		}
	}, {
		key: 'indent',
		value: function indent(level, writer) {
			if (!this.useFormatting || level <= 0) return null;
			writer.write("\n");
			for (var i = 0; i < level; i++) {
				writer.write(this.indentTabStr);
			}
		}
	}, {
		key: 'indentCoords',
		value: function indentCoords(coordIndex, level, writer) {
			if (this.coordsPerLine <= 0 || coordIndex % this.coordsPerLine !== 0) return null;
			this.indent(level, writer);
		}
	}, {
		key: 'appendGeometryCollectionText',
		value: function appendGeometryCollectionText(geometryCollection, level, writer) {
			if (geometryCollection.isEmpty()) {
				writer.write("EMPTY");
			} else {
				var level2 = level;
				writer.write("(");
				for (var i = 0; i < geometryCollection.getNumGeometries(); i++) {
					if (i > 0) {
						writer.write(", ");
						level2 = level + 1;
					}
					this.appendGeometryTaggedText(geometryCollection.getGeometryN(i), level2, writer);
				}
				writer.write(")");
			}
		}
	}, {
		key: 'appendGeometryTaggedText',
		value: function appendGeometryTaggedText(geometry, level, writer) {
			this.indent(level, writer);
			if (geometry instanceof _comVividsolutionsJtsGeomPoint2['default']) {
				var point = geometry;
				this.appendPointTaggedText(point.getCoordinate(), level, writer, point.getPrecisionModel());
			} else if (geometry instanceof _comVividsolutionsJtsGeomLinearRing2['default']) {
				this.appendLinearRingTaggedText(geometry, level, writer);
			} else if (geometry instanceof _comVividsolutionsJtsGeomLineString2['default']) {
				this.appendLineStringTaggedText(geometry, level, writer);
			} else if (geometry instanceof _comVividsolutionsJtsGeomPolygon2['default']) {
				this.appendPolygonTaggedText(geometry, level, writer);
			} else if (geometry instanceof _comVividsolutionsJtsGeomMultiPoint2['default']) {
				this.appendMultiPointTaggedText(geometry, level, writer);
			} else if (geometry instanceof _comVividsolutionsJtsGeomMultiLineString2['default']) {
				this.appendMultiLineStringTaggedText(geometry, level, writer);
			} else if (geometry instanceof _comVividsolutionsJtsGeomMultiPolygon2['default']) {
				this.appendMultiPolygonTaggedText(geometry, level, writer);
			} else if (geometry instanceof _comVividsolutionsJtsGeomGeometryCollection2['default']) {
				this.appendGeometryCollectionTaggedText(geometry, level, writer);
			} else {
				_comVividsolutionsJtsUtilAssert2['default'].shouldNeverReachHere("Unsupported Geometry implementation:" + geometry.getClass());
			}
		}
	}, {
		key: 'appendPointTaggedText',
		value: function appendPointTaggedText(coordinate, level, writer, precisionModel) {
			writer.write("POINT ");
			this.appendPointText(coordinate, level, writer, precisionModel);
		}
	}, {
		key: 'setTab',
		value: function setTab(size) {
			if (size <= 0) throw new IllegalArgumentException("Tab count must be positive");
			this.indentTabStr = WKTWriter.stringOfChar(' ', size);
		}
	}, {
		key: 'appendCoordinate',
		value: function appendCoordinate() {
			var _this2 = this;

			for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
				args[_key4] = arguments[_key4];
			}

			switch (args.length) {
				case 2:
					return (function () {
						for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
							args[_key5] = arguments[_key5];
						}

						var coordinate = args[0];
						var writer = args[1];

						writer.write(_this2.writeNumber(coordinate.x) + (" " + _this2.writeNumber(coordinate.y)));
						if (_this2.outputDimension >= 3 && !_javaLangDouble2['default'].isNaN(coordinate.z)) {
							writer.write(" ");
							writer.write(_this2.writeNumber(coordinate.z));
						}
					}).apply(undefined, args);
				case 3:
					return (function () {
						for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
							args[_key6] = arguments[_key6];
						}

						var seq = args[0];
						var i = args[1];
						var writer = args[2];

						writer.write(_this2.writeNumber(seq.getX(i)) + (" " + _this2.writeNumber(seq.getY(i))));
						if (_this2.outputDimension >= 3 && seq.getDimension() >= 3) {
							var z = seq.getOrdinate(i, 3);
							if (!_javaLangDouble2['default'].isNaN(z)) {
								writer.write(" ");
								writer.write(_this2.writeNumber(z));
							}
						}
					}).apply(undefined, args);
			}
		}
	}, {
		key: 'appendMultiPolygonTaggedText',
		value: function appendMultiPolygonTaggedText(multiPolygon, level, writer) {
			writer.write("MULTIPOLYGON ");
			this.appendMultiPolygonText(multiPolygon, level, writer);
		}
	}, {
		key: 'writeNumber',
		value: function writeNumber(d) {
			return this.formatter.format(d);
		}
	}, {
		key: 'appendPolygonText',
		value: function appendPolygonText(polygon, level, indentFirst, writer) {
			if (polygon.isEmpty()) {
				writer.write("EMPTY");
			} else {
				if (indentFirst) this.indent(level, writer);
				writer.write("(");
				this.appendLineStringText(polygon.getExteriorRing(), level, false, writer);
				for (var i = 0; i < polygon.getNumInteriorRing(); i++) {
					writer.write(", ");
					this.appendLineStringText(polygon.getInteriorRingN(i), level + 1, true, writer);
				}
				writer.write(")");
			}
		}
	}, {
		key: 'appendGeometryCollectionTaggedText',
		value: function appendGeometryCollectionTaggedText(geometryCollection, level, writer) {
			writer.write("GEOMETRYCOLLECTION ");
			this.appendGeometryCollectionText(geometryCollection, level, writer);
		}
	}, {
		key: 'setMaxCoordinatesPerLine',
		value: function setMaxCoordinatesPerLine(coordsPerLine) {
			this.coordsPerLine = coordsPerLine;
		}
	}, {
		key: 'appendLineStringText',
		value: function appendLineStringText(lineString, level, doIndent, writer) {
			if (lineString.isEmpty()) {
				writer.write("EMPTY");
			} else {
				if (doIndent) this.indent(level, writer);
				writer.write("(");
				for (var i = 0; i < lineString.getNumPoints(); i++) {
					if (i > 0) {
						writer.write(", ");
						if (this.coordsPerLine > 0 && i % this.coordsPerLine === 0) {
							this.indent(level + 1, writer);
						}
					}
					this.appendCoordinate(lineString.getCoordinateN(i), writer);
				}
				writer.write(")");
			}
		}
	}, {
		key: 'appendPolygonTaggedText',
		value: function appendPolygonTaggedText(polygon, level, writer) {
			writer.write("POLYGON ");
			this.appendPolygonText(polygon, level, false, writer);
		}
	}, {
		key: 'writeFormatted',
		value: function writeFormatted() {
			var _this3 = this;

			for (var _len7 = arguments.length, args = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
				args[_key7] = arguments[_key7];
			}

			switch (args.length) {
				case 2:
					return (function () {
						for (var _len8 = arguments.length, args = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
							args[_key8] = arguments[_key8];
						}

						var geometry = args[0];
						var writer = args[1];

						_this3.writeFormatted(geometry, true, writer);
					}).apply(undefined, args);
				case 1:
					return (function () {
						for (var _len9 = arguments.length, args = Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
							args[_key9] = arguments[_key9];
						}

						var geometry = args[0];

						var sw = new _javaIoStringWriter2['default']();
						try {
							_this3.writeFormatted(geometry, true, sw);
						} catch (e) {
							if (e instanceof _javaIoIOException2['default']) {
								_comVividsolutionsJtsUtilAssert2['default'].shouldNeverReachHere();
							}
						} finally {}
						return sw.toString();
					}).apply(undefined, args);
				case 3:
					return (function () {
						for (var _len10 = arguments.length, args = Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
							args[_key10] = arguments[_key10];
						}

						var geometry = args[0];
						var useFormatting = args[1];
						var writer = args[2];

						_this3.useFormatting = useFormatting;
						_this3.formatter = WKTWriter.createFormatter(geometry.getPrecisionModel());
						_this3.appendGeometryTaggedText(geometry, 0, writer);
					}).apply(undefined, args);
			}
		}
	}, {
		key: 'appendMultiLineStringText',
		value: function appendMultiLineStringText(multiLineString, level, indentFirst, writer) {
			if (multiLineString.isEmpty()) {
				writer.write("EMPTY");
			} else {
				var level2 = level;
				var doIndent = indentFirst;
				writer.write("(");
				for (var i = 0; i < multiLineString.getNumGeometries(); i++) {
					if (i > 0) {
						writer.write(", ");
						level2 = level + 1;
						doIndent = true;
					}
					this.appendLineStringText(multiLineString.getGeometryN(i), level2, doIndent, writer);
				}
				writer.write(")");
			}
		}
	}, {
		key: 'setFormatted',
		value: function setFormatted(isFormatted) {
			this.isFormatted = isFormatted;
		}
	}, {
		key: 'appendLineStringTaggedText',
		value: function appendLineStringTaggedText(lineString, level, writer) {
			writer.write("LINESTRING ");
			this.appendLineStringText(lineString, level, false, writer);
		}
	}, {
		key: 'write',
		value: function write() {
			var _this4 = this;

			for (var _len11 = arguments.length, args = Array(_len11), _key11 = 0; _key11 < _len11; _key11++) {
				args[_key11] = arguments[_key11];
			}

			switch (args.length) {
				case 2:
					return (function () {
						for (var _len12 = arguments.length, args = Array(_len12), _key12 = 0; _key12 < _len12; _key12++) {
							args[_key12] = arguments[_key12];
						}

						var geometry = args[0];
						var writer = args[1];

						_this4.writeFormatted(geometry, false, writer);
					}).apply(undefined, args);
				case 1:
					return (function () {
						for (var _len13 = arguments.length, args = Array(_len13), _key13 = 0; _key13 < _len13; _key13++) {
							args[_key13] = arguments[_key13];
						}

						var geometry = args[0];

						var sw = new _javaIoStringWriter2['default']();
						try {
							_this4.writeFormatted(geometry, _this4.isFormatted, sw);
						} catch (e) {
							if (e instanceof _javaIoIOException2['default']) {
								_comVividsolutionsJtsUtilAssert2['default'].shouldNeverReachHere();
							}
						} finally {}
						return sw.toString();
					}).apply(undefined, args);
			}
		}
	}, {
		key: 'appendSequenceText',
		value: function appendSequenceText(seq, level, doIndent, writer) {
			if (seq.size() === 0) {
				writer.write("EMPTY");
			} else {
				if (doIndent) this.indent(level, writer);
				writer.write("(");
				for (var i = 0; i < seq.size(); i++) {
					if (i > 0) {
						writer.write(", ");
						if (this.coordsPerLine > 0 && i % this.coordsPerLine === 0) {
							this.indent(level + 1, writer);
						}
					}
					this.appendCoordinate(seq, i, writer);
				}
				writer.write(")");
			}
		}
	}, {
		key: 'interfaces_',
		get: function get() {
			return [];
		}
	}], [{
		key: 'stringOfChar',
		value: function stringOfChar(ch, count) {
			var buf = new StringBuffer();
			for (var i = 0; i < count; i++) {
				buf.append(ch);
			}
			return buf.toString();
		}
	}, {
		key: 'createFormatter',
		value: function createFormatter(precisionModel) {
			var decimalPlaces = precisionModel.getMaximumSignificantDigits();
			var symbols = new _javaTextDecimalFormatSymbols2['default']();
			symbols.setDecimalSeparator('.');
			var fmtString = "0" + ((decimalPlaces > 0 ? "." : "") + WKTWriter.stringOfChar('#', decimalPlaces));
			return new _javaTextDecimalFormat2['default'](fmtString, symbols);
		}
	}, {
		key: 'toLineString',
		value: function toLineString() {
			for (var _len14 = arguments.length, args = Array(_len14), _key14 = 0; _key14 < _len14; _key14++) {
				args[_key14] = arguments[_key14];
			}

			switch (args.length) {
				case 2:
					return (function () {
						for (var _len15 = arguments.length, args = Array(_len15), _key15 = 0; _key15 < _len15; _key15++) {
							args[_key15] = arguments[_key15];
						}

						var p0 = args[0];
						var p1 = args[1];

						return "LINESTRING ( " + (p0.x + (" " + (p0.y + (", " + (p1.x + (" " + (p1.y + " )")))))));
					}).apply(undefined, args);
				case 1:
					return (function () {
						for (var _len16 = arguments.length, args = Array(_len16), _key16 = 0; _key16 < _len16; _key16++) {
							args[_key16] = arguments[_key16];
						}

						var seq = args[0];

						var buf = new StringBuffer();
						buf.append("LINESTRING ");
						if (seq.size() === 0) buf.append(" EMPTY");else {
							buf.append("(");
							for (var i = 0; i < seq.size(); i++) {
								if (i > 0) buf.append(", ");
								buf.append(seq.getX(i) + (" " + seq.getY(i)));
							}
							buf.append(")");
						}
						return buf.toString();
					}).apply(undefined, args);
			}
		}
	}, {
		key: 'toPoint',
		value: function toPoint(p0) {
			return "POINT ( " + (p0.x + (" " + (p0.y + " )")));
		}
	}]);

	return WKTWriter;
})();

exports['default'] = WKTWriter;

WKTWriter.INDENT = 2;
module.exports = exports['default'];

},{"com/vividsolutions/jts/geom/GeometryCollection":26,"com/vividsolutions/jts/geom/LineString":33,"com/vividsolutions/jts/geom/LinearRing":35,"com/vividsolutions/jts/geom/MultiLineString":37,"com/vividsolutions/jts/geom/MultiPoint":38,"com/vividsolutions/jts/geom/MultiPolygon":39,"com/vividsolutions/jts/geom/Point":40,"com/vividsolutions/jts/geom/Polygon":41,"com/vividsolutions/jts/util/Assert":97,"java/io/IOException":100,"java/io/StringWriter":102,"java/lang/Double":106,"java/text/DecimalFormat":109,"java/text/DecimalFormatSymbols":110}],82:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _javaLangDouble = require('java/lang/Double');

var _javaLangDouble2 = _interopRequireDefault(_javaLangDouble);

var _javaLangCharacter = require('java/lang/Character');

var _javaLangCharacter2 = _interopRequireDefault(_javaLangCharacter);

var _javaLangComparable = require('java/lang/Comparable');

var _javaLangComparable2 = _interopRequireDefault(_javaLangComparable);

var _javaLangCloneable = require('java/lang/Cloneable');

var _javaLangCloneable2 = _interopRequireDefault(_javaLangCloneable);

var _javaIoSerializable = require('java/io/Serializable');

var _javaIoSerializable2 = _interopRequireDefault(_javaIoSerializable);

var DD = (function () {
	function DD() {
		_classCallCheck(this, DD);

		this.init_.apply(this, arguments);
	}

	_createClass(DD, [{
		key: 'init_',
		value: function init_() {
			var _this = this;

			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			this.hi = 0.0;
			this.lo = 0.0;
			switch (args.length) {
				case 2:
					return (function () {
						for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
							args[_key2] = arguments[_key2];
						}

						var hi = args[0];
						var lo = args[1];

						_this.init(hi, lo);
					}).apply(undefined, args);
				case 1:
					if (!Number.isInteger(args[0])) {
						return (function () {
							for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
								args[_key3] = arguments[_key3];
							}

							var x = args[0];

							_this.init(x);
						}).apply(undefined, args);
					} else if (args[0] instanceof DD) {
						return (function () {
							for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
								args[_key4] = arguments[_key4];
							}

							var dd = args[0];

							_this.init(dd);
						}).apply(undefined, args);
					} else if (typeof args[0] === "string") {
						return (function () {
							for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
								args[_key5] = arguments[_key5];
							}

							var str = args[0];

							_this.init_(DD.parse(str));
						}).apply(undefined, args);
					}
				case 0:
					return (function () {
						for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
							args[_key6] = arguments[_key6];
						}

						_this.init(0.0);
					}).apply(undefined, args);
			}
		}
	}, {
		key: 'le',
		value: function le(y) {
			return this.hi < y.hi || this.hi === y.hi && this.lo <= y.lo;
		}
	}, {
		key: 'extractSignificantDigits',
		value: function extractSignificantDigits(insertDecimalPoint, magnitude) {
			var y = this.abs();
			var mag = DD.magnitude(y.hi);
			var scale = DD.TEN.pow(mag);
			y = y.divide(scale);
			if (y.gt(DD.TEN)) {
				y = y.divide(DD.TEN);
				mag += 1;
			} else if (y.lt(DD.ONE)) {
				y = y.multiply(DD.TEN);
				mag -= 1;
			}
			var decimalPointPos = mag + 1;
			var buf = new StringBuffer();
			var numDigits = DD.MAX_PRINT_DIGITS - 1;
			for (var i = 0; i <= numDigits; i++) {
				if (insertDecimalPoint && i === decimalPointPos) {
					buf.append('.');
				}
				var digit = y.hi;
				if (digit < 0 || digit > 9) {}
				if (digit < 0) {
					break;
				}
				var rebiasBy10 = false;
				var digitChar = 0;
				if (digit > 9) {
					rebiasBy10 = true;
					digitChar = '9';
				} else {
					digitChar = '0' + digit;
				}
				buf.append(digitChar);
				y = y.subtract(DD.valueOf(digit)).multiply(DD.TEN);
				if (rebiasBy10) y.selfAdd(DD.TEN);
				var continueExtractingDigits = true;
				var remMag = DD.magnitude(y.hi);
				if (remMag < 0 && Math.abs(remMag) >= numDigits - i) continueExtractingDigits = false;
				if (!continueExtractingDigits) break;
			}
			magnitude[0] = mag;
			return buf.toString();
		}
	}, {
		key: 'sqr',
		value: function sqr() {
			return this.multiply(this);
		}
	}, {
		key: 'doubleValue',
		value: function doubleValue() {
			return this.hi + this.lo;
		}
	}, {
		key: 'subtract',
		value: function subtract() {
			var _this2 = this;

			for (var _len7 = arguments.length, args = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
				args[_key7] = arguments[_key7];
			}

			switch (args.length) {
				case 1:
					if (args[0] instanceof DD) {
						return (function () {
							for (var _len8 = arguments.length, args = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
								args[_key8] = arguments[_key8];
							}

							var y = args[0];

							return _this2.add(y.negate());
						}).apply(undefined, args);
					} else if (!Number.isInteger(args[0])) {
						return (function () {
							for (var _len9 = arguments.length, args = Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
								args[_key9] = arguments[_key9];
							}

							var y = args[0];

							return _this2.add(-y);
						}).apply(undefined, args);
					}
			}
		}
	}, {
		key: 'equals',
		value: function equals(y) {
			return this.hi === y.hi && this.lo === y.lo;
		}
	}, {
		key: 'isZero',
		value: function isZero() {
			return this.hi === 0.0 && this.lo === 0.0;
		}
	}, {
		key: 'selfSubtract',
		value: function selfSubtract() {
			var _this3 = this;

			for (var _len10 = arguments.length, args = Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
				args[_key10] = arguments[_key10];
			}

			switch (args.length) {
				case 1:
					if (args[0] instanceof DD) {
						return (function () {
							for (var _len11 = arguments.length, args = Array(_len11), _key11 = 0; _key11 < _len11; _key11++) {
								args[_key11] = arguments[_key11];
							}

							var y = args[0];

							if (_this3.isNaN()) return _this3;
							return _this3.selfAdd(-y.hi, -y.lo);
						}).apply(undefined, args);
					} else if (!Number.isInteger(args[0])) {
						return (function () {
							for (var _len12 = arguments.length, args = Array(_len12), _key12 = 0; _key12 < _len12; _key12++) {
								args[_key12] = arguments[_key12];
							}

							var y = args[0];

							if (_this3.isNaN()) return _this3;
							return _this3.selfAdd(-y, 0.0);
						}).apply(undefined, args);
					}
			}
		}
	}, {
		key: 'getSpecialNumberString',
		value: function getSpecialNumberString() {
			if (this.isZero()) return "0.0";
			if (this.isNaN()) return "NaN ";
			return null;
		}
	}, {
		key: 'min',
		value: function min(x) {
			if (this.le(x)) {
				return this;
			} else {
				return x;
			}
		}
	}, {
		key: 'selfDivide',
		value: function selfDivide() {
			var _this4 = this;

			for (var _len13 = arguments.length, args = Array(_len13), _key13 = 0; _key13 < _len13; _key13++) {
				args[_key13] = arguments[_key13];
			}

			switch (args.length) {
				case 2:
					return (function () {
						for (var _len14 = arguments.length, args = Array(_len14), _key14 = 0; _key14 < _len14; _key14++) {
							args[_key14] = arguments[_key14];
						}

						var yhi = args[0];
						var ylo = args[1];

						var hc = null,
						    tc = null,
						    hy = null,
						    ty = null,
						    C = null,
						    c = null,
						    U = null,
						    u = null;
						C = _this4.hi / yhi;
						c = DD.SPLIT * C;
						hc = c - C;
						u = DD.SPLIT * yhi;
						hc = c - hc;
						tc = C - hc;
						hy = u - yhi;
						U = C * yhi;
						hy = u - hy;
						ty = yhi - hy;
						u = hc * hy - U + hc * ty + tc * hy + tc * ty;
						c = (_this4.hi - U - u + _this4.lo - C * ylo) / yhi;
						u = C + c;
						_this4.hi = u;
						_this4.lo = C - u + c;
						return _this4;
					}).apply(undefined, args);
				case 1:
					if (args[0] instanceof DD) {
						return (function () {
							for (var _len15 = arguments.length, args = Array(_len15), _key15 = 0; _key15 < _len15; _key15++) {
								args[_key15] = arguments[_key15];
							}

							var y = args[0];

							return _this4.selfDivide(y.hi, y.lo);
						}).apply(undefined, args);
					} else if (!Number.isInteger(args[0])) {
						return (function () {
							for (var _len16 = arguments.length, args = Array(_len16), _key16 = 0; _key16 < _len16; _key16++) {
								args[_key16] = arguments[_key16];
							}

							var y = args[0];

							return _this4.selfDivide(y, 0.0);
						}).apply(undefined, args);
					}
			}
		}
	}, {
		key: 'dump',
		value: function dump() {
			return "DD<" + (this.hi + (", " + (this.lo + ">")));
		}
	}, {
		key: 'divide',
		value: function divide() {
			var _this5 = this;

			for (var _len17 = arguments.length, args = Array(_len17), _key17 = 0; _key17 < _len17; _key17++) {
				args[_key17] = arguments[_key17];
			}

			switch (args.length) {
				case 1:
					if (args[0] instanceof DD) {
						return (function () {
							for (var _len18 = arguments.length, args = Array(_len18), _key18 = 0; _key18 < _len18; _key18++) {
								args[_key18] = arguments[_key18];
							}

							var y = args[0];

							var hc = null,
							    tc = null,
							    hy = null,
							    ty = null,
							    C = null,
							    c = null,
							    U = null,
							    u = null;
							C = _this5.hi / y.hi;
							c = DD.SPLIT * C;
							hc = c - C;
							u = DD.SPLIT * y.hi;
							hc = c - hc;
							tc = C - hc;
							hy = u - y.hi;
							U = C * y.hi;
							hy = u - hy;
							ty = y.hi - hy;
							u = hc * hy - U + hc * ty + tc * hy + tc * ty;
							c = (_this5.hi - U - u + _this5.lo - C * y.lo) / y.hi;
							u = C + c;
							var zhi = u;
							var zlo = C - u + c;
							return new DD(zhi, zlo);
						}).apply(undefined, args);
					} else if (!Number.isInteger(args[0])) {
						return (function () {
							for (var _len19 = arguments.length, args = Array(_len19), _key19 = 0; _key19 < _len19; _key19++) {
								args[_key19] = arguments[_key19];
							}

							var y = args[0];

							if (_javaLangDouble2['default'].isNaN(y)) return DD.createNaN();
							return DD.copy(_this5).selfDivide(y, 0.0);
						}).apply(undefined, args);
					}
			}
		}
	}, {
		key: 'ge',
		value: function ge(y) {
			return this.hi > y.hi || this.hi === y.hi && this.lo >= y.lo;
		}
	}, {
		key: 'pow',
		value: function pow(exp) {
			if (exp === 0.0) return DD.valueOf(1.0);
			var r = new DD(this);
			var s = DD.valueOf(1.0);
			var n = Math.abs(exp);
			if (n > 1) {
				while (n > 0) {
					if (n % 2 === 1) {
						s.selfMultiply(r);
					}
					n /= 2;
					if (n > 0) r = r.sqr();
				}
			} else {
				s = r;
			}
			if (exp < 0) return s.reciprocal();
			return s;
		}
	}, {
		key: 'ceil',
		value: function ceil() {
			if (this.isNaN()) return DD.NaN;
			var fhi = Math.ceil(this.hi);
			var flo = 0.0;
			if (fhi === this.hi) {
				flo = Math.ceil(this.lo);
			}
			return new DD(fhi, flo);
		}
	}, {
		key: 'compareTo',
		value: function compareTo(o) {
			var other = o;
			if (this.hi < other.hi) return -1;
			if (this.hi > other.hi) return 1;
			if (this.lo < other.lo) return -1;
			if (this.lo > other.lo) return 1;
			return 0;
		}
	}, {
		key: 'rint',
		value: function rint() {
			if (this.isNaN()) return this;
			var plus5 = this.add(0.5);
			return plus5.floor();
		}
	}, {
		key: 'setValue',
		value: function setValue() {
			var _this6 = this;

			for (var _len20 = arguments.length, args = Array(_len20), _key20 = 0; _key20 < _len20; _key20++) {
				args[_key20] = arguments[_key20];
			}

			switch (args.length) {
				case 1:
					if (args[0] instanceof DD) {
						return (function () {
							for (var _len21 = arguments.length, args = Array(_len21), _key21 = 0; _key21 < _len21; _key21++) {
								args[_key21] = arguments[_key21];
							}

							var value = args[0];

							_this6.init(value);
							return _this6;
						}).apply(undefined, args);
					} else if (!Number.isInteger(args[0])) {
						return (function () {
							for (var _len22 = arguments.length, args = Array(_len22), _key22 = 0; _key22 < _len22; _key22++) {
								args[_key22] = arguments[_key22];
							}

							var value = args[0];

							_this6.init(value);
							return _this6;
						}).apply(undefined, args);
					}
			}
		}
	}, {
		key: 'max',
		value: function max(x) {
			if (this.ge(x)) {
				return this;
			} else {
				return x;
			}
		}
	}, {
		key: 'sqrt',
		value: function sqrt() {
			if (this.isZero()) return DD.valueOf(0.0);
			if (this.isNegative()) {
				return DD.NaN;
			}
			var x = 1.0 / Math.sqrt(this.hi);
			var ax = this.hi * x;
			var axdd = DD.valueOf(ax);
			var diffSq = this.subtract(axdd.sqr());
			var d2 = diffSq.hi * (x * 0.5);
			return axdd.add(d2);
		}
	}, {
		key: 'selfAdd',
		value: function selfAdd() {
			var _this7 = this;

			for (var _len23 = arguments.length, args = Array(_len23), _key23 = 0; _key23 < _len23; _key23++) {
				args[_key23] = arguments[_key23];
			}

			switch (args.length) {
				case 2:
					return (function () {
						for (var _len24 = arguments.length, args = Array(_len24), _key24 = 0; _key24 < _len24; _key24++) {
							args[_key24] = arguments[_key24];
						}

						var yhi = args[0];
						var ylo = args[1];

						var H = null,
						    h = null,
						    T = null,
						    t = null,
						    S = null,
						    s = null,
						    e = null,
						    f = null;
						S = _this7.hi + yhi;
						T = _this7.lo + ylo;
						e = S - _this7.hi;
						f = T - _this7.lo;
						s = S - e;
						t = T - f;
						s = yhi - e + (_this7.hi - s);
						t = ylo - f + (_this7.lo - t);
						e = s + T;
						H = S + e;
						h = e + (S - H);
						e = t + h;
						var zhi = H + e;
						var zlo = e + (H - zhi);
						_this7.hi = zhi;
						_this7.lo = zlo;
						return _this7;
					}).apply(undefined, args);
				case 1:
					if (args[0] instanceof DD) {
						return (function () {
							for (var _len25 = arguments.length, args = Array(_len25), _key25 = 0; _key25 < _len25; _key25++) {
								args[_key25] = arguments[_key25];
							}

							var y = args[0];

							return _this7.selfAdd(y.hi, y.lo);
						}).apply(undefined, args);
					} else if (!Number.isInteger(args[0])) {
						return (function () {
							for (var _len26 = arguments.length, args = Array(_len26), _key26 = 0; _key26 < _len26; _key26++) {
								args[_key26] = arguments[_key26];
							}

							var y = args[0];

							var H = null,
							    h = null,
							    S = null,
							    s = null,
							    e = null,
							    f = null;
							S = _this7.hi + y;
							e = S - _this7.hi;
							s = S - e;
							s = y - e + (_this7.hi - s);
							f = s + _this7.lo;
							H = S + f;
							h = f + (S - H);
							_this7.hi = H + h;
							_this7.lo = h + (H - _this7.hi);
							return _this7;
						}).apply(undefined, args);
					}
			}
		}
	}, {
		key: 'selfMultiply',
		value: function selfMultiply() {
			var _this8 = this;

			for (var _len27 = arguments.length, args = Array(_len27), _key27 = 0; _key27 < _len27; _key27++) {
				args[_key27] = arguments[_key27];
			}

			switch (args.length) {
				case 2:
					return (function () {
						for (var _len28 = arguments.length, args = Array(_len28), _key28 = 0; _key28 < _len28; _key28++) {
							args[_key28] = arguments[_key28];
						}

						var yhi = args[0];
						var ylo = args[1];

						var hx = null,
						    tx = null,
						    hy = null,
						    ty = null,
						    C = null,
						    c = null;
						C = DD.SPLIT * _this8.hi;
						hx = C - _this8.hi;
						c = DD.SPLIT * yhi;
						hx = C - hx;
						tx = _this8.hi - hx;
						hy = c - yhi;
						C = _this8.hi * yhi;
						hy = c - hy;
						ty = yhi - hy;
						c = hx * hy - C + hx * ty + tx * hy + tx * ty + (_this8.hi * ylo + _this8.lo * yhi);
						var zhi = C + c;
						hx = C - zhi;
						var zlo = c + hx;
						_this8.hi = zhi;
						_this8.lo = zlo;
						return _this8;
					}).apply(undefined, args);
				case 1:
					if (args[0] instanceof DD) {
						return (function () {
							for (var _len29 = arguments.length, args = Array(_len29), _key29 = 0; _key29 < _len29; _key29++) {
								args[_key29] = arguments[_key29];
							}

							var y = args[0];

							return _this8.selfMultiply(y.hi, y.lo);
						}).apply(undefined, args);
					} else if (!Number.isInteger(args[0])) {
						return (function () {
							for (var _len30 = arguments.length, args = Array(_len30), _key30 = 0; _key30 < _len30; _key30++) {
								args[_key30] = arguments[_key30];
							}

							var y = args[0];

							return _this8.selfMultiply(y, 0.0);
						}).apply(undefined, args);
					}
			}
		}
	}, {
		key: 'selfSqr',
		value: function selfSqr() {
			return this.selfMultiply(this);
		}
	}, {
		key: 'floor',
		value: function floor() {
			if (this.isNaN()) return DD.NaN;
			var fhi = Math.floor(this.hi);
			var flo = 0.0;
			if (fhi === this.hi) {
				flo = Math.floor(this.lo);
			}
			return new DD(fhi, flo);
		}
	}, {
		key: 'negate',
		value: function negate() {
			if (this.isNaN()) return this;
			return new DD(-this.hi, -this.lo);
		}
	}, {
		key: 'clone',
		value: function clone() {
			try {
				return _get(Object.getPrototypeOf(DD.prototype), 'clone', this).call(this);
			} catch (e) {
				if (e instanceof CloneNotSupportedException) {
					return null;
				}
			} finally {}
		}
	}, {
		key: 'multiply',
		value: function multiply() {
			var _this9 = this;

			for (var _len31 = arguments.length, args = Array(_len31), _key31 = 0; _key31 < _len31; _key31++) {
				args[_key31] = arguments[_key31];
			}

			switch (args.length) {
				case 1:
					if (args[0] instanceof DD) {
						return (function () {
							for (var _len32 = arguments.length, args = Array(_len32), _key32 = 0; _key32 < _len32; _key32++) {
								args[_key32] = arguments[_key32];
							}

							var y = args[0];

							if (y.isNaN()) return DD.createNaN();
							return DD.copy(_this9).selfMultiply(y);
						}).apply(undefined, args);
					} else if (!Number.isInteger(args[0])) {
						return (function () {
							for (var _len33 = arguments.length, args = Array(_len33), _key33 = 0; _key33 < _len33; _key33++) {
								args[_key33] = arguments[_key33];
							}

							var y = args[0];

							if (_javaLangDouble2['default'].isNaN(y)) return DD.createNaN();
							return DD.copy(_this9).selfMultiply(y, 0.0);
						}).apply(undefined, args);
					}
			}
		}
	}, {
		key: 'isNaN',
		value: function isNaN() {
			return _javaLangDouble2['default'].isNaN(this.hi);
		}
	}, {
		key: 'intValue',
		value: function intValue() {
			return this.hi;
		}
	}, {
		key: 'toString',
		value: function toString() {
			var mag = DD.magnitude(this.hi);
			if (mag >= -3 && mag <= 20) return this.toStandardNotation();
			return this.toSciNotation();
		}
	}, {
		key: 'toStandardNotation',
		value: function toStandardNotation() {
			var specialStr = this.getSpecialNumberString();
			if (specialStr !== null) return specialStr;
			var magnitude = [];
			var sigDigits = this.extractSignificantDigits(true, magnitude);
			var decimalPointPos = magnitude[0] + 1;
			var num = sigDigits;
			if (sigDigits.charAt(0) === '.') {
				num = "0" + sigDigits;
			} else if (decimalPointPos < 0) {
				num = "0." + (DD.stringOfChar('0', -decimalPointPos) + sigDigits);
			} else if (sigDigits.indexOf('.') === -1) {
				var numZeroes = decimalPointPos - sigDigits.length();
				var zeroes = DD.stringOfChar('0', numZeroes);
				num = sigDigits + (zeroes + ".0");
			}
			if (this.isNegative()) return "-" + num;
			return num;
		}
	}, {
		key: 'reciprocal',
		value: function reciprocal() {
			var hc = null,
			    tc = null,
			    hy = null,
			    ty = null,
			    C = null,
			    c = null,
			    U = null,
			    u = null;
			C = 1.0 / this.hi;
			c = DD.SPLIT * C;
			hc = c - C;
			u = DD.SPLIT * this.hi;
			hc = c - hc;
			tc = C - hc;
			hy = u - this.hi;
			U = C * this.hi;
			hy = u - hy;
			ty = this.hi - hy;
			u = hc * hy - U + hc * ty + tc * hy + tc * ty;
			c = (1.0 - U - u - C * this.lo) / this.hi;
			var zhi = C + c;
			var zlo = C - zhi + c;
			return new DD(zhi, zlo);
		}
	}, {
		key: 'toSciNotation',
		value: function toSciNotation() {
			if (this.isZero()) return DD.SCI_NOT_ZERO;
			var specialStr = this.getSpecialNumberString();
			if (specialStr !== null) return specialStr;
			var magnitude = [];
			var digits = this.extractSignificantDigits(false, magnitude);
			var expStr = DD.SCI_NOT_EXPONENT_CHAR + magnitude[0];
			if (digits.charAt(0) === '0') {
				throw new IllegalStateException("Found leading zero: " + digits);
			}
			var trailingDigits = "";
			if (digits.length() > 1) trailingDigits = digits.substring(1);
			var digitsWithDecimal = digits.charAt(0) + ("." + trailingDigits);
			if (this.isNegative()) return "-" + (digitsWithDecimal + expStr);
			return digitsWithDecimal + expStr;
		}
	}, {
		key: 'abs',
		value: function abs() {
			if (this.isNaN()) return DD.NaN;
			if (this.isNegative()) return this.negate();
			return new DD(this);
		}
	}, {
		key: 'isPositive',
		value: function isPositive() {
			return this.hi > 0.0 || this.hi === 0.0 && this.lo > 0.0;
		}
	}, {
		key: 'lt',
		value: function lt(y) {
			return this.hi < y.hi || this.hi === y.hi && this.lo < y.lo;
		}
	}, {
		key: 'add',
		value: function add() {
			var _this10 = this;

			for (var _len34 = arguments.length, args = Array(_len34), _key34 = 0; _key34 < _len34; _key34++) {
				args[_key34] = arguments[_key34];
			}

			switch (args.length) {
				case 1:
					if (args[0] instanceof DD) {
						return (function () {
							for (var _len35 = arguments.length, args = Array(_len35), _key35 = 0; _key35 < _len35; _key35++) {
								args[_key35] = arguments[_key35];
							}

							var y = args[0];

							return DD.copy(_this10).selfAdd(y);
						}).apply(undefined, args);
					} else if (!Number.isInteger(args[0])) {
						return (function () {
							for (var _len36 = arguments.length, args = Array(_len36), _key36 = 0; _key36 < _len36; _key36++) {
								args[_key36] = arguments[_key36];
							}

							var y = args[0];

							return DD.copy(_this10).selfAdd(y);
						}).apply(undefined, args);
					}
			}
		}
	}, {
		key: 'init',
		value: function init() {
			var _this11 = this;

			for (var _len37 = arguments.length, args = Array(_len37), _key37 = 0; _key37 < _len37; _key37++) {
				args[_key37] = arguments[_key37];
			}

			switch (args.length) {
				case 2:
					return (function () {
						for (var _len38 = arguments.length, args = Array(_len38), _key38 = 0; _key38 < _len38; _key38++) {
							args[_key38] = arguments[_key38];
						}

						var hi = args[0];
						var lo = args[1];

						_this11.hi = hi;
						_this11.lo = lo;
					}).apply(undefined, args);
				case 1:
					if (!Number.isInteger(args[0])) {
						return (function () {
							for (var _len39 = arguments.length, args = Array(_len39), _key39 = 0; _key39 < _len39; _key39++) {
								args[_key39] = arguments[_key39];
							}

							var x = args[0];

							_this11.hi = x;
							_this11.lo = 0.0;
						}).apply(undefined, args);
					} else if (args[0] instanceof DD) {
						return (function () {
							for (var _len40 = arguments.length, args = Array(_len40), _key40 = 0; _key40 < _len40; _key40++) {
								args[_key40] = arguments[_key40];
							}

							var dd = args[0];

							_this11.hi = dd.hi;
							_this11.lo = dd.lo;
						}).apply(undefined, args);
					}
			}
		}
	}, {
		key: 'gt',
		value: function gt(y) {
			return this.hi > y.hi || this.hi === y.hi && this.lo > y.lo;
		}
	}, {
		key: 'isNegative',
		value: function isNegative() {
			return this.hi < 0.0 || this.hi === 0.0 && this.lo < 0.0;
		}
	}, {
		key: 'trunc',
		value: function trunc() {
			if (this.isNaN()) return DD.NaN;
			if (this.isPositive()) return this.floor();else return this.ceil();
		}
	}, {
		key: 'signum',
		value: function signum() {
			if (this.hi > 0) return 1;
			if (this.hi < 0) return -1;
			if (this.lo > 0) return 1;
			if (this.lo < 0) return -1;
			return 0;
		}
	}, {
		key: 'interfaces_',
		get: function get() {
			return [_javaIoSerializable2['default'], _javaLangComparable2['default'], _javaLangCloneable2['default']];
		}
	}], [{
		key: 'sqr',
		value: function sqr(x) {
			return DD.valueOf(x).selfMultiply(x);
		}
	}, {
		key: 'valueOf',
		value: function valueOf() {
			for (var _len41 = arguments.length, args = Array(_len41), _key41 = 0; _key41 < _len41; _key41++) {
				args[_key41] = arguments[_key41];
			}

			switch (args.length) {
				case 1:
					if (typeof args[0] === "string") {
						return (function () {
							for (var _len42 = arguments.length, args = Array(_len42), _key42 = 0; _key42 < _len42; _key42++) {
								args[_key42] = arguments[_key42];
							}

							var str = args[0];

							return DD.parse(str);
						}).apply(undefined, args);
					} else if (!Number.isInteger(args[0])) {
						return (function () {
							for (var _len43 = arguments.length, args = Array(_len43), _key43 = 0; _key43 < _len43; _key43++) {
								args[_key43] = arguments[_key43];
							}

							var x = args[0];

							return new DD(x);
						}).apply(undefined, args);
					}
			}
		}
	}, {
		key: 'sqrt',
		value: function sqrt(x) {
			return DD.valueOf(x).sqrt();
		}
	}, {
		key: 'parse',
		value: function parse(str) {
			var i = 0;
			var strlen = str.length();
			while (_javaLangCharacter2['default'].isWhitespace(str.charAt(i))) i++;
			var isNegative = false;
			if (i < strlen) {
				var signCh = str.charAt(i);
				if (signCh === '-' || signCh === '+') {
					i++;
					if (signCh === '-') isNegative = true;
				}
			}
			var val = new DD();
			var numDigits = 0;
			var numBeforeDec = 0;
			var exp = 0;
			while (true) {
				if (i >= strlen) break;
				var ch = str.charAt(i);
				i++;
				if (_javaLangCharacter2['default'].isDigit(ch)) {
					var d = ch - '0';
					val.selfMultiply(DD.TEN);
					val.selfAdd(d);
					numDigits++;
					continue;
				}
				if (ch === '.') {
					numBeforeDec = numDigits;
					continue;
				}
				if (ch === 'e' || ch === 'E') {
					var expStr = str.substring(i);
					try {
						exp = Integer.parseInt(expStr);
					} catch (e) {
						if (e instanceof NumberFormatException) {
							throw new NumberFormatException("Invalid exponent " + (expStr + (" in string " + str)));
						}
					} finally {}
					break;
				}
				throw new NumberFormatException("Unexpected character '" + (ch + ("' at position " + (i + (" in string " + str)))));
			}
			var val2 = val;
			var numDecPlaces = numDigits - (numBeforeDec - exp);
			if (numDecPlaces === 0) {
				val2 = val;
			} else if (numDecPlaces > 0) {
				var scale = DD.TEN.pow(numDecPlaces);
				val2 = val.divide(scale);
			} else if (numDecPlaces < 0) {
				var scale = DD.TEN.pow(-numDecPlaces);
				val2 = val.multiply(scale);
			}
			if (isNegative) {
				return val2.negate();
			}
			return val2;
		}
	}, {
		key: 'createNaN',
		value: function createNaN() {
			return new DD(_javaLangDouble2['default'].NaN, _javaLangDouble2['default'].NaN);
		}
	}, {
		key: 'copy',
		value: function copy(dd) {
			return new DD(dd);
		}
	}, {
		key: 'magnitude',
		value: function magnitude(x) {
			var xAbs = Math.abs(x);
			var xLog10 = Math.log(xAbs) / Math.log(10);
			var xMag = Math.floor(xLog10);
			var xApprox = Math.pow(10, xMag);
			if (xApprox * 10 <= xAbs) xMag += 1;
			return xMag;
		}
	}, {
		key: 'stringOfChar',
		value: function stringOfChar(ch, len) {
			var buf = new StringBuffer();
			for (var i = 0; i < len; i++) {
				buf.append(ch);
			}
			return buf.toString();
		}
	}]);

	return DD;
})();

exports['default'] = DD;

DD.PI = new DD(3.141592653589793116e+00, 1.224646799147353207e-16);
DD.TWO_PI = new DD(6.283185307179586232e+00, 2.449293598294706414e-16);
DD.PI_2 = new DD(1.570796326794896558e+00, 6.123233995736766036e-17);
DD.E = new DD(2.718281828459045091e+00, 1.445646891729250158e-16);
DD.NaN = new DD(_javaLangDouble2['default'].NaN, _javaLangDouble2['default'].NaN);
DD.EPS = 1.23259516440783e-32;
DD.SPLIT = 134217729.0;
DD.MAX_PRINT_DIGITS = 32;
DD.TEN = DD.valueOf(10.0);
DD.ONE = DD.valueOf(1.0);
DD.SCI_NOT_EXPONENT_CHAR = "E";
DD.SCI_NOT_ZERO = "0.0E0";
module.exports = exports['default'];

},{"java/io/Serializable":101,"java/lang/Character":103,"java/lang/Cloneable":104,"java/lang/Comparable":105,"java/lang/Double":106}],83:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _javaLangDouble = require('java/lang/Double');

var _javaLangDouble2 = _interopRequireDefault(_javaLangDouble);

var MathUtil = (function () {
	function MathUtil() {
		_classCallCheck(this, MathUtil);

		this.init_.apply(this, arguments);
	}

	_createClass(MathUtil, [{
		key: 'init_',
		value: function init_() {
			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			switch (args.length) {}
		}
	}, {
		key: 'interfaces_',
		get: function get() {
			return [];
		}
	}], [{
		key: 'log10',
		value: function log10(x) {
			var ln = Math.log(x);
			if (_javaLangDouble2['default'].isInfinite(ln)) return ln;
			if (_javaLangDouble2['default'].isNaN(ln)) return ln;
			return ln / MathUtil.LOG_10;
		}
	}, {
		key: 'min',
		value: function min(v1, v2, v3, v4) {
			var min = v1;
			if (v2 < min) min = v2;
			if (v3 < min) min = v3;
			if (v4 < min) min = v4;
			return min;
		}
	}, {
		key: 'clamp',
		value: function clamp() {
			for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
				args[_key2] = arguments[_key2];
			}

			switch (args.length) {
				case 3:
					if (!Number.isInteger(args[2]) && (!Number.isInteger(args[0]) && !Number.isInteger(args[1]))) {
						return (function () {
							for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
								args[_key3] = arguments[_key3];
							}

							var x = args[0];
							var min = args[1];
							var max = args[2];

							if (x < min) return min;
							if (x > max) return max;
							return x;
						}).apply(undefined, args);
					} else if (Number.isInteger(args[2]) && (Number.isInteger(args[0]) && Number.isInteger(args[1]))) {
						return (function () {
							for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
								args[_key4] = arguments[_key4];
							}

							var x = args[0];
							var min = args[1];
							var max = args[2];

							if (x < min) return min;
							if (x > max) return max;
							return x;
						}).apply(undefined, args);
					}
			}
		}
	}, {
		key: 'wrap',
		value: function wrap(index, max) {
			if (index < 0) {
				return max - -index % max;
			}
			return index % max;
		}
	}, {
		key: 'max',
		value: function max() {
			for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
				args[_key5] = arguments[_key5];
			}

			switch (args.length) {
				case 4:
					return (function () {
						for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
							args[_key6] = arguments[_key6];
						}

						var v1 = args[0];
						var v2 = args[1];
						var v3 = args[2];
						var v4 = args[3];

						var max = v1;
						if (v2 > max) max = v2;
						if (v3 > max) max = v3;
						if (v4 > max) max = v4;
						return max;
					}).apply(undefined, args);
				case 3:
					return (function () {
						for (var _len7 = arguments.length, args = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
							args[_key7] = arguments[_key7];
						}

						var v1 = args[0];
						var v2 = args[1];
						var v3 = args[2];

						var max = v1;
						if (v2 > max) max = v2;
						if (v3 > max) max = v3;
						return max;
					}).apply(undefined, args);
			}
		}
	}, {
		key: 'average',
		value: function average(x1, x2) {
			return (x1 + x2) / 2.0;
		}
	}]);

	return MathUtil;
})();

exports['default'] = MathUtil;

MathUtil.LOG_10 = Math.log(10);
module.exports = exports['default'];

},{"java/lang/Double":106}],84:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _comVividsolutionsJtsAlgorithmBoundaryNodeRule = require('com/vividsolutions/jts/algorithm/BoundaryNodeRule');

var _comVividsolutionsJtsAlgorithmBoundaryNodeRule2 = _interopRequireDefault(_comVividsolutionsJtsAlgorithmBoundaryNodeRule);

var _comVividsolutionsJtsGeomgraphGeometryGraph = require('com/vividsolutions/jts/geomgraph/GeometryGraph');

var _comVividsolutionsJtsGeomgraphGeometryGraph2 = _interopRequireDefault(_comVividsolutionsJtsGeomgraphGeometryGraph);

var _comVividsolutionsJtsAlgorithmRobustLineIntersector = require('com/vividsolutions/jts/algorithm/RobustLineIntersector');

var _comVividsolutionsJtsAlgorithmRobustLineIntersector2 = _interopRequireDefault(_comVividsolutionsJtsAlgorithmRobustLineIntersector);

var GeometryGraphOperation = (function () {
	function GeometryGraphOperation() {
		_classCallCheck(this, GeometryGraphOperation);

		this.init_.apply(this, arguments);
	}

	_createClass(GeometryGraphOperation, [{
		key: 'init_',
		value: function init_() {
			var _this = this;

			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			this.li = new _comVividsolutionsJtsAlgorithmRobustLineIntersector2['default']();
			this.resultPrecisionModel = null;
			this.arg = null;
			switch (args.length) {
				case 2:
					return (function () {
						for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
							args[_key2] = arguments[_key2];
						}

						var g0 = args[0];
						var g1 = args[1];

						_this.init_(g0, g1, _comVividsolutionsJtsAlgorithmBoundaryNodeRule2['default'].OGC_SFS_BOUNDARY_RULE);
					}).apply(undefined, args);
				case 1:
					return (function () {
						for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
							args[_key3] = arguments[_key3];
						}

						var g0 = args[0];

						_this.setComputationPrecision(g0.getPrecisionModel());
						_this.arg = [];
						_this.arg[0] = new _comVividsolutionsJtsGeomgraphGeometryGraph2['default'](0, g0);
						;
					}).apply(undefined, args);
				case 3:
					return (function () {
						for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
							args[_key4] = arguments[_key4];
						}

						var g0 = args[0];
						var g1 = args[1];
						var boundaryNodeRule = args[2];

						if (g0.getPrecisionModel().compareTo(g1.getPrecisionModel()) >= 0) _this.setComputationPrecision(g0.getPrecisionModel());else _this.setComputationPrecision(g1.getPrecisionModel());
						_this.arg = [];
						_this.arg[0] = new _comVividsolutionsJtsGeomgraphGeometryGraph2['default'](0, g0, boundaryNodeRule);
						_this.arg[1] = new _comVividsolutionsJtsGeomgraphGeometryGraph2['default'](1, g1, boundaryNodeRule);
					}).apply(undefined, args);
			}
		}
	}, {
		key: 'getArgGeometry',
		value: function getArgGeometry(i) {
			return this.arg[i].getGeometry();
		}
	}, {
		key: 'setComputationPrecision',
		value: function setComputationPrecision(pm) {
			this.resultPrecisionModel = pm;
			this.li.setPrecisionModel(this.resultPrecisionModel);
		}
	}, {
		key: 'interfaces_',
		get: function get() {
			return [];
		}
	}]);

	return GeometryGraphOperation;
})();

exports['default'] = GeometryGraphOperation;
module.exports = exports['default'];

},{"com/vividsolutions/jts/algorithm/BoundaryNodeRule":1,"com/vividsolutions/jts/algorithm/RobustLineIntersector":11,"com/vividsolutions/jts/geomgraph/GeometryGraph":58}],85:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _comVividsolutionsJtsGeomUtilShortCircuitedGeometryVisitor = require('com/vividsolutions/jts/geom/util/ShortCircuitedGeometryVisitor');

var _comVividsolutionsJtsGeomUtilShortCircuitedGeometryVisitor2 = _interopRequireDefault(_comVividsolutionsJtsGeomUtilShortCircuitedGeometryVisitor);

var EnvelopeIntersectsVisitor = (function (_ShortCircuitedGeometryVisitor) {
	_inherits(EnvelopeIntersectsVisitor, _ShortCircuitedGeometryVisitor);

	function EnvelopeIntersectsVisitor() {
		_classCallCheck(this, EnvelopeIntersectsVisitor);

		_get(Object.getPrototypeOf(EnvelopeIntersectsVisitor.prototype), 'constructor', this).call(this);
		this.init_.apply(this, arguments);
	}

	_createClass(EnvelopeIntersectsVisitor, [{
		key: 'init_',
		value: function init_() {
			var _this = this;

			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			_get(Object.getPrototypeOf(EnvelopeIntersectsVisitor.prototype), 'init_', this).call(this);
			this.rectEnv = null;
			this.intersects = false;
			switch (args.length) {
				case 1:
					return (function () {
						for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
							args[_key2] = arguments[_key2];
						}

						var rectEnv = args[0];

						_this.rectEnv = rectEnv;
					}).apply(undefined, args);
			}
		}
	}, {
		key: 'isDone',
		value: function isDone() {
			return this.intersects === true;
		}
	}, {
		key: 'visit',
		value: function visit(element) {
			var elementEnv = element.getEnvelopeInternal();
			if (!this.rectEnv.intersects(elementEnv)) {
				return null;
			}
			if (this.rectEnv.contains(elementEnv)) {
				this.intersects = true;
				return null;
			}
			if (elementEnv.getMinX() >= this.rectEnv.getMinX() && elementEnv.getMaxX() <= this.rectEnv.getMaxX()) {
				this.intersects = true;
				return null;
			}
			if (elementEnv.getMinY() >= this.rectEnv.getMinY() && elementEnv.getMaxY() <= this.rectEnv.getMaxY()) {
				this.intersects = true;
				return null;
			}
		}
	}, {
		key: 'intersects',
		value: function intersects() {
			return this.intersects;
		}
	}, {
		key: 'interfaces_',
		get: function get() {
			return [];
		}
	}]);

	return EnvelopeIntersectsVisitor;
})(_comVividsolutionsJtsGeomUtilShortCircuitedGeometryVisitor2['default']);

exports['default'] = EnvelopeIntersectsVisitor;
module.exports = exports['default'];

},{"com/vividsolutions/jts/geom/util/ShortCircuitedGeometryVisitor":50}],86:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _comVividsolutionsJtsGeomCoordinate = require('com/vividsolutions/jts/geom/Coordinate');

var _comVividsolutionsJtsGeomCoordinate2 = _interopRequireDefault(_comVividsolutionsJtsGeomCoordinate);

var _comVividsolutionsJtsGeomPolygon = require('com/vividsolutions/jts/geom/Polygon');

var _comVividsolutionsJtsGeomPolygon2 = _interopRequireDefault(_comVividsolutionsJtsGeomPolygon);

var _comVividsolutionsJtsGeomUtilShortCircuitedGeometryVisitor = require('com/vividsolutions/jts/geom/util/ShortCircuitedGeometryVisitor');

var _comVividsolutionsJtsGeomUtilShortCircuitedGeometryVisitor2 = _interopRequireDefault(_comVividsolutionsJtsGeomUtilShortCircuitedGeometryVisitor);

var _comVividsolutionsJtsAlgorithmLocateSimplePointInAreaLocator = require('com/vividsolutions/jts/algorithm/locate/SimplePointInAreaLocator');

var _comVividsolutionsJtsAlgorithmLocateSimplePointInAreaLocator2 = _interopRequireDefault(_comVividsolutionsJtsAlgorithmLocateSimplePointInAreaLocator);

var GeometryContainsPointVisitor = (function (_ShortCircuitedGeometryVisitor) {
	_inherits(GeometryContainsPointVisitor, _ShortCircuitedGeometryVisitor);

	function GeometryContainsPointVisitor() {
		_classCallCheck(this, GeometryContainsPointVisitor);

		_get(Object.getPrototypeOf(GeometryContainsPointVisitor.prototype), 'constructor', this).call(this);
		this.init_.apply(this, arguments);
	}

	_createClass(GeometryContainsPointVisitor, [{
		key: 'init_',
		value: function init_() {
			var _this = this;

			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			_get(Object.getPrototypeOf(GeometryContainsPointVisitor.prototype), 'init_', this).call(this);
			this.rectSeq = null;
			this.rectEnv = null;
			this.containsPoint = false;
			switch (args.length) {
				case 1:
					return (function () {
						for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
							args[_key2] = arguments[_key2];
						}

						var rectangle = args[0];

						_this.rectSeq = rectangle.getExteriorRing().getCoordinateSequence();
						_this.rectEnv = rectangle.getEnvelopeInternal();
					}).apply(undefined, args);
			}
		}
	}, {
		key: 'isDone',
		value: function isDone() {
			return this.containsPoint === true;
		}
	}, {
		key: 'visit',
		value: function visit(geom) {
			if (!(geom instanceof _comVividsolutionsJtsGeomPolygon2['default'])) return null;
			var elementEnv = geom.getEnvelopeInternal();
			if (!this.rectEnv.intersects(elementEnv)) return null;
			var rectPt = new _comVividsolutionsJtsGeomCoordinate2['default']();
			for (var i = 0; i < 4; i++) {
				this.rectSeq.getCoordinate(i, rectPt);
				if (!elementEnv.contains(rectPt)) continue;
				if (_comVividsolutionsJtsAlgorithmLocateSimplePointInAreaLocator2['default'].containsPointInPolygon(rectPt, geom)) {
					this.containsPoint = true;
					return null;
				}
			}
		}
	}, {
		key: 'containsPoint',
		value: function containsPoint() {
			return this.containsPoint;
		}
	}, {
		key: 'interfaces_',
		get: function get() {
			return [];
		}
	}]);

	return GeometryContainsPointVisitor;
})(_comVividsolutionsJtsGeomUtilShortCircuitedGeometryVisitor2['default']);

exports['default'] = GeometryContainsPointVisitor;
module.exports = exports['default'];

},{"com/vividsolutions/jts/algorithm/locate/SimplePointInAreaLocator":14,"com/vividsolutions/jts/geom/Coordinate":15,"com/vividsolutions/jts/geom/Polygon":41,"com/vividsolutions/jts/geom/util/ShortCircuitedGeometryVisitor":50}],87:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _comVividsolutionsJtsGeomLineString = require('com/vividsolutions/jts/geom/LineString');

var _comVividsolutionsJtsGeomLineString2 = _interopRequireDefault(_comVividsolutionsJtsGeomLineString);

var _comVividsolutionsJtsGeomCoordinate = require('com/vividsolutions/jts/geom/Coordinate');

var _comVividsolutionsJtsGeomCoordinate2 = _interopRequireDefault(_comVividsolutionsJtsGeomCoordinate);

var _comVividsolutionsJtsGeomPoint = require('com/vividsolutions/jts/geom/Point');

var _comVividsolutionsJtsGeomPoint2 = _interopRequireDefault(_comVividsolutionsJtsGeomPoint);

var _comVividsolutionsJtsGeomPolygon = require('com/vividsolutions/jts/geom/Polygon');

var _comVividsolutionsJtsGeomPolygon2 = _interopRequireDefault(_comVividsolutionsJtsGeomPolygon);

var RectangleContains = (function () {
	function RectangleContains() {
		_classCallCheck(this, RectangleContains);

		this.init_.apply(this, arguments);
	}

	_createClass(RectangleContains, [{
		key: 'init_',
		value: function init_() {
			var _this = this;

			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			this.rectEnv = null;
			switch (args.length) {
				case 1:
					return (function () {
						for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
							args[_key2] = arguments[_key2];
						}

						var rectangle = args[0];

						_this.rectEnv = rectangle.getEnvelopeInternal();
					}).apply(undefined, args);
			}
		}
	}, {
		key: 'isContainedInBoundary',
		value: function isContainedInBoundary(geom) {
			if (geom instanceof _comVividsolutionsJtsGeomPolygon2['default']) return false;
			if (geom instanceof _comVividsolutionsJtsGeomPoint2['default']) return this.isPointContainedInBoundary(geom);
			if (geom instanceof _comVividsolutionsJtsGeomLineString2['default']) return this.isLineStringContainedInBoundary(geom);
			for (var i = 0; i < geom.getNumGeometries(); i++) {
				var comp = geom.getGeometryN(i);
				if (!this.isContainedInBoundary(comp)) return false;
			}
			return true;
		}
	}, {
		key: 'isLineSegmentContainedInBoundary',
		value: function isLineSegmentContainedInBoundary(p0, p1) {
			if (p0.equals(p1)) return this.isPointContainedInBoundary(p0);
			if (p0.x === p1.x) {
				if (p0.x === this.rectEnv.getMinX() || p0.x === this.rectEnv.getMaxX()) return true;
			} else if (p0.y === p1.y) {
				if (p0.y === this.rectEnv.getMinY() || p0.y === this.rectEnv.getMaxY()) return true;
			}
			return false;
		}
	}, {
		key: 'isLineStringContainedInBoundary',
		value: function isLineStringContainedInBoundary(line) {
			var seq = line.getCoordinateSequence();
			var p0 = new _comVividsolutionsJtsGeomCoordinate2['default']();
			var p1 = new _comVividsolutionsJtsGeomCoordinate2['default']();
			for (var i = 0; i < seq.size() - 1; i++) {
				seq.getCoordinate(i, p0);
				seq.getCoordinate(i + 1, p1);
				if (!this.isLineSegmentContainedInBoundary(p0, p1)) return false;
			}
			return true;
		}
	}, {
		key: 'isPointContainedInBoundary',
		value: function isPointContainedInBoundary() {
			var _this2 = this;

			for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
				args[_key3] = arguments[_key3];
			}

			switch (args.length) {
				case 1:
					if (args[0] instanceof _comVividsolutionsJtsGeomPoint2['default']) {
						return (function () {
							for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
								args[_key4] = arguments[_key4];
							}

							var point = args[0];

							return _this2.isPointContainedInBoundary(point.getCoordinate());
						}).apply(undefined, args);
					} else if (args[0] instanceof _comVividsolutionsJtsGeomCoordinate2['default']) {
						return (function () {
							for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
								args[_key5] = arguments[_key5];
							}

							var pt = args[0];

							return pt.x === _this2.rectEnv.getMinX() || pt.x === _this2.rectEnv.getMaxX() || pt.y === _this2.rectEnv.getMinY() || pt.y === _this2.rectEnv.getMaxY();
						}).apply(undefined, args);
					}
			}
		}
	}, {
		key: 'contains',
		value: function contains(geom) {
			if (!this.rectEnv.contains(geom.getEnvelopeInternal())) return false;
			if (this.isContainedInBoundary(geom)) return false;
			return true;
		}
	}, {
		key: 'interfaces_',
		get: function get() {
			return [];
		}
	}], [{
		key: 'contains',
		value: function contains(rectangle, b) {
			var rc = new RectangleContains(rectangle);
			return rc.contains(b);
		}
	}]);

	return RectangleContains;
})();

exports['default'] = RectangleContains;
module.exports = exports['default'];

},{"com/vividsolutions/jts/geom/Coordinate":15,"com/vividsolutions/jts/geom/LineString":33,"com/vividsolutions/jts/geom/Point":40,"com/vividsolutions/jts/geom/Polygon":41}],88:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _comVividsolutionsJtsOperationPredicateGeometryContainsPointVisitor = require('com/vividsolutions/jts/operation/predicate/GeometryContainsPointVisitor');

var _comVividsolutionsJtsOperationPredicateGeometryContainsPointVisitor2 = _interopRequireDefault(_comVividsolutionsJtsOperationPredicateGeometryContainsPointVisitor);

var _comVividsolutionsJtsOperationPredicateRectangleIntersectsSegmentVisitor = require('com/vividsolutions/jts/operation/predicate/RectangleIntersectsSegmentVisitor');

var _comVividsolutionsJtsOperationPredicateRectangleIntersectsSegmentVisitor2 = _interopRequireDefault(_comVividsolutionsJtsOperationPredicateRectangleIntersectsSegmentVisitor);

var _comVividsolutionsJtsOperationPredicateEnvelopeIntersectsVisitor = require('com/vividsolutions/jts/operation/predicate/EnvelopeIntersectsVisitor');

var _comVividsolutionsJtsOperationPredicateEnvelopeIntersectsVisitor2 = _interopRequireDefault(_comVividsolutionsJtsOperationPredicateEnvelopeIntersectsVisitor);

var RectangleIntersects = (function () {
	function RectangleIntersects() {
		_classCallCheck(this, RectangleIntersects);

		this.init_.apply(this, arguments);
	}

	_createClass(RectangleIntersects, [{
		key: 'init_',
		value: function init_() {
			var _this = this;

			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			this.rectangle = null;
			this.rectEnv = null;
			switch (args.length) {
				case 1:
					return (function () {
						for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
							args[_key2] = arguments[_key2];
						}

						var rectangle = args[0];

						_this.rectangle = rectangle;
						_this.rectEnv = rectangle.getEnvelopeInternal();
					}).apply(undefined, args);
			}
		}
	}, {
		key: 'intersects',
		value: function intersects(geom) {
			if (!this.rectEnv.intersects(geom.getEnvelopeInternal())) return false;
			var visitor = new _comVividsolutionsJtsOperationPredicateEnvelopeIntersectsVisitor2['default'](this.rectEnv);
			visitor.applyTo(geom);
			if (visitor.intersects()) return true;
			var ecpVisitor = new _comVividsolutionsJtsOperationPredicateGeometryContainsPointVisitor2['default'](this.rectangle);
			ecpVisitor.applyTo(geom);
			if (ecpVisitor.containsPoint()) return true;
			var riVisitor = new _comVividsolutionsJtsOperationPredicateRectangleIntersectsSegmentVisitor2['default'](this.rectangle);
			riVisitor.applyTo(geom);
			if (riVisitor.intersects()) return true;
			return false;
		}
	}, {
		key: 'interfaces_',
		get: function get() {
			return [];
		}
	}], [{
		key: 'intersects',
		value: function intersects(rectangle, b) {
			var rp = new RectangleIntersects(rectangle);
			return rp.intersects(b);
		}
	}]);

	return RectangleIntersects;
})();

exports['default'] = RectangleIntersects;
module.exports = exports['default'];

},{"com/vividsolutions/jts/operation/predicate/EnvelopeIntersectsVisitor":85,"com/vividsolutions/jts/operation/predicate/GeometryContainsPointVisitor":86,"com/vividsolutions/jts/operation/predicate/RectangleIntersectsSegmentVisitor":89}],89:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _comVividsolutionsJtsGeomCoordinate = require('com/vividsolutions/jts/geom/Coordinate');

var _comVividsolutionsJtsGeomCoordinate2 = _interopRequireDefault(_comVividsolutionsJtsGeomCoordinate);

var _comVividsolutionsJtsAlgorithmRectangleLineIntersector = require('com/vividsolutions/jts/algorithm/RectangleLineIntersector');

var _comVividsolutionsJtsAlgorithmRectangleLineIntersector2 = _interopRequireDefault(_comVividsolutionsJtsAlgorithmRectangleLineIntersector);

var _comVividsolutionsJtsGeomUtilShortCircuitedGeometryVisitor = require('com/vividsolutions/jts/geom/util/ShortCircuitedGeometryVisitor');

var _comVividsolutionsJtsGeomUtilShortCircuitedGeometryVisitor2 = _interopRequireDefault(_comVividsolutionsJtsGeomUtilShortCircuitedGeometryVisitor);

var _comVividsolutionsJtsGeomUtilLinearComponentExtracter = require('com/vividsolutions/jts/geom/util/LinearComponentExtracter');

var _comVividsolutionsJtsGeomUtilLinearComponentExtracter2 = _interopRequireDefault(_comVividsolutionsJtsGeomUtilLinearComponentExtracter);

var RectangleIntersectsSegmentVisitor = (function (_ShortCircuitedGeometryVisitor) {
	_inherits(RectangleIntersectsSegmentVisitor, _ShortCircuitedGeometryVisitor);

	function RectangleIntersectsSegmentVisitor() {
		_classCallCheck(this, RectangleIntersectsSegmentVisitor);

		_get(Object.getPrototypeOf(RectangleIntersectsSegmentVisitor.prototype), 'constructor', this).call(this);
		this.init_.apply(this, arguments);
	}

	_createClass(RectangleIntersectsSegmentVisitor, [{
		key: 'init_',
		value: function init_() {
			var _this = this;

			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			_get(Object.getPrototypeOf(RectangleIntersectsSegmentVisitor.prototype), 'init_', this).call(this);
			this.rectEnv = null;
			this.rectIntersector = null;
			this.hasIntersection = false;
			this.p0 = new _comVividsolutionsJtsGeomCoordinate2['default']();
			this.p1 = new _comVividsolutionsJtsGeomCoordinate2['default']();
			switch (args.length) {
				case 1:
					return (function () {
						for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
							args[_key2] = arguments[_key2];
						}

						var rectangle = args[0];

						_this.rectEnv = rectangle.getEnvelopeInternal();
						_this.rectIntersector = new _comVividsolutionsJtsAlgorithmRectangleLineIntersector2['default'](_this.rectEnv);
					}).apply(undefined, args);
			}
		}
	}, {
		key: 'intersects',
		value: function intersects() {
			return this.hasIntersection;
		}
	}, {
		key: 'isDone',
		value: function isDone() {
			return this.hasIntersection === true;
		}
	}, {
		key: 'visit',
		value: function visit(geom) {
			var elementEnv = geom.getEnvelopeInternal();
			if (!this.rectEnv.intersects(elementEnv)) return null;
			var lines = _comVividsolutionsJtsGeomUtilLinearComponentExtracter2['default'].getLines(geom);
			this.checkIntersectionWithLineStrings(lines);
		}
	}, {
		key: 'checkIntersectionWithLineStrings',
		value: function checkIntersectionWithLineStrings(lines) {
			for (var i = lines.iterator(); i.hasNext();) {
				var testLine = i.next();
				this.checkIntersectionWithSegments(testLine);
				if (this.hasIntersection) return null;
			}
		}
	}, {
		key: 'checkIntersectionWithSegments',
		value: function checkIntersectionWithSegments(testLine) {
			var seq1 = testLine.getCoordinateSequence();
			for (var j = 1; j < seq1.size(); j++) {
				seq1.getCoordinate(j - 1, this.p0);
				seq1.getCoordinate(j, this.p1);
				if (this.rectIntersector.intersects(this.p0, this.p1)) {
					this.hasIntersection = true;
					return null;
				}
			}
		}
	}, {
		key: 'interfaces_',
		get: function get() {
			return [];
		}
	}]);

	return RectangleIntersectsSegmentVisitor;
})(_comVividsolutionsJtsGeomUtilShortCircuitedGeometryVisitor2['default']);

exports['default'] = RectangleIntersectsSegmentVisitor;
module.exports = exports['default'];

},{"com/vividsolutions/jts/algorithm/RectangleLineIntersector":9,"com/vividsolutions/jts/geom/Coordinate":15,"com/vividsolutions/jts/geom/util/LinearComponentExtracter":49,"com/vividsolutions/jts/geom/util/ShortCircuitedGeometryVisitor":50}],90:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _comVividsolutionsJtsGeomgraphEdgeEnd = require('com/vividsolutions/jts/geomgraph/EdgeEnd');

var _comVividsolutionsJtsGeomgraphEdgeEnd2 = _interopRequireDefault(_comVividsolutionsJtsGeomgraphEdgeEnd);

var _comVividsolutionsJtsGeomgraphLabel = require('com/vividsolutions/jts/geomgraph/Label');

var _comVividsolutionsJtsGeomgraphLabel2 = _interopRequireDefault(_comVividsolutionsJtsGeomgraphLabel);

var _javaUtilArrayList = require('java/util/ArrayList');

var _javaUtilArrayList2 = _interopRequireDefault(_javaUtilArrayList);

var EdgeEndBuilder = (function () {
	function EdgeEndBuilder() {
		_classCallCheck(this, EdgeEndBuilder);

		this.init_.apply(this, arguments);
	}

	_createClass(EdgeEndBuilder, [{
		key: 'init_',
		value: function init_() {
			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			switch (args.length) {
				case 0:
					return (function () {
						for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
							args[_key2] = arguments[_key2];
						}
					}).apply(undefined, args);
			}
		}
	}, {
		key: 'createEdgeEndForNext',
		value: function createEdgeEndForNext(edge, l, eiCurr, eiNext) {
			var iNext = eiCurr.segmentIndex + 1;
			if (iNext >= edge.getNumPoints() && eiNext === null) return null;
			var pNext = edge.getCoordinate(iNext);
			if (eiNext !== null && eiNext.segmentIndex === eiCurr.segmentIndex) pNext = eiNext.coord;
			var e = new _comVividsolutionsJtsGeomgraphEdgeEnd2['default'](edge, eiCurr.coord, pNext, new _comVividsolutionsJtsGeomgraphLabel2['default'](edge.getLabel()));
			l.add(e);
		}
	}, {
		key: 'createEdgeEndForPrev',
		value: function createEdgeEndForPrev(edge, l, eiCurr, eiPrev) {
			var iPrev = eiCurr.segmentIndex;
			if (eiCurr.dist === 0.0) {
				if (iPrev === 0) return null;
				iPrev--;
			}
			var pPrev = edge.getCoordinate(iPrev);
			if (eiPrev !== null && eiPrev.segmentIndex >= iPrev) pPrev = eiPrev.coord;
			var label = new _comVividsolutionsJtsGeomgraphLabel2['default'](edge.getLabel());
			label.flip();
			var e = new _comVividsolutionsJtsGeomgraphEdgeEnd2['default'](edge, eiCurr.coord, pPrev, label);
			l.add(e);
		}
	}, {
		key: 'computeEdgeEnds',
		value: function computeEdgeEnds() {
			var _this = this;

			for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
				args[_key3] = arguments[_key3];
			}

			switch (args.length) {
				case 2:
					return (function () {
						for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
							args[_key4] = arguments[_key4];
						}

						var edge = args[0];
						var l = args[1];

						var eiList = edge.getEdgeIntersectionList();
						eiList.addEndpoints();
						var it = eiList.iterator();
						var eiPrev = null;
						var eiCurr = null;
						if (!it.hasNext()) return null;
						var eiNext = it.next();
						do {
							eiPrev = eiCurr;
							eiCurr = eiNext;
							eiNext = null;
							if (it.hasNext()) eiNext = it.next();
							if (eiCurr !== null) {
								_this.createEdgeEndForPrev(edge, l, eiCurr, eiPrev);
								_this.createEdgeEndForNext(edge, l, eiCurr, eiNext);
							}
						} while (eiCurr !== null);
					}).apply(undefined, args);
				case 1:
					return (function () {
						for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
							args[_key5] = arguments[_key5];
						}

						var edges = args[0];

						var l = new _javaUtilArrayList2['default']();
						for (var i = edges; i.hasNext();) {
							var e = i.next();
							_this.computeEdgeEnds(e, l);
						}
						return l;
					}).apply(undefined, args);
			}
		}
	}, {
		key: 'interfaces_',
		get: function get() {
			return [];
		}
	}]);

	return EdgeEndBuilder;
})();

exports['default'] = EdgeEndBuilder;
module.exports = exports['default'];

},{"com/vividsolutions/jts/geomgraph/EdgeEnd":54,"com/vividsolutions/jts/geomgraph/Label":60,"java/util/ArrayList":111}],91:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _comVividsolutionsJtsGeomLocation = require('com/vividsolutions/jts/geom/Location');

var _comVividsolutionsJtsGeomLocation2 = _interopRequireDefault(_comVividsolutionsJtsGeomLocation);

var _comVividsolutionsJtsGeomgraphEdgeEnd = require('com/vividsolutions/jts/geomgraph/EdgeEnd');

var _comVividsolutionsJtsGeomgraphEdgeEnd2 = _interopRequireDefault(_comVividsolutionsJtsGeomgraphEdgeEnd);

var _comVividsolutionsJtsGeomgraphPosition = require('com/vividsolutions/jts/geomgraph/Position');

var _comVividsolutionsJtsGeomgraphPosition2 = _interopRequireDefault(_comVividsolutionsJtsGeomgraphPosition);

var _comVividsolutionsJtsGeomgraphGeometryGraph = require('com/vividsolutions/jts/geomgraph/GeometryGraph');

var _comVividsolutionsJtsGeomgraphGeometryGraph2 = _interopRequireDefault(_comVividsolutionsJtsGeomgraphGeometryGraph);

var _comVividsolutionsJtsGeomgraphLabel = require('com/vividsolutions/jts/geomgraph/Label');

var _comVividsolutionsJtsGeomgraphLabel2 = _interopRequireDefault(_comVividsolutionsJtsGeomgraphLabel);

var _javaUtilArrayList = require('java/util/ArrayList');

var _javaUtilArrayList2 = _interopRequireDefault(_javaUtilArrayList);

var _comVividsolutionsJtsGeomgraphEdge = require('com/vividsolutions/jts/geomgraph/Edge');

var _comVividsolutionsJtsGeomgraphEdge2 = _interopRequireDefault(_comVividsolutionsJtsGeomgraphEdge);

var EdgeEndBundle = (function (_EdgeEnd) {
	_inherits(EdgeEndBundle, _EdgeEnd);

	function EdgeEndBundle() {
		_classCallCheck(this, EdgeEndBundle);

		_get(Object.getPrototypeOf(EdgeEndBundle.prototype), 'constructor', this).call(this);
		this.init_.apply(this, arguments);
	}

	_createClass(EdgeEndBundle, [{
		key: 'init_',
		value: function init_() {
			var _this = this;

			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			_get(Object.getPrototypeOf(EdgeEndBundle.prototype), 'init_', this).call(this);
			this.edgeEnds = new _javaUtilArrayList2['default']();
			switch (args.length) {
				case 2:
					return (function () {
						for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
							args[_key2] = arguments[_key2];
						}

						var boundaryNodeRule = args[0];
						var e = args[1];

						_get(Object.getPrototypeOf(EdgeEndBundle.prototype), 'init_', _this).call(_this, e.getEdge(), e.getCoordinate(), e.getDirectedCoordinate(), new _comVividsolutionsJtsGeomgraphLabel2['default'](e.getLabel()));
						_this.insert(e);
					}).apply(undefined, args);
				case 1:
					return (function () {
						for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
							args[_key3] = arguments[_key3];
						}

						var e = args[0];

						_this.init_(null, e);
					}).apply(undefined, args);
			}
		}
	}, {
		key: 'insert',
		value: function insert(e) {
			this.edgeEnds.add(e);
		}
	}, {
		key: 'print',
		value: function print(out) {
			out.println("EdgeEndBundle--> Label: " + this.label);
			for (var it = this.iterator(); it.hasNext();) {
				var ee = it.next();
				ee.print(out);
				out.println();
			}
		}
	}, {
		key: 'iterator',
		value: function iterator() {
			return this.edgeEnds.iterator();
		}
	}, {
		key: 'getEdgeEnds',
		value: function getEdgeEnds() {
			return this.edgeEnds;
		}
	}, {
		key: 'computeLabelOn',
		value: function computeLabelOn(geomIndex, boundaryNodeRule) {
			var boundaryCount = 0;
			var foundInterior = false;
			for (var it = this.iterator(); it.hasNext();) {
				var e = it.next();
				var loc = e.getLabel().getLocation(geomIndex);
				if (loc === _comVividsolutionsJtsGeomLocation2['default'].BOUNDARY) boundaryCount++;
				if (loc === _comVividsolutionsJtsGeomLocation2['default'].INTERIOR) foundInterior = true;
			}
			var loc = _comVividsolutionsJtsGeomLocation2['default'].NONE;
			if (foundInterior) loc = _comVividsolutionsJtsGeomLocation2['default'].INTERIOR;
			if (boundaryCount > 0) {
				loc = _comVividsolutionsJtsGeomgraphGeometryGraph2['default'].determineBoundary(boundaryNodeRule, boundaryCount);
			}
			this.label.setLocation(geomIndex, loc);
		}
	}, {
		key: 'computeLabelSide',
		value: function computeLabelSide(geomIndex, side) {
			for (var it = this.iterator(); it.hasNext();) {
				var e = it.next();
				if (e.getLabel().isArea()) {
					var loc = e.getLabel().getLocation(geomIndex, side);
					if (loc === _comVividsolutionsJtsGeomLocation2['default'].INTERIOR) {
						this.label.setLocation(geomIndex, side, _comVividsolutionsJtsGeomLocation2['default'].INTERIOR);
						return null;
					} else if (loc === _comVividsolutionsJtsGeomLocation2['default'].EXTERIOR) this.label.setLocation(geomIndex, side, _comVividsolutionsJtsGeomLocation2['default'].EXTERIOR);
				}
			}
		}
	}, {
		key: 'getLabel',
		value: function getLabel() {
			return this.label;
		}
	}, {
		key: 'computeLabelSides',
		value: function computeLabelSides(geomIndex) {
			this.computeLabelSide(geomIndex, _comVividsolutionsJtsGeomgraphPosition2['default'].LEFT);
			this.computeLabelSide(geomIndex, _comVividsolutionsJtsGeomgraphPosition2['default'].RIGHT);
		}
	}, {
		key: 'updateIM',
		value: function updateIM(im) {
			_comVividsolutionsJtsGeomgraphEdge2['default'].updateIM(this.label, im);
		}
	}, {
		key: 'computeLabel',
		value: function computeLabel(boundaryNodeRule) {
			var isArea = false;
			for (var it = this.iterator(); it.hasNext();) {
				var e = it.next();
				if (e.getLabel().isArea()) isArea = true;
			}
			if (isArea) this.label = new _comVividsolutionsJtsGeomgraphLabel2['default'](_comVividsolutionsJtsGeomLocation2['default'].NONE, _comVividsolutionsJtsGeomLocation2['default'].NONE, _comVividsolutionsJtsGeomLocation2['default'].NONE);else this.label = new _comVividsolutionsJtsGeomgraphLabel2['default'](_comVividsolutionsJtsGeomLocation2['default'].NONE);
			for (var i = 0; i < 2; i++) {
				this.computeLabelOn(i, boundaryNodeRule);
				if (isArea) this.computeLabelSides(i);
			}
		}
	}, {
		key: 'interfaces_',
		get: function get() {
			return [];
		}
	}]);

	return EdgeEndBundle;
})(_comVividsolutionsJtsGeomgraphEdgeEnd2['default']);

exports['default'] = EdgeEndBundle;
module.exports = exports['default'];

},{"com/vividsolutions/jts/geom/Location":36,"com/vividsolutions/jts/geomgraph/Edge":53,"com/vividsolutions/jts/geomgraph/EdgeEnd":54,"com/vividsolutions/jts/geomgraph/GeometryGraph":58,"com/vividsolutions/jts/geomgraph/Label":60,"com/vividsolutions/jts/geomgraph/Position":65,"java/util/ArrayList":111}],92:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _comVividsolutionsJtsGeomgraphEdgeEndStar = require('com/vividsolutions/jts/geomgraph/EdgeEndStar');

var _comVividsolutionsJtsGeomgraphEdgeEndStar2 = _interopRequireDefault(_comVividsolutionsJtsGeomgraphEdgeEndStar);

var _comVividsolutionsJtsOperationRelateEdgeEndBundle = require('com/vividsolutions/jts/operation/relate/EdgeEndBundle');

var _comVividsolutionsJtsOperationRelateEdgeEndBundle2 = _interopRequireDefault(_comVividsolutionsJtsOperationRelateEdgeEndBundle);

var EdgeEndBundleStar = (function (_EdgeEndStar) {
	_inherits(EdgeEndBundleStar, _EdgeEndStar);

	function EdgeEndBundleStar() {
		_classCallCheck(this, EdgeEndBundleStar);

		_get(Object.getPrototypeOf(EdgeEndBundleStar.prototype), 'constructor', this).call(this);
		this.init_.apply(this, arguments);
	}

	_createClass(EdgeEndBundleStar, [{
		key: 'init_',
		value: function init_() {
			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			_get(Object.getPrototypeOf(EdgeEndBundleStar.prototype), 'init_', this).call(this);
			switch (args.length) {
				case 0:
					return (function () {
						for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
							args[_key2] = arguments[_key2];
						}
					}).apply(undefined, args);
			}
		}
	}, {
		key: 'updateIM',
		value: function updateIM(im) {
			for (var it = this.iterator(); it.hasNext();) {
				var esb = it.next();
				esb.updateIM(im);
			}
		}
	}, {
		key: 'insert',
		value: function insert(e) {
			var eb = this.edgeMap.get(e);
			if (eb === null) {
				eb = new _comVividsolutionsJtsOperationRelateEdgeEndBundle2['default'](e);
				this.insertEdgeEnd(e, eb);
			} else {
				eb.insert(e);
			}
		}
	}, {
		key: 'interfaces_',
		get: function get() {
			return [];
		}
	}]);

	return EdgeEndBundleStar;
})(_comVividsolutionsJtsGeomgraphEdgeEndStar2['default']);

exports['default'] = EdgeEndBundleStar;
module.exports = exports['default'];

},{"com/vividsolutions/jts/geomgraph/EdgeEndStar":55,"com/vividsolutions/jts/operation/relate/EdgeEndBundle":91}],93:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _comVividsolutionsJtsAlgorithmPointLocator = require('com/vividsolutions/jts/algorithm/PointLocator');

var _comVividsolutionsJtsAlgorithmPointLocator2 = _interopRequireDefault(_comVividsolutionsJtsAlgorithmPointLocator);

var _comVividsolutionsJtsGeomLocation = require('com/vividsolutions/jts/geom/Location');

var _comVividsolutionsJtsGeomLocation2 = _interopRequireDefault(_comVividsolutionsJtsGeomLocation);

var _comVividsolutionsJtsGeomIntersectionMatrix = require('com/vividsolutions/jts/geom/IntersectionMatrix');

var _comVividsolutionsJtsGeomIntersectionMatrix2 = _interopRequireDefault(_comVividsolutionsJtsGeomIntersectionMatrix);

var _comVividsolutionsJtsOperationRelateEdgeEndBuilder = require('com/vividsolutions/jts/operation/relate/EdgeEndBuilder');

var _comVividsolutionsJtsOperationRelateEdgeEndBuilder2 = _interopRequireDefault(_comVividsolutionsJtsOperationRelateEdgeEndBuilder);

var _comVividsolutionsJtsGeomgraphNodeMap = require('com/vividsolutions/jts/geomgraph/NodeMap');

var _comVividsolutionsJtsGeomgraphNodeMap2 = _interopRequireDefault(_comVividsolutionsJtsGeomgraphNodeMap);

var _comVividsolutionsJtsOperationRelateRelateNodeFactory = require('com/vividsolutions/jts/operation/relate/RelateNodeFactory');

var _comVividsolutionsJtsOperationRelateRelateNodeFactory2 = _interopRequireDefault(_comVividsolutionsJtsOperationRelateRelateNodeFactory);

var _javaUtilArrayList = require('java/util/ArrayList');

var _javaUtilArrayList2 = _interopRequireDefault(_javaUtilArrayList);

var _comVividsolutionsJtsAlgorithmRobustLineIntersector = require('com/vividsolutions/jts/algorithm/RobustLineIntersector');

var _comVividsolutionsJtsAlgorithmRobustLineIntersector2 = _interopRequireDefault(_comVividsolutionsJtsAlgorithmRobustLineIntersector);

var _comVividsolutionsJtsUtilAssert = require('com/vividsolutions/jts/util/Assert');

var _comVividsolutionsJtsUtilAssert2 = _interopRequireDefault(_comVividsolutionsJtsUtilAssert);

var RelateComputer = (function () {
	function RelateComputer() {
		_classCallCheck(this, RelateComputer);

		this.init_.apply(this, arguments);
	}

	_createClass(RelateComputer, [{
		key: 'init_',
		value: function init_() {
			var _this = this;

			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			this.li = new _comVividsolutionsJtsAlgorithmRobustLineIntersector2['default']();
			this.ptLocator = new _comVividsolutionsJtsAlgorithmPointLocator2['default']();
			this.arg = null;
			this.nodes = new _comVividsolutionsJtsGeomgraphNodeMap2['default'](new _comVividsolutionsJtsOperationRelateRelateNodeFactory2['default']());
			this.im = null;
			this.isolatedEdges = new _javaUtilArrayList2['default']();
			this.invalidPoint = null;
			switch (args.length) {
				case 1:
					return (function () {
						for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
							args[_key2] = arguments[_key2];
						}

						var arg = args[0];

						_this.arg = arg;
					}).apply(undefined, args);
			}
		}
	}, {
		key: 'insertEdgeEnds',
		value: function insertEdgeEnds(ee) {
			for (var i = ee.iterator(); i.hasNext();) {
				var e = i.next();
				this.nodes.add(e);
			}
		}
	}, {
		key: 'computeProperIntersectionIM',
		value: function computeProperIntersectionIM(intersector, im) {
			var dimA = this.arg[0].getGeometry().getDimension();
			var dimB = this.arg[1].getGeometry().getDimension();
			var hasProper = intersector.hasProperIntersection();
			var hasProperInterior = intersector.hasProperInteriorIntersection();
			if (dimA === 2 && dimB === 2) {
				if (hasProper) im.setAtLeast("212101212");
			} else if (dimA === 2 && dimB === 1) {
				if (hasProper) im.setAtLeast("FFF0FFFF2");
				if (hasProperInterior) im.setAtLeast("1FFFFF1FF");
			} else if (dimA === 1 && dimB === 2) {
				if (hasProper) im.setAtLeast("F0FFFFFF2");
				if (hasProperInterior) im.setAtLeast("1F1FFFFFF");
			} else if (dimA === 1 && dimB === 1) {
				if (hasProperInterior) im.setAtLeast("0FFFFFFFF");
			}
		}
	}, {
		key: 'labelIsolatedEdges',
		value: function labelIsolatedEdges(thisIndex, targetIndex) {
			for (var ei = this.arg[thisIndex].getEdgeIterator(); ei.hasNext();) {
				var e = ei.next();
				if (e.isIsolated()) {
					this.labelIsolatedEdge(e, targetIndex, this.arg[targetIndex].getGeometry());
					this.isolatedEdges.add(e);
				}
			}
		}
	}, {
		key: 'labelIsolatedEdge',
		value: function labelIsolatedEdge(e, targetIndex, target) {
			if (target.getDimension() > 0) {
				var loc = this.ptLocator.locate(e.getCoordinate(), target);
				e.getLabel().setAllLocations(targetIndex, loc);
			} else {
				e.getLabel().setAllLocations(targetIndex, _comVividsolutionsJtsGeomLocation2['default'].EXTERIOR);
			}
		}
	}, {
		key: 'computeIM',
		value: function computeIM() {
			var im = new _comVividsolutionsJtsGeomIntersectionMatrix2['default']();
			im.set(_comVividsolutionsJtsGeomLocation2['default'].EXTERIOR, _comVividsolutionsJtsGeomLocation2['default'].EXTERIOR, 2);
			if (!this.arg[0].getGeometry().getEnvelopeInternal().intersects(this.arg[1].getGeometry().getEnvelopeInternal())) {
				this.computeDisjointIM(im);
				return im;
			}
			this.arg[0].computeSelfNodes(this.li, false);
			this.arg[1].computeSelfNodes(this.li, false);
			var intersector = this.arg[0].computeEdgeIntersections(this.arg[1], this.li, false);
			this.computeIntersectionNodes(0);
			this.computeIntersectionNodes(1);
			this.copyNodesAndLabels(0);
			this.copyNodesAndLabels(1);
			this.labelIsolatedNodes();
			this.computeProperIntersectionIM(intersector, im);
			var eeBuilder = new _comVividsolutionsJtsOperationRelateEdgeEndBuilder2['default']();
			var ee0 = eeBuilder.computeEdgeEnds(this.arg[0].getEdgeIterator());
			this.insertEdgeEnds(ee0);
			var ee1 = eeBuilder.computeEdgeEnds(this.arg[1].getEdgeIterator());
			this.insertEdgeEnds(ee1);
			this.labelNodeEdges();
			this.labelIsolatedEdges(0, 1);
			this.labelIsolatedEdges(1, 0);
			this.updateIM(im);
			return im;
		}
	}, {
		key: 'labelNodeEdges',
		value: function labelNodeEdges() {
			for (var ni = this.nodes.iterator(); ni.hasNext();) {
				var node = ni.next();
				node.getEdges().computeLabelling(this.arg);
			}
		}
	}, {
		key: 'copyNodesAndLabels',
		value: function copyNodesAndLabels(argIndex) {
			for (var i = this.arg[argIndex].getNodeIterator(); i.hasNext();) {
				var graphNode = i.next();
				var newNode = this.nodes.addNode(graphNode.getCoordinate());
				newNode.setLabel(argIndex, graphNode.getLabel().getLocation(argIndex));
			}
		}
	}, {
		key: 'labelIntersectionNodes',
		value: function labelIntersectionNodes(argIndex) {
			for (var i = this.arg[argIndex].getEdgeIterator(); i.hasNext();) {
				var e = i.next();
				var eLoc = e.getLabel().getLocation(argIndex);
				for (var eiIt = e.getEdgeIntersectionList().iterator(); eiIt.hasNext();) {
					var ei = eiIt.next();
					var n = this.nodes.find(ei.coord);
					if (n.getLabel().isNull(argIndex)) {
						if (eLoc === _comVividsolutionsJtsGeomLocation2['default'].BOUNDARY) n.setLabelBoundary(argIndex);else n.setLabel(argIndex, _comVividsolutionsJtsGeomLocation2['default'].INTERIOR);
					}
				}
			}
		}
	}, {
		key: 'labelIsolatedNode',
		value: function labelIsolatedNode(n, targetIndex) {
			var loc = this.ptLocator.locate(n.getCoordinate(), this.arg[targetIndex].getGeometry());
			n.getLabel().setAllLocations(targetIndex, loc);
		}
	}, {
		key: 'computeIntersectionNodes',
		value: function computeIntersectionNodes(argIndex) {
			for (var i = this.arg[argIndex].getEdgeIterator(); i.hasNext();) {
				var e = i.next();
				var eLoc = e.getLabel().getLocation(argIndex);
				for (var eiIt = e.getEdgeIntersectionList().iterator(); eiIt.hasNext();) {
					var ei = eiIt.next();
					var n = this.nodes.addNode(ei.coord);
					if (eLoc === _comVividsolutionsJtsGeomLocation2['default'].BOUNDARY) n.setLabelBoundary(argIndex);else {
						if (n.getLabel().isNull(argIndex)) n.setLabel(argIndex, _comVividsolutionsJtsGeomLocation2['default'].INTERIOR);
					}
				}
			}
		}
	}, {
		key: 'labelIsolatedNodes',
		value: function labelIsolatedNodes() {
			for (var ni = this.nodes.iterator(); ni.hasNext();) {
				var n = ni.next();
				var label = n.getLabel();
				_comVividsolutionsJtsUtilAssert2['default'].isTrue(label.getGeometryCount() > 0, "node with empty label found");
				if (n.isIsolated()) {
					if (label.isNull(0)) this.labelIsolatedNode(n, 0);else this.labelIsolatedNode(n, 1);
				}
			}
		}
	}, {
		key: 'updateIM',
		value: function updateIM(im) {
			for (var ei = this.isolatedEdges.iterator(); ei.hasNext();) {
				var e = ei.next();
				e.updateIM(im);
			}
			for (var ni = this.nodes.iterator(); ni.hasNext();) {
				var node = ni.next();
				node.updateIM(im);
				node.updateIMFromEdges(im);
			}
		}
	}, {
		key: 'computeDisjointIM',
		value: function computeDisjointIM(im) {
			var ga = this.arg[0].getGeometry();
			if (!ga.isEmpty()) {
				im.set(_comVividsolutionsJtsGeomLocation2['default'].INTERIOR, _comVividsolutionsJtsGeomLocation2['default'].EXTERIOR, ga.getDimension());
				im.set(_comVividsolutionsJtsGeomLocation2['default'].BOUNDARY, _comVividsolutionsJtsGeomLocation2['default'].EXTERIOR, ga.getBoundaryDimension());
			}
			var gb = this.arg[1].getGeometry();
			if (!gb.isEmpty()) {
				im.set(_comVividsolutionsJtsGeomLocation2['default'].EXTERIOR, _comVividsolutionsJtsGeomLocation2['default'].INTERIOR, gb.getDimension());
				im.set(_comVividsolutionsJtsGeomLocation2['default'].EXTERIOR, _comVividsolutionsJtsGeomLocation2['default'].BOUNDARY, gb.getBoundaryDimension());
			}
		}
	}, {
		key: 'interfaces_',
		get: function get() {
			return [];
		}
	}]);

	return RelateComputer;
})();

exports['default'] = RelateComputer;
module.exports = exports['default'];

},{"com/vividsolutions/jts/algorithm/PointLocator":7,"com/vividsolutions/jts/algorithm/RobustLineIntersector":11,"com/vividsolutions/jts/geom/IntersectionMatrix":31,"com/vividsolutions/jts/geom/Location":36,"com/vividsolutions/jts/geomgraph/NodeMap":63,"com/vividsolutions/jts/operation/relate/EdgeEndBuilder":90,"com/vividsolutions/jts/operation/relate/RelateNodeFactory":95,"com/vividsolutions/jts/util/Assert":97,"java/util/ArrayList":111}],94:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _comVividsolutionsJtsGeomgraphNode = require('com/vividsolutions/jts/geomgraph/Node');

var _comVividsolutionsJtsGeomgraphNode2 = _interopRequireDefault(_comVividsolutionsJtsGeomgraphNode);

var RelateNode = (function (_Node) {
	_inherits(RelateNode, _Node);

	function RelateNode() {
		_classCallCheck(this, RelateNode);

		_get(Object.getPrototypeOf(RelateNode.prototype), 'constructor', this).call(this);
		this.init_.apply(this, arguments);
	}

	_createClass(RelateNode, [{
		key: 'init_',
		value: function init_() {
			var _this = this;

			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			_get(Object.getPrototypeOf(RelateNode.prototype), 'init_', this).call(this);
			switch (args.length) {
				case 2:
					return (function () {
						for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
							args[_key2] = arguments[_key2];
						}

						var coord = args[0];
						var edges = args[1];

						_get(Object.getPrototypeOf(RelateNode.prototype), 'init_', _this).call(_this, coord, edges);
					}).apply(undefined, args);
			}
		}
	}, {
		key: 'updateIMFromEdges',
		value: function updateIMFromEdges(im) {
			this.edges.updateIM(im);
		}
	}, {
		key: 'computeIM',
		value: function computeIM(im) {
			im.setAtLeastIfValid(this.label.getLocation(0), this.label.getLocation(1), 0);
		}
	}, {
		key: 'interfaces_',
		get: function get() {
			return [];
		}
	}]);

	return RelateNode;
})(_comVividsolutionsJtsGeomgraphNode2['default']);

exports['default'] = RelateNode;
module.exports = exports['default'];

},{"com/vividsolutions/jts/geomgraph/Node":61}],95:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _comVividsolutionsJtsOperationRelateEdgeEndBundleStar = require('com/vividsolutions/jts/operation/relate/EdgeEndBundleStar');

var _comVividsolutionsJtsOperationRelateEdgeEndBundleStar2 = _interopRequireDefault(_comVividsolutionsJtsOperationRelateEdgeEndBundleStar);

var _comVividsolutionsJtsOperationRelateRelateNode = require('com/vividsolutions/jts/operation/relate/RelateNode');

var _comVividsolutionsJtsOperationRelateRelateNode2 = _interopRequireDefault(_comVividsolutionsJtsOperationRelateRelateNode);

var _comVividsolutionsJtsGeomgraphNodeFactory = require('com/vividsolutions/jts/geomgraph/NodeFactory');

var _comVividsolutionsJtsGeomgraphNodeFactory2 = _interopRequireDefault(_comVividsolutionsJtsGeomgraphNodeFactory);

var RelateNodeFactory = (function (_NodeFactory) {
	_inherits(RelateNodeFactory, _NodeFactory);

	function RelateNodeFactory() {
		_classCallCheck(this, RelateNodeFactory);

		_get(Object.getPrototypeOf(RelateNodeFactory.prototype), 'constructor', this).call(this);
		this.init_.apply(this, arguments);
	}

	_createClass(RelateNodeFactory, [{
		key: 'init_',
		value: function init_() {
			_get(Object.getPrototypeOf(RelateNodeFactory.prototype), 'init_', this).call(this);

			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			switch (args.length) {}
		}
	}, {
		key: 'createNode',
		value: function createNode(coord) {
			return new _comVividsolutionsJtsOperationRelateRelateNode2['default'](coord, new _comVividsolutionsJtsOperationRelateEdgeEndBundleStar2['default']());
		}
	}, {
		key: 'interfaces_',
		get: function get() {
			return [];
		}
	}]);

	return RelateNodeFactory;
})(_comVividsolutionsJtsGeomgraphNodeFactory2['default']);

exports['default'] = RelateNodeFactory;
module.exports = exports['default'];

},{"com/vividsolutions/jts/geomgraph/NodeFactory":62,"com/vividsolutions/jts/operation/relate/EdgeEndBundleStar":92,"com/vividsolutions/jts/operation/relate/RelateNode":94}],96:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _comVividsolutionsJtsGeomGeometry = require('com/vividsolutions/jts/geom/Geometry');

var _comVividsolutionsJtsGeomGeometry2 = _interopRequireDefault(_comVividsolutionsJtsGeomGeometry);

var _comVividsolutionsJtsOperationRelateRelateComputer = require('com/vividsolutions/jts/operation/relate/RelateComputer');

var _comVividsolutionsJtsOperationRelateRelateComputer2 = _interopRequireDefault(_comVividsolutionsJtsOperationRelateRelateComputer);

var _comVividsolutionsJtsAlgorithmBoundaryNodeRule = require('com/vividsolutions/jts/algorithm/BoundaryNodeRule');

var _comVividsolutionsJtsAlgorithmBoundaryNodeRule2 = _interopRequireDefault(_comVividsolutionsJtsAlgorithmBoundaryNodeRule);

var _comVividsolutionsJtsOperationGeometryGraphOperation = require('com/vividsolutions/jts/operation/GeometryGraphOperation');

var _comVividsolutionsJtsOperationGeometryGraphOperation2 = _interopRequireDefault(_comVividsolutionsJtsOperationGeometryGraphOperation);

var _comVividsolutionsJtsOperationPredicateRectangleContains = require('com/vividsolutions/jts/operation/predicate/RectangleContains');

var _comVividsolutionsJtsOperationPredicateRectangleContains2 = _interopRequireDefault(_comVividsolutionsJtsOperationPredicateRectangleContains);

var _comVividsolutionsJtsOperationPredicateRectangleIntersects = require('com/vividsolutions/jts/operation/predicate/RectangleIntersects');

var _comVividsolutionsJtsOperationPredicateRectangleIntersects2 = _interopRequireDefault(_comVividsolutionsJtsOperationPredicateRectangleIntersects);

var RelateOp = (function (_GeometryGraphOperation) {
	_inherits(RelateOp, _GeometryGraphOperation);

	function RelateOp() {
		_classCallCheck(this, RelateOp);

		_get(Object.getPrototypeOf(RelateOp.prototype), 'constructor', this).call(this);
		this.init_.apply(this, arguments);
	}

	_createClass(RelateOp, [{
		key: 'init_',
		value: function init_() {
			var _this = this;

			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			_get(Object.getPrototypeOf(RelateOp.prototype), 'init_', this).call(this);
			this.relate = null;
			switch (args.length) {
				case 2:
					return (function () {
						for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
							args[_key2] = arguments[_key2];
						}

						var g0 = args[0];
						var g1 = args[1];

						_get(Object.getPrototypeOf(RelateOp.prototype), 'init_', _this).call(_this, g0, g1);
						_this.relate = new _comVividsolutionsJtsOperationRelateRelateComputer2['default'](_this.arg);
					}).apply(undefined, args);
				case 3:
					return (function () {
						for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
							args[_key3] = arguments[_key3];
						}

						var g0 = args[0];
						var g1 = args[1];
						var boundaryNodeRule = args[2];

						_get(Object.getPrototypeOf(RelateOp.prototype), 'init_', _this).call(_this, g0, g1, boundaryNodeRule);
						_this.relate = new _comVividsolutionsJtsOperationRelateRelateComputer2['default'](_this.arg);
					}).apply(undefined, args);
			}
		}
	}, {
		key: 'getIntersectionMatrix',
		value: function getIntersectionMatrix() {
			return this.relate.computeIM();
		}
	}, {
		key: 'interfaces_',
		get: function get() {
			return [];
		}
	}], [{
		key: 'covers',
		value: function covers(g1, g2) {
			if (!g1.getEnvelopeInternal().covers(g2.getEnvelopeInternal())) return false;
			if (g1.isRectangle()) {
				return true;
			}
			return RelateOp.relate(g1, g2).isCovers();
		}
	}, {
		key: 'intersects',
		value: function intersects(g1, g2) {
			if (!g1.getEnvelopeInternal().intersects(g2.getEnvelopeInternal())) return false;
			if (g1.isRectangle()) {
				return _comVividsolutionsJtsOperationPredicateRectangleIntersects2['default'].intersects(g1, g2);
			}
			if (g2.isRectangle()) {
				return _comVividsolutionsJtsOperationPredicateRectangleIntersects2['default'].intersects(g2, g1);
			}
			return RelateOp.relate(g1, g2).isIntersects();
		}
	}, {
		key: 'touches',
		value: function touches(g1, g2) {
			if (!g1.getEnvelopeInternal().intersects(g2.getEnvelopeInternal())) return false;
			return RelateOp.relate(g1, g2).isTouches(g1.getDimension(), g2.getDimension());
		}
	}, {
		key: 'within',
		value: function within(g1, g2) {
			return RelateOp.contains(g1, g2);
		}
	}, {
		key: 'equalsTopo',
		value: function equalsTopo(g1, g2) {
			if (!g1.getEnvelopeInternal().equals(g2.getEnvelopeInternal())) return false;
			return RelateOp.relate(g1, g2).isEquals(g1.getDimension(), g2.getDimension());
		}
	}, {
		key: 'coveredBy',
		value: function coveredBy(g1, g2) {
			return RelateOp.covers(g1, g2);
		}
	}, {
		key: 'relate',
		value: function relate() {
			for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
				args[_key4] = arguments[_key4];
			}

			switch (args.length) {
				case 2:
					return (function () {
						for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
							args[_key5] = arguments[_key5];
						}

						var a = args[0];
						var b = args[1];

						var relOp = new RelateOp(a, b);
						var im = relOp.getIntersectionMatrix();
						return im;
					}).apply(undefined, args);
				case 3:
					if (args[2].interfaces_ && args[2].interfaces_.indexOf(_comVividsolutionsJtsAlgorithmBoundaryNodeRule2['default']) > -1 && (args[0] instanceof _comVividsolutionsJtsGeomGeometry2['default'] && args[1] instanceof _comVividsolutionsJtsGeomGeometry2['default'])) {
						return (function () {
							for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
								args[_key6] = arguments[_key6];
							}

							var a = args[0];
							var b = args[1];
							var boundaryNodeRule = args[2];

							var relOp = new RelateOp(a, b, boundaryNodeRule);
							var im = relOp.getIntersectionMatrix();
							return im;
						}).apply(undefined, args);
					} else if (typeof args[2] === "string" && (args[0] instanceof _comVividsolutionsJtsGeomGeometry2['default'] && args[1] instanceof _comVividsolutionsJtsGeomGeometry2['default'])) {
						return (function () {
							for (var _len7 = arguments.length, args = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
								args[_key7] = arguments[_key7];
							}

							var g1 = args[0];
							var g2 = args[1];
							var intersectionPattern = args[2];

							return RelateOp.relate(g1, g2).matches(intersectionPattern);
						}).apply(undefined, args);
					}
			}
		}
	}, {
		key: 'overlaps',
		value: function overlaps(g1, g2) {
			if (!g1.getEnvelopeInternal().intersects(g2.getEnvelopeInternal())) return false;
			return RelateOp.relate(g1, g2).isOverlaps(g1.getDimension(), g2.getDimension());
		}
	}, {
		key: 'disjoint',
		value: function disjoint(g1, g2) {
			return !RelateOp.intersects(g1, g2);
		}
	}, {
		key: 'crosses',
		value: function crosses(g1, g2) {
			if (!g1.getEnvelopeInternal().intersects(g2.getEnvelopeInternal())) return false;
			return RelateOp.relate(g1, g2).isCrosses(g1.getDimension(), g2.getDimension());
		}
	}, {
		key: 'contains',
		value: function contains(g1, g2) {
			if (!g1.getEnvelopeInternal().contains(g2.getEnvelopeInternal())) return false;
			if (g1.isRectangle()) {
				return _comVividsolutionsJtsOperationPredicateRectangleContains2['default'].contains(g1, g2);
			}
			return RelateOp.relate(g1, g2).isContains();
		}
	}]);

	return RelateOp;
})(_comVividsolutionsJtsOperationGeometryGraphOperation2['default']);

exports['default'] = RelateOp;
module.exports = exports['default'];

},{"com/vividsolutions/jts/algorithm/BoundaryNodeRule":1,"com/vividsolutions/jts/geom/Geometry":25,"com/vividsolutions/jts/operation/GeometryGraphOperation":84,"com/vividsolutions/jts/operation/predicate/RectangleContains":87,"com/vividsolutions/jts/operation/predicate/RectangleIntersects":88,"com/vividsolutions/jts/operation/relate/RelateComputer":93}],97:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _comVividsolutionsJtsUtilAssertionFailedException = require('com/vividsolutions/jts/util/AssertionFailedException');

var _comVividsolutionsJtsUtilAssertionFailedException2 = _interopRequireDefault(_comVividsolutionsJtsUtilAssertionFailedException);

var Assert = (function () {
	function Assert() {
		_classCallCheck(this, Assert);

		this.init_.apply(this, arguments);
	}

	_createClass(Assert, [{
		key: "init_",
		value: function init_() {
			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			switch (args.length) {}
		}
	}, {
		key: "interfaces_",
		get: function get() {
			return [];
		}
	}], [{
		key: "shouldNeverReachHere",
		value: function shouldNeverReachHere() {
			for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
				args[_key2] = arguments[_key2];
			}

			switch (args.length) {
				case 1:
					return (function () {
						for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
							args[_key3] = arguments[_key3];
						}

						var message = args[0];

						throw new _comVividsolutionsJtsUtilAssertionFailedException2["default"]("Should never reach here" + (message !== null ? ": " + message : ""));
					}).apply(undefined, args);
				case 0:
					return (function () {
						for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
							args[_key4] = arguments[_key4];
						}

						Assert.shouldNeverReachHere(null);
					}).apply(undefined, args);
			}
		}
	}, {
		key: "isTrue",
		value: function isTrue() {
			for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
				args[_key5] = arguments[_key5];
			}

			switch (args.length) {
				case 2:
					return (function () {
						for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
							args[_key6] = arguments[_key6];
						}

						var assertion = args[0];
						var message = args[1];

						if (!assertion) {
							if (message === null) {
								throw new _comVividsolutionsJtsUtilAssertionFailedException2["default"]();
							} else {
								throw new _comVividsolutionsJtsUtilAssertionFailedException2["default"](message);
							}
						}
					}).apply(undefined, args);
				case 1:
					return (function () {
						for (var _len7 = arguments.length, args = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
							args[_key7] = arguments[_key7];
						}

						var assertion = args[0];

						Assert.isTrue(assertion, null);
					}).apply(undefined, args);
			}
		}
	}, {
		key: "equals",
		value: function equals() {
			for (var _len8 = arguments.length, args = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
				args[_key8] = arguments[_key8];
			}

			switch (args.length) {
				case 2:
					return (function () {
						for (var _len9 = arguments.length, args = Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
							args[_key9] = arguments[_key9];
						}

						var expectedValue = args[0];
						var actualValue = args[1];

						Assert.equals(expectedValue, actualValue, null);
					}).apply(undefined, args);
				case 3:
					return (function () {
						for (var _len10 = arguments.length, args = Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
							args[_key10] = arguments[_key10];
						}

						var expectedValue = args[0];
						var actualValue = args[1];
						var message = args[2];

						if (!actualValue.equals(expectedValue)) {
							throw new _comVividsolutionsJtsUtilAssertionFailedException2["default"]("Expected " + (expectedValue + (" but encountered " + (actualValue + (message !== null ? ": " + message : "")))));
						}
					}).apply(undefined, args);
			}
		}
	}]);

	return Assert;
})();

exports["default"] = Assert;
module.exports = exports["default"];

},{"com/vividsolutions/jts/util/AssertionFailedException":98}],98:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _javaLangRuntimeException = require('java/lang/RuntimeException');

var _javaLangRuntimeException2 = _interopRequireDefault(_javaLangRuntimeException);

var AssertionFailedException = (function (_RuntimeException) {
	_inherits(AssertionFailedException, _RuntimeException);

	function AssertionFailedException() {
		_classCallCheck(this, AssertionFailedException);

		_get(Object.getPrototypeOf(AssertionFailedException.prototype), 'constructor', this).call(this);
		this.init_.apply(this, arguments);
	}

	_createClass(AssertionFailedException, [{
		key: 'init_',
		value: function init_() {
			var _this = this;

			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			_get(Object.getPrototypeOf(AssertionFailedException.prototype), 'init_', this).call(this);
			switch (args.length) {
				case 1:
					return (function () {
						for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
							args[_key2] = arguments[_key2];
						}

						var message = args[0];

						_get(Object.getPrototypeOf(AssertionFailedException.prototype), 'init_', _this).call(_this, message);
					}).apply(undefined, args);
				case 0:
					return (function () {
						for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
							args[_key3] = arguments[_key3];
						}

						_get(Object.getPrototypeOf(AssertionFailedException.prototype), 'init_', _this).call(_this);
					}).apply(undefined, args);
			}
		}
	}, {
		key: 'interfaces_',
		get: function get() {
			return [];
		}
	}]);

	return AssertionFailedException;
})(_javaLangRuntimeException2['default']);

exports['default'] = AssertionFailedException;
module.exports = exports['default'];

},{"java/lang/RuntimeException":108}],99:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NumberUtil = (function () {
	function NumberUtil() {
		_classCallCheck(this, NumberUtil);

		this.init_.apply(this, arguments);
	}

	_createClass(NumberUtil, [{
		key: "init_",
		value: function init_() {
			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			switch (args.length) {}
		}
	}, {
		key: "interfaces_",
		get: function get() {
			return [];
		}
	}], [{
		key: "equalsWithTolerance",
		value: function equalsWithTolerance(x1, x2, tolerance) {
			return Math.abs(x1 - x2) <= tolerance;
		}
	}]);

	return NumberUtil;
})();

exports["default"] = NumberUtil;
module.exports = exports["default"];

},{}],100:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var IOException = function IOException() {
  _classCallCheck(this, IOException);
};

exports["default"] = IOException;
module.exports = exports["default"];

},{}],101:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Serializable = function Serializable() {
  _classCallCheck(this, Serializable);
};

exports["default"] = Serializable;
module.exports = exports["default"];

},{}],102:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var StringWriter = function StringWriter() {
  _classCallCheck(this, StringWriter);
};

exports["default"] = StringWriter;
module.exports = exports["default"];

},{}],103:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Character = function Character() {
  _classCallCheck(this, Character);
};

exports["default"] = Character;

Character.isWhitespace = function (c) {
  return c <= 32 && c >= 0 || c == 127;
};
module.exports = exports["default"];

},{}],104:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Clonable = function Clonable() {
  _classCallCheck(this, Clonable);
};

exports["default"] = Clonable;
module.exports = exports["default"];

},{}],105:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Comparable = function Comparable() {
  _classCallCheck(this, Comparable);
};

exports["default"] = Comparable;
module.exports = exports["default"];

},{}],106:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Double = function Double() {
  _classCallCheck(this, Double);
};

exports["default"] = Double;

Double.isNaN = function (n) {
  return Number.isNan(n);
};
module.exports = exports["default"];

},{}],107:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Exception = function Exception() {
  _classCallCheck(this, Exception);
};

exports["default"] = Exception;
module.exports = exports["default"];

},{}],108:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RuntimeException = function RuntimeException() {
  _classCallCheck(this, RuntimeException);
};

exports["default"] = RuntimeException;
module.exports = exports["default"];

},{}],109:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DecimalFormat = function DecimalFormat() {
  _classCallCheck(this, DecimalFormat);
};

exports["default"] = DecimalFormat;
module.exports = exports["default"];

},{}],110:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DecimalFormatSymbols = function DecimalFormatSymbols() {
  _classCallCheck(this, DecimalFormatSymbols);
};

exports["default"] = DecimalFormatSymbols;
module.exports = exports["default"];

},{}],111:[function(require,module,exports){
'use strict';

var Collection = require('./Collection');
var IndexOutOfBoundsException = require('./IndexOutOfBoundsException');
var Iterator = require('./Iterator');
var List = require('./List');
var NoSuchElementException = require('./NoSuchElementException');
var OperationNotSupported = require('./OperationNotSupported');

/**
 * @see http://download.oracle.com/javase/6/docs/api/java/util/ArrayList.html
 *
 * @extends List
 * @constructor
 */
var ArrayList = function ArrayList() {
  /**
   * @type {Array}
   * @private
  */
  this.array_ = [];

  if (arguments[0] instanceof Collection) {
    this.addAll(arguments[0]);
  }
};
ArrayList.prototype = new List();

/**
 * @override
 */
ArrayList.prototype.add = function (e) {
  this.array_.push(e);
  return true;
};

/**
 * @override
 */
ArrayList.prototype.addAll = function (c) {
  for (var i = c.iterator(); i.hasNext();) {
    this.add(i.next());
  }
  return true;
};

/**
 * @override
 */
ArrayList.prototype.set = function (index, element) {
  var oldElement = this.array_[index];
  this.array_[index] = element;
  return oldElement;
};

/**
 * @override
 */
ArrayList.prototype.iterator = function () {
  return new Iterator_(this);
};

/**
 * @override
 */
ArrayList.prototype.get = function (index) {
  if (index < 0 || index >= this.size()) {
    throw new IndexOutOfBoundsException();
  }

  return this.array_[index];
};

/**
 * @override
 */
ArrayList.prototype.isEmpty = function () {
  return this.array_.length === 0;
};

/**
 * @override
 */
ArrayList.prototype.size = function () {
  return this.array_.length;
};

/**
 * @override
 */
ArrayList.prototype.toArray = function () {
  var array = [];

  for (var i = 0, len = this.array_.length; i < len; i++) {
    array.push(this.array_[i]);
  }

  return array;
};

/**
 * @override
 */
ArrayList.prototype.remove = function (o) {
  var found = false;

  for (var i = 0, len = this.array_.length; i < len; i++) {
    if (this.array_[i] === o) {
      this.array_.splice(i, 1);
      found = true;
      break;
    }
  }

  return found;
};

/**
 * @extends {Iterator}
 * @param {ArrayList} arrayList
 * @constructor
 * @private
 */
var Iterator_ = function Iterator_(arrayList) {
  /**
   * @type {ArrayList}
   * @private
  */
  this.arrayList_ = arrayList;
  /**
   * @type {number}
   * @private
  */
  this.position_ = 0;
};

/**
 * @override
 */
Iterator_.prototype.next = function () {
  if (this.position_ === this.arrayList_.size()) {
    throw new NoSuchElementException();
  }
  return this.arrayList_.get(this.position_++);
};

/**
 * @override
 */
Iterator_.prototype.hasNext = function () {
  if (this.position_ < this.arrayList_.size()) {
    return true;
  } else {
    return false;
  }
};

/**
 * @override
 */
Iterator_.prototype.remove = function () {
  throw new OperationNotSupported();
};

module.exports = ArrayList;

},{"./Collection":113,"./IndexOutOfBoundsException":117,"./Iterator":118,"./List":119,"./NoSuchElementException":121,"./OperationNotSupported":122}],112:[function(require,module,exports){
'use strict';

var ArrayList = require('./ArrayList');

/**
 * @see http://download.oracle.com/javase/6/docs/api/java/util/Arrays.html
 *
 * @constructor
 */
var Arrays = function Arrays() {};

/**
 */
Arrays.sort = function () {
  var a = arguments[0],
      i,
      t,
      comparator,
      compare;
  if (arguments.length === 1) {
    a.sort();
    return;
  } else if (arguments.length === 2) {
    comparator = arguments[1];
    compare = function (a, b) {
      return comparator['compare'](a, b);
    };
    a.sort(compare);
  } else if (arguments.length === 3) {
    t = a.slice(arguments[1], arguments[2]);
    t.sort();
    var r = a.slice(0, arguments[1]).concat(t, a.slice(arguments[2], a.length));
    a.splice(0, a.length);
    for (i = 0; i < r.length; i++) {
      a.push(r[i]);
    }
    return;
  } else if (arguments.length === 4) {
    t = a.slice(arguments[1], arguments[2]);
    comparator = arguments[3];
    compare = function (a, b) {
      return comparator['compare'](a, b);
    };
    t.sort(compare);
    r = a.slice(0, arguments[1]).concat(t, a.slice(arguments[2], a.length));
    a.splice(0, a.length);
    for (i = 0; i < r.length; i++) {
      a.push(r[i]);
    }
    return;
  }
};

/**
 * @param {Array} array
 * @return {ArrayList}
 */
Arrays.asList = function (array) {
  var arrayList = new ArrayList();
  for (var i = 0, len = array.length; i < len; i++) {
    arrayList.add(array[i]);
  }
  return arrayList;
};

module.exports = Arrays;

},{"./ArrayList":111}],113:[function(require,module,exports){
'use strict';

var Iterator = require('./Iterator');

/**
 * @see http://download.oracle.com/javase/6/docs/api/java/util/Collection.html
 *
 * @constructor
 */
var Collection = function Collection() {};

/**
 * Ensures that this collection contains the specified element (optional
 * operation).
 * @param {Object} e
 * @return {boolean}
 */
Collection.prototype.add = function () {};

/**
 * Appends all of the elements in the specified collection to the end of this
 * list, in the order that they are returned by the specified collection's
 * iterator (optional operation).
 * @param {javascript.util.Collection} c
 * @return {boolean}
 */
Collection.prototype.addAll = function () {};

/**
 * Returns true if this collection contains no elements.
 * @return {boolean}
 */
Collection.prototype.isEmpty = function () {};

/**
 * Returns an iterator over the elements in this collection.
 * @return {javascript.util.Iterator}
 */
Collection.prototype.iterator = function () {};

/**
 * Returns an iterator over the elements in this collection.
 * @return {number}
 */
Collection.prototype.size = function () {};

/**
 * Returns an array containing all of the elements in this collection.
 * @return {Array}
 */
Collection.prototype.toArray = function () {};

/**
 * Removes a single instance of the specified element from this collection if it
 * is present. (optional)
 * @param {Object} e
 * @return {boolean}
 */
Collection.prototype.remove = function () {};

module.exports = Collection;

},{"./Iterator":118}],114:[function(require,module,exports){
"use strict";

},{}],115:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Comparator = function Comparator() {
  _classCallCheck(this, Comparator);
};

exports["default"] = Comparator;
module.exports = exports["default"];

},{}],116:[function(require,module,exports){
'use strict';

var ArrayList = require('./ArrayList');
var Map = require('./Map');

/**
 * @see http://download.oracle.com/javase/6/docs/api/java/util/HashMap.html
 *
 * @extends {javascript.util.Map}
 * @constructor
 * @export
 */
var HashMap = function HashMap() {
  /**
   * @type {Object}
   * @private
  */
  this.object_ = {};
};
HashMap.prototype = new Map();

/**
 * @override
 */
HashMap.prototype.get = function (key) {
  return this.object_[key] || null;
};

/**
 * @override
 */
HashMap.prototype.put = function (key, value) {
  this.object_[key] = value;
  return value;
};

/**
 * @override
 */
HashMap.prototype.values = function () {
  var arrayList = new ArrayList();
  for (var key in this.object_) {
    if (this.object_.hasOwnProperty(key)) {
      arrayList.add(this.object_[key]);
    }
  }
  return arrayList;
};

/**
 * @override
 */
HashMap.prototype.size = function () {
  return this.values().size();
};

module.exports = HashMap;

},{"./ArrayList":111,"./Map":120}],117:[function(require,module,exports){
/**
 * @param {string=} message Optional message
 * @extends {Error}
 * @constructor
 */
'use strict';

var IndexOutOfBoundsException = function IndexOutOfBoundsException(message) {
  this.message = message || '';
};
IndexOutOfBoundsException.prototype = new Error();

/**
 * @type {string}
 */
IndexOutOfBoundsException.prototype.name = 'IndexOutOfBoundsException';

module.exports = IndexOutOfBoundsException;

},{}],118:[function(require,module,exports){
/**
 * @see http://download.oracle.com/javase/6/docs/api/java/util/Iterator.html
 * @constructor
 */
"use strict";

var Iterator = function Iterator() {};

/**
 * Returns true if the iteration has more elements.
 * @return {boolean}
 */
Iterator.prototype.hasNext = function () {};

/**
 * Returns the next element in the iteration.
 * @return {Object}
 */
Iterator.prototype.next = function () {};

/**
 * Removes from the underlying collection the last element returned by the
 * iterator (optional operation).
 */
Iterator.prototype.remove = function () {};

module.exports = Iterator;

},{}],119:[function(require,module,exports){
'use strict';

var Collection = require('./Collection');

/**
 * @see http://download.oracle.com/javase/6/docs/api/java/util/List.html
 *
 * @extends {javascript.util.Collection}
 * @constructor
 */
var List = function List() {};
List.prototype = new Collection();

/**
 * Returns the element at the specified position in this list.
 * @param {number} index
 * @return {Object}
 */
List.prototype.get = function () {};

/**
 * Replaces the element at the specified position in this list with the
 * specified element (optional operation).
 * @param {number} index
 * @param {Object} e
 * @return {Object}
 */
List.prototype.set = function () {};

/**
 * Returns true if this collection contains no elements.
 * @return {boolean}
 */
List.prototype.isEmpty = function () {};

module.exports = List;

},{"./Collection":113}],120:[function(require,module,exports){
/**
 * @see http://download.oracle.com/javase/6/docs/api/java/util/Map.html
 *
 * @constructor
 */
"use strict";

var Map = function Map() {};

/**
 * Returns the value to which the specified key is mapped, or null if this map
 * contains no mapping for the key.
 * @param {Object} key
 * @return {Object}
 */
Map.prototype.get = function () {};

/**
 * Associates the specified value with the specified key in this map (optional
 * operation).
 * @param {Object} key
 * @param {Object} value
 * @return {Object}
 */
Map.prototype.put = function () {};

/**
 * Returns the number of key-value mappings in this map.
 * @return {number}
 */
Map.prototype.size = function () {};

/**
 * Returns a Collection view of the values contained in this map.
 * @return {javascript.util.Collection}
 */
Map.prototype.values = function () {};

module.exports = Map;

},{}],121:[function(require,module,exports){
/**
 * @param {string=} message Optional message
 * @extends {Error}
 * @constructor
 */
'use strict';

var NoSuchElementException = function NoSuchElementException(message) {
  this.message = message || '';
};
NoSuchElementException.prototype = new Error();

/**
 * @type {string}
 */
NoSuchElementException.prototype.name = 'NoSuchElementException';

module.exports = NoSuchElementException;

},{}],122:[function(require,module,exports){
/**
 * @param {string=} message Optional message
 * @extends {Error}
 * @constructor
 */
'use strict';

var OperationNotSupported = function OperationNotSupported(message) {
  this.message = message || '';
};
OperationNotSupported.prototype = new Error();

/**
 * @type {string}
 */
OperationNotSupported.prototype.name = 'OperationNotSupported';

module.exports = OperationNotSupported;

},{}],123:[function(require,module,exports){
'use strict';

var Map = require('./Map');

/**
 * @see http://download.oracle.com/javase/6/docs/api/java/util/SortedMap.html
 *
 * @extends {Map}
 * @constructor
 */
var SortedMap = function SortedMap() {};
SortedMap.prototype = new Map();

module.exports = SortedMap;

},{"./Map":120}],124:[function(require,module,exports){
'use strict';

var ArrayList = require('./ArrayList');
var SortedMap = require('./SortedMap');

/**
 * @const @type {number}
 */
var BLACK = 0;

/**
 * @const @type {number}
 */
var RED = 1;

var colorOf = function colorOf(p) {
  return p == null ? BLACK : p.color;
};
var parentOf = function parentOf(p) {
  return p == null ? null : p.parent;
};
var setColor = function setColor(p, c) {
  if (p !== null) p.color = c;
};
var leftOf = function leftOf(p) {
  return p == null ? null : p.left;
};
var rightOf = function rightOf(p) {
  return p == null ? null : p.right;
};

/**
 * @see http://download.oracle.com/javase/6/docs/api/java/util/TreeMap.html
 *
 * @extends {javascript.util.SortedMap}
 * @constructor
 */
var TreeMap = function TreeMap() {
  /**
   * @type {Object}
   * @private
   */
  this.root_ = null;
  /**
   * @type {number}
   * @private
  */
  this.size_ = 0;
};
TreeMap.prototype = new SortedMap();

/**
 * @override
 */
TreeMap.prototype.get = function (key) {
  var p = this.root_;
  while (p !== null) {
    var cmp = key['compareTo'](p.key);
    if (cmp < 0) {
      p = p.left;
    } else if (cmp > 0) {
      p = p.right;
    } else {
      return p.value;
    }
  }
  return null;
};

/**
 * @override
 */
TreeMap.prototype.put = function (key, value) {
  if (this.root_ === null) {
    this.root_ = {
      key: key,
      value: value,
      left: null,
      right: null,
      parent: null,
      color: BLACK
    };
    this.size_ = 1;
    return null;
  }
  var t = this.root_,
      parent,
      cmp;
  do {
    parent = t;
    cmp = key['compareTo'](t.key);
    if (cmp < 0) {
      t = t.left;
    } else if (cmp > 0) {
      t = t.right;
    } else {
      var oldValue = t.value;
      t.value = value;
      return oldValue;
    }
  } while (t !== null);
  var e = {
    key: key,
    left: null,
    right: null,
    value: value,
    parent: parent,
    color: BLACK
  };
  if (cmp < 0) {
    parent.left = e;
  } else {
    parent.right = e;
  }
  this.fixAfterInsertion(e);
  this.size_++;
  return null;
};

/**
 * @param {Object} x
 */
TreeMap.prototype.fixAfterInsertion = function (x) {
  x.color = RED;
  while (x != null && x != this.root_ && x.parent.color == RED) {
    if (parentOf(x) == leftOf(parentOf(parentOf(x)))) {
      var y = rightOf(parentOf(parentOf(x)));
      if (colorOf(y) == RED) {
        setColor(parentOf(x), BLACK);
        setColor(y, BLACK);
        setColor(parentOf(parentOf(x)), RED);
        x = parentOf(parentOf(x));
      } else {
        if (x == rightOf(parentOf(x))) {
          x = parentOf(x);
          this.rotateLeft(x);
        }
        setColor(parentOf(x), BLACK);
        setColor(parentOf(parentOf(x)), RED);
        this.rotateRight(parentOf(parentOf(x)));
      }
    } else {
      var y = leftOf(parentOf(parentOf(x)));
      if (colorOf(y) == RED) {
        setColor(parentOf(x), BLACK);
        setColor(y, BLACK);
        setColor(parentOf(parentOf(x)), RED);
        x = parentOf(parentOf(x));
      } else {
        if (x == leftOf(parentOf(x))) {
          x = parentOf(x);
          this.rotateRight(x);
        }
        setColor(parentOf(x), BLACK);
        setColor(parentOf(parentOf(x)), RED);
        this.rotateLeft(parentOf(parentOf(x)));
      }
    }
  }
  this.root_.color = BLACK;
};

/**
 * @override
 */
TreeMap.prototype.values = function () {
  var arrayList = new ArrayList();
  var p = this.getFirstEntry();
  if (p !== null) {
    arrayList.add(p.value);
    while ((p = TreeMap.successor(p)) !== null) {
      arrayList.add(p.value);
    }
  }
  return arrayList;
};

/**
 * @param {Object} p
 */
TreeMap.prototype.rotateLeft = function (p) {
  if (p != null) {
    var r = p.right;
    p.right = r.left;
    if (r.left != null) r.left.parent = p;
    r.parent = p.parent;
    if (p.parent == null) this.root_ = r;else if (p.parent.left == p) p.parent.left = r;else p.parent.right = r;
    r.left = p;
    p.parent = r;
  }
};

/**
 * @param {Object} p
 */
TreeMap.prototype.rotateRight = function (p) {
  if (p != null) {
    var l = p.left;
    p.left = l.right;
    if (l.right != null) l.right.parent = p;
    l.parent = p.parent;
    if (p.parent == null) this.root_ = l;else if (p.parent.right == p) p.parent.right = l;else p.parent.left = l;
    l.right = p;
    p.parent = l;
  }
};

/**
 * @return {Object}
 */
TreeMap.prototype.getFirstEntry = function () {
  var p = this.root_;
  if (p != null) {
    while (p.left != null) {
      p = p.left;
    }
  }
  return p;
};

/**
 * @param {Object} t
 * @return {Object}
 * @private
 */
TreeMap.successor = function (t) {
  if (t === null) return null;else if (t.right !== null) {
    var p = t.right;
    while (p.left !== null) {
      p = p.left;
    }
    return p;
  } else {
    var p = t.parent;
    var ch = t;
    while (p !== null && ch === p.right) {
      ch = p;
      p = p.parent;
    }
    return p;
  }
};

/**
 * @override
 */
TreeMap.prototype.size = function () {
  return this.size_;
};

module.exports = TreeMap;

},{"./ArrayList":111,"./SortedMap":123}],125:[function(require,module,exports){
'use strict';

var Coordinate = require('com/vividsolutions/jts/geom/Coordinate');

var c1 = new Coordinate(1, 1);
var c2 = new Coordinate(1, 1.05);

var GeometryFactory = require('com/vividsolutions/jts/geom/GeometryFactory');
var factory = new GeometryFactory();

var p1 = factory.createPoint(c1);
console.log(JSON.stringify(p1));

var p2 = factory.createPoint(c2);
console.log(JSON.stringify(p2));

var RelateOp = require('com/vividsolutions/jts/operation/relate/RelateOp');
var intersects = RelateOp.intersects(p1, p2);

console.log(intersects);

},{"com/vividsolutions/jts/geom/Coordinate":15,"com/vividsolutions/jts/geom/GeometryFactory":29,"com/vividsolutions/jts/operation/relate/RelateOp":96}]},{},[125]);
