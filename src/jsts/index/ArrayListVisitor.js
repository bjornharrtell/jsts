

/**
 * An array-visitor
 */
jsts.index.ArrayListVisitor = OpenLayers.Class();


/**
 * Initializes this class with the openlayers inheritance mechanism
 */
jsts.index.ArrayListVisitor.prototype.initialize = function() {
  this.items = [];
};


/**
 * Visits an item
 * @param {Object}
 *        item the item to visit.
 */
jsts.index.ArrayListVisitor.prototype.visitItem = function(item) {
  this.items.push(item);
};


/**
 * Returns all visited items
 * @return {Array}
 *         An array with all visited items.
 */
jsts.index.ArrayListVisitor.prototype.getItems = function() {
  return this.items;
};
