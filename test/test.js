const { assert } = require('chai');

describe('Common integration tests', function () {

    it('should execute smoke mocha test', function () {
        let s1 = "string 1";
        let s2 = "string 1";
        assert.isTrue(s1 == s2);
    });

});