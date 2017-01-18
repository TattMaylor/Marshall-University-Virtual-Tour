/* */ 
var LazyWrapper = require('./LazyWrapper'),
    arrayPush = require('./arrayPush'),
    arrayReduce = require('./arrayReduce');
function baseWrapperValue(value, actions) {
  var result = value;
  if (result instanceof LazyWrapper) {
    result = result.value();
  }
  return arrayReduce(actions, function(result, action) {
    return action.func.apply(action.thisArg, arrayPush([result], action.args));
  }, result);
}
module.exports = baseWrapperValue;
