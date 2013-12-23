/* Copyright (c) 2011 by The Authors.
 * Published under the LGPL 2.1 license.
 * See /license-notice.txt for the full text of the license notice.
 * See /license.txt for the full text of the license.
 */

/**
 * @param {double}
 *          x
 * @param {Object}
 *          obj
 * @param {Object}
 *          label
 * @constructor
 */
jsts.geomgraph.index.SweepLineEvent = function(
    x, obj, label) {
  // label can be null, so check object to handle overloading
  if (!(obj instanceof jsts.geomgraph.index.SweepLineEvent)) {
    this.eventType = jsts.geomgraph.index.SweepLineEvent.INSERT;
    this.label = label;
    this.xValue = x;
    this.obj = obj;
    return;
  }

  this.eventType = jsts.geomgraph.index.SweepLineEvent.DELETE;
  this.xValue = x;
  this.insertEvent = obj;
};

/**
 * @type {int} 
 */
jsts.geomgraph.index.SweepLineEvent.INSERT = 1;

/**
 * @type {int} 
 */
jsts.geomgraph.index.SweepLineEvent.DELETE = 2;

/**
 * used for red-blue intersection detection 
 *
 * @type {Object} 
 */
jsts.geomgraph.index.SweepLineEvent.prototype.label = null;

/**
 * @type {double} 
 */
jsts.geomgraph.index.SweepLineEvent.prototype.xValue = null;

/**
 * @type {int} 
 */
jsts.geomgraph.index.SweepLineEvent.prototype.eventType = null;

/**
 * null if this is an INSERT event 
 *
 * @type {SweepLineEvent} 
 */
jsts.geomgraph.index.SweepLineEvent.prototype.insertEvent = null;

/**
 * @type {int} 
 */
jsts.geomgraph.index.SweepLineEvent.prototype.deleteEventIndex = null;

/**
 * @type {Object} 
 */
jsts.geomgraph.index.SweepLineEvent.prototype.obj = null;

/**
 * @return {boolean} 
 */
jsts.geomgraph.index.SweepLineEvent.prototype.isInsert = function() {
  return this.eventType == jsts.geomgraph.index.SweepLineEvent.INSERT;
};

/**
 * @return {boolean} 
 */
jsts.geomgraph.index.SweepLineEvent.prototype.isDelete = function() {
  return this.eventType == jsts.geomgraph.index.SweepLineEvent.DELETE;
};

/**
 * @return {SweepLineEvent} 
 */
jsts.geomgraph.index.SweepLineEvent.prototype.getInsertEvent = function() {
  return this.insertEvent;
};

/**
 * @return {int} 
 */
jsts.geomgraph.index.SweepLineEvent.prototype.getDeleteEventIndex = function() {
  return this.deleteEventIndex;
};

/**
 * @param {int}
 *          deleteEventIndex 
 */
jsts.geomgraph.index.SweepLineEvent.prototype.setDeleteEventIndex = function(
    deleteEventIndex) {
  this.deleteEventIndex = deleteEventIndex;
};

/**
 * @return {Object} 
 */
jsts.geomgraph.index.SweepLineEvent.prototype.getObject = function() {
  return this.obj;
};

/**
 * @param {SweepLineEvent}
 *          ev
 * @return {boolean} 
 */
jsts.geomgraph.index.SweepLineEvent.prototype.isSameLabel = function(
    ev) {
  // no label set indicates single group
  if (this.label == null) {
    return false;
  }
  return this.label == ev.label;
};

/**
 * Events are ordered first by their x-value, and then by their eventType.
 * Insert events are sorted before Delete events, so that
 * items whose Insert and Delete events occur at the same x-value will be
 * correctly handled.
 * 
 * @param {Object}
 *          o
 * @return {SweepLineEvent}
 */
jsts.geomgraph.index.SweepLineEvent.prototype.compareTo = function(
    pe) {
  if (this.xValue < pe.xValue) {
    return -1;
  }
  if (this.xValue > pe.xValue) {
    return 1;
  }
  if (this.eventType < pe.eventType) {
    return -1;
  }
  if (this.eventType > pe.eventType) {
    return 1;
  }
  return 0;
};