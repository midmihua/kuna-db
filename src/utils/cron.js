const CronJob = require('cron').CronJob;
const { addHistSlice } = require('../boundary/update_db');

const jobHistorySlice = new CronJob(`0 */${process.env.CRON_EXEC_INTERVAL} * * * *`, function () {
    // Logger obj should be implemented
    console.log('jobHistorySlice is working [debug msg]');
    addHistSlice();
});

module.exports = {
    'jobHistorySlice': jobHistorySlice
}