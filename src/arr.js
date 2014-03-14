var Arr = {};

/**
 * Groups elements in an array to generate a higher dimensional array.
 *
 * @param {Array} array The array whose elements to group.
 * @param {Array} numPerGroup The number of elements per group.
 * @returns {Array} Returns a higher dimensional array with elements grouped together.
 **/
Arr.group = function(array, numPerGroup) {
  var result = [],
      current = [];
    
  for (var i = 0; i < array.length; i++) {
    if (i > 0 && i % numPerGroup === 0) {
      result.push(current);
      current = [];
    }

    current.push(array[i]);
  }

  if (current.length) {
    result.push(current);
  }

  return result;
};

/**
 * Reshapes an array into the target dimensions.
 *
 * @param {Array} array The array to reshape.
 * @param {Array} dimensions The dimensions to reshape `array` into. Should be a 1-D array.
 * @returns {Array} Returns the reshaped array.
 **/
Arr.reshape = function(array, dimensions) {
  var flattened = _.flatten(array),
      result = flattened;

  for (var i = dimensions.length - 1; i >= 0; i--) {
    var numPerGroup = dimensions[i];
    result = Arr.group(result, numPerGroup);
  }

  return _.flatten(result, true);
};
