import extend from '../../../../../extend';
export default function PreparedGeometry() {}
extend(PreparedGeometry.prototype, {
	containsProperly: function (geom) {},
	getGeometry: function () {},
	covers: function (geom) {},
	intersects: function (geom) {},
	touches: function (geom) {},
	within: function (geom) {},
	coveredBy: function (geom) {},
	overlaps: function (geom) {},
	disjoint: function (geom) {},
	crosses: function (geom) {},
	contains: function (geom) {},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return PreparedGeometry;
	}
});
