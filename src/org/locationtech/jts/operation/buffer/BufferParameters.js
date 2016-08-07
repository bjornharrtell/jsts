import extend from '../../../../../extend';
export default function BufferParameters() {
	this.quadrantSegments = BufferParameters.DEFAULT_QUADRANT_SEGMENTS;
	this.endCapStyle = BufferParameters.CAP_ROUND;
	this.joinStyle = BufferParameters.JOIN_ROUND;
	this.mitreLimit = BufferParameters.DEFAULT_MITRE_LIMIT;
	this._isSingleSided = false;
	this.simplifyFactor = BufferParameters.DEFAULT_SIMPLIFY_FACTOR;
	if (arguments.length === 0) {} else if (arguments.length === 1) {
		let quadrantSegments = arguments[0];
		this.setQuadrantSegments(quadrantSegments);
	} else if (arguments.length === 2) {
		let quadrantSegments = arguments[0], endCapStyle = arguments[1];
		this.setQuadrantSegments(quadrantSegments);
		this.setEndCapStyle(endCapStyle);
	} else if (arguments.length === 4) {
		let quadrantSegments = arguments[0], endCapStyle = arguments[1], joinStyle = arguments[2], mitreLimit = arguments[3];
		this.setQuadrantSegments(quadrantSegments);
		this.setEndCapStyle(endCapStyle);
		this.setJoinStyle(joinStyle);
		this.setMitreLimit(mitreLimit);
	}
}
extend(BufferParameters.prototype, {
	getEndCapStyle: function () {
		return this.endCapStyle;
	},
	isSingleSided: function () {
		return this._isSingleSided;
	},
	setQuadrantSegments: function (quadSegs) {
		this.quadrantSegments = quadSegs;
		if (this.quadrantSegments === 0) this.joinStyle = BufferParameters.JOIN_BEVEL;
		if (this.quadrantSegments < 0) {
			this.joinStyle = BufferParameters.JOIN_MITRE;
			this.mitreLimit = Math.abs(this.quadrantSegments);
		}
		if (quadSegs <= 0) {
			this.quadrantSegments = 1;
		}
		if (this.joinStyle !== BufferParameters.JOIN_ROUND) {
			this.quadrantSegments = BufferParameters.DEFAULT_QUADRANT_SEGMENTS;
		}
	},
	getJoinStyle: function () {
		return this.joinStyle;
	},
	setJoinStyle: function (joinStyle) {
		this.joinStyle = joinStyle;
	},
	setSimplifyFactor: function (simplifyFactor) {
		this.simplifyFactor = simplifyFactor < 0 ? 0 : simplifyFactor;
	},
	getSimplifyFactor: function () {
		return this.simplifyFactor;
	},
	getQuadrantSegments: function () {
		return this.quadrantSegments;
	},
	setEndCapStyle: function (endCapStyle) {
		this.endCapStyle = endCapStyle;
	},
	getMitreLimit: function () {
		return this.mitreLimit;
	},
	setMitreLimit: function (mitreLimit) {
		this.mitreLimit = mitreLimit;
	},
	setSingleSided: function (isSingleSided) {
		this._isSingleSided = isSingleSided;
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return BufferParameters;
	}
});
BufferParameters.bufferDistanceError = function (quadSegs) {
	var alpha = Math.PI / 2.0 / quadSegs;
	return 1 - Math.cos(alpha / 2.0);
};
BufferParameters.CAP_ROUND = 1;
BufferParameters.CAP_FLAT = 2;
BufferParameters.CAP_SQUARE = 3;
BufferParameters.JOIN_ROUND = 1;
BufferParameters.JOIN_MITRE = 2;
BufferParameters.JOIN_BEVEL = 3;
BufferParameters.DEFAULT_QUADRANT_SEGMENTS = 8;
BufferParameters.DEFAULT_MITRE_LIMIT = 5.0;
BufferParameters.DEFAULT_SIMPLIFY_FACTOR = 0.01;
