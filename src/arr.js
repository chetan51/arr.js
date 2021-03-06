/*
# ----------------------------------------------------------------------
# Copyright (c) 2014 Chetan Surpur
# 
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
# 
# The above copyright notice and this permission notice shall be included in
# all copies or substantial portions of the Software.
# 
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
# THE SOFTWARE.
# ----------------------------------------------------------------------
*/

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

/**
 * Reduces given dimensions to target number of dimensions.
 *
 * @param {Array} dimensions The dimensions to reduce.
 * @param {Array} numDimensions The target number of dimensions (must be less than original number of dimensions, and greater than 0).
 * @returns {Array} Returns the reduced dimensions.
 **/
Arr.reduceDimensions = function(dimensions, numDimensions) {
    var result = [];

    for (var i = 0; i < numDimensions; i++) {
        result.push(dimensions[i]);
    }

    for (var j = numDimensions; j < dimensions.length; j++) {
        result[numDimensions - 1] *= dimensions[j];
    }

    return result;
};

/**
 * Converts a point in an N-dimensional space to a 1-D index into the space.
 *
 * @param {Array} point The point in the N-dimensional space. This array should have length N.
 * @param {Array} dimensions The dimensions of the space.
 * @returns {Number} Returns the index into the space.
 **/
Arr.pointToIndex = function(point, dimensions) {
    var multiplier = 1,
        index = 0;

    for (var i = dimensions.length - 1; i >= 0; i--) {
        index += multiplier * point[i];
        multiplier *= dimensions[i];
    }

    return index;
};

/**
 * Converts an index into an N-dimensional space to the respective point in the space.
 *
 * @param {Number} index The index into the N-dimensional space.
 * @param {Array} dimensions The dimensions of the space.
 * @returns {Array} Returns the point in the space represented by the index.
 **/
Arr.indexToPoint = function(index, dimensions) {
    var multiplier = Arr.prod(dimensions),
        point = [];

    for (var i = 0; i < dimensions.length; i++) {
        multiplier /= dimensions[i];

        var factor = Math.floor(index / multiplier);
        point.push(factor);
        index -= factor * multiplier;
    }

    return point;
};

/**
 * Returns the Manhattan distance between two points in an N-dimensional space.
 *
 * @param {Array} point1 The first point.
 * @param {Array} point2 The second point.
 * @returns {Number} Returns the Manhattan distance between point1 and point2.
 **/
Arr.manhattanDistance = function(point1, point2) {
    var diffs = _.map(point1, function(p1, i) {
        var p2 = point2[i];
        return Math.abs(p1 - p2);
    });

    return Arr.sum(diffs);
};

/**
 * Return the sum of all numbers in an array.
 *
 * @param {Array} array An array filled with numbers.
 * @returns {Number} Returns the sum of all numbers in the array.
 **/
Arr.sum = function(array) {
    if (!array.length) return 0;

    return _.reduce(array, function(p, n) {
        return p + n;
    });
};

/**
 * Return the product of all numbers in an array.
 *
 * @param {Array} array An array filled with numbers.
 * @returns {Number} Returns the product of all numbers in the array.
 **/
Arr.prod = function(array) {
    if (!array.length) return 0;

    return _.reduce(array, function(p, n) {
        return p * n;
    });
};

/**
 * Return the max of all numbers in an array.
 *
 * @param {Array} array An array filled with numbers.
 * @returns {Number} Returns the max of all numbers in the array.
 **/
Arr.max = function(array) {
    return Math.max.apply(Math, array);
};

/**
 * Return the min of all numbers in an array.
 *
 * @param {Array} array An array filled with numbers.
 * @returns {Number} Returns the min of all numbers in the array.
 **/
Arr.min = function(array) {
    return Math.min.apply(Math, array);
};

/**
 * Normalize all the values in an array.
 *
 * @param {Array} array An array filled with numbers.
 * @param {Number} target The number that the max value of the array should become.
 * @returns {Array} Returns the array with each value normalized so that the max value of the array is target.
 **/
Arr.normalize = function(array, target) {
    var max = Arr.max(array),
        multiplier = target / max,
        normalized = _.map(array, function(n) {
            return n * multiplier;
        });

    return normalized;
};

/**
 * Return the neighboring indices of an index in an N-dimensional space.
 *
 * @param {Number} index Index of whose neighbors to return.
 * @param {Number} radius Number of neighbors on each side of index to return.
 * @param {Array} dimensions Dimensions of the space.
 * @param {Boolean} wrap Enable wrapping around edges of the space.
 * @returns {Array} Returns the neighboring indices of the index in the space.
 **/
Arr.neighbors = function(index, radius, dimensions, wrap) {
    var point = Arr.indexToPoint(index, dimensions),
        neighbors = [[]];

    var mod = function(m, n) {
            return ((m % n) + n) % n;
        },
        expand = function(pos, dimensionLength) {
            return function(neighbor) {
                var expansions = [],
                    maxRadius = wrap ? Math.ceil((dimensionLength - 1) / 2) : dimensionLength - 1,
                    effectiveRadius = Math.min(radius, maxRadius);

                for (var j = pos - effectiveRadius; j <= pos + effectiveRadius; j++) {
                    var k = j;

                    if (j < 0 || j >= dimensionLength) {
                        if (wrap) k = mod(j, dimensionLength);
                        else continue;
                    }

                    var expansion = _.clone(neighbor);
                    expansion.unshift(k);
                    expansions.push(expansion);
                }

                return expansions;
            };
        };

    for (var i = dimensions.length - 1; i >= 0; i--) {
        neighbors = _.map(neighbors, expand(point[i], dimensions[i]));
        neighbors = _.flatten(neighbors, true);
    }

    var pointToIndex = function(dimensions) {
        return function(point) {
            return Arr.pointToIndex(point, dimensions);
        };
    };

    return _.uniq(_.map(neighbors, pointToIndex(dimensions)));
};

/**
 * Determine whether two arrays are equivalent when treated as sets.
 *
 * @param {Array} array1 First array.
 * @param {Array} array2 Second array.
 * @returns {Boolean} Returns true if array1 contains only and all elements in array2, otherwise false.
 **/
Arr.areEqualSets = function(array1, array2) {
    return _.isEqual(array1.sort(), array2.sort());
};
