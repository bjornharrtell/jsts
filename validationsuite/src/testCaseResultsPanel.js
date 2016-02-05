export default Ext.create('Ext.panel.Panel', {
  title: 'IM result',
  flex: 1,
  frame: true,
  padding: 5,
  showTestResults (a, b) {
    var im = a.relate(b)
    this.update('IM: ' + im.toString() + '<br>' +
      'equals: ' + im.isEquals(2, 2) + '<br>' +
      'disjoint: ' + im.isDisjoint() + '<br>' +
      'intersects: ' + im.isIntersects() + '<br>' +
      'touches: ' + im.isTouches(2, 2) + '<br>' +
      'crosses: ' + im.isCrosses(2, 2) + '<br>' +
      'within: ' + im.isWithin() + '<br>' +
      'contains: ' + im.isContains() + '<br>' +
      'overlaps: ' + im.isOverlaps(2, 2) + '<br>')
  },
  reset () {
    this.update('')
  }
})
