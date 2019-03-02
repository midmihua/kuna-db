const isArray = require('lodash.isarray');
const toNumber = require('lodash.tonumber');
const { convertUnixTimeToHumanDate } = require('../utils/utils');

// Possible interval to filter hist data
const intervalEnum = { "4h": 16, "12h": 48, "1d": 96 };

function getHistMetrics(rawHist) {
    if (isArray(rawHist) && rawHist.length > 0) {
        const result = [];
        rawHist.forEach(element => {
            if (isArray(element.hist)) {
                result.push({
                    "coin": element.coin,
                    "last": convertUnixTimeToHumanDate(toNumber(element.hist[element.hist.length - 1].at)),
                    "length": element.hist.length
                });
            }
        });
        return result;
    }
    else
        return { "Warning": "Impossible to get metrics (raw data is not an array or empty array)" };
}

function getSpecificIntervalHist(rawHist, interval) {
    const intervalNumber = getIntervalNumber(interval);
    if (typeof intervalNumber === 'number' && isArray(rawHist) && rawHist.length > 0) {
        const result = [];
        rawHist.forEach(element => {
            if (isArray(element.hist)) {

                const coinHist = [];
                const reversed = element.hist.reverse();
                for (let i = 0; i <= reversed.length - 1; i += intervalNumber)
                    coinHist.push(reversed[i]);

                result.push({
                    "coin": element.coin,
                    "interval": interval,
                    "hist": coinHist.reverse()
                });
            }
        });
        return result;
    }
    else
        return {
            "Warning":
                "Impossible to get history (raw data is not an array or empty array or wrong interval value)"
        };
}

function getIntervalNumber(interval) {
    return Object.keys(intervalEnum).includes(interval) ? intervalEnum[interval] : false;
}

module.exports = {
    getHistMetrics,
    getSpecificIntervalHist,
    getIntervalNumber
}