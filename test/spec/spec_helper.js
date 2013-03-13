// Check if runing with jasmine-node and if so require dependencies into global.
if (typeof jsts === 'undefined' && typeof require !== 'undefined')
  global.jsts = require('../..');
