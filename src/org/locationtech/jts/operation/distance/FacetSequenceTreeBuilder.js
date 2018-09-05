import LineString from '../../geom/LineString';
import FacetSequence from './FacetSequence';
import STRtree from '../../index/strtree/STRtree';
import Point from '../../geom/Point';
import GeometryComponentFilter from '../../geom/GeometryComponentFilter';
import ArrayList from '../../../../../java/util/ArrayList';
export default class FacetSequenceTreeBuilder {
	constructor() {
		FacetSequenceTreeBuilder.constructor_.apply(this, arguments);
	}
	static addFacetSequences(pts, sections) {
		var i = 0;
		var size = pts.size();
		while (i <= size - 1) {
			var end = i + FacetSequenceTreeBuilder.FACET_SEQUENCE_SIZE + 1;
			if (end >= size - 1) end = size;
			var sect = new FacetSequence(pts, i, end);
			sections.add(sect);
			i = i + FacetSequenceTreeBuilder.FACET_SEQUENCE_SIZE;
		}
	}
	static computeFacetSequences(g) {
		var sections = new ArrayList();
		g.apply(new (class {
			get interfaces_() {
				return [GeometryComponentFilter];
			}
			filter(geom) {
				var seq = null;
				if (geom instanceof LineString) {
					seq = geom.getCoordinateSequence();
					FacetSequenceTreeBuilder.addFacetSequences(seq, sections);
				} else if (geom instanceof Point) {
					seq = geom.getCoordinateSequence();
					FacetSequenceTreeBuilder.addFacetSequences(seq, sections);
				}
			}
		})());
		return sections;
	}
	static build(g) {
		var tree = new STRtree(FacetSequenceTreeBuilder.STR_TREE_NODE_CAPACITY);
		var sections = FacetSequenceTreeBuilder.computeFacetSequences(g);
		for (var i = sections.iterator(); i.hasNext(); ) {
			var section = i.next();
			tree.insert(section.getEnvelope(), section);
		}
		tree.build();
		return tree;
	}
	getClass() {
		return FacetSequenceTreeBuilder;
	}
	get interfaces_() {
		return [];
	}
}
FacetSequenceTreeBuilder.constructor_ = function () {};
FacetSequenceTreeBuilder.FACET_SEQUENCE_SIZE = 6;
FacetSequenceTreeBuilder.STR_TREE_NODE_CAPACITY = 4;
