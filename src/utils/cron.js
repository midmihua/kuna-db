const CronJob = require('cron').CronJob;
const { addHistSlice, clearOldRecords } = require('../boundary/update_db');

const jobHistorySlice = new CronJob(`0 */${process.env.CRON_EXEC_INTERVAL} * * * *`, function () {
    // Logger obj should be implemented
    console.log('jobHistorySlice is working [debug msg]');
    addHistSlice();
});

const jobHistoryClear = new CronJob(`0 * */${process.env.CRON_CLEAR_INTERVAL} * * *`, function () {
    // Logger obj should be implemented
    console.log('jobHistoryClear is working [debug msg]');
    clearOldRecords();
});

module.exports = {
    'jobHistorySlice': jobHistorySlice,
    'jobHistoryClear': jobHistoryClear
}