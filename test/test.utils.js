const { assert } = require('chai');
const { getUnixDate } = require('../src/utils/utils');


describe('Test: basic utils functions', function () {

    describe('getUnixDate: getting the current timestamp', function () {

        it('should return correct number if date is in past', function () {
            let currentDate = getUnixDate();
            let pastDate = getUnixDate(-30);
            assert.equal(Math.round((currentDate - pastDate) / 3600 / 24), 30);
        });

        it('should return correct number if date is in future', function () {
            let currentDate = getUnixDate();
            let futureDate = getUnixDate(5);
            assert.equal(Math.round((currentDate - futureDate) / 3600 / 24), -5);
        });

        it('should return 0 number if the dates are equal to each other', function () {
            let currentDate1 = getUnixDate();
            let currentDate2 = getUnixDate(0);
            assert.equal(Math.round((currentDate1 - currentDate2) / 3600 / 24), 0);
        });

        it('should return number type value and larger then date in past', function () {
            let currentDate = getUnixDate();
            let unixDateInPast = 1551010980; // 02/24/2019 @ 12:23pm (UTC)
            assert.isTrue(typeof currentDate === 'number');
            assert.isAbove(currentDate, unixDateInPast);
        });
    });

});