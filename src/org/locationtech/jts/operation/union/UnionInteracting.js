import GeometryCombiner from '../../geom/util/GeometryCombiner';
import System from '../../../../../java/lang/System';
import ArrayList from '../../../../../java/util/ArrayList';
export default class UnionInteracting {
	constructor(...args) {
		this.geomFactory = null;
		this.g0 = null;
		this.g1 = null;
		this.interacts0 = null;
		this.interacts1 = null;
		switch (args.length) {
			case 2:
				return ((...args) => {
					let [g0, g1] = args;
					this.g0 = g0;
					this.g1 = g1;
					this.geomFactory = g0.getFactory();
					this.interacts0 = new Array(g0.getNumGeometries());
					this.interacts1 = new Array(g1.getNumGeometries());
				})(...args);
		}
	}
	get interfaces_() {
		return [];
	}
	static union(g0, g1) {
		var uue = new UnionInteracting(g0, g1);
		return uue.union();
	}
	extractElements(geom, interacts, isInteracting) {
		var extractedGeoms = new ArrayList();
		for (var i = 0; i < geom.getNumGeometries(); i++) {
			var elem = geom.getGeometryN(i);
			if (interacts[i] === isInteracting) extractedGeoms.add(elem);
		}
		return this.geomFactory.buildGeometry(extractedGeoms);
	}
	computeInteracting(...args) {
		switch (args.length) {
			case 0:
				return ((...args) => {
					let [] = args;
					for (var i = 0; i < this.g0.getNumGeometries(); i++) {
						var elem = this.g0.getGeometryN(i);
						this.interacts0[i] = this.computeInteracting(elem);
					}
				})(...args);
			case 1:
				return ((...args) => {
					let [elem0] = args;
					var interactsWithAny = false;
					for (var i = 0; i < this.g1.getNumGeometries(); i++) {
						var elem1 = this.g1.getGeometryN(i);
						var interacts = elem1.getEnvelopeInternal().intersects(elem0.getEnvelopeInternal());
						if (interacts) this.interacts1[i] = true;
						if (interacts) interactsWithAny = true;
					}
					return interactsWithAny;
				})(...args);
		}
	}
	union() {
		this.computeInteracting();
		var int0 = this.extractElements(this.g0, this.interacts0, true);
		var int1 = this.extractElements(this.g1, this.interacts1, true);
		if (int0.isEmpty() || int1.isEmpty()) {
			System.out.println("found empty!");
		}
		var union = int0.union(int1);
		var disjoint0 = this.extractElements(this.g0, this.interacts0, false);
		var disjoint1 = this.extractElements(this.g1, this.interacts1, false);
		var overallUnion = GeometryCombiner.combine(union, disjoint0, disjoint1);
		return overallUnion;
	}
	bufferUnion(g0, g1) {
		var factory = g0.getFactory();
		var gColl = factory.createGeometryCollection([g0, g1]);
		var unionAll = gColl.buffer(0.0);
		return unionAll;
	}
	getClass() {
		return UnionInteracting;
	}
}

