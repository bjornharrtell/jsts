import Envelope from '../../geom/Envelope';
export default class MonotoneChain {
	constructor(...args) {
		this.pts = null;
		this.start = null;
		this.end = null;
		this.env = null;
		this.context = null;
		this.id = null;
		switch (args.length) {
			case 4:
				{
					let [pts, start, end, context] = args;
					this.pts = pts;
					this.start = start;
					this.end = end;
					this.context = context;
					break;
				}
		}
	}
	get interfaces_() {
		return [];
	}
	getLineSegment(index, ls) {
		ls.p0 = this.pts[index];
		ls.p1 = this.pts[index + 1];
	}
	computeSelect(searchEnv, start0, end0, mcs) {
		var p0 = this.pts[start0];
		var p1 = this.pts[end0];
		mcs.tempEnv1.init(p0, p1);
		if (end0 - start0 === 1) {
			mcs.select(this, start0);
			return null;
		}
		if (!searchEnv.intersects(mcs.tempEnv1)) return null;
		var mid = Math.trunc((start0 + end0) / 2);
		if (start0 < mid) {
			this.computeSelect(searchEnv, start0, mid, mcs);
		}
		if (mid < end0) {
			this.computeSelect(searchEnv, mid, end0, mcs);
		}
	}
	getCoordinates() {
		var coord = new Array(this.end - this.start + 1);
		var index = 0;
		for (var i = this.start; i <= this.end; i++) {
			coord[index++] = this.pts[i];
		}
		return coord;
	}
	computeOverlaps(...args) {
		switch (args.length) {
			case 2:
				{
					let [mc, mco] = args;
					this.computeOverlaps(this.start, this.end, mc, mc.start, mc.end, mco);
					break;
				}
			case 6:
				{
					let [start0, end0, mc, start1, end1, mco] = args;
					var p00 = this.pts[start0];
					var p01 = this.pts[end0];
					var p10 = mc.pts[start1];
					var p11 = mc.pts[end1];
					if (end0 - start0 === 1 && end1 - start1 === 1) {
						mco.overlap(this, start0, mc, start1);
						return null;
					}
					mco.tempEnv1.init(p00, p01);
					mco.tempEnv2.init(p10, p11);
					if (!mco.tempEnv1.intersects(mco.tempEnv2)) return null;
					var mid0 = Math.trunc((start0 + end0) / 2);
					var mid1 = Math.trunc((start1 + end1) / 2);
					if (start0 < mid0) {
						if (start1 < mid1) this.computeOverlaps(start0, mid0, mc, start1, mid1, mco);
						if (mid1 < end1) this.computeOverlaps(start0, mid0, mc, mid1, end1, mco);
					}
					if (mid0 < end0) {
						if (start1 < mid1) this.computeOverlaps(mid0, end0, mc, start1, mid1, mco);
						if (mid1 < end1) this.computeOverlaps(mid0, end0, mc, mid1, end1, mco);
					}
					break;
				}
		}
	}
	setId(id) {
		this.id = id;
	}
	select(searchEnv, mcs) {
		this.computeSelect(searchEnv, this.start, this.end, mcs);
	}
	getEnvelope() {
		if (this.env === null) {
			var p0 = this.pts[this.start];
			var p1 = this.pts[this.end];
			this.env = new Envelope(p0, p1);
		}
		return this.env;
	}
	getEndIndex() {
		return this.end;
	}
	getStartIndex() {
		return this.start;
	}
	getContext() {
		return this.context;
	}
	getId() {
		return this.id;
	}
	getClass() {
		return MonotoneChain;
	}
}

