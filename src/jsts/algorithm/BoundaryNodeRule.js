/* Copyright (c) 2011 by The Authors.
 * Published under the LGPL 2.1 license.
 * See /license-notice.txt for the full text of the license notice.
 * See /license.txt for the full text of the license.
 */

/**
 * An interface for rules which determine whether node points which are in
 * boundaries of {@link Lineal} geometry components are in the boundary of the
 * parent geometry collection. The SFS specifies a single kind of boundary node
 * rule, the {@link Mod2BoundaryNodeRule} rule. However, other kinds of
 * Boundary Node Rules are appropriate in specific situations (for instance,
 * linear network topology usually follows the {@link EndPointBoundaryNodeRule}.)
 * Some JTS operations allow the BoundaryNodeRule to be specified, and respect
 * this rule when computing the results of the operation.
 *
 * @see RelateOp
 * @see IsSimpleOp
 * @see PointLocator
 */

jsts.algorithm.BoundaryNodeRule = function() {

};
