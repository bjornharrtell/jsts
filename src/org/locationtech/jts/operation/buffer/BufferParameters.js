export default class BufferParameters {
	constructor(...args) {
		this.quadrantSegments = BufferParameters.DEFAULT_QUADRANT_SEGMENTS;
		this.endCapStyle = BufferParameters.CAP_ROUND;
		this.joinStyle = BufferParameters.JOIN_ROUND;
		this.mitreLimit = BufferParameters.DEFAULT_MITRE_LIMIT;
		this._isSingleSided = false;
		this.simplifyFactor = BufferParameters.DEFAULT_SIMPLIFY_FACTOR;
		const overloads = (...args) => {
			switch (args.length) {
				case 0:
					return ((...args) => {
						let [] = args;
					})(...args);
				case 1:
					return ((...args) => {
						let [quadrantSegments] = args;
						this.setQuadrantSegments(quadrantSegments);
					})(...args);
				case 2:
					return ((...args) => {
						let [quadrantSegments, endCapStyle] = args;
						this.setQuadrantSegments(quadrantSegments);
						this.setEndCapStyle(endCapStyle);
					})(...args);
				case 4:
					return ((...args) => {
						let [quadrantSegments, endCapStyle, joinStyle, mitreLimit] = args;
						this.setQuadrantSegments(quadrantSegments);
						this.setEndCapStyle(endCapStyle);
						this.setJoinStyle(joinStyle);
						this.setMitreLimit(mitreLimit);
					})(...args);
			}
		};
		return overloads.apply(this, args);
	}
	get interfaces_() {
		return [];
	}
	static bufferDistanceError(quadSegs) {
		var alpha = Math.PI / 2.0 / quadSegs;
		return 1 - Math.cos(alpha / 2.0);
	}
	getEndCapStyle() {
		return this.endCapStyle;
	}
	isSingleSided() {
		return this._isSingleSided;
	}
	setQuadrantSegments(quadSegs) {
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
	}
	getJoinStyle() {
		return this.joinStyle;
	}
	setJoinStyle(joinStyle) {
		this.joinStyle = joinStyle;
	}
	setSimplifyFactor(simplifyFactor) {
		this.simplifyFactor = simplifyFactor < 0 ? 0 : simplifyFactor;
	}
	getSimplifyFactor() {
		return this.simplifyFactor;
	}
	getQuadrantSegments() {
		return this.quadrantSegments;
	}
	setEndCapStyle(endCapStyle) {
		this.endCapStyle = endCapStyle;
	}
	getMitreLimit() {
		return this.mitreLimit;
	}
	setMitreLimit(mitreLimit) {
		this.mitreLimit = mitreLimit;
	}
	setSingleSided(isSingleSided) {
		this._isSingleSided = isSingleSided;
	}
	getClass() {
		return BufferParameters;
	}
}
BufferParameters.CAP_ROUND = 1;
BufferParameters.CAP_FLAT = 2;
BufferParameters.CAP_SQUARE = 3;
BufferParameters.JOIN_ROUND = 1;
BufferParameters.JOIN_MITRE = 2;
BufferParameters.JOIN_BEVEL = 3;
BufferParameters.DEFAULT_QUADRANT_SEGMENTS = 8;
BufferParameters.DEFAULT_MITRE_LIMIT = 5.0;
BufferParameters.DEFAULT_SIMPLIFY_FACTOR = 0.01;

