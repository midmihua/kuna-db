
/**
 * Date formatting
 * 
 * @param {number} days - Number of days in past 
 */
function getUnixDate(days) {
    days = typeof days === 'number' ? days : 0;
    return Math.round(new Date().setDate((new Date).getDate() + days) / 1000);
}

module.exports = {
    getUnixDate
}