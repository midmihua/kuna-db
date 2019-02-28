const db = require('../models/kunaModel');
const KunaData = require('./kuna_api');
const { getUnixDate } = require('../utils/utils');
const toNumber = require('lodash.tonumber');

async function addHistSlice() {
    // Init KubaData instance
    const kuna = new KunaData();
    // Get hist data
    kuna.market_data()
        .then(jsonResponse => {
            for (let key in jsonResponse) {
                // Current history slice
                const current_data = {
                    'at': jsonResponse[key].at,
                    'buy': jsonResponse[key].ticker.buy,
                    'sell': jsonResponse[key].ticker.sell,
                    'low': jsonResponse[key].ticker.low,
                    'high': jsonResponse[key].ticker.high,
                    'last': jsonResponse[key].ticker.last,
                    'vol': jsonResponse[key].ticker.vol,
                    'price': jsonResponse[key].ticker.price
                };
                // Create or update hist data
                db.updateOne({ coin: key }, { $push: { hist: current_data } }, { upsert: true }, (err, doc) => {
                    if (err) {
                        // logger should be here
                        console.log('[addHistSlice]: Error while saving/updaing data : ', err);
                        return;
                    }
                    if (doc.nModified > 0) {
                        // logger should be here
                        // console.log('[addHistSlice]: New raw has been saved');
                    }
                });
            }
        })
        .catch(err => {
            // logger should be here
            console.log('[addHistSlice]: Error while updating data: ', err);
        });
}

// Remove old hist data
function clearOldRecords() {
    const targetUnixDate = getUnixDate(-toNumber(process.env.CLEAR_HIST_DATA));
    // Update all docs
    db.updateMany({}, { $pull: { hist: { at: { $lt: targetUnixDate } } } }, { multi: true }, (err, doc) => {
        if (err) {
            // logger should be here
            console.log('[clearOldRecords]: Error while removing data: ', err);
            return;
        }
        if (doc.nModified > 0) {
            // logger should be here
            // console.log(`[clearOldRecords]: ${doc.nModified} docs have been updated`);
        }
    });
}

module.exports = {
    'addHistSlice': addHistSlice,
    'clearOldRecords': clearOldRecords
};