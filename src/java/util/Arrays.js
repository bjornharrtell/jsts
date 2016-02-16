import ArrayList from './ArrayList'

/**
 * @see http://download.oracle.com/javase/6/docs/api/java/util/Arrays.html
 *
 * @constructor
 * @private
 */
export default function Arrays() {};

/**
 */
Arrays.sort = function() {
  var a = arguments[0], i, t, comparator, compare;
  if (arguments.length === 1) {
    compare = function(a, b) {
      return a.compareTo(b);
    }
    a.sort(compare);
    return;
  } else if (arguments.length === 2) {
    comparator = arguments[1];
    compare = function(a, b) {
      return comparator['compare'](a, b);
    };
    a.sort(compare);
  } else if (arguments.length === 3) {
    t = a.slice(arguments[1], arguments[2]);
    t.sort();
    var r = a.slice(0, arguments[1]).concat(t, a.slice(arguments[2], a.length));
    a.splice(0, a.length);
    for (i = 0; i < r.length; i++) {
      a.push(r[i]);
    }
    return;
  } else if (arguments.length === 4) {
    t = a.slice(arguments[1], arguments[2]);
    comparator = arguments[3];
    compare = function(a, b) {
      return comparator['compare'](a, b);
    };
    t.sort(compare);
    r = a.slice(0, arguments[1]).concat(t, a.slice(arguments[2], a.length));
    a.splice(0, a.length);
    for (i = 0; i < r.length; i++) {
      a.push(r[i]);
    }
    return;
  }
};


/**
 * @param {Array} array
 * @return {ArrayList}
 */
Arrays.asList = function(array) {
  var arrayList = new ArrayList();
  for (var i = 0, len = array.length; i < len; i++) {
    arrayList.add(array[i]);
  }
  return arrayList;
};
