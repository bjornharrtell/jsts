describe('jsts.index.bintree.Bintree', function() {
  var NUM_ITEMS = 2000;
  var MIN_EXTENT = -1000.0;
  var MAX_EXTENT = 1000.0;
  
  it('can be created', function() {
    var btree = new jsts.index.bintree.Bintree();
    expect(btree).toBeDefined();
  });
  
  var createGrid = function(btree, nGridCells) {
    var gridSize = Math.floor(Math.sqrt(nGridCells));
    gridSize += 1;
    var extent = MAX_EXTENT - MIN_EXTENT;
    var gridInc = extent / gridSize;
    var cellSize = 2 * gridInc;

    var insertedArray = [], i=0, il=gridSize, x, interval;
    for (i; i < il; i++) {
        x = MIN_EXTENT + gridInc * i;
        interval = new jsts.index.bintree.Interval(x, x + cellSize);
        btree.insert(interval, interval);
        insertedArray.push(interval);
    }
    return insertedArray;
  };
  
  
  it('returns all items in the tree when queried with an interval large enough to contain all inserted intervals',function(){
    var btree = new jsts.index.bintree.Bintree();
    var insertedArray = createGrid(btree, NUM_ITEMS);
    var searchInterval = new jsts.index.bintree.Interval(-10000,10000);
    var resultArray = btree.query(searchInterval);
    expect(resultArray.size()).toBe(insertedArray.length);
  });
  
  it('can remove a previous inserted item',function() {
    var btree = new jsts.index.bintree.Bintree();
    var insertedArray = createGrid(btree, NUM_ITEMS);
    var item = insertedArray[0];
    var removed = btree.remove(item, item);
    expect(removed).toBeTruthy();
    expect(btree.size()).toBe(insertedArray.length-1);
  });
});
