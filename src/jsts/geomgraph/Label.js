/* Copyright (c) 2011 by The Authors.
 * Published under the LGPL 2.1 license.
 * See /license-notice.txt for the full text of the license notice.
 * See /license.txt for the full text of the license.
 */



/**
 * A <code>Label</code> indicates the topological relationship of a component
 * of a topology graph to a given <code>Geometry</code>. This class supports
 * labels for relationships to two <code>Geometry</code>s, which is
 * sufficient for algorithms for binary operations.
 * <P>
 * Topology graphs support the concept of labeling nodes and edges in the graph.
 * The label of a node or edge specifies its topological relationship to one or
 * more geometries. (In fact, since JTS operations have only two arguments
 * labels are required for only two geometries). A label for a node or edge has
 * one or two elements, depending on whether the node or edge occurs in one or
 * both of the input <code>Geometry</code>s. Elements contain attributes
 * which categorize the topological location of the node or edge relative to the
 * parent <code>Geometry</code>; that is, whether the node or edge is in the
 * interior, boundary or exterior of the <code>Geometry</code>. Attributes
 * have a value from the set <code>{Interior, Boundary, Exterior}</code>. In
 * a node each element has a single attribute <code>&lt;On&gt;</code>. For an
 * edge each element has a triplet of attributes
 * <code>&lt;Left, On, Right&gt;</code>.
 * <P>
 * It is up to the client code to associate the 0 and 1
 * <code>TopologyLocation</code>s with specific geometries.
 *
 * @constructor
 */
jsts.geomgraph.Label = function() {

};

// TODO: port
