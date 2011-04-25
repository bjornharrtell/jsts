/* Copyright (c) 2011 by The Authors.
 * Published under the LGPL 2.1 license.
 * See /license-notice.txt for the full text of the license notice.
 * See /license.txt for the full text of the license.
 */



/**
 * A TopologyLocation is the labelling of a GraphComponent's topological
 * relationship to a single Geometry.
 * <p>
 * If the parent component is an area edge, each side and the edge itself have a
 * topological location. These locations are named
 * <ul>
 * <li> ON: on the edge
 * <li> LEFT: left-hand side of the edge
 * <li> RIGHT: right-hand side
 * </ul>
 * If the parent component is a line edge or node, there is a single topological
 * relationship attribute, ON.
 * <p>
 * The possible values of a topological location are {Location.NONE,
 * Location.EXTERIOR, Location.BOUNDARY, Location.INTERIOR}
 * <p>
 * The labelling is stored in an array location[j] where where j has the values
 * ON, LEFT, RIGHT
 *
 * @constructor
 */
jsts.geomgraph.TopologyLocation = function() {

};


// TODO: port
