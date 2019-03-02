/**
 * Date formatting
 * 
 * @param {number} days - Number of days in past 
 */
function getUnixDate(days) {
    days = typeof days === 'number' ? days : 0;
    return Math.round(new Date().setDate((new Date).getDate() + days) / 1000);
}

/**
 * Date formatting
 * 
 * @param {number} unixtime - Unix time value 
 */
function convertUnixTimeToHumanDate(unixtime) {
    unixtime = typeof unixtime === 'number' ? unixtime : 0;
    return new Date(unixtime * 1000).toUTCString();
}

module.exports = {
    getUnixDate,
    convertUnixTimeToHumanDate
}