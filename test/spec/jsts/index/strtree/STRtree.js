describe('jsts.index.strtree.STRtree', function() {
  var envelope;

  //NOTE: If any of the following variables are changed
  //tests below will probably fail
  var NUM_ITEMS = 100;
  var MIN_EXTENT = -1000.0;
  var MAX_EXTENT = 1000.0;

  it('can be created', function() {
    var strtree = new jsts.index.strtree.STRtree();
    expect(strtree).toBeDefined();
  });


  var createGrid = function(strtree, nGridCells)
  {
    var gridSize = Math.floor(Math.sqrt(nGridCells));
    gridSize += 1;

    var extent = MAX_EXTENT - MIN_EXTENT;
    var gridInc = extent / gridSize;
    var cellSize = 2 * gridInc;

    var insertedArray = [];
    for (var i = 0; i < gridSize; i++) {
      for (var j = 0; j < gridSize; j++) {
        var x = MIN_EXTENT + gridInc*i;
        var y = MIN_EXTENT + gridInc*j;

        var env = new jsts.geom.Envelope(x, x+cellSize, y, y+cellSize);
        strtree.insert(env, env);

        insertedArray.push(env);
        //envList.add(env);
      }
    }
    return insertedArray;
  };


  it('can insert a range of envelopes/items', function() {
    var strtree = new jsts.index.strtree.STRtree();
    var insertedArray = createGrid(strtree, NUM_ITEMS);
    strtree.build();
  });

  it('correctly calculates the depth',function(){
    var strtree = new jsts.index.strtree.STRtree();
    var insertedArray = createGrid(strtree, NUM_ITEMS);
    expect(strtree.depth()).toBe(4);
  });

  it('correctly calculates the size',function(){
    var strtree = new jsts.index.strtree.STRtree();
    var insertedArray = createGrid(strtree, NUM_ITEMS);
    expect(strtree.size()).toBe(121);
  });

  it('returns all items in the tree when queried with an exctent large enought to contain all inserted envelopes',function(){
    var searchEnv = new jsts.geom.Envelope(-10000,10000,-10000,10000);
    var strtree = new jsts.index.strtree.STRtree();
    var insertedArray = createGrid(strtree, NUM_ITEMS);
    var resultArray = strtree.query(searchEnv);
    expect(resultArray.length).toBe(121);
  });


});
