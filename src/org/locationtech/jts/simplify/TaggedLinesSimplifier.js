import extend from '../../../../extend';
import TaggedLineStringSimplifier from './TaggedLineStringSimplifier';
import LineSegmentIndex from './LineSegmentIndex';
export default function TaggedLinesSimplifier() {
	this.inputIndex = new LineSegmentIndex();
	this.outputIndex = new LineSegmentIndex();
	this.distanceTolerance = 0.0;
}
extend(TaggedLinesSimplifier.prototype, {
	setDistanceTolerance: function (distanceTolerance) {
		this.distanceTolerance = distanceTolerance;
	},
	simplify: function (taggedLines) {
		for (var i = taggedLines.iterator(); i.hasNext(); ) {
			this.inputIndex.add(i.next());
		}
		for (var i = taggedLines.iterator(); i.hasNext(); ) {
			var tlss = new TaggedLineStringSimplifier(this.inputIndex, this.outputIndex);
			tlss.setDistanceTolerance(this.distanceTolerance);
			tlss.simplify(i.next());
		}
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return TaggedLinesSimplifier;
	}
});
