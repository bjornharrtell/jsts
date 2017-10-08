import extend from '../../../../extend';
import TaggedLineStringSimplifier from './TaggedLineStringSimplifier';
import LineSegmentIndex from './LineSegmentIndex';
export default function TaggedLinesSimplifier() {
	this._inputIndex = new LineSegmentIndex();
	this._outputIndex = new LineSegmentIndex();
	this._distanceTolerance = 0.0;
}
extend(TaggedLinesSimplifier.prototype, {
	setDistanceTolerance: function (distanceTolerance) {
		this._distanceTolerance = distanceTolerance;
	},
	simplify: function (taggedLines) {
		for (var i = taggedLines.iterator(); i.hasNext(); ) {
			this._inputIndex.add(i.next());
		}
		for (var i = taggedLines.iterator(); i.hasNext(); ) {
			var tlss = new TaggedLineStringSimplifier(this._inputIndex, this._outputIndex);
			tlss.setDistanceTolerance(this._distanceTolerance);
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
