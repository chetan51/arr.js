describe('Arr.js', function() {

    describe('group', function() {

        it('should group a flat 6-element array into 2-element groups', function() {
            var array = [1, 2, 3, 4, 5, 6],
                grouped = [[1, 2],
                          [3, 4],
                          [5, 6]];

            Arr.group(array, 2).should.eql(grouped);
        });

        it('should group a flat 7-element array into 2-element groups', function() {
            var array = [1, 2, 3, 4, 5, 6, 7],
                grouped = [[1, 2],
                          [3, 4],
                          [5, 6],
                          [7]];

            Arr.group(array, 2).should.eql(grouped);
        });

    });

    describe('reshape', function() {

        it('should reshape a 3x2 array into a 6-element array', function() {
            var array = [[1, 2],
                         [3, 4],
                         [5, 6]],
                reshaped = [1, 2, 3, 4, 5, 6];

            Arr.reshape(array, [6]).should.eql(reshaped);
        });

        it('should reshape a 3x2 array into a 1x6 array', function() {
            var array = [[1, 2],
                         [3, 4],
                         [5, 6]],
                reshaped = [[1, 2, 3, 4, 5, 6]];

            Arr.reshape(array, [1, 6]).should.eql(reshaped);
        });

        it('should reshape a 6-element array into a 6-element array', function() {
            var array = [1, 2, 3, 4, 5, 6],
                reshaped = [1, 2, 3, 4, 5, 6];

            Arr.reshape(array, [6]).should.eql(reshaped);
        });

        it('should reshape a 3x8 array into a 4x3x2 array', function() {
            var array = [[ 1,  2 , 3,  4,  5,  6,  7,  8],
                         [ 9, 10, 11, 12, 13, 14, 15, 16],
                         [17, 18, 19, 20, 21, 22, 23, 24]],
                reshaped = [[[ 1,  2],
                             [ 3,  4],
                             [ 5,  6]],
                            [[ 7,  8],
                             [ 9, 10],
                             [11, 12]],
                            [[13, 14],
                             [15, 16],
                             [17, 18]],
                            [[19, 20],
                             [21, 22],
                             [23, 24]]];

            Arr.reshape(array, [4, 3, 2]).should.eql(reshaped);
        });

    });

    describe('reduceDimensions', function() {

        it('should reduce 3 dimensions to 2 dimensions', function() {
            var dimensions = [4, 3, 2],
                reduced = [4, 6];

            Arr.reduceDimensions(dimensions, 2).should.eql(reduced);
        });

        it('should reduce 3 dimensions to 1 dimension', function() {
            var dimensions = [4, 3, 2],
                reduced = [24];

            Arr.reduceDimensions(dimensions, 1).should.eql(reduced);
        });

        it('should reduce 4 dimensions to 2 dimensions', function() {
            var dimensions = [10, 4, 3, 2],
                reduced = [10, 24];

            Arr.reduceDimensions(dimensions, 2).should.eql(reduced);
        });

        it('should reduce 3 dimensions to 3 dimensions', function() {
            var dimensions = [4, 3, 2],
                reduced = [4, 3, 2];

            Arr.reduceDimensions(dimensions, 3).should.eql(reduced);
        });

    });

    describe('pointToIndex', function() {

        it('should convert 2-D point to index', function() {
            var dimensions = [10, 20];

            Arr.pointToIndex([0, 0], dimensions).should.equal(0);
            Arr.pointToIndex([3, 4], dimensions).should.equal(64);
            Arr.pointToIndex([9, 19], dimensions).should.equal(199);
        });

        it('should convert 3-D point to index', function() {
            var dimensions = [10, 20, 30];

            Arr.pointToIndex([0, 0, 0], dimensions).should.equal(0);
            Arr.pointToIndex([3, 4, 5], dimensions).should.equal(1925);
            Arr.pointToIndex([9, 19, 29], dimensions).should.equal(5999);
        });

    });

    describe('indexToPoint', function() {

        it('should convert index to 2-D point', function() {
            var dimensions = [10, 20];

            Arr.indexToPoint(0, dimensions).should.eql([0, 0]);
            Arr.indexToPoint(64, dimensions).should.eql([3, 4]);
            Arr.indexToPoint(199, dimensions).should.eql([9, 19]);
        });

        it('should convert 3-D point to index', function() {
            var dimensions = [10, 20, 30];

            Arr.indexToPoint(0, dimensions).should.eql([0, 0, 0]);
            Arr.indexToPoint(1925, dimensions).should.eql([3, 4, 5]);
            Arr.indexToPoint(5999, dimensions).should.eql([9, 19, 29]);
        });

    });

    describe('prod', function() {

        it('should return product of 3-element array', function() {
            var array = [3, 4, 5];

            Arr.prod(array).should.equal(60);
        });

        it('should return product of 1-element array', function() {
            var array = [10];

            Arr.prod(array).should.equal(10);
        });

        it('should return 0 for empty array', function() {
            var array = [];

            Arr.prod(array).should.equal(0);
        });

    });

});
