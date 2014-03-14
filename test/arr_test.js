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

    describe('group', function() {

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

});
