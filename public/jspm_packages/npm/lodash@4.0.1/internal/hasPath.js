/* */ 
var baseToPath = require('./baseToPath'),
    isArguments = require('../isArguments'),
    isArray = require('../isArray'),
    isIndex = require('./isIndex'),
    isKey = require('./isKey'),
    isLength = require('../isLength'),
    isString = require('../isString'),
    last = require('../last'),
    parent = require('./parent');
function hasPath(object, path, hasFunc) {
  if (object == null) {
    return false;
  }
  var result = hasFunc(object, path);
  if (!result && !isKey(path)) {
    path = baseToPath(path);
    object = parent(object, path);
    if (object != null) {
      path = last(path);
      result = hasFunc(object, path);
    }
  }
  return result || (isLength(object && object.length) && isIndex(path, object.length) && (isArray(object) || isString(object) || isArguments(object)));
}
module.exports = hasPath;
