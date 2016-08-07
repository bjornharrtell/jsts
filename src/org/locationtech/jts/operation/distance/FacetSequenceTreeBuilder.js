import LineString from '../../geom/LineString';
import FacetSequence from './FacetSequence';
import STRtree from '../../index/strtree/STRtree';
import Point from '../../geom/Point';
import extend from '../../../../../extend';
import GeometryComponentFilter from '../../geom/GeometryComponentFilter';
import ArrayList from '../../../../../java/util/ArrayList';
export default function FacetSequenceTreeBuilder() {}
extend(FacetSequenceTreeBuilder.prototype, {
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return FacetSequenceTreeBuilder;
	}
});
FacetSequenceTreeBuilder.addFacetSequences = function (pts, sections) {
	var i = 0;
	var size = pts.size();
	while (i <= size - 1) {
		var end = i + FacetSequenceTreeBuilder.FACET_SEQUENCE_SIZE + 1;
		if (end >= size - 1) end = size;
		var sect = new FacetSequence(pts, i, end);
		sections.add(sect);
		i = i + FacetSequenceTreeBuilder.FACET_SEQUENCE_SIZE;
	}
};
FacetSequenceTreeBuilder.computeFacetSequences = function (g) {
	var sections = new ArrayList();
	g.apply({
		interfaces_: function () {
			return [GeometryComponentFilter];
		},
		filter: function (geom) {
			var seq = null;
			if (geom instanceof LineString) {
				seq = geom.getCoordinateSequence();
				FacetSequenceTreeBuilder.addFacetSequences(seq, sections);
			} else if (geom instanceof Point) {
				seq = geom.getCoordinateSequence();
				FacetSequenceTreeBuilder.addFacetSequences(seq, sections);
			}
		}
	});
	return sections;
};
FacetSequenceTreeBuilder.build = function (g) {
	var tree = new STRtree(FacetSequenceTreeBuilder.STR_TREE_NODE_CAPACITY);
	var sections = FacetSequenceTreeBuilder.computeFacetSequences(g);
	for (var i = sections.iterator(); i.hasNext(); ) {
		var section = i.next();
		tree.insert(section.getEnvelope(), section);
	}
	tree.build();
	return tree;
};
FacetSequenceTreeBuilder.FACET_SEQUENCE_SIZE = 6;
FacetSequenceTreeBuilder.STR_TREE_NODE_CAPACITY = 4;
